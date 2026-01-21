"use client";

import { PhoneFrame } from "@/components/PhoneFrame";
import { NavBar } from "@/components/NavBar";
import { loadState, saveState } from "@/lib/state";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

export default function ProPage() {
  const [alias, setAlias] = useState("Invitado");
  const [queue, setQueue] = useState<"none" | "waiting" | "connected">("none");

  useEffect(() => {
    const s = loadState();
    setAlias(s.alias || "Invitado");
    setQueue(s.queue);
  }, []);

  const snapshot = useMemo(() => {
    const s = loadState();
    const triage = s.triage?.result?.color ?? "—";
    const lastBP = s.bp.readings[0];
    const meds = s.meds.list.filter(m => m.active).length;
    const exams = s.exams?.labs.length ?? 0;
    return { triage, lastBP, meds, exams };
  }, [queue, alias]);

  function requestChat() {
    const s = loadState();
    saveState({ ...s, queue: "waiting" });
    setQueue("waiting");
  }

  function connect() {
    const s = loadState();
    saveState({ ...s, queue: "connected" });
    setQueue("connected");
  }

  return (
    <PhoneFrame>
      <NavBar title="Profesional" subtitle="Portal demo (casos + chat)." showBack />

      <div className="ios-card p-5">
        <p className="text-sm font-semibold">Paciente</p>
        <div className="mt-3 rounded-3xl bg-slate-100/70 border border-slate-200 p-4">
          <p className="text-sm font-semibold">{alias}</p>
          <div className="mt-2 grid grid-cols-2 gap-3">
            <div className="rounded-3xl bg-slate-100/70 border border-slate-200 p-3">
              <p className="mini">Triage</p>
              <p className="mt-1 text-sm font-semibold">{snapshot.triage}</p>
            </div>
            <div className="rounded-3xl bg-slate-100/70 border border-slate-200 p-3">
              <p className="mini">Última PA</p>
              <p className="mt-1 text-sm font-semibold">{snapshot.lastBP ? `${snapshot.lastBP.sys}/${snapshot.lastBP.dia}` : "—"}</p>
            </div>
            <div className="rounded-3xl bg-slate-100/70 border border-slate-200 p-3">
              <p className="mini">Meds activas</p>
              <p className="mt-1 text-sm font-semibold">{snapshot.meds}</p>
            </div>
            <div className="rounded-3xl bg-slate-100/70 border border-slate-200 p-3">
              <p className="mini">Exámenes</p>
              <p className="mt-1 text-sm font-semibold">{snapshot.exams}</p>
            </div>
          </div>

          <div className="mt-4 grid gap-2">
            {queue === "none" ? (
              <button onClick={requestChat} className="btn-primary w-full">Poner en espera (simular)</button>
            ) : queue === "waiting" ? (
              <button onClick={connect} className="btn-primary w-full">Conectar chat (simular)</button>
            ) : (
              <div className="rounded-3xl border border-white/60 bg-white/70 p-4 text-sm text-slate-700">
                Chat conectado ✅ <br />
                Profesional: Hola. Ya vi tu triage y tus registros. ¿Qué es lo más urgente para ti ahora?
              </div>
            )}

            <Link href="/demo/resumen" className="btn-secondary text-center">Ver resumen</Link>
            <Link href="/demo/triage/step/4" className="btn-secondary text-center">Ver triage</Link>
          </div>
        </div>

        <p className="mt-3 text-xs text-slate-500">
          En Vita real: lista de pacientes, historial por fecha, seguimiento y notas clínicas.
        </p>
      </div>
    </PhoneFrame>
  );
}
