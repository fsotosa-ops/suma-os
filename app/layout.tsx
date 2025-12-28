import type { Metadata } from "next";
import { Inter } from "next/font/google"; // Usamos la fuente Inter para ese look profesional
import "./globals.css";
import { Sidebar } from "@/components/shared/Sidebar";
import TechHealthBar from "@/components/shared/TechHealthBar";

// Configuración de la fuente
const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Sumadots OS | Portal Cliente",
  description: "Plataforma de gestión tecnológica CTO as a Service",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" className="dark">
      <body className={`${inter.className} bg-[#020617] text-slate-200 antialiased`}>
        
        {/* Estructura del Dashboard (Sidebar + Main) */}
        <div className="flex h-screen overflow-hidden">
          
          {/* 1. Sidebar Fija a la izquierda */}
          <Sidebar />
          
          {/* 2. Área Principal a la derecha */}
          <main className="flex-1 flex flex-col min-w-0">
            
            {/* Header con el Health Bar */}
            <header className="h-16 flex items-center justify-between px-8 border-b border-slate-800 bg-[#020617]/50 backdrop-blur-md sticky top-0 z-50">
              <div className="flex items-center gap-2 text-sm">
                <span className="text-slate-500">Project /</span>
                [cite_start]{/* Nombre del proyecto según contrato Webcarga [cite: 69] */}
                <span className="font-medium text-white">MVP TMS Integration</span>
              </div>
              {/* Indicador de Salud Técnica */}
              <TechHealthBar score={92} />
            </header>

            {/* Contenido cambiante (Page.tsx) */}
            <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
              <div className="max-w-6xl mx-auto space-y-8">
                {children}
              </div>
            </div>

          </main>
        </div>
      </body>
    </html>
  );
}