// components/shared/ExecutionSidebarItem.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, ListTodo, RefreshCw, ChevronRight } from 'lucide-react';

export const ExecutionSidebarItem = () => {
  const pathname = usePathname();
  const isActive = pathname.startsWith('/execution');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isActive) setIsOpen(true);
  }, [isActive]);

  return (
    <div className="flex flex-col gap-1">
      {/* Botón Principal: Ahora navega a /execution */}
      <Link 
        href="/execution"
        onClick={() => setIsOpen(true)}
        className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
          pathname === '/execution' 
            ? 'text-blue-400 bg-blue-500/10' 
            : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-3">
          <LayoutGrid size={20} className={pathname === '/execution' ? 'text-blue-400' : 'text-gray-500'} />
          <span>Execution</span>
        </div>
        <ChevronRight 
          className={`w-4 h-4 text-gray-600 transition-transform duration-300 ${isOpen ? 'rotate-90 text-blue-400' : ''}`} 
        />
      </Link>

      {/* Submenú */}
      <div className={`overflow-hidden transition-all duration-300 ${isOpen ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
        <div className="flex flex-col pl-4 gap-1 mt-1 border-l border-gray-800 ml-6">
          <SubItem href="/execution/kanban" label="Kanban Board" icon={<LayoutGrid size={14}/>} currentPath={pathname} />
          <SubItem href="/execution/backlog" label="Backlog" icon={<ListTodo size={14}/>} currentPath={pathname} />
          <SubItem href="/execution/sprints" label="Sprints Activos" icon={<RefreshCw size={14}/>} currentPath={pathname} />
        </div>
      </div>
    </div>
  );
};

const SubItem = ({ href, label, currentPath, icon }: any) => {
  const isSelected = currentPath === href; 
  return (
    <Link href={href} className={`flex items-center gap-3 py-2 pl-4 text-sm rounded-r-lg border-l-2 transition-all ${
      isSelected ? 'text-blue-400 border-blue-500 bg-blue-500/5 font-medium' : 'text-gray-500 border-transparent hover:text-gray-300'
    }`}>
      {icon} {label}
    </Link>
  );
};