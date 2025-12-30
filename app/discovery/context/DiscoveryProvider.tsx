// app/discovery/context/DiscoveryProvider.tsx
'use client';

import React, { createContext, useContext, useState } from 'react';
import { DiscoveryIdea } from '@/app/types';
import { useExecution } from '@/app/execution/context/ExecutionProvider';

interface DiscoveryContextType {
  ideas: DiscoveryIdea[];
  addIdea: (idea: DiscoveryIdea) => void;
  updateIdea: (id: string, updates: Partial<DiscoveryIdea>) => void;
  deleteIdea: (id: string) => void;
  
  // Acciones Específicas
  promoteActionable: (ideaId: string, actionId: string) => void;
}

const DiscoveryContext = createContext<DiscoveryContextType | undefined>(undefined);

export function DiscoveryProvider({ children }: { children: React.ReactNode }) {
  const { actions: executionActions } = useExecution(); // Conexión con Execution

  // Datos iniciales actualizados con la estructura completa (Personas, Tags, etc.)
  const [ideas, setIdeas] = useState<DiscoveryIdea[]>([
    {
      id: '1',
      title: 'Nuevo Onboarding B2B',
      description: 'Rediseño del flujo de entrada para empresas grandes.',
      status: 'DISCOVERY',
      impact: 80, 
      effort: 50, 
      confidence: 60,
      updatedAt: 'Hace 2h',
      
      // Módulos Inicializados
      personas: [], // <-- Campo Nuevo
      empathyMap: { says: '', thinks: '', does: '', feels: '' },
      userJourney: [],
      actionables: [],
      tags: ['Growth', 'UX'] // <-- Campo Nuevo
    }
  ]);

  const addIdea = (idea: DiscoveryIdea) => setIdeas(prev => [idea, ...prev]); // Agregamos al principio
  
  const updateIdea = (id: string, updates: Partial<DiscoveryIdea>) => 
    setIdeas(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
    
  const deleteIdea = (id: string) => 
    setIdeas(prev => prev.filter(i => i.id !== id));

  // La magia: Convertir un Accionable de Discovery en un Ticket de Ejecución
  const promoteActionable = (ideaId: string, actionId: string) => {
    const idea = ideas.find(i => i.id === ideaId);
    if(!idea || !idea.actionables) return;

    const action = idea.actionables.find(a => a.id === actionId);
    if(!action) return;

    // 1. Crear en Backlog Real (Execution Module)
    executionActions.createTicket({
      title: `[From Discovery] ${action.title}`,
      description: `Originado en la iniciativa: ${idea.title}`,
      type: 'STORY',
      status: 'TODO',
      points: 0
    });

    // 2. Marcar como promovido en Discovery
    const updatedActionables = idea.actionables.map(a => 
      a.id === actionId ? { ...a, status: 'Promoted' as const } : a
    );
    updateIdea(ideaId, { actionables: updatedActionables });
  };

  return (
    <DiscoveryContext.Provider value={{ ideas, addIdea, updateIdea, deleteIdea, promoteActionable }}>
      {children}
    </DiscoveryContext.Provider>
  );
}

export const useDiscovery = () => {
  const context = useContext(DiscoveryContext);
  if (!context) throw new Error("useDiscovery must be used within DiscoveryProvider");
  return context;
};