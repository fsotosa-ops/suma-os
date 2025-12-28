'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LayoutDashboard, Target, FileText } from 'lucide-react'; // Usamos iconos de lucide
import { ExecutionSidebarItem } from './ExecutionSidebarItem';

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Cierra el menú al hacer clic en un enlace
  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Botón Hamburguesa */}
      <button onClick={() => setIsOpen(true)} className="p-2 text-gray-400 hover:text-white">
        <Menu size={24} />
      </button>

      {/* Fondo Oscuro (Overlay) */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
          onClick={closeMenu}
        />
      )}

      {/* Panel Lateral Móvil */}
      <div className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-[#0B0E14] border-r border-gray-800 transition-transform duration-300 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header con Logo y Cerrar */}
        <div className="p-6 flex justify-between items-center border-b border-gray-800">
          <span className="text-xl font-bold text-white">SUMADOTS.OS</span>
          <button onClick={closeMenu} className="text-gray-400">
            <X size={24} />
          </button>
        </div>

        {/* Links de Navegación */}
        <nav className="p-4 space-y-2">
          <MobileLink href="/dashboard" label="Dashboard" icon={<LayoutDashboard size={20}/>} active={pathname === '/dashboard'} onClick={closeMenu} />
          <MobileLink href="/strategy" label="Strategy" icon={<Target size={20}/>} active={pathname === '/strategy'} onClick={closeMenu} />
          <MobileLink href="/blueprints" label="Blueprints" icon={<FileText size={20}/>} active={pathname === '/blueprints'} onClick={closeMenu} />
          
          <div className="pt-2">
            <ExecutionSidebarItem />
          </div>
        </nav>
      </div>
    </div>
  );
};

// Pequeño componente auxiliar para los links
const MobileLink = ({ href, label, icon, active, onClick }: any) => (
  <Link 
    href={href} 
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg ${active ? 'bg-blue-500/10 text-blue-400' : 'text-gray-400 hover:text-white'}`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);