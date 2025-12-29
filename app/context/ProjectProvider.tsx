'use client';

import React, { createContext, useContext, useState } from 'react';
import { Ticket, RevOpsLever, Sprint } from '../execution/types';

// --- TIPOS ---
export type Objective = {
  id: string;
  title: string;
  target: string;
  progress: number;
  status: 'On Track' | 'At Risk' | 'Off Track';
  
  // Capa estratégica
  hypothesis?: string; 
  connectedLeverIds?: string[]; 
};

export type Metric = { name: string; value: number; unit: string; status: 'ok' | 'warning' | 'error' };

interface ProjectContextType {
  // Datos
  tickets: Ticket[];
  levers: RevOpsLever[];
  objectives: Objective[];
  sprints: Sprint[];
  metrics: Metric[];
  
  // Acciones Estratégicas
  addObjective: (obj: Objective) => void;
  updateObjective: (id: string, updates: Partial<Objective>) => void;
  
  // Acciones RevOps (Palancas)
  addLever: (lever: RevOpsLever) => void;
  updateLever: (id: string, data: Partial<RevOpsLever>) => void;
  
  // Acciones Técnicas (Tickets)
  addTicket: (ticket: Ticket) => void;
  updateTicket: (id: string, data: Partial<Ticket>) => void; // <--- ESTA ES LA QUE FALTABA
  
  // Contexto
  currentSprint: Sprint | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  
  // 1. Datos Mock Estratégicos
  const [objectives, setObjectives] = useState<Objective[]>([
    { 
      id: 'okr-1', 
      title: 'Escalar Revenue Q1', 
      target: '$1.2M ARR', 
      progress: 68, 
      status: 'On Track',
      hypothesis: 'Al reducir la fricción en el checkout y acelerar la carga, aumentaremos la conversión un 15%.',
      connectedLeverIds: ['lev-1', 'lev-2'] 
    }
  ]);

  // 2. Datos Mock Palancas (Con historial para gráficas)
  const [levers, setLevers] = useState<RevOpsLever[]>([
    { 
      id: 'lev-1', name: 'Checkout UX', type: 'GROWTH', 
      kpiName: 'Cart Abandonment', kpiCurrent: 45, kpiTarget: 30, kpiUnit: '%', 
      history: [{ date: '2024-01', value: 60 }, { date: '2024-02', value: 45 }] 
    },
    { 
      id: 'lev-2', name: 'Core Web Vitals', type: 'EFFICIENCY', 
      kpiName: 'LCP Score', kpiCurrent: 1.2, kpiTarget: 0.8, kpiUnit: 's', 
      history: [{ date: '2024-01', value: 2.5 }, { date: '2024-02', value: 1.2 }] 
    }
  ]);

  // 3. Datos Mock Ejecución
  const [sprints] = useState<Sprint[]>([
    { id: 's1', title: 'Sprint 34', goal: 'Fixes & Stability', startDate: '2024-01-01', endDate: '2024-01-15', isActive: true }
  ]);

  const [tickets, setTickets] = useState<Ticket[]>([
    { id: 't-1', title: 'Refactor Checkout API', type: 'STORY', status: 'DONE', points: 8, leverId: 'lev-1', sprintId: 's1' },
    { id: 't-2', title: 'Implementar 1-Click Buy', type: 'FEATURE', status: 'IN_PROGRESS', points: 5, leverId: 'lev-1', sprintId: 's1' },
    { id: 't-3', title: 'Cache Layer Redis', type: 'TASK', status: 'DONE', points: 3, leverId: 'lev-2', sprintId: 's1' }
  ]);

  const [metrics] = useState<Metric[]>([
    { name: 'API Uptime', value: 99.9, unit: '%', status: 'ok' },
    { name: 'Error Rate', value: 1.2, unit: '%', status: 'warning' },
  ]);

  // --- ACTIONS ---

  // Estrategia
  const addObjective = (obj: Objective) => setObjectives(prev => [...prev, obj]);
  const updateObjective = (id: string, updates: Partial<Objective>) => {
    setObjectives(prev => prev.map(obj => obj.id === id ? { ...obj, ...updates } : obj));
  };

  // Palancas
  const addLever = (l: RevOpsLever) => setLevers(p => [...p, l]);
  const updateLever = (id: string, d: Partial<RevOpsLever>) => {
    setLevers(p => p.map(l => l.id === id ? { ...l, ...d } : l));
  };

  // Tickets (Técnico)
  const addTicket = (t: Ticket) => setTickets(p => [...p, t]);
  const updateTicket = (id: string, d: Partial<Ticket>) => {
    setTickets(p => p.map(t => t.id === id ? { ...t, ...d } : t));
  };

  return (
    <ProjectContext.Provider value={{ 
      tickets, levers, objectives, sprints, metrics, 
      addObjective, updateObjective,
      addLever, updateLever,
      addTicket, updateTicket, 
      currentSprint: sprints[0] 
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjectData = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProjectData must be used within ProjectProvider");
  return context;
};