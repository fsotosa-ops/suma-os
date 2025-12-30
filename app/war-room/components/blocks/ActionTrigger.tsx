'use client';

import { useState } from 'react';
import { useExecution } from '@/app/execution/context/ExecutionProvider';
import { BlockContentAction } from '@/app/types';
import { Play, CheckCircle2, Loader2, ArrowRight } from 'lucide-react';

export const ActionTrigger = ({ data, onUpdate }: { data: BlockContentAction, onUpdate: (newData: BlockContentAction) => void }) => {
  const { actions } = useExecution();
  const [loading, setLoading] = useState(false);

  const handleExecute = () => {
    setLoading(true);
    
    // Simulamos un pequeño delay de red para realismo
    setTimeout(() => {
        // Crear ticket real en el sistema de ejecución
        actions.createTicket({
            title: data.title,
            type: 'TASK',
            status: 'TODO',
            points: 1,
            description: 'Generado automáticamente desde War Room Session.'
        });

        // Actualizar el estado del bloque a "creado"
        onUpdate({ ...data, status: 'created', ticketId: 'new-ticket' });
        setLoading(false);
    }, 800);
  };

  if (data.status === 'created') {
    return (
        <div className="my-4 p-3 rounded-lg bg-emerald-950/30 border border-emerald-500/20 flex items-center justify-between select-none animate-in fade-in">
            <div className="flex items-center gap-3">
                <CheckCircle2 size={18} className="text-emerald-500" />
                <div>
                    <p className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest">Action Deployed</p>
                    <p className="text-sm text-zinc-300 line-through decoration-zinc-500">{data.title}</p>
                </div>
            </div>
            <button className="text-xs text-zinc-500 hover:text-white flex items-center gap-1 transition-colors">
                Ver Ticket <ArrowRight size={12}/>
            </button>
        </div>
    );
  }

  return (
    <div className="my-4 p-4 rounded-xl bg-gradient-to-r from-orange-950/20 to-transparent border border-orange-500/30 flex items-center justify-between group hover:border-orange-500/50 transition-all">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-orange-500/10 rounded-lg text-orange-500">
            <Play size={18} />
        </div>
        <div>
            <p className="text-[10px] font-bold text-orange-400 uppercase tracking-widest mb-0.5">Execution Trigger</p>
            <input 
                value={data.title}
                onChange={(e) => onUpdate({...data, title: e.target.value})}
                className="bg-transparent border-none outline-none text-sm text-white font-medium w-full placeholder:text-zinc-600 focus:ring-0 p-0"
                placeholder="Describe la acción a tomar..."
            />
        </div>
      </div>
      <button 
        onClick={handleExecute}
        disabled={!data.title || loading}
        className="px-4 py-2 bg-orange-600 hover:bg-orange-500 text-white text-xs font-bold rounded-lg transition-all shadow-lg shadow-orange-900/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
      >
        {loading ? <Loader2 size={12} className="animate-spin"/> : 'EJECUTAR'}
      </button>
    </div>
  );
};