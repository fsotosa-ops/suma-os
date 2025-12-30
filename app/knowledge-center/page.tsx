'use client';

import { useState } from 'react';
import { 
  Search, 
  Layout, 
  Activity, 
  Database, 
  Plus,
  ArrowUpRight,
  FileText,
  Settings,
  Shield
} from 'lucide-react';
import { DocExplorer } from './components/DocExplorer';
import { DomainGrid } from './components/DomainGrid';
import { ServiceBlueprintView } from './components/ServiceBlueprintView';

export default function KnowledgeCenterPage() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  return (
    <div className="flex h-screen w-full bg-[#08090a] text-slate-200 overflow-hidden font-sans">
      
      {/* NAVEGACIÓN IZQUIERDA: Estricta por Dominios RevOps */}
      <DocExplorer onSelectDoc={setSelectedDoc} selectedDoc={selectedDoc} />

      <main className="flex-1 flex flex-col min-w-0 h-full relative border-l border-white/[0.03]">
        
        {/* HEADER: Limpio, estilo Huly */}
        <header className="h-14 border-b border-white/[0.06] flex items-center justify-between px-8 bg-[#08090a]/80 backdrop-blur-md sticky top-0 z-40 shrink-0">
          <div className="flex items-center gap-4">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em] font-mono">
              Knowledge Repository
            </span>
            {selectedDoc && (
              <div className="flex items-center gap-2 text-white">
                <span className="text-slate-600">/</span>
                <span className="text-xs font-semibold tracking-tight">{selectedDoc}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={14} />
              <input 
                placeholder="Buscar en el stack..." 
                className="w-full bg-white/[0.03] border border-white/[0.06] rounded-full pl-9 pr-4 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500/50 transition-all font-mono"
              />
            </div>
            <button className="bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-lg transition-all">
              <Plus size={16} />
            </button>
          </div>
        </header>

        {/* CONTENIDO DINÁMICO */}
        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {!selectedDoc ? (
            <div className="p-10 max-w-6xl mx-auto space-y-10">
               <div className="space-y-2">
                  <h1 className="text-3xl font-semibold text-white tracking-tight">System Architecture & Ops</h1>
                  <p className="text-slate-400 text-sm">El puente entre las métricas de RevOps y la infraestructura DevTech.</p>
               </div>
               
               {/* Vista de Dominios (Cuadros grandes e intuitivos) */}
               <DomainGrid onSelect={setSelectedDoc} />
            </div>
          ) : (
            /* Vista de "Service Blueprint": Aquí conviven ambos mundos */
            <ServiceBlueprintView docId={selectedDoc} onBack={() => setSelectedDoc(null)} />
          )}
        </div>
      </main>
    </div>
  );
}