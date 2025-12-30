'use client';
import { Actionable } from '@/app/types';
import { Plus, Send, CheckCircle2, Circle } from 'lucide-react';
import { useState } from 'react';

interface Props {
  actionables: Actionable[];
  onChange: (actions: Actionable[]) => void;
  onPromote: (id: string) => void;
}

export const ActionableList = ({ actionables, onChange, onPromote }: Props) => {
  const [newTitle, setNewTitle] = useState('');

  const handleAdd = () => {
    if(!newTitle) return;
    onChange([...actionables, { id: crypto.randomUUID(), title: newTitle, priority: 'Medium', status: 'Open' }]);
    setNewTitle('');
  };

  return (
    <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden">
      <div className="p-4 border-b border-zinc-800 flex gap-2">
        <input className="flex-1 bg-zinc-950 border border-zinc-800 rounded-lg px-3 py-2 text-sm text-white outline-none focus:border-blue-500 transition-colors" 
          placeholder="Nuevo accionable detectado..." value={newTitle} onChange={e => setNewTitle(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAdd()} />
        <button onClick={handleAdd} className="bg-white text-black px-4 py-2 rounded-lg text-sm font-bold hover:bg-zinc-200">Añadir</button>
      </div>
      <div className="divide-y divide-zinc-800/50">
        {actionables.length === 0 && <p className="p-8 text-center text-zinc-600 text-sm">No hay accionables definidos aún.</p>}
        {actionables.map(action => (
          <div key={action.id} className="p-3 flex items-center justify-between group hover:bg-zinc-900/50 transition-colors">
            <div className="flex items-center gap-3">
               <div className={`w-2 h-2 rounded-full ${action.priority === 'High' ? 'bg-red-500' : 'bg-blue-500'}`} />
               <span className={`text-sm ${action.status === 'Promoted' ? 'text-zinc-500 line-through' : 'text-zinc-200'}`}>{action.title}</span>
            </div>
            {action.status === 'Open' ? (
                <button onClick={() => onPromote(action.id)} className="flex items-center gap-2 text-xs font-medium text-indigo-400 bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 rounded-full hover:bg-indigo-500 hover:text-white transition-all">
                    <Send size={12} /> Enviar a Backlog
                </button>
            ) : (
                <span className="flex items-center gap-1.5 text-xs font-bold text-emerald-600 bg-emerald-900/10 px-3 py-1.5 rounded-full border border-emerald-900/20">
                    <CheckCircle2 size={12} /> Promovido
                </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};