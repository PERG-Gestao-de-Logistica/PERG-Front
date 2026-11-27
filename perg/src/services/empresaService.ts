import { api } from "./api";
import type { AtualizarEmpresa, ConfiguracaoEmpresa, ValorVeiculo } from "@/@types/empresa";
import type { TipoVeiculo } from "@/@types/painel";

export const empresaService = {
  obter: () => api.get<ConfiguracaoEmpresa>("/api/Empresas/eu"),

  // Só admin (a API responde 403 para funcionário)
  atualizar: (dados: AtualizarEmpresa) =>
    api.put<{ mensagem: string; empresa: ConfiguracaoEmpresa }>("/api/Empresas/eu", dados),

  // Valores pagos aos entregadores (tabela da loja ou a padrão do Perg)
  valoresEntregador: () => api.get<ValorVeiculo[]>("/api/Empresas/eu/valores-entregador"),
  salvarValoresEntregador: (valores: { tipo: TipoVeiculo; baseRota: number; porKm: number; porEntrega: number }[]) =>
    api.put<{ mensagem: string; valores: ValorVeiculo[] }>("/api/Empresas/eu/valores-entregador", { valores }),
  restaurarValoresEntregador: () =>
    api.delete<{ mensagem: string; valores: ValorVeiculo[] }>("/api/Empresas/eu/valores-entregador"),
};