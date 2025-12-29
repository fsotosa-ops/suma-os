'use client';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { Ticket, Sprint, TicketStatus } from '../types';

interface ExecutionContextType {
  tickets: Ticket[];
  sprints: Sprint[];
  actions: {
    createSprint: (title: string, start: string, end: string, goal: string) => void;
    deleteSprint: (id: string) => void;
    createTicket: (data: Omit<Ticket, 'id'>) => void;
    updateTicket: (id: string, updates: Partial<Ticket>) => void;
    deleteTicket: (id: string) => void;
    moveTicket: (ticketId: string, newStatus: TicketStatus) => void;
  };
}

const ExecutionContext = createContext<ExecutionContextType | undefined>(undefined);

export const ExecutionProvider = ({ children }: { children: React.ReactNode }) => {
  // Datos iniciales de prueba
  const [tickets, setTickets] = useState<Ticket[]>([
    { id: '1', title: 'Investigación de Mercado', type: 'EPIC', status: 'TODO', points: 5, description: 'Analizar competidores.' },
    { id: '2', title: 'Configuración Inicial', type: 'TASK', status: 'DONE', points: 3, sprintId: 's1' },
    { id: '3', title: 'Diseñar Base de Datos', type: 'STORY', status: 'IN_PROGRESS', points: 8, sprintId: 's1' },
  ]);

  const [sprints, setSprints] = useState<Sprint[]>([
    { id: 's1', title: 'Sprint 1', goal: 'MVP Core Logistics', startDate: '2025-01-01', endDate: '2025-01-15', isActive: true }
  ]);

  const actions = {
    createSprint: (title: string, start: string, end: string, goal: string) => {
      const newSprint: Sprint = {
        id: crypto.randomUUID(),
        title,
        startDate: start,
        endDate: end,
        goal,
        isActive: false // Por defecto inactivo
      };
      setSprints(prev => [...prev, newSprint]);
    },
    deleteSprint: (id: string) => {
      setSprints(prev => prev.filter(s => s.id !== id));
      // Opcional: Desasignar tickets del sprint eliminado
      setTickets(prev => prev.map(t => t.sprintId === id ? { ...t, sprintId: undefined } : t));
    },
    createTicket: (data: Omit<Ticket, 'id'>) => {
      const newTicket = { ...data, id: crypto.randomUUID(), status: data.status || 'TODO' };
      setTickets(prev => [...prev, newTicket]);
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