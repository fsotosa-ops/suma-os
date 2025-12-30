'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X, LayoutDashboard, Target, FileText, Activity, FlaskConical } from 'lucide-react';
import { ExecutionSidebarItem } from './ExecutionSidebarItem';
import { cn } from '@/lib/utils';

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const closeMenu = () => setIsOpen(false);

  return (
    <div className="md:hidden">
      {/* Botón de apertura */}
      <button 
        onClick={() => setIsOpen(true)} 
        className="p-2 text-slate-400 hover:text-white transition-colors focus:outline-none"
        aria-label="Open Menu"
      >
        <Menu size={24} />
      </button>

      {/* Overlay oscuro: Asegura que sea opaco y bloquee el fondo */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90] animate-in fade-in duration-300" 
          onClick={closeMenu} 
        />
      )}

      {/* Menú Deslizable: bg sólido y z-index máximo */}
      <div className={cn(
        "fixed inset-y-0 left-0 z-[100] w-[280px] bg-[#0B0E14] border-r border-slate-800 transition-transform duration-300 ease-in-out shadow-2xl flex flex-col",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        
        <div className="p-6 flex justify-between items-center border-b border-slate-800 shrink-0">
          <Link href="/dashboard" onClick={closeMenu} className="flex items-center gap-1">
            <span className="text-xl font-bold text-white tracking-tight">SUMADOTS</span>
            <span className="text-xl font-bold text-blue-500">.OS</span>
          </Link>
          <button onClick={closeMenu} className="text-slate-400 hover:text-white p-1">
            <X size={24} />
          </button>
        </div>

        <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
          <MobileLink 
            href="/dashboard" 
            label="Dashboard" 
            icon={<LayoutDashboard size={20}/>} 
            active={pathname === '/dashboard'} 
            onClick={closeMenu} 
          />
          
          <div className="pt-4 pb-2">
            <p className="px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-2">
              Estrategia
            </p>
            <MobileLink href="/strategy" label="Strategy Board" icon={<Target size={20}/>} active={pathname === '/strategy'} onClick={closeMenu} />
            <MobileLink href="/strategy/levers" label="RevOps Monitor" icon={<Activity size={20}/>} active={pathname === '/strategy/levers'} onClick={closeMenu} />
            <MobileLink href="/strategy/experiments" label="Growth Lab" icon={<FlaskConical size={20}/>} active={pathname === '/strategy/experiments'} onClick={closeMenu} />
          </div>

          <div className="pt-4">
            <p className="px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-2">
              Operación
            </p>
            <MobileLink href="/blueprints" label="Blueprints" icon={<FileText size={20}/>} active={pathname === '/blueprints'} onClick={closeMenu} />
            <div className="mt-1">
                <ExecutionSidebarItem isCollapsed={false} />
            </div>
          </div>
        </nav>

        {/* Footer del móvil para consistencia */}
        <div className="p-4 border-t border-slate-800 bg-[#0B0E14]">
           <div className="flex items-center gap-3 px-2">
              <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">
                PA
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Pablo Abuhomor</p>
              </div>
           </div>
        </div>
      </div>
    </div>
  );
};

const MobileLink = ({ href, label, icon, active, onClick }: any) => (
  <Link 
    href={href} 
    onClick={onClick} 
    className={cn(
        "flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all",
        active 
          ? "bg-blue-600/20 text-blue-400 border border-blue-500/30" 
          : "text-slate-400 hover:text-white hover:bg-white/5"
    )}
  >
    {icon} <span>{label}</span>
  </Link>
);