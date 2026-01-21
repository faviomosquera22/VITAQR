"use client";

import { PhoneFrame } from "@/components/PhoneFrame";
import { NavBar } from "@/components/NavBar";
import { TabBar } from "@/components/TabBar";
import { loadState, saveState, type Feeling } from "@/lib/state";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function EmocionalPage() {
  const [alias, setAlias] = useState("Invitado");

  useEffect(() => {
    const s = loadState();
    setAlias(s.alias || "Invitado");
  }, []);

  function setFeeling(f: Feeling) {
    const s = loadState();
    saveState({
      ...s,
      emotional: { ...(s.emotional ?? { answers: {} }), feeling: f, answers: {}, score: undefined, level: undefined },
    });
  }

  return (
    <PhoneFrame>
      <NavBar title="Chequeo emocional" subtitle={`${alias}, elige tu estado para empezar.`} showBack />

      <div className="ios-card p-5">
        <p className="text-sm text-slate-700">Tamizaje breve. No es diagnóstico: es una brújula.</p>

        <div className="mt-4 grid gap-3">
          <Link href="/demo/emocional/test" onClick={() => setFeeling("Inquieto")} className="btn-primary text-center">Inquieto</Link>
          <Link href="/demo/emocional/test" onClick={() => setFeeling("Triste")} className="btn-secondary text-center">Triste</Link>
          <Link href="/demo/emocional/test" onClick={() => setFeeling("Agobiado")} className="btn-secondary text-center">Agobiado</Link>
        </div>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
