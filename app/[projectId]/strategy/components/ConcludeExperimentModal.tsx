'use client';
import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { calculateABTest, ABTestResult } from '@/lib/statistics'; // Motor estadístico restaurado
import { Experiment } from '@/app/types';
import { Calculator, Trophy, AlertTriangle, ArrowRight } from 'lucide-react';

export const ConcludeExperimentModal = ({ isOpen, onClose, experiment, onConclude }: any) => {
  const [data, setData] = useState({
    controlVisits: 0,
    controlConversions: 0,
    variantVisits: 0,
    variantConversions: 0
  });

  const [stats, setStats] = useState<ABTestResult | null>(null);

  // Recalcular significancia cada vez que el usuario ingresa datos
  useEffect(() => {
    if (experiment.type === 'AB_TEST') {
        const result = calculateABTest(
            data.controlVisits, data.controlConversions,
            data.variantVisits, data.variantConversions
        );
        setStats(result);
    }
  }, [data, experiment.type]);

  const handleSubmit = () => {
    const isWin = stats?.winner === 'VARIANT';
    const isLoss = stats?.winner === 'CONTROL';

    onConclude({
      status: 'CONCLUDED',
      result: isWin ? 'WIN' : isLoss ? 'LOSS' : 'INCONCLUSIVE',
      impact: stats?.lift || 0,
      variants: [
        { name: 'Control', traffic: data.controlVisits, conversions: data.controlConversions, conversionRate: (data.controlConversions/data.controlVisits) || 0, visitors: data.controlVisits },
        { name: 'Variante B', traffic: data.variantVisits, conversions: data.variantConversions, conversionRate: (data.variantConversions/data.variantVisits) || 0, visitors: data.variantVisits }
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
            Finalizar y Analizar: {experiment.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
            <div className="grid grid-cols-2 gap-4">
                <div className="p-3 bg-zinc-900 rounded-xl border border-zinc-800">
                    <label className="text-[10px] font-bold text-zinc-500 uppercase block mb-2">Control (A)</label>
                    <input type="number" placeholder="Visitas" className="w-full bg-black border border-zinc-700 rounded p-2 text-sm mb-2" onChange={e => setData({...data, controlVisits: Number(e.target.value)})} />
                    <input type="number" placeholder="Conversiones" className="w-full bg-black border border-zinc-700 rounded p-2 text-sm" onChange={e => setData({...data, controlConversions: Number(e.target.value)})} />
                </div>
                <div className="p-3 bg-blue-900/10 rounded-xl border border-blue-500/20">
                    <label className="text-[10px] font-bold text-blue-400 uppercase block mb-2">Variante (B)</label>
                    <input type="number" placeholder="Visitas" className="w-full bg-black border border-blue-500/30 rounded p-2 text-sm mb-2" onChange={e => setData({...data, variantVisits: Number(e.target.value)})} />
                    <input type="number" placeholder="Conversiones" className="w-full bg-black border border-blue-500/30 rounded p-2 text-sm" onChange={e => setData({...data, variantConversions: Number(e.target.value)})} />
                </div>
            </div>

            {stats && (
                <div className={`p-4 rounded-lg border flex items-center gap-4 transition-all ${stats.isSignificant ? 'bg-emerald-500/10 border-emerald-500/20' : 'bg-amber-500/10 border-amber-500/20'}`}>
                     <div className={`p-2 rounded-full ${stats.isSignificant ? 'bg-emerald-500/20 text-emerald-500' : 'bg-amber-500/20 text-amber-500'}`}>
                        {stats.isSignificant ? <Trophy size={20} /> : <AlertTriangle size={20} />}
                     </div>
                     <div>
                        <h4 className="font-bold text-sm">{stats.isSignificant ? `Ganador: ${stats.winner === 'VARIANT' ? 'Variante B' : 'Control'}` : 'Sin significancia real'}</h4>
                        <p className="text-xs text-zinc-400">Confianza: {stats.confidence}% | Lift: {stats.lift}%</p>
                     </div>
                </div>
            )}
        </div>

        <DialogFooter>
          <button onClick={handleSubmit} className="bg-white text-black hover:bg-zinc-200 px-6 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
            Confirmar y Cierre Estratégico <ArrowRight size={16} />
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};