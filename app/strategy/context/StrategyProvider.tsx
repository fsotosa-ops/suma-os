// app/strategy/context/StrategyProvider.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';
import { Objective, RevOpsLever, Experiment } from '@/app/execution/types';

interface StrategyContextType {
  objectives: Objective[];
  levers: RevOpsLever[];
  experiments: Experiment[];
  addObjective: (obj: Objective) => void;
  updateObjective: (id: string, updates: Partial<Objective>) => void;
  addLever: (lever: RevOpsLever) => void;
  addExperiment: (exp: Experiment) => void;
}

const StrategyContext = createContext<StrategyContextType | undefined>(undefined);

export function StrategyProvider({ children }: { children: React.ReactNode }) {
  
  // Mock Data Inicial
  const [objectives, setObjectives] = useState<Objective[]>([
    { 
      id: '1', title: 'Escalar Revenue Q1', target: '$1.2M ARR', progress: 68, status: 'On Track',
      hypothesis: 'Optimizar el checkout reducirá el CAC en un 15%',
      connectedLeverIds: ['l1'],
      impact: 85, effort: 30, urgency: 40, importance: 90, riskProbability: 20, riskSeverity: 40
    }
  ]);

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

  const [experiments, setExperiments] = useState<Experiment[]>([]);

  // Actions
  const addObjective = (obj: Objective) => setObjectives(prev => [...prev, obj]);
  
  const updateObjective = (id: string, updates: Partial<Objective>) => 
    setObjectives(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));
    
  const addLever = (l: RevOpsLever) => setLevers(prev => [...prev, l]);
  const addExperiment = (e: Experiment) => setExperiments(prev => [...prev, e]);

  return (
    <StrategyContext.Provider value={{ objectives, levers, experiments, addObjective, updateObjective, addLever, addExperiment }}>
      {children}
    </StrategyContext.Provider>
  );
}

export const useStrategy = () => {
  const context = useContext(StrategyContext);
  if (!context) throw new Error("useStrategy must be used within StrategyProvider");
  return context;
};