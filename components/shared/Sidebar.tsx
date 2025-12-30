'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
// Importamos el nuevo hook y el modal
import { useProjects } from '@/app/context/ProjectContext'; 
import { CreateProjectModal } from './CreateProjectModal';

import { 
  LayoutDashboard, Target, Activity, FlaskConical, BookOpen, 
  MessageSquare, Settings, ChevronLeft, ChevronRight, Briefcase, Plus 
} from 'lucide-react';
import { ExecutionSidebarItem } from './ExecutionSidebarItem'; 
import { DiscoverySidebarItem } from './DiscoverySidebarItem'; 
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false); // Estado para el modal
  
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  
  // Usamos el contexto global en lugar de una constante
  const { projects, addProject } = useProjects();
  
  // ID del proyecto actual desde la URL (fallback a 'suma-os' si falla)
  const projectId = params?.projectId as string || 'suma-os';
  const activeProject = projects.find(p => p.id === projectId) || projects[0];

  const handleProjectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    if (val === '__new__') {
        setIsModalOpen(true); // Abrir modal si selecciona "Crear Nuevo"
    } else {
        router.push(`/${val}/dashboard`);
    }
  };

  const projectLink = (path: string) => `/${projectId}${path}`;

  return (
    <>
    <aside className={cn("hidden md:flex flex-col border-r border-white/[0.06] h-screen bg-[#08090a] shrink-0 transition-all duration-300 ease-in-out z-40", isCollapsed ? 'w-20' : 'w-[280px]')}>
      
      {/* Header Marca */}
      <div className={cn("p-6 flex items-center", isCollapsed ? 'justify-center' : 'justify-between')}>
        {!isCollapsed && (
          <Link href={projectLink('/dashboard')} className="flex items-center gap-1 overflow-hidden whitespace-nowrap">
            <span className="text-xl font-bold text-white tracking-tight font-mono">BUSINESS</span>
            <span className="text-xl font-bold text-blue-500 font-mono">.OS</span>
          </Link>
        )}
        <button onClick={() => setIsCollapsed(!isCollapsed)} className="p-1.5 rounded-lg text-slate-500 hover:bg-white/[0.05] hover:text-white transition-colors">
          {isCollapsed ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}
        </button>
      </div>

      {/* SELECTOR DE PROYECTOS CON BOTÓN INTEGRADO */}
      {!isCollapsed ? (
        <div className="px-6 mb-6">
            <div className="flex justify-between items-center mb-2 px-1">
                <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest">Proyecto Activo</span>
                <button onClick={() => setIsModalOpen(true)} className="text-zinc-500 hover:text-blue-400 transition-colors p-1 hover:bg-white/5 rounded" title="Crear Proyecto">
                    <Plus size={14} />
                </button>
            </div>
            
            <div className="relative group">
                <select 
                    value={projectId}
                    onChange={handleProjectChange}
                    className="w-full appearance-none bg-zinc-900/50 border border-zinc-800 text-zinc-200 text-sm font-medium rounded-xl px-3 py-2.5 outline-none focus:border-blue-500/50 cursor-pointer hover:bg-zinc-900 transition-all"
                >
                    {projects.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
                    <option disabled>──────────</option>
                    <option value="__new__" className="text-blue-400 font-bold">+ Crear Nuevo Proyecto</option>
                </select>
                <Briefcase size={14} className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 pointer-events-none group-hover:text-zinc-300 transition-colors" />
            </div>
        </div>
      ) : (
        <div className="px-2 mb-6 flex justify-center">
            <button onClick={() => setIsModalOpen(true)} className="w-10 h-10 rounded-xl bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 font-bold text-xs hover:bg-blue-500/20 transition-all" title={activeProject?.name}>
                {activeProject?.name?.substring(0, 2).toUpperCase() || 'P'}
            </button>
        </div>
      )}

      {/* Navegación */}
      <nav className="flex-1 px-3 space-y-2 overflow-y-auto custom-scrollbar overflow-x-hidden">
        <SidebarLink href={projectLink('/dashboard')} label="Dashboard" icon={<LayoutDashboard size={20} />} isCollapsed={isCollapsed} active={pathname.endsWith('/dashboard')} />
        
        <div className="pt-4 pb-1">
            {!isCollapsed && <p className="px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Estrategia</p>}
            <SidebarLink href={projectLink('/strategy')} label="Strategy Board" icon={<Target size={20} />} isCollapsed={isCollapsed} active={pathname.endsWith('/strategy')} />
            <SidebarLink href={projectLink('/strategy/levers')} label="RevOps Monitor" icon={<Activity size={20} />} isCollapsed={isCollapsed} active={pathname.includes('/levers')} />
            <SidebarLink href={projectLink('/strategy/experiments')} label="Growth Lab" icon={<FlaskConical size={20} />} isCollapsed={isCollapsed} active={pathname.includes('/experiments')} />
        </div>

        <div className="pt-4 pb-1">
             {!isCollapsed && <p className="px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2">Project Management</p>}
             <DiscoverySidebarItem isCollapsed={isCollapsed} />
             <ExecutionSidebarItem isCollapsed={isCollapsed} />
             <SidebarLink href={projectLink('/knowledge-center')} label="Knowledge Center" icon={<BookOpen size={20} />} isCollapsed={isCollapsed} active={pathname.includes('/knowledge-center')} />
        </div>
      </nav>

      {/* Footer */}
      <div className="p-4 mt-auto border-t border-white/[0.06] space-y-4">
        {!isCollapsed && (
          <button className="w-full flex items-center gap-3 px-4 py-3 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] rounded-xl transition-all group whitespace-nowrap">
            <MessageSquare size={20} className="text-blue-400" />
            <span className="text-sm font-medium text-blue-100">Soporte</span>
          </button>
        )}
        <div className="flex items-center gap-3 px-2 pt-2">
          <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-xs font-bold text-white">AD</div>
          {!isCollapsed && <div className="flex-1 min-w-0"><p className="text-sm font-medium text-white truncate">Admin</p></div>}
          {!isCollapsed && <Settings size={18} className="text-slate-500" />}
        </div>
      </div>
    </aside>

    {/* MODAL PARA CREAR PROYECTO */}
    <CreateProjectModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={addProject} 
    />
    </>
  );
};

const SidebarLink = ({ href, label, icon, isCollapsed, active }: any) => (
  <Link href={href} className={cn("flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200", active ? 'text-blue-400 bg-blue-500/10 border border-blue-500/20' : 'text-slate-400 hover:text-white hover:bg-white/[0.02]', isCollapsed && 'justify-center')}>
    {icon}
    {!isCollapsed && <span className="whitespace-nowrap">{label}</span>}
  </Link>
);