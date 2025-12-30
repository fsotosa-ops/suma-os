'use client';
import { Persona } from '@/app/types';
import { Plus, X, User, Target, Frown, Trash2 } from 'lucide-react';

interface Props {
  personas: Persona[];
  onChange: (personas: Persona[]) => void;
}

export const UserPersonaEditor = ({ personas, onChange }: Props) => {
  const addPersona = () => {
    const newPersona: Persona = {
      id: crypto.randomUUID(), name: '', role: '', bio: '',
      goals: [''], frustrations: [''], avatarColor: 'bg-indigo-600'
    };
    onChange([...personas, newPersona]);
  };

  const updatePersona = (id: string, field: keyof Persona, value: any) => {
    onChange(personas.map(p => p.id === id ? { ...p, [field]: value } : p));
  };

  const removePersona = (id: string) => onChange(personas.filter(p => p.id !== id));

  const updateArrayItem = (personaId: string, field: 'goals' | 'frustrations', index: number, value: string) => {
    const persona = personas.find(p => p.id === personaId);
    if (!persona) return;
    const newArray = [...persona[field]];
    newArray[index] = value;
    updatePersona(personaId, field, newArray);
  };

  const addArrayItem = (personaId: string, field: 'goals' | 'frustrations') => {
    const persona = personas.find(p => p.id === personaId);
    if (!persona) return;
    updatePersona(personaId, field, [...persona[field], '']);
  };

  const removeArrayItem = (personaId: string, field: 'goals' | 'frustrations', index: number) => {
    const persona = personas.find(p => p.id === personaId);
    if (!persona) return;
    const newArray = persona[field].filter((_, i) => i !== index);
    updatePersona(personaId, field, newArray);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
        {personas.map((persona) => (
          <div key={persona.id} className="bg-zinc-950 border border-zinc-800 rounded-xl p-6 relative group hover:border-zinc-700 transition-all">
            <button onClick={() => removePersona(persona.id)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-400 p-2 opacity-0 group-hover:opacity-100 transition-opacity"><Trash2 size={16} /></button>

            {/* Header */}
            <div className="flex flex-col sm:flex-row gap-5 mb-6">
              <div className={`w-16 h-16 shrink-0 rounded-2xl ${persona.avatarColor} flex items-center justify-center shadow-lg shadow-indigo-900/10`}>
                <User size={32} className="text-white/90" />
              </div>
              <div className="flex-1 space-y-2 w-full">
                <input className="bg-transparent text-xl font-bold text-white w-full outline-none placeholder:text-zinc-700"
                  value={persona.name} onChange={e => updatePersona(persona.id, 'name', e.target.value)} placeholder="Nombre del Arquetipo" />
                <input className="bg-zinc-900 border border-zinc-800 rounded px-3 py-1.5 text-sm text-zinc-300 w-full outline-none focus:border-indigo-500/50"
                  value={persona.role} onChange={e => updatePersona(persona.id, 'role', e.target.value)} placeholder="Cargo / Rol" />
              </div>
            </div>

            {/* Bio */}
            <div className="mb-6">
                <label className="text-[10px] font-bold text-zinc-500 uppercase mb-2 block">Bio</label>
                <textarea className="w-full bg-zinc-900/50 rounded-lg p-3 text-sm text-zinc-300 resize-none outline-none border border-zinc-800 focus:border-zinc-700 min-h-[80px]"
                  placeholder="Contexto del usuario..." value={persona.bio} onChange={e => updatePersona(persona.id, 'bio', e.target.value)} />
            </div>

            {/* Arrays */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-3">
                <div className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-2 border-b border-zinc-800 pb-2"><Target size={12} /> Metas</div>
                {persona.goals.map((goal, idx) => (
                    <div key={idx} className="flex gap-2 group/item">
                        <input className="w-full bg-transparent border-b border-zinc-800 py-1 text-sm text-zinc-300 outline-none focus:border-emerald-500/50"
                            value={goal} onChange={e => updateArrayItem(persona.id, 'goals', idx, e.target.value)} placeholder="Meta..." />
                        <button onClick={() => removeArrayItem(persona.id, 'goals', idx)} className="text-zinc-600 hover:text-red-400 opacity-0 group-hover/item:opacity-100"><X size={12}/></button>
                    </div>
                ))}
                <button onClick={() => addArrayItem(persona.id, 'goals')} className="text-xs text-zinc-500 hover:text-emerald-400 flex items-center gap-1 mt-2">+ Añadir meta</button>
              </div>

              <div className="space-y-3">
                <div className="text-[10px] font-bold text-red-500 uppercase flex items-center gap-2 border-b border-zinc-800 pb-2"><Frown size={12} /> Frustraciones</div>
                {persona.frustrations.map((frust, idx) => (
                    <div key={idx} className="flex gap-2 group/item">
                        <input className="w-full bg-transparent border-b border-zinc-800 py-1 text-sm text-zinc-300 outline-none focus:border-red-500/50"
                            value={frust} onChange={e => updateArrayItem(persona.id, 'frustrations', idx, e.target.value)} placeholder="Dolor..." />
                        <button onClick={() => removeArrayItem(persona.id, 'frustrations', idx)} className="text-zinc-600 hover:text-red-400 opacity-0 group-hover/item:opacity-100"><X size={12}/></button>
                    </div>
                ))}
                <button onClick={() => addArrayItem(persona.id, 'frustrations')} className="text-xs text-zinc-500 hover:text-red-400 flex items-center gap-1 mt-2">+ Añadir dolor</button>
              </div>
            </div>
          </div>
        ))}

        <button onClick={addPersona} className="flex flex-col items-center justify-center min-h-[300px] border-2 border-dashed border-zinc-800 rounded-xl hover:border-zinc-600 hover:bg-zinc-900/20 transition-all group gap-4">
            <div className="w-12 h-12 rounded-full bg-zinc-900 flex items-center justify-center group-hover:scale-110 transition-transform border border-zinc-800"><Plus size={24} className="text-zinc-500" /></div>
            <span className="text-sm font-bold text-zinc-500 group-hover:text-zinc-300">Crear Arquetipo</span>
        </button>
      </div>
    </div>
  );
};