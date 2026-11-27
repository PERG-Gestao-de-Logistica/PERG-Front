export const STATUS_CONFIG = {
  // * Status de rotas
  emRota: {
    label: "Em rota",
    variant: "emRota",
  },

  aguardando: {
    label: "Aguardando",
    variant: "aguardando",
  },

  concluida: {
    label: "Concluída",
    variant: "concluida",
  },

  // * Status de pedidos
  novo: {
    label: "Novo",
    variant: "novo",
  },

  roteirizado: {
    label: "Roteirizado",
    variant: "roteirizado",
  },

  entregue: {
    label: "Entregue",
    variant: "entregue",
  },

  ocorrencia: {
    label: "Ocorrência",
    variant: "ocorrencia",
  },

  // Pedido saiu com o entregador (mesmo visual escuro da rota concluída)
  pedidoEmRota: {
    label: "Em rota",
    variant: "concluida",
  },

  cancelado: {
    label: "Cancelado",
    variant: "aguardando",
  },

  // * Status de entregadores
  disponivel: {
    label: "Disponível",
    variant: "disponivel",
  },

  outraLoja: {
    label: "Outra loja",
    variant: "outraLoja",
  },

  offline: {
    label: "Offline",
    variant: "offline",
  },

  // Livre e em expediente, mas fora do raio de oferta da loja
  longe: {
    label: "Longe",
    variant: "offline",
  },

   emRotaAzul: {
    label: "Em rota",
    variant: "emRotaAzul",
  },

  // * Status de monitoramento
  noPrazo: {
    label: "No prazo",
    variant: "noPrazo",
  },

  atrasada: {
    label: "Atrasada",
    variant: "atrasada",
  },
};

export const STATUS_DESCONHECIDO = {
  label: "Não identificado",
  variant: "desconhecido",
};