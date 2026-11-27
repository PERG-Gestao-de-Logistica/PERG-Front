import type { PapelUsuario } from "@/@types/autenticacao";

export interface MembroEquipe {
  id: string;
  nome: string;
  email: string;
  telefone: string | null;
  papel: PapelUsuario;
  ativo: boolean;
  // ainda não trocou a senha provisória
  primeiroAcessoPendente: boolean;
  ultimoAcessoEm: string | null;
  criadoEm: string;
}

export interface CriarMembro {
  nome: string;
  email: string;
  telefone?: string;
  papel: PapelUsuario;
}

export interface AtualizarMembro {
  nome: string;
  telefone?: string;
  papel: PapelUsuario;
}

// A senha provisória só volta quando o e-mail não pôde ser enviado
export interface RespostaMembroComSenha {
  mensagem: string;
  membro: MembroEquipe;
  emailEnviado: boolean;
  senhaTemporaria: string | null;
}