import { api } from "./api";

export interface OcorrenciaLoja {
  id: string;
  tipo: string;
  status: string;
  descricao: string | null;
  fotoChave: string | null;
  pedidoId: string;
  numeroPedido: number;
  clienteNome: string;
  rotaId: string;
  entregadorNome: string | null;
  registradaEm: string;
}

export const ocorrenciasService = {
  listar: (abertas = true) => api.get<OcorrenciaLoja[]>(`/api/Ocorrencias?abertas=${abertas}`),
  // Reentregar: o pedido volta para Novo e entra na próxima roteirização. Cancelar: encerra o pedido.
  resolver: (id: string, acao: "Reentregar" | "Cancelar", observacao?: string) =>
    api.post<{ mensagem: string }>(`/api/Ocorrencias/${id}/resolver`, { acao, observacao }),
};
