import React from "react";

function StatusBar() {
  // simple faux iOS status bar
  return (
    <div className="flex items-center justify-between px-5 pt-3 text-[12px] font-semibold text-slate-700">
      <div className="tabular-nums">9:41</div>
      <div className="flex items-center gap-2">
        <span className="inline-flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-slate-400/80" />
          <span className="text-slate-500">5G</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-2 w-2 rounded-full bg-slate-400/80" />
          <span className="text-slate-500">Wi‑Fi</span>
        </span>
        <span className="inline-flex items-center gap-1">
          <span className="h-3 w-6 rounded-[6px] border border-slate-400/60 bg-white/70 relative overflow-hidden">
            <span className="absolute left-0 top-0 h-full w-4 bg-slate-400/40" />
          </span>
        </span>
      </div>
    </div>
  );
}

export function PhoneFrame({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen w-full flex items-center justify-center p-6">
      <div className="relative w-[392px] max-w-full">
        {/* Side buttons (decor) */}
        <div className="pointer-events-none absolute -left-1 top-28 h-10 w-1.5 rounded-full bg-slate-300/80 shadow-sm" />
        <div className="pointer-events-none absolute -left-1 top-44 h-16 w-1.5 rounded-full bg-slate-300/80 shadow-sm" />
        <div className="pointer-events-none absolute -right-1 top-36 h-20 w-1.5 rounded-full bg-slate-300/80 shadow-sm" />

        {/* Outer shell */}
        <div className="relative rounded-[52px] bg-gradient-to-b from-slate-200 to-slate-300 p-[10px] shadow-[0_40px_120px_rgba(2,6,23,.22)]">
          {/* Bezel */}
          <div className="relative rounded-[44px] bg-slate-900 p-[10px] shadow-inner">
            {/* Screen */}
            <div className="relative overflow-hidden rounded-[36px] border border-white/10 bg-gradient-to-b from-[#f6f9ff] to-[#eef3ff]">
              {/* Notch */}
              <div className="absolute left-1/2 top-2 -translate-x-1/2 z-20">
                <div className="h-7 w-40 rounded-full bg-slate-900/95 shadow-[0_10px_30px_rgba(0,0,0,.35)] flex items-center justify-center gap-2">
                  <div className="h-2 w-10 rounded-full bg-slate-700/60" />
                  <div className="h-2 w-2 rounded-full bg-slate-700/60" />
                </div>
              </div>

              {/* Top highlight */}
              <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(255,255,255,.55),transparent_45%)]" />

              {/* Content */}
              <div className="relative z-10 pb-6">
                <StatusBar />
                <div className="px-5 pt-3">{children}</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-4 text-center text-xs text-slate-400">
          Vita — demo web (marco tipo iPhone).
        </div>
      </div>
    </div>
  );
}
