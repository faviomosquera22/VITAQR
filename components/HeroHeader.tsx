"use client";

import React from "react";
import { HeartPulse } from "lucide-react";

export function HeroHeader({
  titleTop = "Evaluación rápida",
  brandLeft = "Vita",
  brandRight = "salud",
  subtitle = "Te guío paso a paso. Sin alarmas innecesarias.",
  icon,
}: {
  titleTop?: string;
  brandLeft?: string;
  brandRight?: string;
  subtitle?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="relative overflow-hidden rounded-[28px] bg-gradient-to-r from-blue-500 to-blue-400 px-5 py-5 shadow-[0_18px_42px_rgba(37,99,235,.25)]">
      <div className="absolute -left-10 -top-10 h-36 w-36 rounded-full bg-white/15 blur-2xl" />
      <div className="absolute -right-12 -bottom-14 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-white/85 text-sm font-medium">{titleTop}</p>
          <p className="mt-1 text-white text-2xl font-semibold tracking-tight">
            {brandLeft}<span className="opacity-70">{brandRight}</span>
          </p>
          <p className="mt-1 text-white/85 text-sm">{subtitle}</p>
        </div>
        <div className="h-12 w-12 rounded-2xl bg-white/18 border border-white/25 flex items-center justify-center">
          {icon ?? <HeartPulse className="text-white" size={22} />}
        </div>
      </div>
    </div>
  );
}
