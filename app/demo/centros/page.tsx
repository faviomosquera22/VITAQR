"use client";

import { PhoneFrame } from "@/components/PhoneFrame";
import { TabBar } from "@/components/TabBar";
import Link from "next/link";
import { MapPin, Phone, Navigation, Clock3, ShieldAlert } from "lucide-react";

const centers = [
  { name: "Hospital General (MSP)", dist: "1.2 km", eta: "8 min", phone: "911", type: "Urgencias 24/7" },
  { name: "Clínica Central", dist: "2.6 km", eta: "14 min", phone: "04-000-0000", type: "Emergencia / Consulta" },
  { name: "Centro de Salud (Barrio)", dist: "3.4 km", eta: "18 min", phone: "04-000-0000", type: "Atención primaria" },
];

export default function CentrosPage() {
  return (
    <PhoneFrame>
      <div className="ios-card-soft p-5">
        <p className="text-sm text-slate-500">Centros médicos cercanos</p>
        <p className="mt-1 text-2xl font-semibold">Recomendados por Vita</p>
        <p className="mt-2 text-sm text-slate-500">
          Demo: en la app real esto usa tu ubicación para sugerir opciones seguras.
        </p>
      </div>

      <div className="mt-4 ios-card p-5">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-2xl bg-red-50 border border-red-200 flex items-center justify-center">
            <ShieldAlert className="text-red-600" size={20} />
          </div>
          <div>
            <p className="font-semibold">Si es una emergencia</p>
            <p className="text-sm text-slate-500">No esperes: llama a tu número local de emergencias.</p>
          </div>
        </div>

        <a
          href="tel:911"
          className="mt-4 block rounded-3xl bg-red-600 text-white text-center font-semibold py-4 shadow-[0_18px_34px_rgba(239,68,68,.22)] active:scale-[0.98] transition"
        >
          Llamar 911
        </a>
      </div>

      <div className="mt-4 grid gap-3">
        {centers.map((c) => (
          <div key={c.name} className="ios-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-lg font-semibold">{c.name}</p>
                <p className="text-sm text-slate-500">{c.type}</p>
              </div>
              <div className="h-10 w-10 rounded-2xl bg-blue-50 border border-blue-200 flex items-center justify-center">
                <MapPin className="text-blue-700" size={18} />
              </div>
            </div>

            <div className="mt-3 flex flex-wrap gap-2 text-sm">
              <span className="rounded-full bg-slate-100 px-3 py-2 font-semibold text-slate-700 inline-flex items-center gap-2">
                <Navigation size={16} className="text-slate-500" /> {c.dist}
              </span>
              <span className="rounded-full bg-slate-100 px-3 py-2 font-semibold text-slate-700 inline-flex items-center gap-2">
                <Clock3 size={16} className="text-slate-500" /> {c.eta}
              </span>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-3">
              <button className="ios-btn-secondary rounded-3xl py-4 flex items-center justify-center gap-2">
                <MapPin size={18} /> Ver ruta
              </button>
              <a
                href={`tel:${c.phone}`}
                className="ios-btn-primary rounded-3xl py-4 text-center flex items-center justify-center gap-2"
              >
                <Phone size={18} /> Llamar
              </a>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 footer-safe">
        <Link href="/demo/triage/step/4" className="ios-btn-secondary text-center py-4 rounded-3xl">
          Volver al resultado
        </Link>
        <Link href="/demo" className="ios-btn-primary text-center py-4 rounded-3xl">
          Inicio
        </Link>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
