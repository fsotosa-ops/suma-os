'use client';

import { useState } from 'react';
import { useProjectData, Objective } from '@/app/context/ProjectProvider';
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Target, ArrowRight, Lightbulb, Settings2, Link as LinkIcon } from 'lucide-react';

export default function StrategyPage() {
  const { objectives, levers, updateObjective, addObjective } = useProjectData();
  const [selectedOkr, setSelectedOkr] = useState<Objective | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newOkr, setNewOkr] = useState({ title: '', target: '' });

  // Manejo de creación rápida
  const handleCreate = () => {
    if (!newOkr.title) return;
    addObjective({
      id: crypto.randomUUID(),
      title: newOkr.title,
      target: newOkr.target || 'N/A',
      progress: 0,
      status: 'On Track',
      hypothesis: '',
      connectedLeverIds: []
    });
    setNewOkr({ title: '', target: '' });
    setIsCreating(false);
  };

  // --- COMPONENTE INTERNO: Panel de Edición de Estrategia ---
  const StrategyEditor = ({ okr }: { okr: Objective }) => {
    const [hypothesis, setHypothesis] = useState(okr.hypothesis || '');
    
    // Toggle para conectar/desconectar palancas
    const toggleLever = (leverId: string) => {
        const currentIds = okr.connectedLeverIds || [];
        const newIds = currentIds.includes(leverId) 
            ? currentIds.filter(id => id !== leverId)
            : [...currentIds, leverId];
        
        updateObjective(okr.id, { connectedLeverIds: newIds });
    };

    const saveHypothesis = () => {
        updateObjective(okr.id, { hypothesis });
    };

    return (
        <div className="space-y-6">
            {/* 1. Sección Hipótesis */}
            <div className="space-y-2">
                <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                    <Lightbulb size={16} className="text-yellow-500" /> Hipótesis de Negocio
                </label>
                <textarea 
                    className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-3 text-sm text-zinc-200 min-h-[100px] focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Ej: Si reducimos el tiempo de carga un 20%, el churn bajará un 5%..."
                    value={hypothesis}
                    onChange={(e) => setHypothesis(e.target.value)}
                    onBlur={saveHypothesis}
                />
                <p className="text-[10px] text-zinc-500">Describe la lógica de negocio detrás de este objetivo.</p>
            </div>

            {/* 2. Sección Asignación de Palancas */}
            <div className="space-y-3">
                <label className="text-sm font-semibold text-zinc-300 flex items-center gap-2">
                    <Settings2 size={16} className="text-blue-500" /> Palancas Activadoras (Levers)
                </label>
                <div className="grid grid-cols-1 gap-2 max-h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    {levers.map(lever => {
                        const isConnected = okr.connectedLeverIds?.includes(lever.id);
                        return (
                            <div 
                                key={lever.id}
                                onClick={() => toggleLever(lever.id)}
                                className={`p-3 rounded-lg border cursor-pointer transition-all flex justify-between items-center ${
                                    isConnected 
                                    ? 'bg-blue-500/10 border-blue-500/50 text-blue-100' 
                                    : 'bg-zinc-900 border-zinc-800 text-zinc-500 hover:border-zinc-600'
                                }`}
                            >
                                <div className="flex flex-col">
                                    <span className="text-sm font-medium">{lever.name}</span>
                                    <span className="text-[10px] opacity-70">KPI: {lever.kpiName}</span>
                                </div>
                                {isConnected && <LinkIcon size={14} />}
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    );
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100">Matriz de Estrategia</h1>
        {/* Lógica del botón Nuevo */}
        {!isCreating && (
            <button 
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 bg-zinc-100 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors"
            >
                <Plus size={16}/> Nuevo Objetivo
            </button>
        )}
      </div>
      
      {/* Panel de Creación Rápida */}
      {isCreating && (
         <Card className="p-6 bg-zinc-950 border-zinc-800 mb-6 animate-in slide-in-from-top-2">
             <div className="flex flex-col gap-4">
                 <h3 className="text-sm font-bold text-white uppercase tracking-wider">Definir Nuevo Objetivo</h3>
                 <div className="grid grid-cols-3 gap-4">
                    <input 
                        autoFocus
                        placeholder="Título (Ej: Aumentar Retención)"
                        className="col-span-2 bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-sm text-white outline-none focus:border-blue-500"
                        value={newOkr.title}
                        onChange={e => setNewOkr({...newOkr, title: e.target.value})}
                    />
                    <input 
                        placeholder="Meta (Ej: >85%)"
                        className="bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-sm text-white outline-none focus:border-blue-500"
                        value={newOkr.target}
                        onChange={e => setNewOkr({...newOkr, target: e.target.value})}
                    />
                 </div>
                 <div className="flex justify-end gap-2 mt-2">
                   <button onClick={() => setIsCreating(false)} className="text-xs text-zinc-500 hover:text-white px-3 py-1.5">Cancelar</button>
                   <button onClick={handleCreate} className="text-xs bg-blue-600 px-4 py-1.5 rounded-lg text-white hover:bg-blue-500 font-medium">Guardar Objetivo</button>
                 </div>
             </div>
         </Card>
      )}

      <div className="space-y-4">
        {objectives.map(okr => (
            <div key={okr.id} className="group relative">
                {/* Línea conectora visual */}
                <div className="absolute left-8 top-16 bottom-0 w-0.5 bg-zinc-800 -z-10 group-last:hidden"></div>
                
                <Card 
                    onClick={() => setSelectedOkr(okr)}
                    className="p-6 bg-zinc-900/40 border-zinc-800 hover:border-zinc-600 transition-all cursor-pointer flex gap-6 items-start"
                >
                    <div className="mt-1 p-3 bg-zinc-950 rounded-xl border border-zinc-800 text-blue-500">
                        <Target size={24} />
                    </div>
                    
                    <div className="flex-1">
                        <div className="flex justify-between">
                            <h3 className="text-xl font-semibold text-zinc-100">{okr.title}</h3>
                            <span className={`px-2 py-1 rounded text-xs font-bold border ${okr.status === 'On Track' ? 'bg-emerald-900/20 text-emerald-400 border-emerald-900' : 'bg-red-900/20 text-red-400 border-red-900'}`}>
                                {okr.status}
                            </span>
                        </div>
                        
                        <div className="mt-3 flex items-start gap-3">
                            <div className="flex-1 bg-zinc-950/50 p-3 rounded-lg border border-zinc-800/50">
                                <span className="text-[10px] text-zinc-500 uppercase font-bold tracking-wider mb-1 block">Hipótesis</span>
                                <p className="text-sm text-zinc-300 italic">"{okr.hypothesis || 'Sin hipótesis definida...'}"</p>
                            </div>
                        </div>

                        {/* CORRECCIÓN AQUI: Usamos el fallback ( || []) para evitar el error de undefined */}
                        <div className="mt-4 flex gap-2 items-center flex-wrap">
                            <span className="text-xs text-zinc-500">Palancas:</span>
                            {(okr.connectedLeverIds || []).length > 0 ? (
                                levers
                                  .filter(l => (okr.connectedLeverIds || []).includes(l.id))
                                  .map(l => (
                                    <span key={l.id} className="text-[10px] px-2 py-1 bg-zinc-800 rounded-full border border-zinc-700 text-zinc-300 hover:bg-zinc-700 transition-colors">
                                        {l.name}
                                    </span>
                                ))
                            ) : (
                                <span className="text-[10px] text-zinc-600 border border-dashed border-zinc-700 px-2 py-1 rounded-full">Sin asignar</span>
                            )}
                        </div>
                    </div>

                    <div className="self-center">
                        <ArrowRight className="text-zinc-600 group-hover:text-zinc-300 transition-colors" />
                    </div>
                </Card>
            </div>
        ))}
      </div>

      {/* Modal de Edición */}
      <Dialog open={!!selectedOkr} onOpenChange={() => setSelectedOkr(null)}>
        <DialogContent className="bg-[#151921] border-zinc-800 text-white sm:max-w-xl">
            <DialogHeader>
                <DialogTitle className="text-xl">{selectedOkr?.title}</DialogTitle>
            </DialogHeader>
            {selectedOkr && <StrategyEditor okr={selectedOkr} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}