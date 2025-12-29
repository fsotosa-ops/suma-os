'use client';

import React, { createContext, useContext, useState } from 'react';
import { Ticket, RevOpsLever, Sprint } from '../execution/types';

export type Objective = {
  id: string;
  title: string;
  target: string;
  progress: number;
  status: 'On Track' | 'At Risk' | 'Off Track';
};

export type Metric = { name: string; value: number; unit: string; status: 'ok' | 'warning' | 'error' };

interface ProjectContextType {
  tickets: Ticket[];
  levers: RevOpsLever[];
  objectives: Objective[];
  sprints: Sprint[];
  metrics: Metric[];
  addTicket: (ticket: Ticket) => void;
  updateTicket: (id: string, data: Partial<Ticket>) => void;
  addLever: (lever: RevOpsLever) => void;
  updateLever: (id: string, data: Partial<RevOpsLever>) => void;
  addObjective: (obj: Objective) => void;
  currentSprint: Sprint | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  
  const [objectives, setObjectives] = useState<Objective[]>([
    { id: 'okr-1', title: 'Aumentar Revenue Q1', target: '$1M ARR', progress: 65, status: 'On Track' },
  ]);

  // --- PALANCAS CON HISTORIA ---
  const [levers, setLevers] = useState<RevOpsLever[]>([
    { 
      id: 'lev-1', 
      name: 'Optimización Checkout', 
      type: 'GROWTH', 
      kpiName: 'Conversión', 
      kpiUnit: '%',
      kpiCurrent: 3.2, 
      kpiTarget: 4.5, 
      linkedObjectiveId: 'okr-1',
      // Simulamos datos de los últimos 6 meses
      history: [
        { date: '2024-08-01', value: 2.1 },
        { date: '2024-09-01', value: 2.3 },
        { date: '2024-10-01', value: 2.2 }, // Caída (Tech debt?)
        { date: '2024-11-01', value: 2.5 }, // Empieza el deploy
        { date: '2024-12-01', value: 2.9 },
        { date: '2025-01-01', value: 3.2 }, // Estado actual
      ]
    },
    { 
        id: 'lev-2', 
        name: 'Velocidad de Carga', 
        type: 'EFFICIENCY', 
        kpiName: 'LCP (seg)', 
        kpiUnit: 's',
        kpiCurrent: 1.8, 
        kpiTarget: 1.2, 
        linkedObjectiveId: 'okr-1',
        history: [
          { date: '2024-10-01', value: 2.5 },
          { date: '2024-11-01', value: 2.1 },
          { date: '2024-12-01', value: 1.9 },
          { date: '2025-01-01', value: 1.8 },
        ]
      }
  ]);

  const [sprints, setSprints] = useState<Sprint[]>([
    { id: 'sp-1', title: 'Sprint 34', goal: 'Core Stability', startDate: '2025-01-01', endDate: '2025-01-15', isActive: true }
  ]);

  const [tickets, setTickets] = useState<Ticket[]>([
    { id: 't-1', title: 'Refactor Checkout API', type: 'STORY', status: 'DONE', points: 8, leverId: 'lev-1', sprintId: 'sp-1' },
    { id: 't-2', title: 'Implementar 1-Click Buy', type: 'FEATURE', status: 'IN_PROGRESS', points: 5, leverId: 'lev-1', sprintId: 'sp-1' },
    { id: 't-3', title: 'Cache Layer Redis', type: 'TASK', status: 'DONE', points: 3, leverId: 'lev-2', sprintId: 'sp-1' }
  ]);

  const [metrics] = useState<Metric[]>([]);

  // Actions (Simplificadas)
  const addTicket = (t: Ticket) => setTickets(p => [...p, t]);
  const updateTicket = (id: string, d: Partial<Ticket>) => setTickets(p => p.map(t => t.id === id ? { ...t, ...d } : t));
  const addLever = (l: RevOpsLever) => setLevers(p => [...p, l]);
  const updateLever = (id: string, d: Partial<RevOpsLever>) => setLevers(p => p.map(l => l.id === id ? { ...l, ...d } : l));
  const addObjective = (o: Objective) => setObjectives(p => [...p, o]);

  return (
    <ProjectContext.Provider value={{ tickets, levers, objectives, sprints, metrics, addTicket, updateTicket, addLever, updateLever, addObjective, currentSprint: sprints[0] }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjectData = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProjectData error");
  return context;
};