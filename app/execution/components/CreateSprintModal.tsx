import React, { useState } from 'react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (title: string, start: string, end: string, goal: string) => void;
}

export const CreateSprintModal: React.FC<Props> = ({ isOpen, onClose, onSubmit }) => {
  const [title, setTitle] = useState('');
  const [goal, setGoal] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(title, startDate, endDate, goal);
    onClose();
    // Resetear formulario
    setTitle('');
    setGoal('');
    setStartDate('');
    setEndDate('');
  };

  const inputStyle = "w-full bg-[#0B0E14] border border-gray-700 rounded-lg p-2.5 text-gray-100 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all";
  const labelStyle = "block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2";

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#151921] border border-gray-800 p-6 rounded-xl w-[450px] shadow-2xl relative animate-in fade-in zoom-in duration-200">
        
        <h2 className="text-xl font-bold text-white mb-6">Planificar Nuevo Sprint</h2>

        <form onSubmit={handleSubmit} className="flex flex-col gap-5">
          
          {/* Nombre */}
          <div>
            <label className={labelStyle}>Nombre del Sprint</label>
            <input 
              type="text" 
              value={title}
              onChange={e => setTitle(e.target.value)}
              className={inputStyle}
              placeholder="Ej: Sprint 4 - Optimización"
              autoFocus
              required
            />
          </div>

          {/* Objetivo (Nuevo) */}
          <div>
            <label className={labelStyle}>Objetivo del Sprint</label>
            <textarea 
              value={goal} 
              onChange={e => setGoal(e.target.value)} 
              className={`${inputStyle} h-24 resize-none`} 
              placeholder="Describe el valor principal que entregaremos al final de este ciclo..."
              required
            />
          </div>

          {/* Fechas */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className={labelStyle}>Inicio</label>
              <input 
                type="date" 
                value={startDate}
                onChange={e => setStartDate(e.target.value)}
                className={`${inputStyle} [color-scheme:dark]`}
                required
              />
            </div>
            <div>
              <label className={labelStyle}>Fin</label>
              <input 
                type="date" 
                value={endDate}
                onChange={e => setEndDate(e.target.value)}
                className={`${inputStyle} [color-scheme:dark]`}
                required
              />
            </div>
          </div>

          {/* Footer */}
          <div className="flex justify-end gap-3 mt-4 pt-4 border-t border-gray-800">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-4 py-2 text-gray-400 hover:text-white text-sm font-medium"
            >
              Cancelar
            </button>
            <button 
              type="submit" 
              className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-medium shadow-lg shadow-blue-900/20"
            >
              Confirmar Sprint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};