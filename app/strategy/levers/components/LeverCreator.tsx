'use client';

import { useState } from 'react';
import { useProjectData } from '@/app/context/ProjectProvider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Target, Settings2 } from 'lucide-react';
import { RevOpsLever } from '@/app/execution/types';

export const LeverCreator = () => {
  const { addLever, objectives } = useProjectData();
  const [isOpen, setIsOpen] = useState(false);
  
  // Estado local limpio
  const [formData, setFormData] = useState({
    name: '',
    type: 'GROWTH' as RevOpsLever['type'],
    kpiName: '',
    kpiTarget: '',
    kpiUnit: '%',
    linkedObj: ''
  });

  const handleSubmit = () => {
    if (!formData.name || !formData.kpiName) return;

    addLever({
      id: crypto.randomUUID(),
      name: formData.name,
      type: formData.type,
      kpiName: formData.kpiName,
      kpiCurrent: 0, // Inicia en 0
      kpiTarget: Number(formData.kpiTarget) || 0,
      kpiUnit: formData.kpiUnit,
      history: [],
      // linkedObjectiveId ahora se maneja desde el OKR, pero si quisieras 
      // vincularlo al revés (Palanca -> OKR), podrías guardarlo aquí.
    });

    setIsOpen(false);
    setFormData({ name: '', type: 'GROWTH', kpiName: '', kpiTarget: '', kpiUnit: '%', linkedObj: '' });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <button className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium transition-all shadow-lg shadow-indigo-900/20">
          <Plus size={16} /> Definir Nueva Palanca
        </button>
      </DialogTrigger>
      
      <DialogContent className="bg-[#151921] border-zinc-800 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Settings2 className="text-indigo-500" />
            Diseñar Palanca RevOps
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          
          {/* 1. Definición Básica */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Nombre de la Estrategia</label>
            <input 
              className="w-full bg-black border border-zinc-700 rounded-lg p-2.5 text-sm text-white outline-none focus:border-indigo-500"
              placeholder="Ej: Optimización Checkout, Reducción Churn..."
              value={formData.name}
              onChange={e => setFormData({...formData, name: e.target.value})}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
             <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Tipo de Impacto</label>
                <select 
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-sm text-white outline-none"
                  value={formData.type}
                  onChange={e => setFormData({...formData, type: e.target.value as any})}
                >
                  <option value="GROWTH">🚀 Growth (Ingresos)</option>
                  <option value="EFFICIENCY">⚡ Efficiency (Costos)</option>
                  <option value="RETENTION">❤️ Retention (LTV)</option>
                </select>
             </div>
             <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Objetivo Vinculado</label>
                <select 
                  className="w-full bg-zinc-900 border border-zinc-700 rounded-lg p-2.5 text-sm text-zinc-300 outline-none"
                  value={formData.linkedObj}
                  onChange={e => setFormData({...formData, linkedObj: e.target.value})}
                >
                  <option value="">Seleccionar OKR...</option>
                  {objectives.map(o => <option key={o.id} value={o.id}>{o.title}</option>)}
                </select>
             </div>
          </div>

          {/* 2. Configuración del KPI */}
          <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800 space-y-4">
             <div className="flex items-center gap-2 text-indigo-400 mb-1">
                <Target size={16} />
                <span className="text-xs font-bold uppercase">Métrica de Éxito (KPI)</span>
             </div>
             
             <div className="grid grid-cols-3 gap-3">
                <div className="col-span-2">
                   <input 
                      placeholder="Nombre KPI (Ej: Tasa Conversión)" 
                      className="w-full bg-black border border-zinc-700 rounded p-2 text-sm text-white"
                      value={formData.kpiName}
                      onChange={e => setFormData({...formData, kpiName: e.target.value})}
                   />
                </div>
                <div className="relative">
                   <input 
                      type="number"
                      placeholder="Meta" 
                      className="w-full bg-black border border-zinc-700 rounded p-2 text-sm text-white pl-2 pr-8"
                      value={formData.kpiTarget}
                      onChange={e => setFormData({...formData, kpiTarget: e.target.value})}
                   />
                   <span className="absolute right-3 top-2 text-zinc-500 text-sm">%</span>
                </div>
             </div>
          </div>
        </div>

        <div className="flex justify-end gap-3 pt-2">
          <button onClick={() => setIsOpen(false)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white">Cancelar</button>
          <button onClick={handleSubmit} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium">Crear Palanca</button>
        </div>
      </DialogContent>
    </Dialog>
  );
};