'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, ChevronRight, ListTodo, Kanban, RefreshCw } from 'lucide-react';
import { cn } from '@/lib/utils';

interface Props {
  isCollapsed?: boolean;
}

export const ExecutionSidebarItem = ({ isCollapsed }: Props) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith('/execution');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isActive && !isCollapsed) setIsOpen(true);
  }, [isActive, isCollapsed]);

  // Si está colapsado, forzamos que el submenú se cierre visualmente
  if (isCollapsed && isOpen) setIsOpen(false);

  return (
    <div className="flex flex-col gap-1">
      {/* CORRECCIÓN DE ALINEACIÓN:
         Usamos exactamente las mismas clases base que NavItem en Sidebar.tsx.
         Cuando está colapsado (isCollapsed), forzamos 'justify-center' y quitamos paddings laterales extra.
      */}
      <div className={cn(
        "group flex items-center rounded-md transition-all duration-200 cursor-pointer",
        isActive ? "bg-zinc-800 text-zinc-100" : "text-zinc-500 hover:text-zinc-200 hover:bg-zinc-900",
        isCollapsed ? "justify-center px-0 py-2" : "justify-between px-3 py-2" 
      )}>
        
        {/* Link Principal */}
        <Link 
          href="/execution" 
          className={cn(
            "flex items-center gap-3", 
            isCollapsed ? "justify-center w-full" : "flex-1"
          )}
          title="Execution"
        >
          <LayoutGrid size={18} />
          {!isCollapsed && <span className="text-sm">Execution</span>}
        </Link>
        
        {/* Flecha (Solo visible si NO está colapsado) */}
        {!isCollapsed && (
          <button 
            onClick={(e) => {
              e.preventDefault();
              setIsOpen(!isOpen);
            }}
            className="p-1 hover:bg-zinc-700 rounded transition-colors text-zinc-500"
          >
            <ChevronRight 
              size={14} 
              className={cn("transition-transform duration-300", isOpen && "rotate-90")} 
            />
          </button>
        )}
      </div>

      {/* Submenú */}
      {!isCollapsed && isOpen && (
        <div className="pl-4 ml-2 border-l border-zinc-800 space-y-1 mt-1 animate-in slide-in-from-top-1 duration-200">
          <SubItem href="/execution/kanban" label="Kanban" icon={<Kanban size={14}/>} currentPath={pathname} />
          <SubItem href="/execution/backlog" label="Backlog" icon={<ListTodo size={14}/>} currentPath={pathname} />
          <SubItem href="/execution/sprints" label="Sprints" icon={<RefreshCw size={14}/>} currentPath={pathname} />
        </div>
      )}
    </div>
  );
};

const SubItem = ({ href, label, currentPath, icon }: any) => {
  const isSelected = currentPath === href; 
  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center gap-2 py-1.5 px-3 text-xs rounded-md transition-colors",
        isSelected 
          ? "text-blue-400 bg-blue-500/10" 
          : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-800/50"
      )}
    >
      {icon}
      {label}
    </Link>
  );
};