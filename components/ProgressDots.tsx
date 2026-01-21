import React from "react";

export function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => {
        const active = i === current;
        return (
          <span
            key={i}
            className={`h-1.5 rounded-full transition ${
              active ? "w-6 bg-slate-900" : "w-2 bg-slate-300"
            }`}
          />
        );
      })}
    </div>
  );
}
