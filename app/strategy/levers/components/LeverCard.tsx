'use client';

// CAMBIO: Importar desde StrategyProvider
import { useStrategy } from '@/app/strategy/context/StrategyProvider';
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, FlaskConical, Beaker, Plus } from 'lucide-react';

export const LeverCard = ({ lever, onLaunchTest }: { lever: any, onLaunchTest: (lever: any) => void }) => {
  // CAMBIO: Usar hook correcto
  const { experiments } = useStrategy();
  
  const activeExperiments = experiments.filter(e => e.leverId === lever.id && e.status === 'RUNNING');
  const hasActiveExp = activeExperiments.length > 0;

  return (
    <Card className={`bg-[#0f1115] border overflow-hidden group hover:border-zinc-600 transition-all flex flex-col ${hasActiveExp ? 'border-blue-900/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'border-zinc-800'}`}>
        
        {/* Header */}
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
            
            <div className="flex flex-col items-end">
                 <div className="flex items-center gap-2 mb-2">
                     <span className="text-xs text-zinc-500 font-mono">Impact Score</span>
                     <span className={`text-xl font-bold ${lever.analytics.score > 70 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                         {lever.analytics.score}
                     </span>
                 </div>
            </div>
        </div>

        {/* Cuerpo */}
        <div className="grid grid-cols-3 h-48 relative">
            {hasActiveExp && (
                <div className="absolute top-2 left-2 z-20 bg-blue-600/90 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center gap-1 animate-pulse">
                    <FlaskConical size={10} /> TEST EN CURSO
                </div>
            )}

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
                <div className="space-y-2">
                    <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                        <div className="bg-indigo-500 h-full" style={{ width: `${lever.analytics.techProgress}%` }} />
                    </div>
                    <span className="text-[10px] text-zinc-500 block text-right">{lever.analytics.techProgress}% Tech Ready</span>
                </div>
            </div>
            
            <div className="col-span-2 p-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={lever.historyView}>
                        <defs>
                            <linearGradient id={`grad-${lever.id}`} x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
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
                            stroke={hasActiveExp ? '#3b82f6' : '#6366f1'} 
                            strokeWidth={2} 
                            fillOpacity={1} 
                            fill={`url(#grad-${lever.id})`} 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </div>

        {/* Footer */}
        <div className="px-5 py-3 border-t border-zinc-800/50 bg-black/20 flex justify-between items-center">
            <div className="flex items-center gap-3">
                {activeExperiments.length > 0 ? (
                     activeExperiments.map(exp => (
                        <div key={exp.id} className="flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 px-3 py-1.5 rounded-full text-xs text-blue-300">
                            <Beaker size={12} />
                            <span className="font-medium">{exp.name}</span>
                        </div>
                    ))
                ) : (
                    <span className="text-xs text-zinc-600 italic flex items-center gap-2">
                        <Beaker size={12} /> Sin experimentos activos
                    </span>
                )}
            </div>

            <button 
                onClick={() => onLaunchTest(lever)}
                className="text-xs flex items-center gap-2 bg-zinc-100 hover:bg-white text-zinc-900 px-3 py-1.5 rounded font-medium transition-colors"
            >
                <Plus size={14} /> Crear Test
            </button>
        </div>
    </Card>
  );
};