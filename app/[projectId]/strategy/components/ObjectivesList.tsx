'use client';

import { useStrategy } from '../context/StrategyProvider';
// CORRECCIÓN: Importar desde el archivo central de tipos
import { Objective } from '@/app/types';
import { Target, TrendingUp, AlertCircle, CheckCircle2, ArrowRight } from 'lucide-react';

interface Props {
    onSelectOkr: (okr: Objective) => void;
}

export const ObjectivesList = ({ onSelectOkr }: Props) => {
    const { objectives } = useStrategy();

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'On Track': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
            case 'At Risk': return 'text-orange-500 bg-orange-500/10 border-orange-500/20';
            case 'Off Track': return 'text-red-500 bg-red-500/10 border-red-500/20';
            default: return 'text-zinc-500 bg-zinc-500/10 border-zinc-500/20';
        }
    };

    return (
        <div className="h-full flex flex-col">
            <div className="grid grid-cols-12 gap-4 px-4 py-2 border-b border-zinc-800 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">
                <div className="col-span-5">Objetivo & Hipótesis</div>
                <div className="col-span-2 text-center">Estado</div>
                <div className="col-span-2 text-center">Progreso</div>
                <div className="col-span-2 text-center">Score (ROI)</div>
                <div className="col-span-1 text-right">Acción</div>
            </div>

            <div className="flex-1 overflow-y-auto custom-scrollbar">
                {objectives.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-full text-zinc-500 gap-2 opacity-50">
                        <Target size={24} />
                        <span className="text-xs">No hay objetivos definidos</span>
                    </div>
                )}
                
                {objectives.map((okr) => (
                    <div 
                        key={okr.id} 
                        onClick={() => onSelectOkr(okr)}
                        className="grid grid-cols-12 gap-4 px-4 py-3 border-b border-zinc-800/50 hover:bg-zinc-900/40 transition-colors cursor-pointer group items-center"
                    >
                        <div className="col-span-5">
                            <div className="flex items-center gap-3">
                                <div className={`p-1.5 rounded-lg border ${getStatusColor(okr.status)}`}>
                                    <Target size={14} />
                                </div>
                                <div className="min-w-0">
                                    <h4 className="text-sm font-medium text-zinc-200 truncate group-hover:text-white transition-colors">{okr.title}</h4>
                                    <p className="text-[11px] text-zinc-500 truncate">{okr.target} • {okr.hypothesis || "Sin hipótesis definida"}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-span-2 flex justify-center">
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold border flex items-center gap-1.5 ${getStatusColor(okr.status)}`}>
                                {okr.status === 'On Track' && <CheckCircle2 size={10} />}
                                {okr.status === 'At Risk' && <TrendingUp size={10} className="rotate-90"/>}
                                {okr.status === 'Off Track' && <AlertCircle size={10} />}
                                {okr.status}
                            </span>
                        </div>

                        <div className="col-span-2 px-2">
                            <div className="flex justify-between text-[10px] text-zinc-400 mb-1">
                                <span>{okr.progress}%</span>
                            </div>
                            <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                                <div 
                                    className={`h-full rounded-full ${okr.progress >= 70 ? 'bg-emerald-500' : okr.progress >= 40 ? 'bg-yellow-500' : 'bg-zinc-600'}`} 
                                    style={{ width: `${okr.progress}%` }}
                                />
                            </div>
                        </div>

                        <div className="col-span-2 flex justify-center gap-2">
                            <div className="text-center">
                                <span className="block text-[10px] text-zinc-600 uppercase">IMP</span>
                                <span className="text-xs font-mono font-bold text-emerald-400">{okr.impact}</span>
                            </div>
                            <div className="w-px h-6 bg-zinc-800"></div>
                            <div className="text-center">
                                <span className="block text-[10px] text-zinc-600 uppercase">ESF</span>
                                <span className="text-xs font-mono font-bold text-blue-400">{okr.effort}</span>
                            </div>
                        </div>

                        <div className="col-span-1 flex justify-end">
                            <button className="p-1.5 text-zinc-600 hover:text-white hover:bg-zinc-800 rounded transition-all opacity-0 group-hover:opacity-100">
                                <ArrowRight size={16} />
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};