'use client';

import React, { useState } from 'react';
// 1. ELIMINADO: useExecutionBoard (ya no existe)
import { useExecution } from '../context/ExecutionProvider';
import { BoardColumn } from './BoardColumn';
import { TicketDetailModal } from './TicketDetailModal'; 
import { CreateSprintModal } from './CreateSprintModal';
// 2. CORREGIDO: Importar desde el archivo central de tipos
import { TicketStatus, Ticket } from '@/app/types';

export const BoardPage = () => {
  // Usamos el contexto global que ya maneja los tickets del proyecto actual
  const { tickets, sprints, actions } = useExecution();
  
  const [isSprintModalOpen, setSprintModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);
  const [initialCreateStatus, setInitialCreateStatus] = useState<TicketStatus>('TODO'); 
  const [isCreateMode, setCreateMode] = useState(false);

  // Obtenemos el último sprint (o el activo)
  const currentSprint = sprints[sprints.length - 1];

  const openCreateModal = (status: TicketStatus = 'TODO') => { 
    setInitialCreateStatus(status);
    setCreateMode(true); 
    setEditingTicket(null); 
  };
  
  const openEditModal = (ticket: Ticket) => { 
    setCreateMode(false); 
    setEditingTicket(ticket); 
  };
  
  const closeTicketModal = () => { 
    setCreateMode(false); 
    setEditingTicket(null); 
  };

  const handleTicketSubmit = (data: any) => {
    if (editingTicket) {
      actions.updateTicket(editingTicket.id, data);
    } else {
      actions.createTicket({ ...data, status: data.status || initialCreateStatus });
    }
  };

  const columns: { id: TicketStatus; title: string }[] = [
    { id: 'TODO', title: 'Por hacer' },
    { id: 'IN_PROGRESS', title: 'En Progreso' },
    { id: 'REVIEW', title: 'Revisión / QA' },
    { id: 'DONE', title: 'Completado' },
  ];

  return (
    <div className="h-full min-h-screen flex flex-col bg-[#0B0E14] text-white">
      
      <header className="px-8 py-6 border-b border-gray-800 flex justify-between items-start">
        <div className="max-w-3xl">
          <h2 className="text-gray-400 text-xs uppercase tracking-wider mb-2">Proyecto / Sprint Active</h2>
          
          {currentSprint ? (
            <div className="animate-in fade-in slide-in-from-left-2 duration-300">
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-white tracking-tight">
                  {currentSprint.title}
                </h1>
                <span className="text-[10px] font-bold text-green-400 bg-green-900/20 border border-green-800 px-2 py-0.5 rounded-full uppercase">
                  Activo
                </span>
              </div>
              <div className="bg-[#151921] border-l-2 border-blue-500 pl-4 py-2 pr-4 rounded-r-lg mt-3">
                 <p className="text-gray-300 text-sm leading-relaxed">
                   <span className="text-blue-400 font-semibold mr-2">Objetivo:</span> 
                   {currentSprint.goal}
                 </p>
              </div>
            </div>
          ) : (
            <div>
              <h1 className="text-3xl font-bold text-white">Kanban</h1>
              <div className="text-sm text-gray-500 mt-1">Gestión continua de flujo de trabajo.</div>
            </div>
          )}
        </div>
        
        <div className="flex gap-3 mt-1">
          <button 
            onClick={() => setSprintModalOpen(true)}
            className="px-4 py-2 border border-gray-700 hover:border-gray-500 text-gray-300 rounded-lg text-sm font-medium transition-colors"
          >
            Planificar Sprint
          </button>
          <button 
            onClick={() => openCreateModal('TODO')}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium transition-colors shadow-[0_0_15px_rgba(37,99,235,0.3)]"
          >
            + Añadir Tarea
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-x-auto p-8">
        <div className="flex h-full gap-6 min-w-max">
          {columns.map((col) => (
            <BoardColumn
              key={col.id}
              status={col.id}
              title={col.title}
              tickets={tickets.filter(t => t.status === col.id)}
              onDropTicket={actions.moveTicket}
              onCardClick={openEditModal} 
              onQuickAdd={() => openCreateModal(col.id)}
            />
          ))}
        </div>
      </div>

      <TicketDetailModal 
        isOpen={isCreateMode || !!editingTicket} 
        onClose={closeTicketModal} 
        onSubmit={handleTicketSubmit}
        initialData={editingTicket ? editingTicket : (isCreateMode ? { status: initialCreateStatus } as any : null)} 
      />

      <CreateSprintModal
        isOpen={isSprintModalOpen}
        onClose={() => setSprintModalOpen(false)}
        onSubmit={actions.createSprint}
      />
    </div>
  );
};