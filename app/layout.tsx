import "./globals.css";

export const metadata = {
  title: "Vita — Demo Web",
  description: "Mockup funcional de Vita (salud, evaluación, seguimiento).",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body>{children}</body>
    </html>
  );
}
