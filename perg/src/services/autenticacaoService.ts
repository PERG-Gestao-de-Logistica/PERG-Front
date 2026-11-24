import { api } from "./api";
import type { CadastroEmpresa, RespostaLogin, UsuarioLogado } from "@/@types/autenticacao";

export const autenticacaoService = {
  login: (email: string, senha: string) =>
    api.post<RespostaLogin>("/api/Usuarios/login", { email, senha }),

  eu: () => api.get<UsuarioLogado>("/api/Usuarios/eu"),

  trocarSenha: (senhaAtual: string, novaSenha: string) =>
    api.put<{ mensagem: string }>("/api/Usuarios/eu/senha", { senhaAtual, novaSenha }),

  // Manda um código de 6 dígitos para o e-mail (vale 15 minutos)
  esqueciSenha: (email: string) =>
    api.post<{ mensagem: string }>("/api/Usuarios/esqueci-senha", { email }),

  redefinirSenha: (email: string, codigo: string, novaSenha: string) =>
    api.post<{ mensagem: string }>("/api/Usuarios/redefinir-senha", { email, codigo, novaSenha }),

  // Responde 201 sem token: depois do cadastro, faça o login com o e-mail e a senha do responsável
  cadastrarEmpresa: (dados: CadastroEmpresa) =>
    api.post<{ mensagem: string }>("/api/Empresas/cadastrar", dados),
};
