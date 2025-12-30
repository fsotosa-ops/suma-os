'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export interface Project {
  id: string;
  name: string;
}

interface ProjectContextType {
  projects: Project[];
  addProject: (name: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  
  // 1. Estado inicial con proyectos por defecto
  const [projects, setProjects] = useState<Project[]>([
    { id: 'suma-os', name: 'Suma OS' },
    { id: 'mvp-tms', name: 'MVP TMS Integration' }
  ]);

  // 2. Función para crear proyecto
  const addProject = (name: string) => {
    // Generar un ID simple (slug) basado en el nombre (ej: "Mi Proyecto" -> "mi-proyecto")
    const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    
    // Evitar duplicados simples
    if (projects.some(p => p.id === id)) {
        alert('Ya existe un proyecto con un ID similar.');
        return;
    }

    const newProject = { id, name };
    
    setProjects(prev => [...prev, newProject]);
    
    // Redirige inmediatamente al dashboard del nuevo proyecto
    router.push(`/${id}/dashboard`);
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProjects must be used within ProjectProvider");
  return context;
};