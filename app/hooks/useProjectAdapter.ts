// app/hooks/useProjectAdapter.ts
import { useExecution } from '@/app/[projectId]/execution/context/ExecutionProvider'; // <--- Ruta actualizada
import { useStrategy } from '@/app/[projectId]/strategy/context/StrategyProvider';   // <--- Ruta actualizada
import { Ticket, RevOpsLever } from '@/app/types';

export const useProjectAdapter = () => {
  const { tickets } = useExecution();
  const { levers } = useStrategy();

  // Ejemplo: Conectar Tickets con Levers (si tienes lógica de negocio cruzada)
  const getTicketsForLever = (leverId: string): Ticket[] => {
    return tickets.filter(t => t.leverId === leverId);
  };

  const getLeverHealth = (leverId: string): 'healthy' | 'at-risk' => {
    const lever = levers.find(l => l.id === leverId);
    if (!lever) return 'at-risk';
    return lever.kpiCurrent >= lever.kpiTarget ? 'healthy' : 'at-risk';
  };

  return {
    getTicketsForLever,
    getLeverHealth
  };
};