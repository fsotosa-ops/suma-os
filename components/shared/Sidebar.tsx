'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Target, 
  Activity, 
  FlaskConical, 
  Lightbulb, 
  BookOpen, 
  MessageSquare, 
  Settings, 
  ChevronLeft, 
  ChevronRight
} from 'lucide-react';
import { ExecutionSidebarItem } from './ExecutionSidebarItem'; 
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const pathname = usePathname();

  return (
    <aside 
      className={cn(
        "hidden md:flex flex-col border-r border-white/[0.06] h-screen bg-[#08090a] shrink-0 transition-all duration-300 ease-in-out z-40",
        isCollapsed ? 'w-20' : 'w-[280px]'
      )}
    >
      <div className={cn("p-6 flex items-center", isCollapsed ? 'justify-center' : 'justify-between')}>
        {!isCollapsed && (
          <Link href="/dashboard" className="flex items-center gap-1 overflow-hidden whitespace-nowrap">
            <span className="text-xl font-bold text-white tracking-tight font-mono">SUMADOTS</span>
            <span className="text-xl font-bold text-blue-500 font-mono">.OS</span>
          </Link>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-slate-500 hover:bg-white/[0.05] hover:text-white transition-colors"
        >
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      <nav className="flex-1 px-3 space-y-2 overflow-y-auto custom-scrollbar overflow-x-hidden">
        <SidebarLink 
          href="/dashboard" 
          label="Dashboard" 
          icon={<LayoutDashboard size={20} />} 
          isCollapsed={isCollapsed} 
          active={pathname === '/dashboard'}
        />
        
        <div className="pt-4 pb-1">
            {!isCollapsed && <p className="px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Estrategia</p>}
            <SidebarLink href="/strategy" label="Strategy Board" icon={<Target size={20} />} isCollapsed={isCollapsed} active={pathname === '/strategy'} />
            <SidebarLink href="/strategy/levers" label="RevOps Monitor" icon={<Activity size={20} />} isCollapsed={isCollapsed} active={pathname === '/strategy/levers'} />
            <SidebarLink href="/strategy/experiments" label="Growth Lab" icon={<FlaskConical size={20} />} isCollapsed={isCollapsed} active={pathname === '/strategy/experiments'} />
        </div>

        {/* CAMBIO DE NOMBRE AQUÍ */}
        <div className="pt-4 pb-1">
             {!isCollapsed && <p className="px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Project Management</p>}
             
             <SidebarLink 
              href="/discovery" 
              label="Discovery" 
              icon={<Lightbulb size={20} />} 
              isCollapsed={isCollapsed} 
              active={pathname.startsWith('/discovery')} 
            />

            <ExecutionSidebarItem isCollapsed={isCollapsed} />
            
            <SidebarLink 
              href="/knowledge-center" 
              label="Knowledge Center" 
              icon={<BookOpen size={20} />} 
              isCollapsed={isCollapsed} 
              active={pathname.startsWith('/knowledge-center')} 
            />
        </div>
      </nav>

      {/* Footer... */}
      <div className="p-4 mt-auto border-t border-white/[0.06] space-y-4">
        {!isCollapsed && (
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-xl transition-all group whitespace-nowrap">
            <MessageSquare size={20} className="text-blue-400" />
            <span className="text-sm font-medium text-blue-100">Talk to CTO</span>
          </button>
        )}
        <div className="flex items-center gap-3 px-2 pt-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">PA</div>
          {!isCollapsed && <div className="flex-1 min-w-0"><p className="text-sm font-medium text-white truncate">Pablo A.</p></div>}
          {!isCollapsed && <Settings size={18} className="text-slate-500" />}
        </div>
      </div>
    </aside>
  );
};

const SidebarLink = ({ href, label, icon, isCollapsed, active }: any) => (
  <Link 
    href={href} 
    className={cn(
      "flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200",
      active ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/[0.02]',
      isCollapsed && 'justify-center'
    )}
  >
    {icon}
    {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
  </Link>
);