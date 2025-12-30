'use client';

import { Actionable } from '@/app/types';
import { Plus, Trash2, CheckSquare, ArrowRight, TrendingUp, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  actionables: Actionable[];
  onChange: (actionables: Actionable[]) => void;
  onPromote: (id: string) => void;
  metrics: { impact: number; effort: number; confidence: number };
  onMetricsChange: (metrics: { impact: number; effort: number; confidence: number }) => void;
}

export const ActionableList = ({ actionables, onChange, onPromote, metrics, onMetricsChange }: Props) => {
  
  // 1. Calcular Score en tiempo real
  const currentScore = Math.round((metrics.impact + metrics.confidence + (100 - metrics.effort)) / 3);

  // 2. Determinar Prioridad Automática basada en el Score
  const getAutoPriority = (score: number) => {
      if (score >= 70) return { label: 'ALTA', color: 'text-emerald-400 border-emerald-500/30 bg-emerald-500/10' };
      if (score >= 40) return { label: 'MEDIA', color: 'text-yellow-400 border-yellow-500/30 bg-yellow-500/10' };
      return { label: 'BAJA', color: 'text-zinc-400 border-zinc-700 bg-zinc-800' };
  };

  const priorityStyle = getAutoPriority(currentScore);

  const addActionable = () => {
    const newAction: Actionable = {
      id: crypto.randomUUID(), 
      title: '', 
      priority: currentScore >= 70 ? 'High' : currentScore >= 40 ? 'Medium' : 'Low', // Hereda la prioridad del score actual
      status: 'Open'
    };
    onChange([...actionables, newAction]);
  };

  const updateActionable = (id: string, field: keyof Actionable, val: any) => {
    onChange(actionables.map(a => a.id === id ? { ...a, [field]: val } : a));
  };

  const removeActionable = (id: string) => onChange(actionables.filter(a => a.id !== id));

  const ScoreSlider = ({ label, value, field, color }: any) => (
    <div className="space-y-3">
        <div className="flex justify-between text-xs font-bold uppercase tracking-wider text-zinc-500">
            <span>{label}</span>
            <span className={color}>{value}/100</span>
        </div>
        <input 
            type="range" min="0" max="100" value={value}
            onChange={(e) => onMetricsChange({ ...metrics, [field]: Number(e.target.value) })}
            className="w-full h-2 bg-zinc-800 rounded-lg appearance-none cursor-pointer accent-pink-600"
        />
    </div>
  );

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
        
        {/* --- SECCIÓN DE SCORING (ICE) --- */}
        <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-6">
            <div className="flex items-center gap-3 mb-6 border-b border-zinc-800 pb-4">
                <div className="p-2 bg-pink-500/10 rounded-lg text-pink-500"><TrendingUp size={20}/></div>
                <div>
                    <h3 className="text-sm font-bold text-white uppercase">Calculadora de Prioridad</h3>
                    <p className="text-xs text-zinc-500">El score define la prioridad de los accionables.</p>
                </div>
                <div className="ml-auto flex flex-col items-end">
                    <span className="text-[10px] uppercase font-bold text-zinc-600">Score Final</span>
                    <div className="flex items-center gap-2">
                        <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${priorityStyle.color}`}>
                            {priorityStyle.label}
                        </span>
                        <span className="text-3xl font-bold text-white">{currentScore}</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ScoreSlider label="Impacto" value={metrics.impact} field="impact" color="text-emerald-400" />
                <ScoreSlider label="Confianza" value={metrics.confidence} field="confidence" color="text-blue-400" />
                <ScoreSlider label="Esfuerzo" value={metrics.effort} field="effort" color="text-orange-400" />
            </div>
        </div>

        {/* --- LISTA DE ACCIONABLES --- */}
        <div>
             <div className="flex justify-between items-end mb-4">
                <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest flex items-center gap-2">
                    <CheckSquare size={14}/> Accionables
                </h3>
             </div>

            <div className="space-y-3">
                {actionables.map((action, idx) => (
                    <div key={action.id} className="flex items-center gap-3 bg-zinc-900/50 border border-zinc-800 p-3 rounded-lg group hover:border-zinc-700 transition-all">
                        <span className="text-zinc-600 font-mono text-xs w-4">{idx + 1}.</span>
                        
                        <input 
                            className="flex-1 bg-transparent text-sm text-zinc-200 outline-none placeholder:text-zinc-600"
                            placeholder="Definir tarea clave..."
                            value={action.title}
                            onChange={(e) => updateActionable(action.id, 'title', e.target.value)}
                        />
                        
                        {/* ETIQUETA AUTOMÁTICA (Ya no es un select) */}
                        <div className={`text-[10px] font-bold px-2 py-1 rounded border uppercase pointer-events-none opacity-80 ${priorityStyle.color}`}>
                            {priorityStyle.label}
                        </div>

                        {/* Botón Promover */}
                        {action.status !== 'Promoted' ? (
                            <button 
                                onClick={() => onPromote(action.id)} 
                                className="text-[10px] bg-indigo-600 hover:bg-indigo-500 text-white px-3 py-1.5 rounded flex items-center gap-1 transition-colors font-medium ml-2" 
                                title="Enviar al Backlog de Ejecución"
                            >
                                Promover <ArrowRight size={10}/>
                            </button>
                        ) : (
                            <span className="text-[10px] text-emerald-500 font-bold px-2 flex items-center gap-1 ml-2 bg-emerald-500/10 rounded py-1 border border-emerald-500/20">
                                <CheckSquare size={12}/> En Backlog
                            </span>
                        )}

                        <button onClick={() => removeActionable(action.id)} className="text-zinc-600 hover:text-red-400 p-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <Trash2 size={14}/>
                        </button>
                    </div>
                ))}

                {actionables.length === 0 && (
                    <div className="text-center py-8 border-2 border-dashed border-zinc-800 rounded-xl text-zinc-600 text-sm">
                        <AlertCircle className="mx-auto mb-2 opacity-50" size={20}/>
                        Define las tareas necesarias para ejecutar esta iniciativa.
                    </div>
                )}

                <button onClick={addActionable} className="w-full py-3 border border-zinc-800 hover:bg-zinc-800/50 text-zinc-500 hover:text-zinc-300 text-xs font-bold uppercase tracking-wider rounded-lg flex items-center justify-center gap-2 transition-all">
                    <Plus size={14} /> Añadir Tarea
                </button>
            </div>
        </div>
    </div>
  );
};