"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Clock, BarChart3, LayoutGrid } from "lucide-react";

const tabs = [
  { href: "/demo", label: "Inicio", icon: Home },
  { href: "/demo/historial", label: "Historial", icon: Clock },
  { href: "/demo/resumen", label: "Resumen", icon: BarChart3 },
  { href: "/pro", label: "Portal", icon: LayoutGrid },
];

export function TabBar() {
  const pathname = usePathname();
  return (
    <div className="sticky bottom-0 mt-6 footer-safe">
      <div className="rounded-[32px] bg-white/80 backdrop-blur-xl border border-slate-200 shadow-[0_16px_40px_rgba(2,6,23,.10)] px-3 py-2">
        <div className="grid grid-cols-4 gap-1">
          {tabs.map((t) => {
            const active = pathname === t.href;
            const Icon = t.icon;
            return (
              <Link
                key={t.href}
                href={t.href}
                className={`flex flex-col items-center justify-center rounded-2xl py-2 transition ${
                  active ? "bg-blue-50 text-blue-700" : "text-slate-800 hover:bg-slate-50"
                }`}
              >
                <Icon size={20} />
                <span className="mt-1 text-[12px] font-semibold">{t.label}</span>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
