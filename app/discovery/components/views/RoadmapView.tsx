'use client';

import { DiscoveryIdea } from '@/app/types';
import { useDiscovery } from '../../context/DiscoveryProvider';
import { CalendarDays, MoreHorizontal } from 'lucide-react';

// En un caso real, esto sería un campo en la DB. Por ahora lo simulamos o usamos 'status'
// Para este ejemplo, asumiremos que 'status' mapea a columnas, o agregaremos lógica visual.
// Vamos a usar el status para simular el roadmap:
// DRAFT -> LATER
// DISCOVERY -> NEXT
// VALIDATED -> NOW

const COLUMN_MAP: Record<string, string[]> = {
  'NOW': ['VALIDATED', 'READY_FOR_DEV'],
  'NEXT': ['DISCOVERY', 'VALIDATING'],
  'LATER': ['DRAFT', 'PARKED']
};

export const RoadmapView = ({ ideas, onSelect }: { ideas: DiscoveryIdea[], onSelect: (id: string) => void }) => {
  
  const getIdeasByHorizon = (horizon: string) => {
    return ideas.filter(i => COLUMN_MAP[horizon].includes(i.status));
  };

  return (
    <div className="grid grid-cols-3 gap-6 h-full min-h-[500px]">
      <RoadmapColumn title="Now (Ahora)" subtitle="En validación activa" ideas={getIdeasByHorizon('NOW')} color="border-emerald-500/50" onSelect={onSelect} />
      <RoadmapColumn title="Next (Siguiente)" subtitle="Investigación pendiente" ideas={getIdeasByHorizon('NEXT')} color="border-blue-500/50" onSelect={onSelect} />
      <RoadmapColumn title="Later (Después)" subtitle="Backlog de oportunidades" ideas={getIdeasByHorizon('LATER')} color="border-zinc-700" onSelect={onSelect} />
    </div>
  );
};

const RoadmapColumn = ({ title, subtitle, ideas, color, onSelect }: any) => (
  <div className="flex flex-col h-full bg-zinc-900/20 rounded-xl border border-zinc-800 overflow-hidden">
    <div className={`p-4 border-b border-zinc-800 border-t-4 ${color} bg-zinc-900/50`}>
      <h3 className="font-bold text-zinc-200">{title}</h3>
      <p className="text-xs text-zinc-500">{subtitle}</p>
    </div>
    <div className="flex-1 p-3 space-y-3 overflow-y-auto custom-scrollbar">
      {ideas.length === 0 && <div className="text-center py-10 text-zinc-600 text-xs italic">Sin iniciativas</div>}
      {ideas.map((idea: DiscoveryIdea) => (
        <div 
          key={idea.id} 
          onClick={() => onSelect(idea.id)}
          className="bg-[#0B0E14] border border-zinc-800 p-4 rounded-lg hover:border-zinc-600 cursor-pointer group shadow-sm hover:shadow-md transition-all"
        >
          <div className="flex justify-between items-start mb-2">
             <span className="text-[10px] font-bold text-zinc-500 bg-zinc-900 px-2 py-0.5 rounded">{idea.status}</span>
             <MoreHorizontal size={14} className="text-zinc-600 opacity-0 group-hover:opacity-100"/>
          </div>
          <h4 className="text-sm font-medium text-zinc-200 leading-tight">{idea.title}</h4>
          <div className="mt-3 flex items-center gap-2 text-[10px] text-zinc-500">
             <CalendarDays size={12} />
             <span>{idea.updatedAt}</span>
          </div>
        </div>
      ))}
    </div>
  </div>
);