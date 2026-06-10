import { CardSim } from "lucide-react";
import React from "react";

export default function BasicDetailsMenu({ errors, watch, register,setValue }) {
  const CATEGORIES = [
    "Starters",
    "Main course",
    "Breads",
    "Rice & biryani",
    "Desserts",
    "Beverages",
  ];
  const category = watch("category");
  const foodType = watch("foodType");
  function FormField({
    label,
    required,
    error,
    children,
  }: {
    label: string;
    required?: boolean;
    error?: string;
    children: React.ReactNode;
  }) {
    return (
      <div style={{ marginBottom: 16 }}>
        <label
          style={{
            display: "block",
            fontSize: 13,
            fontWeight: 500,
            color: "#374151",
            marginBottom: 6,
          }}
        >
          {label} {required && <span style={{ color: "#FC8019" }}>*</span>}
        </label>
        {children}
        {error && (
          <p style={{ fontSize: 11, color: "#b91c1c", marginTop: 4 }}>
            {error}
          </p>
        )}
      </div>
    );
  }

  function Card({
    title,
    icon,
    children,
  }: {
    title: string;
    icon: string;
    children: React.ReactNode;
  }) {
    return (
      <div
        style={{
          background: "#fff",
          borderRadius: 16,
          border: "1px solid #e8e8e8",
          padding: "20px 24px",
          marginBottom: 16,
          boxShadow: "0 1px 3px rgba(0,0,0,0.04)",
        }}
      >
        <p
          style={{
            fontSize: 11,
            fontWeight: 700,
            letterSpacing: "0.1em",
            color: "#9ca3af",
            marginBottom: 16,
            display: "flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span>{icon}</span> {title}
        </p>
        {children}
      </div>
    );
  }

  const Input = React.forwardRef<
    HTMLInputElement,
    React.InputHTMLAttributes<HTMLInputElement>
  >((props, ref) => (
    <input
      ref={ref}
      {...props}
      style={inputStyle}
      onFocus={(e) => {
        e.target.style.borderColor = "#FC8019";
        e.target.style.boxShadow = "0 0 0 3px #FC801920";
        props.onFocus?.(e);
      }}
      onBlur={(e) => {
        e.target.style.borderColor = "#e5e7eb";
        e.target.style.boxShadow = "none";
        props.onBlur?.(e);
      }}
    />
  ));
  Input.displayName = "Input";

  return (
    <>
      <Card title="BASIC DETAILS" icon="📋">
        <FormField label="Item name" required error={errors.itemName?.message}>
          <Input
            placeholder="e.g. Paneer Butter Masala"
            {...register("itemName")}
          />
        </FormField>

        <FormField label="Description" error={errors.description?.message}>
          <textarea
            placeholder="Describe the dish — key ingredients, taste profile, speciality..."
            rows={3}
            style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
            {...register("description")}
          />
        </FormField>

        <FormField label="Food type" required error={errors.foodType?.message}>
          <div style={{ display: "flex", gap: 12 }}>
            {(["veg", "nonveg"] as const).map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => setValue("foodType", t)}
                style={{
                  flex: 1,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "10px 0",
                  borderRadius: 10,
                  cursor: "pointer",
                  fontSize: 13,
                  fontWeight: 600,
                  border:
                    foodType === t
                      ? `2px solid ${t === "veg" ? "#16a34a" : "#b91c1c"}`
                      : "1.5px solid #e5e7eb",
                  background:
                    foodType === t
                      ? t === "veg"
                        ? "#f0fdf4"
                        : "#fff1f2"
                      : "#fff",
                  color:
                    foodType === t
                      ? t === "veg"
                        ? "#16a34a"
                        : "#b91c1c"
                      : "#9ca3af",
                  transition: "all 0.15s",
                }}
              >
                <span
                  style={{
                    width: 10,
                    height: 10,
                    borderRadius: "50%",
                    background: t === "veg" ? "#16a34a" : "#b91c1c",
                    flexShrink: 0,
                  }}
                />
                {t === "veg" ? "Veg" : "Non-veg"}
              </button>
            ))}
          </div>
        </FormField>

        <FormField label="Category" required error={errors.category?.message}>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, 1fr)",
              gap: 8,
              marginTop: 4,
            }}
          >
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                type="button"
                onClick={() => setValue("category", cat)}
                style={{
                  padding: "8px 6px",
                  borderRadius: 8,
                  fontSize: 12,
                  fontWeight: 500,
                  cursor: "pointer",
                  transition: "all 0.15s",
                  textAlign: "center",
                  border:
                    category === cat
                      ? "2px solid #FC8019"
                      : "1.5px solid #e5e7eb",
                  background: category === cat ? "#fff8f3" : "#fff",
                  color: category === cat ? "#FC8019" : "#6b7280",
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </FormField>
      </Card>
    </>
  );
}



const inputStyle: React.CSSProperties = {
  width: "100%",
  padding: "9px 12px",
  borderRadius: 8,
  border: "1.5px solid #e5e7eb",
  fontSize: 13,
  color: "#1f2937",
  outline: "none",
  background: "#fff",
  transition: "border-color 0.15s, box-shadow 0.15s",
  boxSizing: "border-box",
};