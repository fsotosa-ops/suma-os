// app/strategy/components/StrategicMatrix.tsx
'use client';

import { useStrategy } from '../context/StrategyProvider';
import { Objective } from '@/app/execution/types';

interface Props {
  mode: 'PRIORITIZATION' | 'EISENHOWER' | 'RISK';
  onSelectOkr: (okr: Objective) => void;
  className?: string;
}

export const StrategicMatrix = ({ mode, onSelectOkr, className }: Props) => {
  const { objectives } = useStrategy();

  const theme = {
      PRIORITIZATION: {
          xKey: 'effort' as keyof Objective, yKey: 'impact' as keyof Objective,
          xLabel: 'ESFUERZO →', yLabel: 'IMPACTO →',
          quadrants: ['Quick Wins', 'Major Projects', 'Fill-ins', 'Thankless'],
          bg: 'bg-gradient-to-br from-zinc-900 via-zinc-900 to-emerald-900/20',
          border: 'border-emerald-900/30',
          bubble: 'bg-emerald-500'
      },
      EISENHOWER: {
          xKey: 'urgency' as keyof Objective, yKey: 'importance' as keyof Objective,
          xLabel: 'URGENCIA →', yLabel: 'IMPORTANCIA →',
          quadrants: ['Planificar', '¡HACER YA!', 'Eliminar', 'Delegar'],
          bg: 'bg-gradient-to-br from-zinc-900 via-zinc-900 to-blue-900/20',
          border: 'border-blue-900/30',
          bubble: 'bg-blue-500'
      },
      RISK: {
          xKey: 'riskProbability' as keyof Objective, yKey: 'riskSeverity' as keyof Objective,
          xLabel: 'PROBABILIDAD →', yLabel: 'SEVERIDAD →',
          quadrants: ['Monitorear', 'Mitigar', 'Aceptar', 'CRÍTICO'],
          bg: 'bg-gradient-to-br from-zinc-900 via-zinc-900 to-red-900/20',
          border: 'border-red-900/30',
          bubble: 'bg-red-500'
      }
  }[mode];

  return (
      <div className={`relative w-full h-full min-h-[300px] border rounded-xl overflow-hidden shadow-inner p-4 transition-all hover:shadow-lg ${theme.bg} ${theme.border} ${className}`}>
          
          {/* Fondo Cuadrícula */}
          <div className="absolute inset-0 z-0 opacity-30 pointer-events-none">
              <div className="w-full h-1/2 border-b border-zinc-500/20 border-dashed"></div>
              <div className="h-full w-1/2 border-r border-zinc-500/20 border-dashed absolute top-0 left-0"></div>
          </div>

          {/* Cuadrantes */}
          <div className="absolute top-3 left-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{theme.quadrants[0]}</div>
          <div className="absolute top-3 right-4 text-[10px] font-bold text-zinc-400 uppercase tracking-wider">{theme.quadrants[1]}</div>
          <div className="absolute bottom-3 left-4 text-[10px] font-bold text-zinc-600 uppercase tracking-wider">{theme.quadrants[2]}</div>
          <div className="absolute bottom-3 right-4 text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{theme.quadrants[3]}</div>

          {/* Ejes */}
          <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-[9px] text-zinc-500 font-mono bg-black/40 px-2 rounded backdrop-blur-sm border border-white/5">{theme.xLabel}</div>
          <div className="absolute left-1 top-1/2 -translate-y-1/2 -rotate-90 text-[9px] text-zinc-500 font-mono bg-black/40 px-2 rounded backdrop-blur-sm border border-white/5">{theme.yLabel}</div>

          {/* Burbujas */}
          {objectives.map((obj) => {
              const xVal = Number(obj[theme.xKey] || 50);
              const yVal = Number(obj[theme.yKey] || 50);
              
              return (
                <div 
                    key={obj.id}
                    onClick={() => onSelectOkr(obj)}
                    className="absolute cursor-pointer group z-10 transition-all duration-300 ease-out hover:scale-125 hover:z-50"
                    style={{ left: `${xVal}%`, bottom: `${yVal}%`, transform: 'translate(-50%, 50%)' }}
                >
                    <div className={`w-3 h-3 md:w-4 md:h-4 rounded-full border-2 border-white/10 shadow-lg ${theme.bubble}`} />
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-auto min-w-[80px] text-center opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-50">
                        <div className="bg-zinc-950 border border-zinc-800 text-white text-[9px] py-1 px-2 rounded shadow-xl whitespace-nowrap">
                            {obj.title}
                        </div>
                    </div>
                </div>
              );
          })}
      </div>
  );
};