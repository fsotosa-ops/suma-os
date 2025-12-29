import { useProjectData } from '@/app/context/ProjectProvider';
import { Ticket, RevOpsLever } from '@/app/execution/types';

// Tipos para el análisis
type TimeRange = '1M' | '3M' | '6M' | '1Y' | 'ALL';

export const useProjectAdapter = () => {
  const { tickets, levers, objectives, metrics, updateTicket } = useProjectData();

  // 1. Calculadora de Impacto RevOps (El Score 0-100)
  const calculateImpactScore = (lever: RevOpsLever, linkedTickets: Ticket[]) => {
    // A. Progreso Técnico (Input)
    const totalPoints = linkedTickets.reduce((acc, t) => acc + t.points, 0);
    const completedPoints = linkedTickets.filter(t => t.status === 'DONE').reduce((acc, t) => acc + t.points, 0);
    const techProgress = totalPoints > 0 ? completedPoints / totalPoints : 0;

    // B. Progreso KPI (Output) - Simplificado: ¿Qué tan cerca estamos de la meta?
    // Nota: Para KPIs donde "menos es mejor" (ej: Churn), la lógica se invierte.
    const isMinimization = lever.kpiCurrent < lever.kpiTarget; // Detección simple (si target > current asumimos maximización)
    const kpiProgress = isMinimization 
       ? 1 // Caso complejo simplificado
       : Math.min(lever.kpiCurrent / lever.kpiTarget, 1);

    // C. El Algoritmo:
    // Si hay mucho esfuerzo técnico (High Input) y poco resultado (Low Output) -> Score Bajo.
    // Si hay poco esfuerzo y mucho resultado -> Score Alto (Eficiencia).
    
    // Peso: 70% Resultado de Negocio, 30% Ejecución Técnica
    const score = Math.round((kpiProgress * 70) + (techProgress * 30));
    
    return {
        score, // 0 - 100
        techProgress: Math.round(techProgress * 100),
        investment: totalPoints
    };
  };

  // 2. Enriquecer Palancas para la Vista
  const getEnrichedLevers = (range: TimeRange = '6M') => {
    return levers.map(lever => {
      const linkedTickets = tickets.filter(t => t.leverId === lever.id);
      const analytics = calculateImpactScore(lever, linkedTickets);
      
      // Filtramos la historia según el rango (Lógica simple de slice)
      const limit = range === '1M' ? 1 : range === '3M' ? 3 : range === '6M' ? 6 : 12;
      const historyView = lever.history.slice(-limit); 

      // Calculamos variaciones (MoM, QoQ)
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
      assignLever: (ticketId: string, leverId: string) => updateTicket(ticketId, { leverId })
    },
    strategyView: {
      objectives,
      // Exponemos una función para obtener palancas filtradas por tiempo
      getLeversByRange: getEnrichedLevers, 
    }
  };
};