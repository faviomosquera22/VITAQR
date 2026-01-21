"use client";

import { ChevronLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export function NavBar({
  title,
  subtitle,
  showBack = false,
  right,
}: {
  title: string;
  subtitle?: string;
  showBack?: boolean;
  right?: React.ReactNode;
}) {
  const router = useRouter();
  return (
    <div className="mb-3">
      <div className="text-xs text-slate-500 flex items-center justify-between">
        <span>09:41</span>
        <span className="opacity-80">●●●</span>
      </div>

      <div className="mt-2 flex items-start justify-between gap-3">
        <div className="flex items-start gap-2">
          {showBack ? (
            <button
              onClick={() => router.back()}
              className="mt-0.5 h-9 w-9 rounded-2xl bg-white/60 border border-white/70 backdrop-blur-xl flex items-center justify-center active:scale-[0.98]"
              aria-label="Volver"
            >
              <ChevronLeft size={18} />
            </button>
          ) : null}

          <div>
            <h1 className="text-2xl font-semibold tracking-tight leading-tight">{title}</h1>
            {subtitle ? <p className="mt-1 text-sm text-slate-600">{subtitle}</p> : null}
          </div>
        </div>

        {right ? <div className="pt-1">{right}</div> : null}
      </div>
    </div>
  );
}
