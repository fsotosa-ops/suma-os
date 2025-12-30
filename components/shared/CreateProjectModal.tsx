'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Plus, FolderPlus } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (name: string) => void;
}

export const CreateProjectModal = ({ isOpen, onClose, onSubmit }: Props) => {
  const [name, setName] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) return;
    onSubmit(name);
    setName(''); // Limpiar input
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#151921] border-zinc-800 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <FolderPlus className="text-blue-500" /> Nuevo Proyecto
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4 py-2">
          <div className="space-y-2">
            <label className="text-xs font-bold text-zinc-500 uppercase">Nombre del Proyecto</label>
            <input 
              autoFocus
              className="w-full bg-black border border-zinc-700 rounded-lg p-3 text-sm text-white outline-none focus:border-blue-500 transition-all"
              placeholder="Ej: Lanzamiento Q3, App Móvil..."
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          
          <div className="flex justify-end gap-2 pt-2">
            <button type="button" onClick={onClose} className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors">Cancelar</button>
            <button 
                type="submit" 
                disabled={!name.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-lg shadow-blue-900/20"
            >
                <Plus size={16} /> Crear
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};