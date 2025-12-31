'use client';

import React, { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { useProjects } from '@/app/context/ProjectContext'; // Contexto global de proyectos
import { StrategyProvider } from './strategy/context/StrategyProvider';
import { ExecutionProvider } from './execution/context/ExecutionProvider';
import { DiscoveryProvider } from './discovery/context/DiscoveryProvider';
import { Sidebar } from "@/components/shared/Sidebar";
import TechHealthBar from "@/components/shared/TechHealthBar";

export default function ProjectLayout({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const router = useRouter();
  const { projects } = useProjects();
  const [isValid, setIsValid] = useState(false);

  const projectId = params?.projectId as string;

  useEffect(() => {
    // Verificamos si el ID de la URL existe en la lista global de proyectos
    const projectExists = projects.find(p => p.id === projectId);

    if (!projectExists && projects.length > 0) {
      // Si no existe, redirigimos al primer proyecto disponible por seguridad
      router.replace(`/${projects[0].id}/dashboard`);
    } else {
      setIsValid(true);
    }
  }, [projectId, projects, router]);

  // Si la ruta no es válida aún, mostramos un estado de carga limpio
  if (!isValid) {
    return <div className="h-screen w-full bg-[#020617]" />;
  }

  return (
    <StrategyProvider>
      <ExecutionProvider>
        <DiscoveryProvider>
            <div className="flex h-screen w-full overflow-hidden bg-[#020617]">
              <Sidebar />
              <main className="flex-1 flex flex-col min-w-0 h-full relative overflow-hidden">
                <header className="h-16 flex items-center justify-between px-8 border-b border-slate-800 bg-[#020617] sticky top-0 z-40">
                  <div className="flex items-center gap-2 text-sm">
                    <span className="text-slate-500">Workspace /</span>
                    <span className="font-medium text-white font-mono uppercase tracking-tighter">
                      {projects.find(p => p.id === projectId)?.name || 'Cargando...'}
                    </span>
                  </div>
                  <TechHealthBar score={92} />
                </header>
                <div className="flex-1 overflow-y-auto custom-scrollbar">
                  {children}
                </div>
              </main>
            </div>
        </DiscoveryProvider>
      </ExecutionProvider>
    </StrategyProvider>
  );
}