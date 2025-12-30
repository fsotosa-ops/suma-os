'use client';

import { useState } from 'react';
import { WarRoomDoc } from '@/app/types';
import { WarRoomSidebar } from './components/WarRoomSidebar';
import { DocumentCanvas } from './components/DocumentCanvas';
import { Layout } from 'lucide-react';

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
      { id: '3', type: 'callout', content: 'PRIORIDAD MÁXIMA: Estabilizar el funnel de pagos.' }
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
      // Conecta con datos vivos del StrategyProvider usando leverId
      { id: '2', type: 'smart-metric', content: { leverId: 'l1', name: 'Conversion Rate', value: '2.4%', target: '3.0%' } },
      { id: '3', type: 'text', content: 'Si cambiamos el tier básico a freemium, esperamos recuperar el volumen de leads.' }
    ]
  },
  {
    id: 'ops-deploy',
    icon: '🛡️',
    title: 'Ops: Despliegue Hotfix',
    category: 'ENGINEERING',
    updatedAt: 'Hace 15m',
    blocks: [
      { id: '1', type: 'text', content: 'Log de despliegue para el parche de seguridad de Auth0.' },
      { id: '2', type: 'tech-status', content: { service: 'Auth Service', version: '2.1.1-hotfix', endpoint: 'prod-us-east', status: 'operational' } }
    ]
  }
];

export default function WarRoomPage() {
  const [selectedDocId, setSelectedDocId] = useState<string | null>('situation-room');
  const [docs, setDocs] = useState<WarRoomDoc[]>(INITIAL_INTEL);

  const selectedDoc = docs.find(d => d.id === selectedDocId);

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

      {selectedDoc ? (
        <DocumentCanvas doc={selectedDoc} />
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-zinc-600 animate-in fade-in">
            <Layout size={64} className="mb-4 opacity-10" />
            <p>Selecciona una sesión operativa</p>
        </div>
      )}
    </div>
  );
}