"use client";

import { PhoneFrame } from "@/components/PhoneFrame";
import { NavBar } from "@/components/NavBar";
import { TabBar } from "@/components/TabBar";
import { loadState, saveState } from "@/lib/state";
import { useEffect, useState } from "react";

export default function VitalsPage() {
  const [weightKg, setWeightKg] = useState<number | "">("");
  const [glucoseMgDl, setGlucoseMgDl] = useState<number | "">("");
  const [tempC, setTempC] = useState<number | "">("");
  const [spo2, setSpo2] = useState<number | "">("");

  useEffect(() => {
    const s = loadState();
    setWeightKg(s.vitals?.weightKg ?? "");
    setGlucoseMgDl(s.vitals?.glucoseMgDl ?? "");
    setTempC(s.vitals?.tempC ?? "");
    setSpo2(s.vitals?.spo2 ?? "");
  }, []);

  function save() {
    const s = loadState();
    saveState({
      ...s,
      vitals: {
        weightKg: weightKg === "" ? undefined : Number(weightKg),
        glucoseMgDl: glucoseMgDl === "" ? undefined : Number(glucoseMgDl),
        tempC: tempC === "" ? undefined : Number(tempC),
        spo2: spo2 === "" ? undefined : Number(spo2),
      },
    });
    alert("Guardado (demo)." );
  }

  return (
    <PhoneFrame>
      <NavBar title="Signos rápidos" subtitle="Registro básico para seguimiento." showBack />

      <div className="ios-card p-5">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="ios-label">Peso (kg)</label>
            <input type="number" className="input mt-2" value={weightKg} onChange={(e) => setWeightKg(e.target.value === "" ? "" : Number(e.target.value))} />
          </div>
          <div>
            <label className="ios-label">Glucosa (mg/dL)</label>
            <input type="number" className="input mt-2" value={glucoseMgDl} onChange={(e) => setGlucoseMgDl(e.target.value === "" ? "" : Number(e.target.value))} />
          </div>
          <div>
            <label className="ios-label">Temp (°C)</label>
            <input type="number" step="0.1" className="input mt-2" value={tempC} onChange={(e) => setTempC(e.target.value === "" ? "" : Number(e.target.value))} />
          </div>
          <div>
            <label className="ios-label">SpO₂ (%)</label>
            <input type="number" className="input mt-2" value={spo2} onChange={(e) => setSpo2(e.target.value === "" ? "" : Number(e.target.value))} />
          </div>
        </div>

        <button onClick={save} className="mt-4 btn-primary w-full">Guardar</button>

        <p className="mt-3 text-xs text-slate-500">
          En Vita real: aquí se conectan tendencias y alertas.
        </p>
      </div>

      <TabBar />
    </PhoneFrame>
  );
}
