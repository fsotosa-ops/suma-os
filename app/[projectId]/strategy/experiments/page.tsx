'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import { useStrategy } from '@/app/[projectId]/strategy/context/StrategyProvider';
import { ExperimentCard } from '../components/ExperimentCard';
import { FlaskConical, Plus, Search, Beaker, Rocket, TestTube } from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { ExperimentType } from '@/app/types';

export default function GrowthLabPage() {
  const { experiments, addExperiment } = useStrategy();
  const params = useParams();
  const projectId = params?.projectId as string || 'suma-os';

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    type: 'AB_TEST' as ExperimentType,
    hypothesis: ''
  });

  const handleCreate = () => {
    if(!formData.name.trim()) return;
    
    addExperiment({
        id: crypto.randomUUID(),
        projectId: projectId,
        name: formData.name,
        type: formData.type,
        leverId: 'generic',
        status: 'DRAFT',
        startDate: '',
        hypothesis: formData.hypothesis,
        impact: 0
    });

    setFormData({ name: '', type: 'AB_TEST', hypothesis: '' });
    setIsDialogOpen(false);
  };

  return (
    <div className="w-full p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6">
            <div>
                <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 bg-pink-500/10 rounded-lg">
                        <FlaskConical className="text-pink-500" size={24} />
                    </div>
                    <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">Growth Lab</h1>
                </div>
                <p className="text-zinc-400 text-sm max-w-2xl">
                    Centro de validación científica: Gestiona desde Tests A/B hasta MVPs y Pruebas de Concepto.
                </p>
            </div>

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                    <button className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-pink-900/20">
                        <Plus size={18} /> Nuevo Experimento
                    </button>
                </DialogTrigger>
                <DialogContent className="bg-[#151921] border-zinc-800 text-white">
                    <DialogHeader>
                        <DialogTitle>Nueva Iniciativa de Validación</DialogTitle>
                    </DialogHeader>
                    
                    <div className="space-y-4 pt-4">
                        {/* Selector de Tipo */}
                        <div className="grid grid-cols-3 gap-2">
                            <TypeOption 
                                active={formData.type === 'AB_TEST'} 
                                onClick={() => setFormData({...formData, type: 'AB_TEST'})}
                                icon={<Beaker size={16} />}
                                label="A/B Test"
                            />
                            <TypeOption 
                                active={formData.type === 'MVP'} 
                                onClick={() => setFormData({...formData, type: 'MVP'})}
                                icon={<Rocket size={16} />}
                                label="MVP"
                            />
                            <TypeOption 
                                active={formData.type === 'POC'} 
                                onClick={() => setFormData({...formData, type: 'POC'})}
                                icon={<TestTube size={16} />}
                                label="PoC"
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase">Nombre</label>
                            <input 
                                className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-pink-500 outline-none"
                                placeholder="Ej: MVP de suscripción premium"
                                value={formData.name}
                                onChange={(e) => setFormData({...formData, name: e.target.value})}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-[10px] font-bold text-zinc-500 uppercase">Hipótesis de Negocio</label>
                            <textarea 
                                className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-pink-500 outline-none min-h-[80px]"
                                placeholder="Si lanzamos X, entonces ocurrirá Y porque..."
                                value={formData.hypothesis}
                                onChange={(e) => setFormData({...formData, hypothesis: e.target.value})}
                            />
                        </div>

                        <button 
                            onClick={handleCreate}
                            className="w-full bg-pink-600 hover:bg-pink-500 py-3 rounded-lg font-bold transition-colors text-sm"
                        >
                            Crear Experimento
                        </button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>

        {/* Listado de Experimentos */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {experiments.map(exp => (
                <ExperimentCard key={exp.id} experiment={exp} />
            ))}
        </div>
    </div>
  );
}

const TypeOption = ({ active, onClick, icon, label }: any) => (
    <button 
        onClick={onClick}
        className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all gap-2 ${
            active ? 'bg-pink-500/10 border-pink-500 text-pink-400' : 'bg-black border-zinc-800 text-zinc-500 hover:border-zinc-700'
        }`}
    >
        {icon}
        <span className="text-[10px] font-bold uppercase tracking-tighter">{label}</span>
    </button>
);