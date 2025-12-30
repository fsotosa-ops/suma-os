'use client';
import { EmpathyMapData } from '@/app/types';

interface Props {
  data: EmpathyMapData;
  onChange: (data: EmpathyMapData) => void;
}

export const EmpathyMap = ({ data, onChange }: Props) => {
  const handleChange = (field: keyof EmpathyMapData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <div className="grid grid-cols-2 gap-4 h-[400px]">
      <div className="bg-zinc-900/50 p-4 rounded-tl-xl border border-zinc-800 flex flex-col">
        <span className="text-xs font-bold text-zinc-500 uppercase mb-2">Says (Dice)</span>
        <textarea className="flex-1 bg-transparent resize-none outline-none text-sm text-zinc-300 placeholder:text-zinc-700" 
          placeholder="¿Qué dice el usuario?" value={data.says} onChange={e => handleChange('says', e.target.value)} />
      </div>
      <div className="bg-zinc-900/50 p-4 rounded-tr-xl border border-zinc-800 flex flex-col">
        <span className="text-xs font-bold text-zinc-500 uppercase mb-2">Thinks (Piensa)</span>
        <textarea className="flex-1 bg-transparent resize-none outline-none text-sm text-zinc-300 placeholder:text-zinc-700" 
          placeholder="¿Qué está pensando realmente?" value={data.thinks} onChange={e => handleChange('thinks', e.target.value)} />
      </div>
      <div className="bg-zinc-900/50 p-4 rounded-bl-xl border border-zinc-800 flex flex-col">
        <span className="text-xs font-bold text-zinc-500 uppercase mb-2">Does (Hace)</span>
        <textarea className="flex-1 bg-transparent resize-none outline-none text-sm text-zinc-300 placeholder:text-zinc-700" 
          placeholder="¿Qué acciones toma?" value={data.does} onChange={e => handleChange('does', e.target.value)} />
      </div>
      <div className="bg-zinc-900/50 p-4 rounded-br-xl border border-zinc-800 flex flex-col">
        <span className="text-xs font-bold text-zinc-500 uppercase mb-2">Feels (Siente)</span>
        <textarea className="flex-1 bg-transparent resize-none outline-none text-sm text-zinc-300 placeholder:text-zinc-700" 
          placeholder="¿Cuáles son sus emociones?" value={data.feels} onChange={e => handleChange('feels', e.target.value)} />
      </div>
    </div>
  );
};