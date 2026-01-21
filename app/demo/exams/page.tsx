"use client";

import { PhoneFrame } from "@/components/PhoneFrame";
import { NavBar } from "@/components/NavBar";
import { TabBar } from "@/components/TabBar";
import { cryptoId, loadState, saveState, type LabResult } from "@/lib/state";
import { useEffect, useMemo, useState } from "react";

function flagBadge(flag?: "normal" | "alta" | "baja") {
  if (!flag) return "bg-white/60 border border-white/70 text-slate-700";
  if (flag === "normal") return "bg-emerald-600 text-white";
  if (flag === "alta") return "bg-amber-500 text-white";
  return "bg-rose-600 text-white";
}

function orientativeSummary(labs: LabResult[]) {
  const highs = labs.filter(l => l.flag === "alta").length;
  const lows = labs.filter(l => l.flag === "baja").length;
  if (highs === 0 && lows === 0) return "Sin banderas. Si hay síntomas, consulta igual.";
  if (highs > lows) return "Predominan valores elevados. Revisa contexto, ayuno/medicación y repite si es necesario.";
  if (lows > highs) return "Predominan valores bajos. Considera hidratación/nutrición y consulta si hay síntomas.";
  return "Valores mixtos. Interpretación depende del contexto clínico.";
}

export default function ExamsPage() {
  const [labs, setLabs] = useState<LabResult[]>([]);
  const [name, setName] = useState("");
  const [value, setValue] = useState("");
  const [unit, setUnit] = useState("");
  const [flag, setFlag] = useState<"normal" | "alta" | "baja" | "">("");

  useEffect(() => {
    const s = loadState();
    setLabs(s.exams?.labs ?? []);
  }, []);

  function persist(next: LabResult[]) {
    setLabs(next);
    const s = loadState();
    saveState({ ...s, exams: { ...(s.exams ?? { labs: [] }), labs: next, summary: orientativeSummary(next) } });
  }

  function add() {
    if (!name.trim() || !value.trim()) return;
    const r: LabResult = { id: cryptoId(), name: name.trim(), value: value.trim(), unit: unit.trim() || "—", flag: (flag || undefined) as any };
    persist([r, ...labs]);
    setName(""); setValue(""); setUnit(""); setFlag("");
  }

  function remove(id: string) {
    persist(labs.filter(l => l.id !== id));
  }

  const summary = useMemo(() => orientativeSummary(labs), [labs]);

  return (
    <PhoneFrame>
      <NavBar title="Exámenes" subtitle="Cargar → interpretar → guardar." showBack />

      <div className="ios-card p-5">
        <p className="text-sm font-semibold">Agregar valor</p>
        <div className="mt-3 grid gap-3">
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre (Glucosa, Hb, etc.)" />
          <div className="grid grid-cols-2 gap-3">
            <input className="input" value={value} onChange={(e) => setValue(e.target.value)} placeholder="Valor (110)" />
            <input className="input" value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="Unidad (mg/dL)" />
          </div>
          <select className="input" value={flag} onChange={(e) => setFlag(e.target.value as any)}>
            <option value="">Bandera (opcional)</option>
            <option value="normal">Normal</option>
            <option value="alta">Alta</option>
            <option value="baja">Baja</option>
          </select>
          <button onClick={add} className="btn-primary w-full">Guardar</button>
        </div>
      </div>

      <div className="mt-4 card p-5">
        <p className="text-sm font-semibold">Lectura orientativa</p>
        <p className="mt-2 text-sm text-slate-700">{summary}</p>
        <p className="mt-2 text-xs text-slate-500">Demo: no sustituye diagnóstico. En Vita real se afinan rangos y contexto.</p>
      </div>

      <div className="mt-4 card p-5">
        <p className="text-sm font-semibold">Valores</p>
        <div className="mt-3 space-y-2">
          {labs.length === 0 ? (
            <p className="text-sm text-slate-600">Aún no hay valores.</p>
          ) : (
            labs.map(l => (
              <div key={l.id} className="rounded-3xl bg-slate-100/70 border border-slate-200 p-4">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold">{l.name}</p>
                    <p className="text-xs text-slate-600 mt-1">{l.value} {l.unit}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className={`text-[11px] px-2 py-1 rounded-full ${flagBadge(l.flag)}`}>{l.flag ?? "—"}</span>
                    <button onClick={() => remove(l.id)} className="btn-secondary py-2">Eliminar</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
