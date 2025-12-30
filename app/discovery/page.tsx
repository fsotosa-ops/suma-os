'use client';

import { useState } from 'react';
import { useDiscovery } from './context/DiscoveryProvider';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { 
  Users, Map, CheckSquare, BrainCircuit, Plus, X, List, 
  LayoutGrid, Trash2, Calendar, Maximize2, Minimize2, User 
} from 'lucide-react';
import { cn } from '@/lib/utils';

// Importar los módulos internos
import { EmpathyMap } from './components/modules/EmpathyMap';
import { UserJourneyMap } from './components/modules/UserJourneyMap';
import { ActionableList } from './components/modules/ActionableList';
import { UserPersonaEditor } from './components/modules/UserPersonaEditor';
import { RoadmapView } from './components/views/RoadmapView';

export default function DiscoveryPage() {
  const { ideas, addIdea, updateIdea, deleteIdea, promoteActionable } = useDiscovery();
  
  // Estados de navegación y UI
  const [selectedIdeaId, setSelectedIdeaId] = useState<string | null>(null);
  const [isCreateOpen, setIsCreateOpen] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [viewMode, setViewMode] = useState<'LIST' | 'MATRIX' | 'ROADMAP'>('LIST');
  const [isWorkspaceExpanded, setIsWorkspaceExpanded] = useState(false);

  const activeIdea = ideas.find(i => i.id === selectedIdeaId);

  // Crear nueva iniciativa
  const handleConfirmCreate = () => {
    if (!newTitle.trim()) return;
    
    addIdea({
        id: crypto.randomUUID(), 
        title: newTitle, 
        description: '', 
        status: 'DRAFT', 
        impact: 50, 
        effort: 50, 
        confidence: 50, 
        updatedAt: 'Justo ahora',
        personas: [],
        empathyMap: { says: '', thinks: '', does: '', feels: '' }, 
        userJourney: [], 
        actionables: [],
        tags: []
    });

    setNewTitle('');
    setIsCreateOpen(false);
  };

  // Eliminar iniciativa
  const handleDelete = (e: React.MouseEvent, id: string) => {
    e.stopPropagation();
    if(confirm('¿Estás seguro de eliminar esta iniciativa? Esta acción no se puede deshacer.')) {
        deleteIdea(id);
    }
  };

  return (
    <div className="p-8 h-full bg-[#020617] text-white overflow-y-auto custom-scrollbar">
      
      {/* Header Principal */}
      <div className="flex justify-between items-end mb-8 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-3">
            <BrainCircuit className="text-pink-500" /> Discovery Workspace
          </h1>
          <p className="text-zinc-500 mt-1">Laboratorio de Producto: Investigación, Empatía y Definición.</p>
        </div>
        
        <div className="flex items-center gap-3">
            {/* Selector de Vistas */}
            <div className="bg-zinc-900 p-1 rounded-lg border border-zinc-800 flex">
                <button onClick={() => setViewMode('LIST')} className={cn("p-2 rounded transition-all", viewMode === 'LIST' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300')} title="Lista"><List size={16}/></button>
                <button onClick={() => setViewMode('MATRIX')} className={cn("p-2 rounded transition-all", viewMode === 'MATRIX' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300')} title="Matriz Priorización"><LayoutGrid size={16}/></button>
                <button onClick={() => setViewMode('ROADMAP')} className={cn("p-2 rounded transition-all", viewMode === 'ROADMAP' ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300')} title="Roadmap"><Calendar size={16}/></button>
            </div>

            <button 
                onClick={() => setIsCreateOpen(true)} 
                className="bg-pink-600 hover:bg-pink-500 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-pink-900/20 transition-all flex items-center gap-2"
            >
                <Plus size={16} /> Nueva Iniciativa
            </button>
        </div>
      </div>

      {/* --- VISTA 1: LISTA (GRID) --- */}
      {viewMode === 'LIST' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ideas.map(idea => (
                <div key={idea.id} onClick={() => setSelectedIdeaId(idea.id)} className="group bg-zinc-900/30 border border-zinc-800 hover:border-zinc-600 p-5 rounded-xl cursor-pointer transition-all hover:bg-zinc-900/50 relative">
                    
                    <button onClick={(e) => handleDelete(e, idea.id)} className="absolute top-4 right-4 p-2 text-zinc-500 hover:text-red-500 hover:bg-red-500/10 rounded-md opacity-0 group-hover:opacity-100 transition-all z-10">
                        <Trash2 size={16} />
                    </button>

                    <div className="flex justify-between mb-3">
                        <span className="text-[10px] font-bold bg-zinc-800 text-zinc-400 px-2 py-1 rounded uppercase tracking-wider">{idea.status}</span>
                        <span className="text-xs text-zinc-600">{idea.updatedAt}</span>
                    </div>
                    
                    <h3 className="text-lg font-bold text-zinc-100 mb-2 group-hover:text-pink-400 transition-colors pr-8">{idea.title}</h3>
                    <p className="text-sm text-zinc-500 line-clamp-2">{idea.description || "Sin descripción definida."}</p>
                    
                    <div className="mt-4 pt-4 border-t border-zinc-800/50 flex items-center gap-4 text-xs font-mono text-zinc-500">
                        <span className={`flex items-center gap-1 ${idea.personas?.length ? 'text-pink-400' : ''}`}><User size={12}/> Personas</span>
                        <span className={`flex items-center gap-1 ${idea.empathyMap?.says ? 'text-pink-400' : ''}`}><Users size={12}/> Empatía</span>
                        <span className={`flex items-center gap-1 ${idea.userJourney?.length ? 'text-pink-400' : ''}`}><Map size={12}/> Journey</span>
                    </div>
                </div>
            ))}
        </div>
      )}

      {/* --- VISTA 2: MATRIZ --- */}
      {viewMode === 'MATRIX' && (
          <div className="h-[600px] border border-zinc-800 rounded-xl bg-zinc-900/20 relative p-6 overflow-hidden select-none">
              <div className="absolute inset-0 grid grid-cols-2 grid-rows-2 pointer-events-none">
                  <div className="border-r border-b border-zinc-800/30 p-4 text-xs font-bold text-zinc-700 uppercase tracking-widest">Quick Wins (Alto/Bajo)</div>
                  <div className="border-b border-zinc-800/30 p-4 text-xs font-bold text-zinc-700 uppercase tracking-widest text-right">Major Projects (Alto/Alto)</div>
                  <div className="border-r border-zinc-800/30 p-4 flex items-end text-xs font-bold text-zinc-700 uppercase tracking-widest">Fill-ins (Bajo/Bajo)</div>
                  <div className="p-4 flex items-end justify-end text-xs font-bold text-zinc-700 uppercase tracking-widest">Money Pit (Bajo/Alto)</div>
              </div>
              
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-bold text-zinc-600 bg-black/50 px-2 rounded">ESFUERZO →</div>
              <div className="absolute left-4 top-1/2 -translate-y-1/2 -rotate-90 text-xs font-bold text-zinc-600 bg-black/50 px-2 rounded">IMPACTO →</div>

              {ideas.map(idea => (
                  <div 
                    key={idea.id}
                    onClick={() => setSelectedIdeaId(idea.id)}
                    className="absolute w-8 h-8 -ml-4 -mt-4 bg-pink-600 rounded-full shadow-[0_0_15px_rgba(219,39,119,0.4)] cursor-pointer hover:scale-125 transition-transform border-2 border-white/20 flex items-center justify-center text-[10px] font-bold text-white z-10 group"
                    style={{ bottom: `${idea.impact}%`, left: `${idea.effort}%` }}
                  >
                    {idea.title.substring(0, 2).toUpperCase()}
                    <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-black border border-zinc-700 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-20">
                        {idea.title}
                    </div>
                  </div>
              ))}
          </div>
      )}

      {/* --- VISTA 3: ROADMAP --- */}
      {viewMode === 'ROADMAP' && (
          <RoadmapView ideas={ideas} onSelect={setSelectedIdeaId} />
      )}

      {/* --- MODAL CREAR INICIATIVA --- */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="bg-[#151921] border-zinc-800 text-white sm:max-w-md">
            <DialogHeader>
                <DialogTitle className="text-xl font-bold flex items-center gap-2">
                    <Plus className="text-pink-500" /> Nueva Iniciativa
                </DialogTitle>
            </DialogHeader>
            <div className="py-4 space-y-4">
                <div className="space-y-2">
                    <label className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Título de la Idea</label>
                    <input 
                        autoFocus
                        className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-sm text-white focus:border-pink-500 outline-none transition-all placeholder:text-zinc-700" 
                        placeholder="Ej: Rediseño del Checkout..." 
                        value={newTitle}
                        onChange={(e) => setNewTitle(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleConfirmCreate()}
                    />
                </div>
            </div>
            <DialogFooter>
                <button onClick={() => setIsCreateOpen(false)} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Cancelar</button>
                <button onClick={handleConfirmCreate} className="px-6 py-2 bg-pink-600 hover:bg-pink-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-pink-900/20 transition-all">
                    Crear Iniciativa
                </button>
            </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* --- WORKSPACE MODAL (DETALLE COMPLETO) --- */}
      <Dialog open={!!activeIdea} onOpenChange={(open) => { if(!open) { setSelectedIdeaId(null); setIsWorkspaceExpanded(false); } }}>
        <DialogContent 
            showCloseButton={false} 
            className={cn(
                "bg-[#0B0E14] border-zinc-800 text-white flex flex-col p-0 overflow-hidden outline-none transition-all duration-300",
                isWorkspaceExpanded ? "w-[98vw] h-[95vh] max-w-[98vw]" : "max-w-6xl h-[90vh]"
            )}
        >
            {activeIdea && (
                <>
                    {/* Workspace Header */}
                    <div className="p-6 border-b border-zinc-800 bg-[#151921] flex justify-between items-start shrink-0">
                        <div className="flex-1 mr-8">
                            <DialogHeader>
                                <DialogTitle className="flex items-center gap-3 mb-2">
                                    <input 
                                        className="bg-transparent text-2xl font-bold text-white outline-none w-full focus:underline decoration-pink-500/50" 
                                        value={activeIdea.title} 
                                        onChange={(e) => updateIdea(activeIdea.id, { title: e.target.value })} 
                                    />
                                    <span className="shrink-0 text-[10px] bg-pink-500/10 text-pink-400 border border-pink-500/20 px-2 py-0.5 rounded uppercase font-bold tracking-wider">Discovery</span>
                                </DialogTitle>
                            </DialogHeader>
                            <input 
                                className="bg-transparent outline-none text-zinc-400 text-sm w-full placeholder:text-zinc-600" 
                                placeholder="Añade una descripción detallada del problema..." 
                                value={activeIdea.description} 
                                onChange={(e) => updateIdea(activeIdea.id, { description: e.target.value })} 
                            />
                        </div>
                        
                        {/* Controles de Ventana */}
                        <div className="flex gap-2">
                            <button onClick={() => setIsWorkspaceExpanded(!isWorkspaceExpanded)} className="text-zinc-500 hover:text-white p-1.5 rounded-md hover:bg-zinc-800 transition-colors">
                                {isWorkspaceExpanded ? <Minimize2 size={18}/> : <Maximize2 size={18}/>}
                            </button>
                            <button onClick={() => setSelectedIdeaId(null)} className="text-zinc-500 hover:text-white p-1.5 rounded-md hover:bg-zinc-800 transition-colors">
                                <X size={18} />
                            </button>
                        </div>
                    </div>

                    {/* Tabs Modulares */}
                    <Tabs defaultValue="personas" className="flex-1 flex flex-col min-h-0">
                        <div className="px-6 pt-4 bg-[#0B0E14] shrink-0">
                            <TabsList className="bg-zinc-900 border border-zinc-800">
                                <TabsTrigger value="personas" className="gap-2 data-[state=active]:bg-zinc-800 data-[state=active]:text-white"><User size={14}/> Personas</TabsTrigger>
                                <TabsTrigger value="empathy" className="gap-2 data-[state=active]:bg-zinc-800 data-[state=active]:text-white"><Users size={14}/> Empathy Map</TabsTrigger>
                                <TabsTrigger value="journey" className="gap-2 data-[state=active]:bg-zinc-800 data-[state=active]:text-white"><Map size={14}/> User Journey</TabsTrigger>
                                <TabsTrigger value="actionables" className="gap-2 data-[state=active]:bg-zinc-800 data-[state=active]:text-white"><CheckSquare size={14}/> Priorización</TabsTrigger>
                            </TabsList>
                        </div>

                        <div className="flex-1 overflow-y-auto p-6 bg-[#0B0E14] custom-scrollbar">
                            <TabsContent value="personas" className="mt-0 h-full">
                                <UserPersonaEditor 
                                    personas={activeIdea.personas || []}
                                    onChange={(data) => updateIdea(activeIdea.id, { personas: data })}
                                />
                            </TabsContent>

                            <TabsContent value="empathy" className="mt-0 h-full">
                                <EmpathyMap 
                                    data={activeIdea.empathyMap || { says: '', thinks: '', does: '', feels: '' }} 
                                    onChange={(data) => updateIdea(activeIdea.id, { empathyMap: data })} 
                                />
                            </TabsContent>
                            
                            <TabsContent value="journey" className="mt-0 h-full">
                                <UserJourneyMap 
                                    steps={activeIdea.userJourney || []} 
                                    onChange={(steps) => updateIdea(activeIdea.id, { userJourney: steps })} 
                                />
                            </TabsContent>

                            <TabsContent value="actionables" className="mt-0 h-full">
                                <div className="max-w-4xl mx-auto">
                                    <h3 className="text-sm font-bold text-zinc-400 uppercase tracking-widest mb-4">Definición de Accionables</h3>
                                    <ActionableList 
                                        actionables={activeIdea.actionables || []} 
                                        onChange={(acts) => updateIdea(activeIdea.id, { actionables: acts })} 
                                        onPromote={(actId) => promoteActionable(activeIdea.id, actId)} 
                                    />
                                </div>
                            </TabsContent>
                        </div>
                    </Tabs>
                </>
            )}
        </DialogContent>
      </Dialog>
    </div>
  );
}