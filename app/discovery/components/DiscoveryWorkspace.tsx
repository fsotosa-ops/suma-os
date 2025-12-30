'use client';

import { useState, useEffect } from 'react';
import { DialogContent, DialogTitle } from "@/components/ui/dialog";
import { User, Users, Map, Heart, TrendingUp, X, ChevronRight, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DiscoveryIdea } from '@/app/types';

// Módulos internos
import { EmpathyMap } from './modules/EmpathyMap';
import { UserJourneyMap } from './modules/UserJourneyMap';
import { ActionableList } from './modules/ActionableList';
import { UserPersonaEditor } from './modules/UserPersonaEditor';

interface Props {
  idea: DiscoveryIdea;
  onClose: () => void;
  onUpdate: (id: string, updates: Partial<DiscoveryIdea>) => void;
  onPromoteActionable: (ideaId: string, actionId: string) => void;
  initialSection?: string;
}

export const DiscoveryWorkspace = ({ idea, onClose, onUpdate, onPromoteActionable, initialSection = 'personas' }: Props) => {
  // Estado local para la navegación interna del workspace
  const [activeSection, setActiveSection] = useState(initialSection.toLowerCase());

  // Sincronizar si cambia la prop (ej: navegación desde URL)
  useEffect(() => {
    if (initialSection) setActiveSection(initialSection.toLowerCase());
  }, [initialSection]);

  // Cálculo del Score en tiempo real para el sidebar izquierdo
  const currentScore = Math.round((idea.impact + idea.confidence + (100 - idea.effort)) / 3);

  return (
    <DialogContent 
        showCloseButton={false} 
        className={cn(
            // Clases para forzar comportamiento de "Drawer" lateral derecho
            "!fixed !right-0 !left-auto !top-0 !translate-x-0 !translate-y-0",
            "!h-screen !max-h-screen",
            "!w-[95vw] !max-w-[1600px] sm:!max-w-[95vw]", 
            "border-l border-zinc-800 rounded-l-2xl rounded-r-none",
            "bg-[#09090b] text-white p-0 flex flex-col overflow-hidden shadow-2xl shadow-black animate-in slide-in-from-right duration-300 outline-none"
        )}
    >
        {/* Título oculto para accesibilidad (Evita el error de Radix UI) */}
        <DialogTitle className="sr-only">Workspace: {idea.title}</DialogTitle>

        <div className="flex h-full w-full">
            
            {/* --- COLUMNA IZQUIERDA: Contexto y Menú --- */}
            <div className="w-[300px] border-r border-zinc-800 bg-[#12141A] flex flex-col shrink-0 z-20">
                
                {/* 1. Header de la Idea */}
                <div className="p-5 border-b border-zinc-800 shrink-0">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-[10px] font-bold bg-pink-500/10 text-pink-400 px-2 py-0.5 rounded uppercase tracking-wider border border-pink-500/20">{idea.status}</span>
                        <button onClick={onClose} className="text-zinc-500 hover:text-white p-1.5 hover:bg-zinc-800 rounded transition-colors"><X size={16}/></button>
                    </div>
                    <textarea 
                        className="w-full bg-transparent text-xl font-bold text-white outline-none resize-none h-auto min-h-[40px] placeholder:text-zinc-600 mb-2 custom-scrollbar overflow-hidden bg-zinc-900/0 focus:bg-zinc-900/50 rounded transition-colors" 
                        value={idea.title} 
                        rows={2}
                        onChange={(e) => onUpdate(idea.id, { title: e.target.value })}
                    />
                    <div className="space-y-1 mt-2">
                        <label className="text-[10px] uppercase font-bold text-zinc-600">Contexto</label>
                        <textarea 
                            className="w-full bg-zinc-900/30 rounded p-2 text-xs text-zinc-300 resize-none outline-none border border-zinc-800 focus:border-zinc-700 min-h-[80px] custom-scrollbar"
                            placeholder="Descripción del problema..."
                            value={idea.description} 
                            onChange={(e) => onUpdate(idea.id, { description: e.target.value })}
                        />
                    </div>
                </div>

                {/* 2. Menú de Navegación Vertical */}
                <div className="flex-1 overflow-y-auto p-4 space-y-1 custom-scrollbar min-h-0">
                    <p className="px-2 text-[10px] font-bold text-zinc-600 uppercase mb-2">Módulos</p>
                    <NavButton icon={User} label="User Personas" isActive={activeSection === 'personas'} onClick={() => setActiveSection('personas')} />
                    <NavButton icon={Heart} label="Empathy Map" isActive={activeSection === 'empathy'} onClick={() => setActiveSection('empathy')} />
                    <NavButton icon={Map} label="User Journey" isActive={activeSection === 'journey'} onClick={() => setActiveSection('journey')} />
                    <NavButton icon={TrendingUp} label="Priorización" isActive={activeSection === 'prioritization'} onClick={() => setActiveSection('prioritization')} />
                </div>

                {/* 3. Footer Score */}
                <div className="p-4 border-t border-zinc-800 bg-zinc-900/30 shrink-0">
                    <div className="flex items-center justify-between">
                        <span className="text-xs text-zinc-500 font-medium uppercase">Score Final</span>
                        <span className="text-2xl font-bold text-white">{currentScore}</span>
                    </div>
                </div>
            </div>

            {/* --- COLUMNA DERECHA: Área de Trabajo --- */}
            <div className="flex-1 bg-[#09090b] flex flex-col h-full overflow-hidden relative min-w-0">
                
                {/* Header del Módulo Activo */}
                <div className="h-16 border-b border-zinc-800 flex items-center px-8 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-10 shrink-0">
                    <h2 className="text-lg font-bold flex items-center gap-3 text-white">
                        {activeSection === 'personas' && <><User className="text-pink-500" size={20}/> User Personas <span className="hidden md:inline text-zinc-600 text-sm font-normal">| Definición de Arquetipos</span></>}
                        {activeSection === 'empathy' && <><Heart className="text-pink-500" size={20}/> Empathy Map <span className="hidden md:inline text-zinc-600 text-sm font-normal">| Análisis Emocional</span></>}
                        {activeSection === 'journey' && <><Map className="text-pink-500" size={20}/> User Journey Map <span className="hidden md:inline text-zinc-600 text-sm font-normal">| Mapeo de experiencia</span></>}
                        {activeSection === 'prioritization' && <><TrendingUp className="text-pink-500" size={20}/> Priorización <span className="hidden md:inline text-zinc-600 text-sm font-normal">| Definición de tareas</span></>}
                    </h2>
                </div>

                {/* Contenido Scrollable */}
                <div className="flex-1 overflow-y-auto p-8 custom-scrollbar bg-[radial-gradient(#27272a_1px,transparent_1px)] [background-size:16px_16px] min-h-0">
                    <div className="max-w-6xl mx-auto pb-20">
                        
                        {/* RENDERIZADO CONDICIONAL DE MÓDULOS */}
                        
                        {activeSection === 'personas' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <UserPersonaEditor personas={idea.personas || []} onChange={(data) => onUpdate(idea.id, { personas: data })} />
                            </div>
                        )}

                        {activeSection === 'empathy' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300 h-full">
                                <EmpathyMap data={idea.empathyMap || { says: '', thinks: '', does: '', feels: '' }} onChange={(data) => onUpdate(idea.id, { empathyMap: data })} />
                            </div>
                        )}

                        {activeSection === 'journey' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <UserJourneyMap steps={idea.userJourney || []} onChange={(steps) => onUpdate(idea.id, { userJourney: steps })} />
                            </div>
                        )}

                        {activeSection === 'prioritization' && (
                            <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                                <ActionableList 
                                    actionables={idea.actionables || []} 
                                    onChange={(acts) => onUpdate(idea.id, { actionables: acts })} 
                                    onPromote={(actId) => onPromoteActionable(idea.id, actId)} 
                                    // Pasamos métricas para los Sliders
                                    metrics={{ impact: idea.impact, effort: idea.effort, confidence: idea.confidence }}
                                    onMetricsChange={(m) => onUpdate(idea.id, { impact: m.impact, effort: m.effort, confidence: m.confidence })}
                                />
                            </div>
                        )}

                        {/* Estado vacío por si falla la navegación */}
                        {!['personas', 'empathy', 'journey', 'prioritization'].includes(activeSection) && (
                            <div className="flex flex-col items-center justify-center h-64 text-zinc-500">
                                <AlertCircle size={32} className="mb-2 opacity-50"/>
                                <p>Selecciona un módulo para comenzar.</p>
                            </div>
                        )}

                    </div>
                </div>
            </div>
        </div>
    </DialogContent>
  );
};

// Componente interno de botón
const NavButton = ({ icon: Icon, label, isActive, onClick }: any) => (
    <button onClick={onClick} className={cn("w-full flex items-center gap-3 px-3 py-3 rounded-lg text-sm font-medium transition-all text-left group", isActive ? "bg-pink-500/10 text-pink-400 border border-pink-500/20 shadow-sm" : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50")}>
        <Icon size={18} className={cn("transition-colors", isActive ? "text-pink-400" : "text-zinc-600 group-hover:text-zinc-400")} />
        {label}
        {isActive && <ChevronRight size={14} className="ml-auto opacity-50" />}
    </button>
);