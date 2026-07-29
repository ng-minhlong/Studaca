# MySQL → Neon (PostgreSQL) Migrator — Streamlit

App Streamlit để migrate dữ liệu từ 1 bảng MySQL (phpMyAdmin) sang 1 bảng Neon (PostgreSQL) tuỳ chọn, có match cột thủ công/tự động, kiểm tra kiểu dữ liệu, log + progress bar theo thời gian thực.

## 1. Cài đặt

```bash
pip install -r requirements.txt
```

## 2. Cấu hình `.env`

Copy `.env.example` thành `.env` rồi điền thông tin thật:

```dotenv
DB_NAME=studaca
DB_USER=root
DB_PASSWORD=
DB_HOST=127.0.0.1:3308

DATABASE_URL="postgresql://neondb_owner:xxxxx@ep-xxxxx-pooler.c-4.us-east-2.aws.neon.tech/neondb?sslmode=require&channel_binding=require"
```

> Lưu ý: `DB_HOST` có thể để dạng `host:port` (vd `127.0.0.1:3308`), app tự tách port.

## 3. Chạy app

```bash
streamlit run app.py
```

## 4. Quy trình sử dụng

1. App tự động đọc `.env` và kết nối cả 2 database khi mở lên. Trạng thái kết nối hiển thị ở đầu trang.
2. **Bước 1** — Chọn bảng nguồn (MySQL) và bảng đích (Neon) từ 2 dropdown.
3. **Bước 2** — Bấm **"🤖 Tự động match"** để hệ thống tự ghép cột theo tên (so khớp tuyệt đối → chuẩn hóa tên → độ tương đồng chuỗi). Sau đó bạn có thể sửa lại từng dòng bằng dropdown.
4. **Bước 3** — App hiển thị bảng tổng kết mapping, đánh dấu ⚠️ nếu kiểu dữ liệu 2 cột không khớp (vd `varchar` ↔ `integer`). Nếu có mismatch, phải tick xác nhận "vẫn tiếp tục" mới cho migrate.
5. **Bước 4** — Bấm **"🚀 Bắt đầu Migrate dữ liệu"**. App đọc dữ liệu theo từng chunk (500 dòng), convert kiểu nếu cần, insert vào Neon, cập nhật progress bar + log theo thời gian thực.

## Ghi chú kỹ thuật

- Đọc MySQL theo từng chunk bằng `LIMIT/OFFSET` để tránh load hết dữ liệu vào RAM cùng lúc.
- Insert vào Neon dùng SQLAlchemy Core (`Table.insert()`) theo transaction từng chunk — nếu 1 chunk lỗi, app log lại và tiếp tục các chunk sau (không dừng toàn bộ tiến trình).
- Việc "convert kiểu" chỉ là ép kiểu đơn giản (int/float/bool/datetime) — không đảm bảo đúng 100% với các trường hợp đặc biệt (enum, json phức tạp, v.v.), nên khuyến khích để cột kiểu khớp nhau trước khi migrate.
- Chỉ hỗ trợ migrate **1 bảng nguồn → 1 bảng đích** mỗi lần chạy, đúng như yêu cầu ban đầu.