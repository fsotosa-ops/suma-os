'use client';

import React, { createContext, useContext, useState } from 'react';
import { useParams } from 'next/navigation';
import { DiscoveryIdea } from '@/app/types'; // Los types siguen en la raíz, esto está bien.
import { useExecution } from '../../execution/context/ExecutionProvider'; 

interface DiscoveryContextType {
  ideas: DiscoveryIdea[];
  addIdea: (idea: DiscoveryIdea) => void;
  updateIdea: (id: string, updates: Partial<DiscoveryIdea>) => void;
  deleteIdea: (id: string) => void;
  promoteActionable: (ideaId: string, actionId: string) => void;
}

const DiscoveryContext = createContext<DiscoveryContextType | undefined>(undefined);

export function DiscoveryProvider({ children }: { children: React.ReactNode }) {
  const { actions: executionActions } = useExecution();
  const params = useParams();
  const projectId = params?.projectId as string || 'default';

  // Mock Data
  const [allIdeas, setAllIdeas] = useState<DiscoveryIdea[]>([
    {
      id: '1',
      projectId: 'suma-os',
      title: 'Nuevo Onboarding B2B',
      description: 'Rediseño del flujo de entrada.',
      status: 'DISCOVERY',
      impact: 80, effort: 50, confidence: 60,
      updatedAt: 'Hace 2h',
      personas: [], empathyMap: { says: '', thinks: '', does: '', feels: '' }, userJourney: [], actionables: [], tags: ['Growth']
    }
  ]);

  const ideas = allIdeas.filter(idea => idea.projectId === projectId);

  const addIdea = (idea: DiscoveryIdea) => {
    setAllIdeas(prev => [{ ...idea, projectId }, ...prev]);
  };
  
  const updateIdea = (id: string, updates: Partial<DiscoveryIdea>) => 
    setAllIdeas(prev => prev.map(i => i.id === id ? { ...i, ...updates } : i));
    
  const deleteIdea = (id: string) => 
    setAllIdeas(prev => prev.filter(i => i.id !== id));

  const promoteActionable = (ideaId: string, actionId: string) => {
    const idea = allIdeas.find(i => i.id === ideaId);
    if(!idea || !idea.actionables) return;

    const action = idea.actionables.find(a => a.id === actionId);
    if(!action) return;

    executionActions.createTicket({
      // projectId se inyecta automáticamente en el ExecutionProvider ahora
      title: `[Discovery] ${action.title}`,
      description: `Origen: ${idea.title}`,
      type: 'STORY',
      status: 'TODO',
      points: 0
    });

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