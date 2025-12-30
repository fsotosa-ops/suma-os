'use client';
import { JourneyStep } from '@/app/types';
import { Plus, X, Smile, Meh, Frown } from 'lucide-react';

interface Props {
  steps: JourneyStep[];
  onChange: (steps: JourneyStep[]) => void;
}

export const UserJourneyMap = ({ steps, onChange }: Props) => {
  const addStep = () => {
    const newStep: JourneyStep = { id: crypto.randomUUID(), stage: `Etapa ${steps.length + 1}`, action: '', painPoint: '', sentiment: 'neutral' };
    onChange([...steps, newStep]);
  };

  const updateStep = (id: string, field: keyof JourneyStep, val: any) => {
    onChange(steps.map(s => s.id === id ? { ...s, [field]: val } : s));
  };

  const removeStep = (id: string) => onChange(steps.filter(s => s.id !== id));

  return (
    <div className="flex gap-4 overflow-x-auto pb-6 pt-2 custom-scrollbar snap-x">
      {steps.map((step, idx) => (
        <div key={step.id} className="snap-center min-w-[240px] w-[240px] bg-zinc-950 border border-zinc-800 rounded-xl p-4 flex flex-col gap-3 relative group hover:border-zinc-600 transition-all shadow-sm">
          <button onClick={() => removeStep(step.id)} className="absolute top-2 right-2 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity"><X size={14}/></button>
          
          <div className="flex items-center gap-3">
            <div className="w-6 h-6 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-bold text-zinc-400 border border-zinc-700">{idx + 1}</div>
            <input className="bg-transparent text-sm font-bold text-zinc-200 outline-none w-full" value={step.stage} onChange={e => updateStep(step.id, 'stage', e.target.value)} />
          </div>
          
          <div className="space-y-1">
            <label className="text-[10px] text-zinc-600 font-bold uppercase">Acción</label>
            <textarea className="w-full bg-zinc-900/50 rounded p-2 text-xs text-zinc-300 h-16 resize-none outline-none border border-zinc-800 focus:border-zinc-600" 
                placeholder="¿Qué hace?" value={step.action} onChange={e => updateStep(step.id, 'action', e.target.value)} />
          </div>
            
          <div className="space-y-1">
            <label className="text-[10px] text-red-900 font-bold uppercase">Pain Point</label>
            <textarea className="w-full bg-red-950/10 rounded p-2 text-xs text-red-200 h-14 resize-none outline-none border border-red-900/20 focus:border-red-900/50 placeholder:text-red-900/30" 
                placeholder="Dolor..." value={step.painPoint} onChange={e => updateStep(step.id, 'painPoint', e.target.value)} />
          </div>

          <div className="flex justify-center gap-2 bg-zinc-900 p-1.5 rounded-full border border-zinc-800 mt-auto">
             {['happy', 'neutral', 'sad'].map((s: any) => (
               <button key={s} onClick={() => updateStep(step.id, 'sentiment', s)} 
                 className={`p-1.5 rounded-full transition-all ${step.sentiment === s ? (s === 'happy' ? 'bg-green-500 text-black' : s === 'sad' ? 'bg-red-500 text-white' : 'bg-yellow-500 text-black') : 'text-zinc-600 hover:text-zinc-400'}`}>
                 {s === 'happy' ? <Smile size={16}/> : s === 'sad' ? <Frown size={16}/> : <Meh size={16}/>}
               </button>
             ))}
          </div>
        </div>
      ))}
      
      <button onClick={addStep} className="min-w-[60px] flex items-center justify-center border-2 border-dashed border-zinc-800 rounded-xl hover:border-zinc-600 text-zinc-600 hover:text-zinc-400 transition-all hover:bg-zinc-900/50">
        <Plus size={24} />
      </button>
    </div>
  );
};