'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExecutionSidebarItem } from './ExecutionSidebarItem'; 

export const Sidebar = () => {
  return (
    // VERIFICA QUE ESTA LÍNEA TENGA 'hidden md:flex' AL INICIO
    <aside className="hidden md:flex w-[280px] bg-[#0B0E14] border-r border-gray-800 h-screen flex-col flex-shrink-0 transition-all duration-300">
      
      {/* 1. LOGO AREA */}
      <div className="p-8 pb-8">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-xl font-bold text-white tracking-tight">SUMADOTS</span>
          <span className="text-xl font-bold text-blue-500">.OS</span>
        </Link>
      </div>

      {/* 2. NAVEGACIÓN */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        <SidebarLink href="/dashboard" label="Dashboard" icon={<DashboardIcon />} />
        <SidebarLink href="/strategy" label="Strategy (OKRs)" icon={<StrategyIcon />} />
        <SidebarLink href="/blueprints" label="Blueprints" icon={<BlueprintsIcon />} />
        <ExecutionSidebarItem />
      </nav>

      {/* 3. FOOTER */}
      <div className="p-4 mt-auto border-t border-gray-800 space-y-4">
        <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#1A1F2E] hover:bg-[#23293a] border border-blue-900/30 rounded-xl transition-all group">
          <div className="w-5 h-5 text-blue-400 group-hover:text-blue-300">
            <ChatIcon />
          </div>
          <span className="text-sm font-medium text-blue-100">Talk to CTO</span>
        </button>

        <div className="flex items-center gap-3 px-2 pt-2">
          <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-gray-700 to-gray-600 flex items-center justify-center text-xs font-bold text-white border border-gray-700">
            PA
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-white truncate">Pablo Abuhomor</p>
            <p className="text-[10px] text-gray-500 truncate uppercase tracking-wider">WEBCARGA SPA</p>
          </div>
          <button className="text-gray-500 hover:text-white transition-colors">
            <SettingsIcon />
          </button>
        </div>
      </div>
    </aside>
  );
};

// --- ICONOS AUXILIARES (Necesarios para que no de error) ---
const SidebarLink = ({ href, label, icon }: any) => {
  const pathname = usePathname();
  const isActive = pathname === href;
  return (
    <Link href={href} className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${isActive ? 'text-blue-400 bg-blue-500/10' : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'}`}>
      <div className={isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'}>{icon}</div>
      <span>{label}</span>
    </Link>
  );
};

// Iconos simples para evitar imports rotos si faltan
const DashboardIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>;
const StrategyIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path></svg>;
const BlueprintsIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>;
const ChatIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path></svg>;
const SettingsIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="3"></circle><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path></svg>;