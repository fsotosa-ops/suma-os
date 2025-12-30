import { useState } from 'react';
import { Ticket, Sprint, TicketStatus } from '../types';

// Datos Mock Iniciales para pruebas
const INITIAL_TICKETS: Ticket[] = [
  { 
    id: '1', 
    title: 'Investigación de Mercado', 
    type: 'EPIC', 
    status: 'TODO', 
    points: 0, 
    description: 'Analizar a los principales competidores del sector logística.' 
  },
  { 
    id: '2', 
    title: 'Setup Inicial de Repositorio', 
    type: 'TASK', 
    status: 'DONE', 
    points: 3, 
    description: 'Configurar ESLint, Prettier y Husky.' 
  },
];

export const useExecutionBoard = () => {
  const [tickets, setTickets] = useState<Ticket[]>(INITIAL_TICKETS);
  const [sprints, setSprints] = useState<Sprint[]>([]);

  // 1. Crear Sprint con Objetivo
  const createSprint = (title: string, start: string, end: string, goal: string) => {
    const newSprint: Sprint = {
      id: crypto.randomUUID(),
      title,
      startDate: start,
      endDate: end,
      goal,
      isActive: true 
    };
    setSprints([...sprints, newSprint]);
  };

  // 2. Crear Ticket
  const createTicket = (ticketData: Omit<Ticket, 'id' | 'status'>) => {
    const newTicket: Ticket = {
      ...ticketData,
      id: crypto.randomUUID(),
      status: 'TODO',
    };
    setTickets((prev) => [...prev, newTicket]);
  };

  // 3. Actualizar Ticket (Edición)
  const updateTicket = (id: string, updates: Partial<Ticket>) => {
    setTickets((prev) => 
      prev.map((t) => (t.id === id ? { ...t, ...updates } : t))
    );
  };

  // 4. Mover Ticket (Drag & Drop)
  const moveTicket = (ticketId: string, newStatus: TicketStatus) => {
    setTickets((prev) =>
      prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
    );
  };

  return {
    tickets,
    sprints,
    actions: {
      createSprint,
      createTicket,
      updateTicket,
      moveTicket
    }
  };
};