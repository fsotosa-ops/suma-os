'use client';

import React, { createContext, useContext, useState } from 'react';
// Importamos los tipos centralizados
import { Objective, RevOpsLever, Experiment } from '@/app/types';

interface StrategyContextType {
  // Estados
  objectives: Objective[];
  levers: RevOpsLever[];
  experiments: Experiment[];
  
  // Acciones de Objetivos
  addObjective: (obj: Objective) => void;
  updateObjective: (id: string, updates: Partial<Objective>) => void;
  
  // Acciones de Palancas
  addLever: (lever: RevOpsLever) => void;
  
  // Acciones de Experimentos
  addExperiment: (exp: Experiment) => void;
  updateExperiment: (id: string, updates: Partial<Experiment>) => void; // <--- Función Nueva
  deleteExperiment: (id: string) => void; // <--- Función Nueva
}

const StrategyContext = createContext<StrategyContextType | undefined>(undefined);

export function StrategyProvider({ children }: { children: React.ReactNode }) {
  
  // 1. Mock Data Inicial: Objetivos
  const [objectives, setObjectives] = useState<Objective[]>([
    { 
      id: '1', title: 'Escalar Revenue Q1', target: '$1.2M ARR', progress: 68, status: 'On Track',
      hypothesis: 'Optimizar el checkout reducirá el CAC en un 15%',
      connectedLeverIds: ['l1'],
      impact: 85, effort: 30, urgency: 40, importance: 90, riskProbability: 20, riskSeverity: 40
    }
  ]);

  // 2. Mock Data Inicial: Palancas
  const [levers, setLevers] = useState<RevOpsLever[]>([
    { 
      id: 'l1', name: 'Checkout UX', type: 'GROWTH', kpiName: 'Abandonment Rate', 
      kpiCurrent: 45, kpiTarget: 30, kpiUnit: '%', history: [] 
    },
    { 
      id: 'l2', name: 'Core Web Vitals', type: 'EFFICIENCY', kpiName: 'LCP', 
      kpiCurrent: 1.2, kpiTarget: 0.8, kpiUnit: 's', history: [] 
    }
  ]);

  // 3. Mock Data Inicial: Experimentos
  const [experiments, setExperiments] = useState<Experiment[]>([]);

  // --- ACTIONS ---

  // Objectives
  const addObjective = (obj: Objective) => setObjectives(prev => [...prev, obj]);
  
  const updateObjective = (id: string, updates: Partial<Objective>) => 
    setObjectives(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
    
  // Levers
  const addLever = (l: RevOpsLever) => setLevers(prev => [...prev, l]);

  // Experiments
  const addExperiment = (e: Experiment) => setExperiments(prev => [...prev, e]);

  // NUEVO: Actualizar Experimento (para cambiar status, resultados, etc.)
  const updateExperiment = (id: string, updates: Partial<Experiment>) => 
    setExperiments(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));

  // NUEVO: Eliminar Experimento
  const deleteExperiment = (id: string) => 
    setExperiments(prev => prev.filter(e => e.id !== id));

  return (
    <StrategyContext.Provider value={{ 
        objectives, 
        levers, 
        experiments, 
        addObjective, 
        updateObjective, 
        addLever, 
        addExperiment,
        updateExperiment, // <--- Exportado al contexto
        deleteExperiment  // <--- Exportado al contexto
    }}>
      {children}
    </StrategyContext.Provider>
  );
}

export const useStrategy = () => {
  const context = useContext(StrategyContext);
  if (!context) throw new Error("useStrategy must be used within StrategyProvider");
  return context;
};