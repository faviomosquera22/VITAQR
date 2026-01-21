"use client";

import { PhoneFrame } from "@/components/PhoneFrame";
import { TabBar } from "@/components/TabBar";
import Link from "next/link";

export default function EvaluacionHub() {
  return (
    <PhoneFrame>
      <div className="ios-card-soft p-5">
        <p className="text-3xl font-semibold">Evaluación</p>
        <p className="mt-2 text-sm text-slate-500">Flujos rápidos, claros, y sin drama.</p>

        <div className="mt-5 grid gap-4">
          <Link href="/demo/triage/step/1" className="btn-primary text-center">Iniciar triage</Link>
          <Link href="/demo/exams" className="btn-secondary text-center">Interpretación de exámenes</Link>
          <Link href="/demo/emocional" className="btn-secondary text-center">Chequeo emocional</Link>
        </div>
      </div>
      <TabBar />
    </PhoneFrame>
  );
}
