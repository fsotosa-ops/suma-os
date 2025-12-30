'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation'; // <--- Importante
import { Menu, X, LayoutDashboard, Target, FileText } from 'lucide-react';
import { cn } from '@/lib/utils';

export const MobileSidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const params = useParams();
  const projectId = params?.projectId as string || 'suma-os'; // Fallback
  
  const closeMenu = () => setIsOpen(false);

  // Helper para rutas
  const projectLink = (path: string) => `/${projectId}${path}`;

  return (
    <div className="md:hidden">
      <button onClick={() => setIsOpen(true)} className="p-2 text-slate-400 hover:text-white"><Menu size={24} /></button>
      
      {isOpen && <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-[90]" onClick={closeMenu} />}
      
      <div className={cn(
        "fixed inset-y-0 left-0 z-[100] w-[280px] bg-[#08090a] border-r border-white/[0.06] transition-transform duration-300",
        isOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="p-6 flex justify-between items-center border-b border-white/[0.06]">
          <span className="text-xl font-bold text-white font-mono">BUSINESS.OS</span>
          <button onClick={closeMenu} className="text-slate-400"><X size={24} /></button>
        </div>
        
        <nav className="p-4 space-y-2">
          <MobileLink 
            href={projectLink('/dashboard')} 
            label="Dashboard" 
            icon={<LayoutDashboard size={20}/>} 
            onClick={closeMenu} 
          />
          
          <div className="py-2">
            <p className="px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Estrategia</p>
            <MobileLink 
                href={projectLink('/strategy')} 
                label="Strategy" 
                icon={<Target size={20}/>} 
                onClick={closeMenu} 
            />
          </div>
          
          <div className="py-2">
            <p className="px-4 text-[10px] font-bold text-zinc-600 uppercase tracking-widest mb-1">Project Management</p>
            <MobileLink 
                href={projectLink('/knowledge-center')} 
                label="Knowledge Center" 
                icon={<FileText size={20}/>} 
                onClick={closeMenu} 
            />
          </div>
        </nav>
      </div>
    </div>
  );
};

const MobileLink = ({ href, label, icon, onClick }: any) => (
  <Link href={href} onClick={onClick} className="flex items-center gap-3 px-4 py-3 text-sm font-medium rounded-lg text-slate-400 hover:text-white hover:bg-white/5 transition-colors">
    {icon} <span>{label}</span>
  </Link>
);