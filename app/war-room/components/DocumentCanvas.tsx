'use client';

import React from 'react';
import { Clock, MoreHorizontal, GripVertical, Plus } from 'lucide-react';
import { WarRoomDoc, Block, BlockContentMetric, BlockContentTech } from '@/app/types';
import { SmartMetric } from './blocks/SmartMetric';
import { TechStatus } from './blocks/TechStatus';

interface Props {
  doc: WarRoomDoc;
}

export const DocumentCanvas = ({ doc }: Props) => {
  
  const renderBlock = (block: Block) => {
    switch (block.type) {
      case 'h1':
        return <h1 className="text-3xl font-bold text-white mt-8 mb-4">{block.content as string}</h1>;
      case 'h2':
        return <h2 className="text-xl font-semibold text-zinc-100 mt-6 mb-3 border-b border-zinc-800 pb-2">{block.content as string}</h2>;
      case 'text':
        return <p className="text-zinc-400 text-sm leading-7 mb-2 text-justify">{block.content as string}</p>;
      case 'callout':
        return (
            <div className="my-4 p-4 rounded-lg bg-zinc-900/50 border-l-2 border-indigo-500 flex gap-3 text-sm text-zinc-300">
                <span>💡</span> {block.content as string}
            </div>
        );
      case 'code':
        return (
            <div className="my-4 rounded-lg bg-[#0d0d0d] border border-zinc-800 p-4 font-mono text-xs overflow-x-auto group">
                <div className="flex justify-between items-center mb-2 border-b border-zinc-800 pb-2">
                    <span className="text-[10px] text-zinc-500 uppercase">TypeScript</span>
                    <button className="text-[10px] text-zinc-600 hover:text-zinc-300 opacity-0 group-hover:opacity-100 transition-opacity">Copiar</button>
                </div>
                <pre className="text-indigo-300">{block.content as string}</pre>
            </div>
        );
      case 'smart-metric':
        return <SmartMetric data={block.content as BlockContentMetric} />;
      case 'tech-status':
        return <TechStatus data={block.content as BlockContentTech} />;
      default:
        return null;
    }
  };

  return (
    <div className="flex-1 overflow-y-auto bg-[#020617] h-full relative">
      <div className="max-w-3xl mx-auto py-16 px-8 min-h-full">
        
        {/* Header Documento */}
        <div className="mb-12 group">
            <div className="h-32 w-full -mt-16 mb-8 bg-gradient-to-b from-zinc-900/50 to-transparent border-b border-zinc-800/50 opacity-50 rounded-lg"></div>
            <div className="text-5xl mb-6">{doc.icon}</div>
            <h1 className="text-4xl font-bold text-white mb-4 tracking-tight">{doc.title}</h1>
            
            <div className="flex items-center gap-4 text-xs text-zinc-500 pb-4 border-b border-zinc-800">
                <span className="flex items-center gap-1">
                    <div className="w-4 h-4 rounded-full bg-indigo-500 flex items-center justify-center text-[8px] text-white font-bold">PA</div>
                    Pablo A.
                </span>
                <span className="flex items-center gap-1"><Clock size={12}/> {doc.updatedAt}</span>
            </div>
        </div>

        {/* Renderizado de Bloques */}
        <div className="space-y-1 pb-32">
            {doc.blocks.map((block) => (
                <div key={block.id} className="group/block flex items-start -ml-10 pl-10 relative">
                    <div className="absolute left-2 top-1.5 p-1 rounded hover:bg-zinc-800 text-zinc-600 cursor-grab opacity-0 group-hover/block:opacity-100 transition-all">
                        <GripVertical size={14} />
                    </div>
                    <div className="w-full">
                        {renderBlock(block)}
                    </div>
                </div>
            ))}
            
            <div className="h-8 mt-2 flex items-center text-zinc-700 text-sm italic opacity-50 hover:opacity-100 cursor-text select-none transition-opacity">
                <Plus size={14} className="mr-2" /> Escribe '/' para comandos...
            </div>
        </div>

      </div>
    </div>
  );
};