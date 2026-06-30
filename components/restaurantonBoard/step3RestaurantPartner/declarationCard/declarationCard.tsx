
import React from "react";

interface DeclarationCardProps {
  errors?: any;
  register: any;
  name?: string;
}

export default function DeclarationCard({
  errors,
  register,
  name,
}: DeclarationCardProps) {
  return (
    <div
      style={{
        background: "#fff",
        border: `1px solid ${errors?.agreed ? "#E23744" : "#E8E8E8"
          }`,
        borderRadius: 10,
        marginBottom: 24,
        padding: "20px 24px",
      }}
    >
      <h2
        style={{
          fontSize: 16,
          fontWeight: 700,
          color: "#1C1C1C",
          marginBottom: 16,
        }}
      >
        Declaration
      </h2>

      <div
        style={{
          display: "flex",
          gap: 12,
          alignItems: "flex-start",
          marginBottom: 12,
        }}
      >
        <input
          type="checkbox"
          id="c1"
          {...register("agreed")}
          style={{
            width: 16,
            height: 16,
            marginTop: 3,
            accentColor: "#FC8019",
            cursor: "pointer",
            flexShrink: 0,
          }}
        />

        <label
          htmlFor="c1"
          style={{
            fontSize: 13,
            color: "#3D4152",
            lineHeight: 1.7,
            cursor: "pointer",
          }}
        >
          I,{" "}
          <strong>
            {name || "[Authorized Signatory]"}
          </strong>
          , hereby confirm that I have read, understood,
          and agree to all terms and conditions of the
          Swiggy Restaurant Partner Agreement.
        </label>
      </div>

      {errors?.agreed?.message && (
        <p
          style={{
            fontSize: 12,
            color: "#E23744",
            marginTop: 6,
            marginLeft: 28,
          }}
        >
          {String(errors.agreed.message)}
        </p>
      )}

      <div
        style={{
          background: "#FFFBF0",
          border: "1px solid #FFD580",
          borderRadius: 8,
          padding: "10px 14px",
          marginTop: 12,
        }}
      >
        <p
          style={{
            fontSize: 12,
            color: "#7A5C00",
            lineHeight: 1.6,
          }}
        >
          <strong>Note:</strong> This digital acceptance
          constitutes a legally binding electronic signature.
        </p>
      </div>
    </div>
  );
}

