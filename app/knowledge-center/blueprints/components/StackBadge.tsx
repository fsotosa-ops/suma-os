'use client';

import React, { useState } from 'react';
import { Layers, Server, Plus, Trash2, Edit2, Check, X } from 'lucide-react';

interface StackItem {
  id: string;
  name: string;
  type: string;
  status: 'Healthy' | 'Maintenance' | 'Pending';
}

export const StackNavigator = () => {
  const [items, setItems] = useState<StackItem[]>([
    { id: '1', name: 'AWS Cloud Services', type: 'Infrastructure', status: 'Healthy' },
    { id: '2', name: 'Stripe API Gateway', type: 'Payments', status: 'Healthy' }
  ]);
  const [editingId, setEditingId] = useState<string | null>(null);

  const addItem = () => {
    const newItem: StackItem = { id: Math.random().toString(), name: 'New Service', type: 'System', status: 'Pending' };
    setItems([...items, newItem]);
    setEditingId(newItem.id);
  };

  const removeItem = (id: string) => setItems(items.filter(i => i.id !== id));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between border-b border-white/5 pb-4">
        <h3 className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] flex items-center gap-2 font-mono">
          <Layers size={14} /> Cloud Ecosystem & Stack
        </h3>
        <button onClick={addItem} className="p-1 text-blue-500 hover:bg-blue-500/10 rounded transition-all">
          <Plus size={16} />
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {items.map((item) => (
          <div key={item.id} className="p-4 bg-white/[0.02] border border-white/[0.06] rounded-2xl flex items-center justify-between group transition-all hover:bg-white/[0.04]">
            <div className="flex items-center gap-4 flex-1">
              <div className="p-2 rounded-xl bg-black/40 text-blue-400"><Server size={18} /></div>
              {editingId === item.id ? (
                <div className="flex gap-2 flex-1 pr-4">
                  <input 
                    className="bg-zinc-800 border-none rounded px-2 py-1 text-xs text-white outline-none flex-1"
                    defaultValue={item.name}
                    autoFocus
                    onBlur={(e) => {
                      setItems(items.map(i => i.id === item.id ? {...i, name: e.target.value} : i));
                      setEditingId(null);
                    }}
                  />
                </div>
              ) : (
                <div>
                  <p className="text-xs font-semibold text-slate-200">{item.name}</p>
                  <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider">{item.type}</p>
                </div>
              )}
            </div>
            
            <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5 pr-2">
                    <div className={`w-1.5 h-1.5 rounded-full ${item.status === 'Healthy' ? 'bg-emerald-500' : 'bg-yellow-500 animate-pulse'}`} />
                    <span className="text-[9px] font-bold text-slate-500 font-mono uppercase">{item.status}</span>
                </div>
                <button onClick={() => setEditingId(item.id)} className="opacity-0 group-hover:opacity-100 text-slate-500 hover:text-white transition-all"><Edit2 size={12}/></button>
                <button onClick={() => removeItem(item.id)} className="opacity-0 group-hover:opacity-100 text-slate-700 hover:text-red-500 transition-all"><Trash2 size={12}/></button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};