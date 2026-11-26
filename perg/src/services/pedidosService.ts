import { api } from "./api";
import type { ContagemPedidos, ListaPedidos, PedidoDetalhe, SituacaoPedido } from "@/@types/pedido";

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

  // Tela de pedidos: lista por aba (situacao), busca por número ou cliente
  listar: (situacao: SituacaoPedido, busca: string, pagina = 1, tamanhoPagina = 20) => {
    const parametros = new URLSearchParams({ pagina: String(pagina), tamanhoPagina: String(tamanhoPagina) });
    if (situacao !== "todos") parametros.set("situacao", situacao);
    if (busca.trim()) parametros.set("busca", busca.trim());
    return api.get<ListaPedidos>(`/api/Pedidos?${parametros}`);
  },
  contagem: () => api.get<ContagemPedidos>("/api/Pedidos/contagem"),
  obter: (id: string) => api.get<PedidoDetalhe>(`/api/Pedidos/${id}`),
  // Só pedidos com status Novo; se o endereço mudar, a API localiza de novo no mapa
  atualizar: (id: string, pedido: NovoPedido & { referencia?: string }) =>
    api.put<{ mensagem: string; pedido: PedidoDetalhe }>(`/api/Pedidos/${id}`, pedido),
  geocodificar: (id: string) => api.post<{ mensagem: string; pedido: PedidoDetalhe }>(`/api/Pedidos/${id}/geocodificar`),
  ajustarPonto: (id: string, latitude: number, longitude: number) =>
    api.put<{ mensagem: string; pedido: PedidoDetalhe }>(`/api/Pedidos/${id}/coordenadas`, { latitude, longitude }),
  cancelar: (id: string, motivo?: string) =>
    api.post<{ mensagem: string; pedido: PedidoDetalhe }>(`/api/Pedidos/${id}/cancelar`, { motivo }),
};

// Avisa a tela aberta (ex.: visão geral) que um pedido foi criado
export const EVENTO_PEDIDO_CRIADO = "perg:pedido-criado";
