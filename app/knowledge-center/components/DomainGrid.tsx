'use client';

import { TrendingUp, Zap, ShieldCheck, Globe, Database, UserCheck } from 'lucide-react';
import { Card } from "@/components/ui/card";

export const DomainGrid = ({ onSelect }: { onSelect: (id: string) => void }) => {
  const domains = [
    { id: 'Sales Funnel', icon: TrendingUp, color: 'text-blue-400', desc: 'Leads, CRM y Conversión.' },
    { id: 'Revenue Ops', icon: Zap, color: 'text-yellow-400', desc: 'Pricing, Billing y Atribución.' },
    { id: 'Compliance', icon: ShieldCheck, color: 'text-emerald-400', desc: 'Seguridad y Data Privacy.' },
    { id: 'Global Stack', icon: Globe, color: 'text-purple-400', desc: 'Integraciones de Terceros.' },
    { id: 'Data Architecture', icon: Database, color: 'text-orange-400', desc: 'Modelado y Almacenamiento.' },
    { id: 'Identity', icon: UserCheck, color: 'text-pink-400', desc: 'Auth y Gestión de Usuarios.' },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-in slide-in-from-bottom-4 duration-700">
      {domains.map((d) => (
        <Card 
          key={d.id} 
          onClick={() => onSelect(d.id)}
          className="bg-[#0f1113] border-white/[0.06] p-6 hover:border-blue-500/40 transition-all cursor-pointer group shadow-none"
        >
          <div className={`p-3 rounded-xl bg-white/[0.02] w-fit mb-4 group-hover:scale-110 transition-transform ${d.color}`}>
            <d.icon size={24} />
          </div>
          <h3 className="text-sm font-bold text-white uppercase tracking-wider font-mono mb-2">{d.id}</h3>
          <p className="text-xs text-slate-500 leading-relaxed">{d.desc}</p>
        </Card>
      ))}
    </div>
  );
};