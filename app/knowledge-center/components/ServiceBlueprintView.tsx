'use client';

import { useState } from 'react';
import { Activity, Box, ArrowLeft, GitGraph, Target, Zap, Server, ShieldAlert, Code } from 'lucide-react';
import { useStrategy } from '@/app/strategy/context/StrategyProvider'; 
import { useExecution } from '@/app/execution/context/ExecutionProvider'; 
import { StackNavigator } from '../blueprints/components/StackBadge';

export const ServiceBlueprintView = ({ docId, onBack }: { docId: string, onBack: () => void }) => {
  const { levers } = useStrategy(); 
  const { tickets } = useExecution();

  // Determinamos si es una vista de Negocio (RevOps) o Técnica (Integrity)
  const isTechDomain = docId === 'Security Protocols' || docId === 'API Documentation' || docId === 'Data Governance';

  return (
    <div className="h-full flex flex-col animate-in fade-in slide-in-from-right-4 duration-500 bg-[#08090a]">
      {/* Barra de navegación interna */}
      <div className="px-8 py-4 border-b border-white/[0.04] flex items-center justify-between bg-white/[0.01]">
        <button onClick={onBack} className="flex items-center gap-2 text-xs text-slate-500 hover:text-white transition-colors">
          <ArrowLeft size={14} /> Back to Directory
        </button>
        <span className="text-[10px] font-mono text-blue-500 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20 uppercase font-bold tracking-tighter">
          {isTechDomain ? 'Technical Integrity Layer' : 'Operational Revenue Layer'}
        </span>
      </div>

      <div className="flex-1 grid grid-cols-12 overflow-hidden">
        {/* LADO IZQUIERDO: LOGICA DINAMICA SEGUN EL DOMINIO */}
        <div className="col-span-12 lg:col-span-6 border-r border-white/[0.06] p-8 overflow-y-auto custom-scrollbar space-y-8">
          {isTechDomain ? (
            // VISTA TECNICA: Muestra protocolos y diagramas
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400"><ShieldAlert size={20} /></div>
                  <h2 className="text-xl font-bold text-white tracking-tight">{docId} Specs</h2>
                </div>
                <div className="p-6 bg-zinc-900/40 border border-white/5 rounded-2xl space-y-4">
                    <p className="text-sm text-slate-400 font-mono italic"># Documentation Policy v2.1</p>
                    <p className="text-xs text-slate-500 leading-relaxed">
                        Este espacio define los estándares de {docId.toLowerCase()}. Todos los servicios deben cumplir con los headers de seguridad y encriptación definidos aquí.
                    </p>
                </div>
            </section>
          ) : (
            // VISTA REVOPS: Muestra Palancas de Estrategia
            <section className="space-y-6">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400"><Zap size={20} /></div>
                  <h2 className="text-xl font-bold text-white tracking-tight">{docId} Strategy</h2>
                </div>
                <div className="space-y-3">
                    <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-widest flex items-center gap-2">
                        <Target size={12} /> Connected Revenue Levers
                    </h3>
                    {levers.map(lever => (
                        <div key={lever.id} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-xl flex justify-between items-center group hover:border-blue-500/30 transition-all">
                            <span className="text-xs text-slate-200">{lever.name}</span>
                            <span className="text-[11px] font-mono text-blue-400 font-bold">{lever.kpiCurrent}{lever.kpiUnit}</span>
                        </div>
                    ))}
                </div>
            </section>
          )}
        </div>

        {/* LADO DERECHO: ENGINEERING LAYER EDITABLE */}
        <div className="col-span-12 lg:col-span-6 bg-black/20 p-8 overflow-y-auto custom-scrollbar space-y-8">
            <h2 className="text-sm font-bold text-slate-600 uppercase tracking-widest flex items-center gap-2">
               <Activity size={16} /> Engineering Infrastructure
            </h2>
            
            {/* AQUÍ CARGAMOS EL COMPONENTE EDITABLE DE ABAJO */}
            <StackNavigator />

            <section className="space-y-4 p-6 bg-blue-600/5 border border-blue-600/20 rounded-2xl">
               <h3 className="text-[10px] font-bold text-blue-400 uppercase tracking-widest flex items-center gap-2">
                 <GitGraph size={14} /> Active Sprint Synchronization
               </h3>
               <div className="space-y-2">
                    {tickets.filter(t => t.status !== 'DONE').slice(0, 2).map(ticket => (
                      <div key={ticket.id} className="p-3 bg-black/60 border border-white/5 rounded-lg flex justify-between items-center">
                        <span className="text-xs text-slate-300 font-medium">{ticket.title}</span>
                        <span className="text-[9px] bg-zinc-800 text-slate-500 px-2 py-0.5 rounded font-bold uppercase">{ticket.status}</span>
                      </div>
                    ))}
                </div>
            </section>
        </div>
      </div>
    </div>
  );
};