import React from "react";

export default function Settings({ watch, setValue, register }) {
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

  function Toggle({
    checked,
    onChange,
  }: {
    checked: boolean;
    onChange: () => void;
  }) {
    return (
      <button
        type="button"
        onClick={onChange}
        style={{
          position: "relative",
          width: 40,
          height: 22,
          borderRadius: 11,
          border: "none",
          cursor: "pointer",
          flexShrink: 0,
          background: checked ? "#FC8019" : "#d1d5db",
          transition: "background 0.2s",
        }}
      >
        <span
          style={{
            position: "absolute",
            top: 3,
            width: 16,
            height: 16,
            borderRadius: "50%",
            background: "#fff",
            transition: "left 0.2s",
            left: checked ? 21 : 3,
            boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
          }}
        />
      </button>
    );
  }

  const prepMin = watch("preparationTime.min");
  const prepMax = watch("preparationTime.max");
  const isAvailable = watch("isAvailable");
  const enablePreOrder = watch("enablePreOrder");
  const allowSpecialInstructions = watch("allowSpecialInstructions");
  const eligibleForOffers = watch("eligibleForOffers");
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
      <Card title="AVAILABILITY & SETTINGS" icon="⚙️">
        <div>
          {[
            {
              field: "isAvailable" as const,
              value: isAvailable,
              label: "Mark as available",
              sub: "Item will show live on menu immediately",
            },
            {
              field: "enablePreOrder" as const,
              value: enablePreOrder,
              label: "Enable pre-order",
              sub: "Customers can schedule this item in advance",
            },
            {
              field: "allowSpecialInstructions" as const,
              value: allowSpecialInstructions,
              label: "Allow special instructions",
              sub: "Customers can add notes while ordering",
            },
            {
              field: "eligibleForOffers" as const,
              value: eligibleForOffers,
              label: "Eligible for discounts & offers",
              sub: "Include in platform-wide promotions",
            },
          ].map(({ field, value, label, sub }, i, arr) => (
            <div
              key={field}
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "12px 0",
                borderBottom: i < arr.length - 1 ? "1px solid #f3f4f6" : "none",
              }}
            >
              <div>
                <p
                  style={{
                    fontSize: 13,
                    color: "#1f2937",
                    fontWeight: 500,
                    margin: 0,
                  }}
                >
                  {label}
                </p>
                <p
                  style={{
                    fontSize: 11,
                    color: "#9ca3af",
                    marginTop: 2,
                    margin: 0,
                  }}
                >
                  {sub}
                </p>
              </div>
              <Toggle
                checked={!!value}
                onChange={() => setValue(field, !value)}
              />
            </div>
          ))}
        </div>

        <div style={{ marginTop: 20 }}>
          <p
            style={{
              fontSize: 13,
              fontWeight: 600,
              color: "#374151",
              marginBottom: 12,
            }}
          >
            Preparation time (minutes)
          </p>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr 1fr",
              gap: 12,
              alignItems: "center",
            }}
          >
            <div>
              <Input
                type="number"
                {...register("preparationTime.min", {
                  valueAsNumber: true,
                })}
              />
              <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
                Min
              </p>
            </div>
            <div>
              <Input
                type="number"
                {...register("preparationTime.max", {
                  valueAsNumber: true,
                })}
              />
              <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>
                Max
              </p>
            </div>
            <div style={{ textAlign: "center" }}>
              <p
                style={{
                  fontSize: 26,
                  fontWeight: 700,
                  color: "#FC8019",
                  margin: 0,
                }}
              >
                {prepMin}–{prepMax}
              </p>
              <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>
                shown to customer
              </p>
            </div>
          </div>
        </div>
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
