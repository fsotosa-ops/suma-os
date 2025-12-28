import { Target, ArrowUpRight, Clock, CheckCircle2, AlertCircle } from 'lucide-react';

export default function Home() {
  return (
    <div className="space-y-8">
      {/* 1. Sección de Bienvenida e Impacto */}
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight text-white">
          Hola, Pablo 👋
        </h1>
        <p className="text-slate-400 text-lg">
          Aquí está el estado de la integración del TMS y la estrategia tecnológica de Webcarga.
        </p>
      </div>

      {/* 2. KPIs de Alto Nivel (Bento Grid) */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1: Avance del MVP */}
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-indigo-500/10 rounded-lg">
              <Target className="text-indigo-400" size={24} />
            </div>
            <span className="text-xs font-medium bg-emerald-500/10 text-emerald-500 px-2 py-1 rounded-full border border-emerald-500/20">
              On Track
            </span>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">45%</h3>
            <p className="text-sm text-slate-500">Avance Global MVP TMS</p>
          </div>
          <div className="mt-4 w-full bg-slate-800 h-1.5 rounded-full overflow-hidden">
            <div className="bg-indigo-500 h-full w-[45%]" />
          </div>
        </div>

        {/* Card 2: Sprints Activos */}
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Clock className="text-blue-400" size={24} />
            </div>
            <span className="text-xs font-medium text-slate-400">Sprint 2/6</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">12 días</h3>
            <p className="text-sm text-slate-500">Para el próximo entregable</p>
          </div>
        </div>

        {/* Card 3: Salud del Código (Deuda Técnica) */}
        <div className="bg-slate-900/50 border border-slate-800 p-6 rounded-2xl hover:border-slate-700 transition-colors">
          <div className="flex justify-between items-start mb-4">
            <div className="p-2 bg-emerald-500/10 rounded-lg">
              <CheckCircle2 className="text-emerald-400" size={24} />
            </div>
            <span className="text-xs font-medium text-slate-400">Estable</span>
          </div>
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-white">98%</h3>
            <p className="text-sm text-slate-500">Uptime & Estabilidad</p>
          </div>
        </div>
      </div>

      {/* 3. Objetivos Estratégicos (OKRs) */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-white flex items-center gap-2">
          <ArrowUpRight size={20} className="text-slate-500" />
          Objetivos del Trimestre (Q1)
        </h2>
        
        <div className="grid gap-4">
          {/* OKR 1 */}
          <div className="group bg-slate-900/30 border border-slate-800 p-4 rounded-xl hover:bg-slate-900/50 transition-all cursor-pointer">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="w-1 h-12 bg-indigo-500 rounded-full" />
                <div>
                  <h3 className="font-medium text-slate-200 group-hover:text-white">
                    Reducir tiempos de gestión operativa
                  </h3>
                  <p className="text-sm text-slate-500">Integración automatizada del TMS</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-slate-200">60%</span>
                <p className="text-xs text-slate-500">Completado</p>
              </div>
            </div>
          </div>

          {/* OKR 2 */}
          <div className="group bg-slate-900/30 border border-slate-800 p-4 rounded-xl hover:bg-slate-900/50 transition-all cursor-pointer">
            <div className="flex justify-between items-center">
              <div className="flex gap-4 items-center">
                <div className="w-1 h-12 bg-slate-700 rounded-full" />
                <div>
                  <h3 className="font-medium text-slate-200 group-hover:text-white">
                    Infraestructura Escalable
                  </h3>
                  <p className="text-sm text-slate-500">Migración y Dockerización de servicios</p>
                </div>
              </div>
              <div className="text-right">
                <span className="text-2xl font-bold text-slate-200">30%</span>
                <p className="text-xs text-slate-500">Completado</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* 4. Alerta de CTO (Opcional, para generar conversación) */}
      <div className="bg-orange-500/10 border border-orange-500/20 p-4 rounded-xl flex items-start gap-3">
        <AlertCircle className="text-orange-500 shrink-0 mt-0.5" size={20} />
        <div>
          <h4 className="text-sm font-medium text-orange-400">Nota del CTO</h4>
          <p className="text-sm text-orange-500/80 mt-1">
            Esta semana estamos priorizando la refactorización del módulo de usuarios para asegurar la seguridad antes del lanzamiento beta.
          </p>
        </div>
      </div>
    </div>
  );
}