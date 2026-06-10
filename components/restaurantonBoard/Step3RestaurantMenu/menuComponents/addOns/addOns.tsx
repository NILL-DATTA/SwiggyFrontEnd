import React from "react";

interface Addon {
  name: string;
  price: number;
}

interface AddonsProps {
  watch: any;
  setValue: any;
}

export default function Addons({
  watch,
  setValue,
}: AddonsProps) {
  const ADDONS = [
    { label: "Extra cheese", price: 30 },
    { label: "Extra gravy", price: 20 },
    { label: "Butter naan", price: 40 },
    { label: "Raita", price: 25 },
    { label: "Papad", price: 15 },
    { label: "Pickle", price: 10 },
  ];

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

  const selectedAddons: Addon[] = (watch("addons") || []).filter(
    (item: any) =>
      typeof item === "object" &&
      item !== null &&
      item.name
  );
  const toggleAddon = (addon: {
    label: string;
    price: number;
  }) => {
    const exists = selectedAddons.some(
      (item) => item.name === addon.label
    );

    const updatedAddons = exists
      ? selectedAddons.filter(
        (item) => item.name !== addon.label
      )
      : [
        ...selectedAddons,
        {
          name: addon.label,
          price: addon.price,
        },
      ];

    setValue("addons", updatedAddons, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <Card title="CUSTOMISATIONS & ADD-ONS" icon="🛠">
      <p
        style={{
          fontSize: 12,
          color: "#9ca3af",
          marginBottom: 10,
        }}
      >
        Common add-ons
      </p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 8,
        }}
      >
        {ADDONS.map((addon) => (
          <label
            key={addon.label}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 8,
              border: "1px solid #e5e7eb",
              borderRadius: 8,
              padding: "9px 12px",
              cursor: "pointer",
            }}
          >
            <input
              type="checkbox"
              checked={selectedAddons.some(
                (item) => item.name === addon.label
              )}
              onChange={() => toggleAddon(addon)}
              style={{
                accentColor: "#FC8019",
                width: 14,
                height: 14,
              }}
            />

            <span
              style={{
                fontSize: 13,
                color: "#374151",
              }}
            >
              {addon.label}
              <span style={{ color: "#9ca3af" }}>
                {" "}
                (₹{addon.price})
              </span>
            </span>
          </label>
        ))}
      </div>
    </Card>
  );
}