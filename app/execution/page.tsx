'use client';

// CAMBIO 1: Importar el hook correcto del contexto de ejecución
import { useExecution } from './context/ExecutionProvider';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Activity, TrendingUp, CheckCircle2, AlertCircle, Calendar, Zap } from 'lucide-react';

export default function DashboardPage() {
  // CAMBIO 2: Extraemos tickets y sprints del nuevo provider
  const { tickets, sprints } = useExecution();

  // CAMBIO 3: Lógica para determinar el sprint actual (Activo o el primero)
  const currentSprint = sprints.find(s => s.isActive) || sprints[0] || null;
  
  // CAMBIO 4: Mock de métricas (antes venían vacías del ProjectProvider)
  // En el futuro, esto debería venir de un MonitoringProvider o similar
  const metrics: any[] = []; 

  const completedTickets = tickets.filter(t => t.status === 'DONE').length;
  const totalTickets = tickets.length;
  const velocity = totalTickets > 0 ? Math.round((completedTickets / totalTickets) * 100) : 0;
  
  const apiMetric = metrics.find(m => m.name === 'API Uptime');
  const errorMetric = metrics.find(m => m.name === 'Error Rate');

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in duration-700 p-8">
      
      <div className="border-b border-zinc-800 pb-6">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-100">
          Dashboard de Ejecución
        </h1>
        <p className="text-zinc-500 mt-1">Visión técnica detallada del Sprint actual.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <DashboardCard 
          title="Velocidad de Equipo" 
          value={`${velocity}%`} 
          icon={<Zap size={18} className="text-yellow-500" />}
          trend="+5% vs last week"
        />
        <DashboardCard 
          title="Sprint Activo" 
          value={currentSprint?.title || 'Sin Sprint Activo'} 
          icon={<Calendar size={18} className="text-blue-500" />}
          subtext={`Deadline: ${currentSprint?.endDate || '--/--'}`}
        />
        <DashboardCard 
          title="Tickets Completados" 
          value={`${completedTickets}/${totalTickets}`} 
          icon={<CheckCircle2 size={18} className="text-emerald-500" />}
          trend={velocity > 50 ? "Alta productividad" : "Ritmo moderado"}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <Activity size={14} /> Actividad del Sprint
          </h2>
          <div className="border border-zinc-800 rounded-xl bg-zinc-900/20 overflow-hidden">
            {tickets.map((ticket) => (
              <div key={ticket.id} className="p-4 border-b border-zinc-800 last:border-0 flex justify-between items-center hover:bg-zinc-800/50 transition-colors">
                <div className="flex items-center gap-3">
                  <div className={`w-2 h-2 rounded-full ${ticket.status === 'DONE' ? 'bg-emerald-500' : ticket.status === 'BLOCKED' ? 'bg-red-500' : 'bg-blue-400'}`} />
                  <span className="text-sm font-medium text-zinc-300">{ticket.title}</span>
                </div>
                <span className={`text-[10px] font-mono uppercase px-2 py-1 rounded border ${ticket.status === 'BLOCKED' ? 'border-red-900 text-red-400 bg-red-900/10' : 'border-zinc-700 text-zinc-400'}`}>
                  {ticket.status}
                </span>
              </div>
            ))}
            {tickets.length === 0 && (
              <p className="p-6 text-center text-sm text-zinc-500 italic">No hay tickets activos.</p>
            )}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-2">
            <AlertCircle size={14} /> System Health
          </h2>
          
          <Card className="bg-zinc-900/20 border-zinc-800">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-zinc-500">Métricas de Infraestructura</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <HealthItem 
                label="API Uptime" 
                value={apiMetric ? `${apiMetric.value}${apiMetric.unit}` : '--'} 
                status={apiMetric?.status === 'ok' ? 'good' : 'bad'} 
              />
              <HealthItem 
                label="Error Rate" 
                value={errorMetric ? `${errorMetric.value}${errorMetric.unit}` : '--'} 
                status={errorMetric?.status === 'ok' ? 'good' : 'warning'} 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

// Componentes auxiliares visuales (sin cambios lógicos)
function DashboardCard({ title, value, icon, trend, subtext }: any) {
  return (
    <div className="p-5 rounded-xl border border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 transition-all">
      <div className="flex justify-between items-start mb-2">
        <span className="text-xs font-bold text-zinc-500 uppercase tracking-wider">{title}</span>
        <div className="p-1.5 bg-zinc-800 rounded-md">{icon}</div>
      </div>
      <div className="text-2xl font-bold text-zinc-100 font-mono tracking-tight">{value}</div>
      {(trend || subtext) && (
        <p className="text-xs text-zinc-400 mt-2 flex items-center gap-1">
          {trend && <TrendingUp size={10} className="text-emerald-500" />}
          {trend || subtext}
        </p>
      )}
    </div>
  );
}

function HealthItem({ label, value, status }: { label: string, value: string, status: 'good' | 'warning' | 'bad' }) {
  const color = status === 'good' ? 'bg-emerald-500' : status === 'warning' ? 'bg-yellow-500' : 'bg-red-500';
  const shadowColor = status === 'good' ? 'shadow-emerald-500/50' : status === 'warning' ? 'shadow-yellow-500/50' : 'shadow-red-500/50';
  
  return (
    <div className="flex justify-between items-center p-2 rounded-lg hover:bg-zinc-800/30 transition-colors">
      <div className="flex items-center gap-3">
        <div className={`w-1.5 h-1.5 rounded-full ${color} shadow-[0_0_8px] ${shadowColor}`} />
        <span className="text-sm text-zinc-400">{label}</span>
      </div>
      <span className="text-sm font-mono font-medium text-zinc-200">{value}</span>
    </div>
  );
}