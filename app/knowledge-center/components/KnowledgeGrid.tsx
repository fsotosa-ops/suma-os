'use client';

import React from 'react';
import { Card } from "@/components/ui/card";
import { FileText, Clock, Layers, Book, MoreHorizontal, User } from 'lucide-react';

export const KnowledgeGrid = () => {
  return (
    <div className="space-y-12 animate-in fade-in slide-in-from-bottom-2 duration-700">
      {/* Feed de Actividad */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
          <Clock size={12} /> Recent Activity
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          <DocCard title="Standard Operativo Integración v4" author="Pablo A." date="Hace 2h" type="Integración" />
          <DocCard title="Manual de Atribución Revenue" author="Suma OS" date="Ayer" type="Finanzas" />
          <DocCard title="Mapping de Errores TMS" author="Pablo A." date="Lun" type="DevDocs" />
        </div>
      </section>

      {/* Directorio de Espacios */}
      <section className="space-y-4">
        <h2 className="flex items-center gap-2 text-[10px] font-bold text-slate-600 uppercase tracking-[0.2em]">
          <Layers size={12} /> Managed Workspaces
        </h2>
        <div className="bg-[#0f1113]/50 border border-white/[0.06] rounded-xl divide-y divide-white/[0.04]">
          <WorkspaceRow title="Automatizaciones Hubspot/TMS" items="15 Integration Scripts" updated="Hoy" />
          <WorkspaceRow title="Manuales de Usuario Operador" items="8 PDF Guides" updated="10 Dic" />
          <WorkspaceRow title="Documentación Base de Datos" items="22 Schema Blueprints" updated="Hace 1 semana" />
        </div>
      </section>
    </div>
  );
};

const DocCard = ({ title, author, date, type }: any) => (
  <Card className="bg-[#0f1113] border-white/[0.06] p-5 hover:border-blue-500/40 transition-all cursor-pointer group shadow-none relative">
    <div className="absolute top-0 left-0 w-full h-[2px] bg-blue-500/0 group-hover:bg-blue-500/40 transition-all" />
    <div className="flex justify-between items-start mb-6">
      <div className="flex flex-col gap-1">
        <span className="text-[9px] font-bold text-blue-500 uppercase tracking-widest font-mono">{type}</span>
        <h3 className="text-sm font-semibold text-slate-200 leading-snug group-hover:text-white transition-colors">{title}</h3>
      </div>
      <MoreHorizontal size={18} className="text-slate-700 hover:text-slate-400 transition-colors" />
    </div>
    <div className="flex items-center justify-between border-t border-white/[0.04] pt-4">
      <div className="flex items-center gap-2 text-[10px] text-slate-500 font-mono italic uppercase">
        <User size={10} /> {author}
      </div>
      <span className="text-[9px] text-slate-600 font-mono">{date}</span>
    </div>
  </Card>
);

const WorkspaceRow = ({ title, items, updated }: any) => (
  <div className="p-5 flex items-center justify-between hover:bg-white/[0.02] transition-all cursor-pointer group">
    <div className="flex items-center gap-5">
      <div className="w-12 h-12 rounded-xl bg-white/[0.03] border border-white/[0.04] flex items-center justify-center text-slate-600 group-hover:text-blue-400 group-hover:border-blue-500/20 group-hover:bg-blue-500/5 transition-all">
        <Book size={20} strokeWidth={1.5} />
      </div>
      <div>
        <h4 className="text-sm font-medium text-slate-200 mb-1 group-hover:text-blue-300 transition-colors">{title}</h4>
        <span className="text-[10px] text-slate-600 font-mono tracking-wider">{items}</span>
      </div>
    </div>
    <div className="text-right">
        <span className="text-[9px] text-slate-500 font-mono block mb-1">LAST SYNC</span>
        <span className="text-[10px] text-slate-400 font-mono uppercase">{updated}</span>
    </div>
  </div>
);