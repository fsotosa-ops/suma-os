'use client';
import { useState } from 'react';
import { useExecution } from '../context/ExecutionProvider';
import { ListTodo, Search, Trash2, Edit3 } from 'lucide-react';
import { TicketDetailModal } from '../components/TicketDetailModal';

export default function BacklogPage() {
  const { tickets, actions } = useExecution();
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTicket, setEditingTicket] = useState<any>(null);

  const filteredTickets = tickets.filter(t => t.title.toLowerCase().includes(searchTerm.toLowerCase()));

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-end">
        <h1 className="text-2xl font-bold text-white flex items-center gap-3"><ListTodo className="text-blue-500" /> Backlog</h1>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={16} />
            <input 
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Filtrar tareas..." 
              className="bg-gray-900 border-gray-800 rounded-lg pl-10 pr-4 py-2 text-sm text-gray-300 outline-none" 
            />
          </div>
          <button onClick={() => setEditingTicket({})} className="bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-medium">+ Nuevo Item</button>
        </div>
      </div>

      <div className="bg-[#0B0E14] border border-gray-800 rounded-xl overflow-hidden shadow-2xl">
        <table className="w-full text-left">
          <thead className="bg-gray-900/50 border-b border-gray-800">
            <tr>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">Título</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase">Estado</th>
              <th className="p-4 text-xs font-bold text-gray-500 uppercase text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-800">
            {filteredTickets.map(ticket => (
              <tr key={ticket.id} className="hover:bg-white/[0.02] group transition-colors">
                <td className="p-4 text-sm font-medium text-gray-200">{ticket.title}</td>
                <td className="p-4 text-xs text-gray-400 uppercase">{ticket.status}</td>
                <td className="p-4 text-right flex justify-end gap-2">
                  <button onClick={() => setEditingTicket(ticket)} className="p-2 hover:bg-blue-500/20 text-blue-400 rounded-lg"><Edit3 size={14} /></button>
                  <button onClick={() => actions.deleteTicket(ticket.id)} className="p-2 hover:bg-red-500/20 text-red-400 rounded-lg"><Trash2 size={14} /></button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {editingTicket && (
        <TicketDetailModal 
          isOpen={true} 
          onClose={() => setEditingTicket(null)} 
          onSubmit={(data) => {
            editingTicket.id ? actions.updateTicket(editingTicket.id, data) : actions.createTicket(data);
          }}
          initialData={editingTicket.id ? editingTicket : null}
        />
      )}
    </div>
  );
}