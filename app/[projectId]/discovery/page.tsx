'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDiscovery } from './context/DiscoveryProvider';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
  Users, Map, Heart, Lightbulb, Plus, List, CheckSquare, Calendar, User
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Importamos el Workspace Modularizado
import { DiscoveryWorkspace } from './components/DiscoveryWorkspace';
// Importamos la vista Roadmap
import { RoadmapView } from './components/views/RoadmapView';

// --- VISTAS AUXILIARES (Solo usadas en el index) ---

const PrioritizationView = ({ ideas, onSelect }: any) => {
  const scoredIdeas = ideas.map((idea: any) => ({
    ...idea,
    score: Math.round((idea.impact + idea.confidence + (100 - idea.effort)) / 3)
  })).sort((a: any, b: any) => b.score - a.score);

  return (
    <div className="bg-[#12141A] border border-zinc-800 rounded-xl overflow-hidden">
        <div className="grid grid-cols-6 bg-zinc-900/50 p-4 border-b border-zinc-800 text-xs font-bold text-zinc-500 uppercase tracking-wider">
            <div className="col-span-2">Iniciativa</div>
            <div className="text-center">Impacto</div>
            <div className="text-center">Esfuerzo</div>
            <div className="text-center">Confianza</div>
            <div className="text-center text-pink-500">Score</div>
        </div>
        <div className="divide-y divide-zinc-800/50">
            {scoredIdeas.map((idea: any) => (
                <div key={idea.id} onClick={() => onSelect(idea.id, 'prioritization')} className="grid grid-cols-6 p-4 hover:bg-zinc-900/30 cursor-pointer items-center transition-colors group">
                    <div className="col-span-2 font-medium text-zinc-200 group-hover:text-white transition-colors">{idea.title}</div>
                    <div className="text-center text-zinc-400">{idea.impact}</div>
                    <div className="text-center text-zinc-400">{idea.effort}</div>
                    <div className="text-center text-zinc-400">{idea.confidence}%</div>
                    <div className="text-center font-bold text-pink-400 text-lg">{idea.score}</div>
                </div>
            ))}
        </div>
    </div>
  );
};

const GridView = ({ ideas, onSelect, mode }: { ideas: any[], onSelect: any, mode: string }) => (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {ideas.map(idea => (
            <div key={idea.id} onClick={() => onSelect(idea.id, mode === 'LIST' ? 'personas' : mode.toLowerCase())} className="group bg-zinc-900/30 border border-zinc-800 hover:border-zinc-600 p-5 rounded-xl cursor-pointer transition-all hover:bg-zinc-900/50 relative">
                <div className="flex justify-between mb-3"><span className="text-[10px] font-bold bg-zinc-800 text-zinc-400 px-2 py-1 rounded uppercase tracking-wider">{idea.status}</span></div>
                <h3 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-pink-400 transition-colors">{idea.title}</h3>
                <div className="mt-4 pt-4 border-t border-zinc-800/50 flex items-center gap-3 text-xs text-zinc-400">
                    {mode === 'PERSONAS' && <><User size={14} className="text-pink-500"/> {idea.personas?.length || 0} Arquetipos</>}
                    {mode === 'JOURNEY' && <><Map size={14} className="text-pink-500"/> {idea.userJourney?.length || 0} Pasos</>}
                    {mode === 'EMPATHY' && <><Heart size={14} className="text-pink-500"/> Mapa de Empatía</>}
                    {mode === 'LIST' && (
                        <>
                            <span className="flex items-center gap-1"><User size={12}/> {idea.personas?.length}</span>
                            <span className="flex items-center gap-1"><CheckSquare size={12}/> {idea.actionables?.length}</span>
                        </>
                    )}
                </div>
            </div>
        ))}
    </div>
);

// --- COMPONENTE PRINCIPAL ---

function DiscoveryContent() {
  const { ideas, addIdea, updateIdea, deleteIdea, promoteActionable } = useDiscovery();
  const searchParams = useSearchParams();
  const router = useRouter();

  const currentView = searchParams.get('view') || 'ROADMAP';
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');

  const activeIdea = ideas.find(i => i.id === selectedIdeaId);

  const setViewMode = (view: string) => router.push(`/discovery?view=${view}`);
  
  // Manejador: Selecciona idea y opcionalmente define la sección inicial
  const handleSelectIdea = (id: string, section?: string) => {
      setSelectedIdeaId(id);
      // Nota: La sección se pasa como prop al Workspace, no necesitamos estado local aquí para eso
  };

  const handleConfirmCreate = () => {
    if (!newTitle.trim()) return;
    addIdea({
        id: crypto.randomUUID(), title: newTitle, description: '', status: 'DRAFT', impact: 50, effort: 50, confidence: 50, updatedAt: 'Justo ahora',
        personas: [], empathyMap: { says: '', thinks: '', does: '', feels: '' }, userJourney: [], actionables: [], tags: []
    });
    setNewTitle(''); setIsCreateOpen(false);
  };

  return (
    <div className="p-8 h-full bg-[#020617] text-white overflow-y-auto custom-scrollbar">
      
      {/* Header Page */}
      <div className="flex justify-between items-end mb-8 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3"><Lightbulb className="text-pink-500" /> Discovery Workspace</h1>
          <p className="text-zinc-500 mt-1">Gestión del ciclo de vida de producto.</p>
        </div>
        <div className="flex items-center gap-3">
            <div className="bg-zinc-900 p-1 rounded-lg border border-zinc-800 flex">
                <button onClick={() => setViewMode('ROADMAP')} className={cn("p-2 rounded transition-all", currentView === 'ROADMAP' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300')}><Calendar size={16}/></button>
                <button onClick={() => setViewMode('LIST')} className={cn("p-2 rounded transition-all", currentView === 'LIST' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300')}><List size={16}/></button>
            </div>
            <button onClick={() => setIsCreateOpen(true)} className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 shadow-lg shadow-pink-900/20"><Plus size={16} /> Nueva Idea</button>
        </div>
      </div>

      {/* Renderizado de Vistas (Listados) */}
      {currentView === 'ROADMAP' && <RoadmapView ideas={ideas} onSelect={(id: string) => handleSelectIdea(id, 'personas')} />}
      
      {currentView === 'PRIORITIZATION' && <PrioritizationView ideas={ideas} onSelect={handleSelectIdea} />}
      
      {['LIST', 'PERSONAS', 'EMPATHY', 'JOURNEY'].includes(currentView) && (
        <GridView ideas={ideas} onSelect={handleSelectIdea} mode={currentView} />
      )}

      {/* Modal Crear (Pequeño) */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-[#151921] border-zinc-800 text-white sm:max-w-md">
            <DialogHeader><DialogTitle>Nueva Iniciativa</DialogTitle></DialogHeader>
            <div className="py-4"><input autoFocus className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-pink-500 outline-none" placeholder="Ej: Nueva Integración..." value={newTitle} onChange={(e) => setNewTitle(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && handleConfirmCreate()} /></div>
            <div className="flex justify-end gap-2 mt-2">
                <button onClick={() => setIsCreateOpen(false)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Cancelar</button>
                <button onClick={handleConfirmCreate} className="px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-sm font-bold transition-all">Crear</button>
            </div>
        </DialogContent>
      </Dialog>

      {/* WORKSPACE DRAWER (Llamada al componente modularizado) */}
      <Dialog open={!!activeIdea} onOpenChange={(open) => !open && setSelectedIdeaId(null)}>
         {activeIdea && (
            <DiscoveryWorkspace 
                idea={activeIdea}
                onClose={() => setSelectedIdeaId(null)}
                onUpdate={updateIdea}
                onPromoteActionable={promoteActionable}
                // Determinamos la sección inicial basada en la vista actual
                initialSection={
                    ['PERSONAS', 'EMPATHY', 'JOURNEY', 'PRIORITIZATION'].includes(currentView) 
                    ? currentView.toLowerCase() 
                    : 'personas'
                }
            />
         )}
      </Dialog>
    </div>
  );
}

export default function DiscoveryPage() {
  return (
    <Suspense fallback={<div className="p-8 text-white">Cargando...</div>}>
      <DiscoveryContent />
    </Suspense>
  );
}