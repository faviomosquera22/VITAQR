"use client";

import { PhoneFrame } from "@/components/PhoneFrame";
import { NavBar } from "@/components/NavBar";
import { TabBar } from "@/components/TabBar";
import { cryptoId, loadState, saveState, type Medication } from "@/lib/state";
import { useEffect, useState } from "react";

export default function MedsPage() {
  const [list, setList] = useState<Medication[]>([]);
  const [name, setName] = useState("");
  const [dose, setDose] = useState("");
  const [schedule, setSchedule] = useState("");

  useEffect(() => {
    const s = loadState();
    setList(s.meds.list ?? []);
  }, []);

  function persist(next: Medication[]) {
    setList(next);
    const s = loadState();
    saveState({ ...s, meds: { list: next } });
  }

  function add() {
    if (!name.trim()) return;
    const m: Medication = {
      id: cryptoId(),
      name: name.trim(),
      dose: dose.trim() || "—",
      schedule: schedule.trim() || "—",
      active: true,
    };
    persist([m, ...list]);
    setName(""); setDose(""); setSchedule("");
  }

  function toggle(id: string) {
    persist(list.map(m => (m.id === id ? { ...m, active: !m.active } : m)));
  }

  function remove(id: string) {
    persist(list.filter(m => m.id !== id));
  }

  return (
    <PhoneFrame>
      <NavBar title="Medicaciones" subtitle="Lista + horarios (demo)." showBack />

      <div className="ios-card p-5">
        <p className="text-sm font-semibold">Agregar medicamento</p>
        <div className="mt-3 grid gap-3">
          <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Nombre (ej: Losartán)" />
          <div className="grid grid-cols-2 gap-3">
            <input className="input" value={dose} onChange={(e) => setDose(e.target.value)} placeholder="Dosis (50 mg)" />
            <input className="input" value={schedule} onChange={(e) => setSchedule(e.target.value)} placeholder="Horario (08:00)" />
          </div>
          <button onClick={add} className="btn-primary w-full">Guardar</button>
        </div>
      </div>

      <div className="mt-4 card p-5">
        <p className="text-sm font-semibold">Tu lista</p>
        <div className="mt-3 space-y-2">
          {list.length === 0 ? (
            <p className="text-sm text-slate-600">Sin medicaciones aún.</p>
          ) : (
            list.map(m => (
              <div key={m.id} className="rounded-3xl bg-slate-100/70 border border-slate-200 p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex-1">
                    <p className="text-sm font-semibold">
                      {m.name}{" "}
                      <span className={`ml-2 text-[11px] px-2 py-1 rounded-full ${
                        m.active ? "bg-slate-900 text-white" : "bg-white/60 border border-white/70 text-slate-700"
                      }`}>
                        {m.active ? "Activa" : "Pausada"}
                      </span>
                    </p>
                    <p className="text-xs text-slate-600 mt-1">{m.dose} · {m.schedule}</p>
                  </div>
                  <div className="grid gap-2">
                    <button onClick={() => toggle(m.id)} className="btn-secondary py-2">Activar/Pausar</button>
                    <button onClick={() => remove(m.id)} className="btn-secondary py-2">Eliminar</button>
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
