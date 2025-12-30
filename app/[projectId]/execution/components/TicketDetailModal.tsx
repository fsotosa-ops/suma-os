import React, { useState, useEffect } from 'react';
import { Ticket, TicketType, TicketStatus } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  initialData?: Partial<Ticket> | null; // Cambiamos a Partial para aceptar datos incompletos
}

export const TicketDetailModal: React.FC<Props> = ({ isOpen, onClose, onSubmit, initialData }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState<TicketType>('STORY');
  const [status, setStatus] = useState<TicketStatus>('TODO');
  const [points, setPoints] = useState(0);

  // Detectamos si es MODO EDICIÓN real (tiene ID)
  const isEditing = initialData && initialData.id;

  useEffect(() => {
    if (isOpen) {
      if (isEditing) {
        // CASO 1: EDICIÓN REAL (Cargamos todo)
        setTitle(initialData!.title || '');
        setDescription(initialData!.description || '');
        setType(initialData!.type || 'STORY');
        setStatus(initialData!.status || 'TODO');
        setPoints(initialData!.points || 0);
      } else if (initialData && initialData.status) {
        // CASO 2: CREACIÓN RÁPIDA (Solo pre-cargamos el status, reseteamos el resto)
        setTitle('');
        setDescription('');
        setType('STORY');
        setStatus(initialData.status as TicketStatus); // <-- Aquí tomamos el status de la columna
        setPoints(0);
      } else {
        // CASO 3: CREACIÓN NORMAL (Botón azul del header)
        setTitle('');
        setDescription('');
        setType('STORY');
        setStatus('TODO');
        setPoints(0);
      }
    }
  }, [initialData, isOpen, isEditing]);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, description, type, status, points });
    onClose();
  };

  const inputStyle = "w-full bg-[#0B0E14] border border-gray-700 rounded-lg p-2.5 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none";
  const labelStyle = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2";

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-end z-50">
      <div className="h-full w-[600px] bg-[#151921] border-l border-gray-800 shadow-2xl p-8 overflow-y-auto animate-in slide-in-from-right duration-300">
        
        {/* Header del Modal */}
        <div className="flex justify-between items-start mb-8">
          <div>
            <span className="text-xs text-gray-500 uppercase font-mono tracking-widest">
              {/* SOLUCIÓN DEL ERROR: Verificamos si existe el ID antes de hacer slice */}
              {isEditing && initialData?.id 
                ? `ID: ${initialData.id.slice(0, 8)}` 
                : 'NUEVO ITEM'}
            </span>
            <h2 className="text-2xl font-bold text-white mt-1">
              {isEditing ? 'Editar Tarea' : 'Crear Tarea'}
            </h2>
          </div>
          <button 
            onClick={onClose} 
            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-800 text-gray-400 transition-colors"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          
          {/* Título Grande */}
          <div>
            <label className={labelStyle}>Título</label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className="w-full bg-transparent text-xl font-bold text-white placeholder-gray-600 focus:outline-none border-b border-gray-700 focus:border-blue-500 pb-2 transition-colors"
              placeholder="Escribe el título de la tarea aquí..."
              autoFocus={!isEditing}
              required
            />
          </div>

          {/* Grid de Propiedades */}
          <div className="grid grid-cols-2 gap-6 bg-[#0B0E14] p-4 rounded-xl border border-gray-800">
            <div>
              <label className={labelStyle}>Tipo</label>
              <select 
                value={type} 
                onChange={(e) => setType(e.target.value as TicketType)} 
                className="w-full bg-[#151921] text-white text-sm border border-gray-700 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="STORY">📘 Historia</option>
                <option value="EPIC">🚀 Épica</option>
                <option value="TASK">🔨 Tarea</option>
                <option value="BUG">🐛 Bug</option>
              </select>
            </div>
            <div>
              <label className={labelStyle}>Estado</label>
              <select 
                value={status} 
                onChange={(e) => setStatus(e.target.value as TicketStatus)} 
                className="w-full bg-[#151921] text-white text-sm border border-gray-700 rounded p-2 focus:ring-1 focus:ring-blue-500 outline-none"
              >
                <option value="TODO">Por hacer</option>
                <option value="IN_PROGRESS">En Progreso</option>
                <option value="REVIEW">Revisión</option>
                <option value="DONE">Listo</option>
              </select>
            </div>
          </div>

          {/* Descripción */}
          <div>
             <label className={labelStyle}>Descripción</label>
             <textarea 
               value={description}
               onChange={e => setDescription(e.target.value)}
               className={`${inputStyle} h-48 resize-none font-mono text-sm leading-relaxed`}
               placeholder="Añade detalles, criterios de aceptación o notas..."
             />
          </div>

          {/* Puntos (si no es Epica) */}
          {type !== 'EPIC' && (
            <div>
               <label className={labelStyle}>Story Points</label>
               <div className="flex items-center gap-2">
                 <input 
                   type="number" 
                   value={points}
                   onChange={e => setPoints(Number(e.target.value))}
                   className="w-24 bg-[#0B0E14] border border-gray-700 rounded-lg p-2.5 text-gray-100"
                   min="0"
                 />
                 <span className="text-sm text-gray-500">pts</span>
               </div>
            </div>
          )}
          
          <div className="flex-1"></div>

          {/* Botones de Acción */}
          <div className="flex justify-end gap-4 pt-6 border-t border-gray-800 sticky bottom-0 bg-[#151921]">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-2.5 text-gray-400 hover:text-white text-sm font-medium transition-colors"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-6 py-2.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-900/20 transition-all"
            >
              {isEditing ? 'Guardar Cambios' : 'Crear Tarea'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};