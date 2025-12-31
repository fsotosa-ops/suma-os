'use client';

import React, { useState } from 'react';
import { Experiment } from '@/app/types';
import { useStrategy } from '@/app/[projectId]/strategy/context/StrategyProvider';
import { ConcludeExperimentModal } from './ConcludeExperimentModal';
import { 
  FlaskConical, CheckCircle2, MoreVertical, 
  Trash2, Trophy, ThumbsDown, 
  Rocket, TestTube, Beaker
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ExperimentCardProps {
  experiment: Experiment;
}

export const ExperimentCard = ({ experiment }: ExperimentCardProps) => {
  const { updateExperiment, deleteExperiment } = useStrategy();
  const [showConcludeModal, setShowConcludeModal] = useState(false);

  // Configuración visual según el tipo
  const typeConfig = {
    AB_TEST: { label: 'A/B Test', icon: <Beaker size={14} />, color: 'text-blue-400', bg: 'bg-blue-400/10 border-blue-400/20' },
    MVP: { label: 'MVP', icon: <Rocket size={14} />, color: 'text-purple-400', bg: 'bg-purple-400/10 border-purple-400/20' },
    POC: { label: 'PoC', icon: <TestTube size={14} />, color: 'text-amber-400', bg: 'bg-amber-400/10 border-amber-400/20' }
  };

  const currentType = typeConfig[experiment.type || 'AB_TEST'];

  return (
    <>
    <div className="rounded-xl border border-zinc-800 bg-[#0d1117] p-5 hover:border-zinc-600 transition-all flex flex-col h-full group">
      
      {/* Badge de Tipo */}
      <div className={`self-start flex items-center gap-1.5 px-2 py-0.5 rounded-full mb-4 ${currentType.bg} ${currentType.color}`}>
        {currentType.icon}
        <span className="text-[9px] font-black uppercase tracking-widest">{currentType.label}</span>
      </div>

      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <h4 className="font-bold text-white text-base leading-tight mb-1 group-hover:text-pink-400 transition-colors">
            {experiment.name}
          </h4>
          <p className="text-xs text-zinc-500 line-clamp-2 italic">
            "{experiment.hypothesis || 'Sin hipótesis definida'}"
          </p>
        </div>

        <DropdownMenu>
          <DropdownMenuTrigger className="p-1 text-zinc-600 hover:text-white transition-colors outline-none">
            <MoreVertical size={18} />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-[#151921] border-zinc-800 text-white" align="end">
            <DropdownMenuItem onClick={() => setShowConcludeModal(true)}>
                <CheckCircle2 className="mr-2 h-4 w-4 text-emerald-500" /> Finalizar y Concluir
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-white/10" />
            <DropdownMenuItem className="text-red-400" onClick={() => deleteExperiment(experiment.id)}>
                <Trash2 className="mr-2 h-4 w-4" /> Eliminar
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Footer Info */}
      <div className="mt-auto pt-4 border-t border-white/5 flex items-center justify-between">
         <div className="flex items-center gap-2">
            <div className={`p-1.5 rounded-md ${experiment.status === 'RUNNING' ? 'bg-blue-500/20 text-blue-400' : 'bg-zinc-800 text-zinc-500'}`}>
                <FlaskConical size={14} className={experiment.status === 'RUNNING' ? 'animate-pulse' : ''} />
            </div>
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">{experiment.status}</span>
         </div>

         {experiment.result && (
            <div className={`flex items-center gap-1.5 text-xs font-bold ${experiment.result === 'WIN' ? 'text-emerald-500' : 'text-zinc-500'}`}>
                {experiment.result === 'WIN' ? <Trophy size={14} /> : <ThumbsDown size={14} />}
                <span>{experiment.result}</span>
            </div>
         )}
      </div>
    </div>

    <ConcludeExperimentModal 
        isOpen={showConcludeModal}
        onClose={() => setShowConcludeModal(false)}
        experiment={experiment}
        // SOLUCIÓN: Tipar el parámetro 'result' como 'Partial<Experiment>' para cumplir con TypeScript
        onConclude={(result: Partial<Experiment>) => updateExperiment(experiment.id, result)}
    />
    </>
  );
};