import React from "react";

export default function ImageUpload({ setValue, watch, errors }: any) {
  const image = watch("image");

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // IMPORTANT: direct File set করো
    setValue("image", file, {
      shouldValidate: true,
      shouldDirty: true,
    });
  };

  return (
    <div style={{
      background: "#fff",
      borderRadius: 16,
      border: "1px solid #e8e8e8",
      padding: "20px 24px",
      marginBottom: 16,
    }}>
      <p style={{ fontSize: 11, fontWeight: 700 }}>📷 ITEM PHOTO</p>

      <label style={{
        display: "block",
        border: "2px dashed #d1d5db",
        borderRadius: 12,
        padding: "36px 20px",
        textAlign: "center",
        cursor: "pointer",
      }}>
        <input
          type="file"
          accept="image/*"
          hidden
          onChange={handleFileChange}
        />

        <div style={{ fontSize: 32 }}>☁️</div>
        <p>Click to upload</p>
      </label>

      {image && (
        <p style={{ fontSize: 12, color: "green" }}>
          ✔ Image selected: {(image as File).name}
        </p>
      )}

      {errors?.image && (
        <p style={{ color: "red" }}>{errors.image.message}</p>
      )}
    </div>
  );
}