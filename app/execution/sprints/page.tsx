'use client';
import { useState } from 'react';
import { useExecution } from '../context/ExecutionProvider';
import { Calendar, Target, Trash2, Edit, Plus } from 'lucide-react';
import { CreateSprintModal } from '../components/CreateSprintModal';

export default function SprintsPage() {
  const { sprints, tickets, actions } = useExecution();
  const [modalOpen, setModalOpen] = useState(false);

  // Lógica de Burndown / Progreso Real
  const calculateProgress = (sprintId: string) => {
    const sprintTickets = tickets.filter(t => t.sprintId === sprintId || (!t.sprintId && t.status === 'DONE')); // Ejemplo simple
    if (sprintTickets.length === 0) return 0;
    return Math.round((sprintTickets.filter(t => t.status === 'DONE').length / sprintTickets.length) * 100);
  };

  return (
    <div className="space-y-8 animate-in slide-in-from-bottom-2">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-white">Ciclos de Sprint</h1>
        <button onClick={() => setModalOpen(true)} className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-indigo-500"><Plus size={18} /> Nuevo Sprint</button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sprints.map(sprint => (
          <div key={sprint.id} className="p-6 rounded-2xl bg-gray-900/30 border border-gray-800 space-y-4 hover:border-gray-600 transition-all">
            <div className="flex justify-between items-start">
              <div>
                <h3 className="text-lg font-bold text-white">{sprint.title}</h3>
                <p className="text-xs text-gray-500">{sprint.startDate} - {sprint.endDate}</p>
              </div>
              <div className="flex gap-2">
                <button onClick={() => actions.deleteSprint(sprint.id)} className="text-gray-600 hover:text-red-400 p-1"><Trash2 size={16} /></button>
              </div>
            </div>
            
            <div className="flex items-start gap-3 bg-black/20 p-3 rounded-lg border border-gray-800/50">
              <Target size={16} className="text-indigo-400 mt-1" />
              <p className="text-sm text-gray-300 italic">"{sprint.goal}"</p>
            </div>

            <div className="pt-2">
              <div className="flex justify-between text-xs text-gray-400 mb-2"><span>Progreso Real</span><span>{calculateProgress(sprint.id)}%</span></div>
              <div className="h-1.5 w-full bg-gray-800 rounded-full overflow-hidden"><div className="h-full bg-blue-500 transition-all duration-1000" style={{ width: `${calculateProgress(sprint.id)}%` }} /></div>
            </div>
          </div>
        ))}
      </div>

      <CreateSprintModal isOpen={modalOpen} onClose={() => setModalOpen(false)} onSubmit={actions.createSprint} />
    </div>
  );
}