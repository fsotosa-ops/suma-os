// app/types/index.ts

// --- EXECUTION TYPES (Kanban & Sprints) ---
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

// --- STRATEGY TYPES (RevOps & Growth Lab) ---
export type KpiRecord = { date: string; value: number; };

export interface Variant {
  name: string;
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
  variants?: Variant[];
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
  // Matrices de Priorización
  impact: number; 
  effort: number;
  urgency: number; 
  importance: number;
  riskProbability: number; 
  riskSeverity: number;
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

// --- DISCOVERY TYPES (Product Management Workspace) ---

export interface EmpathyMapData {
  says: string;
  thinks: string;
  does: string;
  feels: string;
}

export interface JourneyStep {
  id: string;
  stage: string;
  action: string;
  painPoint: string;
  sentiment: 'happy' | 'neutral' | 'sad';
}

export interface Actionable {
  id: string;
  title: string;
  priority: 'High' | 'Medium' | 'Low';
  status: 'Open' | 'Promoted'; // Promoted = Enviado a Jira/Backlog
}

export interface Persona {
  id: string;
  name: string;
  role: string;
  bio: string;
  goals: string[];
  frustrations: string[];
  avatarColor: string;
}

export interface DiscoveryIdea {
  id: string;
  title: string;
  description: string;
  status: 'DRAFT' | 'DISCOVERY' | 'VALIDATED' | 'KILLED';
  
  // Módulos internos
  personas?: Persona[];
  empathyMap?: EmpathyMapData;
  userJourney?: JourneyStep[];
  actionables?: Actionable[];
  
  // Scoring
  impact: number;      // 0-100 (Business Value)
  effort: number;      // 0-100 (Complexity)
  confidence: number;  // 0-100 (ICE/RICE Score)
  
  updatedAt: string;
  tags: string[];
}