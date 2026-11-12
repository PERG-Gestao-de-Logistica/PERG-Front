export type Alerta = {
  id: string;
  severidade: "Crítico" | "Alto" | "Médio" | "Baixo";
  titulo: string;
  origem: string;
  horario: string;
  status: string;
};

export type Incidentes= {
  id: string;
  severidade_incidentes: "Abertos" | "Criticos" | "Médios" | "Baixos" | "Altos";
  numero_casos: string;
};

export const corPorIndicador = {
  Abertos: "abertos",
  Criticos: "criticos",
  Altos: "altos",
  Médios: "medios",
  Baixos: "baixos",
};

export type Detalhes = {
  id: string;
  severidade: "CRÍTICO" | "Alto" | "Médio" | "Baixo";
  Descricao: string;
  horario1: string;
  acontecimento1: string;
  horario2: string;
  acontecimento2: string;
  horario3: string;
  acontecimento3: string;
  horario4: string;
  acontecimento4: string;
};