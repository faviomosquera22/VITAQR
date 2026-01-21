"use client";

import React from "react";

export function Stepper({
  label,
  value,
  onChange,
  min = 0,
  max = 120,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
}) {
  return (
    <div className="flex items-center justify-between gap-4">
      <p className="text-lg font-semibold">{label}: {value}</p>
      <div className="rounded-full bg-slate-100 p-1 flex items-center">
        <button
          className="h-11 w-12 rounded-full text-xl font-bold text-slate-700 active:scale-[0.98]"
          onClick={() => onChange(Math.max(min, value - 1))}
          aria-label="Disminuir"
        >
          –
        </button>
        <div className="h-8 w-px bg-slate-200" />
        <button
          className="h-11 w-12 rounded-full text-xl font-bold text-slate-700 active:scale-[0.98]"
          onClick={() => onChange(Math.min(max, value + 1))}
          aria-label="Aumentar"
        >
          +
        </button>
      </div>
    </div>
  );
}
