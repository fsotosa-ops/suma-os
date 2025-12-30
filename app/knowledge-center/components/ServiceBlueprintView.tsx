'use client';

import { Activity, Box, ArrowLeft, GitGraph, Target, Zap, Server } from 'lucide-react';
import { useStrategy } from '@/app/strategy/context/StrategyProvider'; //
import { useExecution } from '@/app/execution/context/ExecutionProvider'; //

export const ServiceBlueprintView = ({ docId, onBack }: { docId: string, onBack: () => void }) => {
  const { levers } = useStrategy(); // Trae palancas de RevOps
  const { tickets } = useExecution(); // Trae tareas técnicas

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-500 bg-[#08090a]">
      
      {/* Header de Sincronización */}
      <div className="px-8 py-4 border-b border-white/[0.04] flex items-center justify-between bg-white/[0.01]">
        <button onClick={onBack} className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Volver al Directorio
        </button>
        <div className="flex items-center gap-3">
          <span className="text-[10px] font-mono text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 uppercase font-bold tracking-tighter">
            Operational Bridge Active
          </span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        
        {/* COLUMNA REVOPS (Strategy Context) */}
        <div className="col-span-12 lg:col-span-6 border-r border-white/[0.06] p-8 overflow-y-auto custom-scrollbar space-y-8">
          <section className="space-y-4">
            <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
               <Zap className="text-yellow-400" size={20} /> Business Logic: {docId}
            </h2>
            <p className="text-sm text-slate-400 leading-relaxed font-sans">
              Define la regla de negocio y las palancas de crecimiento impactadas por esta arquitectura.
            </p>
          </section>

          {/* Datos reales de Strategy Levers */}
          <div className="space-y-3">
            <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2 font-mono">
              <Target size={12} /> Strategic Levers Impacted
            </h3>
            <div className="grid grid-cols-1 gap-2">
               {levers.slice(0, 2).map(lever => (
                 <div key={lever.id} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl flex justify-between items-center group hover:border-blue-500/30 transition-all">
                    <div className="flex flex-col">
                        <span className="text-xs text-slate-200 font-medium">{lever.name}</span>
                        <span className="text-[10px] text-slate-500 font-mono">{lever.type}</span>
                    </div>
                    <div className="text-right">
                        <span className="text-[11px] font-mono text-blue-400 font-bold block">{lever.kpiCurrent}{lever.kpiUnit}</span>
                        <span className="text-[9px] text-slate-600 uppercase">Current Value</span>
                    </div>
                 </div>
               ))}
            </div>
          </div>
        </div>

        {/* COLUMNA DEVTECH (Execution Context) */}
        <div className="col-span-12 lg:col-span-6 bg-black/20 p-8 overflow-y-auto custom-scrollbar space-y-8">
          <h2 className="text-xl font-bold text-white tracking-tight flex items-center gap-2 font-sans">
             <Box className="text-purple-400" size={20} /> Infrastructure & Technical Debt
          </h2>

          {/* Sincronización real con Sprints/Tickets */}
          <section className="space-y-4 p-6 bg-blue-600/5 border border-blue-600/20 rounded-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-4 opacity-10">
                <GitGraph size={80} className="text-blue-500" />
             </div>
             
             <div className="relative z-10">
                <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2 font-mono mb-4">
                  <Activity size={14} /> Active Sprint Requirements
                </h3>
                <div className="space-y-2">
                    {tickets.filter(t => t.status !== 'DONE').slice(0, 3).map(ticket => (
                      <div key={ticket.id} className="p-3 bg-black/60 border border-white/5 rounded-lg flex justify-between items-center group hover:bg-black/80 transition-all">
                        <div className="flex flex-col">
                          <span className="text-[9px] text-blue-500 font-mono font-bold uppercase tracking-tighter">{ticket.type}</span>
                          <span className="text-xs text-slate-300 font-medium">{ticket.title}</span>
                        </div>
                        <span className={`text-[9px] px-2 py-0.5 rounded font-bold uppercase ${
                            ticket.status === 'IN_PROGRESS' ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-slate-500'
                        }`}>
                            {ticket.status.replace('_', ' ')}
                        </span>
                      </div>
                    ))}
                </div>
             </div>
          </section>

          {/* Componente de Stack (Huly Style) */}
          <section className="space-y-4">
             <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2 font-mono">
               <Server size={14} /> Cloud Ecosystem
             </h3>
             <div className="grid grid-cols-2 gap-3">
                <StackMiniCard label="AWS Lambda" status="Active" color="bg-orange-500" />
                <StackMiniCard label="Stripe Integration" status="Synced" color="bg-indigo-500" />
             </div>
          </section>
        </div>

      </div>
    </div>
  );
};

const StackMiniCard = ({ label, status, color }: any) => (
    <div className="p-3 bg-white/[0.02] border border-white/[0.06] rounded-xl flex items-center gap-3">
        <div className={`w-1.5 h-1.5 rounded-full ${color}`} />
        <div>
            <p className="text-[11px] font-medium text-slate-300">{label}</p>
            <p className="text-[9px] text-slate-600 font-mono uppercase">{status}</p>
        </div>
    </div>
);