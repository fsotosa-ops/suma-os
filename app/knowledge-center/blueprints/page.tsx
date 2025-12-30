'use client';

import { useState } from 'react';
import { Search, Plus, Layout } from 'lucide-react';
import { DocExplorer } from '..//components/DocExplorer';
import { DomainGrid } from '..//components/DomainGrid';
import { ServiceBlueprintView } from '..//components/ServiceBlueprintView';

export default function KnowledgeCenterPage() {
  const [selectedDoc, setSelectedDoc] = useState<string | null>(null);

  // Función para crear un nuevo mapa (puedes expandirlo con un Modal)
  const handleCreateNew = () => {
    const newName = prompt("Nombre del nuevo Mapa de Servicio:");
    if (newName) setSelectedDoc(newName);
  };

  return (
    <div className="flex h-screen w-full bg-[#08090a] text-slate-200 overflow-hidden font-sans">
      
      {/* Ahora pasamos handleCreateNew al explorador */}
      <DocExplorer onSelectDoc={setSelectedDoc} selectedDoc={selectedDoc} onCreateNew={handleCreateNew} />

      <main className="flex-1 flex flex-col min-w-0 h-full relative border-l border-white/[0.03]">
        <header className="h-14 border-b border-white/[0.06] flex items-center justify-between px-8 bg-[#08090a]/80 backdrop-blur-md sticky top-0 z-40 shrink-0">
          <div className="flex items-center gap-4 font-mono">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
              Knowledge Hub
            </span>
            {selectedDoc && <span className="text-white text-xs">/ {selectedDoc}</span>}
          </div>

          <div className="flex items-center gap-4">
            {/* BOTÓN CON LA CRUZ: Ahora habilitado */}
            <button 
                onClick={handleCreateNew}
                className="bg-blue-600 hover:bg-blue-500 text-white p-1.5 rounded-lg transition-all shadow-lg shadow-blue-900/20 active:scale-95"
            >
              <Plus size={16} strokeWidth={3} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto custom-scrollbar">
          {!selectedDoc ? (
            <div className="p-10 max-w-6xl mx-auto space-y-10">
               <div className="space-y-2">
                  <h1 className="text-3xl font-semibold text-white tracking-tight">System Architecture & Ops</h1>
                  <p className="text-slate-400 text-sm">Synchronized directory between business levers and cloud infrastructure.</p>
               </div>
               <DomainGrid onSelect={setSelectedDoc} />
            </div>
          ) : (
            <ServiceBlueprintView docId={selectedDoc} onBack={() => setSelectedDoc(null)} />
          )}
        </div>
      </main>
    </div>
  );
}