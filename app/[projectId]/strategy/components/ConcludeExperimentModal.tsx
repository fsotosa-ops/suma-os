'use client';

import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { calculateABTest, ABTestResult } from '../../../../lib/statistics';
import { Experiment } from '@/app/types';
import { Calculator, Trophy, AlertTriangle, ArrowRight } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  experiment: Experiment;
  onConclude: (result: any) => void;
}

export const ConcludeExperimentModal = ({ isOpen, onClose, experiment, onConclude }: Props) => {
  // Estado para los inputs
  const [data, setData] = useState({
    controlVisits: 0,
    controlConversions: 0,
    variantVisits: 0,
    variantConversions: 0
  });

  // Estado para el resultado calculado
  const [stats, setStats] = useState<ABTestResult | null>(null);

  // Recalcular cada vez que cambian los datos
  useEffect(() => {
    const result = calculateABTest(
      data.controlVisits, data.controlConversions,
      data.variantVisits, data.variantConversions
    );
    setStats(result);
  }, [data]);

  const handleSubmit = () => {
    if (!stats) return;
    
    // Devolvemos el objeto actualizado para guardarlo en el Provider
    onConclude({
      status: 'CONCLUDED',
      result: stats.winner === 'VARIANT' ? 'WIN' : stats.winner === 'CONTROL' ? 'LOSS' : 'INCONCLUSIVE',
      impact: stats.lift,
      variants: [
        { name: 'Control', traffic: data.controlVisits, conversions: data.controlConversions, conversionRate: (data.controlConversions/data.controlVisits) || 0 },
        { name: 'Variante B', traffic: data.variantVisits, conversions: data.variantConversions, conversionRate: (data.variantConversions/data.variantVisits) || 0 }
      ]
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#151921] border-zinc-800 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Calculator className="text-blue-500" size={20} />
            Finalizar Experimento: <span className="text-zinc-400">{experiment.name}</span>
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-2 gap-6 py-4">
          
          {/* Columna Control */}
          <div className="space-y-3 p-3 bg-zinc-900/50 rounded-xl border border-zinc-800">
            <h4 className="text-xs font-bold text-zinc-500 uppercase text-center">Versión A (Control)</h4>
            <div>
              <label className="text-xs text-zinc-400">Visitantes</label>
              <input 
                type="number" 
                className="w-full bg-black border border-zinc-700 rounded p-2 text-sm text-right"
                value={data.controlVisits}
                onChange={e => setData({...data, controlVisits: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="text-xs text-zinc-400">Conversiones</label>
              <input 
                type="number" 
                className="w-full bg-black border border-zinc-700 rounded p-2 text-sm text-right"
                value={data.controlConversions}
                onChange={e => setData({...data, controlConversions: Number(e.target.value)})}
              />
            </div>
            <div className="text-center text-xs text-zinc-500 pt-1">
              CR: {((data.controlConversions / data.controlVisits || 0) * 100).toFixed(2)}%
            </div>
          </div>

          {/* Columna Variante */}
          <div className="space-y-3 p-3 bg-blue-900/10 rounded-xl border border-blue-500/20">
            <h4 className="text-xs font-bold text-blue-400 uppercase text-center">Versión B (Variante)</h4>
            <div>
              <label className="text-xs text-blue-200/50">Visitantes</label>
              <input 
                type="number" 
                className="w-full bg-black border border-blue-500/30 rounded p-2 text-sm text-right focus:border-blue-500 outline-none"
                value={data.variantVisits}
                onChange={e => setData({...data, variantVisits: Number(e.target.value)})}
              />
            </div>
            <div>
              <label className="text-xs text-blue-200/50">Conversiones</label>
              <input 
                type="number" 
                className="w-full bg-black border border-blue-500/30 rounded p-2 text-sm text-right focus:border-blue-500 outline-none"
                value={data.variantConversions}
                onChange={e => setData({...data, variantConversions: Number(e.target.value)})}
              />
            </div>
            <div className="text-center text-xs text-blue-400 pt-1">
              CR: {((data.variantConversions / data.variantVisits || 0) * 100).toFixed(2)}%
            </div>
          </div>
        </div>

        {/* RESULTADO EN TIEMPO REAL */}
        {stats && (
          <div className={`p-4 rounded-lg border flex items-center gap-4 ${stats.isSignificant ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-yellow-500/10 border-yellow-500/20'}`}>
             <div className={`p-2 rounded-full ${stats.isSignificant ? 'bg-emerald-500/20 text-emerald-500' : 'bg-yellow-500/20 text-yellow-500'}`}>
                {stats.isSignificant ? <Trophy size={24} /> : <AlertTriangle size={24} />}
             </div>
             <div className="flex-1">
                <h4 className={`font-bold ${stats.isSignificant ? 'text-emerald-400' : 'text-yellow-400'}`}>
                  {stats.isSignificant 
                    ? `Ganador: ${stats.winner === 'VARIANT' ? 'Variante B' : 'Control'}` 
                    : 'Resultado No Concluyente'}
                </h4>
                <p className="text-xs text-zinc-400">
                  Confianza estadística: <span className="text-white font-mono">{stats.confidence}%</span>
                </p>
                <p className="text-xs text-zinc-400">
                  Impacto (Lift): <span className={`${stats.lift > 0 ? 'text-emerald-400' : 'text-red-400'} font-mono`}>{stats.lift > 0 ? '+' : ''}{stats.lift}%</span>
                </p>
             </div>
          </div>
        )}

        <DialogFooter>
          <button onClick={onClose} className="px-4 py-2 text-sm text-zinc-400 hover:text-white">Cancelar</button>
          <button 
            onClick={handleSubmit}
            disabled={!stats}
            className="bg-white text-black hover:bg-zinc-200 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2"
          >
            Confirmar Resultado <ArrowRight size={16} />
          </button>
        </DialogFooter>

      </DialogContent>
    </Dialog>
  );
};