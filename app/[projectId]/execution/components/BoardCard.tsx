import React from 'react';
import { Ticket } from '@/app/types';


interface Props {
  ticket: Ticket;
  onClick: (ticket: Ticket) => void; // Prop para manejar el click
}

export const BoardCard: React.FC<Props> = ({ ticket, onClick }) => {
  
  const getTypeStyles = (type: string) => {
    switch (type) {
      case 'EPIC': return 'bg-purple-900/50 text-purple-300 border-purple-700/50';
      case 'BUG': return 'bg-red-900/50 text-red-300 border-red-700/50';
      case 'STORY': return 'bg-blue-900/50 text-blue-300 border-blue-700/50';
      default: return 'bg-gray-800 text-gray-300 border-gray-700';
    }
  };

  return (
    <div 
      onClick={() => onClick(ticket)} // Al hacer click, ejecutamos la función padre
      className="p-4 mb-3 rounded-xl bg-[#151921] border border-gray-800 hover:border-gray-600 cursor-pointer transition-all group shadow-sm hover:shadow-lg hover:bg-[#1A1F29] active:scale-[0.99]"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData('ticketId', ticket.id);
        e.currentTarget.style.opacity = '0.5';
      }}
      onDragEnd={(e) => {
        e.currentTarget.style.opacity = '1';
      }}
    >
      <div className="flex justify-between items-start mb-3">
        <span className={`text-[10px] font-bold uppercase px-2 py-1 rounded border ${getTypeStyles(ticket.type)}`}>
          {ticket.type}
        </span>
        <div className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-500 text-xs">
          ✏️
        </div>
      </div>
      
      <h4 className="text-sm font-medium text-gray-100 mb-4 leading-snug">
        {ticket.title}
      </h4>

      <div className="flex justify-between items-center mt-2">
        <div className="flex -space-x-2">
           <div className="w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border-2 border-[#151921]"></div>
        </div>
        
        {ticket.points !== undefined && ticket.points > 0 && (
          <span className="text-xs text-gray-500 font-mono bg-[#1E2330] px-2 py-1 rounded border border-gray-800">
            {ticket.points} pts
          </span>
        )}
      </div>
    </div>
  );
};