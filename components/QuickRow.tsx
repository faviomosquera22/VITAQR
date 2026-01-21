import Link from "next/link";
import React from "react";
import { ChevronRight } from "lucide-react";

export function QuickRow({
  title,
  desc,
  href,
  left,
  badge,
}: {
  title: string;
  desc: string;
  href: string;
  left: React.ReactNode;
  badge?: string;
}) {
  return (
    <Link href={href} className="block card p-4 hover:bg-white/80 transition animate-slideUp">
      <div className="flex items-center gap-3">
        <div className="h-11 w-11 rounded-2xl bg-slate-900 text-white flex items-center justify-center">
          {left}
        </div>
        <div className="flex-1">
          <div className="flex items-center justify-between gap-2">
            <p className="text-sm font-semibold">{title}</p>
            {badge ? (
              <span className="text-[11px] px-2 py-1 rounded-full bg-white/60 border border-white/70 text-slate-700">
                {badge}
              </span>
            ) : null}
          </div>
          <p className="mt-1 text-xs text-slate-600">{desc}</p>
        </div>
        <ChevronRight className="text-slate-400" size={18} />
      </div>
    </Link>
  );
}
