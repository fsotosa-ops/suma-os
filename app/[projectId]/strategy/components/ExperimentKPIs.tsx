'use client';
import { Card } from "@/components/ui/card";
import { Clock, FlaskConical, CheckCircle2, ArrowUpRight } from 'lucide-react';

interface Props {
    activeTests: number;
    totalExperiments: number;
    winRate: number;
}

export const ExperimentKPIs = ({ activeTests, totalExperiments, winRate }: Props) => {
  return (
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <KpiCard label="Tests Activos" value={activeTests} icon={<Clock className="text-blue-500" />} />
          <KpiCard label="Total Lanzados" value={totalExperiments} icon={<FlaskConical className="text-zinc-500" />} />
          <KpiCard label="Win Rate" value={`${winRate}%`} icon={<CheckCircle2 className="text-emerald-500" />} />
          <KpiCard label="Impacto Acumulado" value="+12.4%" icon={<ArrowUpRight className="text-purple-500" />} />
      </div>
  );
};

function KpiCard({ label, value, icon }: any) {
    return (
        <Card className="bg-zinc-900/50 border-zinc-800 p-4 flex items-center justify-between">
            <div>
                <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-wider">{label}</p>
                <p className="text-2xl font-bold text-white mt-1">{value}</p>
            </div>
            <div className="p-2 bg-black/40 rounded-lg">{icon}</div>
        </Card>
    );
}