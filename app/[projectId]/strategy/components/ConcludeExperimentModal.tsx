'use client';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { calculateABTest, ABTestResult } from '@/lib/statistics'; //
import { Experiment } from '@/app/types';
import { Calculator, Trophy, AlertTriangle, ArrowRight, Lightbulb } from 'lucide-react';

export const ConcludeExperimentModal = ({ isOpen, onClose, experiment, onConclude }: { isOpen: boolean, onClose: () => void, experiment: Experiment, onConclude: (res: Partial<Experiment>) => void }) => {
  const [data, setData] = useState({
    controlVisits: 0, controlConversions: 0,
    variantVisits: 0, variantConversions: 0,
    conclusionNote: ''
  });

  const [stats, setStats] = useState<ABTestResult | null>(null);

  useEffect(() => {
    if (experiment.type === 'AB_TEST' && isOpen) {
        const result = calculateABTest(data.controlVisits, data.controlConversions, data.variantVisits, data.variantConversions);
        setStats(result);
    }
  }, [data, experiment.type, isOpen]);

  const handleSubmit = (finalResult: 'WIN' | 'LOSS' | 'INCONCLUSIVE') => {
    onConclude({
      status: 'CONCLUDED',
      result: finalResult,
      impact: experiment.type === 'AB_TEST' ? stats?.lift : 0,
      variants: experiment.type === 'AB_TEST' ? [
        { name: 'Control', traffic: 50, visitors: data.controlVisits, conversions: data.controlConversions, conversionRate: (data.controlConversions/data.controlVisits) || 0 },
        { name: 'Variante B', traffic: 50, visitors: data.variantVisits, conversions: data.variantConversions, conversionRate: (data.variantConversions/data.variantVisits) || 0 }
      ] : []
    });
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#151921] border-zinc-800 text-white sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            {experiment.type === 'AB_TEST' ? <Calculator className="text-blue-500" /> : <Lightbulb className="text-purple-500" />}
            Finalizar: {experiment.name}
          </DialogTitle>
        </DialogHeader>

        {experiment.type === 'AB_TEST' ? (
            <div className="space-y-6 py-4">
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                        <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-2 text-center">Control (A)</label>
                        <input type="number" placeholder="Visitas" className="w-full bg-black border border-zinc-700 rounded p-2 text-sm mb-2" onChange={e => setData({...data, controlVisits: Number(e.target.value)})} />
                        <input type="number" placeholder="Conv." className="w-full bg-black border border-zinc-700 rounded p-2 text-sm" onChange={e => setData({...data, controlConversions: Number(e.target.value)})} />
                    </div>
                    <div className="p-3 bg-blue-900/10 rounded-xl border border-blue-500/20">
                        <label className="text-[10px] font-bold text-blue-400 uppercase block mb-2 text-center">Variante (B)</label>
                        <input type="number" placeholder="Visitas" className="w-full bg-black border border-blue-500/30 rounded p-2 text-sm mb-2" onChange={e => setData({...data, variantVisits: Number(e.target.value)})} />
                        <input type="number" placeholder="Conv." className="w-full bg-black border border-blue-500/30 rounded p-2 text-sm" onChange={e => setData({...data, variantConversions: Number(e.target.value)})} />
                    </div>
                </div>
                {stats && (
                    <div className={`p-4 rounded-lg border flex items-center gap-4 ${stats.isSignificant ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
                        {stats.isSignificant ? <Trophy size={20} className="text-emerald-500" /> : <AlertTriangle size={20} className="text-amber-500" />}
                        <div className="flex-1">
                            <h4 className="font-bold text-sm">{stats.isSignificant ? `Ganador: ${stats.winner}` : 'Sin significancia real'}</h4>
                            <p className="text-xs text-zinc-400">Confianza: {stats.confidence}% | Lift: {stats.lift}%</p>
                        </div>
                    </div>
                )}
            </div>
        ) : (
            <div className="space-y-4 py-4">
                <div className="p-4 bg-zinc-900/50 rounded-xl border border-zinc-800">
                    <p className="text-[10px] text-zinc-500 font-bold uppercase mb-1">Criterio de éxito original:</p>
                    <p className="text-sm text-white italic">"{experiment.successCriteria || experiment.hypothesis}"</p>
                </div>
                <div className="space-y-2">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase">Resultado / Aprendizaje Alcanzado</label>
                    <textarea className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-pink-500 h-24 resize-none outline-none"
                        placeholder="Describe si se logró validar la tesis..." value={data.conclusionNote} onChange={e => setData({...data, conclusionNote: e.target.value})} />
                </div>
            </div>
        )}

        <DialogFooter className="gap-2">
          <button onClick={onClose} className="px-4 py-2 text-sm text-zinc-400 hover:text-white">Cancelar</button>
          {experiment.type === 'AB_TEST' ? (
              <button onClick={() => handleSubmit(stats?.winner === 'VARIANT' ? 'WIN' : 'LOSS')} className="bg-white text-black px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2 hover:bg-zinc-200">
                  Cerrar Test <ArrowRight size={16} />
              </button>
          ) : (
              <div className="flex flex-1 gap-2">
                  <button onClick={() => handleSubmit('LOSS')} className="flex-1 px-4 py-2 border border-zinc-800 rounded-lg text-sm text-zinc-400 hover:text-red-400 hover:bg-red-500/5 transition-all">No Validado</button>
                  <button onClick={() => handleSubmit('WIN')} className="flex-1 px-4 py-2 bg-emerald-600 text-white rounded-lg text-sm font-bold hover:bg-emerald-500 transition-all">Validado con Éxito</button>
              </div>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};