"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { NavBar } from "@/components/NavBar";

type Answer = "0" | "1";

const MOODS = [
  { id: "inquieto", title: "Inquieto", desc: "Mente acelerada, nervios o tensión." },
  { id: "triste", title: "Triste", desc: "Baja de ánimo, ganas de aislarte." },
  { id: "agobiado", title: "Agobiado", desc: "Cansancio mental, demasiado encima." },
];

const QUESTIONS = [
  {
    id: "sleep",
    title: "Sueño",
    desc: "¿Dormiste bien las últimas 2 noches?",
    a: { id: "0" as Answer, label: "No" },
    b: { id: "1" as Answer, label: "Sí" },
  },
  {
    id: "stress",
    title: "Estrés",
    desc: "¿Sientes estrés alto hoy?",
    a: { id: "1" as Answer, label: "Sí" },
    b: { id: "0" as Answer, label: "No" },
  },
  {
    id: "energy",
    title: "Energía",
    desc: "¿Tienes energía para tus actividades básicas?",
    a: { id: "0" as Answer, label: "No" },
    b: { id: "1" as Answer, label: "Sí" },
  },
  {
    id: "support",
    title: "Apoyo",
    desc: "¿Tienes a alguien con quien hablar hoy?",
    a: { id: "0" as Answer, label: "No" },
    b: { id: "1" as Answer, label: "Sí" },
  },
];

function tile(active: boolean) {
  return `choice-tile ${active ? "choice-tile-on" : ""}`;
}

function scoreFromAnswers(a: Record<string, Answer>) {
  let s = 0;
  if (a.sleep === "0") s += 1;
  if (a.stress === "1") s += 1;
  if (a.energy === "0") s += 1;
  if (a.support === "0") s += 1;
  return s; // 0..4
}

function level(score: number) {
  if (score >= 3) return "alto";
  if (score === 2) return "medio";
  return "bajo";
}

export default function EmocionalPage() {
  const [mood, setMood] = useState<string>("");
  const [answers, setAnswers] = useState<Record<string, Answer>>({});
  const [showResult, setShowResult] = useState(false);

  // Carga (por si vuelves a la página)
  useEffect(() => {
    try {
      const m = sessionStorage.getItem("vita_emotional_mood_v1");
      if (m) setMood(m);
      const raw = sessionStorage.getItem("vita_emotional_answers_v1");
      if (raw) setAnswers(JSON.parse(raw));
    } catch {}
  }, []);

  const completed = useMemo(() => {
    if (!mood) return false;
    return QUESTIONS.every((q) => answers[q.id] === "0" || answers[q.id] === "1");
  }, [answers, mood]);

  const score = useMemo(() => scoreFromAnswers(answers), [answers]);
  const risk = useMemo(() => level(score), [score]);

  const badge = useMemo(() => {
    if (risk === "alto") return { cls: "tri-badge tri-orange", label: "Prioridad media-alta" };
    if (risk === "medio") return { cls: "tri-badge tri-yellow", label: "Prioridad moderada" };
    return { cls: "tri-badge tri-green", label: "Prioridad baja" };
  }, [risk]);

  const plan = useMemo(() => {
    if (risk === "alto") {
      return [
        "Contacta a alguien de confianza hoy (mensaje o llamada).",
        "Haz una pausa: respiración 4–6 por 2 minutos.",
        "Si sientes riesgo de hacerte daño o perder control: busca ayuda inmediata.",
      ];
    }
    if (risk === "medio") {
      return [
        "Plan de 20 minutos: caminar suave, estirar o ducha tibia.",
        "Reduce pantallas 30–60 min antes de dormir.",
        "Escribe 3 cosas pequeñas que sí puedes resolver hoy.",
      ];
    }
    return [
      "Respiración 4–6 por 2 minutos.",
      "Pausa de pantalla + hidratación.",
      "Si se repite varios días, considera hablar con un profesional.",
    ];
  }, [risk]);

  function setAnswer(id: string, v: Answer) {
    const next = { ...answers, [id]: v };
    setAnswers(next);
    try {
      sessionStorage.setItem("vita_emotional_answers_v1", JSON.stringify(next));
    } catch {}
  }

  function openResult() {
    try {
      sessionStorage.setItem("vita_emotional_mood_v1", mood);
      sessionStorage.setItem("vita_emotional_answers_v1", JSON.stringify(answers));
    } catch {}
    setShowResult(true);
  }

  function reset() {
    setMood("");
    setAnswers({});
    setShowResult(false);
    try {
      sessionStorage.removeItem("vita_emotional_mood_v1");
      sessionStorage.removeItem("vita_emotional_answers_v1");
    } catch {}
  }

  return (
    <PhoneFrame>
      <NavBar title="Chequeo emocional" subtitle="1 minuto · orientación" showBack />

      <div className="mt-4 ios-card-soft p-5">
        <p className="text-sm text-slate-600 leading-relaxed">
          Tamizaje breve. No es diagnóstico: es una brújula para decidir el siguiente paso.
        </p>
      </div>

      {/* 1) Estado */}
      <div className="mt-5 ios-card p-5">
        <p className="text-lg font-semibold">¿Cómo te sientes ahora?</p>
        <p className="mt-1 text-sm text-slate-500">Elige una opción.</p>

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
      </div>

      {/* 2) Preguntas rápidas */}
      <div className="mt-5 ios-card p-5">
        <p className="text-lg font-semibold">Preguntas rápidas</p>
        <p className="mt-1 text-sm text-slate-500">Sí / No. Para afinar la orientación.</p>

        <div className="mt-4 grid gap-4">
          {QUESTIONS.map((q) => {
            const v = answers[q.id];
            return (
              <div key={q.id} className="rounded-3xl border border-slate-200/70 bg-white p-4">
                <p className="text-sm font-semibold text-slate-800">{q.title}</p>
                <p className="mt-1 text-sm text-slate-500">{q.desc}</p>

                <div className="mt-3 grid grid-cols-2 gap-3">
                  <button type="button" className={tile(v === q.a.id)} onClick={() => setAnswer(q.id, q.a.id)}>
                    {q.a.label}
                  </button>
                  <button type="button" className={tile(v === q.b.id)} onClick={() => setAnswer(q.id, q.b.id)}>
                    {q.b.label}
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <Link href="/demo" className="ios-btn-secondary w-full text-center">
            Volver
          </Link>

          <button
            type="button"
            className={`w-full text-center ${completed ? "ios-btn-primary" : "ios-btn-secondary opacity-60"}`}
            disabled={!completed}
            onClick={openResult}
          >
            Ver resultado
          </button>
        </div>

        <p className="mt-3 text-xs text-slate-400 leading-relaxed">
          Si sientes peligro inmediato, busca ayuda de emergencia.
        </p>
      </div>

      {/* RESULTADO (mismo screen, sin nueva ruta) */}
      {showResult ? (
        <div className="mt-5 ios-card p-5">
          <p className="text-sm text-slate-500">Resultado</p>
          <p className="mt-1 text-xl font-semibold capitalize">{mood || "—"}</p>

          <div className="mt-3">
            <span className={badge.cls}>{badge.label}</span>
          </div>

          <p className="mt-3 text-sm text-slate-600 leading-relaxed">
            Orientación basada en tus respuestas. No es diagnóstico.
          </p>

          <p className="mt-5 text-lg font-semibold">Tu plan inmediato</p>
          <ul className="mt-3 list-disc pl-5 text-sm text-slate-700 space-y-2">
            {plan.map((t, i) => (
              <li key={i}>{t}</li>
            ))}
          </ul>

          <div className="mt-5 grid gap-3">
            <a className="ios-btn-primary w-full text-center" href="tel:911">
              Llamar 911
            </a>

            <button type="button" className="ios-btn-secondary w-full text-center" onClick={reset}>
              Reiniciar chequeo
            </button>
          </div>

          <p className="mt-3 text-xs text-slate-400">
            Si sientes peligro inmediato, llama a emergencias o acude a un servicio cercano.
          </p>
        </div>
      ) : null}
    </PhoneFrame>
  );
}
