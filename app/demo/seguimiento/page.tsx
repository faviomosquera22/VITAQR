"use client";

import { PhoneFrame } from "@/components/PhoneFrame";
import { NavBar } from "@/components/NavBar";
import { TabBar } from "@/components/TabBar";
import { QuickRow } from "@/components/QuickRow";
import { HeartPulse, Pill, Thermometer, BarChart3 } from "lucide-react";

export default function SeguimientoHub() {
  return (
    <PhoneFrame>
      <NavBar title="Seguimiento" subtitle="El control real ocurre entre consultas." />

      <div className="grid gap-3">
        <QuickRow title="Presión arterial" desc="Registro + promedio 7 + lectura." href="/demo/bp" left={<HeartPulse size={18} />} />
        <QuickRow title="Medicaciones" desc="Lista + horarios + activar/pausar." href="/demo/meds" left={<Pill size={18} />} />
        <QuickRow title="Signos rápidos" desc="Peso, glucosa, temperatura, SpO₂." href="/demo/vitals" left={<Thermometer size={18} />} />
        <QuickRow title="Resumen" desc="Alertas y accesos rápidos." href="/demo/resumen" left={<BarChart3 size={18} />} />
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
