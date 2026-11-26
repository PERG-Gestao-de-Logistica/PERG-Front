import type { StatusRota, TipoVeiculo } from "@/@types/painel";

export type StatusParada = "Pendente" | "ACaminho" | "Entregue" | "Falhou" | "Cancelada";
export type ObjetivoRoteirizacao = "Custo" | "Tempo" | "Km" | "Veiculos";

export interface Parada {
  id: string;
  sequencia: number;
  status: StatusParada;
  chegadaPrevista: string | null;
  pedidoId: string;
  numeroPedido: number;
  clienteNome: string;
  logradouro: string | null;
  numero: string | null;
  bairro: string | null;
  latitude: number | null;
  longitude: number | null;
  volumes: number;
}

// GET /api/Rotas?data=AAAA-MM-DD
export interface Rota {
  id: string;
  codigo: string;
  numero: number;
  regiao: string | null;
  tipoVeiculo: TipoVeiculo;
  status: StatusRota;
  cor: string | null;
  dataOperacao: string;
  distanciaPrevistaM: number | null;
  duracaoPrevistaS: number | null;
  coletaPrevistaEm: string | null;
  fimPrevistoEm: string | null;
  valorEntregador: number | null;
  entregadorId: string | null;
  entregadorNome: string | null;
  entregadorTelefone: string | null;
  veiculoPlaca: string | null;
  veiculoModelo: string | null;
  // Polyline do OSRM (precisão 5); pode vir null
  trajeto: string | null;
  paradas: Parada[];
}

// Corpo de POST /api/Roteirizacoes
export interface CriarRoteirizacao {
  origemId?: string;
  dataOperacao: string;
  // Sem a lista, a API pega todos os pedidos prontos da origem
  pedidoIds?: string[];
  frota: { tipo: TipoVeiculo; quantidade: number }[];
  objetivo: ObjetivoRoteirizacao;
}

export interface Roteirizacao {
  id: string;
  origemId: string;
  status: "Processando" | "Concluida" | "Falhou" | string;
  erro: string | null;
  resultado: {
    quantidadeRotas: number;
    pedidosRoteirizados: number;
    kmTotal: number;
    duracaoTotalS: number;
    distanciasEstimadas: boolean;
    pedidosForaDaRota: { pedidoId: string; numeroPedido: number; motivo: string }[];
  } | null;
  rotas: Rota[];
}

// GET /api/Mapa/entregadores e evento "PosicaoEntregador" do SignalR
export interface PosicaoEntregador {
  entregadorId: string;
  entregadorNome: string;
  rotaId: string | null;
  latitude: number;
  longitude: number;
  velocidadeKmh: number | null;
  registradaEm: string;
}

// GET /api/Entregadores (rede)
export interface EntregadorRede {
  id: string;
  nome: string;
  veiculoTipo: TipoVeiculo | null;
  veiculoPlaca: string | null;
  favorito: boolean;
}
