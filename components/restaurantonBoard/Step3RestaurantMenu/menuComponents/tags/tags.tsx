import React from "react";

export default function Tags({ setValue, watch }) {
  const TAGS = [
    "Bestseller",
    "Must-try",
    "Chef's special",
    "Spicy",
    "Gluten-free",
    "Jain",
    "No onion/garlic",
    "Low calorie",
  ];
  const selectedTags = watch("tags") ?? [];

  const toggleTag = (tag: string) => {
    const next = selectedTags.includes(tag)
      ? selectedTags.filter((t) => t !== tag)
      : [...selectedTags, tag];
    setValue("tags", next);
  };
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

  return (
    <>
      <Card title="TAGS & DIETARY INFO" icon="🏷">
        <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>
          Select all that apply
        </p>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {TAGS.map((tag) => (
            <button
              key={tag}
              type="button"
              onClick={() => toggleTag(tag)}
              style={{
                padding: "6px 14px",
                borderRadius: 20,
                fontSize: 13,
                cursor: "pointer",
                transition: "all 0.15s",
                fontWeight: 500,
                background: selectedTags.includes(tag) ? "#FC8019" : "#fff",
                border: selectedTags.includes(tag)
                  ? "1.5px solid #FC8019"
                  : "1.5px solid #d1d5db",
                color: selectedTags.includes(tag) ? "#fff" : "#6b7280",
              }}
            >
              {tag}
            </button>
          ))}
        </div>
      </Card>
    </>
  );
}
