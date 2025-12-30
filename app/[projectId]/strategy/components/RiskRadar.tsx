'use client';
import { useStrategy } from '../context/StrategyProvider';
// CORRECCIÓN: Ruta al archivo central de tipos
import { Objective } from '@/app/types';

interface Props {
    onSelectOkr: (okr: Objective) => void;
}

export const RiskRadar = ({ onSelectOkr }: Props) => {
    const { objectives } = useStrategy();

    return (
        <div className="relative w-full h-full bg-[#0F1116] rounded-lg overflow-hidden border border-zinc-800">
            <div className="absolute top-0 right-0 w-2/3 h-2/3 bg-gradient-to-bl from-red-900/20 to-transparent rounded-bl-full pointer-events-none"></div>
            
            <div className="absolute inset-0 grid grid-cols-4 grid-rows-4 divide-x divide-y divide-zinc-800/30 pointer-events-none">
                {[...Array(16)].map((_, i) => <div key={i}></div>)}
            </div>

            <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-[9px] text-zinc-500 font-mono tracking-widest bg-black/50 px-2 rounded">PROBABILIDAD →</div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] text-zinc-500 font-mono tracking-widest bg-black/50 px-2 rounded">SEVERIDAD →</div>

            {objectives.map((okr) => {
                const size = 12 + (okr.impact / 10);
                const riskScore = (okr.riskProbability * okr.riskSeverity) / 100;
                const color = riskScore > 60 ? 'bg-red-500 animate-pulse shadow-[0_0_15px_rgba(239,68,68,0.5)]' : 
                              riskScore > 30 ? 'bg-orange-500 shadow-orange-900' : 'bg-green-600 shadow-green-900';

                return (
                    <div 
                        key={okr.id}
                        onClick={() => onSelectOkr(okr)}
                        className={`absolute rounded-full border-2 border-white/10 cursor-pointer hover:scale-125 hover:z-50 transition-all shadow-lg flex items-center justify-center group ${color}`}
                        style={{
                            left: `${okr.riskProbability}%`,
                            bottom: `${okr.riskSeverity}%`,
                            width: `${size}px`,
                            height: `${size}px`,
                            transform: 'translate(-50%, 50%)'
                        }}
                    >
                        <div className="absolute -top-8 bg-black/90 text-white text-[10px] px-2 py-1 rounded border border-zinc-700 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-50">
                            {okr.title}
                            <div className="text-[8px] text-zinc-400">Riesgo: {Math.round(riskScore)}%</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};