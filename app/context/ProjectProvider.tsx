'use client';

import React, { createContext, useContext, useState } from 'react';
import { Ticket, RevOpsLever, Sprint, Experiment } from '../execution/types';

export type Objective = {
  id: string;
  title: string;
  target: string;
  progress: number;
  status: 'On Track' | 'At Risk' | 'Off Track';
  hypothesis?: string; 
  connectedLeverIds?: string[]; // IDs de palancas conectadas
};

export type Metric = { name: string; value: number; unit: string; status: 'ok' | 'warning' | 'error' };

interface ProjectContextType {
  tickets: Ticket[];
  levers: RevOpsLever[];
  objectives: Objective[];
  sprints: Sprint[];
  metrics: Metric[];
  experiments: Experiment[]; // Nueva data
  
  // Actions
  addObjective: (obj: Objective) => void;
  updateObjective: (id: string, updates: Partial<Objective>) => void;
  addLever: (lever: RevOpsLever) => void;
  updateLever: (id: string, data: Partial<RevOpsLever>) => void;
  addTicket: (ticket: Ticket) => void;
  updateTicket: (id: string, data: Partial<Ticket>) => void;
  addExperiment: (exp: Experiment) => void; // Nueva acción
  
  currentSprint: Sprint | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  
  const [objectives, setObjectives] = useState<Objective[]>([
    { 
      id: 'okr-1', title: 'Escalar Revenue Q1', target: '$1.2M ARR', progress: 68, status: 'On Track',
      hypothesis: 'Optimizar el funnel reducirá el CAC.', connectedLeverIds: ['lev-1'] 
    }
  ]);

  const [levers, setLevers] = useState<RevOpsLever[]>([
    { 
      id: 'lev-1', name: 'Checkout UX', type: 'GROWTH', kpiName: 'Cart Abandonment', 
      kpiCurrent: 45, kpiTarget: 30, kpiUnit: '%', 
      history: [{ date: '2024-01', value: 60 }, { date: '2024-02', value: 45 }] 
    },
    { 
      id: 'lev-2', name: 'Core Web Vitals', type: 'EFFICIENCY', kpiName: 'LCP Score', 
      kpiCurrent: 1.2, kpiTarget: 0.8, kpiUnit: 's', 
      history: [{ date: '2024-01', value: 2.5 }, { date: '2024-02', value: 1.2 }] 
    }
  ]);

  // --- DATOS DE EXPERIMENTOS ---
  const [experiments, setExperiments] = useState<Experiment[]>([
    { id: 'exp-1', name: 'One-Page Checkout', leverId: 'lev-1', status: 'RUNNING', startDate: '2024-03-01' },
    { id: 'exp-2', name: 'Guest Checkout', leverId: 'lev-1', status: 'CONCLUDED', result: 'WIN', impact: 5.2, startDate: '2024-02-01' }
  ]);

  const [sprints] = useState<Sprint[]>([{ id: 's1', title: 'Sprint 34', goal: 'Stability', startDate: '2024-01', endDate: '2024-02', isActive: true }]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [metrics] = useState<Metric[]>([]);

  // Actions
  const addObjective = (obj: Objective) => setObjectives(p => [...p, obj]);
  const updateObjective = (id: string, updates: Partial<Objective>) => setObjectives(p => p.map(o => o.id === id ? { ...o, ...updates } : o));
  const addLever = (l: RevOpsLever) => setLevers(p => [...p, l]);
  const updateLever = (id: string, d: Partial<RevOpsLever>) => setLevers(p => p.map(l => l.id === id ? { ...l, ...d } : l));
  const addTicket = (t: Ticket) => setTickets(p => [...p, t]);
  const updateTicket = (id: string, d: Partial<Ticket>) => setTickets(p => p.map(t => t.id === id ? { ...t, ...d } : t));
  const addExperiment = (e: Experiment) => setExperiments(p => [...p, e]);

  return (
    <ProjectContext.Provider value={{ 
      tickets, levers, objectives, sprints, metrics, experiments,
      addObjective, updateObjective, addLever, updateLever, addTicket, updateTicket, addExperiment,
      currentSprint: sprints[0] 
    }}>
      {children}
    </ProjectContext.Provider>
  );
}

export const useProjectData = () => {
  const context = useContext(ProjectContext);
  if (!context) throw new Error("useProjectData error");
  return context;
};