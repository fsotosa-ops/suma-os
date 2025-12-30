'use client';
import { useState } from 'react';
import { Persona } from '@/app/types';
import { Plus, X, User, Target, Frown } from 'lucide-react';

interface Props {
  personas: Persona[];
  onChange: (personas: Persona[]) => void;
}

export const UserPersonaEditor = ({ personas, onChange }: Props) => {
  const addPersona = () => {
    const newPersona: Persona = {
      id: crypto.randomUUID(),
      name: 'Nuevo Arquetipo',
      role: 'Rol del Usuario',
      bio: '',
      goals: [''],
      frustrations: [''],
      avatarColor: 'bg-indigo-500'
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

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pb-8">
      {personas.map((persona) => (
        <div key={persona.id} className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-5 relative group hover:border-zinc-600 transition-all">
          <button onClick={() => removePersona(persona.id)} className="absolute top-4 right-4 text-zinc-600 hover:text-red-400 opacity-0 group-hover:opacity-100 transition-opacity">
            <X size={16} />
          </button>

          {/* Header Persona */}
          <div className="flex items-center gap-4 mb-6">
            <div className={`w-16 h-16 rounded-full ${persona.avatarColor} flex items-center justify-center border-4 border-zinc-950 shadow-xl`}>
              <User size={32} className="text-white" />
            </div>
            <div className="flex-1 space-y-1">
              <input 
                className="bg-transparent text-lg font-bold text-white w-full outline-none placeholder:text-zinc-600"
                value={persona.name} onChange={e => updatePersona(persona.id, 'name', e.target.value)} placeholder="Nombre (ej. Ana la Admin)" 
              />
              <input 
                className="bg-transparent text-sm text-zinc-400 w-full outline-none font-mono placeholder:text-zinc-700"
                value={persona.role} onChange={e => updatePersona(persona.id, 'role', e.target.value)} placeholder="Cargo / Rol" 
              />
            </div>
          </div>

          {/* Bio */}
          <div className="mb-4">
            <textarea 
              className="w-full bg-black/20 rounded-lg p-3 text-sm text-zinc-300 resize-none outline-none border border-transparent focus:border-zinc-700 placeholder:text-zinc-700"
              rows={3}
              placeholder="Breve biografía y contexto..."
              value={persona.bio}
              onChange={e => updatePersona(persona.id, 'bio', e.target.value)}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            {/* Metas */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-emerald-500 uppercase flex items-center gap-1"><Target size={10} /> Metas</label>
              {persona.goals.map((goal, idx) => (
                <input key={idx} className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 outline-none focus:border-emerald-500/50"
                  value={goal} onChange={e => updateArrayItem(persona.id, 'goals', idx, e.target.value)} placeholder="Objetivo..." />
              ))}
              <button onClick={() => addArrayItem(persona.id, 'goals')} className="text-[10px] text-zinc-500 hover:text-emerald-400 flex items-center gap-1">+ Añadir meta</button>
            </div>

            {/* Frustraciones */}
            <div className="space-y-2">
              <label className="text-[10px] font-bold text-red-500 uppercase flex items-center gap-1"><Frown size={10} /> Frustraciones</label>
              {persona.frustrations.map((frust, idx) => (
                <input key={idx} className="w-full bg-zinc-950 border border-zinc-800 rounded px-2 py-1 text-xs text-zinc-300 outline-none focus:border-red-500/50"
                  value={frust} onChange={e => updateArrayItem(persona.id, 'frustrations', idx, e.target.value)} placeholder="Dolor..." />
              ))}
              <button onClick={() => addArrayItem(persona.id, 'frustrations')} className="text-[10px] text-zinc-500 hover:text-red-400 flex items-center gap-1">+ Añadir dolor</button>
            </div>
          </div>
        </div>
      ))}

      {/* Card para añadir */}
      <button onClick={addPersona} className="h-full min-h-[300px] border-2 border-dashed border-zinc-800 rounded-xl flex flex-col items-center justify-center text-zinc-600 hover:text-zinc-400 hover:border-zinc-600 hover:bg-zinc-900/30 transition-all gap-3">
        <div className="p-3 bg-zinc-900 rounded-full"><Plus size={24}/></div>
        <span className="text-sm font-medium">Crear User Persona</span>
      </button>
    </div>
  );
};