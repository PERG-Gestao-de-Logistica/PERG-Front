import { createContext, ReactNode, useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { definirAoExpirar, token } from "@/services/api";
import { autenticacaoService } from "@/services/autenticacaoService";
import type { UsuarioLogado } from "@/@types/autenticacao";

interface AuthContextData {
  usuario: UsuarioLogado | null;
  carregando: boolean;
  logado: boolean;
  entrar: (email: string, senha: string) => Promise<UsuarioLogado>;
  entrarComGoogle: (idToken: string) => Promise<UsuarioLogado>;
  sair: () => void;
  atualizarUsuario: () => Promise<void>;
}

export const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export function AuthProvider({ children }: { children: ReactNode }) {
  const router = useRouter();
  const [usuario, setUsuario] = useState<UsuarioLogado | null>(null);
  const [carregando, setCarregando] = useState(true);

  const sair = useCallback(() => {
    token.remover();
    setUsuario(null);
    router.replace("/login");
  }, [router]);

  const atualizarUsuario = useCallback(async () => {
    setUsuario(await autenticacaoService.eu());
  }, []);

  // Ao abrir o site com um token salvo, busca o usuário; token inválido = sai
  useEffect(() => {
    definirAoExpirar(sair);
    if (!token.obter()) {
      setCarregando(false);
      return;
    }
    autenticacaoService
      .eu()
      .then(setUsuario)
      .catch(() => token.remover())
      .finally(() => setCarregando(false));
    return () => definirAoExpirar(null);
  }, [sair]);

  const concluirLogin = async (novoToken: string) => {
    token.salvar(novoToken);
    const eu = await autenticacaoService.eu();
    setUsuario(eu);
    return eu;
  };

  const entrar = async (email: string, senha: string) =>
    concluirLogin((await autenticacaoService.login(email, senha)).token);

  const entrarComGoogle = async (idToken: string) =>
    concluirLogin((await autenticacaoService.loginGoogle(idToken)).token);

  return (
    <AuthContext.Provider
      value={{ usuario, carregando, logado: !!usuario, entrar, entrarComGoogle, sair, atualizarUsuario }}
    >
      {children}
    </AuthContext.Provider>
  );
}
