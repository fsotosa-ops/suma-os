'use client';
import { useState } from 'react';
import { useExecution } from '../context/ExecutionProvider';
import { Target, Calendar, Trash2, Plus, ChevronDown, ChevronRight, CheckCircle2, Clock, CircleDashed } from 'lucide-react';
import { CreateSprintModal } from '../components/CreateSprintModal';

export default function SprintsPage() {
  const { sprints, tickets, actions } = useExecution();
  const [modalOpen, setModalOpen] = useState(false);
  const [expandedSprint, setExpandedSprint] = useState<string | null>(null);

  // Obtener tareas de un sprint específico
  const getSprintTickets = (sprintId: string) => tickets.filter(t => t.sprintId === sprintId);

  return (
    <div className="max-w-4xl mx-auto space-y-8 animate-in fade-in duration-500">
      <div className="flex justify-between items-center border-b border-zinc-800 pb-4">
        <div>
          <h1 className="text-xl font-semibold text-zinc-100">Ciclos de Sprint</h1>
          <p className="text-sm text-zinc-500">Planificación temporal del proyecto.</p>
        </div>
        <button 
          onClick={() => setModalOpen(true)} 
          className="flex items-center gap-2 bg-zinc-100 text-zinc-950 px-4 py-2 rounded-lg text-sm font-medium hover:bg-white transition-all"
        >
          <Plus size={16} /> Crear Sprint
        </button>
      </div>

      <div className="space-y-4">
        {sprints.map(sprint => {
          const sprintTickets = getSprintTickets(sprint.id);
          const progress = sprintTickets.length > 0 
            ? Math.round((sprintTickets.filter(t => t.status === 'DONE').length / sprintTickets.length) * 100) 
            : 0;

          return (
            <div key={sprint.id} className="border border-zinc-800 rounded-xl bg-zinc-900/30 overflow-hidden transition-all hover:border-zinc-700">
              {/* Header del Sprint */}
              <div 
                onClick={() => setExpandedSprint(expandedSprint === sprint.id ? null : sprint.id)}
                className="p-5 flex items-center justify-between cursor-pointer select-none"
              >
                <div className="flex items-center gap-4">
                  {expandedSprint === sprint.id ? <ChevronDown size={18} className="text-zinc-500" /> : <ChevronRight size={18} className="text-zinc-500" />}
                  <div>
                    <div className="flex items-center gap-3">
                      <h3 className="font-medium text-zinc-200">{sprint.title}</h3>
                      {sprint.isActive && <span className="text-[10px] bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 px-2 py-0.5 rounded-full uppercase tracking-wider">Activo</span>}
                    </div>
                    <div className="flex items-center gap-4 mt-1">
                      <span className="text-xs text-zinc-500 flex items-center gap-1"><Calendar size={12}/> {sprint.startDate} - {sprint.endDate}</span>
                      <span className="text-xs text-zinc-500">• {sprintTickets.length} tareas</span>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden sm:block w-32">
                    <div className="flex justify-between text-[10px] text-zinc-500 mb-1 uppercase"><span>Progreso</span><span>{progress}%</span></div>
                    <div className="h-1 bg-zinc-800 rounded-full overflow-hidden">
                      <div className="h-full bg-zinc-400" style={{ width: `${progress}%` }} />
                    </div>
                  </div>
                  <button 
                    onClick={(e) => { e.stopPropagation(); actions.deleteSprint(sprint.id); }}
                    className="text-zinc-600 hover:text-red-400 p-2 hover:bg-red-500/10 rounded transition-all"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              {/* Contenido Desplegable (Tareas) */}
              {expandedSprint === sprint.id && (
                <div className="bg-black/20 border-t border-zinc-800/50 px-6 py-4 animate-in slide-in-from-top-2">
                  <div className="mb-4 p-3 bg-zinc-900/50 border border-zinc-800 rounded-lg">
                    <p className="text-xs text-zinc-400 flex items-start gap-2 italic">
                      <Target size={14} className="mt-0.5 text-zinc-500" /> "{sprint.goal}"
                    </p>
                  </div>
                  
                  <div className="space-y-2">
                    {sprintTickets.length > 0 ? (
                      sprintTickets.map(ticket => (
                        <div key={ticket.id} className="flex items-center justify-between p-3 rounded-lg border border-zinc-800/50 bg-zinc-900/40 hover:bg-zinc-800 transition-colors">
                          <div className="flex items-center gap-3">
                            {ticket.status === 'DONE' ? <CheckCircle2 size={16} className="text-emerald-500"/> : <CircleDashed size={16} className="text-zinc-600"/>}
                            <span className={`text-sm ${ticket.status === 'DONE' ? 'text-zinc-500 line-through' : 'text-zinc-300'}`}>{ticket.title}</span>
                          </div>
                          <span className="text-[10px] font-mono text-zinc-500 bg-zinc-950 border border-zinc-800 px-2 py-1 rounded">{ticket.status}</span>
                        </div>
                      ))
                    ) : (
                      <p className="text-xs text-zinc-600 text-center py-4 border border-dashed border-zinc-800 rounded-lg">No hay tareas asignadas a este sprint.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <CreateSprintModal 
        isOpen={modalOpen} 
        onClose={() => setModalOpen(false)} 
        onSubmit={actions.createSprint} 
      />
    </div>
  );
}