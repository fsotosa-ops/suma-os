'use client';

import { useState } from 'react';
// CAMBIO: Importar desde el nuevo contexto de estrategia (ruta relativa correcta)
import { useStrategy } from '../context/StrategyProvider';
import { Card } from "@/components/ui/card";
import { FlaskConical, CheckCircle2, XCircle, Clock, ArrowUpRight, Search } from 'lucide-react';

export default function ExperimentsPage() {
  // CAMBIO: Usar hook de estrategia en lugar de useProjectData
  const { experiments, levers } = useStrategy();
  
  const [filter, setFilter] = useState<'ALL' | 'RUNNING' | 'CONCLUDED'>('ALL');

  // Métricas del Laboratorio
  const totalExperiments = experiments.length;
  const activeTests = experiments.filter(e => e.status === 'RUNNING').length;
  const wins = experiments.filter(e => e.result === 'WIN').length;
  const concludedCount = experiments.filter(e => e.status === 'CONCLUDED').length;
  const winRate = concludedCount > 0 ? Math.round((wins / concludedCount) * 100) : 0;

  const filteredExperiments = experiments.filter(e => {
      if (filter === 'ALL') return true;
      return e.status === filter;
  });

  const getLeverName = (leverId: string) => {
      return levers.find(l => l.id === leverId)?.name || 'Palanca Desconocida';
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* Header del Laboratorio */}
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
          <FlaskConical className="text-purple-500" /> Growth Lab
        </h1>
        <p className="text-zinc-500 mt-1">Registro central de hipótesis, experimentos y aprendizajes.</p>
      </div>

      {/* KPIs de Experimentación */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KpiCard label="Tests Activos" value={activeTests} icon={<Clock className="text-blue-500" />} />
          <KpiCard label="Total Lanzados" value={totalExperiments} icon={<FlaskConical className="text-zinc-500" />} />
          <KpiCard label="Win Rate" value={`${winRate}%`} icon={<CheckCircle2 className="text-emerald-500" />} />
          <KpiCard label="Impacto Acumulado" value="+12.4%" icon={<ArrowUpRight className="text-purple-500" />} />
      </div>

      {/* Tabla / Lista de Experimentos */}
      <div className="space-y-4">
        
        {/* Barra de Herramientas */}
        <div className="flex justify-between items-center">
            <div className="flex gap-2">
                {['ALL', 'RUNNING', 'CONCLUDED'].map((f) => (
                    <button 
                        key={f}
                        onClick={() => setFilter(f as any)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-full border transition-all ${filter === f ? 'bg-zinc-800 text-white border-zinc-700' : 'text-zinc-500 border-transparent hover:bg-zinc-900'}`}
                    >
                        {f === 'ALL' ? 'Todos' : f === 'RUNNING' ? 'En Curso' : 'Finalizados'}
                    </button>
                ))}
            </div>
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={14} />
                <input placeholder="Buscar experimento..." className="bg-zinc-900 border border-zinc-800 rounded-full pl-9 pr-4 py-1.5 text-xs text-white outline-none focus:border-zinc-700 w-64" />
            </div>
        </div>

        {/* Lista de Cards */}
        <div className="grid gap-3">
            {filteredExperiments.length > 0 ? (
                filteredExperiments.map(exp => (
                <div key={exp.id} className="group bg-zinc-900/40 border border-zinc-800 rounded-xl p-4 flex items-center justify-between hover:border-zinc-700 transition-all">
                    
                    <div className="flex items-start gap-4">
                        <div className={`mt-1 p-2 rounded-lg ${exp.status === 'RUNNING' ? 'bg-blue-500/10 text-blue-400' : 'bg-zinc-800 text-zinc-500'}`}>
                            <FlaskConical size={20} />
                        </div>
                        <div>
                            <div className="flex items-center gap-2">
                                <h3 className="text-sm font-semibold text-zinc-200">{exp.name}</h3>
                                {exp.status === 'RUNNING' && (
                                    <span className="text-[10px] bg-blue-500/10 text-blue-400 px-2 py-0.5 rounded border border-blue-500/20 animate-pulse">Running</span>
                                )}
                            </div>
                            <p className="text-xs text-zinc-500 mt-1 flex items-center gap-2">
                                <span>Palanca: {getLeverName(exp.leverId)}</span>
                                <span>•</span>
                                <span>Inicio: {exp.startDate}</span>
                            </p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        {/* Resultado */}
                        {exp.status === 'CONCLUDED' && (
                            <div className="text-right">
                                <div className={`text-xs font-bold px-2 py-1 rounded border flex items-center gap-1 ${
                                    exp.result === 'WIN' ? 'bg-emerald-900/20 text-emerald-400 border-emerald-900' :
                                    exp.result === 'LOSS' ? 'bg-red-900/20 text-red-400 border-red-900' : 
                                    'bg-zinc-800 text-zinc-400 border-zinc-700'
                                }`}>
                                    {exp.result === 'WIN' ? <CheckCircle2 size={12}/> : exp.result === 'LOSS' ? <XCircle size={12}/> : null}
                                    {exp.result}
                                </div>
                            </div>
                        )}
                        
                        {/* Impacto */}
                        <div className="text-right w-24">
                            <span className="text-[10px] text-zinc-500 uppercase font-bold block">Impacto</span>
                            <span className={`font-mono font-medium ${
                                (exp.impact || 0) > 0 ? 'text-emerald-400' : (exp.impact || 0) < 0 ? 'text-red-400' : 'text-zinc-400'
                            }`}>
                                {(exp.impact || 0) > 0 ? '+' : ''}{exp.impact || 0}%
                            </span>
                        </div>
                    </div>

                </div>
                ))
            ) : (
                <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl">
                    <p className="text-zinc-500 text-sm">No hay experimentos en esta vista.</p>
                </div>
            )}
        </div>

      </div>
    </div>
  );
}

function KpiCard({ label, value, icon }: any) {
    return (
        <Card className="bg-zinc-900/50 border-zinc-800 p-4 flex items-center justify-between">
            <div>
                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">{label}</p>
                <p className="text-2xl font-bold text-white mt-1">{value}</p>
            </div>
            <div className="p-2 bg-black/40 rounded-lg">{icon}</div>
        </Card>
    )
}