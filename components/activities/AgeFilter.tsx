"use client";

import React from "react";

export const AGE_RANGES = [
  "0–6m",
  "6–9m",
  "9–12m",
  "12–18m",
  "18–24m",
  "2–3a",
  "3–4a",
  "4–5a",
  "5–6a",
] as const;

export type AgeRange = typeof AGE_RANGES[number];

export function getDefaultAge(): AgeRange {
  if (typeof window !== "undefined") {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("age");
    if (q && (AGE_RANGES as readonly string[]).includes(q)) return q as AgeRange;
  }
  return "2–3a";
}

export default function AgeFilter({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div className="-mx-1 overflow-x-auto">
      <div className="flex gap-2 px-1 py-0.5">
        {AGE_RANGES.map((r) => {
          const active = value === r;
          return (
            <button
              key={r}
              type="button"
              onClick={() => onChange(r)}
              className={[
                "whitespace-nowrap rounded-full px-3 py-1 text-sm ring-1 transition",
                active
                  ? "bg-[#AD8567]/10 text-[#AD8567] ring-[#AD8567]/30"
                  : "bg-white text-gray-700 ring-gray-300 hover:bg-gray-50",
              ].join(" ")}
            >
              {r}
            </button>
          );
        })}
      </div>
    </div>
  );
}
