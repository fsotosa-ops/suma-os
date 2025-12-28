import { Sidebar } from "@/components/shared/Sidebar";
import { MobileSidebar } from "@/components/shared/MobileSidebar"; // <--- Importar
import TechHealthBar from "@/components/shared/TechHealthBar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    // Estructura general
    <div className="flex h-screen overflow-hidden bg-[#020617] text-slate-200 antialiased">
      
      {/* 1. Sidebar Desktop (Se ocultará solo gracias al cambio del Paso 1) */}
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        
        {/* Header Ejecutivo */}
        {/* Agregamos gap-4 para separar el botón móvil del texto */}
        <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-slate-800 bg-[#020617]/50 backdrop-blur-md sticky top-0 z-50">
          
          <div className="flex items-center gap-3 md:gap-2">
            {/* 2. Aquí insertamos el Botón Móvil (Solo visible en móvil) */}
            <MobileSidebar />

            <div className="flex items-center gap-2 text-sm">
              <span className="text-slate-500 hidden sm:inline">Project /</span> {/* Ocultar 'Project /' en pantallas muy chicas */}
              <span className="font-medium text-white truncate max-w-[150px] sm:max-w-none">MVP TMS Integration</span>
            </div>
          </div>

          {/* Ocultamos el TechHealthBar en móviles muy pequeños si molesta, o lo dejamos */}
          <div className="hidden sm:block">
             <TechHealthBar score={92} />
          </div>
        </header>

        {/* Contenedor de Contenido */}
        {/* 3. Ajuste Responsive: p-4 en móvil, p-8 en escritorio */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}