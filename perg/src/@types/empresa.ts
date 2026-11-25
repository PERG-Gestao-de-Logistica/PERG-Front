import type { SegmentoEmpresa } from "@/@types/autenticacao";

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
