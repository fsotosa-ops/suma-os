'use client';
import React, { createContext, useContext, useState } from 'react';
import { Ticket, Sprint, TicketStatus } from '../types';

interface ExecutionContextType {
  tickets: Ticket[];
  sprints: Sprint[];
  actions: {
    createSprint: (title: string, start: string, end: string, goal: string) => void;
    updateSprint: (id: string, updates: Partial<Sprint>) => void;
    deleteSprint: (id: string) => void;
    createTicket: (data: Omit<Ticket, 'id'>) => void;
    updateTicket: (id: string, updates: Partial<Ticket>) => void;
    deleteTicket: (id: string) => void;
    moveTicket: (ticketId: string, newStatus: TicketStatus) => void;
  };
}

const ExecutionContext = createContext<ExecutionContextType | undefined>(undefined);

export const ExecutionProvider = ({ children }: { children: React.ReactNode }) => {
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: '1', title: 'Investigación de Mercado', type: 'EPIC', status: 'TODO', points: 5 },
    { id: '2', title: 'Setup Inicial de Repositorio', type: 'TASK', status: 'DONE', points: 3 },
  ]);
  const [sprints, setSprints] = useState<Sprint[]>([
    { id: 's1', title: 'Sprint 1', goal: 'MVP Core', startDate: '2024-01-01', endDate: '2024-01-15', isActive: true }
  ]);

  const actions = {
    createSprint: (title: string, start: string, end: string, goal: string) => {
      setSprints([...sprints, { id: crypto.randomUUID(), title, startDate: start, endDate: end, goal, isActive: false }]);
    },
    updateSprint: (id: string, updates: Partial<Sprint>) => {
      setSprints(prev => prev.map(s => s.id === id ? { ...s, ...updates } : s));
    },
    deleteSprint: (id: string) => {
      setSprints(prev => prev.filter(s => s.id !== id));
    },
    createTicket: (data: any) => {
      setTickets(prev => [...prev, { ...data, id: crypto.randomUUID() }]);
    },
    updateTicket: (id: string, updates: Partial<Ticket>) => {
      setTickets(prev => prev.map(t => t.id === id ? { ...t, ...updates } : t));
    },
    deleteTicket: (id: string) => {
      setTickets(prev => prev.filter(t => t.id !== id));
    },
    moveTicket: (ticketId: string, newStatus: TicketStatus) => {
      setTickets(prev => prev.map(t => t.id === ticketId ? { ...t, status: newStatus } : t));
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