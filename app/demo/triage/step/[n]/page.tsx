"use client";

import { PhoneFrame } from "@/components/PhoneFrame";
import { HeroHeader } from "@/components/HeroHeader";
import { ProgressBar } from "@/components/ProgressBar";
import { BottomActions } from "@/components/BottomActions";
import { Stepper } from "@/components/Stepper";
import {
  loadState,
  saveState,
  computeTriageColor,
  computeConfidence,
  manchesterAdvice,
  type Sex,
  type TriageColor,
} from "@/lib/state";
import React, { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { AlertTriangle, HeartPulse, Info, Thermometer } from "lucide-react";

const antecedentsMain = [
  "Hipertensión arterial",
  "Diabetes mellitus",
  "Asma",
  "Insuficiencia cardiaca",
  "Enfermedad renal crónica (ERC)",
  "Ninguno de los anteriores",
];

const antecedentsMore = [
  "EPOC",
  "Embarazo",
  "Cáncer",
  "Inmunosupresión",
  "Alergias graves",
  "Antecedente de ACV",
];

const symptomOptions = [
  { label: "Falta de aire", icon: "😮‍💨", warn: true },
  { label: "Dolor en el pecho", icon: "❤️", warn: true },
  { label: "Fiebre", icon: "🌡️" },
  { label: "Dolor de cabeza", icon: "🤕" },
  { label: "Dolor abdominal", icon: "🤢" },
  { label: "Vómito", icon: "🤮" },
  { label: "Diarrea", icon: "🚽" },
  { label: "Ardor al orinar", icon: "💧" },
  { label: "Escalofríos", icon: "🥶" },
  { label: "Tos", icon: "😷" },
];

const zones = [
  "Cabeza",
  "Cuello",
  "Pecho",
  "Barriga (abdomen)",
  "Espalda",
  "Brazos y manos",
  "Piernas y pies",
  "Parte baja del vientre",
];

const painTypes = [
  "Apretado (como un peso)",
  "Pinchazo",
  "Retorcijón",
  "Ardor/quemazón",
  "Late con el pulso",
];

const fcRanges = ["< 45", "45–100", "101–130", "> 130", "No sé"] as const;
const sysRanges = ["< 90", "90–140", "141–180", "> 180", "No sé"] as const;

function colorDot(c: TriageColor) {
  const map: Record<TriageColor, string> = {
    Rojo: "bg-red-500",
    Naranja: "bg-orange-500",
    Amarillo: "bg-amber-400",
    Verde: "bg-emerald-500",
    Azul: "bg-blue-500",
  };
  return map[c];
}

export default function TriageLikeApp({ params }: { params: { n: string } }) {
  const step = Math.max(1, Math.min(4, Number(params.n || "1")));
  const progress = (step - 1) / 3;

  // Step 1
  const [age, setAge] = useState(30);
  const [sex, setSex] = useState<Sex>("Masculino");
  const [antecedentes, setAntecedentes] = useState<string[]>([]);
  const [showMore, setShowMore] = useState(false);

  // Step 2
  const [symptom, setSymptom] = useState("");

  // Step 3
  const [zonesSel, setZonesSel] = useState<string[]>([]);
  const [painType, setPainType] = useState<string>("");
  const [fcRange, setFcRange] = useState<(typeof fcRanges)[number] | "">("");
  const [sysRange, setSysRange] = useState<(typeof sysRanges)[number] | "">("");

  // Result
  const computed = useMemo(() => {
    const s = loadState().triage ?? {};
    const color = computeTriageColor(symptom || s.step2?.symptom || "", fcRange || s.step3?.fcRange, sysRange || s.step3?.sysRange);
    const confidence = computeConfidence({
      step1: { age, sex, antecedentes },
      step2: { symptom: symptom || "" },
      step3: { zones: zonesSel, painType, fcRange: (fcRange as any) || undefined, sysRange: (sysRange as any) || undefined },
      result: undefined,
    });
    return { color, confidence, advice: manchesterAdvice(color) };
  }, [age, sex, antecedentes, symptom, zonesSel, painType, fcRange, sysRange]);

  useEffect(() => {
    const s = loadState();
    // hydrate triage
    const t = s.triage ?? {};
    setAge(t.step1?.age ?? 58);
    setSex(t.step1?.sex ?? "Masculino");
    setAntecedentes(t.step1?.antecedentes ?? ["Diabetes mellitus"]);
    setSymptom(t.step2?.symptom ?? "Dolor de cabeza");
    setZonesSel(t.step3?.zones ?? ["Cabeza"]);
    setPainType(t.step3?.painType ?? "Late con el pulso");
    setFcRange((t.step3?.fcRange as any) ?? "");
    setSysRange((t.step3?.sysRange as any) ?? "");
  }, []);

  function persist(partial?: any) {
    const s = loadState();
    const next = {
      ...(s.triage ?? {}),
      step1: { age, sex, antecedentes },
      step2: { symptom },
      step3: { zones: zonesSel, painType: painType || undefined, fcRange: (fcRange as any) || undefined, sysRange: (sysRange as any) || undefined },
      ...(partial ?? {}),
    };
    saveState({ ...s, triage: next });
  }

  function toggleAntecedente(a: string) {
    if (a === "Ninguno de los anteriores") {
      setAntecedentes([a]);
      return;
    }
    const next = antecedentes.includes(a) ? antecedentes.filter((x) => x !== a) : [...antecedentes.filter(x => x !== "Ninguno de los anteriores"), a];
    setAntecedentes(next);
  }

  function toggleZone(z: string) {
    setZonesSel(zonesSel.includes(z) ? zonesSel.filter((x) => x !== z) : [...zonesSel, z]);
  }

  // Navigation
  const prevHref = step === 1 ? "/demo" : `/demo/triage/step/${step - 1}`;
  const nextHref = step === 4 ? "/demo" : `/demo/triage/step/${step + 1}`;
  const rightLabel = step === 3 ? "Calcular" : step === 4 ? "Listo" : "Siguiente";

  function onNext() {
    if (step === 3) {
      // compute & store result
      persist({ result: { color: computed.color, confidence: computed.confidence } });
    } else {
      persist();
    }
  }

  return (
    <PhoneFrame>
      {step === 4 ? null : (
        <>
          <HeroHeader />
          <ProgressBar value={progress} />
          <p className="mt-4 text-slate-500">
            Paso {step} de 4 ·{" "}
            <span className="text-slate-600">
              {step === 1 ? "Datos básicos" : step === 2 ? "Síntomas" : step === 3 ? "Dolor y signos" : "Resultado"}
            </span>
          </p>
        </>
      )}

      {/* STEP 1 */}
      {step === 1 ? (
        <div className="mt-4 grid gap-4">
          <div className="ios-card p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xl font-semibold">Datos básicos</p>
              </div>
              <div className="h-9 w-9 rounded-full bg-slate-100 flex items-center justify-center">
                <Info size={18} className="text-slate-500" />
              </div>
            </div>

            <div className="mt-4">
              <Stepper label="Edad" value={age} onChange={setAge} min={0} max={110} />
              <p className="mt-3 text-sm text-slate-500">Si no recuerdas exacto, pon un aproximado.</p>
            </div>

            <div className="mt-4">
              <div className="segmented">
                {(["Femenino", "Masculino", "Otro"] as Sex[]).map((s) => (
                  <button
                    key={s}
                    onClick={() => setSex(s)}
                    className={`segment ${sex === s ? "segment-on" : "text-slate-500"}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
              <p className="mt-3 text-sm text-slate-500">
                Elígelo según cómo figura en tu documento o como te identificas.
              </p>
            </div>
          </div>

          <div className="ios-card p-5">
            <p className="text-xl font-semibold">Antecedentes médicos</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {antecedentsMain.map((a) => {
                const on = antecedentes.includes(a);
                return (
                  <button
                    key={a}
                    onClick={() => toggleAntecedente(a)}
                    className={`choice-tile ${on ? (a !== "Ninguno de los anteriores" ? "choice-tile-blue" : "choice-tile-on border-blue-200") : ""}`}
                  >
                    {a}
                  </button>
                );
              })}
            </div>

            {showMore ? (
              <div className="mt-3 grid grid-cols-2 gap-3">
                {antecedentsMore.map((a) => {
                  const on = antecedentes.includes(a);
                  return (
                    <button
                      key={a}
                      onClick={() => toggleAntecedente(a)}
                      className={`choice-tile ${on ? "choice-tile-blue" : ""}`}
                    >
                      {a}
                    </button>
                  );
                })}
              </div>
            ) : null}

            <p className="mt-3 text-sm text-slate-500">Marca solo lo que ya te diagnosticó un profesional.</p>

            <button onClick={() => setShowMore(!showMore)} className="mt-2 text-blue-600 font-semibold flex items-center gap-2">
              <span className="text-lg">{showMore ? "▴" : "▾"}</span> Ver {showMore ? "menos" : "más"} antecedentes
            </button>
          </div>

          <p className="text-center text-sm text-slate-400 px-3">
            Si te sientes muy mal o crees que es una emergencia, acude de inmediato a un servicio de urgencias.
          </p>
        </div>
      ) : null}

      {/* STEP 2 */}
      {step === 2 ? (
        <div className="mt-6">
          <p className="text-lg font-semibold text-slate-900">¿Qué sientes ahora?</p>

          <div className="mt-4 grid gap-3">
            {symptomOptions.map((o) => {
              const on = symptom === o.label;
              return (
                <button
                  key={o.label}
                  onClick={() => setSymptom(o.label)}
                  className={`ios-pill-row flex items-center gap-3 ${on ? "ios-pill-row-on" : ""}`}
                >
                  {o.warn ? <AlertTriangle className="text-amber-500" size={18} /> : <span className="w-[18px]" />}
                  <span className="text-lg">{o.icon}</span>
                  <span className="flex-1 text-sm font-semibold">{o.label}</span>
                </button>
              );
            })}
          </div>

          <p className="mt-4 text-center text-sm text-slate-400 px-3">
            Si te sientes muy mal o crees que es una emergencia, acude de inmediato a un servicio de urgencias.
          </p>
        </div>
      ) : null}

      {/* STEP 3 */}
      {step === 3 ? (
        <div className="mt-6 grid gap-4">
          <div className="ios-card p-5">
            <p className="text-lg font-semibold">¿Dónde te duele?</p>
            <p className="text-sm text-slate-500 mt-1">Puedes elegir una o varias zonas.</p>

            <div className="mt-4 grid grid-cols-2 gap-3">
              {zones.map((z) => {
                const on = zonesSel.includes(z);
                return (
                  <button
                    key={z}
                    onClick={() => toggleZone(z)}
                    className={`choice-tile ${on ? "choice-tile-on border-blue-300" : ""}`}
                  >
                    {z}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="ios-card p-5">
            <p className="text-lg font-semibold">¿Cómo es el dolor?</p>
            <div className="mt-4 grid grid-cols-2 gap-3">
              {painTypes.map((p) => {
                const on = painType === p;
                return (
                  <button
                    key={p}
                    onClick={() => setPainType(p)}
                    className={`choice-tile ${on ? "choice-tile-on border-blue-300" : ""}`}
                  >
                    {p}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="ios-card p-5">
            <p className="text-lg font-semibold">Signos vitales (opcional)</p>

            <div className="mt-4">
              <div className="flex items-center gap-2 text-sm font-semibold">
                <HeartPulse size={18} className="text-blue-600" />
                Latidos del corazón (pulso)
              </div>

              <div className="mt-3 grid gap-3">
                {fcRanges.map((r) => {
                  const on = fcRange === r;
                  return (
                    <button
                      key={r}
                      onClick={() => setFcRange(r)}
                      className={`ios-pill-row text-center ${on ? "ios-pill-row-on" : ""}`}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>

              <div className="mt-3 flex items-center justify-between">
                <button className="rounded-full bg-blue-100 text-blue-700 px-4 py-2 font-semibold">
                  Ayúdame a medir FC
                </button>
                <p className="text-sm text-slate-400">Si no puedes medir, elige “No sé”.</p>
              </div>
            </div>

            <div className="divider my-5" />

            <div>
              <div className="flex items-center gap-2 text-sm font-semibold">
                <Thermometer size={18} className="text-blue-600" />
                Presión alta (sistólica, mmHg)
              </div>
              <div className="mt-3 grid gap-3">
                {sysRanges.map((r) => {
                  const on = sysRange === r;
                  return (
                    <button
                      key={r}
                      onClick={() => setSysRange(r)}
                      className={`ios-pill-row text-center ${on ? "ios-pill-row-on" : ""}`}
                    >
                      {r}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <p className="text-center text-sm text-slate-400 px-3">
            Si te sientes muy mal o crees que es una emergencia, acude de inmediato a un servicio de urgencias.
          </p>
        </div>
      ) : null}

      {/* STEP 4 RESULT */}
      {step === 4 ? (
        <div className="mt-2">
          <p className="text-center text-2xl font-semibold">Resultado</p>

          <div className="mt-6 grid gap-4">
            <div className="ios-card p-5">
              <p className="text-sm font-semibold text-slate-700">Resultado</p>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className={`h-4 w-4 rounded-full ${colorDot(computed.color)}`} />
                  <p className="text-2xl font-semibold">{computed.color}</p>
                </div>
                <p className="text-slate-400 text-lg">Confianza {computed.confidence}%</p>
              </div>
              <p className="mt-2 text-slate-500">{computed.advice}</p>
            </div>

            <div className="ios-card p-5">
              <p className="text-xl font-semibold">Acción recomendada</p>

              {["Rojo", "Naranja", "Amarillo"].includes(computed.color) ? (
                <>
                  <p className="mt-2 text-slate-500">
                    Por el color <span className="font-semibold text-slate-900">{computed.color}</span>, lo más seguro es buscar atención presencial pronto.
                  </p>

                  <div className="mt-4 grid grid-cols-2 gap-3">
                    <Link
                      href="/demo/centros"
                      className="ios-btn-primary rounded-3xl px-5 py-4 text-center"
                    >
                      Centro cercano
                    </Link>

                    <a
                      href="tel:911"
                      className="rounded-3xl bg-red-50 border border-red-200 text-red-700 px-5 py-4 text-center font-semibold shadow-sm active:scale-[0.98] transition"
                    >
                      Llamar 911
                    </a>
                  </div>

                  <p className="mt-3 text-sm text-slate-400">
                    Si estás en Ecuador, 911 es la línea de emergencias. Si estás en otro país, usa tu número local de emergencias.
                  </p>
                </>
              ) : (
                <>
                  <p className="mt-2 text-slate-500">
                    Para colores <span className="font-semibold text-slate-900">Verde</span> o{" "}
                    <span className="font-semibold text-slate-900">Azul</span>, lo ideal es seguimiento y consulta programada.
                  </p>

                  <div className="mt-4 flex gap-3 flex-wrap">
                    <button className="ios-btn-primary rounded-full px-5 py-3">Agendar cita médica</button>
                    <button className="rounded-full bg-blue-100 text-blue-700 px-5 py-3 font-semibold">
                      Cita virtual
                    </button>
                  </div>

                  <p className="mt-3 text-slate-500">
                    Si los síntomas persisten, agenda una evaluación con un profesional.
                  </p>
                </>
              )}
            </div>

<div className="ios-card p-5">
              <p className="text-xl font-semibold">Recomendaciones de la app</p>
              <ul className="mt-3 space-y-2 text-slate-700">
                <li>• Por ahora tu caso no parece urgente. Descansa, toma suficientes líquidos y observa cómo cambian tus síntomas durante las próximas horas.</li>
                <li>• Si aparece fiebre alta, te falta el aire, sientes dolor en el pecho o te sientes peor, acude a un servicio de urgencias, aunque el resultado inicial haya sido azul o verde.</li>
              </ul>
              <p className="mt-4 text-sm text-slate-400">
                Estas recomendaciones son orientativas y no sustituyen una valoración médica presencial.
              </p>
            </div>
          </div>

          <div className="mt-6 footer-safe grid grid-cols-2 gap-4">
            <Link href="/demo" className="ios-btn-secondary text-center py-4 rounded-3xl">
              Volver al inicio
            </Link>
            <Link
              href="/demo/triage/step/1"
              onClick={() => {
                const s = loadState();
                saveState({ ...s, triage: { step1: s.triage?.step1, step2: { symptom: "" }, step3: { zones: [] } } as any });
              }}
              className="ios-btn-primary text-center py-4 rounded-3xl"
            >
              Nueva evaluación
            </Link>
          </div>
        </div>
      ) : null}

      {/* Bottom nav (steps 1-3) */}
      {step !== 4 ? (
        <BottomActions
          leftLabel="Atrás"
          rightLabel={rightLabel}
          leftHref={prevHref}
          rightHref={`/demo/triage/step/${Math.min(4, step + 1)}`}
          onLeft={() => persist()}
          onRight={onNext}
          rightPrimary={true}
        />
      ) : null}
    </PhoneFrame>
  );
}
