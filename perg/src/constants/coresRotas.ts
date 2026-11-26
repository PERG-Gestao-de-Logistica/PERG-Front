export const CORES_ROTAS = [
  "#e8650e", 
  "#7250f8", 
  "#0ca8f0", 
  "#059e91", 
  "#ffb700", 
  "#09be37", 
  "#d00f9d", 
  "#ec3f81", 
] as const;

export function obterCorRota(indice: number): string {
  return CORES_ROTAS[indice % CORES_ROTAS.length];
}