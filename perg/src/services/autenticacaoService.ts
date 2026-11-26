import { api } from "./api";
import type { CadastroEmpresa, RespostaLogin, UsuarioLogado } from "@/@types/autenticacao";

export const autenticacaoService = {
  login: (email: string, senha: string) =>
    api.post<RespostaLogin>("/api/Usuarios/login", { email, senha }),

  eu: () => api.get<UsuarioLogado>("/api/Usuarios/eu"),

  // Nome, telefone e preferências de notificação do próprio usuário (o e-mail não muda: é o login)
  atualizarPerfil: (dados: { nome: string; telefone?: string; notifOcorrencias: boolean; notifCobranca: boolean }) =>
    api.put<{ mensagem: string }>("/api/Usuarios/eu", dados),

  trocarSenha: (senhaAtual: string, novaSenha: string) =>
    api.put<{ mensagem: string }>("/api/Usuarios/eu/senha", { senhaAtual, novaSenha }),

  // idToken = "credential" devolvido pelo botão do Google. Só entra quem já tem conta.
  loginGoogle: (idToken: string) =>
    api.post<RespostaLogin>("/api/Usuarios/login-google", { idToken }),

  configGoogle: () => api.get<{ clientId: string }>("/api/Usuarios/login-google/config"),

  // Manda um código de 6 dígitos para o e-mail (vale 15 minutos)
  esqueciSenha: (email: string) =>
    api.post<{ mensagem: string }>("/api/Usuarios/esqueci-senha", { email }),

  redefinirSenha: (email: string, codigo: string, novaSenha: string) =>
    api.post<{ mensagem: string }>("/api/Usuarios/redefinir-senha", { email, codigo, novaSenha }),

  // Responde 201 sem token: depois do cadastro, faça o login com o e-mail e a senha do responsável
  cadastrarEmpresa: (dados: CadastroEmpresa) =>
    api.post<{ mensagem: string }>("/api/Empresas/cadastrar", dados),
};
