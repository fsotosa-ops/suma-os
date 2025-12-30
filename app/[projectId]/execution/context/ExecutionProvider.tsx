'use client';
import React, { createContext, useContext, useState } from 'react';
import { useParams } from 'next/navigation';
import { Ticket, Sprint, TicketStatus } from '@/app/types';

interface ExecutionContextType {
  tickets: Ticket[];
  sprints: Sprint[];
  actions: {
    createSprint: (title: string, start: string, end: string, goal: string) => void;
    deleteSprint: (id: string) => void;
    createTicket: (data: Omit<Ticket, 'id' | 'projectId'>) => void; // Quitamos projectId del input
    updateTicket: (id: string, updates: Partial<Ticket>) => void;
    deleteTicket: (id: string) => void;
    moveTicket: (ticketId: string, newStatus: TicketStatus) => void;
  };
}

const ExecutionContext = createContext<ExecutionContextType | undefined>(undefined);

export const ExecutionProvider = ({ children }: { children: React.ReactNode }) => {
  const params = useParams();
  const projectId = params?.projectId as string || 'default';

  const [allTickets, setAllTickets] = useState<Ticket[]>([
    { id: '1', projectId: 'suma-os', title: 'Setup Repo', type: 'TASK', status: 'DONE', points: 3, sprintId: 's1' }
  ]);
  const [allSprints, setAllSprints] = useState<Sprint[]>([
    { id: 's1', projectId: 'suma-os', title: 'Sprint 1', goal: 'MVP', startDate: '2025-01-01', endDate: '2025-01-15', isActive: true }
  ]);

  // Filtrado
  const tickets = allTickets.filter(t => t.projectId === projectId);
  const sprints = allSprints.filter(s => s.projectId === projectId);

  const actions = {
    createSprint: (title: string, start: string, end: string, goal: string) => {
      const newSprint: Sprint = {
        id: crypto.randomUUID(), projectId, // Auto-asignar proyecto
        title, startDate: start, endDate: end, goal, isActive: false
      };
      setAllSprints(prev => [...prev, newSprint]);
    },
    deleteSprint: (id: string) => {
      setAllSprints(prev => prev.filter(s => s.id !== id));
    },
    createTicket: (data: Omit<Ticket, 'id' | 'projectId'>) => {
      const newTicket = { 
        ...data, 
        id: crypto.randomUUID(), 
        projectId, // Auto-asignar proyecto
        status: data.status || 'TODO' 
      };
      setAllTickets(prev => [...prev, newTicket]);
    },
    updateTicket: (id: string, updates: Partial<Ticket>) => {
      setAllTickets(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    },
    deleteTicket: (id: string) => {
      setAllTickets(prev => prev.filter(t => t.id !== id));
    },
    moveTicket: (ticketId: string, newStatus: TicketStatus) => {
      setAllTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
    }
  };

  return (
    <ExecutionContext.Provider value={{ tickets, sprints, actions }}>
      {children}
    </ExecutionContext.Provider>
  );
};

export const useExecution = () => {
  const context = useContext(ExecutionContext);
  if (!context) throw new Error('useExecution must be used within an ExecutionProvider');
  return context;
};