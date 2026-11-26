import { api } from "./api";

export interface OcorrenciaLoja {
  id: string;
  tipo: string;
  status: string;
  numeroPedido: number;
  clienteNome: string;
  rotaId: string;
  entregadorNome: string | null;
  registradaEm: string;
}

export const ocorrenciasService = {
  listar: (abertas = true) => api.get<OcorrenciaLoja[]>(`/api/Ocorrencias?abertas=${abertas}`),
};
