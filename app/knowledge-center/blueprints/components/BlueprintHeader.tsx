'use client';
import { PenTool, Share2, Save } from 'lucide-react';

export const BlueprintHeader = () => (
    <div className="flex items-center justify-between pb-6 border-b border-white/[0.06]">
      <div>
        <div className="flex items-center gap-3 mb-1">
          <div className="p-2 bg-blue-500/10 rounded-lg"><PenTool className="text-blue-400" size={20} /></div>
          <h1 className="text-2xl font-bold text-white tracking-tight">System Architecture</h1>
        </div>
        <p className="text-slate-500 text-sm ml-11">Diagrama técnico de flujos operativos</p>
      </div>
      <div className="flex items-center gap-2">
        <button className="flex items-center gap-2 bg-white/[0.05] border border-white/[0.08] hover:bg-white/[0.1] text-white px-4 py-2 rounded-lg text-xs font-semibold transition-all">
          <Save size={14} /> Guardar
        </button>
        <button className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-all shadow-lg shadow-blue-500/20">
          Publicar
        </button>
      </div>
    </div>
);