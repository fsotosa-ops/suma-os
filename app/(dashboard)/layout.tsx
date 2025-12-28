import { Sidebar } from "@/components/shared/Sidebar";
import TechHealthBar from "@/components/shared/TechHealthBar";
import React from "react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-[#020617] text-slate-200 antialiased">
      {/* Sidebar Fija */}
      <Sidebar />
      
      <main className="flex-1 flex flex-col min-w-0">
        {/* Header Ejecutivo */}
        <header className="h-16 flex items-center justify-between px-8 border-b border-slate-800 bg-[#020617]/50 backdrop-blur-md sticky top-0 z-50">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-slate-500">Project /</span>
            <span className="font-medium text-white">MVP TMS Integration</span>
          </div>
          <TechHealthBar score={92} />
        </header>

        {/* Contenedor de Contenido */}
        <div className="flex-1 overflow-y-auto p-8">
          <div className="max-w-6xl mx-auto">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}