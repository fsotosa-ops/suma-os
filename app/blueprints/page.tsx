import { 
    Search, FileText, Plus, Book, 
    ChevronRight, Star, Clock, FolderOpen,
    MoreHorizontal
  } from 'lucide-react';
  
  export default function BlueprintsPage() {
    return (
      <div className="flex h-[calc(100vh-8rem)] gap-6">
        
        {/* 1. Sidebar de Navegación de la Wiki (Izquierda) */}
        <div className="w-64 shrink-0 flex flex-col gap-6 border-r border-slate-800 pr-6">
          
          <button className="flex items-center gap-2 w-full bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-2 rounded-lg text-sm font-medium transition-all group">
            <Plus size={16} />
            <span>Nueva Página</span>
          </button>
  
          {/* Árbol de Documentos */}
          <div className="space-y-4">
            
            {/* Sección Favoritos */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Favoritos</h3>
              <div className="space-y-0.5">
                <WikiNavItem icon={Star} label="Arquitectura Core" color="text-yellow-500" />
                <WikiNavItem icon={Star} label="API Endpoints" color="text-yellow-500" />
              </div>
            </div>
  
            {/* Sección Espacios de Trabajo */}
            <div>
              <h3 className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 px-2">Espacios</h3>
              <div className="space-y-0.5">
                <WikiNavItem icon={Book} label="Backend & Infra" />
                <WikiNavItem icon={Book} label="Frontend Design System" />
                <WikiNavItem icon={Book} label="Onboarding Devs" />
                <WikiNavItem icon={Book} label="Manual de Procesos" />
              </div>
            </div>
          </div>
        </div>
  
        {/* 2. Área Principal de Contenido (Derecha) */}
        <div className="flex-1 flex flex-col gap-8 overflow-y-auto pr-2">
          
          {/* Header con Búsqueda */}
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-white">Documentación & Wiki</h1>
            <div className="relative w-96">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Buscar en blueprints (cmd+k)..." 
                className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-10 pr-4 py-2 text-sm text-slate-300 focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-slate-600"
              />
            </div>
          </div>
  
          {/* Sección: Visto Recientemente */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-400">
              <Clock size={16} /> Recientes
            </h2>
            <div className="grid grid-cols-3 gap-4">
              <DocCard title="Diagrama de Despliegue AWS" date="Hace 2 horas" author="Pablo A." type="doc" />
              <DocCard title="Minuta Reunión Sprint 2" date="Hace 5 horas" author="Tú" type="sheet" />
              <DocCard title="Credenciales Entorno Staging" date="Ayer" author="DevOps" type="wiki" />
            </div>
          </div>
  
          {/* Sección: Wikis y Recursos */}
          <div className="space-y-4">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-slate-400">
              <FolderOpen size={16} /> Colecciones
            </h2>
            <div className="border border-slate-800 rounded-xl bg-slate-900/30 overflow-hidden">
              <WikiRow title="Arquitectura del Sistema" count="12 docs" updated="2 days ago" />
              <WikiRow title="Guías de Desarrollo (How-to)" count="8 docs" updated="1 week ago" />
              <WikiRow title="Recursos Gráficos & Assets" count="24 files" updated="3 days ago" />
              <WikiRow title="Políticas de Seguridad" count="3 docs" updated="1 month ago" />
            </div>
          </div>
  
        </div>
      </div>
    );
  }
  
  // --- Componentes UI para esta página ---
  
  function WikiNavItem({ icon: Icon, label, color = "text-slate-400" }: { icon: any, label: string, color?: string }) {
    return (
      <div className="flex items-center gap-2 px-2 py-1.5 rounded-md hover:bg-slate-800/50 cursor-pointer text-slate-400 hover:text-slate-200 transition-colors group">
        <Icon size={16} className={color} />
        <span className="text-sm font-medium">{label}</span>
        <ChevronRight size={12} className="ml-auto opacity-0 group-hover:opacity-100 text-slate-600" />
      </div>
    );
  }
  
  function DocCard({ title, date, author, type }: { title: string, date: string, author: string, type: string }) {
    return (
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-indigo-500/30 hover:bg-slate-900/80 cursor-pointer transition-all group">
        <div className="flex justify-between items-start mb-4">
          <FileText className="text-slate-500 group-hover:text-indigo-400 transition-colors" size={24} />
          <button className="text-slate-600 hover:text-white"><MoreHorizontal size={16} /></button>
        </div>
        <h3 className="font-medium text-slate-200 truncate group-hover:text-white transition-colors">{title}</h3>
        <div className="flex items-center gap-2 mt-2 text-xs text-slate-500">
          <span>{author}</span>
          <span>•</span>
          <span>{date}</span>
        </div>
      </div>
    );
  }
  
  function WikiRow({ title, count, updated }: { title: string, count: string, updated: string }) {
    return (
      <div className="flex items-center justify-between p-4 border-b border-slate-800 last:border-0 hover:bg-slate-800/30 transition-colors cursor-pointer group">
        <div className="flex items-center gap-4">
          <div className="p-2 bg-slate-800 rounded-lg text-slate-400 group-hover:text-white group-hover:bg-indigo-500/20 group-hover:text-indigo-400 transition-all">
            <Book size={18} />
          </div>
          <div>
            <h4 className="text-sm font-medium text-slate-200">{title}</h4>
            <p className="text-xs text-slate-500">{count} • Wiki interna</p>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-xs text-slate-600">{updated}</span>
          <ChevronRight size={16} className="text-slate-700 group-hover:text-slate-400" />
        </div>
      </div>
    );
  }