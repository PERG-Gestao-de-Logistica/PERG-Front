import { api } from "./api";
import type { AtualizarMembro, CriarMembro, MembroEquipe, RespostaMembroComSenha } from "@/@types/equipe";

type RespostaMembro = { mensagem: string; membro: MembroEquipe };

export const equipeService = {
  listar: (incluirInativos = false) =>
    api.get<MembroEquipe[]>(`/api/Equipe?incluirInativos=${incluirInativos}`),

  // As ações abaixo são só para admin (403 para funcionário)
  criar: (dados: CriarMembro) => api.post<RespostaMembroComSenha>("/api/Equipe", dados),
  atualizar: (id: string, dados: AtualizarMembro) => api.put<RespostaMembro>(`/api/Equipe/${id}`, dados),
  desativar: (id: string) => api.patch<RespostaMembro>(`/api/Equipe/${id}/desativar`),
  reativar: (id: string) => api.patch<RespostaMembro>(`/api/Equipe/${id}/reativar`),
  redefinirSenha: (id: string) => api.post<RespostaMembroComSenha>(`/api/Equipe/${id}/redefinir-senha`),
};
