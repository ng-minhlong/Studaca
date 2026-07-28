"use client";

import { useEffect, useMemo, useState, type ChangeEvent, type FormEvent } from "react";

type EnumOption = {
  value: string;
  label: string;
};

type ModelField = {
  name: string;
  type: string;
  isId: boolean;
  isRequired: boolean;
  hasDefaultValue: boolean;
  enumName?: string;
  enumValues?: EnumOption[];
};

type ModelMeta = {
  name: string;
  label: string;
  tableName: string;
  fields: ModelField[];
};

type RecordItem = Record<string, unknown> & {
  number?: number;
};

const defaultModel = "DigitalSatQuestionBankMath";

export default function AdminTestManagerPage() {
  const [models, setModels] = useState<ModelMeta[]>([]);
  const [selectedModel, setSelectedModel] = useState(defaultModel);
  const [selectedModelMeta, setSelectedModelMeta] = useState<ModelMeta | null>(null);
  const [records, setRecords] = useState<RecordItem[]>([]);
  const [formData, setFormData] = useState<Record<string, unknown>>({});
  const [editingRecord, setEditingRecord] = useState<RecordItem | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showFullscreen, setShowFullscreen] = useState(false);

  const loadModels = async () => {
    try {
      const res = await fetch("/api/tests/test/manage");
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Unable to load model list");
      }

      const nextModels = data.models as ModelMeta[];
      setModels(nextModels);
      if (!selectedModel && nextModels[0]) {
        setSelectedModel(nextModels[0].name);
      }
      setSelectedModelMeta(nextModels.find((item) => item.name === selectedModel) ?? null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load models");
    }
  };

  const loadRecords = async (modelName = selectedModel) => {
    setLoading(true);
    try {
      const res = await fetch(`/api/tests/test/manage?model=${encodeURIComponent(modelName)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? "Unable to load records");
      }

      setRecords(data.records as RecordItem[]);
      setSelectedModelMeta(data.model as ModelMeta);
      setMessage(null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to load records");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    void loadModels();
  }, []);

  useEffect(() => {
    if (!selectedModel) return;
    void loadRecords(selectedModel);
  }, [selectedModel]);

  useEffect(() => {
    if (selectedModelMeta) {
      resetForm(selectedModelMeta, null);
    }
  }, [selectedModelMeta]);

  const helperFields = useMemo(() => selectedModelMeta?.fields ?? [], [selectedModelMeta]);

  const filteredRecords = useMemo(() => {
    const query = searchTerm.trim().toLowerCase();
    if (!query) return records;

    return records.filter((record) => {
      const haystack = [record.testname, record.idTest, record.number]
        .filter(Boolean)
        .map((value) => String(value).toLowerCase())
        .join(" ");
      return haystack.includes(query);
    });
  }, [records, searchTerm]);

  const resetForm = (modelMeta: ModelMeta | null, record: RecordItem | null = null) => {
    setEditingRecord(record);
    setFormData(buildInitialFormData(modelMeta, record));
    setMessage(null);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    setLoading(true);

    try {
      const payload = buildPayload(selectedModelMeta, formData, editingRecord);
      const method = editingRecord ? "PATCH" : "POST";
      const res = await fetch("/api/tests/test/manage", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel,
          record: payload,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Operation failed");
      }

      setMessage(editingRecord ? "Record updated successfully" : "Record created successfully");
      setEditingRecord(null);
      await loadRecords(selectedModel);
      resetForm(selectedModelMeta, null);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Unable to save record");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (record: RecordItem) => {
    if (!window.confirm("Delete this record?")) {
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/tests/test/manage", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: selectedModel,
          number: record.number,
        }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Delete failed");
      }

      setMessage("Record deleted successfully");
      await loadRecords(selectedModel);
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (record: RecordItem) => {
    resetForm(selectedModelMeta, record);
  };

  const updateField = (fieldName: string, value: unknown) => {
    setFormData((previous) => ({ ...previous, [fieldName]: value }));
  };

  const handleScalarInput = (field: ModelField, event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const rawValue = event.target.value;
    if (field.type === "Int" || field.type === "Float") {
      updateField(field.name, rawValue === "" ? "" : Number(rawValue));
      return;
    }

    if (field.type === "Boolean") {
      updateField(field.name, event.target instanceof HTMLInputElement ? event.target.checked : rawValue === "true");
      return;
    }

    updateField(field.name, rawValue);
  };

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-semibold">Test manager</h1>
        <p className="text-sm text-muted-foreground">
          Chọn loại bảng test từ schema, sau đó thêm mới, sửa hoặc xóa bản ghi.
        </p>
      </div>

      <div className="rounded-xl border bg-white p-4 shadow-sm">
        <label className="mb-2 block text-sm font-medium" htmlFor="model-select">
          Chọn loại bảng
        </label>
        <select
          id="model-select"
          value={selectedModel}
          onChange={(event) => {
            setSelectedModel(event.target.value);
            setMessage(null);
          }}
          className="w-full rounded-md border px-3 py-2"
        >
          {models.map((model) => (
            <option key={model.name} value={model.name}>
              {model.label} ({model.tableName})
            </option>
          ))}
        </select>
      </div>

      <div className="grid gap-6 2xl:grid-cols-[1.15fr_0.85fr]">
        <div className="min-w-0 rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div>
              <h2 className="text-lg font-semibold">Records</h2>
              <p className="text-sm text-muted-foreground">
                {selectedModelMeta?.label ?? selectedModel} • {filteredRecords.length} / {records.length} records
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              <input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search testname or idTest"
                className="rounded-md border px-3 py-2 text-sm"
              />
              <button
                type="button"
                className="rounded-md border px-3 py-2 text-sm"
                onClick={() => void loadRecords(selectedModel)}
              >
                Refresh
              </button>
            </div>
          </div>

          {loading && <p className="text-sm text-muted-foreground">Loading…</p>}

          {!loading && filteredRecords.length === 0 && (
            <p className="text-sm text-muted-foreground">No records yet for this model.</p>
          )}

          {!loading && filteredRecords.length > 0 && (
            <div className="w-full max-w-full overflow-hidden rounded-lg border">
              <div className="flex items-center justify-end p-2">
                <button
                  type="button"
                  className="rounded-md border px-2 py-1 text-xs"
                  onClick={() => setShowFullscreen(true)}
                >
                  Full screen
                </button>
              </div>
              <div className="w-full max-w-full overflow-x-auto">
                <table className="min-w-[640px] w-full divide-y divide-slate-200 text-sm">
                  <thead className="bg-slate-50">
                    <tr>
                      {helperFields.map((field) => (
                        <th key={field.name} className="whitespace-nowrap px-3 py-2 text-left font-medium text-slate-700">
                          {field.name}
                        </th>
                      ))}
                      <th className="px-3 py-2 text-left font-medium text-slate-700">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {filteredRecords.map((record, index) => (
                      <tr key={`${record.number ?? "row"}-${index}`} className="align-top">
                        {helperFields.map((field) => (
                          <td key={`${record.number ?? "row"}-${field.name}`} className="max-w-[220px] px-3 py-2 text-slate-700">
                            <div className="line-clamp-3 break-words">
                              {renderCellValue(record[field.name])}
                            </div>
                          </td>
                        ))}
                        <td className="px-3 py-2">
                          <div className="flex gap-2">
                            <button type="button" className="rounded-md border px-2 py-1 text-xs" onClick={() => handleEdit(record)}>
                              Edit
                            </button>
                            <button type="button" className="rounded-md border px-2 py-1 text-xs text-red-600" onClick={() => void handleDelete(record)}>
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>

        <div className="min-w-0 rounded-xl border bg-white p-4 shadow-sm">
          <div className="mb-4">
            <h2 className="text-lg font-semibold">{editingRecord ? "Edit record" : "Create record"}</h2>
            <p className="text-sm text-muted-foreground">
              Điền thông tin cho từng field. Nếu là enum thì sẽ hiển thị dropdown.
            </p>
          </div>

          {message ? <p className="mb-3 text-sm text-slate-600">{message}</p> : null}

          <form onSubmit={handleSubmit} className="space-y-3">
            {helperFields.map((field) => {
              const value = formData[field.name];
              const inputClassName = "w-full rounded-md border px-3 py-2 text-sm";

              if (field.enumValues && field.enumValues.length > 0) {
                return (
                  <div key={field.name}>
                    <label className="mb-1 block text-sm font-medium" htmlFor={field.name}>
                      {field.name}
                    </label>
                    <select
                      id={field.name}
                      value={String(value ?? "")}
                      onChange={(event) => handleScalarInput(field, event)}
                      className={inputClassName}
                    >
                      {field.enumValues.map((option) => (
                        <option key={option.value} value={option.value}>
                          {option.label}
                        </option>
                      ))}
                    </select>
                  </div>
                );
              }

              if (field.type === "Boolean") {
                return (
                  <label key={field.name} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={Boolean(value)}
                      onChange={(event) => updateField(field.name, event.target.checked)}
                    />
                    <span>{field.name}</span>
                  </label>
                );
              }

              if (field.type === "Json") {
                return (
                  <div key={field.name}>
                    <label className="mb-1 block text-sm font-medium" htmlFor={field.name}>
                      {field.name}
                    </label>
                    <textarea
                      id={field.name}
                      value={typeof value === "string" ? value : JSON.stringify(value ?? {}, null, 2)}
                      onChange={(event) => updateField(field.name, event.target.value)}
                      className="min-h-[110px] w-full rounded-md border px-3 py-2 font-mono text-sm"
                      spellCheck={false}
                    />
                  </div>
                );
              }

              if (field.type === "Int" || field.type === "Float") {
                return (
                  <div key={field.name}>
                    <label className="mb-1 block text-sm font-medium" htmlFor={field.name}>
                      {field.name}
                    </label>
                    <input
                      id={field.name}
                      type="number"
                      value={value === undefined || value === null || value === "" ? "" : String(value)}
                      onChange={(event) => handleScalarInput(field, event)}
                      className={inputClassName}
                    />
                  </div>
                );
              }

              return (
                <div key={field.name}>
                  <label className="mb-1 block text-sm font-medium" htmlFor={field.name}>
                    {field.name}
                  </label>
                  <input
                    id={field.name}
                    type={field.type === "DateTime" ? "text" : "text"}
                    value={value === undefined || value === null ? "" : String(value)}
                    onChange={(event) => handleScalarInput(field, event)}
                    className={inputClassName}
                  />
                </div>
              );
            })}

            <div className="flex gap-2 pt-2">
              <button type="submit" className="rounded-md bg-slate-900 px-3 py-2 text-sm text-white" disabled={loading}>
                {editingRecord ? "Save changes" : "Add new"}
              </button>
              <button type="button" onClick={() => resetForm(selectedModelMeta, null)} className="rounded-md border px-3 py-2 text-sm">
                Reset
              </button>
            </div>
          </form>
        </div>
      </div>

      {showFullscreen ? (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4">
          <div className="w-full max-w-7xl rounded-xl bg-white p-4 shadow-2xl">
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-lg font-semibold">{selectedModelMeta?.label ?? selectedModel} records</h3>
              <button type="button" className="rounded-md border px-3 py-2 text-sm" onClick={() => setShowFullscreen(false)}>
                Close
              </button>
            </div>
            <div className="max-w-full overflow-x-auto">
              <table className="min-w-[720px] divide-y divide-slate-200 text-sm">
                <thead className="bg-slate-50">
                  <tr>
                    {helperFields.map((field) => (
                      <th key={field.name} className="whitespace-nowrap px-3 py-2 text-left font-medium text-slate-700">
                        {field.name}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 bg-white">
                  {filteredRecords.map((record, index) => (
                    <tr key={`${record.number ?? "row"}-${index}`} className="align-top">
                      {helperFields.map((field) => (
                        <td key={`${record.number ?? "row"}-${field.name}`} className="max-w-[260px] px-3 py-2 text-slate-700">
                          <div className="break-words">{renderCellValue(record[field.name])}</div>
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function buildInitialFormData(modelMeta: ModelMeta | null, record: RecordItem | null) {
  const result: Record<string, unknown> = {};

  if (!modelMeta) {
    return result;
  }

  modelMeta.fields.forEach((field) => {
    if (record && record[field.name] !== undefined) {
      result[field.name] = record[field.name];
      return;
    }

    if (field.isId) {
      result[field.name] = "";
      return;
    }

    switch (field.type) {
      case "String":
        result[field.name] = field.enumValues?.[0]?.value ?? "";
        break;
      case "Int":
      case "Float":
        result[field.name] = 0;
        break;
      case "Boolean":
        result[field.name] = false;
        break;
      case "DateTime":
        result[field.name] = new Date().toISOString();
        break;
      case "Json":
        result[field.name] = {};
        break;
      default:
        result[field.name] = field.enumValues?.[0]?.value ?? "";
    }
  });

  return result;
}

function buildPayload(modelMeta: ModelMeta | null, formData: Record<string, unknown>, editingRecord: RecordItem | null) {
  const payload: Record<string, unknown> = {};

  modelMeta?.fields.forEach((field) => {
    if (field.isId && !editingRecord) {
      return;
    }

    const value = formData[field.name];

    if (value === undefined || value === null) {
      return;
    }

    if (field.type === "Json") {
      if (typeof value === "string") {
        try {
          payload[field.name] = JSON.parse(value);
        } catch {
          payload[field.name] = value;
        }
      } else {
        payload[field.name] = value;
      }
      return;
    }

    payload[field.name] = value;
  });

  return payload;
}

function renderCellValue(value: unknown) {
  if (value === null || value === undefined) return "—";
  if (typeof value === "object") {
    try {
      return JSON.stringify(value);
    } catch {
      return String(value);
    }
  }
  return String(value);
}
