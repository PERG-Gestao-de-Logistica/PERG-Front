import { api } from "./api";

export interface NovoPedido {
  modalidade: "MesmoDia" | "Agendada" | "Retirada";
  clienteNome: string;
  clienteTelefone?: string;
  clienteEmail?: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento?: string;
  bairro: string;
  cidade: string;
  uf: string;
  janelaInicio?: string;
  janelaFim?: string;
  pesoKg: number;
  volumes: number;
  observacoes?: string;
}

export const pedidosService = {
  // Sem origemId: a API usa o ponto de coleta padrão da loja
  criar: (pedido: NovoPedido) =>
    api.post<{ mensagem: string; pedido: { id: string; numeroPedido: number } }>("/api/Pedidos", pedido),

  // Quantos pedidos existem num status (ex.: "Novo" = prontos para roteirizar)
  contar: (status: string) =>
    api.get<{ total: number }>(`/api/Pedidos?status=${status}&tamanhoPagina=1`).then((r) => r.total),
};

// Avisa a tela aberta (ex.: visão geral) que um pedido foi criado
export const EVENTO_PEDIDO_CRIADO = "perg:pedido-criado";
