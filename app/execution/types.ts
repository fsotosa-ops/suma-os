export type TicketType = 'EPIC' | 'STORY' | 'TASK' | 'BUG' | 'FEATURE';
export type TicketStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE' | 'BLOCKED';

export interface User { id: string; name: string; avatarUrl?: string; }

export interface Sprint {
  id: string;
  title: string;
  goal: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export type KpiRecord = { date: string; value: number; };

// --- NUEVA ENTIDAD: EXPERIMENTO (A/B TESTING) ---
export interface Experiment {
  id: string;
  name: string; // Ej: "Botón Flotante vs Fijo"
  leverId: string; // Pertenece a una palanca específica
  status: 'DRAFT' | 'RUNNING' | 'CONCLUDED';
  result?: 'WIN' | 'LOSS' | 'INCONCLUSIVE';
  impact?: number; // Ej: +2.5%
  startDate: string;
}

export interface RevOpsLever {
  id: string;
  name: string; 
  type: 'EFFICIENCY' | 'GROWTH' | 'RETENTION'; 
  kpiName: string; 
  kpiTarget: number; 
  kpiCurrent: number;
  kpiUnit: string;
  history: KpiRecord[]; 
}

export interface Ticket {
  id: string;
  title: string;
  description?: string;
  type: TicketType;
  status: TicketStatus;
  points: number; 
  sprintId?: string;
  leverId?: string; 
}