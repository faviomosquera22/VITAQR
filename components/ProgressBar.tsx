"use client";

import React from "react";

export function ProgressBar({ value }: { value: number }) {
  const v = Math.max(0, Math.min(1, value));
  return (
    <div className="mt-4">
      <div className="h-1.5 w-full rounded-full bg-slate-200 overflow-hidden">
        <div className="h-full rounded-full bg-blue-500" style={{ width: `${Math.round(v * 100)}%` }} />
      </div>
    </div>
  );
}
