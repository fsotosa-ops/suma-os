'use client';

import { useState } from 'react';
import { useProjectAdapter } from '@/app/hooks/useProjectAdapter';
import { Card } from "@/components/ui/card";
import { Plus, Target, AlertTriangle, ArrowUpRight, TrendingUp } from 'lucide-react';

// Nuevo componente visual: Gráfico de Donut SVG ligero
const CircularProgress = ({ value, color }: { value: number, color: string }) => {
  const radius = 30;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (value / 100) * circumference;
  
  return (
    <div className="relative w-20 h-20 flex items-center justify-center">
      <svg className="transform -rotate-90 w-20 h-20">
        {/* Fondo del círculo */}
        <circle cx="40" cy="40" r={radius} stroke="currentColor" strokeWidth="6" fill="transparent" className="text-zinc-800" />
        {/* Progreso */}
        <circle 
          cx="40" cy="40" r={radius} 
          stroke="currentColor" strokeWidth="6" fill="transparent"
          strokeDasharray={circumference} 
          strokeDashoffset={offset} 
          strokeLinecap="round"
          className={`${color} transition-all duration-1000 ease-out`}
        />
      </svg>
      <span className="absolute text-sm font-bold text-zinc-100">{value}%</span>
    </div>
  );
};

export default function StrategyPage() {
  const { strategyView } = useProjectAdapter();
  const [isCreating, setIsCreating] = useState(false);
  const [newOkr, setNewOkr] = useState({ title: '', target: '', linkedTech: '' });

  const handleCreate = () => {
    if (!newOkr.title) return;
    strategyView.addObjective({
      title: newOkr.title,
      target: newOkr.target || 'N/A',
      linkedTech: newOkr.linkedTech || 'General',
      progress: 0,
      status: 'On Track'
    });
    setNewOkr({ title: '', target: '', linkedTech: '' });
    setIsCreating(false);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700">
      
      {/* Header Limpio */}
      <div className="flex justify-between items-end border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-semibold text-zinc-100">Tablero Estratégico</h1>
          <p className="text-zinc-500 mt-1">Monitor de Objetivos Trimestrales (OKRs)</p>
        </div>
        <div className="text-right hidden sm:block">
          <p className="text-sm text-zinc-400">Progreso del Q1</p>
          <div className="flex items-center gap-2 justify-end text-emerald-400 font-mono">
             <TrendingUp size={16} /> <span>On Track</span>
          </div>
        </div>
      </div>

      {/* Grid de OKRs Visuales */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {strategyView.objectives.map((okr) => {
          // Color dinámico según estado
          const statusColor = okr.status === 'On Track' ? 'text-blue-500' : okr.status === 'At Risk' ? 'text-yellow-500' : 'text-red-500';
          const borderColor = okr.status === 'At Risk' ? 'border-yellow-900/50' : 'border-zinc-800';

          return (
            <Card key={okr.id} className={`p-6 bg-zinc-900/40 border ${borderColor} hover:bg-zinc-900/60 transition-all group relative overflow-hidden`}>
              
              {/* Indicador de fondo sutil para alertas */}
              {okr.status !== 'On Track' && (
                <div className="absolute top-0 right-0 p-3 opacity-10">
                  <AlertTriangle size={100} className="text-yellow-500" />
                </div>
              )}

              <div className="flex gap-6 items-start">
                {/* 1. El Gráfico Visual */}
                <CircularProgress value={okr.progress} color={statusColor} />
                
                {/* 2. El Contenido */}
                <div className="flex-1 space-y-1">
                  <div className="flex justify-between items-start">
                    <h3 className="text-lg font-medium text-zinc-100 leading-tight">{okr.title}</h3>
                  </div>
                  <p className="text-sm text-zinc-400 font-medium">Meta: {okr.target}</p>
                  
                  {/* Chip de Estado Técnico */}
                  <div className="pt-2 flex flex-wrap gap-2">
                    <span className="text-[10px] px-2 py-1 rounded bg-zinc-800 text-zinc-400 border border-zinc-700 flex items-center gap-1">
                      <ArrowUpRight size={10} /> {okr.linkedTech}
                    </span>
                    {okr.alertMessage && (
                       <span className="text-[10px] px-2 py-1 rounded bg-red-950/50 text-red-400 border border-red-900 flex items-center gap-1 animate-pulse">
                         <AlertTriangle size={10} /> Riesgo Técnico
                       </span>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          );
        })}

        {/* Botón de Añadir (Estilo tarjeta vacía) */}
        {!isCreating ? (
           <button 
             onClick={() => setIsCreating(true)}
             className="h-full min-h-[140px] border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-600 hover:text-zinc-300 hover:border-zinc-600 hover:bg-zinc-900/20 transition-all gap-2"
           >
             <Plus size={24} />
             <span className="font-medium">Nuevo Objetivo</span>
           </button>
        ) : (
          // Mini formulario integrado en la grid
          <Card className="p-6 bg-zinc-950 border-zinc-800 flex flex-col justify-center gap-3">
             <input 
                autoFocus
                placeholder="Título del Objetivo..."
                className="bg-transparent border-b border-zinc-800 pb-2 text-zinc-200 outline-none placeholder:text-zinc-600"
                value={newOkr.title}
                onChange={e => setNewOkr({...newOkr, title: e.target.value})}
             />
             <div className="flex gap-2">
                <input 
                  placeholder="Meta (ej: +20%)"
                  className="bg-zinc-900 rounded px-2 py-1 text-xs w-1/2 outline-none text-zinc-300"
                  value={newOkr.target}
                  onChange={e => setNewOkr({...newOkr, target: e.target.value})}
                />
                 <input 
                  placeholder="Link Técnico"
                  className="bg-zinc-900 rounded px-2 py-1 text-xs w-1/2 outline-none text-zinc-300"
                  value={newOkr.linkedTech}
                  onChange={e => setNewOkr({...newOkr, linkedTech: e.target.value})}
                />
             </div>
             <div className="flex justify-end gap-2 mt-2">
               <button onClick={() => setIsCreating(false)} className="text-xs text-zinc-500 hover:text-white">Cancelar</button>
               <button onClick={handleCreate} className="text-xs bg-blue-600 px-3 py-1 rounded text-white hover:bg-blue-500">Guardar</button>
             </div>
          </Card>
        )}
      </div>
    </div>
  );
}