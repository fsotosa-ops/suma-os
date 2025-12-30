import { useStrategy } from '../context/StrategyProvider';
import { RevOpsLever } from '@/app/execution/types';

// Nota: Para calcular el progreso técnico real (que viene de tickets), 
// necesitarás pasar los tickets como argumento o crear un hook de "Bridge" más adelante.
// Por ahora, asumamos que el progreso técnico viene simulado o calculado dentro de la palanca.

export const useStrategyAnalytics = () => {
  const { levers, experiments } = useStrategy();

  const getEnrichedLever = (leverId: string) => {
    const lever = levers.find(l => l.id === leverId);
    if (!lever) return null;

    // Calcular Impact Score
    // Lógica simplificada: si kpiCurrent se acerca a kpiTarget
    const gap = Math.abs(lever.kpiTarget - lever.kpiCurrent);
    const progress = Math.max(0, 100 - (gap * 2)); // Algoritmo dummy

    // Experimentos activos
    const activeExperiments = experiments.filter(e => e.leverId === leverId && e.status === 'RUNNING');

    return {
      ...lever,
      analytics: {
        score: Math.round(progress),
        techProgress: 65, // Esto debería venir de ExecutionProvider en el futuro
        activeExperimentsCount: activeExperiments.length
      }
    };
  };

  return {
    getEnrichedLever
  };
};