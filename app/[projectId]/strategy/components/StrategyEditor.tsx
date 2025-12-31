// app/strategy/components/StrategyEditor.tsx
'use client';

import { useState } from 'react';
import { useStrategy } from '../context/StrategyProvider';
import { Objective } from '@/app/types';
import { LayoutGrid, Clock, AlertTriangle, Link as LinkIcon, Check, Lightbulb } from 'lucide-react';

export const StrategyEditor = ({ okr, onClose }: { okr: Objective, onClose: () => void }) => {
    // Recuperamos 'levers' del contexto
    const { updateObjective, levers } = useStrategy();
    
    const [localOkr, setLocalOkr] = useState(okr);
    const [tab, setTab] = useState<'PRIO' | 'EISEN' | 'RISK'>('PRIO');

    const handleSave = () => {
        updateObjective(okr.id, localOkr);
        onClose();
    };

    // Lógica para conectar/desconectar palancas
    const toggleLever = (leverId: string) => {
        const current = localOkr.connectedLeverIds || [];
        const updated = current.includes(leverId) 
            ? current.filter(id => id !== leverId) 
            : [...current, leverId];
        setLocalOkr({ ...localOkr, connectedLeverIds: updated });
    };

    const Slider = ({ label, val, setter }: any) => (
        <div className="space-y-1">
            <div className="flex justify-between text-[10px] text-zinc-400"><span>{label}</span><span>{val}%</span></div>
            <input type="range" min="0" max="100" value={val || 50} onChange={e => setter(Number(e.target.value))} className="w-full h-1 bg-zinc-700 rounded-lg appearance-none cursor-pointer accent-indigo-500" />
        </div>
    );

    return (
        <div className="space-y-6 py-2">
            
            {/* 1. MATRICES (Tabs) */}
            <div>
                <div className="flex gap-1 bg-zinc-900 p-1 rounded-lg border border-zinc-800 mb-3">
                    <button onClick={() => setTab('PRIO')} className={`flex-1 py-1.5 text-[10px] font-medium rounded ${tab === 'PRIO' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}>Priorización</button>
                    <button onClick={() => setTab('EISEN')} className={`flex-1 py-1.5 text-[10px] font-medium rounded ${tab === 'EISEN' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}>Eisenhower</button>
                    <button onClick={() => setTab('RISK')} className={`flex-1 py-1.5 text-[10px] font-medium rounded ${tab === 'RISK' ? 'bg-zinc-800 text-white' : 'text-zinc-500'}`}>Riesgo</button>
                </div>

                <div className="bg-zinc-900/50 p-4 rounded-xl border border-zinc-800 space-y-5">
                    {tab === 'PRIO' && <>
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2"><LayoutGrid size={14}/> Impacto vs Esfuerzo</div>
                        <Slider label="Esfuerzo (X)" val={localOkr.effort} setter={(v: number) => setLocalOkr({...localOkr, effort: v})} />
                        <Slider label="Impacto (Y)" val={localOkr.impact} setter={(v: number) => setLocalOkr({...localOkr, impact: v})} />
                    </>}
                    {tab === 'EISEN' && <>
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2"><Clock size={14}/> Urgencia vs Importancia</div>
                        <Slider label="Urgencia (X)" val={localOkr.urgency} setter={(v: number) => setLocalOkr({...localOkr, urgency: v})} />
                        <Slider label="Importancia (Y)" val={localOkr.importance} setter={(v: number) => setLocalOkr({...localOkr, importance: v})} />
                    </>}
                    {tab === 'RISK' && <>
                        <div className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wider mb-2"><AlertTriangle size={14}/> Evaluación de Riesgos</div>
                        <Slider label="Probabilidad (X)" val={localOkr.riskProbability} setter={(v: number) => setLocalOkr({...localOkr, riskProbability: v})} />
                        <Slider label="Severidad (Y)" val={localOkr.riskSeverity} setter={(v: number) => setLocalOkr({...localOkr, riskSeverity: v})} />
                    </>}
                </div>
            </div>

            {/* 2. HIPÓTESIS */}
            <div className="space-y-2 border-t border-zinc-800 pt-4">
                <label className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-2">
                    <Lightbulb size={12} className="text-yellow-500" /> Hipótesis
                </label>
                <textarea 
                    className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-sm text-zinc-200 min-h-[80px] focus:border-indigo-500 outline-none resize-none"
                    value={localOkr.hypothesis || ''}
                    onChange={(e) => setLocalOkr({...localOkr, hypothesis: e.target.value})}
                    placeholder="¿Por qué creemos que este objetivo moverá la aguja?"
                />
            </div>

            {/* 3. PALANCAS */}
            <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase flex items-center gap-2">
                    <LinkIcon size={12} className="text-blue-500" /> Palancas Habilitadoras
                </label>
                <div className="flex flex-wrap gap-2 max-h-[120px] overflow-y-auto pr-1 custom-scrollbar">
                    {levers.map(lever => {
                        const isSelected = (localOkr.connectedLeverIds || []).includes(lever.id);
                        return (
                            <button
                                key={lever.id}
                                onClick={() => toggleLever(lever.id)}
                                className={`px-3 py-1.5 rounded-full text-xs border transition-all flex items-center gap-2 ${
                                    isSelected 
                                    ? 'bg-indigo-500/20 border-indigo-500 text-indigo-200' 
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'
                                }`}
                            >
                                {isSelected && <Check size={10} />}
                                {lever.name}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-4 border-t border-zinc-800">
                <button onClick={onClose} className="px-4 py-2 text-xs text-zinc-400 hover:text-white">Cancelar</button>
                <button onClick={handleSave} className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-xs font-medium hover:bg-indigo-500 transition-colors">Guardar Cambios</button>
            </div>
        </div>
    );
};