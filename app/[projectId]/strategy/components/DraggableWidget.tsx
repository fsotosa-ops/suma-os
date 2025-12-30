'use client';

import { ReactNode, useState } from 'react';
import { Card } from "@/components/ui/card";
import { GripVertical, Maximize2, Minimize2, X } from 'lucide-react';

interface Props {
  id: string;
  title: string;
  icon: ReactNode;
  color: string;
  children: ReactNode;
  isExpanded: boolean;
  onExpand: () => void;
  onRemove: () => void;
  onDragStart: (e: React.DragEvent, id: string) => void;
  onDragOver: (e: React.DragEvent) => void;
  onDrop: (e: React.DragEvent, targetId: string) => void;
}

export const DraggableWidget = ({ 
  id, title, icon, color, children, 
  isExpanded, onExpand, onRemove, 
  onDragStart, onDragOver, onDrop 
}: Props) => {
  const [isDragging, setIsDragging] = useState(false);

  if (isExpanded) {
    return (
        <div className="fixed inset-4 z-50 bg-[#0B0E14] border border-zinc-700 rounded-xl shadow-2xl flex flex-col animate-in zoom-in-95 duration-200">
            <div className="p-4 border-b border-zinc-800 flex justify-between items-center bg-[#151921] rounded-t-xl">
                <span className={`text-sm font-bold uppercase tracking-widest flex items-center gap-2 ${color}`}>
                    {icon} {title}
                </span>
                <button onClick={onExpand} className="p-2 hover:bg-zinc-800 rounded-lg text-zinc-400 hover:text-white transition-colors">
                    <Minimize2 size={18} />
                </button>
            </div>
            <div className="flex-1 p-6 overflow-auto">{children}</div>
        </div>
    );
  }

  return (
    <div 
        draggable
        onDragStart={(e) => { setIsDragging(true); onDragStart(e, id); }}
        onDragEnd={() => setIsDragging(false)}
        onDragOver={onDragOver}
        onDrop={(e) => { setIsDragging(false); onDrop(e, id); }}
        className={`h-full transition-all duration-300 ${isDragging ? 'opacity-50 scale-95' : 'opacity-100'}`}
    >
        <Card className="h-[420px] bg-[#12141A] border border-zinc-800/60 flex flex-col hover:border-zinc-600 hover:shadow-lg transition-all group relative">
            
            {/* Header Arrastrable */}
            <div className="p-3 border-b border-zinc-800/50 flex justify-between items-center bg-[#151921]/50 cursor-grab active:cursor-grabbing rounded-t-xl">
                <div className="flex items-center gap-2">
                    <div className="p-1 rounded hover:bg-zinc-800 text-zinc-600 group-hover:text-zinc-400">
                        <GripVertical size={14} />
                    </div>
                    <span className={`text-[10px] font-bold uppercase tracking-wider flex items-center gap-2 ${color}`}>
                        {icon} {title}
                    </span>
                </div>
                <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={onExpand} className="p-1.5 hover:bg-zinc-800 rounded text-zinc-500 hover:text-blue-400">
                        <Maximize2 size={14} />
                    </button>
                    <button onClick={onRemove} className="p-1.5 hover:bg-zinc-800 rounded text-zinc-500 hover:text-red-400">
                        <X size={14} />
                    </button>
                </div>
            </div>

            {/* Contenido */}
            <div className="flex-1 p-1 overflow-hidden">
                {children}
            </div>
        </Card>
    </div>
  );
};