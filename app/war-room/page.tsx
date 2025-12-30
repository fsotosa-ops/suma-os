'use client';

import { useState, useEffect } from 'react';
import { WarRoomDoc, Block } from '@/app/types';
import { WarRoomSidebar } from './components/WarRoomSidebar';
import { DocumentCanvas } from './components/DocumentCanvas';
import { Layout, Bot, StopCircle, PlayCircle } from 'lucide-react';

const INITIAL_INTEL: WarRoomDoc[] = [
  {
    id: 'situation-room',
    icon: '🚨',
    title: 'Situation Room: Q1 Crisis',
    category: 'GENERAL',
    updatedAt: 'LIVE',
    blocks: [
      { id: '1', type: 'h1', content: 'Estado de Alerta Q1' },
      { id: '2', type: 'text', content: 'El objetivo es mitigar la caída del 12% en conversión detectada el lunes pasado.' },
      { id: '3', type: 'callout', content: 'PRIORIDAD MÁXIMA: Estabilizar el funnel de pagos.' },
      // Bloque de Acción pre-insertado para demostración
      { id: '4', type: 'action-trigger', content: { title: 'Revertir deploy de pasarela v2', status: 'pending' } }
    ]
  },
  {
    id: 'tactics-pricing',
    icon: '⚔️',
    title: 'Táctica: Ajuste de Pricing',
    category: 'BUSINESS',
    updatedAt: 'Hace 2h',
    blocks: [
      { id: '1', type: 'h2', content: 'Impacto Esperado' },
      { id: '2', type: 'smart-metric', content: { leverId: 'l1', name: 'Conversion Rate', value: '2.4%', target: '3.0%' } },
      { id: '3', type: 'text', content: 'Si cambiamos el tier básico a freemium, esperamos recuperar el volumen de leads.' }
    ]
  }
];

export default function WarRoomPage() {
  const [selectedDocId, setSelectedDocId] = useState<string | null>('situation-room');
  const [docs, setDocs] = useState<WarRoomDoc[]>(INITIAL_INTEL);
  const [isLive, setIsLive] = useState(false);
  const [timer, setTimer] = useState(0);

  // Timer para Live Session
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isLive) {
        interval = setInterval(() => setTimer(t => t + 1), 1000);
    }
    return () => clearInterval(interval);
  }, [isLive]);

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60).toString().padStart(2, '0');
    const secs = (s % 60).toString().padStart(2, '0');
    return `${mins}:${secs}`;
  };

  const selectedDoc = docs.find(d => d.id === selectedDocId);

  const handleUpdateDocBlocks = (newBlocks: Block[]) => {
    if (!selectedDocId) return;
    setDocs(prev => prev.map(doc => doc.id === selectedDocId ? { ...doc, blocks: newBlocks } : doc));
  };

  const handleCopilot = () => {
    if (!selectedDocId) return;
    const summaryBlock: Block = {
        id: crypto.randomUUID(),
        type: 'ai-summary',
        content: { 
            prompt: 'Synthesize', 
            response: `ANALYSIS COMPLETED:\nDetecto una discrepancia entre la métrica de conversión y el uptime técnico reciente.\n\nRecomiendo crear un ticket de investigación inmediata para descartar fallos en el checkout.`
        }
    };
    handleUpdateDocBlocks([...(selectedDoc?.blocks || []), summaryBlock]);
  };

  const handleCreate = () => {
    const title = prompt("Nombre de la nueva sesión táctica:");
    if (title) {
        const newDoc: WarRoomDoc = {
            id: crypto.randomUUID(),
            icon: '📝',
            title,
            category: 'GENERAL',
            updatedAt: 'Now',
            blocks: []
        };
        setDocs([...docs, newDoc]);
        setSelectedDocId(newDoc.id);
    }
  };

  return (
    <div className="flex h-screen w-full bg-[#020617] text-slate-200 overflow-hidden font-sans">
      <WarRoomSidebar 
        documents={docs} 
        selectedId={selectedDocId} 
        onSelect={setSelectedDocId} 
        onCreate={handleCreate} 
      />

      <main className="flex-1 flex flex-col min-w-0 h-full relative">
        {/* Toolbar de Sesión (Header contextual) */}
        {selectedDoc && (
            <div className="h-14 border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur flex items-center justify-between px-6 shrink-0 z-20">
                <div className="flex items-center gap-4">
                    <button 
                        onClick={handleCopilot}
                        className="flex items-center gap-2 text-xs font-bold text-indigo-400 hover:text-indigo-300 bg-indigo-500/10 hover:bg-indigo-500/20 px-3 py-1.5 rounded-full border border-indigo-500/20 transition-all"
                    >
                        <Bot size={14} /> Copilot Synthesis
                    </button>
                </div>

                <div className="flex items-center gap-4">
                    {isLive && <span className="font-mono text-zinc-400 text-sm">{formatTime(timer)}</span>}
                    <button 
                        onClick={() => { setIsLive(!isLive); if(!isLive) setTimer(0); }}
                        className={`flex items-center gap-2 text-xs font-bold px-4 py-1.5 rounded-full border transition-all ${
                            isLive 
                            ? 'bg-red-500 text-white border-red-600 hover:bg-red-600' 
                            : 'bg-zinc-800 text-zinc-300 border-zinc-700 hover:bg-zinc-700'
                        }`}
                    >
                        {isLive ? <StopCircle size={14} /> : <PlayCircle size={14} />}
                        {isLive ? 'End Session' : 'Start Live Session'}
                    </button>
                </div>
            </div>
        )}

        {selectedDoc ? (
            <DocumentCanvas 
                doc={selectedDoc} 
                isLiveSession={isLive}
                onUpdateBlocks={handleUpdateDocBlocks}
            />
        ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 animate-in fade-in">
                <Layout size={64} className="mb-4 opacity-10" />
                <p>Selecciona una sesión operativa</p>
            </div>
        )}
      </main>
    </div>
  );
}