'use client';

import { useStrategy } from '@/app/strategy/context/StrategyProvider';
import { useDiscovery } from '@/app/discovery/context/DiscoveryProvider';
import { useExecution } from '@/app/execution/context/ExecutionProvider'; // IMPORTANTE
import { Card } from "@/components/ui/card";
import { AreaChart, Area, Tooltip, ResponsiveContainer } from 'recharts';
import { cn } from "@/lib/utils";
import { TrendingUp, Activity, Lightbulb, Microscope, Zap, AlertCircle, Clock } from 'lucide-react';

export default function BusinessDashboardPage() {
  const { objectives, levers } = useStrategy();
  const { ideas } = useDiscovery();
  const { sprints, tickets } = useExecution(); // NUEVO

  // 1. KPIs Discovery
  const totalInDiscovery = ideas.filter(i => i.status === 'DISCOVERY' || i.status === 'DRAFT').length;
  const highImpactReady = ideas.filter(i => i.status === 'VALIDATED' && i.impact >= 70).length;

  // 2. KPIs Ejecución (Sprint Actual)
  const currentSprint = sprints.find(s => s.isActive) || sprints[0];
  const sprintTickets = currentSprint ? tickets.filter(t => t.sprintId === currentSprint.id) : [];
  const blockedCount = sprintTickets.filter(t => t.status === 'BLOCKED').length;
  const doneCount = sprintTickets.filter(t => t.status === 'DONE').length;
  const sprintProgress = sprintTickets.length > 0 ? Math.round((doneCount / sprintTickets.length) * 100) : 0;

  // 3. Mock Data Revenue
  const revenueData = [
    { name: 'Jan', value: 4000 }, { name: 'Feb', value: 3000 },
    { name: 'Mar', value: 2000 }, { name: 'Apr', value: 2780 },
    { name: 'May', value: 1890 }, { name: 'Jun', value: 2390 },
    { name: 'Jul', value: 3490 },
  ];

  return (
    <div className="w-full p-4 md:p-8 space-y-8 animate-in fade-in duration-700">
      
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:justify-between sm:items-end">
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Business OS</h1>
          <p className="text-zinc-400 text-sm md:text-base mt-1">Vista Ejecutiva: Estrategia, Rentabilidad y Ejecución.</p>
        </div>
        <div className="flex flex-wrap gap-2">
            <StatusBadge label="Revenue Risk" status="safe" />
            <StatusBadge label="Discovery Velocity" status="warning" />
        </div>
      </div>

      {/* Grid Principal */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        
        {/* ROW 1: MRR & Discovery */}
        <Card className="md:col-span-2 row-span-2 bg-[#0E1015] border-zinc-800 p-6 flex flex-col justify-between overflow-hidden">
            <div>
                <span className="text-zinc-500 text-xs font-bold uppercase tracking-wider">Recurring Revenue (MRR)</span>
                <div className="flex items-baseline gap-2 mt-1">
                    <h2 className="text-4xl font-bold text-white">$124,500</h2>
                    <span className="text-emerald-500 text-sm font-medium flex items-center"><TrendingUp size={14} className="mr-1"/> +12%</span>
                </div>
            </div>
            <div className="h-48 w-full mt-4">
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

        <Card className="md:col-span-2 bg-[#0E1015] border-pink-900/30 p-5 flex flex-col relative overflow-hidden group hover:border-pink-500/50 transition-all">
            <div className="absolute right-0 top-0 p-4 opacity-10 text-pink-500 group-hover:scale-110 transition-transform">
                <Lightbulb size={60} />
            </div>
            <span className="text-pink-500 text-[10px] font-bold uppercase tracking-wider mb-2 flex items-center gap-2">
                <Microscope size={12} /> Product Discovery Pipeline
            </span>
            <div className="grid grid-cols-2 gap-4 mt-2">
                <div>
                    <h4 className="text-3xl font-bold text-white">{totalInDiscovery}</h4>
                    <p className="text-[10px] text-zinc-500 uppercase font-medium">Ideas en Validación</p>
                </div>
                <div className="border-l border-zinc-800 pl-4">
                    <h4 className="text-3xl font-bold text-emerald-400">{highImpactReady}</h4>
                    <p className="text-[10px] text-zinc-500 uppercase font-medium">Listas para Desarrollo (High Impact)</p>
                </div>
            </div>
            <div className="mt-4 pt-4 border-t border-pink-500/10">
                 {ideas.slice(0, 1).map(idea => (
                    <div key={idea.id} className="flex justify-between items-center text-xs">
                        <span className="text-zinc-400 truncate max-w-[200px]">{idea.title}</span>
                        <span className="text-pink-400 font-bold">{idea.status}</span>
                    </div>
                 ))}
            </div>
        </Card>

        {/* ROW 2: OKRs */}
        {objectives.slice(0, 2).map(okr => (
            <Card key={okr.id} className="md:col-span-2 bg-zinc-900/50 border-zinc-800 p-5 flex flex-col justify-center relative overflow-hidden group hover:border-zinc-700 transition-all">
                <div className="absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
                    <Activity size={60} />
                </div>
                <div className="flex justify-between items-start mb-2">
                    <span className="text-[10px] text-blue-400 font-mono bg-blue-400/10 px-2 py-0.5 rounded">Q1 OBJECTIVE</span>
                    <span className="text-zinc-400 text-xs">{okr.progress}%</span>
                </div>
                <h3 className="text-xl font-semibold text-zinc-100">{okr.title}</h3>
                <p className="text-sm text-zinc-500 mt-1 line-clamp-1">{okr.hypothesis}</p>
                <div className="w-full bg-zinc-800 h-1.5 rounded-full mt-4 overflow-hidden">
                    <div className="bg-white h-full transition-all duration-1000" style={{width: `${okr.progress}%`}} />
                </div>
            </Card>
        ))}

        {/* ROW 3: Operations & Execution Pulse */}
        <Card className="bg-[#0E1015] border-zinc-800 p-5 flex flex-col items-center justify-center">
            <span className="text-zinc-500 text-[10px] font-bold uppercase w-full text-center mb-2">Eficiencia Operativa</span>
            <div className="relative w-20 h-20 flex items-center justify-center border-4 border-zinc-800 rounded-full">
                <span className="text-xl font-bold text-white">84</span>
                <div className="absolute top-0 left-0 w-full h-full border-4 border-emerald-500 rounded-full border-t-transparent border-l-transparent transform -rotate-45"></div>
            </div>
            <p className="text-center text-[10px] text-zinc-500 mt-2">Score de Entrega</p>
        </Card>
        
        <Card className="bg-[#0E1015] border-zinc-800 p-5">
             <span className="text-zinc-500 text-[10px] font-bold uppercase block mb-3">Salud de Palancas</span>
             <div className="space-y-3">
                {levers.slice(0, 3).map(l => (
                    <div key={l.id} className="flex justify-between items-center text-sm border-b border-zinc-800/50 pb-2 last:border-0 last:pb-0">
                        <span className="text-zinc-300 text-xs truncate max-w-[120px]">{l.name}</span>
                        <div className={`w-2 h-2 rounded-full ${l.kpiCurrent >= l.kpiTarget ? 'bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.5)]' : 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.5)]'}`} />
                    </div>
                ))}
             </div>
        </Card>

        {/* WIDGET NUEVO: SPRINT PULSE (Rellena el hueco) */}
        <Card className="md:col-span-2 bg-gradient-to-br from-zinc-900 to-[#0E1015] border-zinc-800 p-5 flex flex-col justify-between relative overflow-hidden group">
            {/* Fondo decorativo */}
            <div className="absolute right-0 bottom-0 w-32 h-32 bg-blue-500/5 rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="flex justify-between items-start z-10">
                <div>
                    <span className="text-blue-500 text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 mb-1">
                        <Zap size={12} /> Pulso de Ejecución
                    </span>
                    <h3 className="text-lg font-bold text-white">{currentSprint?.title || "Sin Sprint Activo"}</h3>
                    <p className="text-xs text-zinc-500 mt-1 max-w-[250px] truncate">{currentSprint?.goal}</p>
                </div>
                
                {/* Indicador de Bloqueos */}
                {blockedCount > 0 ? (
                    <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/20 px-3 py-1.5 rounded-lg animate-pulse">
                        <AlertCircle size={14} className="text-red-500" />
                        <span className="text-xs font-bold text-red-400">{blockedCount} Bloqueos</span>
                    </div>
                ) : (
                    <div className="flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/20 px-3 py-1.5 rounded-lg">
                        <Activity size={14} className="text-emerald-500" />
                        <span className="text-xs font-bold text-emerald-400">Flujo Saludable</span>
                    </div>
                )}
            </div>

            <div className="mt-4 z-10">
                <div className="flex justify-between text-xs text-zinc-400 mb-2 font-medium">
                    <span className="flex items-center gap-1"><Clock size={12}/> {currentSprint?.endDate ? '5 días restantes' : '--'}</span>
                    <span>{sprintProgress}% Completado</span>
                </div>
                <div className="w-full bg-zinc-800 h-2 rounded-full overflow-hidden">
                    <div 
                        className="bg-blue-500 h-full shadow-[0_0_10px_rgba(59,130,246,0.5)] transition-all duration-1000" 
                        style={{ width: `${sprintProgress}%` }} 
                    />
                </div>
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
            <div className="w-1.5 h-1.5 rounded-full bg-current animate-pulse shadow-sm" />
            <span className="text-[10px] font-bold uppercase tracking-wider">{label}</span>
        </div>
    )
}