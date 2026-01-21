import React from "react";
import { Zap } from "lucide-react";

export function TriageHeader() {
  return (
    <div className="card-soft overflow-hidden">
      <div
        className="relative rounded-3xl p-5 text-white"
        style={{
          background:
            "linear-gradient(135deg, rgba(59,130,246,1) 0%, rgba(37,99,235,1) 55%, rgba(2,132,199,1) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-20"
             style={{ background: "radial-gradient(800px 260px at 20% 0%, rgba(255,255,255,.55), transparent 55%)" }} />
        <div className="relative flex items-start justify-between gap-3">
          <div>
            <p className="text-sm opacity-90">Evaluación rápida</p>
            <p className="text-2xl font-semibold leading-tight">Vita</p>
            <p className="mt-1 text-sm opacity-90">Te guío paso a paso. Sin alarmas innecesarias.</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-white/15 flex items-center justify-center">
            <Zap />
          </div>
        </div>
      </div>
    </div>
  );
}
