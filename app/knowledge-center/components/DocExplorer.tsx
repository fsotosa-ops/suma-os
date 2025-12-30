'use client';

import React from 'react';
import { 
  ChevronRight, 
  Plus, 
  Star, 
  Zap, 
  Globe, 
  Database, 
  GitMerge, 
  ShieldCheck,
  LayoutDashboard
} from 'lucide-react';
import { cn } from '@/lib/utils';

// INTERFAZ ACTUALIZADA: Se añade onCreateNew
interface Props {
  onSelectDoc: (id: string | null) => void;
  selectedDoc: string | null;
  onCreateNew: () => void; // <--- Esta es la línea que faltaba
}

export const DocExplorer = ({ onSelectDoc, selectedDoc, onCreateNew }: Props) => {
  return (
    <aside className="w-64 border-r border-white/[0.06] bg-[#08090a] flex flex-col shrink-0">
      
      {/* HEADER: BOTÓN HABILITADO */}
      <div className="p-4 border-b border-white/[0.06]">
        <button 
          onClick={onCreateNew} // <--- Conectamos la función aquí
          className="flex items-center justify-center gap-2 w-full bg-blue-600 hover:bg-blue-500 text-white px-3 py-2.5 rounded-xl text-xs font-bold transition-all group shadow-lg shadow-blue-500/20 active:scale-95"
        >
          <Plus size={14} strokeWidth={3} />
          <span>New Service Map</span>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto p-4 space-y-8 custom-scrollbar">
        
        <div className="space-y-1">
          <button 
            onClick={() => onSelectDoc(null)}
            className={cn(
              "flex items-center gap-3 w-full px-3 py-2 rounded-lg text-[11px] font-bold uppercase tracking-wider transition-all",
              !selectedDoc 
                ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' 
                : 'text-slate-500 hover:text-slate-300 hover:bg-white/[0.02]'
            )}
          >
            <LayoutDashboard size={14} /> 
            Service Directory
          </button>
        </div>

        {/* BUSINESS DOMAINS */}
        <div>
          <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] px-3 mb-3 flex items-center gap-2">
            <Globe size={10} /> Business Domains
          </h3>
          <div className="space-y-1">
            <FolderItem 
              label="Revenue Architecture" 
              icon={Zap} 
              active={selectedDoc === 'Revenue Architecture'}
              onClick={() => onSelectDoc('Revenue Architecture')}
              color="text-yellow-500"
            />
            <FolderItem 
              label="Customer Journey" 
              icon={GitMerge} 
              active={selectedDoc === 'Customer Journey'}
              onClick={() => onSelectDoc('Customer Journey')}
              color="text-green-500"
            />
            <FolderItem 
              label="Data Governance" 
              icon={Database} 
              active={selectedDoc === 'Data Governance'}
              onClick={() => onSelectDoc('Data Governance')}
              color="text-purple-500"
            />
          </div>
        </div>

        {/* TECH INTEGRITY */}
        <div>
          <h3 className="text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em] px-3 mb-3 flex items-center gap-2">
            <ShieldCheck size={10} /> Tech Integrity
          </h3>
          <div className="space-y-1 font-mono">
            <button 
              onClick={() => onSelectDoc('Security Protocols')}
              className={cn(
                "w-full px-3 py-2 text-[11px] flex items-center justify-between group transition-colors rounded-lg text-left",
                selectedDoc === 'Security Protocols' ? "text-white bg-white/[0.05]" : "text-slate-500 hover:text-slate-300"
              )}
            >
              <span className="flex items-center gap-2">
                <div className="w-1 h-1 rounded-full bg-red-500" />
                Security Protocols
              </span>
            </button>
          </div>
        </div>
      </nav>

      {/* FOOTER: ESTADO SINCRONIZADO */}
      <div className="p-4 border-t border-white/[0.06] bg-black/20">
        <div className="flex items-center gap-2 px-2">
          <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[9px] font-mono text-slate-500 uppercase font-bold tracking-tighter">
            Strategy-Sync Active
          </span>
        </div>
      </div>
    </aside>
  );
};

// Componente auxiliar para los items del explorador
const FolderItem = ({ label, icon: Icon, active, onClick, color }: any) => (
  <button 
    onClick={onClick}
    className={cn(
      "flex items-center gap-2.5 w-full px-3 py-2 text-[12px] rounded-lg transition-all duration-200 group",
      active 
        ? "bg-white/[0.05] text-white shadow-sm" 
        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.02]"
    )}
  >
    <Icon size={14} className={cn("transition-colors", active ? color : "text-slate-600")} />
    <span className="flex-1 text-left font-medium">{label}</span>
    <ChevronRight size={12} className={cn("transition-all", active ? "opacity-100" : "opacity-0")} />
  </button>
);