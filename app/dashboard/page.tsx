'use client';

import { useStrategy } from '@/app/strategy/context/StrategyProvider';
import { Card } from "@/components/ui/card";
import { AreaChart, Area, XAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from "@/lib/utils";
import { TrendingUp, Activity } from 'lucide-react';

export default function BusinessDashboardPage() {
  const { objectives, levers } = useStrategy();

  const revenueData = [
    { name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 }, { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 }, { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];

  return (
    <div className="w-full p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      
      {/* Header Ejecutivo - Columna en móvil */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Business OS</h1>
          <p className="text-zinc-400 text-sm md:text-base mt-1">Vista Ejecutiva de Rentabilidad & Estrategia</p>
        </div>
        <div className="flex flex-wrap gap-2">
            <StatusBadge label="Revenue Risk" status="safe" />
            <StatusBadge label="Tech Debt Impact" status="warning" />
        </div>
      </div>

      {/* Grid: 1 columna en móvil, 4 en desktop */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {/* MRR Chart */}
        <Card className="md:col-span-2 row-span-2 bg-[#0E1015] border-zinc-800 p-4 md:p-6 flex flex-col justify-between overflow-hidden">
            <div>
                <span className="text-zinc-500 text-[10px] md:text-xs font-bold uppercase tracking-wider">Recurring Revenue (MRR)</span>
                <div className="flex items-baseline gap-2 mt-1">
                    <h2 className="text-3xl md:text-4xl font-bold text-white">$124,500</h2>
                    <span className="text-emerald-500 text-xs md:text-sm font-medium flex items-center"><TrendingUp size={14} className="mr-1"/> +12%</span>
                </div>
            </div>
            <div className="h-40 md:h-48 w-full mt-4">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={revenueData}>
                        <defs>
                            <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <Tooltip contentStyle={{backgroundColor: '#18181b', border: 'none', borderRadius: '8px'}} />
                        <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorPv)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>

        {/* OKR Cards */}
        {objectives.map(okr => (
            <Card key={okr.id} className="md:col-span-2 bg-zinc-900/50 border-zinc-800 p-4 md:p-5 flex flex-col justify-center relative overflow-hidden group hover:border-zinc-700 transition-all">
                <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Activity size={60} />
                </div>
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-blue-400 font-mono bg-blue-400/10 px-2 py-0.5 rounded">Q1 OBJECTIVE</span>
                    <span className="text-zinc-400 text-xs">{okr.progress}%</span>
                </div>
                <h3 className="text-lg md:text-xl font-semibold text-zinc-100">{okr.title}</h3>
                <p className="text-xs md:text-sm text-zinc-500 mt-1 line-clamp-1">{okr.hypothesis}</p>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div className="bg-white h-full transition-all duration-1000" style={{width: `${okr.progress}%`}} />
                </div>
            </Card>
        ))}

        {/* Efficiency Widget */}
        <Card className="bg-[#0E1015] border-zinc-800 p-5 flex flex-col items-center">
            <span className="text-zinc-500 text-[10px] font-bold uppercase w-full">Eficiencia Operativa</span>
            <div className="mt-4 flex items-center justify-center">
                 <div className="relative w-20 h-20 md:w-24 md:h-24 flex items-center justify-center border-4 border-zinc-800 rounded-full">
                    <span className="text-xl md:text-2xl font-bold text-white">84</span>
                    <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-500 rounded-full border-t-transparent border-l-transparent transform -rotate-45"></div>
                 </div>
            </div>
            <p className="text-center text-[10px] md:text-xs text-zinc-500 mt-3">Costo por Feature entregado</p>
        </Card>
        
        {/* Levers Health */}
        <Card className="bg-[#0E1015] border-zinc-800 p-5">
             <span className="text-zinc-500 text-[10px] font-bold uppercase">Salud de Palancas</span>
             <div className="mt-4 space-y-3">
                {levers.slice(0, 3).map(l => (
                    <div key={l.id} className="flex justify-between items-center text-sm">
                        <span className="text-zinc-300 text-xs">{l.name}</span>
                        <div className={`w-2 h-2 rounded-full ${l.kpiCurrent >= l.kpiTarget ? 'bg-red-500' : 'bg-emerald-500'}`} />
                    </div>
                ))}
             </div>
        </Card>
      </div>
    </div>
  );
}

function StatusBadge({ label, status }: { label: string, status: 'safe' | 'warning' | 'critical' }) {
    const colors = {
        safe: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
        warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20',
        critical: 'bg-red-500/10 text-red-500 border-red-500/20',
    };
    return (
        <div className={cn("flex items-center gap-2 px-3 py-1 rounded-full border backdrop-blur-sm whitespace-nowrap", colors[status])}>
            <div className="w-1 h-1 rounded-full bg-current animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
        </div>
    )
}