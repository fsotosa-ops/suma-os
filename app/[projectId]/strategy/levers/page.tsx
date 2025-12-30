'use client';

import React from 'react';
import { Activity, Info } from 'lucide-react';
import { LeverMonitor } from './components/LeverMonitor';
import { LeverCreator } from './components/LeverCreator';

export default function RevOpsMonitorPage() {
  return (
    <div className="w-full p-6 md:p-8 space-y-8 animate-in fade-in duration-500">
      
      {/* Header de la Página */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-white/5 pb-6">
        <div>
           <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Activity className="text-blue-500" size={24} />
              </div>
              <h1 className="text-2xl md:text-3xl font-bold text-white tracking-tight">
                RevOps Monitor
              </h1>
           </div>
           <p className="text-zinc-400 text-sm max-w-2xl">
              Panel de control para tus Palancas de Crecimiento (Growth Levers). 
              Monitorea KPIs en tiempo real y detecta anomalías.
           </p>
        </div>
        
        {/* Botón para crear nueva palanca */}
        <div className="shrink-0">
           <LeverCreator />
        </div>
      </div>

      {/* Grid de Métricas (LeverMonitor ya maneja los datos internamente) */}
      <LeverMonitor />

    </div>
  );
}