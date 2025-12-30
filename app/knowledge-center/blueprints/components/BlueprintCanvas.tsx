'use client';
import { MousePointer2, Move, Square, Type, Database, Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

export const BlueprintCanvas = () => (
    <div className="relative w-full h-full min-h-[500px] bg-[#08090a] overflow-hidden flex">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 flex items-center gap-1 bg-[#151719] border border-white/[0.08] p-1.5 rounded-xl shadow-2xl z-20">
        <ToolBtn icon={MousePointer2} active />
        <ToolBtn icon={Move} />
        <div className="w-px h-4 bg-white/[0.08] mx-1" />
        <ToolBtn icon={Square} />
        <ToolBtn icon={Type} />
        <ToolBtn icon={Database} />
        <div className="w-px h-4 bg-white/[0.08] mx-1" />
        <ToolBtn icon={Plus} highlight />
      </div>
      <div className="absolute inset-0 z-0 opacity-[0.03]" style={{ backgroundImage: 'radial-gradient(circle, white 1px, transparent 1px)', backgroundSize: '24px 24px' }} />
      <div className="flex-1 flex flex-col items-center justify-center relative z-10 p-12">
        <h3 className="text-slate-200 font-medium mb-2 font-mono">TECHNICAL CANVAS</h3>
        <p className="text-slate-500 text-xs max-w-xs text-center leading-relaxed">Diagrama la arquitectura conectando requerimientos técnicos.</p>
      </div>
    </div>
);

const ToolBtn = ({ icon: Icon, active, highlight }: any) => (
  <button className={cn(
    "p-2 rounded-lg transition-all",
    active ? "bg-blue-500/20 text-blue-400" : "text-slate-500 hover:text-slate-200 hover:bg-white/[0.03]",
    highlight && "bg-white text-black hover:bg-slate-200"
  )}>
    <Icon size={18} strokeWidth={highlight ? 2.5 : 1.5} />
  </button>
);