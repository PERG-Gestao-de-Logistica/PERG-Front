import { api } from "./api";
import type { AtualizarEmpresa, ConfiguracaoEmpresa } from "@/@types/empresa";

export const empresaService = {
  obter: () => api.get<ConfiguracaoEmpresa>("/api/Empresas/eu"),

  // Só admin (a API responde 403 para funcionário)
  atualizar: (dados: AtualizarEmpresa) =>
    api.put<{ mensagem: string; empresa: ConfiguracaoEmpresa }>("/api/Empresas/eu", dados),
};
