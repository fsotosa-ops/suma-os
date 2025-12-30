'use client';

import React from 'react';
import { useStrategy } from '@/app/[projectId]/strategy/context/StrategyProvider';
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, FlaskConical } from 'lucide-react';
import { RevOpsLever } from '@/app/types';

interface LeverCardProps {
  lever: RevOpsLever;
}

export const LeverCard = ({ lever }: LeverCardProps) => {
  const { addExperiment } = useStrategy();

  const isHealthy = lever.kpiCurrent >= lever.kpiTarget;
  const lastValue = lever.history[lever.history.length - 1]?.value || 0;
  const prevValue = lever.history[lever.history.length - 2]?.value || 0;
  const isTrendingUp = lastValue >= prevValue;

  return (
    <Card className="bg-[#151921] border-zinc-800 p-5 flex flex-col justify-between group hover:border-zinc-700 transition-all duration-300">
      
      {/* HEADER: Título y Estado */}
      <div className="flex justify-between items-start mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className={`w-2 h-2 rounded-full ${isHealthy ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]'}`} />
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">{lever.type}</span>
          </div>
          <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors">{lever.name}</h3>
        </div>
        
        <div className="flex flex-col items-end">
          <div className="flex items-baseline gap-1">
             <span className="text-2xl font-bold text-white">{lever.kpiCurrent}{lever.kpiUnit}</span>
             <span className="text-xs text-zinc-500 font-medium">/ {lever.kpiTarget}{lever.kpiUnit}</span>
          </div>
          <div className={`flex items-center text-xs font-bold mt-1 ${isTrendingUp ? 'text-emerald-500' : 'text-red-500'}`}>
            {isTrendingUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
            <span>{prevValue > 0 ? Math.abs(((lastValue - prevValue) / prevValue) * 100).toFixed(1) : 0}%</span>
          </div>
        </div>
      </div>

      {/* CHART: Área */}
      <div className="h-32 w-full mb-4 relative">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={lever.history}>
            <defs>
              <linearGradient id={`gradient-${lever.id}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#333" opacity={0.3} />
            <Tooltip 
                contentStyle={{ backgroundColor: '#09090b', borderColor: '#27272a', fontSize: '12px', borderRadius: '8px' }}
                itemStyle={{ color: '#fff' }}
                labelStyle={{ display: 'none' }}
            />
            <Area 
                type="monotone" 
                dataKey="value" 
                stroke="#3b82f6" 
                strokeWidth={2}
                fill={`url(#gradient-${lever.id})`} 
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* FOOTER: Botones de Acción */}
      <div className="pt-4 border-t border-zinc-800 flex items-center justify-between mt-auto">
         <div className="flex items-center gap-2">
            <div className="bg-zinc-900 rounded px-2 py-1 text-[10px] text-zinc-400 border border-zinc-800">
                Score: <span className="text-white font-bold">{lever.analytics?.score || 0}</span>
            </div>
            <div className="bg-zinc-900 rounded px-2 py-1 text-[10px] text-zinc-400 border border-zinc-800">
                Tech: <span className="text-white font-bold">{lever.analytics?.techProgress || 0}%</span>
            </div>
         </div>

         <button 
            className="p-2 rounded-lg hover:bg-white/10 text-zinc-400 hover:text-white transition-colors"
            title="Crear Experimento"
            onClick={() => {
                // SOLUCIÓN: Agregamos la propiedad 'type' para cumplir con la interfaz Experiment
                addExperiment({
                    id: crypto.randomUUID(),
                    projectId: lever.projectId,
                    name: `Exp: Optimización ${lever.name}`,
                    type: 'AB_TEST', // <--- ESTO ES LO QUE RECLAMA TYPESCRIPT
                    leverId: lever.id,
                    status: 'DRAFT',
                    startDate: new Date().toISOString().split('T')[0],
                    hypothesis: `Si optimizamos ${lever.name}, entonces mejoraremos el KPI ${lever.kpiName}.`
                });
            }}
         >
            <FlaskConical size={16} />
         </button>
      </div>
    </Card>
  );
};