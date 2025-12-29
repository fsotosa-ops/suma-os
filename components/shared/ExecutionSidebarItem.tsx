'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutGrid, ChevronRight } from 'lucide-react'; // Usamos iconos de lucide

interface Props {
  isCollapsed?: boolean;
}

export const ExecutionSidebarItem = ({ isCollapsed }: Props) => {
  const pathname = usePathname();
  const isActive = pathname.startsWith('/execution');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isActive) setIsOpen(true);
  }, [isActive]);

  // Si se colapsa la barra lateral, cerramos el menú automáticamente (opcional)
  useEffect(() => {
    if (isCollapsed) setIsOpen(false);
  }, [isCollapsed]);

  return (
    <div className="flex flex-col gap-1">
      <button 
        onClick={() => !isCollapsed && setIsOpen(!isOpen)}
        className={`flex items-center w-full py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
          isActive 
            ? 'text-blue-400 bg-blue-500/10' 
            : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
        } ${isCollapsed ? 'justify-center px-0' : 'justify-between px-3'}`}
        title={isCollapsed ? "Execution" : ""}
      >
        <div className="flex items-center gap-3">
          <LayoutGrid size={20} className={isActive ? 'text-blue-400' : 'text-gray-500'} />
          {!isCollapsed && <span>Execution</span>}
        </div>
        
        {!isCollapsed && (
          <ChevronRight 
            size={16}
            className={`text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-90 text-blue-400' : ''}`} 
          />
        )}
      </button>

      {/* El submenú solo se muestra si la barra NO está colapsada */}
      {!isCollapsed && (
        <div 
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="flex flex-col pl-4 gap-1 mt-1 border-l border-gray-800 ml-6">
            <SubItem href="/execution" label="Kanban Board" currentPath={pathname} />
            <SubItem href="/execution/backlog" label="Backlog" currentPath={pathname} />
            <SubItem href="/execution/sprints" label="Sprints" currentPath={pathname} />
          </div>
        </div>
      )}
    </div>
  );
};

const SubItem = ({ href, label, currentPath }: any) => {
  const isSelected = currentPath === href; 
  return (
    <Link 
      href={href} 
      className={`block py-2 pl-4 text-sm rounded-r-lg transition-colors border-l-2 whitespace-nowrap ${
        isSelected 
          ? 'text-blue-400 border-blue-500 bg-blue-500/5 font-medium' 
          : 'text-gray-500 border-transparent hover:text-gray-300 hover:border-gray-600'
      }`}
    >
      {label}
    </Link>
  );
};