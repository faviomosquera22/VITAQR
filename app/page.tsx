import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";

export default function Page() {
  return (
    <PhoneFrame>
      <div className="mt-2 ios-card-soft p-5">
        <p className="text-sm text-slate-500">Bienvenido a Vita</p>
        <p className="mt-1 text-2xl font-semibold">Demo web para jurado</p>
        <p className="mt-2 text-sm text-slate-600 leading-relaxed">
          Evaluación, seguimiento y resumen. Un mockup funcional para probar el flujo en tiempo real.
        </p>
      </div>

      <div className="mt-5 ios-card p-5">
        <p className="text-lg font-semibold">Elige tu rol</p>
        <p className="mt-1 text-sm text-slate-500">
          Selecciona cómo quieres probar el demo.
        </p>

        <div className="mt-4 grid gap-3">
          <Link href="/demo" className="ios-btn-primary w-full text-center">
            Paciente
          </Link>

          <Link href="/pro" className="ios-btn-secondary w-full text-center">
            Profesional
          </Link>
        </div>

        <p className="mt-4 text-xs text-slate-400 leading-relaxed">
          Vita orienta y organiza. No reemplaza una valoración médica presencial.
        </p>
      </div>
    </PhoneFrame>
  );
}
