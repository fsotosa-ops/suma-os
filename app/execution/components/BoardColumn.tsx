import React from 'react';
import { Ticket, TicketStatus } from '../types';
import { BoardCard } from './BoardCard';

interface Props {
  status: TicketStatus;
  title: string;
  tickets: Ticket[];
  onDropTicket: (ticketId: string, status: TicketStatus) => void;
  onCardClick: (ticket: Ticket) => void;
  onQuickAdd: () => void; // <-- NUEVA PROP
}

export const BoardColumn: React.FC<Props> = ({ status, title, tickets, onDropTicket, onCardClick, onQuickAdd }) => {
  
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const ticketId = e.dataTransfer.getData('ticketId');
    if (ticketId) onDropTicket(ticketId, status);
    e.currentTarget.classList.remove('bg-gray-800/30');
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.currentTarget.classList.add('bg-gray-800/30');
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.currentTarget.classList.remove('bg-gray-800/30');
  };

  return (
    <div 
      className="flex-1 min-w-[320px] rounded-xl flex flex-col transition-colors duration-200"
      onDrop={handleDrop}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
    >
      <div className="flex justify-between items-center mb-4 px-2">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-400 text-sm">{title}</h3>
          <span className="bg-[#1E2330] text-gray-500 px-2 py-0.5 rounded-full text-xs font-mono">
            {tickets.length}
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto pr-2 custom-scrollbar pb-10">
        {tickets.map(ticket => (
          <BoardCard 
            key={ticket.id} 
            ticket={ticket} 
            onClick={onCardClick} 
          />
        ))}
        
        {/* BOTÓN CONECTADO AHORA */}
        <button 
          onClick={onQuickAdd}
          className="w-full py-3 mt-2 border border-dashed border-gray-800 rounded-lg text-gray-600 text-sm hover:border-gray-600 hover:text-gray-400 transition-all flex items-center justify-center gap-2 hover:bg-[#1A1F29]"
        >
          <span>+</span> Añadir tarea rápida
        </button>
      </div>
    </div>
  );
};