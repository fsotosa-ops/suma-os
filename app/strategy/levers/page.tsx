'use client';

import { useState } from 'react';
import { useProjectAdapter } from '@/app/hooks/useProjectAdapter';
import { useProjectData } from '@/app/context/ProjectProvider';
import { Activity, FlaskConical, Play } from 'lucide-react';

// Módulos
import { LeverCreator } from './components/LeverCreator';
import { LeverMonitor } from './components/LeverMonitor';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { RevOpsLever } from '@/app/execution/types';

export default function RevOpsMonitorPage() {
  const { strategyView } = useProjectAdapter();
  const { addExperiment } = useProjectData();
  
  // Estado de Filtros
  const [timeRange, setTimeRange] = useState<'1M' | '3M' | '6M' | '1Y' | 'ALL'>('6M');
  
  // Estado del Modal de Experimento (Laboratorio)
  const [selectedLever, setSelectedLever] = useState<RevOpsLever | null>(null);
  const [newExp, setNewExp] = useState({ name: '', hypothesis: '' });

  // Datos Calculados
  const enrichedLevers = strategyView.getLeversByRange(timeRange);

  // Handler para lanzar el test
  const handleLaunchExperiment = () => {
    if (!selectedLever || !newExp.name) return;

    addExperiment({
        id: crypto.randomUUID(),
        name: newExp.name,
        leverId: selectedLever.id,
        status: 'RUNNING',
        startDate: new Date().toISOString().split('T')[0],
        // Aquí irían las variantes si tuviéramos un backend real
    });

    setSelectedLever(null);
    setNewExp({ name: '', hypothesis: '' });
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in duration-500">
      
      {/* HEADER: Título + Filtros + Creador */}
      <div className="flex flex-col sm:flex-row justify-between items-end border-b border-zinc-800 pb-6 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-zinc-100 flex items-center gap-3">
            <Activity className="text-blue-500" /> Monitor RevOps
          </h1>
          <p className="text-zinc-500 mt-1">Impacto real de la tecnología en el crecimiento del negocio.</p>
        </div>
        
        <div className="flex items-center gap-4">
            <div className="flex bg-zinc-900 p-1 rounded-lg border border-zinc-800">
                {['1M', '3M', '6M', '1Y', 'ALL'].map((range) => (
                    <button
                        key={range}
                        onClick={() => setTimeRange(range as any)}
                        className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                            timeRange === range 
                            ? 'bg-zinc-800 text-white shadow-sm' 
                            : 'text-zinc-500 hover:text-zinc-300'
                        }`}
                    >
                        {range}
                    </button>
                ))}
            </div>
            <LeverCreator />
        </div>
      </div>

      {/* MONITOR: Grid de Tarjetas */}
      <LeverMonitor 
        levers={enrichedLevers} 
        onLaunchTest={setSelectedLever} 
      />

      {/* MODAL: Laboratorio de Experimentos (Se abre al hacer click en "Crear Test" en una tarjeta) */}
      <Dialog open={!!selectedLever} onOpenChange={() => setSelectedLever(null)}>
        <DialogContent className="bg-[#151921] border-zinc-800 text-white sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="flex items-center gap-2 text-xl">
                    <FlaskConical className="text-purple-500" />
                    Diseñar Experimento
                </DialogTitle>
            </DialogHeader>

            <div className="space-y-4 py-4">
                {/* Resumen Contextual */}
                <div className="bg-zinc-900/50 p-3 rounded-lg border border-zinc-800">
                    <span className="text-xs text-zinc-500 uppercase font-bold">Palanca Objetivo</span>
                    <p className="text-sm font-medium text-white">{selectedLever?.name}</p>
                    <p className="text-xs text-zinc-400">KPI Actual: {selectedLever?.kpiCurrent}{selectedLever?.kpiUnit}</p>
                </div>

                {/* Formulario */}
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