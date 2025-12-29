// Archivo: app/execution/types.ts

// AQUI ESTABA EL ERROR: Agregamos 'FEATURE' a la lista de tipos permitidos
export type TicketType = 'EPIC' | 'STORY' | 'TASK' | 'BUG' | 'FEATURE'; 

export type TicketStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE' | 'BLOCKED';

export interface User {
  id: string;
  name: string;
  avatarUrl?: string;
}

export interface Sprint {
  id: string;
  title: string;
  goal: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

// --- TIPOS DE HISTORIAL (Para los gráficos) ---
export type KpiRecord = {
  date: string;
  value: number;
};

// --- LA ENTIDAD PALANCA EVOLUCIONADA ---
export interface RevOpsLever {
  id: string;
  name: string; 
  description?: string;
  type: 'EFFICIENCY' | 'GROWTH' | 'RETENTION'; 
  
  // KPI Config
  kpiName: string; 
  kpiTarget: number; 
  kpiCurrent: number;
  kpiUnit: string; // '%', '$', '#'
  
  // Historial
  history: KpiRecord[]; 
  
  linkedObjectiveId?: string;
}

export interface Ticket {
  id: string;
  title: string;
  description?: string;
  type: TicketType;
  status: TicketStatus;
  points: number; 
  assigneeId?: string;
  sprintId?: string;
  leverId?: string;
}