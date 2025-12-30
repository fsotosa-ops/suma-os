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

// --- NUEVO: Estructura para Variantes A/B ---
export interface Variant {
  name: string; // "Control", "Variante B"
  traffic: number; 
  conversions: number; 
  visitors: number;
  conversionRate: number; 
}

export interface Experiment {
  id: string;
  name: string;
  leverId: string;
  status: 'DRAFT' | 'RUNNING' | 'CONCLUDED';
  result?: 'WIN' | 'LOSS' | 'INCONCLUSIVE';
  impact?: number;
  startDate: string;
  variants?: Variant[]; // <--- IMPORTANTE: Campo nuevo
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
  impact: number; effort: number;
  urgency: number; importance: number;
  riskProbability: number; riskSeverity: number;
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

export type Metric = { 
  name: string; 
  value: number; 
  unit: string; 
  status: 'ok' | 'warning' | 'error';
};

// --- WAR ROOM TYPES ---
export type BlockType = 'h1' | 'h2' | 'text' | 'smart-metric' | 'tech-status' | 'code' | 'callout';

export interface BlockContentMetric {
  name?: string; // Opcional si usamos leverId
  value?: string | number;
  target?: string | number;
  leverId?: string; // Para conectar con StrategyProvider
}

export interface BlockContentTech {
  service: string;
  version: string;
  endpoint: string;
  status: 'operational' | 'degraded' | 'down';
}

export interface Block {
  id: string;
  type: BlockType;
  content: string | BlockContentMetric | BlockContentTech; 
}

export interface WarRoomDoc {
  id: string;
  icon: string;
  title: string;
  category: 'BUSINESS' | 'ENGINEERING' | 'GENERAL';
  updatedAt: string;
  blocks: Block[];
}