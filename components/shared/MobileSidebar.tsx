'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Menu, X } from 'lucide-react';
import { usePathname } from 'next/navigation';
import { ExecutionSidebarItem } from './ExecutionSidebarItem';

// Reutilizamos tus iconos del Sidebar original o usamos Lucide para simplificar
import { LayoutDashboard, Target, FileText } from 'lucide-react';

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // Función auxiliar para cerrar el menú al hacer click en un link
  const handleLinkClick = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Botón Hamburguesa (Solo visible en móvil) */}
      <button 
        onClick={() => setIsOpen(true)}
        className="p-2 text-gray-400 hover:text-white"
      >
        <Menu size={24} />
      </button>

      {/* Overlay Oscuro */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Móvil (Drawer) */}
      <div className={`fixed inset-y-0 left-0 z-50 w-[280px] bg-[#0B0E14] border-r border-gray-800 transform transition-transform duration-300 ease-in-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        
        {/* Header del Sidebar Móvil */}
        <div className="p-6 flex justify-between items-center border-b border-gray-800">
          <Link href="/" className="flex items-center gap-1" onClick={handleLinkClick}>
            <span className="text-xl font-bold text-white tracking-tight">SUMADOTS</span>
            <span className="text-xl font-bold text-blue-500">.OS</span>
          </Link>
          <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white">
            <X size={24} />
          </button>
        </div>

        {/* Links de Navegación */}
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          <MobileLink 
            href="/dashboard" 
            label="Dashboard" 
            icon={<LayoutDashboard size={20} />} 
            isActive={pathname === '/dashboard'}
            onClick={handleLinkClick}
          />
          
          <MobileLink 
            href="/strategy" 
            label="Strategy" 
            icon={<Target size={20} />} 
            isActive={pathname === '/strategy'}
            onClick={handleLinkClick}
          />

          <MobileLink 
            href="/blueprints" 
            label="Blueprints" 
            icon={<FileText size={20} />} 
            isActive={pathname === '/blueprints'}
            onClick={handleLinkClick}
          />

          {/* Tu componente desplegable existente (asegúrate de que funcione bien o simplifícalo aquí) */}
          <div className="pt-2">
             <ExecutionSidebarItem />
          </div>
        </nav>
      </div>
    </div>
  );
};

const MobileLink = ({ href, label, icon, isActive, onClick }: any) => (
  <Link 
    href={href}
    onClick={onClick}
    className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all ${
      isActive ? 'text-blue-400 bg-blue-500/10' : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
    }`}
  >
    {icon}
    <span>{label}</span>
  </Link>
);