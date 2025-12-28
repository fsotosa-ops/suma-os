// src/components/shared/Sidebar.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { ExecutionSidebarItem } from './ExecutionSidebarItem';

export const Sidebar = () => {
  return (
    // CAMBIO AQUI: Agregado 'hidden md:flex' para ocultar en móvil y mostrar en desktop
    <aside className="hidden md:flex w-[280px] bg-[#0B0E14] border-r border-gray-800 h-screen flex-col flex-shrink-0 transition-all duration-300">
      
      {/* 1. LOGO AREA */}
      <div className="p-8 pb-8">
        <Link href="/" className="flex items-center gap-1">
          <span className="text-xl font-bold text-white tracking-tight">SUMADOTS</span>
          <span className="text-xl font-bold text-blue-500">.OS</span>
        </Link>
      </div>

      {/* 2. NAVIGATION LINKS */}
      <nav className="flex-1 px-4 space-y-1 overflow-y-auto custom-scrollbar">
        
        <SidebarLink 
          href="/dashboard" 
          label="Dashboard" 
          icon={<DashboardIcon />} 
        />

        <SidebarLink 
          href="/strategy" 
          label="Strategy (OKRs)" 
          icon={<StrategyIcon />} 
        />

        <SidebarLink 
          href="/blueprints" 
          label="Blueprints" 
          icon={<BlueprintsIcon />} 
        />

        {/* Item desplegable de Execution */}
        <ExecutionSidebarItem />

      </nav>

      {/* 3. FOOTER AREA (Talk to CTO + User Profile) */}
      <div className="p-4 mt-auto border-t border-gray-800 space-y-4">
        
        {/* Botón CTA */}
        <button className="w-full flex items-center gap-3 px-4 py-3 bg-[#1A1F2E] hover:bg-[#23293a] border border-blue-900/30 rounded-xl transition-all group">
          <div className="w-5 h-5 text-blue-400 group-hover:text-blue-300">
            <ChatIcon />
          </div>
          <span className="text-sm font-medium text-blue-100">Talk to CTO</span>
        </button>

        {/* Perfil de Usuario */}
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

// --- SUBCOMPONENTES AUXILIARES ---

const SidebarLink = ({ href, label, icon }: { href: string; label: string; icon: React.ReactNode }) => {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link 
      href={href}
      className={`flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg transition-all duration-200 group ${
        isActive 
          ? 'text-blue-400 bg-blue-500/10' 
          : 'text-gray-400 hover:text-gray-100 hover:bg-white/5'
      }`}
    >
      <div className={`transition-colors ${isActive ? 'text-blue-400' : 'text-gray-500 group-hover:text-gray-300'}`}>
        {icon}
      </div>
      <span>{label}</span>
    </Link>
  );
};

// --- ICONOS SVG ---

const DashboardIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
  </svg>
);

const StrategyIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
  </svg>
);

const BlueprintsIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
  </svg>
);

const ChatIcon = () => (
  <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
  </svg>
);

const SettingsIcon = () => (
  <svg width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
  </svg>
);