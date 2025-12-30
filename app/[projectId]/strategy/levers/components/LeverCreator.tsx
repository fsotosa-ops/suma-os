'use client';

import { useState } from 'react';
import { useParams } from 'next/navigation'; // <--- 1. IMPORTAR USEPARAMS
// 2. CORREGIR RUTA DEL PROVIDER
import { useStrategy } from '@/app/[projectId]/strategy/context/StrategyProvider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Plus, Target, Settings2 } from 'lucide-react';
import { RevOpsLever } from '@/app/types';

export const LeverCreator = () => {
  const { addLever } = useStrategy();
  const params = useParams();
  const projectId = params?.projectId as string || 'suma-os'; // Obtener ID del proyecto

  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'GROWTH',
    kpiName: '',
    kpiTarget: '',
    kpiUnit: '%'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newLever: RevOpsLever = {
      id: crypto.randomUUID(),
      projectId: projectId, // <--- 3. ASIGNAR EL PROYECTO ACTUAL
      name: formData.name,
      type: formData.type as 'GROWTH' | 'EFFICIENCY' | 'RETENTION',
      kpiName: formData.kpiName,
      kpiTarget: Number(formData.kpiTarget),
      kpiCurrent: 0,
      kpiUnit: formData.kpiUnit,
      history: [],
      analytics: { score: 0, techProgress: 0 }
    };

    addLever(newLever);
    setOpen(false);
    setFormData({ name: '', type: 'GROWTH', kpiName: '', kpiTarget: '', kpiUnit: '%' });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20">
          <Plus size={18} />
          Nueva Palanca
        </button>
      </DialogTrigger>
      
      <DialogContent className="bg-[#151921] border-zinc-800 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
            <Settings2 className="text-blue-500" /> Configurar Palanca
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase">Nombre de la Palanca</label>
                <input 
                    required
                    placeholder="Ej: Optimización Checkout"
                    className="w-full bg-black border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:border-blue-500 outline-none"
                    value={formData.name}
                    onChange={e => setFormData({...formData, name: e.target.value})}
                />
            </div>
            <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase">Tipo de Estrategia</label>
                <select 
                    className="w-full bg-black border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:border-blue-500 outline-none"
                    value={formData.type}
                    onChange={e => setFormData({...formData, type: e.target.value})}
                >
                    <option value="GROWTH">Growth (Crecimiento)</option>
                    <option value="EFFICIENCY">Efficiency (Costos)</option>
                    <option value="RETENTION">Retention (Churn)</option>
                </select>
            </div>
          </div>

          <div className="p-4 bg-zinc-900/50 rounded-xl border border-dashed border-zinc-800 space-y-4">
            <div className="flex items-center gap-2 text-blue-400 mb-2">
                <Target size={16} />
                <span className="text-xs font-bold uppercase">Configuración de KPI</span>
            </div>
            
            <div className="space-y-2">
                <label className="text-xs font-bold text-zinc-500 uppercase">Métrica Principal (North Star)</label>
                <input 
                    required
                    placeholder="Ej: Tasa de Conversión"
                    className="w-full bg-black border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:border-blue-500 outline-none"
                    value={formData.kpiName}
                    onChange={e => setFormData({...formData, kpiName: e.target.value})}
                />
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase">Objetivo (Target)</label>
                    <input 
                        required
                        type="number"
                        placeholder="0.00"
                        className="w-full bg-black border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:border-blue-500 outline-none"
                        value={formData.kpiTarget}
                        onChange={e => setFormData({...formData, kpiTarget: e.target.value})}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase">Unidad</label>
                    <select 
                        className="w-full bg-black border border-zinc-700 rounded-lg p-2.5 text-sm text-white focus:border-blue-500 outline-none"
                        value={formData.kpiUnit}
                        onChange={e => setFormData({...formData, kpiUnit: e.target.value})}
                    >
                        <option value="%">% Porcentaje</option>
                        <option value="$">$ Moneda</option>
                        <option value="#"># Numérico</option>
                        <option value="x">x Multiplicador</option>
                    </select>
                </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4 border-t border-white/5">
            <button 
                type="button" 
                onClick={() => setOpen(false)}
                className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
            >
                Cancelar
            </button>
            <button 
                type="submit"
                className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20 transition-all"
            >
                Crear Palanca
            </button>
          </div>

        </form>
      </DialogContent>
    </Dialog>
  );
};