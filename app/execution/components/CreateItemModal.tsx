import React, { useState } from 'react';
import { TicketType } from '../types';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
}

export const CreateItemModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [type, setType] = useState<TicketType>('STORY');
  const [title, setTitle] = useState('');
  const [points, setPoints] = useState(0);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ type, title, points });
    onClose();
    setTitle('');
    setPoints(0);
  };

  // Estilos reutilizables dark mode
  const inputStyle = "w-full bg-[#0B0E14] border border-gray-700 rounded-lg p-2.5 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none";
  const labelStyle = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#151921] border border-gray-800 p-6 rounded-xl w-[450px] shadow-2xl">
        
        <h2 className="text-xl font-bold text-white mb-6">Nueva Tarea</h2>
        
        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Selector de Tipo */}
          <div>
            <label className={labelStyle}>Tipo de Item</label>
            <select 
              value={type} 
              onChange={(e) => setType(e.target.value as TicketType)}
              className={inputStyle}
            >
              <option value="STORY">📘 Historia de Usuario</option>
              <option value="EPIC">🚀 Épica</option>
              <option value="TASK">🔨 Tarea Técnica</option>
              <option value="BUG">🐛 Bug</option>
            </select>
          </div>

          {/* Input Título */}
          <div>
            <label className={labelStyle}>Título</label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className={inputStyle}
              placeholder="Ej: Integrar API de pagos"
              autoFocus
              required
            />
          </div>

          {/* Puntos (Ocultar si es Épica) */}
          {type !== 'EPIC' && (
            <div>
               <label className={labelStyle}>Story Points</label>
               <input 
                 type="number" 
                 value={points}
                 onChange={e => setPoints(Number(e.target.value))}
                 className={inputStyle}
                 min="0"
               />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-800">
            <button type="button" onClick={onClose} className="px-4 py-2 text-gray-400 hover:text-white text-sm">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium shadow-[0_0_10px_rgba(37,99,235,0.3)]">
              Crear Ticket
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};