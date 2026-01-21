import type { Feeling } from "./state";

export const questionsByFeeling: Record<Feeling, { id: string; q: string }[]> = {
  Inquieto: [
    { id: "i1", q: "¿Te ha costado controlar la preocupación hoy?" },
    { id: "i2", q: "¿Has sentido tensión física (pecho, mandíbula, hombros)?" },
    { id: "i3", q: "¿Te has distraído por pensamientos repetitivos?" },
  ],
  Triste: [
    { id: "t1", q: "¿Has perdido interés por actividades que antes te gustaban?" },
    { id: "t2", q: "¿Tu energía se sintió baja la mayor parte del día?" },
    { id: "t3", q: "¿Te costó empezar tareas simples?" },
  ],
  Agobiado: [
    { id: "a1", q: "¿Sientes demasiadas cosas encima?" },
    { id: "a2", q: "¿Te irritaste con facilidad?" },
    { id: "a3", q: "¿Te costó desconectarte o descansar mentalmente?" },
  ],
};

export function emotionalLevel(score: number) {
  if (score <= 2) return "Bajo" as const;
  if (score <= 5) return "Moderado" as const;
  return "Alto" as const;
}

export function emotionalText(level: "Bajo" | "Moderado" | "Alto") {
  if (level === "Bajo")
    return "Se ve estable. Mantén lo básico: sueño, comida real, movimiento suave. Si quieres, escribe qué te ayudó hoy.";
  if (level === "Moderado")
    return "Hay carga. Pausa breve + una tarea pequeña. Si esto se repite varios días, hablar con un profesional puede ayudarte a ordenar el ruido.";
  return "Esto pesa. Busca apoyo hoy (alguien de confianza o un profesional). No estás solo: pedir ayuda no te hace débil, te hace humano.";
}
