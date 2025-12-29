'use client';
import { useExecution } from './context/ExecutionProvider';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, CheckCircle2, AlertCircle, RefreshCw, ArrowUpRight } from 'lucide-react';
import Link from 'next/link'; // Importante importar Link

export default function ExecutionSummaryPage() {
  const { tickets, sprints } = useExecution();
  
  const stats = {
    total: tickets.length,
    todo: tickets.filter(t => t.status === 'TODO').length,
    inProgress: tickets.filter(t => t.status === 'IN_PROGRESS').length,
    done: tickets.filter(t => t.status === 'DONE').length,
  };

  const activeSprint = sprints.find(s => s.isActive);

  return (
    <div className="max-w-5xl mx-auto space-y-10 animate-in fade-in duration-700">
      <div className="space-y-2 border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-semibold text-zinc-100 tracking-tight">Resumen de Ejecución</h1>
        <p className="text-zinc-500">Panel de control operativo.</p>
      </div>

      {/* Grid de KPIs Interactivos */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Clic aquí lleva al Backlog general */}
        <Link href="/execution/backlog">
          <StatCard title="Total Tareas" value={stats.total} icon={<BarChart3 size={18} />} />
        </Link>
        
        {/* Clic aquí lleva al Kanban filtrado (idealmente) o al Kanban general */}
        <Link href="/execution/kanban">
          <StatCard title="Pendientes" value={stats.todo} icon={<Clock size={18} />} />
        </Link>

        <Link href="/execution/kanban">
          <StatCard title="En Curso" value={stats.inProgress} icon={<AlertCircle size={18} />} />
        </Link>

        <Link href="/execution/backlog">
          <StatCard title="Finalizadas" value={stats.done} icon={<CheckCircle2 size={18} />} />
        </Link>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Widget Sprint Activo (Clic lleva a Sprints) */}
        <Link href="/execution/sprints" className="lg:col-span-2 block group">
          <Card className="bg-zinc-900/20 border-zinc-800 shadow-sm hover:border-zinc-600 transition-all h-full cursor-pointer">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-6">
              <CardTitle className="text-sm font-medium text-zinc-400 flex items-center gap-2 group-hover:text-zinc-200 transition-colors">
                <RefreshCw size={14} className="text-blue-500" /> Ciclo Actual
                <ArrowUpRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
              </CardTitle>
              <span className="text-[10px] font-bold bg-emerald-500/10 text-emerald-500 px-2 py-0.5 rounded-full border border-emerald-500/20 uppercase tracking-widest">
                Activo
              </span>
            </CardHeader>
            <CardContent>
              {activeSprint ? (
                <div className="space-y-6">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-semibold text-zinc-100">{activeSprint.title}</h3>
                      <p className="text-sm text-zinc-500 mt-1 italic">"{activeSprint.goal}"</p>
                    </div>
                  </div>
                  
                  {/* Barra de progreso */}
                  <div className="space-y-2">
                    <div className="flex justify-between text-[10px] font-bold text-zinc-500 uppercase">
                      <span>Progreso</span>
                      <span>{stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0}%</span>
                    </div>
                    <div className="h-1.5 w-full bg-zinc-800 rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-zinc-100 transition-all duration-1000 ease-out" 
                        style={{ width: `${stats.total > 0 ? (stats.done / stats.total) * 100 : 0}%` }} 
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="py-10 text-center border border-dashed border-zinc-800 rounded-xl">
                  <p className="text-zinc-600 text-sm italic">No hay un sprint activo actualmente.</p>
                </div>
              )}
            </CardContent>
          </Card>
        </Link>

        {/* Prioridades (Clic lleva al Backlog) */}
        <Link href="/execution/backlog" className="block group">
            <Card className="bg-zinc-900/20 border-zinc-800 shadow-sm hover:border-zinc-600 transition-all h-full cursor-pointer">
            <CardHeader>
                <CardTitle className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] group-hover:text-zinc-300">Prioridades</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                {tickets.filter(t => t.status === 'TODO').slice(0, 3).map(ticket => (
                <div key={ticket.id} className="flex items-center justify-between p-3 bg-zinc-900/40 border border-zinc-800 rounded-lg">
                    <span className="text-xs text-zinc-300 truncate pr-2">{ticket.title}</span>
                </div>
                ))}
            </CardContent>
            </Card>
        </Link>
      </div>
    </div>
  );
}

function StatCard({ title, value, icon }: { title: string; value: number; icon: React.ReactNode }) {
  return (
    <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/10 hover:bg-zinc-800/40 transition-all group cursor-pointer h-full">
      <div className="flex justify-between items-center">
        <div>
          <p className="text-[10px] font-bold text-zinc-600 uppercase tracking-widest group-hover:text-zinc-400 transition-colors">{title}</p>
          <h2 className="text-2xl font-semibold text-zinc-100 mt-1 font-mono tracking-tighter">{value}</h2>
        </div>
        <div className="p-2.5 bg-zinc-800/50 rounded-lg text-zinc-500 group-hover:text-zinc-100 transition-colors">
          {icon}
        </div>
      </div>
    </div>
  );
}