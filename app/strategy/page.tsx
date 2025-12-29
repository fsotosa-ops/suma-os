'use client';

import { useState } from 'react';
import { useStrategy } from './context/StrategyProvider';
import { Objective } from '@/app/execution/types';
import { Card } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { 
    Plus, Target, ArrowRight, LayoutGrid, 
    Link as LinkIcon, Check, Settings2, Minimize2, Maximize2, 
    AlertTriangle, List as ListIcon, Clock, X
} from 'lucide-react';

// --- CORRECCIÓN DE IMPORTS ---
import { StrategicMatrix } from './components/StrategicMatrix';
import { EisenhowerBoard } from './components/EisenhowerBoard';
import { RiskHeatMap } from './components/RiskHeatMap'; // <--- OJO AQUÍ: 'RiskHeatMap' con M mayúscula
import { StrategyEditor } from './components/StrategyEditor';

export default function StrategyPage() {
  const { objectives, levers, addObjective } = useStrategy();
  
  const [widgets, setWidgets] = useState({ roi: true, eisenhower: true, risk: true, list: true });
  const [expandedWidget, setExpandedWidget] = useState<string | null>(null);

  const [selectedOkr, setSelectedOkr] = useState<Objective | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [newOkr, setNewOkr] = useState<{title: string; target: string; connectedLeverIds: string[]}>({ title: '', target: '', connectedLeverIds: [] });

  const toggleWidget = (key: keyof typeof widgets) => setWidgets(prev => ({...prev, [key]: !prev[key]}));

  const handleCreate = () => {
    if (!newOkr.title) return;
    addObjective({
      id: crypto.randomUUID(), title: newOkr.title, target: newOkr.target || 'N/A', progress: 0, status: 'On Track',
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

  const WidgetWrapper = ({ id, title, icon, color, children }: any) => {
      if (expandedWidget && expandedWidget !== id) return null;
      const isExpanded = expandedWidget === id;
      
      return (
        <Card className={`bg-[#0A0A0A] border border-zinc-800 flex flex-col transition-all duration-500 ease-in-out ${
            isExpanded 
            ? 'fixed inset-4 z-40 h-[calc(100vh-2rem)] w-[calc(100vw-2rem)] border-indigo-500/50 shadow-2xl' 
            : 'h-[450px] hover:border-zinc-700'
        }`}>
            <div className="p-4 border-b border-zinc-800/50 flex justify-between items-center bg-[#0A0A0A]">
                <span className={`text-xs font-bold uppercase tracking-widest flex items-center gap-2 ${color}`}>
                    {icon} {title}
                </span>
                <div className="flex gap-2">
                    <button 
                        onClick={() => setExpandedWidget(isExpanded ? null : id)}
                        className="text-zinc-600 hover:text-white transition-colors p-1"
                    >
                        {isExpanded ? <Minimize2 size={16}/> : <Maximize2 size={16}/>}
                    </button>
                    {isExpanded && (
                        <button onClick={() => setExpandedWidget(null)} className="text-zinc-600 hover:text-red-400 p-1">
                            <X size={16} />
                        </button>
                    )}
                </div>
            </div>
            <div className="flex-1 p-2 overflow-hidden relative">
                {children}
            </div>
        </Card>
      );
  };

  return (
    <div className="w-full h-full space-y-6 animate-in fade-in pb-12 px-2 md:px-0">
      
      {!expandedWidget && (
          <div className="flex flex-col md:flex-row justify-between items-end border-b border-zinc-800 pb-4 gap-4">
            <div>
                <h1 className="text-2xl font-bold text-zinc-100">Strategy OS</h1>
                <p className="text-zinc-500 text-sm mt-1">Sala de Situación Ejecutiva.</p>
            </div>
            
            <div className="flex items-center gap-3">
                <div className="flex bg-zinc-900/50 p-1 rounded-lg border border-zinc-800">
                    <button onClick={() => toggleWidget('roi')} className={`p-2 rounded hover:bg-zinc-800 ${widgets.roi ? 'text-emerald-400' : 'text-zinc-600'}`} title="Matriz ROI"><LayoutGrid size={16}/></button>
                    <button onClick={() => toggleWidget('eisenhower')} className={`p-2 rounded hover:bg-zinc-800 ${widgets.eisenhower ? 'text-blue-400' : 'text-zinc-600'}`} title="Eisenhower"><Clock size={16}/></button>
                    <button onClick={() => toggleWidget('risk')} className={`p-2 rounded hover:bg-zinc-800 ${widgets.risk ? 'text-red-400' : 'text-zinc-600'}`} title="Riesgos"><AlertTriangle size={16}/></button>
                    <div className="w-px bg-zinc-800 mx-1 h-4 self-center"></div>
                    <button onClick={() => toggleWidget('list')} className={`p-2 rounded hover:bg-zinc-800 ${widgets.list ? 'text-white' : 'text-zinc-600'}`} title="Lista"><ListIcon size={16} /></button>
                </div>
                {!isCreating && <button onClick={() => setIsCreating(true)} className="flex items-center gap-2 bg-white hover:bg-zinc-200 text-black px-4 py-2 rounded-lg text-sm font-bold"><Plus size={16}/> Objetivo</button>}
            </div>
          </div>
      )}

      {isCreating && (
         <Card className="p-6 bg-zinc-950 border border-zinc-800 mb-6 relative overflow-hidden animate-in slide-in-from-top-4 shadow-2xl">
             <div className="absolute top-0 left-0 w-1 h-full bg-indigo-500"></div>
             <div className="flex flex-col gap-6">
                 <div className="flex justify-between items-start">
                    <h3 className="text-sm font-bold text-white uppercase tracking-wider">Nuevo Movimiento Estratégico</h3>
                    <button onClick={() => setIsCreating(false)} className="text-zinc-500 hover:text-white"><Minimize2 size={16}/></button>
                 </div>
                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="md:col-span-2 space-y-2">
                        <label className="text-xs text-zinc-500 font-bold">NOMBRE DEL OBJETIVO</label>
                        <input autoFocus className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-indigo-500 outline-none" value={newOkr.title} onChange={e => setNewOkr({...newOkr, title: e.target.value})} placeholder="Ej: Dominar mercado..." />
                    </div>
                    <div className="space-y-2">
                        <label className="text-xs text-zinc-500 font-bold">META CLAVE (KPI)</label>
                        <input className="w-full bg-black border border-zinc-800 rounded-lg p-3 text-sm text-white focus:border-indigo-500 outline-none" value={newOkr.target} onChange={e => setNewOkr({...newOkr, target: e.target.value})} placeholder="Ej: $2M ARR" />
                    </div>
                 </div>
                 <div className="space-y-2">
                    <label className="text-xs text-zinc-500 font-bold flex items-center gap-2"><LinkIcon size={12}/> PALANCAS HABILITADORAS</label>
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
                   <button onClick={handleCreate} className="px-6 py-2 bg-indigo-600 hover:bg-indigo-500 text-white rounded-lg text-sm font-medium">Crear Estrategia</button>
                 </div>
             </div>
         </Card>
      )}

      <div className={`grid gap-6 transition-all duration-300 ${expandedWidget ? 'grid-cols-1 h-screen overflow-hidden' : 'grid-cols-1 md:grid-cols-2 xl:grid-cols-3'}`}>
          
          {widgets.roi && (
            <WidgetWrapper id="roi" title="Matriz de Priorización (ROI)" icon={<LayoutGrid size={14}/>} color="text-emerald-500">
                <StrategicMatrix mode="PRIORITIZATION" onSelectOkr={setSelectedOkr} className="border-0 shadow-none bg-transparent h-full" />
            </WidgetWrapper>
          )}

          {widgets.eisenhower && (
            <WidgetWrapper id="eisenhower" title="Tablero de Acción" icon={<Clock size={14}/>} color="text-blue-500">
                <EisenhowerBoard onSelectOkr={setSelectedOkr} />
            </WidgetWrapper>
          )}

          {widgets.risk && (
            <WidgetWrapper id="risk" title="Radar de Riesgos" icon={<AlertTriangle size={14}/>} color="text-red-500">
                <RiskHeatMap onSelectOkr={setSelectedOkr} />
            </WidgetWrapper>
          )}

          {!expandedWidget && widgets.list && (
            <div className="col-span-1 md:col-span-2 xl:col-span-3">
                <div className="flex items-center gap-2 mb-3"><span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">Inventario Total</span><div className="h-px bg-zinc-800 flex-1"></div></div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                    {objectives.map(okr => (
                        <Card key={okr.id} onClick={() => setSelectedOkr(okr)} className="p-4 bg-zinc-900/30 border-zinc-800 hover:bg-zinc-900 cursor-pointer group flex flex-col gap-3 hover:border-zinc-600 transition-all">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-3"><div className="p-2 bg-black rounded border border-zinc-800 text-zinc-400 group-hover:text-white"><Target size={16} /></div><h3 className="font-semibold text-zinc-200 text-sm leading-tight">{okr.title}</h3></div>
                                <ArrowRight size={14} className="text-zinc-600 -rotate-45 group-hover:rotate-0 transition-transform" />
                            </div>
                            <div className="flex items-center justify-between text-xs text-zinc-500 pt-2 border-t border-zinc-800/50"><span>{okr.target}</span><div className="flex gap-2"><span className="text-emerald-500 bg-emerald-500/10 px-1.5 rounded">IMP: {okr.impact}</span><span className="text-blue-500 bg-blue-500/10 px-1.5 rounded">ESF: {okr.effort}</span></div></div>
                        </Card>
                    ))}
                </div>
            </div>
          )}
      </div>

      <Dialog open={!!selectedOkr} onOpenChange={() => setSelectedOkr(null)}>
        <DialogContent className="bg-[#151921] border-zinc-800 text-white sm:max-w-lg">
            <DialogHeader><DialogTitle>{selectedOkr?.title}</DialogTitle></DialogHeader>
            {selectedOkr && <StrategyEditor okr={selectedOkr} onClose={() => setSelectedOkr(null)} />}
        </DialogContent>
      </Dialog>
    </div>
  );
}