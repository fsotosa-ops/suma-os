export type TicketType = 'EPIC' | 'STORY' | 'TASK' | 'BUG';
export type TicketStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE';

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Sprint {
  id: string;
  title: string;
  goal: string; // Nuevo campo
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Ticket {
  id: string;
  title: string;
  description?: string; // Nuevo campo
  type: TicketType;
  status: TicketStatus;
  points?: number;
  assigneeId?: string;
  sprintId?: string;
}