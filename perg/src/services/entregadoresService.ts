import { api } from "./api";
import type { EntregadorRede } from "@/@types/rota";

export const entregadoresService = {
  listarRede: () => api.get<EntregadorRede[]>("/api/Entregadores"),

  // Preferenciais (favoritos) da loja: recebem a oferta da rota antes da rede
  favoritar: (id: string) => api.post<{ mensagem: string }>(`/api/Entregadores/${id}/favorito`, {}),
  desfavoritar: (id: string) => api.delete<{ mensagem: string }>(`/api/Entregadores/${id}/favorito`),
};
