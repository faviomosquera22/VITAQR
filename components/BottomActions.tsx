"use client";

import Link from "next/link";
import React from "react";

export function BottomActions({
  leftLabel = "Atrás",
  rightLabel = "Siguiente",
  leftHref,
  rightHref,
  onLeft,
  onRight,
  rightPrimary = true,
}: {
  leftLabel?: string;
  rightLabel?: string;
  leftHref?: string;
  rightHref?: string;
  onLeft?: () => void;
  onRight?: () => void;
  rightPrimary?: boolean;
}) {
  return (
    <div className="bottom-toolbar">
      <div className="bottom-toolbar-surface">
        <div className="grid grid-cols-2 gap-4">
          {leftHref ? (
            <Link href={leftHref} onClick={onLeft} className="ios-btn-secondary text-center py-4 rounded-3xl">
              {leftLabel}
            </Link>
          ) : (
            <button onClick={onLeft} className="ios-btn-secondary text-center py-4 rounded-3xl w-full">
              {leftLabel}
            </button>
          )}

          {rightHref ? (
            <Link
              href={rightHref}
              onClick={onRight}
              className={`${rightPrimary ? "ios-btn-primary" : "ios-btn-secondary"} text-center py-4 rounded-3xl`}
            >
              {rightLabel}
            </Link>
          ) : (
            <button
              onClick={onRight}
              className={`${rightPrimary ? "ios-btn-primary" : "ios-btn-secondary"} text-center py-4 rounded-3xl w-full`}
            >
              {rightLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
