import type { Rastreio, StatusPedido } from "@/@types/rastreio";

export const hora = (data: string | null | undefined) =>
  data ? new Date(data).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "--:--";

const ehHoje = (d: Date) => d.toDateString() === new Date().toDateString();

// Horário da última vez que o pedido entrou num status (pela linha do tempo da API)
export function horaDoStatus(r: Rastreio, status: StatusPedido) {
  const evento = [...r.eventos].reverse().find((e) => e.statusNovo === status);
  return evento ? hora(evento.ocorridoEm) : null;
}

// Frase abaixo do número do pedido
export function previsao(r: Rastreio) {
  if (r.status === "Entregue") return `Pedido entregue às ${hora(r.entregueEm)}.`;
  if (r.status === "Cancelado") return "Este pedido foi cancelado pela loja.";
  if (r.status === "Ocorrencia") return "Houve um imprevisto na entrega. A loja vai entrar em contato.";
  if (r.janelaInicio && r.janelaFim) {
    const inicio = new Date(r.janelaInicio);
    const dia = ehHoje(inicio) ? "hoje" : inicio.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" });
    return `Previsão de chegada ${dia}, ${hora(r.janelaInicio)}–${hora(r.janelaFim)}`;
  }
  if (r.status === "EmRota" && r.entregasAntes !== null) {
    if (r.entregasAntes === 0) return "Você é a próxima entrega!";
    return `Faltam ${r.entregasAntes} ${r.entregasAntes === 1 ? "entrega" : "entregas"} antes da sua.`;
  }
  if (r.modalidade === "Retirada") return "Pedido para retirada na loja.";
  return "Seu pedido está sendo preparado para sair.";
}

// Recado do quadro de aviso
export function aviso(r: Rastreio) {
  if (r.status === "EmRota") return "Fique tranquilo! O entregador já está em rota e logo chegará.";
  if (r.status === "Entregue") return "Pedido entregue. Obrigado!";
  if (r.status === "Cancelado" || r.status === "Ocorrencia") return "Dúvidas? Fale com a loja onde fez a compra.";
  return "Avisaremos por e-mail quando o pedido sair para entrega.";
}

export const nomeModalidade = {
  MesmoDia: "Entrega no mesmo dia",
  Agendada: "Entrega agendada",
  Retirada: "Retirada na loja",
} as const;
