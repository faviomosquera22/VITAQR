import React from "react";

export function SectionTitle({ title, right }: { title: string; right?: React.ReactNode }) {
  return (
    <div className="mt-5 mb-2 flex items-center justify-between">
      <h2 className="text-sm font-semibold text-slate-900">{title}</h2>
      {right ? <div className="text-xs text-slate-500">{right}</div> : null}
    </div>
  );
}
