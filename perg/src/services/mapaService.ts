import { api } from "./api";
import type { PosicaoEntregador } from "@/@types/rota";

export const mapaService = {
  // Última posição de cada entregador em rota (o resto chega pelo SignalR)
  entregadores: () => api.get<PosicaoEntregador[]>("/api/Mapa/entregadores"),
};
