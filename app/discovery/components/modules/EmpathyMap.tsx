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

  const Area = ({ label, field }: any) => (
    <div className="bg-zinc-900/30 p-6 border border-zinc-800 flex flex-col min-h-[240px] hover:bg-zinc-900/50 transition-colors group">
        <span className="text-xs font-bold text-zinc-500 uppercase mb-3 group-hover:text-pink-500 transition-colors">{label}</span>
        <textarea 
            className="flex-1 bg-transparent resize-none outline-none text-sm text-zinc-300 placeholder:text-zinc-700 leading-relaxed" 
            placeholder="Escribe aquí..." 
            value={data[field as keyof EmpathyMapData] || ''} 
            onChange={e => handleChange(field, e.target.value)} 
        />
    </div>
  );

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-zinc-800 rounded-xl overflow-hidden border border-zinc-800 shadow-sm">
      <Area label="SAYS (DICE)" field="says" />
      <Area label="THINKS (PIENSA)" field="thinks" />
      <Area label="DOES (HACE)" field="does" />
      <Area label="FEELS (SIENTE)" field="feels" />
    </div>
  );
};