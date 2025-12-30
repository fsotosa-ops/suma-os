'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { Lightbulb, ChevronRight, Users, Map, Heart, TrendingUp } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  isCollapsed?: boolean;
}

export const DiscoverySidebarItem = ({ isCollapsed }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentView = searchParams.get('view') || 'ROADMAP';
  
  const isDiscoveryActive = pathname.startsWith('/discovery');
  // Estado del menú (abierto por defecto si estamos en discovery)
  const [isOpen, setIsOpen] = useState(true);

  if (isCollapsed && isOpen) setIsOpen(false);

  return (
    <div className="flex flex-col gap-1">
      {/* 1. Header Principal: Clic lleva al Roadmap (Dashboard) */}
      <div 
        className={cn(
          "group flex items-center rounded-md transition-all duration-200 cursor-pointer",
          isDiscoveryActive ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900",
          isCollapsed ? "justify-center px-0 py-2" : "justify-between px-3 py-2" 
        )}
      >
        <Link 
          href="/discovery?view=ROADMAP" 
          className={cn("flex items-center gap-3", isCollapsed ? "justify-center w-full" : "flex-1")}
          title="Discovery Hub"
        >
          <Lightbulb size={18} />
          {!isCollapsed && <span className="text-sm font-medium">Discovery</span>}
        </Link>

        {!isCollapsed && (
          <button 
            onClick={(e) => { e.preventDefault(); setIsOpen(!isOpen); }}
            className="p-1 hover:bg-zinc-700 rounded transition-colors text-zinc-500"
          >
            <ChevronRight size={14} className={cn("transition-transform duration-300", isOpen && "rotate-90")} />
          </button>
        )}
      </div>

      {/* 2. Submenú: Solo los Módulos de Trabajo (Sin Roadmap redundante) */}
      {!isCollapsed && isOpen && (
        <div className="pl-4 ml-2 border-l border-zinc-800 space-y-1 mt-1 animate-in slide-in-from-top-1 duration-200">
          <SubItem 
            href="/discovery?view=PERSONAS" 
            label="User Personas" 
            icon={<Users size={14}/>} 
            active={currentView === 'PERSONAS'} 
          />
          <SubItem 
            href="/discovery?view=EMPATHY" 
            label="Empathy Map" 
            icon={<Heart size={14}/>} 
            active={currentView === 'EMPATHY'} 
          />
          <SubItem 
            href="/discovery?view=JOURNEY" 
            label="User Journey" 
            icon={<Map size={14}/>} 
            active={currentView === 'JOURNEY'} 
          />
          <SubItem 
            href="/discovery?view=PRIORITIZATION" 
            label="Priorización" 
            icon={<TrendingUp size={14}/>} 
            active={currentView === 'PRIORITIZATION'} 
          />
        </div>
      )}
    </div>
  );
};

const SubItem = ({ href, label, active, icon }: any) => (
  <Link 
    href={href} 
    className={cn(
      "flex items-center gap-2 py-1.5 px-3 text-xs rounded-md transition-colors",
      active 
        ? "text-pink-400 bg-pink-500/10 font-medium" 
        : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
    )}
  >
    {icon} {label}
  </Link>
);