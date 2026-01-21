"use client";

import { PhoneFrame } from "@/components/PhoneFrame";
import { TabBar } from "@/components/TabBar";
import { loadState, saveState } from "@/lib/state";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { Search, HeartPulse, Brain, Stethoscope, MapPin } from "lucide-react";

const moods = [
  { label: "Muy bien", icon: "🙂" },
  { label: "Bien", icon: "😊" },
  { label: "Regular", icon: "😐" },
  { label: "Mal", icon: "😣" },
];

export default function DemoHome() {
  const [alias, setAlias] = useState("Invitado");
  const [mood, setMood] = useState("Bien");
  const [query, setQuery] = useState("");

  useEffect(() => {
    const s = loadState();
    setAlias(s.alias || "Invitado");
  }, []);

  function persistAlias(a: string) {
    setAlias(a);
    const s = loadState();
    saveState({ ...s, alias: a || "Invitado" });
  }

  const snapshot = useMemo(() => {
    const s = loadState();
    const medsOn = s.meds.list.filter((m) => m.active).length;
    const triage = s.triage?.result?.color ?? "—";
    return { medsOn, triage };
  }, []);

  return (
    <PhoneFrame>
      <div className="ios-card-soft p-5">
        <p className="text-sm text-slate-500">Bienvenido a Vita</p>
        <div className="mt-1 flex items-start justify-between gap-3">
          <div>
            <p className="text-3xl font-semibold leading-tight">Hola, {alias}</p>
            <p className="mt-2 text-sm text-slate-500">Tu salud, sin drama. Solo orden.</p>
          </div>
          <div className="h-12 w-12 rounded-full bg-blue-500/15 border border-blue-200 flex items-center justify-center">
            <span className="text-blue-700 font-bold">{alias.slice(0,1).toUpperCase()}</span>
          </div>
        </div>

        <div className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-100 px-4 py-3">
          <Search size={18} className="text-slate-400" />
          <input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Busca síntomas, médicos o centros"
            className="bg-transparent outline-none text-sm flex-1"
          />
        </div>

        <p className="mt-4 text-lg font-semibold">¿Cómo te sientes hoy?</p>
        <div className="mt-3 flex gap-2 flex-wrap">
          {moods.map((m) => {
            const on = mood === m.label;
            return (
              <button
                key={m.label}
                onClick={() => setMood(m.label)}
                className={`rounded-full px-4 py-2 text-sm font-semibold border transition ${
                  on ? "bg-blue-50 border-blue-200 text-blue-700" : "bg-white border-slate-200 text-slate-700"
                }`}
              >
                <span className="mr-2">{m.icon}</span>
                {m.label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 grid gap-4">
        <Link href="/demo/triage/step/1" className="rounded-[28px] bg-gradient-to-r from-blue-500 to-blue-400 p-5 text-white shadow-[0_16px_38px_rgba(37,99,235,.24)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold">Iniciar evaluación</p>
              <p className="mt-1 text-white/85">Triage rápido con IA para orientarte</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-white/18 border border-white/25 flex items-center justify-center">
              <HeartPulse size={22} />
            </div>
          </div>
          <p className="mt-3 text-sm text-white/90">Último triage: <span className="font-semibold">{snapshot.triage}</span></p>
        </Link>

        <Link href="/demo/emocional" className="rounded-[28px] bg-gradient-to-r from-purple-500 to-purple-400 p-5 text-white shadow-[0_16px_38px_rgba(124,58,237,.20)]">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xl font-semibold">Chequeo emocional</p>
              <p className="mt-1 text-white/85">Evalúa tu ánimo, estrés y sueño en 1 minuto</p>
            </div>
            <div className="h-12 w-12 rounded-2xl bg-white/18 border border-white/25 flex items-center justify-center">
              <Brain size={22} />
            </div>
          </div>
        </Link>

        <div className="ios-card p-5">
          <p className="text-xl font-semibold">Opciones de atención</p>
          <div className="mt-4 grid grid-cols-2 gap-4">
            <Link href="/pro" className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-blue-50 border border-blue-200 flex items-center justify-center">
                <Stethoscope className="text-blue-700" size={22} />
              </div>
              <p className="mt-3 font-semibold">Agendar cita</p>
              <p className="text-sm text-slate-500 mt-1">Consulta presencial</p>
            </Link>

            <Link href="/pro" className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-purple-50 border border-purple-200 flex items-center justify-center">
                <span className="text-purple-700 font-bold">🎥</span>
              </div>
              <p className="mt-3 font-semibold">Cita virtual</p>
              <p className="text-sm text-slate-500 mt-1">Videollamada segura</p>
            </Link>

            <Link href="/demo/exams" className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center">
                <span className="text-amber-700 font-bold">🧾</span>
              </div>
              <p className="mt-3 font-semibold">Interpretación de exámenes</p>
              <p className="text-sm text-slate-500 mt-1">Lectura orientativa</p>
            </Link>

            <Link href="/demo" className="rounded-3xl bg-white border border-slate-200 p-5 shadow-sm">
              <div className="h-12 w-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center">
                <MapPin className="text-emerald-700" size={22} />
              </div>
              <p className="mt-3 font-semibold">Centros cercanos</p>
              <p className="text-sm text-slate-500 mt-1">Mapa (demo)</p>
            </Link>
          </div>

          <div className="mt-4">
            <label className="text-xs text-slate-500">Alias</label>
            <input value={alias} onChange={(e) => persistAlias(e.target.value)} className="ios-input mt-2" placeholder="Ej: Favio" />
          </div>
        </div>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
