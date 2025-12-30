'use client';

import { useStrategy } from '@/app/strategy/context/StrategyProvider';
import { Zap } from 'lucide-react';
import { BlockContentMetric } from '@/app/types';

export const SmartMetric = ({ data }: { data: BlockContentMetric }) => {
  const { levers } = useStrategy();
  
  // Intentamos encontrar la palanca viva si hay un ID
  const liveLever = data.leverId ? levers.find(l => l.id === data.leverId) : null;

  // Usamos datos vivos o los estáticos del bloque (fallback)
  const display = {
    name: liveLever ? liveLever.name : data.name,
    value: liveLever ? `${liveLever.kpiCurrent}${liveLever.kpiUnit}` : data.value,
    target: liveLever ? `${liveLever.kpiTarget}${liveLever.kpiUnit}` : data.target
  };

  return (
    <div className="my-6 p-4 rounded-xl bg-gradient-to-r from-blue-950/30 to-transparent border border-blue-900/30 flex items-center justify-between select-none group hover:border-blue-500/30 transition-all cursor-default">
      <div className="flex items-center gap-4">
        <div className="p-2.5 bg-blue-500/10 rounded-lg text-blue-400 border border-blue-500/20 group-hover:scale-110 transition-transform">
          <Zap size={18} />
        </div>
        <div>
          <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest mb-0.5">Live Metric</p>
          <p className="text-sm text-zinc-200 font-medium">{display.name || 'KPI Desconocido'}</p>
        </div>
      </div>
      <div className="text-right">
        <div className="text-2xl font-bold text-white tracking-tight font-mono">{display.value}</div>
        {display.target && (
          <div className="text-[10px] text-zinc-500 flex items-center justify-end gap-1">
            Target: <span className="text-zinc-400">{display.target}</span>
          </div>
        )}
      </div>
    </div>
  );
};