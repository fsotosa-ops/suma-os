'use client';
import { useState } from 'react';
import { useParams } from 'next/navigation';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FlaskConical, Play, Beaker, Rocket, TestTube } from 'lucide-react';
import { useStrategy } from '../context/StrategyProvider';
import { ExperimentType } from '@/app/types';

export const CreateExperimentModal = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const { levers, addExperiment } = useStrategy();
    const params = useParams();
    const projectId = params?.projectId as string;
    
    const [formData, setFormData] = useState({ 
        name: '', 
        leverId: '', 
        hypothesis: '',
        type: 'AB_TEST' as ExperimentType 
    });

    const handleCreate = () => {
        // VALIDACIÓN: Evita lanzar si faltan datos críticos
        if (!formData.name.trim() || !formData.leverId) {
            alert("Por favor, completa el nombre y selecciona una palanca.");
            return;
        }
        
        addExperiment({
            id: crypto.randomUUID(),
            projectId: projectId,
            name: formData.name,
            type: formData.type, 
            leverId: formData.leverId,
            status: 'RUNNING',
            startDate: new Date().toISOString(),
            hypothesis: formData.hypothesis,
            impact: 0,
            // Inicializamos variantes solo si es un test A/B para la lógica estadística
            variants: formData.type === 'AB_TEST' ? [
                { name: 'Control (A)', traffic: 0, conversions: 0, visitors: 0, conversionRate: 0 },
                { name: 'Variante (B)', traffic: 0, conversions: 0, visitors: 0, conversionRate: 0 }
            ] : []
        });
        
        // Resetear y cerrar
        setFormData({ name: '', leverId: '', hypothesis: '', type: 'AB_TEST' });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#151921] border-zinc-800 text-white sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl font-bold text-white">
                        <FlaskConical className="text-pink-500" /> Nuevo Experimento
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {/* Selector de Tipo de Validación */}
                    <div className="grid grid-cols-3 gap-2">
                        <button 
                            type="button"
                            onClick={() => setFormData({...formData, type: 'AB_TEST'})}
                            className={`flex flex-col items-center p-3 rounded-xl border transition-all gap-2 ${formData.type === 'AB_TEST' ? 'bg-blue-500/10 border-blue-500 text-blue-400' : 'bg-black border-zinc-800 text-zinc-500'}`}
                        >
                            <Beaker size={18} /> <span className="text-[10px] font-bold uppercase">A/B Test</span>
                        </button>
                        <button 
                            type="button"
                            onClick={() => setFormData({...formData, type: 'MVP'})}
                            className={`flex flex-col items-center p-3 rounded-xl border transition-all gap-2 ${formData.type === 'MVP' ? 'bg-purple-500/10 border-purple-500 text-purple-400' : 'bg-black border-zinc-800 text-zinc-500'}`}
                        >
                            <Rocket size={18} /> <span className="text-[10px] font-bold uppercase">MVP</span>
                        </button>
                        <button 
                            type="button"
                            onClick={() => setFormData({...formData, type: 'POC'})}
                            className={`flex flex-col items-center p-3 rounded-xl border transition-all gap-2 ${formData.type === 'POC' ? 'bg-amber-500/10 border-amber-500 text-amber-400' : 'bg-black border-zinc-800 text-zinc-500'}`}
                        >
                            <TestTube size={18} /> <span className="text-[10px] font-bold uppercase">PoC</span>
                        </button>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Palanca Estratégica</label>
                        <select 
                            className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:border-pink-500 outline-none"
                            value={formData.leverId}
                            onChange={(e) => setFormData({...formData, leverId: e.target.value})}
                        >
                            <option value="">Seleccionar Palanca...</option>
                            {levers.map(l => (
                                <option key={l.id} value={l.id}>{l.name} ({l.type})</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Nombre del Experimento</label>
                        <input 
                            className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:border-pink-500 outline-none"
                            placeholder="Ej: Rediseño del flujo de pago"
                            value={formData.name}
                            onChange={(e) => setFormData({...formData, name: e.target.value})}
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Hipótesis / Objetivo</label>
                        <textarea 
                            className="w-full bg-black border border-zinc-800 rounded-lg p-2.5 text-sm text-white focus:border-pink-500 h-24 resize-none outline-none"
                            placeholder="Si cambiamos X, entonces ocurrirá Y porque..."
                            value={formData.hypothesis}
                            onChange={(e) => setFormData({...formData, hypothesis: e.target.value})}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Cancelar</button>
                    <button 
                        type="button"
                        onClick={handleCreate} 
                        className="bg-pink-600 hover:bg-pink-500 text-white px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-pink-900/20"
                    >
                        <Play size={14} fill="currentColor" /> Lanzar Test
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};