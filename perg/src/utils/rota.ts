// Conversões entre as rotas da API e o formato dos componentes de roteirização/monitoramento
import type { TipoVeiculo } from "@/@types/painel";
import type { Rota } from "@/@types/rota";
import type { RotaGerada } from "@/components/componentesEmpresa/mapaRoteirizacao/mapaRoteirizacao";

export type VeiculoTela = RotaGerada["veiculo"];

// Tipo da API -> ícone da tela (van usa o mesmo do caminhão)
export function veiculoTela(tipo: TipoVeiculo | null | undefined): VeiculoTela {
  switch (tipo) {
    case "Bike":
      return "bicicleta";
    case "Carro":
      return "carro";
    case "Van":
    case "Caminhao":
      return "caminhao";
    default:
      return "moto";
  }
}

// Data de hoje no fuso do navegador, no formato da API (AAAA-MM-DD)
export function hojeIso() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

export const formatarKm = (metros: number | null) =>
  metros == null ? "--" : `${(metros / 1000).toLocaleString("pt-BR", { maximumFractionDigits: 1 })} km`;

// 8400 -> "2h20"; 1500 -> "25 min"
export function formatarDuracao(segundos: number | null) {
  if (segundos == null) return "--";
  const minutos = Math.round(segundos / 60);
  if (minutos < 60) return `${minutos} min`;
  return `${Math.floor(minutos / 60)}h${String(minutos % 60).padStart(2, "0")}`;
}

export const horaCurta = (iso: string | null) =>
  iso ? new Date(iso).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" }) : "--";

export function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "?";
  return ((partes[0][0] ?? "") + (partes.length > 1 ? partes[partes.length - 1][0] : "")).toUpperCase();
}

// Polyline do OSRM (precisão 5) -> lista de [lat, lng]
export function decodificarPolyline(texto: string): [number, number][] {
  const pontos: [number, number][] = [];
  let indice = 0;
  let lat = 0;
  let lng = 0;
  while (indice < texto.length) {
    for (const eixo of [0, 1]) {
      let resultado = 0;
      let deslocamento = 0;
      let byte: number;
      do {
        byte = texto.charCodeAt(indice++) - 63;
        resultado |= (byte & 0x1f) << deslocamento;
        deslocamento += 5;
      } while (byte >= 0x20 && indice < texto.length);
      const delta = resultado & 1 ? ~(resultado >> 1) : resultado >> 1;
      if (eixo === 0) lat += delta;
      else lng += delta;
    }
    pontos.push([lat / 1e5, lng / 1e5]);
  }
  return pontos;
}

// Linha da rota no mapa: o trajeto do OSRM; sem ele, origem + paradas em ordem
export function coordenadasDaRota(rota: Rota, origem: [number, number] | null): [number, number][] {
  if (rota.trajeto) {
    const pontos = decodificarPolyline(rota.trajeto);
    if (pontos.length > 1) return pontos;
  }
  const paradas = rota.paradas
    .filter((p) => p.latitude != null && p.longitude != null)
    .map((p) => [Number(p.latitude), Number(p.longitude)] as [number, number]);
  return origem ? [origem, ...paradas] : paradas;
}

// Pontos das paradas (para os marcadores no mapa)
export const pontosDasParadas = (rota: Rota): [number, number][] =>
  rota.paradas
    .filter((p) => p.latitude != null && p.longitude != null)
    .map((p) => [Number(p.latitude), Number(p.longitude)]);

// Quem aparece no lugar do motorista enquanto a rota não tem entregador
export function nomeNaRota(rota: Rota) {
  if (rota.entregadorNome) return rota.entregadorNome;
  if (rota.status === "Ofertada") return "Aguardando aceite";
  return "Não ofertada";
}

export function paraRotaGerada(rota: Rota, cor: string, origem: [number, number] | null): RotaGerada {
  return {
    id: rota.id,
    codigo: rota.codigo,
    motorista: nomeNaRota(rota),
    regiao: rota.regiao ?? "Sem região",
    paradas: rota.paradas.length,
    distancia: formatarKm(rota.distanciaPrevistaM),
    tempo: formatarDuracao(rota.duracaoPrevistaS),
    veiculo: veiculoTela(rota.tipoVeiculo),
    cor,
    coordenadas: coordenadasDaRota(rota, origem),
    pontosParadas: pontosDasParadas(rota),
  };
}
