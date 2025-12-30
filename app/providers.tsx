'use client';

// Asegúrate de tener creado el archivo app/context/ProjectContext.tsx (de la respuesta 13)
import { ProjectProvider } from '@/app/context/ProjectContext';

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <ProjectProvider>
       {children}
    </ProjectProvider>
  );
}