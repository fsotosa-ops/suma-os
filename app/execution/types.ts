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

// --- PALANCA (La métrica operativa) ---
export interface RevOpsLever {
  id: string;
  name: string; 
  type: 'EFFICIENCY' | 'GROWTH' | 'RETENTION'; 
  kpiName: string; 
  kpiTarget: number; 
  kpiCurrent: number;
  kpiUnit: string;
  history: KpiRecord[]; 
  // linkedObjectiveId: string; <--- ELIMINAMOS ESTO (La relación ahora vive en el OKR)
}

export interface Ticket {
  id: string;
  title: string;
  description?: string;
  type: TicketType;
  status: TicketStatus;
  points: number; 
  sprintId?: string;
  leverId?: string; // El ticket SÍ sabe a qué palanca pertenece
}