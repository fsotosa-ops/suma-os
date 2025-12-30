'use client';

import { useState } from 'react';
import { useStrategy } from './context/StrategyProvider';
// CORRECCIÓN: Importar desde el archivo central de tipos
import { Objective } from '@/app/types';
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
    Plus, LayoutGrid, Clock, AlertTriangle, List as ListIcon, 
    Link as LinkIcon, Check, Minimize2, Maximize2, X, GripVertical 
} from 'lucide-react';

// Importación de Componentes Modulares
import { StrategicMatrix } from './components/StrategicMatrix';
import { EisenhowerBoard } from './components/EisenhowerBoard';
import { RiskHeatMap } from './components/RiskHeatMap'; 
import { ObjectivesList } from './components/ObjectivesList';
import { StrategyEditor } from './components/StrategyEditor';

export default function StrategyPage() {
  const { objectives, levers, addObjective } = useStrategy();
  
  const [layout, setLayout] = useState(['roi', 'eisenhower', 'risk', 'list']);
  const [hiddenWidgets, setHiddenWidgets] = useState<string[]>([]);
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);
  const [selectedOkr, setSelectedOkr] = useState<Objective | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newOkr, setNewOkr] = useState<{title: string; target: string; connectedLeverIds: string[]}>({ title: '', target: '', connectedLeverIds: [] });

  const handleDragStart = (e: React.DragEvent, id: string) => {
    e.dataTransfer.setData('widgetId', id);
    e.currentTarget.classList.add('opacity-50');
  };

  const handleDragEnd = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('opacity-50');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleDrop = (e: React.DragEvent, targetId: string) => {
    e.preventDefault();
    const draggedId = e.dataTransfer.getData('widgetId');
    if (!draggedId || draggedId === targetId) return;

    const newLayout = [...layout];
    const draggedIndex = newLayout.indexOf(draggedId);
    const targetIndex = newLayout.indexOf(targetId);

    newLayout.splice(draggedIndex, 1);
    newLayout.splice(targetIndex, 0, draggedId);
    
    setLayout(newLayout);
  };

  const toggleWidgetVisibility = (id: string) => {
    if (hiddenWidgets.includes(id)) {
        setHiddenWidgets(prev => prev.filter(w => w !== id));
        if (!layout.includes(id)) setLayout(prev => [...prev, id]);
    } else {
        setHiddenWidgets(prev => [...prev, id]);
        if (expandedWidget === id) setExpandedWidget(null);
    }
  };

  const handleCreate = () => {
    if (!newOkr.title) return;
    addObjective({
      id: crypto.randomUUID(), 
      projectId: 'auto-assigned', // El Provider lo manejará
      title: newOkr.title, target: newOkr.target || 'N/A', progress: 0, status: 'On Track',
      impact: 50, effort: 50, urgency: 50, importance: 50, riskProbability: 20, riskSeverity: 20,
      connectedLeverIds: newOkr.connectedLeverIds, hypothesis: ''
    });
    setNewOkr({ title: '', target: '', connectedLeverIds: [] });
    setIsCreating(false);
  };

  const toggleNewOkrLever = (leverId: string) => {
    setNewOkr(prev => {
        const exists = prev.connectedLeverIds.includes(leverId);
        return { ...prev, connectedLeverIds: exists ? prev.connectedLeverIds.filter(id => id !== leverId) : [...prev.connectedLeverIds, leverId] };
    });
  };

  const WIDGETS_CONFIG: any = {
      roi: {
          title: "Quick Wins",
          icon: <LayoutGrid size={16}/>,
          color: "text-emerald-500",
          component: <StrategicMatrix mode="PRIORITIZATION" onSelectOkr={setSelectedOkr} className="border-0 shadow-none bg-transparent h-full" />
      },
      eisenhower: {
          title: "Tablero de Prioridades",
          icon: <Clock size={16}/>,
          color: "text-blue-500",
          component: <EisenhowerBoard onSelectOkr={setSelectedOkr} />
      },
      risk: {
          title: "Radar de Riesgos",
          icon: <AlertTriangle size={16}/>,
          color: "text-red-500",
          component: <RiskHeatMap onSelectOkr={setSelectedOkr} />
      },
      list: {
          title: "Inventario Estratégico",
          icon: <ListIcon size={16}/>,
          color: "text-zinc-400",
          component: <ObjectivesList onSelectOkr={setSelectedOkr} />
      }
  };

  return (
    <div className="w-full h-full min-h-screen bg-[#020617] p-4 md:p-8 flex flex-col gap-6 animate-in fade-in">
      
      <div className="flex flex-col md:flex-row justify-between items-end border-b border-zinc-800 pb-6 gap-4 shrink-0">
        <div>
            <h1 className="text-3xl font-bold text-zinc-100">Strategy Board</h1>
            <p className="text-zinc-500 mt-1">Sala de Situación y Toma de Decisiones.</p>
        </div>
        
        <div className="flex items-center gap-3">
            <div className="flex bg-zinc-900/50 p-1 rounded-lg border border-zinc-800">
                {['roi', 'eisenhower', 'risk', 'list'].map(id => (
                    <button 
                        key={id}
                        onClick={() => toggleWidgetVisibility(id)} 
                        className={`p-2 rounded hover:bg-zinc-800 transition-all ${!hiddenWidgets.includes(id) ? 'text-white bg-zinc-800 shadow-sm' : 'text-zinc-600'}`} 
                        title={`Mostrar/Ocultar ${WIDGETS_CONFIG[id].title}`}
                    >
                        {WIDGETS_CONFIG[id].icon}
                    </button>
                ))}
            </div>

            {!isCreating && (
                <button 
                    onClick={() => setIsCreating(true)}
                    className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg shadow-indigo-900/20 transition-all"
                >
                    <Plus size={16}/> Nuevo Objetivo
                </button>
            )}
        </div>
      </div>

      {isCreating && (
         <Card className="p-6 bg-zinc-950 border border-zinc-800 relative overflow-hidden animate-in slide-in-from-top-4 shadow-2xl shrink-0">
             <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
             <div className="flex flex-col gap-6">
                 <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Nuevo Movimiento Estratégico</h3>
                    <button onClick={() => setIsCreating(false)} className="text-zinc-500 hover:text-white transition-colors"><Minimize2 size={16}/></button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs text-zinc-500 font-bold uppercase">Título</label>
                        <input autoFocus className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-indigo-500 outline-none transition-all" value={newOkr.title} onChange={e => setNewOkr({...newOkr, title: e.target.value})} placeholder="Ej: Dominar el mercado..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-zinc-500 font-bold uppercase">Meta (KPI)</label>
                        <input className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-indigo-500 outline-none transition-all" value={newOkr.target} onChange={e => setNewOkr({...newOkr, target: e.target.value})} placeholder="Ej: $2M ARR" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs text-zinc-500 font-bold flex items-center gap-2 uppercase"><LinkIcon size={12}/> Palancas Habilitadoras</label>
                    <div className="flex flex-wrap gap-2">
                        {levers.map(lever => {
                            const isSelected = newOkr.connectedLeverIds.includes(lever.id);
                            return (
                                <button key={lever.id} onClick={() => toggleNewOkrLever(lever.id)} className={`px-3 py-1.5 rounded-full text-xs border transition-all flex items-center gap-2 ${isSelected ? 'bg-indigo-500/20 border-indigo-500 text-indigo-200' : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600'}`}>
                                    {isSelected && <Check size={12} />} {lever.name}
                                </button>
                            );
                        })}
                    </div>
                 </div>
                 <div className="flex justify-end pt-2">
                   <button onClick={handleCreate} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40 transition-all">Crear Estrategia</button>
                 </div>
             </div>
         </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[420px] grid-flow-dense flex-1 pb-10">
          {layout.map((id) => {
              if (hiddenWidgets.includes(id)) return null;
              const isExpanded = expandedWidget === id;
              const config = WIDGETS_CONFIG[id];
              const defaultColSpan = id === 'list' && !expandedWidget ? 'md:col-span-2 xl:col-span-3' : 'col-span-1';

              return (
                <div 
                    key={id}
                    draggable={!isExpanded}
                    onDragStart={(e) => handleDragStart(e, id)}
                    onDragEnd={handleDragEnd}
                    onDragOver={handleDragOver}
                    onDrop={(e) => handleDrop(e, id)}
                    className={`transition-all duration-300 ease-[cubic-bezier(0.25,0.1,0.25,1.0)] 
                        ${isExpanded ? 'md:col-span-2 md:row-span-2 z-10' : `${defaultColSpan}`}
                    `}
                >
                    <Card className={`h-full bg-[#0A0A0A] border flex flex-col overflow-hidden group
                        ${isExpanded ? 'border-zinc-600 shadow-2xl' : 'border-zinc-800 hover:border-zinc-700 shadow-sm'}
                    `}>
                        <div className="p-4 border-b border-zinc-800/50 flex justify-between items-center bg-[#0F1116] shrink-0 cursor-grab active:cursor-grabbing">
                            <div className="flex items-center gap-2">
                                <GripVertical size={14} className="text-zinc-600 group-hover:text-zinc-400 transition-colors"/>
                                <span className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${config.color}`}>
                                    {config.icon} {config.title}
                                </span>
                            </div>
                            <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button 
                                    onClick={() => setExpandedWidget(isExpanded ? null : id)}
                                    className="p-1.5 hover:bg-zinc-800 rounded text-zinc-500 hover:text-white transition-colors"
                                >
                                    {isExpanded ? <Minimize2 size={16}/> : <Maximize2 size={16}/>}
                                </button>
                                <button 
                                    onClick={() => toggleWidgetVisibility(id)}
                                    className="p-1.5 hover:bg-zinc-800 rounded text-zinc-500 hover:text-red-400 transition-colors"
                                >
                                    <X size={16}/>
                                </button>
                            </div>
                        </div>
                        <div className="flex-1 p-0 overflow-hidden relative">
                            {config.component}
                        </div>
                    </Card>
                </div>
              );
          })}
      </div>

      <Dialog open={!!selectedOkr} onOpenChange={() => setSelectedOkr(null)}>
        <DialogContent className="bg-[#151921] border-zinc-800 text-white sm:max-w-lg">
            <DialogHeader>
                <DialogTitle className="text-xl font-bold">{selectedOkr?.title}</DialogTitle>
            </DialogHeader>
            {selectedOkr && <StrategyEditor okr={selectedOkr} onClose={() => setSelectedOkr(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}