'use client';
import { useStrategy } from '../context/StrategyProvider';
// CORRECCIÓN: Importar desde el archivo central de tipos
import { Objective } from '@/app/types';

interface Props {
    onSelectOkr: (okr: Objective) => void;
    className?: string;
}

export const EisenhowerBoard = ({ onSelectOkr, className }: Props) => {
    const { objectives } = useStrategy();

    // Clasificar objetivos
    const quadrants = {
        do: objectives.filter(o => o.urgency > 50 && o.importance > 50),
        schedule: objectives.filter(o => o.urgency <= 50 && o.importance > 50),
        delegate: objectives.filter(o => o.urgency > 50 && o.importance <= 50),
        delete: objectives.filter(o => o.urgency <= 50 && o.importance <= 50),
    };

    const Column = ({ title, items, color, bg }: any) => (
        <div className={`flex-1 flex flex-col gap-2 p-3 rounded-lg border border-white/5 ${bg}`}>
            <h4 className={`text-[10px] font-bold uppercase tracking-widest mb-2 ${color}`}>{title} ({items.length})</h4>
            <div className="flex-1 space-y-2 overflow-y-auto max-h-[300px] custom-scrollbar">
                {items.length === 0 && <span className="text-[10px] text-white/20 italic">Vacío</span>}
                {items.map((okr: Objective) => (
                    <div 
                        key={okr.id} 
                        onClick={() => onSelectOkr(okr)}
                        className="bg-[#0A0A0A] border border-white/10 p-2 rounded cursor-pointer hover:border-white/30 transition-all group"
                    >
                        <p className="text-xs text-zinc-300 font-medium group-hover:text-white leading-tight">{okr.title}</p>
                    </div>
                ))}
            </div>
        </div>
    );

    return (
        <div className={`grid grid-cols-2 md:grid-cols-4 gap-2 h-full ${className}`}>
            <Column title="¡Hacer Ya!" items={quadrants.do} color="text-green-400" bg="bg-green-900/10" />
            <Column title="Agendar" items={quadrants.schedule} color="text-blue-400" bg="bg-blue-900/10" />
            <Column title="Delegar" items={quadrants.delegate} color="text-orange-400" bg="bg-orange-900/10" />
            <Column title="Eliminar" items={quadrants.delete} color="text-zinc-500" bg="bg-zinc-900/30" />
        </div>
    );
};