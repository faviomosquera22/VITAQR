"use client";

import { PhoneFrame } from "@/components/PhoneFrame";
import { NavBar } from "@/components/NavBar";
import { TabBar } from "@/components/TabBar";
import { questionsByFeeling, emotionalLevel, emotionalText } from "@/lib/emotional";
import { loadState, saveState, type Feeling } from "@/lib/state";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

const scale = [
  { v: 0, label: "Nada" },
  { v: 1, label: "Leve" },
  { v: 2, label: "Medio" },
  { v: 3, label: "Mucho" },
];

export default function EmocionalTest() {
  const [feeling, setFeeling] = useState<Feeling>("Inquieto");
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [note, setNote] = useState("");

  useEffect(() => {
    const s = loadState();
    setFeeling((s.emotional?.feeling ?? "Inquieto") as Feeling);
    setAnswers(s.emotional?.answers ?? {});
    setNote(s.emotional?.note ?? "");
  }, []);

  const qs = useMemo(() => questionsByFeeling[feeling] ?? [], [feeling]);
  const answered = Object.keys(answers).length;

  function setAns(id: string, v: number) {
    const next = { ...answers, [id]: v };
    setAnswers(next);
    const s = loadState();
    saveState({ ...s, emotional: { ...(s.emotional ?? { answers: {} }), feeling, answers: next, note } });
  }

  function persistNote(n: string) {
    setNote(n);
    const s = loadState();
    saveState({ ...s, emotional: { ...(s.emotional ?? { answers: {} }), feeling, answers, note: n } });
  }

  const scoreNow = Object.values(answers).reduce((a, b) => a + (b ?? 0), 0);
  const levelNow = emotionalLevel(scoreNow);
  const canFinish = answered === qs.length && qs.length > 0;

  function finish() {
    const s = loadState();
    saveState({ ...s, emotional: { ...(s.emotional ?? { answers: {} }), feeling, answers, note, score: scoreNow, level: levelNow } });
    alert(`Guardado: ${levelNow}`);
  }

  return (
    <PhoneFrame>
      <NavBar title="Evaluación emocional" subtitle={`${feeling} · ${answered}/${qs.length}`} showBack />

      <div className="grid gap-4">
        {qs.map((q) => (
          <div key={q.id} className="ios-card p-5">
            <p className="text-sm font-medium text-slate-900">{q.q}</p>
            <div className="mt-3 grid grid-cols-4 gap-2">
              {scale.map((s) => {
                const active = answers[q.id] === s.v;
                return (
                  <button
                    key={s.v}
                    onClick={() => setAns(q.id, s.v)}
                    className={`rounded-2xl px-2 py-2 text-xs transition active:scale-[0.98] ${
                      active ? "bg-slate-900 text-white" : "bg-slate-100/70 text-slate-700 border border-slate-200"
                    }`}
                  >
                    {s.label}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        <div className="ios-card p-5">
          <p className="text-sm font-medium">Nota (opcional)</p>
          <textarea
            value={note}
            onChange={(e) => persistNote(e.target.value)}
            placeholder="Escribe lo que necesites decir."
            className="mt-2 h-24 w-full rounded-2xl border border-slate-200 bg-slate-100/70 px-4 py-3 text-sm outline-none backdrop-blur-xl"
          />
        </div>

        <button onClick={finish} disabled={!canFinish} className={`w-full ${canFinish ? "btn-primary" : "btn-secondary opacity-60"}`}>
          Guardar
        </button>

        <div className="ios-card p-5">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold">Lectura orientativa</p>
            <span className={`text-[11px] px-2 py-1 rounded-full ${levelNow === "Bajo" ? "bg-emerald-600 text-white" : levelNow === "Moderado" ? "bg-amber-500 text-white" : "bg-rose-600 text-white"}`}>
              {levelNow}
            </span>
          </div>
          <p className="mt-2 text-sm text-slate-700">{emotionalText(levelNow)}</p>
        </div>

        <Link href="/demo/resumen" className="btn-secondary text-center">Ir a resumen</Link>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
