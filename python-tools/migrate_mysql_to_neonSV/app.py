"""
Streamlit App: Migrate dữ liệu từ MySQL (phpMyAdmin) sang Neon (PostgreSQL)
Chạy: streamlit run app.py
"""

import os
import time
import difflib
from datetime import datetime, date

import streamlit as st
import pandas as pd
from dotenv import load_dotenv
from sqlalchemy import create_engine, inspect, MetaData, Table, select, func, text
from sqlalchemy.engine import Engine

# ------------------------------------------------------------------------
# CẤU HÌNH TRANG
# ------------------------------------------------------------------------
st.set_page_config(page_title="MySQL → Neon Migrator", page_icon="🔄", layout="wide")
load_dotenv()

CHUNK_SIZE = 500  # số dòng mỗi lần insert/đọc


# ------------------------------------------------------------------------
# KẾT NỐI DATABASE
# ------------------------------------------------------------------------
def build_mysql_url() -> str:
    db_name = os.getenv("DB_NAME", "")
    db_user = os.getenv("DB_USER", "")
    db_password = os.getenv("DB_PASSWORD", "")
    db_host_raw = os.getenv("DB_HOST", "127.0.0.1:3306").strip("'\"")

    if ":" in db_host_raw:
        host, port = db_host_raw.split(":", 1)
    else:
        host, port = db_host_raw, "3306"

    return f"mysql+pymysql://{db_user}:{db_password}@{host}:{port}/{db_name}"


def build_neon_url() -> str:
    raw = os.getenv("DATABASE_URL", "")
    # SQLAlchemy cần driver rõ ràng, psycopg2
    if raw.startswith("postgresql://"):
        raw = raw.replace("postgresql://", "postgresql+psycopg2://", 1)
    elif raw.startswith("postgres://"):
        raw = raw.replace("postgres://", "postgresql+psycopg2://", 1)
    return raw


@st.cache_resource(show_spinner=False)
def get_mysql_engine(url: str) -> Engine:
    return create_engine(url, pool_pre_ping=True)


@st.cache_resource(show_spinner=False)
def get_neon_engine(url: str) -> Engine:
    return create_engine(url, pool_pre_ping=True)


def try_connect():
    errors = {}
    mysql_engine = None
    neon_engine = None

    mysql_url = build_mysql_url()
    neon_url = build_neon_url()

    try:
        mysql_engine = get_mysql_engine(mysql_url)
        with mysql_engine.connect() as conn:
            conn.execute(text("SELECT 1"))
    except Exception as e:
        errors["mysql"] = str(e)
        mysql_engine = None

    try:
        neon_engine = get_neon_engine(neon_url)
        with neon_engine.connect() as conn:
            conn.execute(text("SELECT 1"))
    except Exception as e:
        errors["neon"] = str(e)
        neon_engine = None

    return mysql_engine, neon_engine, errors


# ------------------------------------------------------------------------
# HỖ TRỢ LẤY METADATA BẢNG / CỘT
# ------------------------------------------------------------------------
def list_tables(engine: Engine, schema=None):
    insp = inspect(engine)
    return sorted(insp.get_table_names(schema=schema))


def get_columns(engine: Engine, table_name: str, schema=None):
    """Trả về list dict: name, type (string), nullable"""
    insp = inspect(engine)
    cols = insp.get_columns(table_name, schema=schema)
    result = []
    for c in cols:
        result.append({
            "name": c["name"],
            "type": str(c["type"]),
            "nullable": c.get("nullable", True),
        })
    return result


def get_row_count(engine: Engine, table_name: str, schema=None) -> int:
    insp = inspect(engine)
    quoted_table = f'"{table_name}"' if schema else table_name
    with engine.connect() as conn:
        try:
            result = conn.execute(text(f"SELECT COUNT(*) FROM {quoted_table}"))
            return result.scalar() or 0
        except Exception:
            return 0


# ------------------------------------------------------------------------
# KIỂM TRA KIỂU DỮ LIỆU TƯƠNG THÍCH
# ------------------------------------------------------------------------
def normalize_type(type_str: str) -> str:
    t = type_str.lower()
    if "tinyint(1)" in t or t == "boolean" or t == "bool":
        return "boolean"
    if any(k in t for k in ["tinyint", "smallint", "mediumint", "bigint", "int", "serial"]):
        return "integer"
    if any(k in t for k in ["float", "double", "decimal", "numeric", "real"]):
        return "number"
    if any(k in t for k in ["datetime", "timestamp"]):
        return "datetime"
    if t == "date":
        return "date"
    if any(k in t for k in ["time"]) and "datetime" not in t and "timestamp" not in t:
        return "time"
    if any(k in t for k in ["json", "jsonb"]):
        return "json"
    if any(k in t for k in ["char", "text", "string", "enum", "uuid"]):
        return "text"
    return "unknown"


def is_type_compatible(src_type: str, dst_type: str) -> bool:
    src_cat = normalize_type(src_type)
    dst_cat = normalize_type(dst_type)
    if src_cat == dst_cat:
        return True
    # các cặp coi là tương thích tạm chấp nhận được (có thể convert)
    loose_ok = {
        ("integer", "number"), ("number", "integer"),
        ("date", "datetime"), ("datetime", "date"),
        ("text", "unknown"), ("unknown", "text"),
        ("integer", "boolean"), ("boolean", "integer"),
    }
    return (src_cat, dst_cat) in loose_ok


# ------------------------------------------------------------------------
# AUTO-MATCH CỘT THEO TÊN
# ------------------------------------------------------------------------
def normalize_name(name: str) -> str:
    return name.lower().replace("_", "").replace("-", "").replace(" ", "")


def auto_match_columns(src_cols, dst_cols):
    """
    Trả về dict: src_col_name -> dst_col_name (hoặc None nếu không tìm được match tốt)
    Ưu tiên: trùng tên tuyệt đối > trùng tên chuẩn hóa > similarity cao (>0.6)
    """
    dst_names = [c["name"] for c in dst_cols]
    dst_norm_map = {normalize_name(n): n for n in dst_names}

    mapping = {}
    used_dst = set()

    for c in src_cols:
        src_name = c["name"]
        # 1. Trùng tuyệt đối
        if src_name in dst_names and src_name not in used_dst:
            mapping[src_name] = src_name
            used_dst.add(src_name)
            continue
        # 2. Trùng sau chuẩn hóa
        norm = normalize_name(src_name)
        if norm in dst_norm_map and dst_norm_map[norm] not in used_dst:
            match = dst_norm_map[norm]
            mapping[src_name] = match
            used_dst.add(match)
            continue
        # 3. Similarity
        best_score, best_match = 0.0, None
        for dn in dst_names:
            if dn in used_dst:
                continue
            score = difflib.SequenceMatcher(None, normalize_name(src_name), normalize_name(dn)).ratio()
            if score > best_score:
                best_score, best_match = score, dn
        if best_match and best_score >= 0.6:
            mapping[src_name] = best_match
            used_dst.add(best_match)
        else:
            mapping[src_name] = None

    return mapping


# ------------------------------------------------------------------------
# LOG HELPERS
# ------------------------------------------------------------------------
def log(msg: str):
    ts = datetime.now().strftime("%H:%M:%S")
    st.session_state.logs.append(f"[{ts}] {msg}")


def render_logs(container):
    container.code("\n".join(st.session_state.logs[-300:]) or "Chưa có log nào...", language="text")


# ------------------------------------------------------------------------
# MIGRATION LOGIC
# ------------------------------------------------------------------------
def convert_value(val, dst_type: str):
    """Ép kiểu giá trị đơn giản khi cần, để tránh lỗi insert."""
    if val is None or (isinstance(val, float) and pd.isna(val)):
        return None
    dst_cat = normalize_type(dst_type)
    try:
        if dst_cat == "boolean":
            if isinstance(val, (int, float)):
                return bool(val)
            if isinstance(val, str):
                return val.strip().lower() in ("1", "true", "yes", "y")
            return bool(val)
        if dst_cat == "integer":
            return int(val)
        if dst_cat == "number":
            return float(val)
        if dst_cat in ("date", "datetime"):
            if isinstance(val, (pd.Timestamp, datetime, date)):
                return val
            return pd.to_datetime(val)
        return val
    except Exception:
        return val


def run_migration(mysql_engine, neon_engine, src_table, dst_table, column_mapping,
                   dst_schema, progress_bar, status_text, log_container):
    """
    column_mapping: dict src_col -> dst_col (chỉ chứa các cặp đã match, bỏ None)
    """
    src_cols = list(column_mapping.keys())
    dst_cols = list(column_mapping.values())

    total_rows = get_row_count(mysql_engine, src_table)
    log(f"Tổng số dòng cần migrate từ '{src_table}': {total_rows}")
    if total_rows == 0:
        status_text.warning("Bảng nguồn không có dữ liệu.")
        render_logs(log_container)
        return

    # reflect bảng đích để insert đúng kiểu qua SQLAlchemy Core
    meta = MetaData()
    dst_table_obj = Table(dst_table, meta, autoload_with=neon_engine, schema=dst_schema)

    # map tên cột đích -> kiểu dữ liệu string (để convert_value)
    dst_col_types = {c["name"]: c["type"] for c in get_columns(neon_engine, dst_table, schema=dst_schema)}

    col_list_sql = ", ".join(f"`{c}`" for c in src_cols)
    migrated = 0
    offset = 0
    error_rows = 0

    start_time = time.time()

    while offset < total_rows:
        query = f"SELECT {col_list_sql} FROM `{src_table}` LIMIT {CHUNK_SIZE} OFFSET {offset}"
        try:
            df_chunk = pd.read_sql_query(query, mysql_engine)
        except Exception as e:
            log(f"❌ Lỗi khi đọc dữ liệu từ MySQL (offset {offset}): {e}")
            status_text.error(f"Lỗi đọc dữ liệu: {e}")
            render_logs(log_container)
            return

        # đổi tên cột theo mapping
        df_chunk = df_chunk.rename(columns=column_mapping)

        # convert giá trị theo kiểu cột đích
        records = []
        for _, row in df_chunk.iterrows():
            record = {}
            for dst_col in dst_cols:
                dst_type_str = dst_col_types.get(dst_col, "text")
                record[dst_col] = convert_value(row[dst_col], dst_type_str)
            records.append(record)

        if records:
            try:
                with neon_engine.begin() as conn:
                    conn.execute(dst_table_obj.insert(), records)
            except Exception as e:
                error_rows += len(records)
                log(f"❌ Lỗi khi insert chunk offset={offset}: {e}")
                status_text.error(f"Lỗi insert ở offset {offset}: {e}")
                render_logs(log_container)
                # tiếp tục chunk kế tiếp thay vì dừng hẳn
        migrated += len(df_chunk)
        offset += CHUNK_SIZE

        progress = min(migrated / total_rows, 1.0)
        progress_bar.progress(progress)
        elapsed = time.time() - start_time
        status_text.info(f"Đã migrate {migrated}/{total_rows} dòng ({progress*100:.1f}%) — {elapsed:.1f}s")
        log(f"Đã xử lý {migrated}/{total_rows} dòng...")
        render_logs(log_container)

    log(f"✅ HOÀN TẤT. Tổng dòng migrate: {migrated}, lỗi: {error_rows}")
    if error_rows == 0:
        status_text.success(f"🎉 Migrate thành công {migrated} dòng từ '{src_table}' sang '{dst_table}'!")
    else:
        status_text.warning(f"Migrate xong nhưng có {error_rows} dòng lỗi. Xem log để biết chi tiết.")
    render_logs(log_container)


# ------------------------------------------------------------------------
# SESSION STATE INIT
# ------------------------------------------------------------------------
if "logs" not in st.session_state:
    st.session_state.logs = []
if "mapping_rows" not in st.session_state:
    st.session_state.mapping_rows = []  # list of dict {src, dst}


# ------------------------------------------------------------------------
# UI
# ------------------------------------------------------------------------
st.title("🔄 Migrate dữ liệu: MySQL (phpMyAdmin) → Neon (PostgreSQL)")
st.caption("Kết nối qua biến môi trường `.env`, chọn bảng, match cột, kiểm tra kiểu dữ liệu và migrate có theo dõi tiến trình.")

with st.sidebar:
    st.header("⚙️ Kết nối Database")
    if st.button("🔌 Kết nối / Kiểm tra lại kết nối", use_container_width=True):
        st.cache_resource.clear()
        st.rerun()

mysql_engine, neon_engine, conn_errors = try_connect()

col_status1, col_status2 = st.columns(2)
with col_status1:
    if mysql_engine:
        st.success("✅ MySQL: kết nối thành công")
    else:
        st.error(f"❌ MySQL lỗi: {conn_errors.get('mysql', 'unknown')}")
with col_status2:
    if neon_engine:
        st.success("✅ Neon (Postgres): kết nối thành công")
    else:
        st.error(f"❌ Neon lỗi: {conn_errors.get('neon', 'unknown')}")

if not (mysql_engine and neon_engine):
    st.warning("Vui lòng kiểm tra lại file `.env` (DB_NAME, DB_USER, DB_PASSWORD, DB_HOST, DATABASE_URL) rồi bấm 'Kết nối lại'.")
    st.stop()

st.divider()

# --- STEP 1: chọn bảng ---
st.subheader("1️⃣ Chọn bảng nguồn (MySQL) và bảng đích (Neon)")

mysql_tables = list_tables(mysql_engine)
neon_tables = list_tables(neon_engine, schema="public")

col1, col2 = st.columns(2)
with col1:
    src_table = st.selectbox("Bảng nguồn (MySQL)", options=mysql_tables, index=None, placeholder="Chọn bảng MySQL...")
with col2:
    dst_table = st.selectbox("Bảng đích (Neon)", options=neon_tables, index=None, placeholder="Chọn bảng Neon...")

if not (src_table and dst_table):
    st.info("👆 Hãy chọn cả bảng nguồn và bảng đích để tiếp tục.")
    st.stop()

src_cols = get_columns(mysql_engine, src_table)
dst_cols = get_columns(neon_engine, dst_table, schema="public")
dst_col_names = [c["name"] for c in dst_cols]

st.divider()

# --- STEP 2: match cột ---
st.subheader("2️⃣ Match các trường dữ liệu (cột)")

btn_col1, btn_col2 = st.columns([1, 4])
with btn_col1:
    if st.button("🤖 Tự động match", use_container_width=True):
        auto_map = auto_match_columns(src_cols, dst_cols)
        st.session_state.mapping_rows = [
            {"src": c["name"], "dst": auto_map.get(c["name"])} for c in src_cols
        ]
with btn_col2:
    st.caption("Bấm 'Tự động match' để hệ thống tự đề xuất ghép cột theo tên, sau đó bạn có thể chỉnh lại thủ công bên dưới.")

# nếu chưa có mapping (lần đầu vào bảng mới), khởi tạo rỗng theo cột nguồn
current_src_names = [c["name"] for c in src_cols]
mapped_src_names = [r["src"] for r in st.session_state.mapping_rows]
if set(mapped_src_names) != set(current_src_names):
    st.session_state.mapping_rows = [{"src": c["name"], "dst": None} for c in src_cols]

src_type_map = {c["name"]: c["type"] for c in src_cols}
dst_type_map = {c["name"]: c["type"] for c in dst_cols}

st.markdown("**Ghép cột: chọn cột Neon tương ứng cho mỗi cột MySQL**")

mismatch_found = False
final_mapping = {}

header = st.columns([3, 1, 3, 2])
header[0].markdown("**Cột MySQL (kiểu)**")
header[1].markdown("**→**")
header[2].markdown("**Cột Neon (kiểu)**")
header[3].markdown("**Trạng thái**")

for i, row in enumerate(st.session_state.mapping_rows):
    src_name = row["src"]
    src_type = src_type_map.get(src_name, "?")

    c1, c2, c3, c4 = st.columns([3, 1, 3, 2])
    c1.write(f"`{src_name}`  \n:gray[{src_type}]")
    c2.write("→")

    options = ["-- Bỏ qua --"] + dst_col_names
    current_dst = row["dst"] if row["dst"] in dst_col_names else None
    default_index = options.index(current_dst) if current_dst else 0

    selected = c3.selectbox(
        f"map_{i}", options=options, index=default_index,
        key=f"map_select_{i}", label_visibility="collapsed"
    )
    chosen_dst = None if selected == "-- Bỏ qua --" else selected
    st.session_state.mapping_rows[i]["dst"] = chosen_dst

    if chosen_dst:
        dst_type = dst_type_map.get(chosen_dst, "?")
        compatible = is_type_compatible(src_type, dst_type)
        if compatible:
            c4.success(f"✅ Khớp ({dst_type})")
        else:
            c4.error(f"⚠️ Không khớp kiểu: {src_type} ≠ {dst_type}")
            mismatch_found = True
        final_mapping[src_name] = chosen_dst
    else:
        c4.write(":gray[Bỏ qua]")

st.divider()

# --- STEP 3: cảnh báo & tổng kết ---
st.subheader("3️⃣ Kiểm tra & Tổng kết")

if not final_mapping:
    st.warning("Chưa có cột nào được match. Vui lòng chọn ít nhất 1 cặp cột.")
    st.stop()

summary_df = pd.DataFrame([
    {
        "Cột MySQL": s,
        "Kiểu MySQL": src_type_map.get(s, "?"),
        "Cột Neon": d,
        "Kiểu Neon": dst_type_map.get(d, "?"),
        "Khớp kiểu?": "✅" if is_type_compatible(src_type_map.get(s, ""), dst_type_map.get(d, "")) else "⚠️ Không khớp",
    }
    for s, d in final_mapping.items()
])
st.dataframe(summary_df, use_container_width=True, hide_index=True)

force_continue = False
if mismatch_found:
    st.error("⚠️ Có cột kiểu dữ liệu KHÔNG khớp. Hệ thống sẽ cố gắng convert tự động (vd int↔float, date↔datetime), nhưng có thể gây lỗi hoặc mất dữ liệu.")
    force_continue = st.checkbox("Tôi hiểu rủi ro, vẫn tiếp tục migrate", value=False)
else:
    force_continue = True

row_count_preview = get_row_count(mysql_engine, src_table)
st.info(f"Bảng nguồn `{src_table}` có khoảng **{row_count_preview}** dòng.")

st.divider()

# --- STEP 4: migrate ---
st.subheader("4️⃣ Thực hiện Migrate")

col_btn, col_clear = st.columns([1, 1])
with col_btn:
    start_migrate = st.button(
        "🚀 Bắt đầu Migrate dữ liệu",
        type="primary",
        use_container_width=True,
        disabled=not force_continue,
    )
with col_clear:
    if st.button("🧹 Xóa log", use_container_width=True):
        st.session_state.logs = []
        st.rerun()

progress_bar = st.progress(0)
status_text = st.empty()
st.markdown("**📜 Log tiến trình:**")
log_container = st.empty()
render_logs(log_container)

if start_migrate:
    st.session_state.logs = []
    log(f"Bắt đầu migrate: {src_table} (MySQL) → {dst_table} (Neon)")
    log(f"Mapping cột: {final_mapping}")
    with st.spinner("Đang migrate dữ liệu..."):
        run_migration(
            mysql_engine, neon_engine,
            src_table, dst_table, final_mapping,
            dst_schema="public",
            progress_bar=progress_bar,
            status_text=status_text,
            log_container=log_container,
        )
