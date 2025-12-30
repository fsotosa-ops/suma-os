// app/lib/statistics.ts

export interface ABTestResult {
    winner: 'CONTROL' | 'VARIANT' | 'INCONCLUSIVE';
    confidence: number;
    lift: number; // Porcentaje de mejora
    isSignificant: boolean;
  }
  
  export const calculateABTest = (
    controlVisits: number,
    controlConversions: number,
    variantVisits: number,
    variantConversions: number
  ): ABTestResult => {
    // Evitar división por cero
    if (controlVisits === 0 || variantVisits === 0) {
      return { winner: 'INCONCLUSIVE', confidence: 0, lift: 0, isSignificant: false };
    }
  
    const pControl = controlConversions / controlVisits;
    const pVariant = variantConversions / variantVisits;
  
    // Error Estándar (Standard Error)
    const seControl = Math.sqrt((pControl * (1 - pControl)) / controlVisits);
    const seVariant = Math.sqrt((pVariant * (1 - pVariant)) / variantVisits);
    const seDiff = Math.sqrt(Math.pow(seControl, 2) + Math.pow(seVariant, 2));
  
    // Z-Score
    const zScore = (pVariant - pControl) / seDiff;
  
    // Calcular confianza (aproximación normal acumulativa)
    // Convertimos Z a probabilidad (Confidence)
    const confidence = (0.5 * (1 + erf(Math.abs(zScore) / Math.sqrt(2)))) * 100;
  
    // Calcular Lift (Mejora relativa)
    const lift = ((pVariant - pControl) / pControl) * 100;
  
    // Determinar ganador (Usando 95% de confianza como umbral estándar)
    const isSignificant = confidence >= 95;
    let winner: 'CONTROL' | 'VARIANT' | 'INCONCLUSIVE' = 'INCONCLUSIVE';
  
    if (isSignificant) {
      if (lift > 0) winner = 'VARIANT';
      else if (lift < 0) winner = 'CONTROL';
    }
  
    return {
      winner,
      confidence: Number(confidence.toFixed(2)),
      lift: Number(lift.toFixed(2)),
      isSignificant
    };
  };
  
  // Función de error de aproximación (necesaria para Z-Score -> Probabilidad)
  // Esta es una implementación estándar de la función de error de Gauss
  function erf(x: number): number {
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;
  
    const sign = (x < 0) ? -1 : 1;
    x = Math.abs(x);
  
    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);
  
    return sign * y;
  }