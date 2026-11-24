export type StatusPedido = "Novo" | "Roteirizado" | "EmRota" | "Entregue" | "Ocorrencia" | "Cancelado";

// GET /api/Rastreio/{token}: o que o cliente final vê pelo link
export interface Rastreio {
  numeroPedido: number;
  nomeLoja: string;
  status: StatusPedido;
  modalidade: "MesmoDia" | "Agendada" | "Retirada";
  logradouro: string | null;
  numero: string | null;
  complemento: string | null;
  bairro: string | null;
  cidade: string | null;
  janelaInicio: string | null;
  janelaFim: string | null;
  entregueEm: string | null;
  chegadaPrevista: string | null;
  entregador: {
    nome: string;
    veiculoTipo: string | null;
    veiculoModelo: string | null;
    veiculoPlaca: string | null;
    notaMedia: number | null;
    totalEntregas: number;
  } | null;
  pinEntrega: string | null;
  entregasAntes: number | null;
  posicaoEntregador: { latitude: number; longitude: number; atualizadaEm: string } | null;
  eventos: { descricao: string; statusNovo: StatusPedido | null; ocorridoEm: string }[];
}
