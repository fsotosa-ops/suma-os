'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Target, 
  FileText, 
  MessageSquare, 
  Settings, 
  ChevronLeft, 
  ChevronRight,
  Activity,
  FlaskConical 
} from 'lucide-react';
import { ExecutionSidebarItem } from './ExecutionSidebarItem'; 
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside 
      className={cn(
        "hidden md:flex flex-col border-r border-slate-800 h-screen bg-[#0B0E14] shrink-0 transition-all duration-300 ease-in-out z-40",
        isCollapsed ? 'w-20' : 'w-[280px]'
      )}
    >
      
      {/* 1. HEADER & TOGGLE */}
      <div className={cn(
        "p-6 flex items-center",
        isCollapsed ? 'justify-center' : 'justify-between'
      )}>
        {!isCollapsed && (
          <Link href="/dashboard" className="flex items-center gap-1 overflow-hidden whitespace-nowrap">
            <span className="text-xl font-bold text-white tracking-tight">SUMADOTS</span>
            <span className="text-xl font-bold text-blue-500">.OS</span>
          </Link>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-800 hover:text-white transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* 2. NAVEGACIÓN */}
      <nav className="flex-1 px-3 space-y-2 overflow-y-auto custom-scrollbar overflow-x-hidden">
        <SidebarLink 
          href="/dashboard" 
          label="Dashboard" 
          icon={<LayoutDashboard size={20} />} 
          isCollapsed={isCollapsed} 
          active={pathname === '/dashboard'}
        />
        
        {/* GRUPO ESTRATEGIA */}
        <div className="pt-2 pb-1">
            {!isCollapsed && (
              <p className="px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                Estrategia
              </p>
            )}
            
            <SidebarLink 
              href="/strategy" 
              label="Strategy Board" 
              icon={<Target size={20} />} 
              isCollapsed={isCollapsed} 
              active={pathname === '/strategy'}
            />
            
            <SidebarLink 
              href="/strategy/levers" 
              label="RevOps Monitor" 
              icon={<Activity size={20} />} 
              isCollapsed={isCollapsed} 
              active={pathname === '/strategy/levers'}
            />
            
            <SidebarLink 
              href="/strategy/experiments" 
              label="Growth Lab" 
              icon={<FlaskConical size={20} />} 
              isCollapsed={isCollapsed} 
              active={pathname === '/strategy/experiments'}
            />
        </div>

        {/* GRUPO OPERACIÓN */}
        <div className="pt-2 pb-1">
             {!isCollapsed && (
               <p className="px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-wider mb-1">
                 Operación
               </p>
             )}
             
            <SidebarLink 
              href="/blueprints" 
              label="Blueprints" 
              icon={<FileText size={20} />} 
              isCollapsed={isCollapsed} 
              active={pathname === '/blueprints'}
            />
            
            <ExecutionSidebarItem isCollapsed={isCollapsed} />
        </div>
      </nav>

      {/* 3. FOOTER PERFIL */}
      <div className="p-4 mt-auto border-t border-slate-800 space-y-4">
        {!isCollapsed ? (
          <>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#1A1F2E] hover:bg-[#23293a] border border-blue-900/30 rounded-xl transition-all group whitespace-nowrap">
              <MessageSquare size={20} className="text-blue-400 group-hover:text-blue-300" />
              <span className="text-sm font-medium text-blue-100">Talk to CTO</span>
            </button>

            <div className="flex items-center gap-3 px-2 pt-2 overflow-hidden">
              <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-tr from-slate-700 to-slate-600 flex items-center justify-center text-xs font-bold text-white border border-slate-700">
                PA
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Pablo Abuhomor</p>
                <p className="text-[10px] text-slate-500 truncate uppercase tracking-wider">WEBCARGA SPA</p>
              </div>
              <button className="text-slate-500 hover:text-white transition-colors">
                <Settings size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
             <button className="p-2 bg-[#1A1F2E] rounded-xl text-blue-400">
               <MessageSquare size={20} />
             </button>
             <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs text-white">PA</div>
          </div>
        )}
      </div>
    </aside>
  );
};

const SidebarLink = ({ href, label, icon, isCollapsed, active }: any) => {
  return (
    <Link 
      href={href} 
      className={cn(
        "flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group",
        active ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' : 'text-slate-400 hover:text-slate-100 hover:bg-white/5',
        isCollapsed && 'justify-center'
      )}
      title={isCollapsed ? label : undefined}
    >
      <div className={cn(active ? 'text-blue-400' : 'text-slate-500 group-hover:text-slate-300')}>
        {icon}
      </div>
      {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
    </Link>
  );
};