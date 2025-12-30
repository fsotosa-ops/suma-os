'use client';

import React, { useState } from 'react';
// 1. CORRECCIÓN DE RUTA (Import dinámico)
import { useStrategy } from '@/app/[projectId]/strategy/context/StrategyProvider';
import { LeverCard } from './LeverCard';
import { Search, Filter, SlidersHorizontal } from 'lucide-react';

export const LeverMonitor = () => {
  const { levers } = useStrategy();
  const [filter, setFilter] = useState('ALL');
  const [searchTerm, setSearchTerm] = useState('');

  // Lógica de filtrado
  const filteredLevers = levers.filter(lever => {
    const matchesSearch = lever.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = filter === 'ALL' || lever.type === filter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6">
      
      {/* Toolbar de Filtros */}
      <div className="flex flex-col sm:flex-row justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
          <input 
            type="text" 
            placeholder="Buscar palanca o KPI..." 
            className="w-full bg-[#151921] border border-zinc-800 rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:border-blue-500 outline-none transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex items-center gap-2">
           <div className="bg-[#151921] border border-zinc-800 rounded-xl p-1 flex items-center">
              <FilterButton label="Todos" value="ALL" active={filter === 'ALL'} onClick={setFilter} />
              <FilterButton label="Growth" value="GROWTH" active={filter === 'GROWTH'} onClick={setFilter} />
              <FilterButton label="Retention" value="RETENTION" active={filter === 'RETENTION'} onClick={setFilter} />
              <FilterButton label="Efficiency" value="EFFICIENCY" active={filter === 'EFFICIENCY'} onClick={setFilter} />
           </div>
           <button className="p-2.5 bg-[#151921] border border-zinc-800 rounded-xl text-zinc-400 hover:text-white hover:border-zinc-700 transition-all">
              <SlidersHorizontal size={18} />
           </button>
        </div>
      </div>

      {/* Grid de Tarjetas */}
      {filteredLevers.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {filteredLevers.map(lever => (
            // 2. CORRECCIÓN: Ya no pasamos "onLaunchTest", LeverCard se encarga solo.
            <LeverCard 
                key={lever.id} 
                lever={lever} 
            />
          ))}
        </div>
      ) : (
        <div className="h-64 flex flex-col items-center justify-center border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
            <p className="text-zinc-500 font-medium">No se encontraron palancas activas</p>
            <p className="text-xs text-zinc-600 mt-1">Intenta ajustar los filtros de búsqueda</p>
        </div>
      )}
    </div>
  );
};

// Componente auxiliar para botones de filtro
const FilterButton = ({ label, value, active, onClick }: any) => (
  <button 
    onClick={() => onClick(value)}
    className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all ${active ? 'bg-zinc-800 text-white shadow-sm' : 'text-zinc-500 hover:text-zinc-300'}`}
  >
    {label}
  </button>
);