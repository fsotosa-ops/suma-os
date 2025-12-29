import { useProjectData } from '@/app/context/ProjectProvider';

export const useProjectAdapter = () => {
  const { tickets, metrics, objectives, addObjective, sprintName } = useProjectData();

  // 1. Detectamos problemas técnicos graves
  const criticalBugs = tickets.filter(t => t.type === 'BUG' && t.status === 'BLOCKED').length;
  const highErrorRate = metrics.some(m => m.name === 'Error Rate' && m.value > 2); // Umbral de ejemplo

  // 2. "Enriquecemos" los OKRs con inteligencia técnica
  const smartObjectives = objectives.map(obj => {
    // Lógica de Negocio: 
    // Si hay bugs críticos, TODOS los objetivos vinculados a tecnología se ponen en riesgo automáticamente.
    let calculatedStatus = obj.status;
    let alertMessage = null;

    if (criticalBugs > 0 || highErrorRate) {
      calculatedStatus = 'At Risk';
      alertMessage = `${criticalBugs} bloqueos técnicos detectados impactando este objetivo.`;
    }

    return {
      ...obj,
      status: calculatedStatus,
      alertMessage
    };
  });

  // 3. Resumen Global para el Header de Estrategia
  const strategyHealth = criticalBugs === 0 ? 'Saludable' : 'Atención Requerida';

  return {
    strategyView: {
      objectives: smartObjectives,
      globalHealth: strategyHealth,
      addObjective // Exportamos la función para usarla en la UI
    },
    technicalView: {
      // (Mantenemos lo que ya tenías)
      activeSprint: sprintName,
      tickets,
      metrics
    }
  };
};