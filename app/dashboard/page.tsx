'use client';

import { useProjectData } from '@/app/context/ProjectProvider';
import { Card } from "@/components/ui/card";
import { Bell, CheckCircle2, AlertOctagon, GitCommit, MessageSquare, Clock } from 'lucide-react';

export default function DashboardPage() {
  const { tickets, objectives } = useProjectData();

  // Simulación de "Eventos Recientes" basada en tus datos reales
  // En una app real, esto vendría de un log de base de datos
  const events = [
    { 
      id: 1, type: 'alert', time: 'Hace 10 min', 
      text: 'Se detectó un bloqueo crítico en "Fix Login Timeout".',
      author: 'Sistema', icon: <AlertOctagon size={16} className="text-red-500" /> 
    },
    { 
      id: 2, type: 'success', time: 'Hace 2 horas', 
      text: 'El ticket "Diseño Base de Datos" fue completado.', 
      author: 'Pablo A.', icon: <CheckCircle2 size={16} className="text-emerald-500" /> 
    },
    { 
      id: 3, type: 'info', time: 'Ayer, 18:30', 
      text: 'Nuevo OKR estratégico definido: "Infraestructura Escalable".', 
      author: 'CTO', icon: <TargetIcon /> 
    },
    { 
      id: 4, type: 'commit', time: 'Ayer, 15:45', 
      text: 'Deploy a producción (v1.2.4) exitoso.', 
      author: 'DevOps Bot', icon: <GitCommit size={16} className="text-blue-500" /> 
    },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      
      {/* Saludo y Foco del Día */}
      <div className="space-y-2">
        <h1 className="text-3xl font-semibold text-zinc-100">Buenos días, Pablo.</h1>
        <p className="text-zinc-500">
          Hoy el foco principal es desbloquear <span className="text-zinc-200 font-medium bg-zinc-900 px-2 py-0.5 rounded border border-zinc-800">Login Timeout</span> para asegurar la meta del Sprint.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* Columna Izquierda: Briefing / Feed (2/3 del ancho) */}
        <div className="md:col-span-2 space-y-6">
          <div className="flex items-center gap-2 mb-4">
             <Bell size={16} className="text-zinc-400" />
             <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest">Actividad Reciente</h2>
          </div>

          <div className="relative border-l border-zinc-800 ml-3 space-y-8 pb-10">
            {events.map((event) => (
              <div key={event.id} className="relative pl-8">
                {/* Punto en la línea de tiempo */}
                <div className="absolute -left-[9px] top-1 bg-zinc-950 p-1 rounded-full border border-zinc-800">
                  {event.icon}
                </div>
                
                <div className="flex flex-col">
                   <span className="text-xs text-zinc-500 font-mono mb-1 flex items-center gap-2">
                     <Clock size={10} /> {event.time} • {event.author}
                   </span>
                   <p className="text-zinc-300 text-sm leading-relaxed">
                     {event.text}
                   </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Columna Derecha: Resumen Rápido (1/3 del ancho) */}
        <div className="space-y-6">
           {/* Widget de Salud Rápida */}
           <Card className="p-4 bg-zinc-900/50 border-zinc-800">
              <h3 className="text-xs font-bold text-zinc-500 uppercase mb-3">Estado del Sistema</h3>
              <div className="flex items-center gap-3 mb-2">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-sm font-medium text-zinc-200">Operacional</span>
              </div>
              <p className="text-xs text-zinc-500">Último check: hace 5m</p>
           </Card>

           {/* Widget de Recordatorios */}
           <Card className="p-4 bg-zinc-900/50 border-zinc-800">
              <h3 className="text-xs font-bold text-zinc-500 uppercase mb-3">Pendientes</h3>
              <ul className="space-y-3">
                <li className="text-sm text-zinc-400 flex items-start gap-2">
                  <div className="w-4 h-4 rounded border border-zinc-700 mt-0.5" />
                  Revisar PR #402
                </li>
                <li className="text-sm text-zinc-400 flex items-start gap-2">
                   <div className="w-4 h-4 rounded border border-zinc-700 mt-0.5" />
                   Aprobar OKRs Q2
                </li>
              </ul>
           </Card>
        </div>

      </div>
    </div>
  );
}

function TargetIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-purple-500"><circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="6"/><circle cx="12" cy="12" r="2"/></svg>
  )
}