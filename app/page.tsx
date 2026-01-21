import Link from "next/link";
import { PhoneFrame } from "@/components/PhoneFrame";
import { NavBar } from "@/components/NavBar";

export default function Page() {
  return (
    <PhoneFrame>
      <NavBar
        title="Vita"
        subtitle="Demo web funcional: evaluación, seguimiento y resumen."
      />

      <div className="card p-5 animate-pop">
        <p className="text-sm text-slate-700">
          Esto es un mockup funcional para jurado. No diagnostica: organiza, orienta y da seguimiento.
        </p>

        <div className="mt-4 grid gap-3">
          <Link href="/demo" className="btn-primary text-center">
            Entrar como Paciente
          </Link>
          <Link href="/pro" className="btn-secondary text-center">
            Entrar como Profesional
          </Link>
        </div>
      </div>

      <div className="mt-4 card p-5">
        <p className="text-xs text-slate-500">
          Ruta “wow”: Triage → Resultado → Presión arterial → Medicación → Exámenes.
        </p>
      </div>
    </PhoneFrame>
  );
}
