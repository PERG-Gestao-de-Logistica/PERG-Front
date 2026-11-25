import { api } from "./api";
import type { ResumoPainel } from "@/@types/painel";

export const painelService = {
  resumo: () => api.get<ResumoPainel>("/api/Painel/resumo"),
};
