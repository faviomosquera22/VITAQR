"use client";

import { PhoneFrame } from "@/components/PhoneFrame";
import { NavBar } from "@/components/NavBar";
import { TabBar } from "@/components/TabBar";
import { loadState, resetState } from "@/lib/state";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function PerfilPage() {
  const [alias, setAlias] = useState("Invitado");

  useEffect(() => {
    const s = loadState();
    setAlias(s.alias || "Invitado");
  }, []);

  function reset() {
    resetState();
    location.href = "/demo";
  }

  return (
    <PhoneFrame>
      <NavBar title="Perfil" subtitle="Configuración del demo." />

      <div className="ios-card p-5">
        <p className="text-sm text-slate-700">
          Alias: <span className="font-semibold">{alias}</span>
        </p>
        <p className="mt-2 text-xs text-slate-500">
          Se guarda en tu navegador. Reiniciar lo deja como recién nacido (sin llanto incluido).
        </p>

        <div className="mt-4 grid gap-3">
          <button onClick={reset} className="btn-primary w-full">Reiniciar demo</button>
          <Link href="/pro" className="btn-secondary text-center">Portal profesional</Link>
        </div>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
