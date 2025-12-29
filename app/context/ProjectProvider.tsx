'use client';

import React, { createContext, useContext, useState } from 'react';

// --- TIPOS DE DATOS ---
export type Ticket = { id: string; title: string; status: 'TODO' | 'IN_PROGRESS' | 'DONE' | 'BLOCKED'; type: 'BUG' | 'FEATURE' };
export type Metric = { name: string; value: number; unit: string; status: 'ok' | 'warning' | 'error' };

// Nuevo Tipo: OKR Estratégico
export type Objective = {
  id: string;
  title: string;          // Ej: "Reducir Tiempos Operativos"
  target: string;         // Ej: "Menos de 30min por carga"
  progress: number;       // 0-100%
  linkedTech: string;     // Ej: "Integración TMS" (El proyecto técnico que lo hace posible)
  status: 'On Track' | 'At Risk' | 'Off Track';
};

interface ProjectContextType {
  tickets: Ticket[];
  metrics: Metric[];
  objectives: Objective[]; // <--- Agregamos esto
  addObjective: (obj: Omit<Objective, 'id'>) => void; // <--- Función para crear
  sprintName: string;
  deadline: string;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  
  // Datos Técnicos (Mock)
  const [tickets] = useState<Ticket[]>([
    { id: '1', title: 'Integración API TMS', status: 'IN_PROGRESS', type: 'FEATURE' },
    { id: '2', title: 'Fix Login Timeout', status: 'BLOCKED', type: 'BUG' }, 
    { id: '3', title: 'Diseño Base de Datos', status: 'DONE', type: 'FEATURE' },
  ]);

  const [metrics] = useState<Metric[]>([
    { name: 'API Uptime', value: 99.9, unit: '%', status: 'ok' },
    { name: 'Error Rate', value: 2.5, unit: '%', status: 'warning' },
  ]);

  // Datos de Negocio (OKRs) - Estado inicial
  const [objectives, setObjectives] = useState<Objective[]>([
    { 
      id: '1', 
      title: 'Reducir tiempos de gestión operativa', 
      target: '-50% tiempo manual',
      progress: 60, 
      linkedTech: 'Módulo de Automatización',
      status: 'On Track' 
    },
    { 
      id: '2', 
      title: 'Infraestructura Escalable', 
      target: 'Soportar 10k usuarios',
      progress: 30, 
      linkedTech: 'Migración Cloud',
      status: 'At Risk' // Ejemplo inicial
    }
  ]);

  // Función para crear un nuevo OKR desde la UI
  const addObjective = (newObj: Omit<Objective, 'id'>) => {
    const id = Math.random().toString(36).substr(2, 9);
    setObjectives([...objectives, { ...newObj, id }]);
  };

  return (
    <ProjectContext.Provider value={{ tickets, metrics, objectives, addObjective, sprintName: 'Sprint 1', deadline: '2025-01-15' }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjectData = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProjectData must be used within ProjectProvider");
  return context;
};