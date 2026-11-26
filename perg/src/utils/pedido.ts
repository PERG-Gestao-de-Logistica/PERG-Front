// Textos da tela de pedidos
import type { ModalidadePedido, StatusGeocodificacao, StatusPedido } from "@/@types/pedido";

// Status da API -> chave do componente Status
export const STATUS_TELA: Record<StatusPedido, string> = {
  Novo: "novo",
  Roteirizado: "roteirizado",
  EmRota: "pedidoEmRota",
  Entregue: "entregue",
  Ocorrencia: "ocorrencia",
  Cancelado: "cancelado",
};

export const NOME_MODALIDADE: Record<ModalidadePedido, string> = {
  MesmoDia: "Entrega no mesmo dia",
  Agendada: "Entrega agendada",
  Retirada: "Retirada na loja",
};

export const NOME_GEOCODIFICACAO: Record<StatusGeocodificacao, string> = {
  Ok: "Localizado no mapa",
  Revisar: "Localização aproximada",
  Pendente: "Ainda não localizado",
  Falhou: "Endereço não encontrado",
};

export const formatarPeso = (kg: number) => `${kg.toLocaleString("pt-BR", { maximumFractionDigits: 1 })} kg`;

export const dataHora = (iso: string | null) =>
  iso
    ? new Date(iso).toLocaleString("pt-BR", { day: "2-digit", month: "2-digit", hour: "2-digit", minute: "2-digit" })
    : "--";

// "08:00–12:00 de 28/11"; sem janela = qualquer horário
export function textoJanela(inicio: string | null, fim: string | null) {
  if (!inicio || !fim) return "Qualquer horário";
  const i = new Date(inicio);
  const f = new Date(fim);
  const hora = (d: Date) => d.toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
  return `${hora(i)}–${hora(f)} de ${i.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit" })}`;
}

export const enderecoCurto = (logradouro: string | null, numero: string | null) =>
  logradouro ? `${logradouro}${numero ? `, ${numero}` : ""}` : "Sem endereço";

// Tipos de ocorrência registrados pelo entregador
export const NOME_OCORRENCIA: Record<string, string> = {
  ClienteAusente: "Cliente ausente",
  EnderecoNaoEncontrado: "Endereço não encontrado",
  Recusado: "Entrega recusada pelo cliente",
  Avaria: "Produto avariado",
  Outro: "Outro motivo",
};
