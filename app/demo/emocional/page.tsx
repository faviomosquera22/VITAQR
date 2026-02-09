"use client";

import { useState } from "react";
import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { NavBar } from "@/components/NavBar";

const MOODS = [
  { id: "inquieto", title: "Inquieto", desc: "Mente acelerada, nervios o tensión." },
  { id: "triste", title: "Triste", desc: "Baja de ánimo, ganas de aislarte." },
  { id: "agobiado", title: "Agobiado", desc: "Cansancio mental, demasiado encima." },
];

export default function EmocionalPage() {
  const [mood, setMood] = useState<string>("");

  function next() {
    try {
      sessionStorage.setItem("vita_emotional_mood_v1", mood);
    } catch {}
    window.location.href = "/demo/emocional/preguntas";
  }

  return (
    <PhoneFrame>
      <NavBar title="Chequeo emocional" subtitle="1 minuto · para orientarte" showBack />

      <div className="mt-4 ios-card-soft p-5">
        <p className="text-sm text-slate-600 leading-relaxed">
          Tamizaje breve. No es diagnóstico: es una brújula para decidir el siguiente paso.
        </p>
      </div>

      <div className="mt-5 ios-card p-5">
        <p className="text-lg font-semibold">¿Cómo te sientes ahora?</p>
        <p className="mt-1 text-sm text-slate-500">Elige una opción para continuar.</p>

        <div className="mt-4 grid gap-3">
          {MOODS.map((m) => {
            const active = mood === m.id;
            return (
              <button
                key={m.id}
                type="button"
                aria-pressed={active}
                onClick={() => setMood(m.id)}
                className={`ios-pill-row ${active ? "ios-pill-row-on" : ""}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold">{m.title}</p>
                    <p className="mt-1 text-sm text-slate-500 font-normal">{m.desc}</p>
                  </div>
                  {active ? <span className="text-blue-600 font-bold">✓</span> : null}
                </div>
              </button>
            );
          })}
        </div>

        <div className="mt-5 grid grid-cols-2 gap-3">
          <Link href="/demo" className="ios-btn-secondary w-full text-center">
            Volver
          </Link>

          <button
            type="button"
            className={`w-full text-center ${mood ? "ios-btn-primary" : "ios-btn-secondary opacity-60"}`}
            disabled={!mood}
            onClick={next}
          >
            Siguiente
          </button>
        </div>

        <p className="mt-3 text-xs text-slate-400 leading-relaxed">
          Si sientes riesgo de hacerte daño o no estás seguro(a), busca ayuda inmediata.
        </p>
      </div>
    </PhoneFrame>
  );
}
