// components/shared/ExecutionSidebarItem.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

export const ExecutionSidebarItem = () => {
  const pathname = usePathname();
  // Detecta si estamos en cualquier ruta de execution para mantenerlo activo/abierto
  const isActive = pathname.startsWith('/execution');
  
  const [isOpen, setIsOpen] = useState(false);

  // Efecto: Si entras directamente a una URL de execution, expande el menú automáticamente
  useEffect(() => {
    if (isActive) setIsOpen(true);
  }, [isActive]);

  return (
    <div className="flex flex-col gap-1">
      {/* Botón Principal (Padre) */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center justify-between w-full px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
          isActive 
            ? 'text-blue-400 bg-blue-500/10' 
            : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
        }`}
      >
        <div className="flex items-center gap-3">
          {/* Icono Execution */}
          <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 17V7m0 10a2 2 0 01-2 2H5a2 2 0 01-2-2V7a2 2 0 012-2h2a2 2 0 012 2m0 10a2 2 0 002 2h2a2 2 0 002-2M9 7a2 2 0 012-2h2a2 2 0 012 2m0 10V7m0 10a2 2 0 002 2h2a2 2 0 002-2V7a2 2 0 00-2-2h-2a2 2 0 00-2 2" />
          </svg>
          <span>Execution</span>
        </div>
        
        {/* Flecha Chevron con rotación */}
        <svg 
          className={`w-4 h-4 text-gray-500 transition-transform duration-300 ${isOpen ? 'rotate-90 text-blue-400' : ''}`} 
          fill="none" viewBox="0 0 24 24" stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
      </button>

      {/* Submenú Desplegable con animación */}
      <div 
        className={`overflow-hidden transition-all duration-300 ease-in-out ${
          isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="flex flex-col pl-4 gap-1 mt-1 border-l border-gray-800 ml-6">
          <SubItem href="/execution" label="Kanban Board" currentPath={pathname} />
          <SubItem href="/execution/backlog" label="Backlog" currentPath={pathname} />
          <SubItem href="/execution/sprints" label="Sprints Activos" currentPath={pathname} />
        </div>
      </div>
    </div>
  );
};

// Componente auxiliar para los links internos (para no repetir código)
const SubItem = ({ href, label, currentPath }: { href: string, label: string, currentPath: string }) => {
  // Coincidencia exacta para resaltar el hijo
  const isSelected = currentPath === href; 
  
  return (
    <Link 
      href={href} 
      className={`block py-2 pl-4 text-sm rounded-r-lg transition-colors border-l-2 ${
        isSelected 
          ? 'text-blue-400 border-blue-500 bg-blue-500/5 font-medium' 
          : 'text-gray-500 border-transparent hover:text-gray-300 hover:border-gray-600'
      }`}
    >
      {label}
    </Link>
  );
};