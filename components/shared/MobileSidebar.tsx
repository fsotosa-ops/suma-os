'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { useProjects } from '@/app/context/ProjectContext';
import { usePermissions } from '@/app/hooks/userPermissions'; // [NUEVO]
import { Project } from '@/app/types'; 
import { Menu, X, LayoutDashboard, Target, Activity, FlaskConical, BookOpen, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { DiscoverySidebarItem } from './DiscoverySidebarItem';
import { ExecutionSidebarItem } from './ExecutionSidebarItem';
import { SettingsModal } from './SettingsModal'; 

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  
  // [NUEVO] Permisos
  const { canManageStrategy, canManageDiscovery, canExecute } = usePermissions();

  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const { projects } = useProjects();
  
  const projectId = params?.projectId as string || 'suma-os';
  
  const closeMenu = () => setIsOpen(false);
  const projectLink = (path: string) => `/${projectId}${path}`;

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(true)} className="p-2 text-slate-400 hover:text-white transition-colors">
        <Menu size={24} />
      </button>
      
      {isOpen && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-[90] animate-in fade-in duration-300" onClick={closeMenu} />
      )}
      
      <div className={cn(
        "fixed inset-y-0 left-0 z-[100] w-[300px] bg-[#08090a] border-r border-white/[0.06] transition-transform duration-300 ease-out shadow-2xl",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        {/* Header */}
        <div className="p-6 flex justify-between items-center border-b border-white/[0.06]">
          <Link href={projectLink('/dashboard')} onClick={closeMenu} className="flex items-center gap-1">
            <span className="text-xl font-bold text-white font-mono">BUSINESS</span>
            <span className="text-xl font-bold text-blue-500 font-mono">.OS</span>
          </Link>
          <button onClick={closeMenu} className="p-2 text-slate-500 hover:text-white bg-white/5 rounded-lg">
            <X size={20} />
          </button>
        </div>

        <div className="flex flex-col h-[calc(100vh-80px)] overflow-hidden">
          {/* Mobile Project Selector */}
          <div className="p-4 border-b border-white/[0.06] bg-white/[0.02]">
            <p className="px-2 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-3">Espacio de Trabajo</p>
            <div className="space-y-2 max-h-[160px] overflow-y-auto custom-scrollbar px-1">
                {projects.map((p: Project) => (
                  <button 
                    key={p.id}
                    onClick={() => { router.push(`/${p.id}/dashboard`); closeMenu(); }}
                    className={cn(
                        "w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all",
                        p.id === projectId ? "bg-blue-600/10 text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-900/10" : "text-zinc-500 hover:text-zinc-200"
                    )}
                  >
                    <div className={cn("w-6 h-6 rounded flex items-center justify-center text-[10px] font-bold", p.id === projectId ? "bg-blue-500 text-white" : "bg-zinc-800")}>
                        {p.name.substring(0, 1).toUpperCase()}
                    </div>
                    <span className="truncate">{p.name}</span>
                  </button>
                ))}
            </div>
          </div>
          
          {/* Navegación Móvil */}
          <nav className="flex-1 p-4 space-y-2 overflow-y-auto custom-scrollbar">
            <MobileLink href={projectLink('/dashboard')} label="Dashboard" icon={<LayoutDashboard size={20}/>} active={pathname.endsWith('/dashboard')} onClick={closeMenu} />
            
            {/* [LOGICA] Estrategia */}
            {canManageStrategy && (
              <div className="py-2">
                <p className="px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Estrategia</p>
                <MobileLink href={projectLink('/strategy')} label="Strategy Board" icon={<Target size={20}/>} active={pathname.endsWith('/strategy')} onClick={closeMenu} />
                <MobileLink href={projectLink('/strategy/levers')} label="RevOps Monitor" icon={<Activity size={20}/>} active={pathname.includes('/levers')} onClick={closeMenu} />
                <MobileLink href={projectLink('/strategy/experiments')} label="Growth Lab" icon={<FlaskConical size={20}/>} active={pathname.includes('/experiments')} onClick={closeMenu} />
              </div>
            )}
            
            {/* [LOGICA] Management */}
            {(canManageDiscovery || canExecute) && (
              <div className="py-2">
                <p className="px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Management</p>
                
                {canManageDiscovery && <DiscoverySidebarItem isCollapsed={false} />}
                {canExecute && <ExecutionSidebarItem isCollapsed={false} />}
                
                <MobileLink href={projectLink('/knowledge-center')} label="Knowledge Center" icon={<BookOpen size={20}/>} active={pathname.includes('/knowledge-center')} onClick={closeMenu} />
              </div>
            )}
          </nav>

          {/* Footer Móvil */}
          <div className="p-6 border-t border-white/[0.06] mt-auto">
            <button 
              onClick={() => { setIsSettingsOpen(true); closeMenu(); }}
              className="flex items-center gap-3 w-full text-left group"
            >
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-sm group-active:scale-95 transition-transform">AD</div>
                <div className="flex-1">
                    <p className="text-sm font-bold text-white">Admin User</p>
                    <p className="text-xs text-zinc-500">Configuración</p>
                </div>
            </button>
          </div>
        </div>
      </div>

      <SettingsModal isOpen={isSettingsOpen} onClose={() => setIsSettingsOpen(false)} />
    </div>
  );
};

const MobileLink = ({ href, label, icon, active, onClick }: any) => (
  <Link 
    href={href} 
    onClick={onClick} 
    className={cn(
        "flex items-center gap-4 px-4 py-3 text-sm font-medium rounded-xl transition-all", 
        active ? "bg-blue-600/10 text-blue-400 border border-blue-500/20" : "text-slate-400 hover:text-white"
    )}
  >
    {icon} <span>{label}</span>
    {active && <ChevronRight size={14} className="ml-auto opacity-50" />}
  </Link>
);