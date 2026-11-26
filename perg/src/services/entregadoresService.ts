import { api } from "./api";
import type { EntregadorRede } from "@/@types/rota";

export const entregadoresService = {
  listarRede: () => api.get<EntregadorRede[]>("/api/Entregadores"),
};
