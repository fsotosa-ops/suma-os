'use client';

import { Activity, ArrowRight, Target, Zap } from 'lucide-react';

export const BusinessLogicBridge = () => {
  return (
    <div className="bg-[#0f1113] border border-blue-500/20 rounded-xl overflow-hidden shadow-2xl shadow-blue-500/5">
      <div className="p-4 bg-blue-500/10 border-b border-blue-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Zap size={14} className="text-blue-400" />
          <span className="text-[10px] font-bold text-white uppercase tracking-widest font-mono">RevOps Logic Sync</span>
        </div>
        <span className="text-[9px] bg-blue-500 text-white px-2 py-0.5 rounded-full font-bold">LIVE LINK</span>
      </div>
      
      <div className="p-5 space-y-6">
        {/* De Negocio a Tech */}
        <div className="flex items-center justify-between gap-4">
          <div className="flex-1 space-y-1">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Business Metric</p>
            <div className="flex items-center gap-2 text-white text-xs font-semibold">
              <Target size={12} className="text-emerald-500" /> CAC Payback Period
            </div>
          </div>
          <ArrowRight size={14} className="text-slate-700" />
          <div className="flex-1 space-y-1 text-right">
            <p className="text-[10px] text-slate-500 uppercase font-bold tracking-tighter">Tech Dependency</p>
            <p className="text-white text-xs font-mono">/api/v2/attribution-engine</p>
          </div>
        </div>

        {/* Status de la implementación */}
        <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
           <div>
              <p className="text-[9px] text-slate-500 uppercase mb-1 font-mono">Implementation</p>
              <div className="w-full bg-zinc-800 h-1 rounded-full overflow-hidden">
                <div className="bg-blue-500 h-full w-[75%]" />
              </div>
           </div>
           <div className="text-right">
              <p className="text-[9px] text-slate-500 uppercase mb-1 font-mono">Data Confidence</p>
              <span className="text-[11px] text-emerald-400 font-bold">98.2%</span>
           </div>
        </div>
      </div>
    </div>
  );
};