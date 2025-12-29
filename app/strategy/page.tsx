'use client';

import { useState } from 'react';
import { useProjectData, Objective } from '@/app/context/ProjectProvider';
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, Target, ArrowRight, Lightbulb, Settings2, Link as LinkIcon, Check } from 'lucide-react';

export default function StrategyPage() {
  const { objectives, levers, updateObjective, addObjective } = useProjectData();
  const [selectedOkr, setSelectedOkr] = useState<Objective | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  
  // Estado extendido para la creación
  const [newOkr, setNewOkr] = useState<{
    title: string; 
    target: string; 
    connectedLeverIds: string[];
  }>({ title: '', target: '', connectedLeverIds: [] });

  const handleCreate = () => {
    if (!newOkr.title) return;
    addObjective({
      id: crypto.randomUUID(),
      title: newOkr.title,
      target: newOkr.target || 'N/A',
      progress: 0,
      status: 'On Track',
      hypothesis: '',
      connectedLeverIds: newOkr.connectedLeverIds // Guardamos las palancas seleccionadas
    });
    setNewOkr({ title: '', target: '', connectedLeverIds: [] });
    setIsCreating(false);
  };

  const toggleNewOkrLever = (leverId: string) => {
    setNewOkr(prev => {
        const exists = prev.connectedLeverIds.includes(leverId);
        return {
            ...prev,
            connectedLeverIds: exists 
                ? prev.connectedLeverIds.filter(id => id !== leverId)
                : [...prev.connectedLeverIds, leverId]
        };
    });
  };

  // ... (El componente StrategyEditor se mantiene igual que antes) ...
  const StrategyEditor = ({ okr }: { okr: Objective }) => {
     // ... (mismo código del componente interno anterior) ...
     return null; // (Placeholder para brevedad, usa el código anterior del editor)
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-bold text-zinc-100">Matriz de Estrategia</h1>
        {!isCreating && (
            <button 
                onClick={() => setIsCreating(true)}
                className="flex items-center gap-2 bg-zinc-100 text-black px-4 py-2 rounded-lg text-sm font-medium hover:bg-zinc-200 transition-colors"
            >
                <Plus size={16}/> Nuevo Objetivo
            </button>
        )}
      </div>
      
      {/* Panel de Creación Rápida MEJORADO */}
      {isCreating && (
         <Card className="p-6 bg-zinc-950 border-zinc-800 mb-6 animate-in slide-in-from-top-2">
             <div className="flex flex-col gap-6">
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 space-y-1">
                        <label className="text-xs text-zinc-500 uppercase font-bold">Título del Objetivo</label>
                        <input 
                            autoFocus
                            placeholder="Ej: Aumentar Retención en Q3"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-sm text-white outline-none focus:border-blue-500"
                            value={newOkr.title}
                            onChange={e => setNewOkr({...newOkr, title: e.target.value})}
                        />
                    </div>
                    <div className="space-y-1">
                        <label className="text-xs text-zinc-500 uppercase font-bold">Meta (KPI)</label>
                        <input 
                            placeholder="Ej: >85% Retention"
                            className="w-full bg-zinc-900 border border-zinc-800 rounded-lg p-2.5 text-sm text-white outline-none focus:border-blue-500"
                            value={newOkr.target}
                            onChange={e => setNewOkr({...newOkr, target: e.target.value})}
                        />
                    </div>
                 </div>

                 {/* SECCIÓN NUEVA: Asignar Palancas al crear */}
                 <div className="space-y-2">
                    <label className="text-xs text-zinc-500 uppercase font-bold flex items-center gap-2">
                        <LinkIcon size={12}/> Conectar Palancas (Opcional)
                    </label>
                    <div className="flex flex-wrap gap-2">
                        {levers.map(lever => {
                            const isSelected = newOkr.connectedLeverIds.includes(lever.id);
                            return (
                                <button
                                    key={lever.id}
                                    onClick={() => toggleNewOkrLever(lever.id)}
                                    className={`px-3 py-1.5 rounded-full text-xs border transition-all flex items-center gap-2 ${
                                        isSelected 
                                        ? 'bg-blue-500/20 border-blue-500 text-blue-200' 
                                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'
                                    }`}
                                >
                                    {isSelected && <Check size={10} />}
                                    {lever.name}
                                </button>
                            );
                        })}
                    </div>
                 </div>

                 <div className="flex justify-end gap-2 pt-2 border-t border-zinc-900">
                   <button onClick={() => setIsCreating(false)} className="text-xs text-zinc-500 hover:text-white px-3 py-1.5">Cancelar</button>
                   <button onClick={handleCreate} className="text-xs bg-blue-600 px-4 py-1.5 rounded-lg text-white hover:bg-blue-500 font-medium">Crear Objetivo</button>
                 </div>
             </div>
         </Card>
      )}

      <div className="space-y-4">
        {objectives.map(okr => (
            <div key={okr.id} className="group relative">
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
                        
                        {/* Palancas conectadas */}
                        <div className="mt-4 flex gap-2 items-center flex-wrap">
                            <span className="text-xs text-zinc-500">Activado por:</span>
                            {(okr.connectedLeverIds || []).length > 0 ? (
                                levers
                                  .filter(l => (okr.connectedLeverIds || []).includes(l.id))
                                  .map(l => (
                                    <span key={l.id} className="text-[10px] px-2 py-1 bg-zinc-800 rounded-full border border-zinc-700 text-zinc-300">
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

      <Dialog open={!!selectedOkr} onOpenChange={() => setSelectedOkr(null)}>
        <DialogContent className="bg-[#151921] border-zinc-800 text-white sm:max-w-xl">
            <DialogHeader>
                <DialogTitle className="text-xl">{selectedOkr?.title}</DialogTitle>
            </DialogHeader>
            {/* Aquí iría el StrategyEditor como en la versión anterior */}
        </DialogContent>
      </Dialog>
    </div>
  );
}