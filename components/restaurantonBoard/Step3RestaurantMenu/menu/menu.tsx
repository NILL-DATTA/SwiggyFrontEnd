"use client";

import { useState } from "react";

const CATEGORIES = ["Starters", "Main course", "Breads", "Rice & biryani", "Desserts", "Beverages"];
const TAGS = ["Bestseller", "Must-try", "Chef's special", "Spicy", "Gluten-free", "Jain", "No onion/garlic", "Low calorie"];
const ADDONS = [
  { label: "Extra cheese", price: 30 },
  { label: "Extra gravy", price: 20 },
  { label: "Butter naan", price: 40 },
  { label: "Raita", price: 25 },
  { label: "Papad", price: 15 },
  { label: "Pickle", price: 10 },
];

const STEPS = [
  { num: 1, title: "Restaurant Information", status: "done" },
  { num: 2, title: "Restaurant Documents", status: "done" },
  { num: 3, title: "Menu Setup", status: "active" },
  { num: 4, title: "Partner Contract", status: "pending" },
];

interface Variant { id: number; name: string; price: string; }

export default function MenuSetupForm() {
  const [foodType, setFoodType] = useState<"veg" | "nonveg">("veg");
  const [category, setCategory] = useState("Starters");
  const [selectedTags, setSelectedTags] = useState<string[]>(["Bestseller", "Chef's special"]);
  const [selectedAddons, setSelectedAddons] = useState<string[]>(["Extra cheese", "Butter naan"]);
  const [variants, setVariants] = useState<Variant[]>([{ id: 1, name: "Full", price: "299" }]);
  const [prepMin, setPrepMin] = useState(20);
  const [prepMax, setPrepMax] = useState(30);
  const [settings, setSettings] = useState({ available: true, preorder: false, instructions: true, discounts: true });
  const [form, setForm] = useState({ name: "", description: "", basePrice: "", discountPrice: "", gst: "12%" });

  const toggleTag = (tag: string) =>
    setSelectedTags((p) => p.includes(tag) ? p.filter((t) => t !== tag) : [...p, tag]);
  const toggleAddon = (addon: string) =>
    setSelectedAddons((p) => p.includes(addon) ? p.filter((a) => a !== addon) : [...p, addon]);
  const addVariant = () => setVariants((p) => [...p, { id: Date.now(), name: "", price: "" }]);
  const removeVariant = (id: number) => setVariants((p) => p.filter((v) => v.id !== id));
  const updateVariant = (id: number, field: "name" | "price", value: string) =>
    setVariants((p) => p.map((v) => (v.id === id ? { ...v, [field]: value } : v)));

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: "#f4f4f4", fontFamily: "sans-serif" }}>




      {/* ── Main Content ── */}
      <main style={{ flex: 1, overflowY: "auto", padding: "32px 40px" }}>
        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 28 }}>
          <div>
            <h1 style={{ fontSize: 20, fontWeight: 700, color: "#1a1a1a", margin: 0 }}>Add menu item</h1>
            <p style={{ fontSize: 12, color: "#aaa", marginTop: 2 }}>Restaurant partner dashboard — menu setup</p>
          </div>
          <div style={{ display: "flex", gap: 6 }}>
            {[0, 1, 2, 3].map((i) => (
              <div key={i} style={{ height: 4, width: 40, borderRadius: 2, background: i === 0 ? "#FC8019" : i === 1 ? "#FC801966" : "#e5e7eb" }} />
            ))}
          </div>
        </div>

        {/* Basic Details */}
        <Card title="BASIC DETAILS" icon="📋">
          <FormField label="Item name" required>
            <Input placeholder="e.g. Paneer Butter Masala" value={form.name} onChange={(v) => setForm({ ...form, name: v })} />
          </FormField>

          <FormField label="Description">
            <textarea
              placeholder="Describe the dish — key ingredients, taste profile, speciality..."
              value={form.description}
              onChange={(e) => setForm({ ...form, description: e.target.value })}
              rows={3}
              style={{ ...inputStyle, resize: "vertical", minHeight: 80 }}
            />
          </FormField>

          <FormField label="Food type" required>
            <div style={{ display: "flex", gap: 12 }}>
              {(["veg", "nonveg"] as const).map((t) => (
                <button key={t} type="button" onClick={() => setFoodType(t)} style={{
                  flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "10px 0", borderRadius: 10, cursor: "pointer", fontSize: 13, fontWeight: 600,
                  border: foodType === t
                    ? `2px solid ${t === "veg" ? "#16a34a" : "#b91c1c"}`
                    : "1.5px solid #e5e7eb",
                  background: foodType === t
                    ? (t === "veg" ? "#f0fdf4" : "#fff1f2")
                    : "#fff",
                  color: foodType === t
                    ? (t === "veg" ? "#16a34a" : "#b91c1c")
                    : "#9ca3af",
                  transition: "all 0.15s",
                }}>
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: t === "veg" ? "#16a34a" : "#b91c1c", flexShrink: 0 }} />
                  {t === "veg" ? "Veg" : "Non-veg"}
                </button>
              ))}
            </div>
          </FormField>

          <FormField label="Category" required>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 8, marginTop: 4 }}>
              {CATEGORIES.map((cat) => (
                <button key={cat} type="button" onClick={() => setCategory(cat)} style={{
                  padding: "8px 6px", borderRadius: 8, fontSize: 12, fontWeight: 500, cursor: "pointer", transition: "all 0.15s", textAlign: "center",
                  border: category === cat ? "2px solid #FC8019" : "1.5px solid #e5e7eb",
                  background: category === cat ? "#fff8f3" : "#fff",
                  color: category === cat ? "#FC8019" : "#6b7280",
                }}>
                  {cat}
                </button>
              ))}
            </div>
          </FormField>
        </Card>

        {/* Photo */}
        <Card title="ITEM PHOTO" icon="📷">
          <div style={{ border: "2px dashed #d1d5db", borderRadius: 12, padding: "36px 20px", textAlign: "center", cursor: "pointer" }}
            onMouseEnter={(e) => (e.currentTarget.style.borderColor = "#FC8019")}
            onMouseLeave={(e) => (e.currentTarget.style.borderColor = "#d1d5db")}>
            <div style={{ fontSize: 32, marginBottom: 8 }}>☁️</div>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}>Drag & drop or click to upload</p>
            <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>JPG, PNG up to 5 MB — recommended 800×600 px</p>
          </div>
          <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 8 }}>✨ Items with photos get up to 30% more orders</p>
        </Card>

        {/* Pricing */}
        <Card title="PRICING & PORTIONS" icon="💰">
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
            <FormField label="Base price (₹)" required>
              <Input type="number" placeholder="299" value={form.basePrice} onChange={(v) => setForm({ ...form, basePrice: v })} />
            </FormField>
            <FormField label="Discount price">
              <Input type="number" placeholder="249" value={form.discountPrice} onChange={(v) => setForm({ ...form, discountPrice: v })} />
            </FormField>
            <FormField label="GST %">
              <select value={form.gst} onChange={(e) => setForm({ ...form, gst: e.target.value })} style={inputStyle}>
                {["5%", "12%", "18%", "28%"].map((g) => <option key={g}>{g}</option>)}
              </select>
            </FormField>
          </div>

          <FormField label="Portion sizes / variants" className="mt-4">
            <div style={{ display: "flex", flexDirection: "column", gap: 6, marginTop: 4 }}>
              {variants.map((v) => (
                <div key={v.id} style={{ display: "grid", gridTemplateColumns: "1fr 100px 32px", gap: 8, alignItems: "center", background: "#f9fafb", borderRadius: 8, padding: "8px 12px" }}>
                  <input type="text" placeholder="Size name (e.g. Half)" value={v.name}
                    onChange={(e) => updateVariant(v.id, "name", e.target.value)}
                    style={{ background: "transparent", border: "none", borderBottom: "1px solid #d1d5db", fontSize: 13, color: "#374151", outline: "none", padding: "2px 0" }} />
                  <input type="number" placeholder="₹ Price" value={v.price}
                    onChange={(e) => updateVariant(v.id, "price", e.target.value)}
                    style={{ background: "transparent", border: "none", borderBottom: "1px solid #d1d5db", fontSize: 13, color: "#374151", outline: "none", padding: "2px 0" }} />
                  {variants.length > 1 && (
                    <button type="button" onClick={() => removeVariant(v.id)}
                      style={{ background: "none", border: "none", cursor: "pointer", fontSize: 18, color: "#9ca3af", lineHeight: 1 }}>×</button>
                  )}
                </div>
              ))}
            </div>
            <button type="button" onClick={addVariant}
              style={{ marginTop: 10, background: "none", border: "none", cursor: "pointer", color: "#FC8019", fontSize: 13, fontWeight: 600, display: "flex", alignItems: "center", gap: 4, padding: 0 }}>
              + Add size variant
            </button>
          </FormField>
        </Card>

        {/* Add-ons */}
        <Card title="CUSTOMISATIONS & ADD-ONS" icon="🛠">
          <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>Common add-ons</p>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
            {ADDONS.map((addon) => (
              <label key={addon.label} style={{ display: "flex", alignItems: "center", gap: 8, border: "1px solid #e5e7eb", borderRadius: 8, padding: "9px 12px", cursor: "pointer" }}>
                <input type="checkbox" checked={selectedAddons.includes(addon.label)}
                  onChange={() => toggleAddon(addon.label)}
                  style={{ accentColor: "#FC8019", width: 14, height: 14 }} />
                <span style={{ fontSize: 13, color: "#374151" }}>
                  {addon.label} <span style={{ color: "#9ca3af" }}>(₹{addon.price})</span>
                </span>
              </label>
            ))}
          </div>
        </Card>

        {/* Tags */}
        <Card title="TAGS & DIETARY INFO" icon="🏷">
          <p style={{ fontSize: 12, color: "#9ca3af", marginBottom: 10 }}>Select all that apply</p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {TAGS.map((tag) => (
              <button key={tag} type="button" onClick={() => toggleTag(tag)} style={{
                padding: "6px 14px", borderRadius: 20, fontSize: 13, cursor: "pointer", transition: "all 0.15s", fontWeight: 500,
                background: selectedTags.includes(tag) ? "#FC8019" : "#fff",
                border: selectedTags.includes(tag) ? "1.5px solid #FC8019" : "1.5px solid #d1d5db",
                color: selectedTags.includes(tag) ? "#fff" : "#6b7280",
              }}>
                {tag}
              </button>
            ))}
          </div>
        </Card>

        {/* Settings */}
        <Card title="AVAILABILITY & SETTINGS" icon="⚙️">
          <div>
            {[
              { key: "available", label: "Mark as available", sub: "Item will show live on menu immediately" },
              { key: "preorder", label: "Enable pre-order", sub: "Customers can schedule this item in advance" },
              { key: "instructions", label: "Allow special instructions", sub: "Customers can add notes while ordering" },
              { key: "discounts", label: "Eligible for discounts & offers", sub: "Include in platform-wide promotions" },
            ].map(({ key, label, sub }, i, arr) => (
              <div key={key} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 0", borderBottom: i < arr.length - 1 ? "1px solid #f3f4f6" : "none" }}>
                <div>
                  <p style={{ fontSize: 13, color: "#1f2937", fontWeight: 500, margin: 0 }}>{label}</p>
                  <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 2, margin: 0 }}>{sub}</p>
                </div>
                <Toggle checked={settings[key as keyof typeof settings]}
                  onChange={() => setSettings((s) => ({ ...s, [key]: !s[key as keyof typeof settings] }))} />
              </div>
            ))}
          </div>

          <div style={{ marginTop: 20 }}>
            <p style={{ fontSize: 13, fontWeight: 600, color: "#374151", marginBottom: 12 }}>Preparation time (minutes)</p>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, alignItems: "center" }}>
              <div>
                <Input type="number" value={String(prepMin)} onChange={(v) => setPrepMin(Number(v))} />
                <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>Min</p>
              </div>
              <div>
                <Input type="number" value={String(prepMax)} onChange={(v) => setPrepMax(Number(v))} />
                <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 4 }}>Max</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p style={{ fontSize: 26, fontWeight: 700, color: "#FC8019", margin: 0 }}>{prepMin}–{prepMax}</p>
                <p style={{ fontSize: 11, color: "#9ca3af", marginTop: 2 }}>shown to customer</p>
              </div>
            </div>
          </div>
        </Card>

        {/* Action Buttons */}
        <div style={{ display: "flex", gap: 12, paddingBottom: 48 }}>
          <button type="button" style={{ padding: "12px 24px", border: "1.5px solid #d1d5db", borderRadius: 10, background: "#fff", fontSize: 13, color: "#6b7280", cursor: "pointer", fontWeight: 500 }}>
            Save as draft
          </button>
          <button type="submit" style={{ flex: 1, padding: "12px 24px", border: "none", borderRadius: 10, background: "#FC8019", color: "#fff", fontSize: 14, fontWeight: 700, cursor: "pointer", letterSpacing: "0.01em" }}>
            Save & publish →
          </button>
        </div>
      </main>
    </div>
  );
}

// ── Sub-components ──

function Card({ title, icon, children }: { title: string; icon: string; children: React.ReactNode }) {
  return (
    <div style={{ background: "#fff", borderRadius: 16, border: "1px solid #e8e8e8", padding: "20px 24px", marginBottom: 16, boxShadow: "0 1px 3px rgba(0,0,0,0.04)" }}>
      <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.1em", color: "#9ca3af", marginBottom: 16, display: "flex", alignItems: "center", gap: 6 }}>
        <span>{icon}</span> {title}
      </p>
      {children}
    </div>
  );
}

function FormField({ label, required, children }: { label: string; required?: boolean; children: React.ReactNode }) {
  return (
    <div style={{ marginBottom: 16 }}>
      <label style={{ display: "block", fontSize: 13, fontWeight: 500, color: "#374151", marginBottom: 6 }}>
        {label} {required && <span style={{ color: "#FC8019" }}>*</span>}
      </label>
      {children}
    </div>
  );
}

function Input({ placeholder, value, onChange, type = "text" }: {
  placeholder?: string; value?: string; onChange?: (v: string) => void; type?: string;
}) {
  return (
    <input type={type} placeholder={placeholder} value={value}
      onChange={(e) => onChange?.(e.target.value)}
      style={inputStyle}
      onFocus={(e) => { e.target.style.borderColor = "#FC8019"; e.target.style.boxShadow = "0 0 0 3px #FC801920"; }}
      onBlur={(e) => { e.target.style.borderColor = "#e5e7eb"; e.target.style.boxShadow = "none"; }}
    />
  );
}

function Toggle({ checked, onChange }: { checked: boolean; onChange: () => void }) {
  return (
    <button type="button" onClick={onChange} style={{
      position: "relative", width: 40, height: 22, borderRadius: 11, border: "none", cursor: "pointer", flexShrink: 0,
      background: checked ? "#FC8019" : "#d1d5db", transition: "background 0.2s",
    }}>
      <span style={{
        position: "absolute", top: 3, width: 16, height: 16, borderRadius: "50%", background: "#fff",
        transition: "left 0.2s", left: checked ? 21 : 3,
        boxShadow: "0 1px 3px rgba(0,0,0,0.2)",
      }} />
    </button>
  );
}

const inputStyle: React.CSSProperties = {
  width: "100%", padding: "9px 12px", borderRadius: 8, border: "1.5px solid #e5e7eb",
  fontSize: 13, color: "#1f2937", outline: "none", background: "#fff",
  transition: "border-color 0.15s, box-shadow 0.15s", boxSizing: "border-box",
};
