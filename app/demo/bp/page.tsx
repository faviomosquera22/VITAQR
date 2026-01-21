"use client";

import { PhoneFrame } from "@/components/PhoneFrame";
import { NavBar } from "@/components/NavBar";
import { TabBar } from "@/components/TabBar";
import { avgBP, bpCategory, cryptoId, loadState, saveState, type BPReading } from "@/lib/state";
import { useEffect, useMemo, useState } from "react";

function fmt(iso: string) {
  const d = new Date(iso);
  return d.toLocaleString(undefined, { month: "short", day: "2-digit" });
}

export default function BPPage() {
  const [readings, setReadings] = useState<BPReading[]>([]);
  const [sys, setSys] = useState(120);
  const [dia, setDia] = useState(80);
  const [hr, setHr] = useState(75);
  const [note, setNote] = useState("");

  useEffect(() => {
    const s = loadState();
    setReadings(s.bp.readings ?? []);
  }, []);

  const last7 = useMemo(() => readings.slice(0, 7), [readings]);
  const avg = useMemo(() => avgBP(last7), [last7]);
  const cat = useMemo(() => bpCategory(avg.sys, avg.dia), [avg]);

  function add() {
    const r: BPReading = { id: cryptoId(), dateISO: new Date().toISOString(), sys, dia, hr, note: note || undefined };
    const next = [r, ...readings].slice(0, 30);
    setReadings(next);
    const s = loadState();
    saveState({ ...s, bp: { readings: next } });
    setNote("");
  }

  const toneBg = cat.tone === "ok" ? "rgb(var(--ok))" : cat.tone === "warn" ? "rgb(var(--warn))" : "rgb(var(--bad))";

  return (
    <PhoneFrame>
      <div className="safe-pad">
      <NavBar title="Presión arterial" subtitle="Registro + promedio últimas 7 + lectura." showBack />

      <div className="ios-card p-5">
        <div className="grid grid-cols-3 gap-3">
          <div>
            <label className="ios-label">Sistólica</label>
            <input type="number" className="input mt-2" value={sys} onChange={(e) => setSys(Number(e.target.value))} />
          </div>
          <div>
            <label className="ios-label">Diastólica</label>
            <input type="number" className="input mt-2" value={dia} onChange={(e) => setDia(Number(e.target.value))} />
          </div>
          <div>
            <label className="ios-label">FC</label>
            <input type="number" className="input mt-2" value={hr} onChange={(e) => setHr(Number(e.target.value))} />
          </div>
        </div>

        <label className="ios-label mt-3 block">Nota (opcional)</label>
        <input className="input mt-2" value={note} onChange={(e) => setNote(e.target.value)} placeholder="Ej: después de caminar" />

        <button onClick={add} className="mt-4 btn-primary w-full">Guardar toma</button>
      </div>

      <div className="mt-4 card p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="ios-label">Promedio (7)</p>
            <p className="text-xl font-semibold">{avg.sys}/{avg.dia} <span className="text-xs text-slate-500">mmHg</span></p>
            <p className="mt-1 text-sm text-slate-700">{cat.label}</p>
          </div>
          <div className="h-12 w-12 rounded-2xl" style={{ backgroundColor: toneBg, opacity: 0.92 }} />
        </div>
        <p className="mt-3 text-xs text-slate-500">
          Lectura orientativa. Si hay síntomas o valores muy altos, busca atención.
        </p>
      </div>

      <div className="mt-4 card p-5">
        <p className="text-sm font-semibold">Últimas tomas</p>
        <div className="mt-3 space-y-2">
          {readings.slice(0, 10).map(r => (
            <div key={r.id} className="rounded-3xl border border-white/60 bg-white/60 p-4">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold">{r.sys}/{r.dia} <span className="text-xs text-slate-500">mmHg</span></p>
                <p className="text-xs text-slate-500">{fmt(r.dateISO)}</p>
              </div>
              <p className="text-xs text-slate-600 mt-1">FC: {r.hr} lpm {r.note ? `· ${r.note}` : ""}</p>
            </div>
          ))}
        </div>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
