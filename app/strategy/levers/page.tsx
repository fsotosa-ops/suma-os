'use client';

import { useState } from 'react';
import { useProjectAdapter } from '@/app/hooks/useProjectAdapter';
import { useProjectData } from '@/app/context/ProjectProvider';
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { AreaChart, Area, XAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { ArrowUpRight, ArrowDownRight, Activity, Layers, FlaskConical, Beaker, Plus, Play, CheckCircle2, XCircle } from 'lucide-react';
import { RevOpsLever } from '@/app/execution/types'; // Asegúrate de importar el tipo

export default function RevOpsMonitorPage() {
  const { strategyView } = useProjectAdapter();
  const { experiments, addExperiment } = useProjectData(); 
  
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('6M');
  
  // Estado para el modal de experimento
  const [selectedLever, setSelectedLever] = useState<RevOpsLever | null>(null);
  const [newExp, setNewExp] = useState({ name: '', hypothesis: '' });

  const enrichedLevers = strategyView.getLeversByRange(timeRange);

  const handleLaunchExperiment = () => {
    if (!selectedLever || !newExp.name) return;

    addExperiment({
        id: crypto.randomUUID(),
        name: newExp.name,
        leverId: selectedLever.id,
        status: 'RUNNING',
        startDate: new Date().toISOString().split('T')[0],
        // En un sistema real, aquí definirías las variantes A/B
    });

    setSelectedLever(null);
    setNewExp({ name: '', hypothesis: '' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-end border-b border-zinc-800 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
            <Activity className="text-blue-500" /> Monitor RevOps
          </h1>
          <p className="text-zinc-500 mt-1">Impacto real de la tecnología en el crecimiento del negocio.</p>
        </div>
        
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

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {enrichedLevers.map((lever) => {
          const activeExperiments = experiments.filter(e => e.leverId === lever.id && e.status === 'RUNNING');
          const hasActiveExp = activeExperiments.length > 0;
          
          return (
            <Card key={lever.id} className={`bg-[#0f1115] border overflow-hidden group hover:border-zinc-600 transition-all flex flex-col ${hasActiveExp ? 'border-blue-900/50 shadow-[0_0_20px_rgba(59,130,246,0.1)]' : 'border-zinc-800'}`}>
                
                {/* Header de Tarjeta */}
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
                         {/* Score Badge */}
                         <div className="flex items-center gap-2 mb-2">
                             <span className="text-xs text-zinc-500 font-mono">Impact Score</span>
                             <span className={`text-xl font-bold ${lever.analytics.score > 70 ? 'text-emerald-400' : 'text-yellow-400'}`}>
                                 {lever.analytics.score}
                             </span>
                         </div>
                    </div>
                </div>

                {/* Data Grid */}
                <div className="grid grid-cols-3 h-48 relative">
                    {/* Indicador visual si hay test corriendo */}
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
                    
                    {/* Gráfico */}
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
                                <Tooltip contentStyle={{ backgroundColor: '#18181b', border: '1px solid #27272a' }} itemStyle={{ color: '#fff' }}/>
                                <Area type="monotone" dataKey="value" stroke={hasActiveExp ? '#3b82f6' : '#6366f1'} strokeWidth={2} fillOpacity={1} fill={`url(#grad-${lever.id})`} />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                {/* Footer de Acciones - Aquí es donde "Configuras" */}
                <div className="px-5 py-3 border-t border-zinc-800/50 bg-black/20 flex justify-between items-center">
                    
                    {/* Lista de Experimentos Activos */}
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

                    {/* Botón para Configurar Nuevo Test */}
                    <button 
                        onClick={() => setSelectedLever(lever)}
                        className="text-xs flex items-center gap-2 bg-zinc-100 hover:bg-white text-zinc-900 px-3 py-1.5 rounded font-medium transition-colors"
                    >
                        <Plus size={14} /> Crear Test
                    </button>
                </div>
            </Card>
          );
        })}
      </div>

      {/* MODAL: Laboratorio de Experimentos */}
      <Dialog open={!!selectedLever} onOpenChange={() => setSelectedLever(null)}>
        <DialogContent className="bg-[#151921] border-zinc-800 text-white sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                    <FlaskConical className="text-purple-500" />
                    Diseñar Experimento
                </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
                <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                    <span className="text-xs text-zinc-500 uppercase font-bold">Palanca Objetivo</span>
                    <p className="text-sm font-medium text-white">{selectedLever?.name}</p>
                    <p className="text-xs text-zinc-400">KPI Actual: {selectedLever?.kpiCurrent}{selectedLever?.kpiUnit}</p>
                </div>

                <div className="space-y-3">
                    <label className="text-sm font-medium text-zinc-300">Nombre del Experimento</label>
                    <input 
                        className="w-full bg-black border border-zinc-700 rounded p-2 text-sm text-white focus:border-purple-500 outline-none"
                        placeholder="Ej: Checkout en 1 paso vs 3 pasos"
                        value={newExp.name}
                        onChange={(e) => setNewExp({...newExp, name: e.target.value})}
                    />
                </div>
                
                <div className="space-y-3">
                     <label className="text-sm font-medium text-zinc-300">Hipótesis (¿Qué esperamos?)</label>
                     <textarea 
                        className="w-full bg-black border border-zinc-700 rounded p-2 text-sm text-white focus:border-purple-500 outline-none h-20 resize-none"
                        placeholder="Si simplificamos el formulario, la conversión subirá un 2%..."
                        value={newExp.hypothesis}
                        onChange={(e) => setNewExp({...newExp, hypothesis: e.target.value})}
                     />
                </div>

                <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="p-3 border border-zinc-800 rounded bg-zinc-900/30">
                        <span className="text-xs text-zinc-500 font-bold block mb-1">Grupo Control (A)</span>
                        <span className="text-xs text-zinc-300">Versión Actual</span>
                    </div>
                    <div className="p-3 border border-purple-500/30 rounded bg-purple-500/5">
                        <span className="text-xs text-purple-400 font-bold block mb-1">Grupo Test (B)</span>
                        <span className="text-xs text-zinc-300">Nueva Feature (Ticket vinculado)</span>
                    </div>
                </div>
            </div>

            <div className="flex justify-end gap-2 pt-2">
                <button onClick={() => setSelectedLever(null)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white">Cancelar</button>
                <button 
                    onClick={handleLaunchExperiment}
                    className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded text-sm font-medium flex items-center gap-2"
                >
                    <Play size={14} fill="currentColor" /> Lanzar Test
                </button>
            </div>
        </DialogContent>
      </Dialog>

    </div>
  );
}