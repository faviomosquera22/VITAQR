"use client";

import Link from "next/link";
import React from "react";

export function BottomNav({
  backHref,
  nextHref,
  nextLabel = "Siguiente",
  backLabel = "Atrás",
  primary = true,
  onNext,
  onBack,
}: {
  backHref: string;
  nextHref: string;
  nextLabel?: string;
  backLabel?: string;
  primary?: boolean;
  onNext?: () => void;
  onBack?: () => void;
}) {
  return (
    <div className="bottom-bar">
      <div className="bottom-inner">
        <Link href={backHref} onClick={onBack} className="btn-secondary flex-1 text-center">
          {backLabel}
        </Link>
        <Link
          href={nextHref}
          onClick={onNext}
          className={`${primary ? "btn-primary" : "btn-secondary"} flex-1 text-center`}
        >
          {nextLabel}
        </Link>
      </div>
    </div>
  );
}
