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
  ChevronRight 
} from 'lucide-react';
import { ExecutionSidebarItem } from './ExecutionSidebarItem'; 

export const Sidebar = () => {
  // Estado para controlar si está colapsado
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <aside 
      className={`hidden md:flex flex-col border-r border-gray-800 h-screen bg-[#0B0E14] flex-shrink-0 transition-all duration-300 ease-in-out ${
        isCollapsed ? 'w-20' : 'w-[280px]'
      }`}
    >
      
      {/* 1. HEADER & TOGGLE */}
      <div className={`p-6 flex items-center ${isCollapsed ? 'justify-center' : 'justify-between'}`}>
        {!isCollapsed && (
          <Link href="/" className="flex items-center gap-1 overflow-hidden whitespace-nowrap">
            <span className="text-xl font-bold text-white tracking-tight">SUMADOTS</span>
            <span className="text-xl font-bold text-blue-500">.OS</span>
          </Link>
        )}
        <button 
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 rounded-lg text-gray-500 hover:bg-gray-800 hover:text-white transition-colors"
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
        />
        <SidebarLink 
          href="/strategy" 
          label="Strategy" 
          icon={<Target size={20} />} 
          isCollapsed={isCollapsed} 
        />
        <SidebarLink 
          href="/blueprints" 
          label="Blueprints" 
          icon={<FileText size={20} />} 
          isCollapsed={isCollapsed} 
        />
        
        {/* Pasamos el estado al componente hijo */}
        <ExecutionSidebarItem isCollapsed={isCollapsed} />
      </nav>

      {/* 3. FOOTER */}
      <div className="p-4 mt-auto border-t border-gray-800 space-y-4">
        {!isCollapsed ? (
          <>
            <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#1A1F2E] hover:bg-[#23293a] border border-blue-900/30 rounded-xl transition-all group whitespace-nowrap">
              <MessageSquare size={20} className="text-blue-400 group-hover:text-blue-300" />
              <span className="text-sm font-medium text-blue-100">Talk to CTO</span>
            </button>

            <div className="flex items-center gap-3 px-2 pt-2 overflow-hidden">
              <div className="w-9 h-9 shrink-0 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold text-white border border-gray-700">
                PA
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-white truncate">Pablo Abuhomor</p>
                <p className="text-[10px] text-gray-500 truncate uppercase tracking-wider">WEBCARGA SPA</p>
              </div>
              <button className="text-gray-500 hover:text-white transition-colors">
                <Settings size={18} />
              </button>
            </div>
          </>
        ) : (
          <div className="flex flex-col items-center gap-4">
             <button className="p-2 bg-[#1A1F2E] rounded-xl text-blue-400">
               <MessageSquare size={20} />
             </button>
             <div className="w-8 h-8 rounded-full bg-gray-700 flex items-center justify-center text-xs text-white">PA</div>
          </div>
        )}
      </div>
    </aside>
  );
};

// Componente de Link actualizado
const SidebarLink = ({ href, label, icon, isCollapsed }: any) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link 
      href={href} 
      className={`flex items-center gap-3 px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
        isActive ? 'text-blue-400 bg-blue-500/10' : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
      } ${isCollapsed ? 'justify-center' : ''}`}
    >
      <div className={isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'}>
        {icon}
      </div>
      {!isCollapsed && <span className="whitespace-nowrap transition-opacity duration-200">{label}</span>}
    </Link>
  );
};