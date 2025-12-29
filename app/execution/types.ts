export type TicketType = 'EPIC' | 'STORY' | 'TASK' | 'BUG' | 'FEATURE';
export type TicketStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'DONE' | 'BLOCKED';

export interface Experiment {
  id: string;
  name: string;
  leverId: string;
  status: 'DRAFT' | 'RUNNING' | 'CONCLUDED';
  result?: 'WIN' | 'LOSS' | 'INCONCLUSIVE';
  impact?: number; 
  startDate: string;
}

export type ObjectiveStatus = 'On Track' | 'At Risk' | 'Off Track';

export interface Objective {
  id: string;
  title: string;
  target: string;
  progress: number;
  status: ObjectiveStatus;
  hypothesis?: string;
  connectedLeverIds?: string[];
  // Matrices
  impact: number; effort: number;
  urgency: number; importance: number;
  riskProbability: number; riskSeverity: number;
}

export type KpiRecord = { date: string; value: number; };

export interface RevOpsLever {
  id: string;
  name: string; 
  type: 'EFFICIENCY' | 'GROWTH' | 'RETENTION'; 
  kpiName: string; 
  kpiTarget: number; 
  kpiCurrent: number;
  kpiUnit: string;
  history: KpiRecord[];
  // Analytics calculados (opcionales en la definición base, usados en la vista)
  analytics?: { score: number; techProgress: number };
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

export interface Sprint {
    id: string;
    title: string;
    goal: string;
    startDate: string;
    endDate: string;
    isActive: boolean;
}