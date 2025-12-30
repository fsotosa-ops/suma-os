'use client';

import { 
  Briefcase, Code2, ShieldAlert, Plus, 
  Search, Settings 
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { WarRoomDoc } from '@/app/types';

interface Props {
  documents: WarRoomDoc[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onCreate: () => void;
}

export const WarRoomSidebar = ({ documents, selectedId, onSelect, onCreate }: Props) => {
  
  const SidebarSection = ({ title, icon: Icon, category }: { title: string, icon: any, category: WarRoomDoc['category'] }) => {
    const docs = documents.filter(d => d.category === category);
    
    if (docs.length === 0) return null;

    return (
      <div className="mb-6 animate-in fade-in slide-in-from-left-2 duration-300">
        <h3 className="flex items-center gap-2 px-3 mb-2 text-[10px] font-bold text-zinc-500 uppercase tracking-widest select-none">
          <Icon size={12} /> {title}
        </h3>
        <div className="space-y-0.5">
          {docs.map(doc => (
            <button
              key={doc.id}
              onClick={() => onSelect(doc.id)}
              className={cn(
                "flex items-center gap-2.5 w-full px-3 py-1.5 text-xs rounded-md transition-all group relative",
                selectedId === doc.id 
                  ? "bg-zinc-800 text-zinc-100 font-medium" 
                  : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50"
              )}
            >
              <span className="opacity-80">{doc.icon}</span>
              <span className="truncate flex-1 text-left">{doc.title}</span>
              {selectedId === doc.id && <div className="w-1 h-1 rounded-full bg-orange-500" />}
            </button>
          ))}
        </div>
      </div>
    );
  };

  return (
    <aside className="w-64 border-r border-zinc-800 bg-[#09090b] flex flex-col shrink-0 h-full">
      
      {/* Header "Mission Control" */}
      <div className="p-4 border-b border-zinc-800/50 flex items-center justify-between group cursor-pointer hover:bg-zinc-900/30 transition-colors">
        <div className="flex items-center gap-2.5">
          <div className="w-5 h-5 rounded bg-gradient-to-tr from-orange-600 to-red-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-orange-900/20">
            W
          </div>
          <span className="text-sm font-semibold text-zinc-200">Mission Control</span>
        </div>
        <Settings size={14} className="text-zinc-600 opacity-0 group-hover:opacity-100 transition-opacity" />
      </div>

      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
        {/* Quick Search */}
        <div className="mb-4 px-2">
            <button className="w-full flex items-center gap-2 bg-zinc-900/50 border border-zinc-800 text-zinc-500 px-2 py-1.5 rounded-md text-xs hover:border-zinc-700 hover:text-zinc-400 transition-all outline-none focus:ring-1 focus:ring-zinc-700">
                <Search size={12} /> 
                <span>Find Intel...</span>
            </button>
        </div>

        <SidebarSection title="Situación General" icon={ShieldAlert} category="GENERAL" />
        <SidebarSection title="Engineering Ops" icon={Code2} category="ENGINEERING" />
        <SidebarSection title="Revenue Tactics" icon={Briefcase} category="BUSINESS" />
      </div>

      <div className="p-3 border-t border-zinc-800 bg-zinc-900/10">
        <button 
            onClick={onCreate}
            className="flex items-center gap-2 w-full text-xs text-zinc-400 hover:text-zinc-100 px-2 py-2 rounded-md hover:bg-zinc-800 transition-all group"
        >
            <Plus size={14} className="group-hover:text-orange-500 transition-colors" /> 
            Nueva Sesión
        </button>
      </div>
    </aside>
  );
};