'use client';

import { Sparkles, Bot } from 'lucide-react';
import { BlockContentAi } from '@/app/types';

export const AiSummary = ({ data }: { data: BlockContentAi }) => {
  return (
    <div className="my-6 relative group">
        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl opacity-20 group-hover:opacity-30 transition duration-500 blur"></div>
        <div className="relative p-5 rounded-xl bg-[#0B0E14] border border-zinc-800 flex gap-4">
            <div className="shrink-0 mt-1">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center text-white shadow-lg">
                    <Sparkles size={16} />
                </div>
            </div>
            <div className="space-y-2 flex-1">
                <div className="flex justify-between items-center">
                    <span className="text-[10px] font-bold text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-purple-400 uppercase tracking-widest flex items-center gap-1">
                        <Bot size={12} /> War Room Copilot
                    </span>
                    <span className="text-[9px] text-zinc-600 font-mono">Generated Just Now</span>
                </div>
                <p className="text-sm text-zinc-300 leading-relaxed font-light whitespace-pre-line">
                    {data.response}
                </p>
            </div>
        </div>
    </div>
  );
};