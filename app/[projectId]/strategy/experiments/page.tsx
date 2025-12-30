'use client';

import { useState } from 'react';
import { useStrategy } from '..//context/StrategyProvider';
import { FlaskConical, Plus, Search } from 'lucide-react';

// Importación de Componentes Modulares
import { ExperimentKPIs } from '..//components/ExperimentKPIs';
import { ExperimentCard } from '..//components/ExperimentCard';
import { CreateExperimentModal } from '..//components/CreateExperimentModal';

export default function ExperimentsPage() {
  const { experiments, levers } = useStrategy();
  const [filter, setFilter] = useState<'ALL' | 'RUNNING' | 'CONCLUDED'>('ALL');
  const [isCreating, setIsCreating] = useState(false);

  // Cálculos de KPIs
  const totalExperiments = experiments.length;
  const activeTests = experiments.filter(e => e.status === 'RUNNING').length;
  const wins = experiments.filter(e => e.result === 'WIN').length;
  const concludedCount = experiments.filter(e => e.status === 'CONCLUDED').length;
  const winRate = concludedCount > 0 ? Math.round((wins / concludedCount) * 100) : 0;

  // Filtrado
  const filteredExperiments = experiments.filter(e => {
      if (filter === 'ALL') return true;
      return e.status === filter;
  });

  const getLeverName = (leverId: string) => {
      return levers.find(l => l.id === leverId)?.name || 'Palanca Desconocida';
  };

  return (
    <div className="w-full h-full p-6 space-y-8 animate-in fade-in duration-500">
      
      {/* Header */}
      <div className="flex justify-between items-end border-b border-zinc-800 pb-6">
        <div>
            <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
                <FlaskConical className="text-purple-500" /> Growth Lab
            </h1>
            <p className="text-zinc-500 mt-1">Registro central de hipótesis, experimentos A/B y aprendizajes.</p>
        </div>
        
        <button 
            onClick={() => setIsCreating(true)}
            className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-purple-900/20 transition-all"
        >
            <Plus size={16}/> Nuevo Experimento
        </button>
      </div>

      {/* KPI Section */}
      <ExperimentKPIs 
        activeTests={activeTests} 
        totalExperiments={totalExperiments} 
        winRate={winRate} 
      />

      {/* Main Content */}
      <div className="space-y-4">
        {/* Toolbar */}
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

        {/* Grid */}
        <div className="grid gap-4">
            {filteredExperiments.length > 0 ? (
                filteredExperiments.map(exp => (
                    <ExperimentCard key={exp.id} exp={exp} getLeverName={getLeverName} />
                ))
            ) : (
                <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl">
                    <p className="text-zinc-500 text-sm">No hay experimentos en esta vista.</p>
                </div>
            )}
        </div>
      </div>

      {/* Modal */}
      <CreateExperimentModal isOpen={isCreating} onClose={() => setIsCreating(false)} />

    </div>
  );
}