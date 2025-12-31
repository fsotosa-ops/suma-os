// app/types/index.ts

export interface Project {
  id: string;
  name: string;
}

// --- NUEVOS TIPOS DE SEGURIDAD (CORRECCIÓN PRINCIPAL) ---
export type UserRole = 
  | 'SUPER_ADMIN' 
  | 'OWNER' 
  | 'DECISION_MAKER' 
  | 'FUNCTIONAL' 
  | 'TECHNICAL' 
  | 'EXECUTOR';

export interface UserProfile {
  id: string;
  email: string;      // Faltaba este campo
  fullName: string;
  role: UserRole; 
  avatarUrl?: string;
}

export interface ProjectMembership {
  projectId: string;
  userId: string;
  role: UserRole;
}

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
  projectId: string;
  title: string;
  goal: string;
  startDate: string;
  endDate: string;
  isActive: boolean;
}

export interface Ticket {
  id: string;
  projectId: string;
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

// NUEVO: Definición de tipos de validación
export type ExperimentType = 'AB_TEST' | 'MVP' | 'POC';

export interface Variant {
  name: string;
  traffic: number; 
  conversions: number; 
  visitors: number;
  conversionRate: number; 
}

export interface Experiment {
  id: string;
  projectId: string;
  name: string;
  type: ExperimentType; // NUEVO: Para distinguir la naturaleza del experimento
  leverId: string;
  status: 'DRAFT' | 'RUNNING' | 'CONCLUDED';
  result?: 'WIN' | 'LOSS' | 'INCONCLUSIVE';
  impact?: number;
  startDate: string;
  hypothesis?: string;    // NUEVO: La apuesta estratégica
  successCriteria?: string; // NUEVO: Qué define el éxito para MVPs/PoCs
  variants?: Variant[];
}

export type ObjectiveStatus = 'On Track' | 'At Risk' | 'Off Track';

export interface Objective {
  id: string;
  projectId: string;
  title: string;
  target: string;
  progress: number;
  status: ObjectiveStatus;
  hypothesis?: string;
  connectedLeverIds?: string[];
  impact: number; 
  effort: number;
  urgency: number; 
  importance: number;
  riskProbability: number; 
  riskSeverity: number;
}

export interface RevOpsLever {
  id: string;
  projectId: string;
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
  status: 'Open' | 'Promoted';
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
  projectId: string;
  title: string;
  description: string;
  status: 'DRAFT' | 'DISCOVERY' | 'VALIDATED' | 'KILLED';
  
  personas?: Persona[];
  empathyMap?: EmpathyMapData;
  userJourney?: JourneyStep[];
  actionables?: Actionable[];
  
  impact: number;
  effort: number;
  confidence: number;
  
  updatedAt: string;
  tags: string[];
}