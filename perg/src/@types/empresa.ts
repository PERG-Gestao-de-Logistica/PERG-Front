import type { SegmentoEmpresa } from "@/@types/autenticacao";
import type { TipoVeiculo } from "@/@types/painel";

// GET /api/Empresas/eu
export interface ConfiguracaoEmpresa {
  id: string;
  cnpj: string;
  razaoSocial: string;
  nomeFantasia: string;
  email: string;
  telefone: string | null;
  segmento: SegmentoEmpresa;
  faixaPedidosDia: string;
  entregaMesmoDia: boolean;
  entregaAgendada: boolean;
  retiradaLoja: boolean;
  usaCarro: boolean;
  usaMoto: boolean;
  usaVanCaminhao: boolean;
  somenteFavoritos: boolean;
  tempoOfertaFavoritosS: number;
  metaNoPrazoPct: number;
}

// PUT /api/Empresas/eu (o CNPJ não muda)
export type AtualizarEmpresa = Omit<ConfiguracaoEmpresa, "id" | "cnpj" | "telefone"> & { telefone?: string };

export const FAIXAS_PEDIDOS_DIA = ["50 a 100", "100 a 500", "500 a 1.000", "Acima de 1.000"];

// GET /api/Empresas/eu/valores-entregador: quanto o entregador recebe, por tipo de veículo
export interface ValorVeiculo {
  tipo: TipoVeiculo;
  baseRota: number;
  porKm: number;
  porEntrega: number;
  personalizado: boolean;
  padraoBaseRota: number;
  padraoPorKm: number;
  padraoPorEntrega: number;
}
