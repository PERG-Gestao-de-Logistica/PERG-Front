import { api } from "./api";
import type { Rastreio } from "@/@types/rastreio";

export const rastreioService = {
  obter: (token: string) => api.get<Rastreio>(`/api/Rastreio/${encodeURIComponent(token)}`),
};

// Aceita o código puro ou o link inteiro do e-mail (.../rastreio/CODIGO)
export function extrairToken(texto: string) {
  const limpo = texto.trim();
  const marcador = "/rastreio/";
  const i = limpo.indexOf(marcador);
  return (i >= 0 ? limpo.slice(i + marcador.length) : limpo).split(/[?#]/)[0];
}
