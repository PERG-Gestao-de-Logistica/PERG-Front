
export const StatusPedido = {
  NOVO: "novo",
  ROTEIRIZADO: "roteirizado",
  EM_ROTA: "em rota",
  ENTREGUE: "entregue",
  OCORRENCIA: "ocorrencia",
} as const;

export const StatusEntregador = {
  DISPONIVEL: "disponivel",
  EM_ROTA: "em rota",
  OFFLINE: "offline",
  OUTRA_LOJA: "outra loja",
} as const;

export const StatusAlerta = {
  CRITICO: "critico",
  ALTO: "alto",
  MEDIO: "medio",
  BAIXO: "baixo",
} as const;

export type StatusPedidoType =
  typeof StatusPedido[keyof typeof StatusPedido];

export type StatusEntregadorType =
  typeof StatusEntregador[keyof typeof StatusEntregador];

export type StatusAlertaType =
  typeof StatusAlerta[keyof typeof StatusAlerta];
