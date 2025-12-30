'use client';
import { JourneyStep } from '@/app/types';
import { Plus, X, Smile, Meh, Frown } from 'lucide-react';

interface Props {
  steps: JourneyStep[];
  onChange: (steps: JourneyStep[]) => void;
}

export const UserJourneyMap = ({ steps, onChange }: Props) => {
  const addStep = () => {
    const newStep: JourneyStep = { id: crypto.randomUUID(), stage: 'Nueva Etapa', action: '', painPoint: '', sentiment: 'neutral' };
    onChange([...steps, newStep]);
  };

  const updateStep = (id: string, field: keyof JourneyStep, val: any) => {
    onChange(steps.map(s => s.id === id ? { ...s, [field]: val } : s));
  };

  const removeStep = (id: string) => onChange(steps.filter(s => s.id !== id));

  return (
    <div className="flex gap-4 overflow-x-auto pb-4 custom-scrollbar">
      {steps.map((step, idx) => (
        <div key={step.id} className="min-w-[200px] w-[200px] bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex flex-col gap-2 relative group">
          <button onClick={() => removeStep(step.id)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><X size={14}/></button>
          
          <div className="flex items-center gap-2 mb-1">
            <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-500">{idx + 1}</div>
            <input className="bg-transparent text-sm font-bold text-zinc-200 outline-none w-full" value={step.stage} onChange={e => updateStep(step.id, 'stage', e.target.value)} />
          </div>
          
          <textarea className="w-full bg-black/20 rounded p-2 text-xs text-zinc-400 h-16 resize-none outline-none border border-transparent focus:border-zinc-700" 
            placeholder="Acción del usuario..." value={step.action} onChange={e => updateStep(step.id, 'action', e.target.value)} />
            
          <textarea className="w-full bg-red-900/10 rounded p-2 text-xs text-red-300 h-16 resize-none outline-none border border-transparent focus:border-red-900/30 placeholder:text-red-900/50" 
            placeholder="Pain point..." value={step.painPoint} onChange={e => updateStep(step.id, 'painPoint', e.target.value)} />

          <div className="flex justify-between bg-zinc-950 p-1 rounded-full border border-zinc-800">
             {['happy', 'neutral', 'sad'].map((s: any) => (
               <button key={s} onClick={() => updateStep(step.id, 'sentiment', s)} 
                 className={`p-1.5 rounded-full transition-all ${step.sentiment === s ? (s === 'happy' ? 'bg-green-500 text-black' : s === 'sad' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black') : 'text-zinc-600 hover:text-zinc-400'}`}>
                 {s === 'happy' ? <Smile size={14}/> : s === 'sad' ? <Frown size={14}/> : <Meh size={14}/>}
               </button>
             ))}
          </div>
        </div>
      ))}
      <button onClick={addStep} className="min-w-[50px] flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl hover:border-zinc-600 text-zinc-600 hover:text-zinc-400 transition-all">
        <Plus />
      </button>
    </div>
  );
};