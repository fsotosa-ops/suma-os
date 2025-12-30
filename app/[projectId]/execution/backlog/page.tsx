'use client';
import { useState } from 'react';
import { useExecution } from '../context/ExecutionProvider';
import { ListTodo, Search, Trash2, Edit3, Plus, MoreVertical } from 'lucide-react';
import { TicketDetailModal } from '../components/TicketDetailModal';

export default function BacklogPage() {
  const { tickets, actions } = useExecution();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTicket, setEditingTicket] = useState<any>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const filteredTickets = tickets.filter(t => 
    t.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleOpenCreate = () => {
    setEditingTicket(null);
    setIsModalOpen(true);
  };

  const handleEdit = (ticket: any) => {
    setEditingTicket(ticket);
    setIsModalOpen(true);
  };

  const handleSubmit = (data: any) => {
    if (editingTicket) {
      actions.updateTicket(editingTicket.id, data);
    } else {
      actions.createTicket(data);
    }
    setIsModalOpen(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-end gap-4 border-b border-zinc-800 pb-6">
        <div>
          <h1 className="text-2xl font-bold text-zinc-100 flex items-center gap-2">
            <ListTodo className="text-blue-500" /> Backlog
          </h1>
          <p className="text-zinc-500 text-sm mt-1">Gestión maestra de requerimientos.</p>
        </div>
        <div className="flex gap-3 w-full sm:w-auto">
          <div className="relative flex-1 sm:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={16} />
            <input 
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar..." 
              className="w-full bg-zinc-900 border border-zinc-800 rounded-lg pl-10 pr-4 py-2 text-sm text-zinc-200 outline-none focus:border-zinc-700" 
            />
          </div>
          <button 
            onClick={handleOpenCreate} 
            className="bg-zinc-100 hover:bg-white text-zinc-900 px-4 py-2 rounded-lg text-sm font-medium transition-all flex items-center gap-2"
          >
            <Plus size={16} /> Nuevo
          </button>
        </div>
      </div>

      <div className="bg-zinc-900/30 border border-zinc-800 rounded-xl overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-zinc-800 bg-zinc-900/50">
              <th className="p-4 text-xs font-medium text-zinc-500 uppercase">Tipo</th>
              <th className="p-4 text-xs font-medium text-zinc-500 uppercase w-full">Título</th>
              <th className="p-4 text-xs font-medium text-zinc-500 uppercase text-center">Pts</th>
              <th className="p-4 text-xs font-medium text-zinc-500 uppercase">Estado</th>
              <th className="p-4 text-xs font-medium text-zinc-500 uppercase text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800/50">
            {filteredTickets.map(ticket => (
              <tr key={ticket.id} className="hover:bg-zinc-800/30 group transition-colors">
                <td className="p-4">
                   <span className="text-[10px] font-bold border border-zinc-700 bg-zinc-800 text-zinc-400 px-2 py-1 rounded">{ticket.type}</span>
                </td>
                <td className="p-4 text-sm text-zinc-300 font-medium">{ticket.title}</td>
                <td className="p-4 text-center text-xs font-mono text-zinc-500">{ticket.points || '-'}</td>
                <td className="p-4">
                  <span className="text-[10px] uppercase font-bold text-zinc-500 bg-zinc-900 border border-zinc-800 px-2 py-1 rounded">{ticket.status}</span>
                </td>
                <td className="p-4 text-right flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button onClick={() => handleEdit(ticket)} className="p-1.5 hover:bg-zinc-800 rounded text-zinc-400"><Edit3 size={14} /></button>
                  <button onClick={() => actions.deleteTicket(ticket.id)} className="p-1.5 hover:bg-red-900/20 text-zinc-400 hover:text-red-400 rounded"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {filteredTickets.length === 0 && (
          <div className="p-8 text-center text-zinc-500 text-sm">No se encontraron tareas.</div>
        )}
      </div>

      <TicketDetailModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
        onSubmit={handleSubmit}
        initialData={editingTicket}
      />
    </div>
  );
}