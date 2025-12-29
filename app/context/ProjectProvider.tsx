'use client';

import React, { createContext, useContext, useState } from 'react';
import { Ticket, RevOpsLever, Sprint, Experiment } from '../execution/types';

// --- TIPO DE OBJETIVO EXTENDIDO (STRATEGIC OS) ---
export type Objective = {
  id: string;
  title: string;
  target: string;
  progress: number;
  status: 'On Track' | 'At Risk' | 'Off Track';
  
  // Lógica de Negocio
  hypothesis?: string; 
  connectedLeverIds?: string[];

  // 1. Matriz Priorización (ROI)
  impact: number; // 0-100 (Eje Y)
  effort: number; // 0-100 (Eje X)

  // 2. Matriz Eisenhower (Gestión)
  urgency: number;    // 0-100 (Eje X)
  importance: number; // 0-100 (Eje Y)

  // 3. Matriz Riesgos (Mitigación)
  riskProbability: number; // 0-100 (Eje X)
  riskSeverity: number;    // 0-100 (Eje Y)
};

export type Metric = { name: string; value: number; unit: string; status: 'ok' | 'warning' | 'error' };

interface ProjectContextType {
  // Datos
  tickets: Ticket[];
  levers: RevOpsLever[];
  objectives: Objective[];
  sprints: Sprint[];
  metrics: Metric[];
  experiments: Experiment[];
  
  // Acciones
  addObjective: (obj: Objective) => void;
  updateObjective: (id: string, updates: Partial<Objective>) => void;
  
  addLever: (lever: RevOpsLever) => void;
  updateLever: (id: string, data: Partial<RevOpsLever>) => void;
  
  addTicket: (ticket: Ticket) => void;
  updateTicket: (id: string, data: Partial<Ticket>) => void;
  
  addExperiment: (exp: Experiment) => void;
  
  currentSprint: Sprint | null;
}

const ProjectContext = createContext<ProjectContextType | undefined>(undefined);

export function ProjectProvider({ children }: { children: React.ReactNode }) {
  
  // 1. Datos Mock Estratégicos Inteligentes
  const [objectives, setObjectives] = useState<Objective[]>([
    { 
      id: 'okr-1', 
      title: 'Escalar Revenue Q1', 
      target: '$1.2M ARR', 
      progress: 68, 
      status: 'On Track',
      hypothesis: 'Optimizar el funnel reducirá el CAC y aumentará el LTV.', 
      connectedLeverIds: ['lev-1'],
      // Priorización: Quick Win (Alto Impacto, Bajo Esfuerzo)
      impact: 85, effort: 30,
      // Eisenhower: Importante, No Urgente (Planificar)
      urgency: 40, importance: 90,
      // Riesgo: Bajo
      riskProbability: 20, riskSeverity: 40
    },
    { 
      id: 'okr-2', 
      title: 'Migración Legacy a Cloud', 
      target: '100% Cloud', 
      progress: 35, 
      status: 'At Risk',
      hypothesis: 'Reducir deuda técnica mejorará el uptime.', 
      connectedLeverIds: [],
      // Priorización: Major Project (Alto Impacto, Alto Esfuerzo)
      impact: 75, effort: 85,
      // Eisenhower: Urgente e Importante (Hacer YA)
      urgency: 90, importance: 95,
      // Riesgo: Crítico
      riskProbability: 60, riskSeverity: 90
    }
  ]);

  const [levers, setLevers] = useState<RevOpsLever[]>([
      { id: 'lev-1', name: 'Checkout UX', type: 'GROWTH', kpiName: 'Cart Abandonment', kpiCurrent: 45, kpiTarget: 30, kpiUnit: '%', history: [] },
      { id: 'lev-2', name: 'Core Web Vitals', type: 'EFFICIENCY', kpiName: 'LCP Score', kpiCurrent: 1.2, kpiTarget: 0.8, kpiUnit: 's', history: [] }
  ]);
  
  const [experiments, setExperiments] = useState<Experiment[]>([]);
  
  const [sprints] = useState<Sprint[]>([
    { id: 's1', title: 'Sprint 34', goal: 'Stability', startDate: '2025-01-01', endDate: '2025-01-15', isActive: true }
  ]);
  
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [metrics] = useState<Metric[]>([]);

  // Actions
  const addObjective = (obj: Objective) => setObjectives(p => [...p, obj]);
  const updateObjective = (id: string, updates: Partial<Objective>) => 
    setObjectives(p => p.map(o => o.id === id ? { ...o, ...updates } : o));

  const addLever = (l: RevOpsLever) => setLevers(p => [...p, l]);
  const updateLever = (id: string, d: Partial<RevOpsLever>) => 
    setLevers(p => p.map(l => l.id === id ? { ...l, ...d } : l));

  const addTicket = (t: Ticket) => setTickets(p => [...p, t]);
  const updateTicket = (id: string, d: Partial<Ticket>) => 
    setTickets(p => p.map(t => t.id === id ? { ...t, ...d } : t));

  const addExperiment = (e: Experiment) => setExperiments(p => [...p, e]);

  return (
    <ProjectContext.Provider value={{ 
      tickets, levers, objectives, sprints, metrics, experiments,
      addObjective, updateObjective, 
      addLever, updateLever, 
      addTicket, updateTicket, 
      addExperiment,
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