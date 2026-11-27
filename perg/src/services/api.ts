// Cliente HTTP da API do Perg. Erros da API vêm como { mensagem } e viram ErroApi.

const URL_API = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");
const CHAVE_TOKEN = "perg_token";

export class ErroApi extends Error {
  status: number;
  constructor(status: number, mensagem: string) {
    super(mensagem);
    this.status = status;
  }
}

export const token = {
  obter: (): string | null =>
    typeof window === "undefined" ? null : localStorage.getItem(CHAVE_TOKEN),
  salvar: (valor: string) => localStorage.setItem(CHAVE_TOKEN, valor),
  remover: () => localStorage.removeItem(CHAVE_TOKEN),
};

// Avisado pelo AuthContext para sair quando a API responder 401
let aoExpirar: (() => void) | null = null;
export const definirAoExpirar = (fn: (() => void) | null) => {
  aoExpirar = fn;
};

async function requisitar<T>(metodo: string, caminho: string, corpo?: unknown): Promise<T> {
  const cabecalhos: Record<string, string> = {};
  const atual = token.obter();
  if (atual) cabecalhos.Authorization = `Bearer ${atual}`;

  let body: BodyInit | undefined;
  if (corpo instanceof FormData) {
    body = corpo;
  } else if (corpo !== undefined) {
    cabecalhos["Content-Type"] = "application/json";
    body = JSON.stringify(corpo);
  }

  let resposta: Response;
  try {
    resposta = await fetch(`${URL_API}${caminho}`, { method: metodo, headers: cabecalhos, body });
  } catch {
    throw new ErroApi(0, "Não foi possível falar com o servidor. Verifique sua conexão.");
  }

  const texto = await resposta.text();
  const dados = texto ? JSON.parse(texto) : null;

  if (!resposta.ok) {
    if (resposta.status === 401 && atual) aoExpirar?.();
    const mensagem =
      dados?.mensagem ??
      (resposta.status === 403
        ? "Você não tem permissão para isso."
        : resposta.status === 429
          ? "Muitas tentativas. Aguarde um minuto."
          : "Algo deu errado. Tente novamente.");
    throw new ErroApi(resposta.status, mensagem);
  }

  return dados as T;
}

export const api = {
  get: <T>(caminho: string) => requisitar<T>("GET", caminho),
  post: <T>(caminho: string, corpo?: unknown) => requisitar<T>("POST", caminho, corpo),
  put: <T>(caminho: string, corpo?: unknown) => requisitar<T>("PUT", caminho, corpo),
  patch: <T>(caminho: string, corpo?: unknown) => requisitar<T>("PATCH", caminho, corpo),
  delete: <T>(caminho: string) => requisitar<T>("DELETE", caminho),
};