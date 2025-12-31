'use client';

import React, { createContext, useContext, useState } from 'react';
import { useParams } from 'next/navigation';
import { Objective, RevOpsLever, Experiment } from '@/app/types';

interface StrategyContextType {
  objectives: Objective[];
  levers: RevOpsLever[];
  experiments: Experiment[];
  addObjective: (obj: Objective) => void;
  updateObjective: (id: string, updates: Partial<Objective>) => void;
  addLever: (lever: RevOpsLever) => void;
  addExperiment: (exp: Experiment) => void;
  updateExperiment: (id: string, updates: Partial<Experiment>) => void;
  deleteExperiment: (id: string) => void;
}

const StrategyContext = createContext<StrategyContextType | undefined>(undefined);

export function StrategyProvider({ children }: { children: React.ReactNode }) {
  const params = useParams();
  const projectId = params?.projectId as string; // Solo usamos el ID de la URL

  const [allObjectives, setAllObjectives] = useState<Objective[]>([]);
  const [allLevers, setAllLevers] = useState<RevOpsLever[]>([]);
  const [allExperiments, setAllExperiments] = useState<Experiment[]>([]);

  // Filtrado dinámico estricto
  const objectives = allObjectives.filter(o => o.projectId === projectId);
  const levers = allLevers.filter(l => l.projectId === projectId);
  const experiments = allExperiments.filter(e => e.projectId === projectId);

  const addObjective = (obj: Objective) => setAllObjectives(prev => [...prev, { ...obj, projectId }]);
  const addLever = (l: RevOpsLever) => setAllLevers(prev => [...prev, { ...l, projectId }]);
  const addExperiment = (e: Experiment) => setAllExperiments(prev => [...prev, { ...e, projectId }]);
  
  const updateExperiment = (id: string, updates: Partial<Experiment>) => 
    setAllExperiments(prev => prev.map(e => e.id === id ? { ...e, ...updates } : e));
    
  const deleteExperiment = (id: string) => 
    setAllExperiments(prev => prev.filter(e => e.id !== id));

  const updateObjective = (id: string, updates: Partial<Objective>) => 
    setAllObjectives(prev => prev.map(o => o.id === id ? { ...o, ...updates } : o));

  return (
    <StrategyContext.Provider value={{ 
        objectives, levers, experiments, 
        addObjective, updateObjective, addLever, addExperiment, updateExperiment, deleteExperiment 
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