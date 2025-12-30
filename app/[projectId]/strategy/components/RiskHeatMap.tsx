'use client';
import { useStrategy } from '../context/StrategyProvider';
import { Objective } from '@/app/execution/types';
import { AlertTriangle, ShieldCheck } from 'lucide-react';

interface Props {
    onSelectOkr: (okr: Objective) => void;
    className?: string;
}

// CAMBIO: Renombrado a RiskHeatMap (M mayúscula) para consistencia
export const RiskHeatMap = ({ onSelectOkr, className }: Props) => {
    const { objectives } = useStrategy();

    // Ordenar por severidad * probabilidad (Risk Score) descendente
    const sortedRisks = [...objectives].sort((a, b) => 
        (b.riskSeverity * b.riskProbability) - (a.riskSeverity * a.riskProbability)
    );

    const getRiskLevel = (prob: number, sev: number) => {
        const score = prob * sev; 
        if (score > 5000) return { label: 'CRÍTICO', color: 'text-red-500', bg: 'bg-red-500/10 border-red-500/20' };
        if (score > 2500) return { label: 'ALTO', color: 'text-orange-500', bg: 'bg-orange-500/10 border-orange-500/20' };
        if (score > 1000) return { label: 'MEDIO', color: 'text-yellow-500', bg: 'bg-yellow-500/10 border-yellow-500/20' };
        return { label: 'BAJO', color: 'text-emerald-500', bg: 'bg-emerald-500/10 border-emerald-500/20' };
    };

    return (
        <div className={`flex flex-col h-full overflow-hidden ${className}`}>
            <div className="flex justify-between items-center mb-3 px-1">
                <span className="text-[10px] text-zinc-500 uppercase">Top Riesgos Detectados</span>
                <span className="text-[10px] text-zinc-500 uppercase">Nivel</span>
            </div>
            <div className="space-y-2 overflow-y-auto custom-scrollbar flex-1 pr-1">
                {sortedRisks.map((okr) => {
                    const level = getRiskLevel(okr.riskProbability, okr.riskSeverity);
                    return (
                        <div 
                            key={okr.id}
                            onClick={() => onSelectOkr(okr)}
                            className={`flex items-center justify-between p-3 rounded-lg border hover:brightness-125 cursor-pointer transition-all ${level.bg}`}
                        >
                            <div className="flex items-center gap-3">
                                <AlertTriangle size={14} className={level.color} />
                                <div>
                                    <p className="text-xs font-medium text-zinc-200">{okr.title}</p>
                                    <p className="text-[9px] text-zinc-500 mt-0.5">Prob: {okr.riskProbability}% • Sev: {okr.riskSeverity}%</p>
                                </div>
                            </div>
                            <span className={`text-[9px] font-bold px-2 py-0.5 rounded border border-white/5 ${level.color} bg-black/20`}>
                                {level.label}
                            </span>
                        </div>
                    );
                })}
                {objectives.length === 0 && (
                    <div className="flex flex-col items-center justify-center h-32 text-zinc-600">
                        <ShieldCheck size={24} className="mb-2 opacity-50"/>
                        <span className="text-xs">Sin riesgos registrados</span>
                    </div>
                )}
            </div>
        </div>
    );
};