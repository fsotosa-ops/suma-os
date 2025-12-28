import { Target, TrendingUp, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function StrategyPage() {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-white">Estrategia & OKRs</h1>
          <p className="text-slate-400">Alineación Q1 2025 - Integración TMS</p>
        </div>
        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg text-sm font-medium transition-colors">
          + Nuevo Objetivo
        </button>
      </div>

      {/* Objetivo 1: Expandido */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden">
        <div className="p-6 border-b border-slate-800 flex justify-between items-start">
          <div className="flex gap-4">
            <div className="p-3 bg-indigo-500/10 rounded-lg h-fit">
              <Target className="text-indigo-400" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Reducir tiempos de gestión operativa</h3>
              <p className="text-slate-400 text-sm mt-1">
                El TMS debe eliminar la carga manual de datos en un 80% para marzo.
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
              <TrendingUp size={12} /> On Track
            </span>
            <div className="mt-2 text-2xl font-bold text-slate-200">60%</div>
          </div>
        </div>
        
        {/* Key Results (Hijos) */}
        <div className="bg-slate-950/30 p-4 space-y-3">
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-emerald-500" size={18} />
              <span className="text-sm text-slate-300">Sincronización automática de órdenes (API)</span>
            </div>
            <span className="text-xs font-mono text-slate-500">DONE</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg hover:bg-white/5 transition-colors">
            <div className="flex items-center gap-3">
              <div className="w-4 h-4 rounded-full border-2 border-slate-600" />
              <span className="text-sm text-slate-300">Dashboard de reportes en tiempo real</span>
            </div>
            <span className="text-xs font-mono text-indigo-400">IN PROGRESS</span>
          </div>
        </div>
      </div>

      {/* Objetivo 2: En Riesgo */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-xl overflow-hidden opacity-90">
        <div className="p-6 flex justify-between items-start">
          <div className="flex gap-4">
            <div className="p-3 bg-orange-500/10 rounded-lg h-fit">
              <AlertTriangle className="text-orange-400" size={24} />
            </div>
            <div>
              <h3 className="text-lg font-semibold text-white">Infraestructura Escalable</h3>
              <p className="text-slate-400 text-sm mt-1">
                Preparar arquitectura para soportar 10k transacciones/min.
              </p>
            </div>
          </div>
          <div className="text-right">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-orange-500/10 text-orange-500 border border-orange-500/20">
              At Risk
            </span>
            <div className="mt-2 text-2xl font-bold text-slate-200">30%</div>
          </div>
        </div>
      </div>
    </div>
  );
}