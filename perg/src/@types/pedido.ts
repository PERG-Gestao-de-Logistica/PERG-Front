export type StatusPedido = "Novo" | "Roteirizado" | "EmRota" | "Entregue" | "Ocorrencia" | "Cancelado";
export type ModalidadePedido = "MesmoDia" | "Agendada" | "Retirada";
export type StatusGeocodificacao = "Pendente" | "Ok" | "Revisar" | "Falhou";

// Abas da tela (parâmetro situacao da API; "todos" = sem filtro)
export type SituacaoPedido =
  | "todos"
  | "novos"
  | "prontos"
  | "problemas"
  | "emRota"
  | "entregues"
  | "ocorrencias"
  | "cancelados";

// Item de GET /api/Pedidos
export interface PedidoResumo {
  id: string;
  numeroPedido: number;
  numeroExterno: string | null;
  status: StatusPedido;
  modalidade: ModalidadePedido;
  clienteNome: string;
  logradouro: string | null;
  numero: string | null;
  bairro: string | null;
  cidade: string | null;
  janelaInicio: string | null;
  janelaFim: string | null;
  volumes: number;
  pesoKg: number;
  geocodificacaoStatus: StatusGeocodificacao;
  criadoEm: string;
  // Diagnóstico: pronto para a roteirização de hoje, o que impede e avisos
  pronto: boolean;
  problemas: string[];
  avisos: string[];
}

export interface ListaPedidos {
  itens: PedidoResumo[];
  total: number;
  pagina: number;
  tamanhoPagina: number;
}

// GET /api/Pedidos/contagem
export type ContagemPedidos = Record<Exclude<SituacaoPedido, "todos">, number> & { todos: number };

export interface EventoPedido {
  tipoEvento: string;
  statusNovo: StatusPedido | null;
  descricao: string;
  autorTipo: string;
  ocorridoEm: string;
}

// GET /api/Pedidos/{id}
export interface PedidoDetalhe extends Omit<PedidoResumo, "numero"> {
  canal: string;
  origemId: string;
  origemNome: string;
  clienteTelefone: string | null;
  clienteEmail: string | null;
  cep: string | null;
  numero: string | null;
  complemento: string | null;
  uf: string | null;
  referencia: string | null;
  latitude: number | null;
  longitude: number | null;
  observacoes: string | null;
  tokenRastreamento: string;
  entregueEm: string | null;
  atualizadoEm: string;
  eventos: EventoPedido[];
}
