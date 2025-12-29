// app/hooks/useProjectAdapter.ts

import { useExecution } from '@/app/execution/context/ExecutionProvider';
import { useStrategy } from '@/app/strategy/context/StrategyProvider';
import { Ticket, RevOpsLever } from '@/app/types';

// Tipos para el análisis
type TimeRange = '1M' | '3M' | '6M' | '1Y' | 'ALL';

export const useProjectAdapter = () => {
  // CORRECCIÓN AQUÍ: Desestructuramos 'actions' para sacar updateTicket
  const { tickets, actions } = useExecution();
  const { levers, objectives } = useStrategy();

  // Metrics no existe en ExecutionProvider, así que lo simulamos vacío por ahora
  // o lo eliminamos si no es crítico.
  const metrics: any[] = []; 

  // 1. Calculadora de Impacto RevOps
  const calculateImpactScore = (lever: RevOpsLever, linkedTickets: Ticket[]) => {
    const totalPoints = linkedTickets.reduce((acc, t) => acc + t.points, 0);
    const completedPoints = linkedTickets.filter(t => t.status === 'DONE').reduce((acc, t) => acc + t.points, 0);
    const techProgress = totalPoints > 0 ? completedPoints / totalPoints : 0;

    const isMinimization = lever.kpiCurrent < lever.kpiTarget; 
    const kpiProgress = isMinimization 
       ? 1 
       : Math.min(lever.kpiCurrent / lever.kpiTarget, 1);

    const score = Math.round((kpiProgress * 70) + (techProgress * 30));
    
    return {
        score, 
        techProgress: Math.round(techProgress * 100),
        investment: totalPoints
    };
  };

  // 2. Enriquecer Palancas
  const getEnrichedLevers = (range: TimeRange = '6M') => {
    return levers.map(lever => {
      const linkedTickets = tickets.filter(t => t.leverId === lever.id);
      const analytics = calculateImpactScore(lever, linkedTickets);
      
      const limit = range === '1M' ? 1 : range === '3M' ? 3 : range === '6M' ? 6 : 12;
      const historyView = lever.history.slice(-limit); 

      const lastVal = historyView[historyView.length - 1]?.value || 0;
      const prevVal = historyView[historyView.length - 2]?.value || lastVal;
      const trend = lastVal - prevVal;
      
      return {
        ...lever,
        analytics,
        historyView,
        trend: {
            value: trend,
            direction: trend > 0 ? 'up' : trend < 0 ? 'down' : 'neutral',
            percentage: prevVal > 0 ? ((trend / prevVal) * 100).toFixed(1) : '0'
        }
      };
    });
  };

  return {
    technicalView: {
      tickets,
      metrics,
      // CORRECCIÓN: Usamos actions.updateTicket
      assignLever: (ticketId: string, leverId: string) => actions.updateTicket(ticketId, { leverId })
    },
    strategyView: {
      objectives,
      getLeversByRange: getEnrichedLevers, 
    }
  };
};