'use client';

import { Activity } from 'lucide-react';
import { LeverCard } from './LeverCard';

interface Props {
    levers: any[]; // Recibe las palancas enriquecidas
    onLaunchTest: (lever: any) => void;
}

export const LeverMonitor = ({ levers, onLaunchTest }: Props) => {
  
  if (levers.length === 0) {
      return (
        <div className="col-span-full py-12 border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-500">
            <Activity size={48} className="mb-4 opacity-20" />
            <p className="font-medium text-zinc-400">No hay palancas definidas aún.</p>
            <p className="text-sm">Usa el botón "Definir Nueva Palanca" arriba para comenzar.</p>
        </div>
      );
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {levers.map((lever) => (
           <LeverCard key={lever.id} lever={lever} onLaunchTest={onLaunchTest} />
        ))}
    </div>
  );
};