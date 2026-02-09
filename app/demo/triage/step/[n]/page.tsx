"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { PhoneFrame } from "@/components/PhoneFrame";
import { NavBar } from "@/components/NavBar";

type RangeOption = { id: string; label: string };

const HR_OPTIONS: RangeOption[] = [
  { id: "lt45", label: "< 45" },
  { id: "45-100", label: "45–100" },
  { id: "101-130", label: "101–130" },
  { id: "gt130", label: "> 130" },
  { id: "ns", label: "No sé" },
];

const SBP_OPTIONS: RangeOption[] = [
  { id: "lt90", label: "< 90" },
  { id: "90-140", label: "90–140" },
  { id: "141-180", label: "141–180" },
  { id: "gt180", label: "> 180" },
  { id: "ns", label: "No sé" },
];

const DBP_OPTIONS: RangeOption[] = [
  { id: "lt60", label: "< 60" },
  { id: "60-90", label: "60–90" },
  { id: "91-110", label: "91–110" },
  { id: "gt110", label: "> 110" },
  { id: "ns", label: "No sé" },
];

const RR_OPTIONS: RangeOption[] = [
  { id: "lt12", label: "< 12" },
  { id: "12-20", label: "12–20" },
  { id: "21-30", label: "21–30" },
  { id: "gt30", label: "> 30" },
  { id: "ns", label: "No sé" },
];

const SPO2_OPTIONS: RangeOption[] = [
  { id: "lt90", label: "< 90%" },
  { id: "90-94", label: "90–94%" },
  { id: "95-100", label: "95–100%" },
  { id: "ns", label: "No sé" },
];

const KEY = "vita_triage_vitals_v1";

function pickClass(active: boolean) {
  return `choice-tile ${active ? "choice-tile-on" : ""}`;
}

export default function Step4Vitals() {
  const [hr, setHr] = useState<string>("ns");
  const [sbp, setSbp] = useState<string>("ns");
  const [dbp, setDbp] = useState<string>("ns");
  const [rr, setRr] = useState<string>("ns");
  const [spo2, setSpo2] = useState<string>("ns");

  useEffect(() => {
    try {
      const raw = sessionStorage.getItem(KEY);
      if (!raw) return;
      const v = JSON.parse(raw);
      setHr(v.hr ?? "ns");
      setSbp(v.sbp ?? "ns");
      setDbp(v.dbp ?? "ns");
      setRr(v.rr ?? "ns");
      setSpo2(v.spo2 ?? "ns");
    } catch {}
  }, []);

  const vitals = useMemo(
    () => ({ hr, sbp, dbp, rr, spo2 }),
    [hr, sbp, dbp, rr, spo2]
  );

  function persist() {
    try {
      sessionStorage.setItem(KEY, JSON.stringify(vitals));
    } catch {}
  }

  function clear() {
    setHr("ns");
    setSbp("ns");
    setDbp("ns");
    setRr("ns");
    setSpo2("ns");
    try {
      sessionStorage.removeItem(KEY);
    } catch {}
  }

  return (
    <PhoneFrame>
      <NavBar title="Vita" subtitle="Paso 4 de 4 · Signos vitales (opcional)" showBack />

      <div className="mt-4 ios-card p-5">
        <p className="text-lg font-semibold">Signos vitales (opcional)</p>
        <p className="mt-1 text-sm text-slate-500 leading-relaxed">
          Si no puedes medir, toca <b>Omitir</b>. El triaje igual continúa.
        </p>

        <div className="mt-5 space-y-6">
          <section>
            <p className="text-sm font-semibold text-slate-800">Pulso (FC)</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {HR_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={pickClass(hr === o.id)}
                  onClick={() => setHr(o.id)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <p className="text-sm font-semibold text-slate-800">Presión arterial sistólica</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {SBP_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={pickClass(sbp === o.id)}
                  onClick={() => setSbp(o.id)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <p className="text-sm font-semibold text-slate-800">Presión arterial diastólica</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {DBP_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={pickClass(dbp === o.id)}
                  onClick={() => setDbp(o.id)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <p className="text-sm font-semibold text-slate-800">Frecuencia respiratoria</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {RR_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={pickClass(rr === o.id)}
                  onClick={() => setRr(o.id)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </section>

          <section>
            <p className="text-sm font-semibold text-slate-800">Saturación (SpO₂)</p>
            <div className="mt-3 grid grid-cols-2 gap-3">
              {SPO2_OPTIONS.map((o) => (
                <button
                  key={o.id}
                  type="button"
                  className={pickClass(spo2 === o.id)}
                  onClick={() => setSpo2(o.id)}
                >
                  {o.label}
                </button>
              ))}
            </div>
          </section>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3">
          <button type="button" className="ios-btn-secondary w-full text-center" onClick={clear}>
            Limpiar
          </button>

          <Link
            href="/demo/triage/result"
            onClick={persist as any}
            className="ios-btn-primary w-full text-center"
          >
            Continuar
          </Link>
        </div>

        <div className="mt-3">
          <Link href="/demo/triage/result" className="text-sm text-slate-500 underline">
            Omitir
          </Link>
        </div>
      </div>
    </PhoneFrame>
  );
}
