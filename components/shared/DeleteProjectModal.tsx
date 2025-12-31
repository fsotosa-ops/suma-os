'use client';

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { AlertTriangle, Trash2 } from 'lucide-react';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  projectName: string;
}

export const DeleteProjectModal = ({ isOpen, onClose, onConfirm, projectName }: Props) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="bg-[#151921] border-red-900/30 text-white sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-red-500">
            <AlertTriangle size={20} /> Eliminar Proyecto
          </DialogTitle>
        </DialogHeader>
        
        <div className="py-4 space-y-3">
          <p className="text-sm text-zinc-300">
            ¿Estás seguro de que deseas eliminar <span className="font-bold text-white">"{projectName}"</span>?
          </p>
          <p className="text-xs text-red-400 bg-red-500/10 p-3 rounded-lg border border-red-500/20">
            Esta acción es irreversible. Se perderán todos los experimentos, objetivos y tareas asociados a este espacio.
          </p>
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <button 
            onClick={onClose}
            className="px-4 py-2 text-sm text-zinc-400 hover:text-white transition-colors"
          >
            Cancelar
          </button>
          <button 
            onClick={() => {
                onConfirm();
                onClose();
            }}
            className="bg-red-600 hover:bg-red-500 text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all"
          >
            <Trash2 size={16} /> Eliminar Permanentemente
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};