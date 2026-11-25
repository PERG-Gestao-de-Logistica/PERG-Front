export type StatusRota = "Proposta" | "Ofertada" | "Aceita" | "EmAndamento" | "Concluida" | "Cancelada";
export type TipoVeiculo = "Bike" | "Moto" | "Carro" | "Van" | "Caminhao";
export type TipoOcorrencia = "ClienteAusente" | "EnderecoNaoEncontrado" | "Recusado" | "Avaria" | "Outro";

export interface RotaHoje {
  id: string;
  codigo: string;
  entregadorNome: string | null;
  paradas: number;
  regiao: string | null;
  tipoVeiculo: TipoVeiculo;
  status: StatusRota;
  progresso: number;
}

export interface OcorrenciaAberta {
  id: string;
  numeroPedido: number;
  clienteNome: string;
  tipo: TipoOcorrencia;
  entregadorNome: string | null;
  registradaEm: string;
}

// GET /api/Painel/resumo
export interface ResumoPainel {
  primeirosPassos: {
    contaCriada: boolean;
    pontoColetaCadastrado: boolean;
    entregadorFavorito: boolean;
    pedidoCriado: boolean;
  };
  pedidosHoje: number;
  rotasAtivas: number;
  rotasEmAndamento: number;
  noPrazoPercentual: number | null;
  kmRodados: number;
  rotasHoje: RotaHoje[];
  ocorrenciasAbertas: OcorrenciaAberta[];
}
