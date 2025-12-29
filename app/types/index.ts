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

export interface Experiment {
  id: string;
  name: string;
  leverId: string;
  status: 'DRAFT' | 'RUNNING' | 'CONCLUDED';
  result?: 'WIN' | 'LOSS' | 'INCONCLUSIVE';
  impact?: number;
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
  // Campos opcionales para UI enriquecida
  analytics?: { score: number; techProgress: number }; 
}

// --- AQUÍ ESTABA EL FALTANTE ---
export type ObjectiveStatus = 'On Track' | 'At Risk' | 'Off Track';

export interface Objective {
  id: string;
  title: string;
  target: string;
  progress: number;
  status: ObjectiveStatus;
  
  // Lógica de Negocio
  hypothesis?: string;
  connectedLeverIds?: string[];

  // Coordenadas para Matrices (Necesarias para los gráficos)
  impact: number; effort: number;             // Matriz ROI
  urgency: number; importance: number;        // Matriz Eisenhower
  riskProbability: number; riskSeverity: number; // Matriz Riesgos
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