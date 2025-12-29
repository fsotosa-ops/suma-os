'use client';

import { useState } from 'react';
import { useProjectAdapter } from '@/app/hooks/useProjectAdapter';
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, Layers } from 'lucide-react';

export default function RevOpsMonitorPage() {
  const { strategyView } = useProjectAdapter();
  // ESTADO: Incluimos 1Y y ALL para análisis de largo plazo
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('6M');

  // Obtenemos las palancas calculadas dinámicamente según el rango seleccionado
  const enrichedLevers = strategyView.getLeversByRange(timeRange);

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header con Control de Tiempo */}
      <div className="flex flex-col sm:flex-row justify-between items-end border-b border-zinc-800 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
            <Activity className="text-blue-500" /> Monitor RevOps
          </h1>
          <p className="text-zinc-500 mt-1">Impacto real de la tecnología en el crecimiento del negocio.</p>
        </div>
        
        {/* Selector Temporal (Tabs) */}
        <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
            {['1M', '3M', '6M', '1Y', 'ALL'].map((range) => (
                <button
                    key={range}
                    onClick={() => setTimeRange(range as any)}
                    className={`px-4 py-1.5 text-xs font-medium rounded-md transition-all ${
                        timeRange === range 
                        ? 'bg-zinc-800 text-white shadow-sm' 
                        : 'text-zinc-500 hover:text-zinc-300'
                    }`}
                >
                    {range}
                </button>
            ))}
        </div>
      </div>

      {/* Grid de Palancas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {enrichedLevers.map((lever) => (
          <Card key={lever.id} className="bg-[#0f1115] border-zinc-800 overflow-hidden group hover:border-zinc-700 transition-all">
            
            {/* Header de la Tarjeta */}
            <div className="p-6 border-b border-zinc-800/50 flex justify-between items-start">
                <div>
                    <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-lg font-semibold text-zinc-100">{lever.name}</h3>
                        <span className={`text-[10px] px-2 py-0.5 rounded border ${lever.type === 'GROWTH' ? 'bg-emerald-900/20 text-emerald-400 border-emerald-900' : 'bg-blue-900/20 text-blue-400 border-blue-900'}`}>
                            {lever.type}
                        </span>
                    </div>
                    <p className="text-xs text-zinc-500">KPI: {lever.kpiName}</p>
                </div>
                
                {/* EL IMPACT SCORE */}
                <div className="flex flex-col items-end">
                    <div className="flex items-center gap-1.5">
                        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Impact Score</span>
                        <div className={`w-2 h-2 rounded-full ${lever.analytics.score > 70 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]' : lever.analytics.score > 40 ? 'bg-yellow-500' : 'bg-red-500'}`} />
                    </div>
                    <span className="text-3xl font-mono font-bold text-white tracking-tighter">
                        {lever.analytics.score}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-3 h-48">
                
                {/* Columna Izquierda: Datos Numéricos */}
                <div className="col-span-1 border-r border-zinc-800/50 p-5 flex flex-col justify-between bg-zinc-900/20">
                    <div>
                        <span className="text-xs text-zinc-500 block mb-1">Valor Actual</span>
                        <div className="flex items-baseline gap-1">
                            <span className="text-2xl font-bold text-white">{lever.kpiCurrent}{lever.kpiUnit}</span>
                            <span className={`text-xs font-medium flex items-center ${lever.trend.direction === 'up' ? 'text-emerald-500' : 'text-red-500'}`}>
                                {lever.trend.direction === 'up' ? <ArrowUpRight size={12}/> : <ArrowDownRight size={12}/>}
                                {lever.trend.percentage}%
                            </span>
                        </div>
                    </div>
                    
                    <div className="space-y-3">
                        <div>
                            <div className="flex justify-between text-[10px] text-zinc-500 mb-1">
                                <span>Tech Progress</span>
                                <span>{lever.analytics.techProgress}%</span>
                            </div>
                            <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                                <div className="h-full bg-indigo-500" style={{ width: `${lever.analytics.techProgress}%` }} />
                            </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-[10px] text-zinc-400">
                            <Layers size={12} /> 
                            <span>{lever.analytics.investment} pts invertidos</span>
                        </div>
                    </div>
                </div>

                {/* Columna Derecha: Gráfico Histórico */}
                <div className="col-span-2 p-4 relative">
                    <div className="absolute top-4 right-4 z-10">
                        <span className="text-[10px] font-medium text-zinc-500 bg-zinc-900/80 px-2 py-1 rounded border border-zinc-800">
                            Trend ({timeRange})
                        </span>
                    </div>
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={lever.historyView}>
                            <defs>
                                <linearGradient id={`grad-${lever.id}`} x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                                    <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                                </linearGradient>
                            </defs>
                            <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                            <XAxis dataKey="date" hide />
                            <Tooltip 
                                contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a', borderRadius: '8px', fontSize: '12px' }}
                                itemStyle={{ color: '#fff' }}
                            />
                            <Area 
                                type="monotone" 
                                dataKey="value" 
                                stroke="#6366f1" 
                                strokeWidth={2}
                                fillOpacity={1} 
                                fill={`url(#grad-${lever.id})`} 
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}