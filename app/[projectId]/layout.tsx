// app/[projectId]/layout.tsx
'use client';

import React from 'react';
import { Suspense } from 'react';

// 1. IMPORTAR COMPONENTES DE UI
import { Sidebar } from "@/components/shared/Sidebar";
import { MobileSidebar } from "@/components/shared/MobileSidebar";
import TechHealthBar from "@/components/shared/TechHealthBar";

// 2. IMPORTAR LOS PROVIDERS (Usando rutas relativas porque están en carpetas hermanas)
import { StrategyProvider } from './strategy/context/StrategyProvider';
import { ExecutionProvider } from './execution/context/ExecutionProvider';
import { DiscoveryProvider } from './discovery/context/DiscoveryProvider';

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  return (
    // 3. ENVOLVER TODO EN LOS PROVIDERS
    <StrategyProvider>
      <ExecutionProvider>
        <DiscoveryProvider>
            
            <div className="flex h-screen w-full overflow-hidden bg-[#020617]">
              
              {/* SIDEBAR DENTRO DEL CONTEXTO */}
              <Suspense fallback={<div className="w-[280px] bg-[#08090a] border-r border-white/5" />}>
                <Sidebar />
              </Suspense>
              
              <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden bg-[#020617]">
                
                {/* HEADER */}
                <header className="h-16 flex items-center justify-between px-4 md:px-8 border-b border-slate-800 bg-[#020617] sticky top-0 z-40 shrink-0">
                  <div className="flex items-center gap-3">
                    <MobileSidebar />
                    <div className="flex items-center gap-2 text-sm">
                      <span className="text-slate-500 hidden sm:inline">Workspace /</span>
                      <span className="font-medium text-white truncate max-w-[150px] sm:max-w-none font-mono">
                        Active Project
                      </span>
                    </div>
                  </div>
                  
                  <div className="hidden sm:block">
                    <TechHealthBar score={92} />
                  </div>
                </header>

                {/* CONTENIDO DE LA PÁGINA (Dashboard, Strategy, etc.) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar bg-[#020617]">
                  {children}
                </div>

              </main>
            </div>

        </DiscoveryProvider>
      </ExecutionProvider>
    </StrategyProvider>
  );
}