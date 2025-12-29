'use client';
import { useExecution } from './context/ExecutionProvider';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, Clock, CheckCircle2, AlertCircle, RefreshCw } from 'lucide-react';

export default function ExecutionSummaryPage() {
  const { tickets, sprints } = useExecution();
  const activeSprint = sprints.find(s => s.isActive);

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <h1 className="text-3xl font-bold text-white">Resumen de Ejecución</h1>
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatCard title="Total" value={tickets.length} icon={<BarChart3 size={20} className="text-blue-400" />} color="bg-blue-500/10" />
        <StatCard title="Pendiente" value={tickets.filter(t => t.status === 'TODO').length} icon={<Clock size={20} className="text-slate-400" />} color="bg-slate-500/10" />
        <StatCard title="En Curso" value={tickets.filter(t => t.status === 'IN_PROGRESS').length} icon={<AlertCircle size={20} className="text-orange-400" />} color="bg-orange-500/10" />
        <StatCard title="Listo" value={tickets.filter(t => t.status === 'DONE').length} icon={<CheckCircle2 size={20} className="text-emerald-400" />} color="bg-emerald-500/10" />
      </div>
      {/* Widget Sprint */}
      <Card className="bg-[#0B0E14] border-gray-800">
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2 text-white">
            <RefreshCw size={18} className="text-blue-500" /> Sprint Actual
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeSprint ? (
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-xl font-bold text-white">{activeSprint.title}</h3>
                <p className="text-sm text-gray-400">{activeSprint.goal}</p>
              </div>
              <div className="text-right">
                <span className="text-xs text-gray-500 font-mono">Fin: {activeSprint.endDate}</span>
              </div>
            </div>
          ) : <p className="text-gray-500 italic">No hay sprint activo.</p>}
        </CardContent>
      </Card>
    </div>
  );
}

function StatCard({ title, value, icon, color }: any) {
  return (
    <div className={`p-6 rounded-2xl border border-gray-800 ${color}`}>
      <div className="flex justify-between items-center text-white">
        <div><p className="text-[10px] font-bold text-gray-500 uppercase">{title}</p><h2 className="text-3xl font-bold mt-1">{value}</h2></div>
        <div className="p-3 bg-black/20 rounded-xl">{icon}</div>
      </div>
    </div>
  );
}