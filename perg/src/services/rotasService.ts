import { api } from "./api";
import type { Rota } from "@/@types/rota";

type RespostaRota = { mensagem: string; rota: Rota };

export const rotasService = {
  // data no formato AAAA-MM-DD (dia de operação da loja)
  listarDoDia: (data: string) => api.get<Rota[]>(`/api/Rotas?data=${data}`),
  obter: (id: string) => api.get<Rota>(`/api/Rotas/${id}`),
  // Manda a rota para os entregadores (favoritos primeiro, depois a rede)
  ofertar: (id: string) => api.post<RespostaRota>(`/api/Rotas/${id}/ofertar`, {}),
  cancelar: (id: string) => api.post<RespostaRota>(`/api/Rotas/${id}/cancelar`),
};
