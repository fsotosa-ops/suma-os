'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useParams, useRouter } from 'next/navigation';
import { useProjects } from '@/app/context/ProjectContext'; 
import { CreateProjectModal } from './CreateProjectModal';
import { DeleteProjectModal } from './DeleteProjectModal'; // Asegúrate de crear este componente

import { 
  LayoutDashboard, Target, Activity, FlaskConical, BookOpen, 
  Settings, ChevronLeft, ChevronRight, Plus, ChevronsUpDown, Check, Trash2 
} from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ExecutionSidebarItem } from './ExecutionSidebarItem'; 
import { DiscoverySidebarItem } from './DiscoverySidebarItem'; 
import { cn } from '@/lib/utils';

export const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<{id: string, name: string} | null>(null);
  
  const pathname = usePathname();
  const params = useParams();
  const router = useRouter();
  const { projects, addProject, deleteProject } = useProjects();
  
  const projectId = params?.projectId as string || 'suma-os';
  const activeProject = projects.find(p => p.id === projectId) || projects[0];

  const projectLink = (path: string) => `/${projectId}${path}`;

  const openDeleteConfirmation = (id: string, name: string) => {
    setProjectToDelete({ id, name });
    setIsDeleteModalOpen(true);
  };

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

      {/* PROJECT SWITCHER PREMIUM */}
      <div className="px-4 mb-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className={cn(
              "w-full flex items-center gap-3 p-2 rounded-xl bg-zinc-900/50 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 transition-all text-left outline-none",
              isCollapsed && "justify-center"
            )}>
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-indigo-700 flex items-center justify-center text-white font-bold shrink-0">
                {activeProject?.name?.substring(0, 1).toUpperCase()}
              </div>
              {!isCollapsed && (
                <>
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-black text-zinc-500 uppercase tracking-tighter leading-none mb-1">Proyecto Activo</p>
                    <p className="text-sm font-bold text-white truncate leading-none">{activeProject?.name}</p>
                  </div>
                  <ChevronsUpDown size={14} className="text-zinc-500" />
                </>
              )}
            </button>
          </DropdownMenuTrigger>
          
          <DropdownMenuContent className="w-[260px] bg-[#151921] border-zinc-800 text-white shadow-2xl" align="start" side="right" sideOffset={10}>
            <DropdownMenuLabel className="text-zinc-500 text-[10px] uppercase font-bold px-3 py-2">Cambiar de Espacio</DropdownMenuLabel>
            <DropdownMenuSeparator className="bg-white/5" />
            
            <div className="max-h-[300px] overflow-y-auto custom-scrollbar">
                {projects.map(p => (
                <div key={p.id} className="group/item flex items-center pr-2 hover:bg-white/5 transition-colors">
                    <DropdownMenuItem 
                    onClick={() => router.push(`/${p.id}/dashboard`)}
                    className="flex-1 flex items-center justify-between px-3 py-2.5 cursor-pointer focus:bg-transparent"
                    >
                        <div className="flex items-center gap-3">
                            <div className="w-6 h-6 rounded bg-zinc-800 flex items-center justify-center text-[10px] font-bold">
                                {p.name.substring(0, 1).toUpperCase()}
                            </div>
                            <span className="text-sm font-medium">{p.name}</span>
                        </div>
                        {p.id === projectId && <Check size={14} className="text-blue-500" />}
                    </DropdownMenuItem>
                    
                    <button 
                        onClick={(e) => { e.stopPropagation(); openDeleteConfirmation(p.id, p.name); }}
                        className="p-2 text-zinc-600 hover:text-red-400 hover:bg-red-500/10 rounded-md opacity-0 group-hover/item:opacity-100 transition-all"
                        title="Eliminar Proyecto"
                    >
                        <Trash2 size={14} />
                    </button>
                </div>
                ))}
            </div>

            <DropdownMenuSeparator className="bg-white/5" />
            <DropdownMenuItem 
              onClick={() => setIsCreateModalOpen(true)}
              className="px-3 py-3 cursor-pointer text-blue-400 focus:text-blue-300 focus:bg-blue-500/10 font-bold text-xs flex items-center gap-2"
            >
              <Plus size={16} /> 
              CREAR NUEVO PROYECTO
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      {/* Navegación Restante */}
      <nav className="flex-1 px-3 space-y-2 overflow-y-auto custom-scrollbar">
        <SidebarLink href={projectLink('/dashboard')} label="Dashboard" icon={<LayoutDashboard size={20} />} isCollapsed={isCollapsed} active={pathname.endsWith('/dashboard')} />
        <div className="pt-4 pb-1">
            <p className={cn("px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2", isCollapsed && "hidden")}>Estrategia</p>
            <SidebarLink href={projectLink('/strategy')} label="Strategy Board" icon={<Target size={20} />} isCollapsed={isCollapsed} active={pathname.endsWith('/strategy')} />
            <SidebarLink href={projectLink('/strategy/levers')} label="RevOps Monitor" icon={<Activity size={20} />} isCollapsed={isCollapsed} active={pathname.includes('/levers')} />
            <SidebarLink href={projectLink('/strategy/experiments')} label="Growth Lab" icon={<FlaskConical size={20} />} isCollapsed={isCollapsed} active={pathname.includes('/experiments')} />
        </div>
        <div className="pt-4 pb-1">
             <p className={cn("px-3 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-2", isCollapsed && "hidden")}>Project Management</p>
             <DiscoverySidebarItem isCollapsed={isCollapsed} />
             <ExecutionSidebarItem isCollapsed={isCollapsed} />
             <SidebarLink href={projectLink('/knowledge-center')} label="Knowledge Center" icon={<BookOpen size={20} />} isCollapsed={isCollapsed} active={pathname.includes('/knowledge-center')} />
        </div>
      </nav>
      {/* ... footer ... */}
    </aside>

    {/* MODALES */}
    <CreateProjectModal 
        isOpen={isCreateModalOpen} 
        onClose={() => setIsCreateModalOpen(false)} 
        onSubmit={addProject} 
    />
    <DeleteProjectModal 
        isOpen={isDeleteModalOpen}
        onClose={() => setIsDeleteModalOpen(false)}
        projectName={projectToDelete?.name || ''}
        onConfirm={() => projectToDelete && deleteProject(projectToDelete.id)}
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