'use client';

import React, { createContext, useContext, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { Project } from '@/app/types';

interface ProjectContextType {
  projects: Project[];
  addProject: (name: string) => void;
  deleteProject: (id: string) => void;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

// CORRECCIÓN: 'export function' explícito para que providers.tsx lo encuentre
export function ProjectProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const params = useParams();
  const currentProjectId = params?.projectId as string;
  
  const [projects, setProjects] = useState<Project[]>([
    { id: 'suma-os', name: 'Suma OS' },
    { id: 'mvp-tms', name: 'MVP TMS Integration' }
  ]);

  const addProject = (name: string) => {
    const id = name.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
    if (projects.some(p => p.id === id)) {
        alert('Ya existe un proyecto con un ID similar.');
        return;
    }
    const newProject = { id, name };
    setProjects(prev => [...prev, newProject]);
    router.push(`/${id}/dashboard`);
  };

  const deleteProject = (id: string) => {
    if (projects.length <= 1) {
      alert("No puedes eliminar el último proyecto activo.");
      return;
    }
    const updatedProjects = projects.filter(p => p.id !== id);
    setProjects(updatedProjects);

    if (currentProjectId === id) {
      router.push(`/${updatedProjects[0].id}/dashboard`);
    }
  };

  return (
    <ProjectContext.Provider value={{ projects, addProject, deleteProject }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjects = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProjects must be used within ProjectProvider");
  return context;
};