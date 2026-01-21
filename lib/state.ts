export type TriageColor = "Rojo" | "Naranja" | "Amarillo" | "Verde" | "Azul";
export type Feeling = "Inquieto" | "Triste" | "Agobiado";
export type Sex = "Femenino" | "Masculino" | "Otro";

export type BPReading = {
  id: string;
  dateISO: string;
  sys: number;
  dia: number;
  hr: number;
  note?: string;
};

export type Medication = {
  id: string;
  name: string;
  dose: string;
  schedule: string;
  active: boolean;
};

export type LabResult = {
  id: string;
  name: string;
  value: string;
  unit: string;
  flag?: "normal" | "alta" | "baja";
  note?: string;
};

export type TriageState = {
  step1?: {
    age: number;
    sex: Sex;
    antecedentes: string[];
  };
  step2?: {
    symptom: string; // main symptom
  };
  step3?: {
    zones: string[]; // where hurts
    painType?: string;
    fcRange?: "< 45" | "45–100" | "101–130" | "> 130" | "No sé";
    sysRange?: "< 90" | "90–140" | "141–180" | "> 180" | "No sé";
  };
  result?: {
    color: TriageColor;
    confidence: number; // 0-100
  };
};

export type DemoState = {
  alias: string;
  triage?: TriageState;

  emotional?: {
    feeling?: Feeling;
    answers: Record<string, number>;
    note?: string;
    score?: number;
    level?: "Bajo" | "Moderado" | "Alto";
  };

  exams?: {
    labs: LabResult[];
    summary?: string;
  };

  bp: { readings: BPReading[] };
  meds: { list: Medication[] };
  vitals?: { weightKg?: number; glucoseMgDl?: number; tempC?: number; spo2?: number };

  queue: "none" | "waiting" | "connected";
};

const KEY = "vita_state_demo_v3_1";

export function cryptoId() {
  if (typeof crypto !== "undefined" && "randomUUID" in crypto) return crypto.randomUUID();
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

export function seedState(): DemoState {
  const now = new Date();
  const iso = (d: Date) => d.toISOString();
  const mk = (daysAgo: number, sys: number, dia: number, hr: number): BPReading => {
    const d = new Date(now.getTime() - daysAgo * 24 * 60 * 60 * 1000);
    return { id: cryptoId(), dateISO: iso(d), sys, dia, hr };
  };

  return {
    alias: "Invitado",
    triage: {
      step1: { age: 58, sex: "Masculino", antecedentes: ["Diabetes mellitus"] },
      step2: { symptom: "Dolor de cabeza" },
      step3: { zones: ["Cabeza"], painType: "Late con el pulso", fcRange: "45–100", sysRange: "90–140" },
      result: { color: "Azul", confidence: 40 },
    },
    bp: {
      readings: [
        mk(0, 128, 82, 76),
        mk(1, 135, 86, 80),
        mk(2, 122, 78, 74),
        mk(3, 140, 90, 82),
        mk(4, 130, 84, 78),
        mk(5, 125, 80, 75),
        mk(6, 132, 85, 77),
      ],
    },
    meds: {
      list: [
        { id: cryptoId(), name: "Losartán", dose: "50 mg", schedule: "08:00", active: true },
        { id: cryptoId(), name: "Metformina", dose: "850 mg", schedule: "08:00 y 20:00", active: true },
        { id: cryptoId(), name: "Omeprazol", dose: "20 mg", schedule: "07:00", active: false },
      ],
    },
    exams: {
      labs: [
        { id: cryptoId(), name: "Glucosa", value: "110", unit: "mg/dL", flag: "alta" },
        { id: cryptoId(), name: "Creatinina", value: "0.9", unit: "mg/dL", flag: "normal" },
        { id: cryptoId(), name: "Hemoglobina", value: "14.2", unit: "g/dL", flag: "normal" },
      ],
    },
    emotional: { answers: {} },
    queue: "none",
  };
}

export function loadState(): DemoState {
  if (typeof window === "undefined") return seedState();
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return seedState();
    return JSON.parse(raw);
  } catch {
    return seedState();
  }
}

export function saveState(state: DemoState) {
  if (typeof window === "undefined") return;
  localStorage.setItem(KEY, JSON.stringify(state));
}

export function resetState() {
  if (typeof window === "undefined") return;
  localStorage.removeItem(KEY);
}

export function manchesterAdvice(color: TriageColor) {
  switch (color) {
    case "Rojo":
      return "Emergencia: atención inmediata. Si es posible, acude a urgencias o llama a tu número local de emergencias.";
    case "Naranja":
      return "Muy urgente: busca atención en el menor tiempo posible. Si empeora, acude a urgencias.";
    case "Amarillo":
      return "Urgente: requiere valoración pronta. Vigila signos de alarma.";
    case "Verde":
      return "Baja prioridad: autocuidado y consulta programada si persiste.";
    case "Azul":
      return "Baja prioridad: autocuidado y cita programada.";
  }
}

/** Demo logic (no médico): aproxima color según síntoma principal + rangos de FC/PA sistólica */
export function computeTriageColor(symptom: string, fcRange?: string, sysRange?: string): TriageColor {
  const s = (symptom || "").toLowerCase();

  // Síntomas más graves primero
  if (s.includes("dolor en el pecho") || s.includes("falta de aire")) return "Naranja";

  // Hipotensión severa o crisis muy alta
  if (sysRange === "< 90") return "Naranja";
  if (sysRange === "> 180") return "Naranja";

  // FC extrema
  if (fcRange === "< 45" || fcRange === "> 130") return "Amarillo";

  if (s.includes("fiebre") || s.includes("escalofr")) return "Amarillo";
  if (s.includes("vómit") || s.includes("vomit")) return "Verde";
  if (s.includes("diarrea") || s.includes("ardor al orinar")) return "Verde";
  if (s.includes("dolor de cabeza")) return "Azul";

  return "Azul";
}

/** Confidence just reflects how many inputs were provided (demo) */
export function computeConfidence(state: TriageState) {
  const total = 6; // age, sex, antecedentes(any), symptom, fc, sys
  let filled = 0;
  if (state.step1?.age) filled++;
  if (state.step1?.sex) filled++;
  if ((state.step1?.antecedentes?.length ?? 0) > 0) filled++;
  if (state.step2?.symptom) filled++;
  if (state.step3?.fcRange) filled++;
  if (state.step3?.sysRange) filled++;
  return Math.max(20, Math.min(90, Math.round((filled / total) * 100)));
}

export function bpCategory(sys: number, dia: number) {
  if (sys >= 180 || dia >= 120) return { label: "Crisis hipertensiva", tone: "bad" as const };
  if (sys >= 140 || dia >= 90) return { label: "Hipertensión (Etapa 2)", tone: "bad" as const };
  if ((sys >= 130 && sys <= 139) || (dia >= 80 && dia <= 89)) return { label: "Hipertensión (Etapa 1)", tone: "warn" as const };
  if (sys >= 120 && sys <= 129 && dia < 80) return { label: "Elevada", tone: "warn" as const };
  return { label: "Normal", tone: "ok" as const };
}

export function avgBP(readings: { sys: number; dia: number }[]) {
  const n = readings.length || 1;
  const s = readings.reduce((a, r) => a + r.sys, 0);
  const d = readings.reduce((a, r) => a + r.dia, 0);
  return { sys: Math.round(s / n), dia: Math.round(d / n) };
}
