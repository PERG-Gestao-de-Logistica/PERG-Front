import { api } from "./api";
import type { CriarRoteirizacao, Roteirizacao } from "@/@types/rota";

export const roteirizacoesService = {
  criar: (dados: CriarRoteirizacao) =>
    api.post<{ mensagem: string; roteirizacao: Roteirizacao }>("/api/Roteirizacoes", dados),
};
