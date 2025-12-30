'use client';

import React, { useState, useRef } from 'react';
import { Clock, GripVertical, Plus, Command, Zap, Box, BrainCircuit } from 'lucide-react';
import { WarRoomDoc, Block, BlockContentMetric, BlockContentTech, BlockContentAction, BlockContentAi } from '@/app/types';
import { SmartMetric } from './blocks/SmartMetric';
import { TechStatus } from './blocks/TechStatus';
import { ActionTrigger } from './blocks/ActionTrigger';
import { AiSummary } from './blocks/AiSummary';
import { cn } from '@/lib/utils';

interface Props {
  doc: WarRoomDoc;
  isLiveSession?: boolean; // Nuevo: Indicador de sesión activa
  onUpdateBlocks: (newBlocks: Block[]) => void; // Nuevo: Callback para editar
}

export const DocumentCanvas = ({ doc, isLiveSession, onUpdateBlocks }: Props) => {
  const [showCommandMenu, setShowCommandMenu] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Función para añadir bloques
  const addBlock = (type: Block['type'], initialContent: any = '') => {
    const newBlock: Block = {
        id: crypto.randomUUID(),
        type,
        content: initialContent
    };
    onUpdateBlocks([...doc.blocks, newBlock]);
    setShowCommandMenu(false);
    // Auto-scroll suave al fondo
    setTimeout(() => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  // Función para actualizar el contenido de un bloque existente
  const updateBlockContent = (blockId: string, newContent: any) => {
    const updatedBlocks = doc.blocks.map(b => 
        b.id === blockId ? { ...b, content: newContent } : b
    );
    onUpdateBlocks(updatedBlocks);
  };
  
  const renderBlock = (block: Block) => {
    switch (block.type) {
      case 'h1':
        return <h1 className="text-3xl font-bold text-white mt-8 mb-4 outline-none" contentEditable suppressContentEditableWarning>{block.content as string}</h1>;
      case 'h2':
        return <h2 className="text-xl font-semibold text-zinc-100 mt-6 mb-3 border-b border-zinc-800 pb-2 outline-none" contentEditable suppressContentEditableWarning>{block.content as string}</h2>;
      case 'text':
        return <p className="text-zinc-400 text-sm leading-7 mb-2 text-justify outline-none focus:text-zinc-200" contentEditable suppressContentEditableWarning>{block.content as string}</p>;
      case 'callout':
        return (
            <div className="my-4 p-4 rounded-lg bg-zinc-900/50 border-l-2 border-indigo-500 flex gap-3 text-sm text-zinc-300">
                <span>💡</span> <span contentEditable suppressContentEditableWarning>{block.content as string}</span>
            </div>
        );
      case 'code':
        return (
            <div className="my-4 rounded-lg bg-[#0d0d0d] border border-zinc-800 p-4 font-mono text-xs overflow-x-auto group">
                <div className="flex justify-between items-center mb-2 border-b border-zinc-800 pb-2">
                    <span className="text-[10px] text-zinc-500 uppercase">TypeScript</span>
                    <button className="text-[10px] text-zinc-600 hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">Copiar</button>
                </div>
                <pre className="text-indigo-300" contentEditable suppressContentEditableWarning>{block.content as string}</pre>
            </div>
        );
      case 'smart-metric':
        return <SmartMetric data={block.content as BlockContentMetric} />;
      case 'tech-status':
        return <TechStatus data={block.content as BlockContentTech} />;
      case 'action-trigger':
        return <ActionTrigger data={block.content as BlockContentAction} onUpdate={(newData) => updateBlockContent(block.id, newData)} />;
      case 'ai-summary':
        return <AiSummary data={block.content as BlockContentAi} />;
      default:
        return null;
    }
  };

  return (
    <div className={cn(
        "flex-1 overflow-y-auto bg-[#020617] h-full relative transition-all duration-500",
        isLiveSession && "ring-2 ring-inset ring-red-500/20 bg-[#050202]" // Feedback visual sutil para modo Live
    )}>
      
      {/* Indicador Flotante de Sesión en Vivo */}
      {isLiveSession && (
        <div className="sticky top-4 left-0 right-0 flex justify-center z-10 pointer-events-none animate-in fade-in slide-in-from-top-2">
            <div className="bg-red-500/10 backdrop-blur-md border border-red-500/20 text-red-500 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2 shadow-xl">
                <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" /> Live Session Active
            </div>
        </div>
      )}

      <div className="max-w-3xl mx-auto py-16 px-8 min-h-full pb-64">
        
        {/* Header del Documento */}
        <div className="mb-12 group">
            <div className="h-32 w-full -mt-16 mb-8 bg-gradient-to-b from-zinc-900/50 to-transparent border-b border-zinc-800/50 opacity-50 rounded-lg"></div>
            <div className="text-5xl mb-6">{doc.icon}</div>
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight outline-none" contentEditable suppressContentEditableWarning>{doc.title}</h1>
            
            <div className="flex items-center gap-4 text-xs text-zinc-500 pb-4 border-b border-zinc-800">
                <span className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-[8px] text-white font-bold">PA</div>
                    Pablo A.
                </span>
                <span className="flex items-center gap-1"><Clock size={12}/> {doc.updatedAt}</span>
            </div>
        </div>

        {/* Renderizado de Bloques */}
        <div className="space-y-1">
            {doc.blocks.map((block) => (
                <div key={block.id} className="group/block flex items-start -ml-10 pl-10 relative hover:bg-white/[0.01] rounded-lg transition-colors pr-2">
                    {/* Handle para arrastrar (visual) */}
                    <div className="absolute left-2 top-1.5 p-1 rounded hover:bg-zinc-800 text-zinc-600 cursor-grab opacity-0 group-hover/block:opacity-100 transition-all">
                        <GripVertical size={14} />
                    </div>
                    <div className="w-full">
                        {renderBlock(block)}
                    </div>
                </div>
            ))}
            
            {/* Menú de Comandos ("/" Slash Commands) */}
            <div className="relative mt-4">
                {!showCommandMenu ? (
                    <button 
                        onClick={() => setShowCommandMenu(true)}
                        className="h-8 flex items-center text-zinc-600 text-sm italic opacity-50 hover:opacity-100 hover:text-zinc-400 transition-all w-full text-left"
                    >
                        <Plus size={14} className="mr-2" /> Haz clic para añadir bloque o escribe '/'...
                    </button>
                ) : (
                    <div className="bg-[#18181b] border border-zinc-800 rounded-lg shadow-2xl p-2 w-64 animate-in zoom-in-95 slide-in-from-left-2">
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 mb-2 mt-1">Bloques Básicos</p>
                        <CommandItem icon={Box} label="Texto" onClick={() => addBlock('text', 'Nuevo párrafo...')} />
                        <CommandItem icon={Box} label="Título H2" onClick={() => addBlock('h2', 'Nuevo Título')} />
                        
                        <p className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest px-2 mb-2 mt-3">Suma OS Power Blocks</p>
                        <CommandItem icon={Zap} label="Smart Metric" onClick={() => addBlock('smart-metric', { name: 'Metric', value: '0' })} highlight />
                        <CommandItem icon={Command} label="Action Trigger" onClick={() => addBlock('action-trigger', { title: '', status: 'pending' })} highlight />
                        <CommandItem icon={BrainCircuit} label="AI Summary" onClick={() => addBlock('ai-summary', { prompt: '', response: 'Analizando contexto...' })} highlight />
                    </div>
                )}
            </div>
            
            {/* Referencia para auto-scroll */}
            <div ref={bottomRef} />
        </div>

      </div>
    </div>
  );
};

// Subcomponente de ítem del menú
const CommandItem = ({ icon: Icon, label, onClick, highlight }: any) => (
    <button 
        onClick={onClick}
        className={cn(
            "w-full flex items-center gap-2 px-2 py-1.5 rounded text-xs text-left transition-colors",
            highlight ? "text-indigo-300 hover:bg-indigo-500/10 hover:text-indigo-200" : "text-zinc-300 hover:bg-zinc-800 hover:text-white"
        )}
    >
        <Icon size={14} className={highlight ? "text-indigo-500" : "text-zinc-500"} />
        {label}
    </button>
);