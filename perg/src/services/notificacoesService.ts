import { api } from "./api";

export const notificacoesService = {
  contagem: () => api.get<{ naoLidas: number }>("/api/Notificacoes/contagem"),
};
