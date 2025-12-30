'use client';

import { Layers, Server, Shield } from 'lucide-react';

export const StackNavigator = () => {
  const providers = [
    { name: 'AWS Cloud', type: 'Infra', status: 'Healthy', color: 'text-orange-400' },
    { name: 'Stripe API', type: 'Payments', status: 'Live', color: 'text-indigo-400' },
    { name: 'PostgreSQL', type: 'DB', status: 'Syncing', color: 'text-blue-400' }
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] mb-4 flex items-center gap-2">
        <Layers size={12} /> System Infrastructure
      </h3>
      {providers.map((p) => (
        <div key={p.name} className="flex items-center justify-between p-3 bg-white/[0.02] border border-white/[0.06] rounded-lg hover:border-white/20 transition-all cursor-default group">
          <div className="flex items-center gap-3">
            <div className={`p-1.5 rounded bg-black/40 ${p.color}`}>
               <Server size={14} />
            </div>
            <div>
              <p className="text-xs font-medium text-slate-200">{p.name}</p>
              <p className="text-[9px] text-slate-500 font-mono uppercase">{p.type}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5">
             <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse" />
             <span className="text-[9px] text-slate-400 font-bold uppercase">{p.status}</span>
          </div>
        </div>
      ))}
    </div>
  );
};