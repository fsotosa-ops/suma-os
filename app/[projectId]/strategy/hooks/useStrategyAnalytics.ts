import { useStrategy } from '../context/StrategyProvider';
// CORRECCIÓN: Ruta al archivo central de tipos
import { RevOpsLever } from '@/app/types';

export const useStrategyAnalytics = () => {
  const { levers, experiments } = useStrategy();

  const getEnrichedLever = (leverId: string) => {
    const lever = levers.find(l => l.id === leverId);
    if (!lever) return null;

    const gap = Math.abs(lever.kpiTarget - lever.kpiCurrent);
    const progress = Math.max(0, 100 - (gap * 2));

    const activeExperiments = experiments.filter(e => e.leverId === leverId && e.status === 'RUNNING');

    return {
      ...lever,
      analytics: {
        score: Math.round(progress),
        techProgress: 65, 
        activeExperimentsCount: activeExperiments.length
      }
    };
  };

  return {
    getEnrichedLever
  };
};