"use client";

import { PhoneFrame } from "@/components/PhoneFrame";
import { TabBar } from "@/components/TabBar";
import { loadState } from "@/lib/state";
import Link from "next/link";
import { useMemo } from "react";

function fmtDate(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export default function HistorialPage() {
  const s = useMemo(() => loadState(), []);
  const triage = s.triage?.result;
  const lastBP = s.bp.readings[0];

  return (
    <PhoneFrame>
      <div className="ios-card-soft p-5">
        <p className="text-sm text-slate-500">Historial</p>
        <p className="text-2xl font-semibold mt-1">Tus registros</p>
        <p className="mt-2 text-sm text-slate-500">Lo importante no es recordar todo: es guardar lo que importa.</p>
      </div>

      <div className="mt-4 grid gap-4">
        <div className="ios-card p-5">
          <p className="text-lg font-semibold">Último triage</p>
          {triage ? (
            <div className="mt-3 rounded-3xl bg-slate-100 p-4">
              <p className="text-2xl font-semibold">{triage.color}</p>
              <p className="text-slate-500">Confianza {triage.confidence}%</p>
              <Link href="/demo/triage/step/4" className="mt-3 inline-block text-blue-600 font-semibold">
                Ver resultado
              </Link>
            </div>
          ) : (
            <p className="mt-2 text-slate-500">Aún no tienes una evaluación guardada.</p>
          )}
        </div>

        <div className="ios-card p-5">
          <p className="text-lg font-semibold">Presión arterial</p>
          {lastBP ? (
            <div className="mt-3 rounded-3xl bg-slate-100 p-4">
              <p className="text-2xl font-semibold">{lastBP.sys}/{lastBP.dia} <span className="text-sm text-slate-500">mmHg</span></p>
              <p className="text-slate-500">FC {lastBP.hr} · {fmtDate(lastBP.dateISO)}</p>
              <Link href="/demo/bp" className="mt-3 inline-block text-blue-600 font-semibold">
                Ver análisis
              </Link>
            </div>
          ) : (
            <p className="mt-2 text-slate-500">Sin tomas registradas.</p>
          )}
        </div>

        <div className="ios-card p-5">
          <p className="text-lg font-semibold">Medicaciones</p>
          <p className="mt-2 text-slate-500">
            Activas: <span className="font-semibold text-slate-900">{s.meds.list.filter(m => m.active).length}</span> · Total:{" "}
            <span className="font-semibold text-slate-900">{s.meds.list.length}</span>
          </p>
          <Link href="/demo/meds" className="mt-3 inline-block text-blue-600 font-semibold">
            Ver lista
          </Link>
        </div>

        <div className="ios-card p-5">
          <p className="text-lg font-semibold">Exámenes</p>
          <p className="mt-2 text-slate-500">
            Valores cargados: <span className="font-semibold text-slate-900">{s.exams?.labs.length ?? 0}</span>
          </p>
          <Link href="/demo/exams" className="mt-3 inline-block text-blue-600 font-semibold">
            Ver interpretación
          </Link>
        </div>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
