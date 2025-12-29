'use client';
import { useStrategy } from '../context/StrategyProvider';
import { Objective } from '@/app/execution/types';

interface Props {
    onSelectOkr: (okr: Objective) => void;
}

export const EisenhowerVisual = ({ onSelectOkr }: Props) => {
    const { objectives } = useStrategy();

    const Quadrant = ({ title, items, color, border }: any) => (
        <div className={`flex flex-col h-full border ${border} bg-black/20 p-2 relative group overflow-hidden`}>
            <div className={`absolute top-0 left-0 px-2 py-1 text-[9px] font-bold uppercase tracking-widest ${color} bg-black/40 rounded-br`}>
                {title} <span className="opacity-50">({items.length})</span>
            </div>
            <div className="mt-6 flex-1 overflow-y-auto custom-scrollbar space-y-2">
                {items.map((okr: Objective) => (
                    <div 
                        key={okr.id}
                        onClick={() => onSelectOkr(okr)}
                        className="bg-[#1A1F2E] p-2 rounded border border-white/5 text-[10px] text-zinc-300 hover:text-white hover:border-white/20 cursor-pointer shadow-sm hover:shadow-md transition-all truncate"
                        title={okr.title}
                    >
                        {okr.title}
                    </div>
                ))}
            </div>
        </div>
    );

    // Filtros lógicos
    const doNow = objectives.filter(o => o.urgency > 50 && o.importance > 50);
    const schedule = objectives.filter(o => o.urgency <= 50 && o.importance > 50);
    const delegate = objectives.filter(o => o.urgency > 50 && o.importance <= 50);
    const eliminate = objectives.filter(o => o.urgency <= 50 && o.importance <= 50);

    return (
        <div className="grid grid-cols-2 grid-rows-2 h-full w-full gap-0.5 bg-zinc-800 rounded-lg overflow-hidden border border-zinc-800">
            {/* Top Left: HACER (Importante + Urgente) */}
            <Quadrant title="Do (Hacer Ya)" items={doNow} color="text-green-400" border="border-green-900/20 bg-green-900/5" />
            
            {/* Top Right: PLANIFICAR (Importante + No Urgente) */}
            <Quadrant title="Decide (Agendar)" items={schedule} color="text-blue-400" border="border-blue-900/20 bg-blue-900/5" />
            
            {/* Bottom Left: DELEGAR (No Importante + Urgente) */}
            <Quadrant title="Delegate (Delegar)" items={delegate} color="text-orange-400" border="border-orange-900/20 bg-orange-900/5" />
            
            {/* Bottom Right: ELIMINAR (No Importante + No Urgente) */}
            <Quadrant title="Delete (Eliminar)" items={eliminate} color="text-zinc-500" border="border-zinc-800/50 bg-zinc-900/20" />
            
            {/* Labels de Ejes Centrales */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-black border border-zinc-700 text-[8px] text-zinc-400 px-2 py-0.5 rounded-full z-10 font-mono shadow-xl pointer-events-none">
                URGENCIA ↔ IMPORTANCIA
            </div>
        </div>
    );
};