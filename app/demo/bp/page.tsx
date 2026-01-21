"use client";

import { PhoneFrame } from "@/components/PhoneFrame";
import { NavBar } from "@/components/NavBar";
import { TabBar } from "@/components/TabBar";
import { avgBP, bpCategory, cryptoId, loadState, saveState, type BPReading } from "@/lib/state";
import { useEffect, useMemo, useState } from "react";

function fmt(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { month: "short", day: "2-digit", hour: "2-digit", minute: "2-digit" });
}

export default function BPPage() {
  const [readings, setReadings] = useState<BPReading[]>([]);
  const [sys, setSys] = useState<number>(120);
  const [dia, setDia] = useState<number>(80);
  const [hr, setHr] = useState<number>(75);
  const [note, setNote] = useState<string>("");

  useEffect(() => {
    const s = loadState();
    setReadings(s.bp?.readings ?? []);
  }, []);

  const last7 = useMemo(() => readings.slice(0, 7), [readings]);
  const avg = useMemo(() => avgBP(last7), [last7]);
  const cat = useMemo(() => bpCategory(avg.sys, avg.dia), [avg]);

  function add() {
    const r: BPReading = {
      id: cryptoId(),
      dateISO: new Date().toISOString(),
      sys,
      dia,
      hr,
      note: note.trim() ? note.trim() : undefined,
    };

    const next = [r, ...readings].slice(0, 30);
    setReadings(next);

    const s = loadState();
    saveState({ ...s, bp: { readings: next } });
    setNote("");
  }

  const toneDot =
    cat.tone === "ok"
      ? "bg-emerald-500"
      : cat.tone === "warn"
      ? "bg-amber-500"
      : "bg-red-500";

  return (
    <PhoneFrame>
      <NavBar title="Presión arterial" subtitle="Registro + promedio últimas 7 lecturas." showBack />

      <div className="mt-4 ios-card p-5">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="text-xs text-slate-500 font-semibold">Sistólica</label>
            <input
              type="number"
              className="ios-input mt-2"
              value={sys}
              onChange={(e) => setSys(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 font-semibold">Diastólica</label>
            <input
              type="number"
              className="ios-input mt-2"
              value={dia}
              onChange={(e) => setDia(Number(e.target.value))}
            />
          </div>
          <div>
            <label className="text-xs text-slate-500 font-semibold">FC</label>
            <input
              type="number"
              className="ios-input mt-2"
              value={hr}
              onChange={(e) => setHr(Number(e.target.value))}
            />
          </div>
        </div>

        <label className="text-xs text-slate-500 font-semibold mt-4 block">Nota (opcional)</label>
        <input
          className="ios-input mt-2"
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Ej: después de caminar"
        />

        <button onClick={add} className="mt-4 ios-btn-primary w-full rounded-3xl py-4">
          Guardar toma
        </button>
      </div>

      <div className="mt-4 ios-card p-5">
        <div className="flex items-center justify-between gap-3">
          <div>
            <p className="text-xs text-slate-500 font-semibold">Promedio (últimas 7)</p>
            <p className="text-xl font-semibold">
              {avg.sys}/{avg.dia} <span className="text-xs text-slate-500">mmHg</span>
            </p>
            <p className="mt-1 text-sm text-slate-700">{cat.label}</p>
          </div>

          <div className="h-12 w-12 rounded-2xl bg-slate-100 border border-slate-200 flex items-center justify-center">
            <div className={`h-3 w-3 rounded-full ${toneDot}`} />
          </div>
        </div>
      </div>

      <div className="mt-4 ios-card p-5">
        <p className="text-lg font-semibold">Últimas lecturas</p>

        <div className="mt-3 grid gap-2">
          {readings.length === 0 ? (
            <p className="text-slate-500">Aún no tienes registros.</p>
          ) : (
            readings.slice(0, 12).map((r) => (
              <div key={r.id} className="rounded-3xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold">
                    {r.sys}/{r.dia} <span className="text-xs text-slate-500">mmHg</span>
                  </p>
                  <p className="text-xs text-slate-500">{fmt(r.dateISO)}</p>
                </div>
                <p className="text-xs text-slate-600 mt-1">
                  FC: {r.hr} lpm {r.note ? `· ${r.note}` : ""}
                </p>
              </div>
            ))
          )}
        </div>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
