import React from "react";
import { useFieldArray } from "react-hook-form";

/** 🔥 SAFE NUMBER PARSER */
const safeNumber = (v: any) => {
  if (v === "" || v === null || v === undefined) return 0;
  const n = Number(v);
  return Number.isFinite(n) ? n : 0;
};

export default function Price({ errors, register, control }: any) {
  const {
    fields: variantFields,
    append: appendVariant,
    remove: removeVariant,
  } = useFieldArray({
    control,
    name: "variants",
  });

  function Card({ title, icon, children }: any) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          border: "1px solid #e8e8e8",
          padding: "20px 24px",
          marginBottom: 16,
        }}
      >
        <p style={{ fontSize: 11, fontWeight: 700, marginBottom: 16 }}>
          <span>{icon}</span> {title}
        </p>
        {children}
      </div>
    );
  }

  function FormField({ label, error, children, required }: any) {
    return (
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 13, marginBottom: 6, display: "block" }}>
          {label} {required && "*"}
        </label>
        {children}
        {error && (
          <p style={{ fontSize: 11, color: "red" }}>{error}</p>
        )}
      </div>
    );
  }

  return (
    <Card title="PRICING & PORTIONS" icon="💰">
      {/* TOP PRICING */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr 1fr",
          gap: 12,
        }}
      >
        {/* Base Price */}
        <FormField
          label="Base price"
          required
          error={errors?.basePrice?.message}
        >
          <input
            type="number"
            placeholder="299"
            {...register("basePrice", {
              setValueAs: safeNumber,
            })}
            style={inputStyle}
          />
        </FormField>

        {/* Discount Price */}
        <FormField
          label="Discount price"
          error={errors?.discountPrice?.message}
        >
          <input
            type="number"
            placeholder="249"
            {...register("discountPrice", {
              setValueAs: safeNumber,
            })}
            style={inputStyle}
          />
        </FormField>

        {/* GST */}
        <FormField label="GST %" error={errors?.gst?.message}>
          <select
            {...register("gst", {
              setValueAs: safeNumber,
            })}
            style={inputStyle}
          >
            {[5, 12, 18, 28].map((g) => (
              <option key={g} value={g}>
                {g}%
              </option>
            ))}
          </select>
        </FormField>
      </div>

      {/* VARIANTS */}
      <FormField label="Variants">
        {variantFields.map((field, index) => (
          <div
            key={field.id}
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 100px 30px",
              gap: 8,
              marginBottom: 8,
              alignItems: "center",
            }}
          >
            {/* Variant Name */}
            <input
              placeholder="Size name (e.g. Full)"
              {...register(`variants.${index}.name`)}
              style={ghostStyle}
            />

            {/* Variant Price */}
            <input
              type="number"
              placeholder="Price"
              {...register(`variants.${index}.price`, {
                setValueAs: safeNumber,
              })}
              style={ghostStyle}
            />

            {/* Remove */}
            <button
              type="button"
              onClick={() => removeVariant(index)}
              style={{
                border: "none",
                background: "transparent",
                cursor: "pointer",
                fontSize: 18,
              }}
            >
              ×
            </button>
          </div>
        ))}

        {/* Add Variant */}
        <button
          type="button"
          onClick={() =>
            appendVariant({
              name: "",
              price: 0,
            })
          }
          style={{
            marginTop: 10,
            color: "#FC8019",
            border: "none",
            background: "transparent",
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          + Add variant
        </button>
      </FormField>
    </Card>
  );
}

/* Styles */
const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: 8,
  border: "1px solid #e5e7eb",
  fontSize: 13,
  outline: "none",
  boxSizing: "border-box",
};

const ghostStyle: React.CSSProperties = {
  border: "none",
  borderBottom: "1px solid #ccc",
  outline: "none",
  padding: "4px 0",
  width: "100%",
};