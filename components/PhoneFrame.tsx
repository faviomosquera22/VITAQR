import React from "react";

type PhoneFrameProps = {
  children: React.ReactNode;
  /** Cambia el título opcional abajo del frame (si lo usas en alguna pantalla) */
  caption?: string;
  /** Permite desactivar el caption sin tocar pantallas */
  showCaption?: boolean;
};

export function PhoneFrame({ children, caption, showCaption = false }: PhoneFrameProps) {
  return (
    <div className="min-h-[100svh] w-full flex items-center justify-center px-6 py-10">
      {/* Glow / ambiente */}
      <div className="relative">
        <div className="pointer-events-none absolute -inset-16 rounded-[60px] bg-blue-200/20 blur-3xl" />
        <div className="pointer-events-none absolute -inset-10 rounded-[60px] bg-purple-200/15 blur-3xl" />

        {/* Device */}
        <div
          className="
            relative mx-auto
            w-[420px] sm:w-[440px] md:w-[460px]
            aspect-[9/19.5]
            rounded-[44px]
            bg-slate-950
            shadow-[0_30px_90px_rgba(2,6,23,.35)]
            ring-1 ring-white/10
          "
        >
          {/* Side buttons */}
          <div className="pointer-events-none absolute left-[-6px] top-[110px] h-[46px] w-[6px] rounded-full bg-slate-700/80 shadow-sm" />
          <div className="pointer-events-none absolute left-[-6px] top-[170px] h-[72px] w-[6px] rounded-full bg-slate-700/80 shadow-sm" />
          <div className="pointer-events-none absolute left-[-6px] top-[255px] h-[72px] w-[6px] rounded-full bg-slate-700/80 shadow-sm" />
          <div className="pointer-events-none absolute right-[-6px] top-[185px] h-[92px] w-[6px] rounded-full bg-slate-700/80 shadow-sm" />

          {/* Inner bezel */}
          <div className="absolute inset-[10px] rounded-[36px] bg-white overflow-hidden ring-1 ring-slate-200/60">
            {/* Status bar */}
            <div className="absolute top-0 left-0 right-0 z-30 px-5 pt-4">
              <div className="flex items-center justify-between text-[12px] font-semibold text-slate-800/90">
                <span>9:41</span>
                <div className="flex items-center gap-2 text-slate-700/80">
                  <span className="text-[11px]">5G</span>
                  <span className="text-[11px]">Wi-Fi</span>
                  <span className="inline-block h-[10px] w-[18px] rounded-sm border border-slate-400/70 relative">
                    <span className="absolute right-[2px] top-[2px] bottom-[2px] w-[12px] rounded-[2px] bg-slate-700/70" />
                  </span>
                </div>
              </div>
            </div>

            {/* Notch */}
            <div className="absolute top-[10px] left-1/2 z-40 -translate-x-1/2">
              <div className="h-[28px] w-[150px] rounded-full bg-slate-900 shadow-[0_10px_20px_rgba(0,0,0,.25)] ring-1 ring-white/10">
                <div className="absolute left-1/2 top-1/2 h-[6px] w-[64px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-slate-700/60" />
                <div className="absolute right-[18px] top-1/2 h-[8px] w-[8px] -translate-y-1/2 rounded-full bg-slate-700/60" />
              </div>
            </div>

            {/* Content area */}
            <div className="relative h-full w-full pt-[58px] pb-[26px]">
              {/* App background (sutil) */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-blue-50/70 via-white to-white" />

              {/* Scroll container */}
              <div className="relative h-full w-full overflow-y-auto px-4">
                <div className="pb-6">{children}</div>
              </div>
            </div>

            {/* Home indicator */}
            <div className="pointer-events-none absolute bottom-[10px] left-1/2 z-40 h-[5px] w-[120px] -translate-x-1/2 rounded-full bg-slate-900/20" />
          </div>
        </div>

        {/* Caption optional */}
        {showCaption ? (
          <p className="mt-4 text-center text-xs text-slate-500">
            {caption ?? "Vita — demo web (marco tipo iPhone)."}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default PhoneFrame;
