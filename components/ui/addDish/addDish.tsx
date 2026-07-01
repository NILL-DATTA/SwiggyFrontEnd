"use client";

import React from "react";

/* CARD */
export function Card({ children }: { children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm hover:shadow-md transition">
      {children}
    </div>
  );
}

/* LABEL */
export function CardLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="mb-5">
      <p className="text-[11px] font-semibold uppercase tracking-wider text-gray-500">
        {children}
      </p>
      <div className="mt-1 h-[2px] w-10 rounded bg-orange-500" />
    </div>
  );
}

/* INPUT */
export function inputClass(error?: boolean) {
  return `
    w-full rounded-xl border px-3 py-2.5 text-sm
    bg-gray-50 outline-none transition
    focus:bg-white focus:ring-2 focus:ring-orange-200
    ${error ? "border-red-400" : "border-gray-200 hover:border-gray-300"}
  `;
}

/* TOGGLE */
export function ToggleRow({
  label,
  checked,
  onChange,
  hint,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between py-3">
      <div>
        <p className="text-sm font-semibold text-gray-800">{label}</p>
        {hint && <p className="text-xs text-gray-400">{hint}</p>}
      </div>

      <button
        type="button"
        onClick={() => onChange(!checked)}
        className={`relative h-6 w-11 rounded-full transition ${
          checked ? "bg-green-500" : "bg-gray-300"
        }`}
      >
        <span
          className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
            checked ? "left-5" : "left-0.5"
          }`}
        />
      </button>
    </div>
  );
}