import { Sidebar } from "@/components/shared/Sidebar";
import { MobileSidebar } from "@/components/shared/MobileSidebar"; // <-- IMPORTANTE
import TechHealthBar from "@/components/shared/TechHealthBar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#020617] text-slate-200 antialiased">
      
      {/* Sidebar de Escritorio (se oculta sola en móvil gracias al Paso 1) */}
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-slate-800 bg-[#020617]/50 backdrop-blur-md sticky top-0 z-50">
          
          <div className="flex items-center gap-3">
            {/* AGREGAR ESTO: El menú móvil */}
            <MobileSidebar />

            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-500 hidden sm:inline">Project /</span>
              <span className="font-medium text-white truncate">MVP TMS Integration</span>
            </div>
          </div>

          <div className="hidden sm:block">
            <TechHealthBar score={92} />
          </div>
        </header>

        {/* Contenido */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}