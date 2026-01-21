"use client";

import { PhoneFrame } from "@/components/PhoneFrame";
import { TabBar } from "@/components/TabBar";
import { avgBP, bpCategory, loadState } from "@/lib/state";
import Link from "next/link";
import { useMemo } from "react";

export default function ResumenPage() {
  const s = useMemo(() => loadState(), []);
  const triageColor = s.triage?.result?.color ?? "—";
  const triageConfidence = s.triage?.result?.confidence ?? 0;

  const bp7 = useMemo(() => s.bp.readings.slice(0, 7), [s]);
  const avg = useMemo(() => avgBP(bp7), [bp7]);
  const cat = useMemo(() => bpCategory(avg.sys, avg.dia), [avg]);

  return (
    <PhoneFrame>
      <div className="ios-card-soft p-5">
        <p className="text-sm text-slate-500">Resumen</p>
        <p className="mt-1 text-2xl font-semibold">Tu estado hoy</p>
        <p className="mt-2 text-sm text-slate-500">{s.alias}, tu salud en un vistazo.</p>

        <div className="mt-5 card p-5">
          <p className="text-xl font-semibold">Alertas</p>
          <ul className="mt-3 space-y-2 text-sm text-slate-700">
            <li>• Promedio PA (7): <span className="font-semibold">{avg.sys}/{avg.dia}</span> mmHg — {cat.label}</li>
          <li>• Último triage: <span className="font-semibold">{triageColor}</span>{triageColor !== "—" ? ` · Confianza ${triageConfidence}%` : ""}</li>
          <li>• Medicaciones activas: <span className="font-semibold">{s.meds.list.filter(m => m.active).length}</span></li>
            <li>• Exámenes cargados: <span className="font-semibold">{s.exams?.labs.length ?? 0}</span></li>
            <li>• Último triage: <span className="font-semibold">{s.triage?.result?.color ?? "—"}</span></li>
          </ul>
        </div>

        <div className="mt-5 grid gap-3">
          <Link href="/demo/bp" className="btn-secondary text-center">Ver presión arterial</Link>
          <Link href="/demo/meds" className="btn-secondary text-center">Ver medicación</Link>
          <Link href="/demo/exams" className="btn-secondary text-center">Ver exámenes</Link>
          <Link href="/demo/triage/step/1" className="btn-primary text-center">Nueva evaluación</Link>
        </div>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
