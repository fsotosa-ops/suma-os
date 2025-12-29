'use client';
import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FlaskConical, Play } from 'lucide-react';
import { useStrategy } from '../context/StrategyProvider';

interface Props {
    isOpen: boolean;
    onClose: () => void;
}

export const CreateExperimentModal = ({ isOpen, onClose }: Props) => {
    const { levers, addExperiment } = useStrategy();
    const [newExp, setNewExp] = useState({ name: '', leverId: '', hypothesis: '' });

    const handleCreate = () => {
        if (!newExp.name || !newExp.leverId) return;
        
        // Mock de variantes iniciales
        const mockVariants = [
            { name: 'Control (A)', traffic: 50, visitors: 0, conversions: 0, conversionRate: 0 },
            { name: 'Variante (B)', traffic: 50, visitors: 0, conversions: 0, conversionRate: 0 }
        ];
  
        addExperiment({
            id: crypto.randomUUID(),
            name: newExp.name,
            leverId: newExp.leverId,
            status: 'RUNNING',
            startDate: new Date().toISOString().split('T')[0],
            variants: mockVariants
        });
        
        // Reset y cerrar
        setNewExp({ name: '', leverId: '', hypothesis: '' });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-[#151921] border-zinc-800 text-white sm:max-w-md">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-xl">
                        <FlaskConical className="text-purple-500" />
                        Nuevo Experimento
                    </DialogTitle>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-zinc-300">Nombre del Experimento</label>
                        <input 
                            className="w-full bg-black border border-zinc-700 rounded p-2 text-sm text-white focus:border-purple-500 outline-none"
                            placeholder="Ej: A/B Test Pricing Page"
                            value={newExp.name}
                            onChange={(e) => setNewExp({...newExp, name: e.target.value})}
                        />
                    </div>
                    
                    <div className="space-y-3">
                        <label className="text-sm font-medium text-zinc-300">Palanca Asociada</label>
                        <select 
                            className="w-full bg-black border border-zinc-700 rounded p-2 text-sm text-white focus:border-purple-500 outline-none"
                            value={newExp.leverId}
                            onChange={(e) => setNewExp({...newExp, leverId: e.target.value})}
                        >
                            <option value="">Seleccionar Palanca...</option>
                            {levers.map(l => (
                                <option key={l.id} value={l.id}>{l.name} ({l.type})</option>
                            ))}
                        </select>
                    </div>

                    <div className="space-y-3">
                        <label className="text-sm font-medium text-zinc-300">Hipótesis</label>
                        <textarea 
                            className="w-full bg-black border border-zinc-700 rounded p-2 text-sm text-white focus:border-purple-500 outline-none h-20 resize-none"
                            placeholder="Creemos que al cambiar X por Y..."
                            value={newExp.hypothesis}
                            onChange={(e) => setNewExp({...newExp, hypothesis: e.target.value})}
                        />
                    </div>
                </div>

                <div className="flex justify-end gap-2 pt-2">
                    <button onClick={onClose} className="px-4 py-2 text-sm text-zinc-400 hover:text-white">Cancelar</button>
                    <button onClick={handleCreate} className="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded text-sm font-medium flex items-center gap-2">
                        <Play size={14} fill="currentColor" /> Crear Test
                    </button>
                </div>
            </DialogContent>
        </Dialog>
    );
};