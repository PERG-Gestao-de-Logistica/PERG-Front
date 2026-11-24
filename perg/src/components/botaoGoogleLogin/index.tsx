import { ReactNode, useEffect, useRef } from "react";
import { autenticacaoService } from "@/services/autenticacaoService";

// O Google só entrega o token pelo botão oficial dele. Para manter o visual do projeto,
// o botão oficial fica invisível por cima do botão desenhado (children) e recebe o clique.

const SCRIPT = "https://accounts.google.com/gsi/client";

function carregarScript(): Promise<void> {
  if (window.google?.accounts) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const existente = document.querySelector<HTMLScriptElement>(`script[src="${SCRIPT}"]`);
    const script = existente ?? document.createElement("script");
    script.addEventListener("load", () => resolve());
    script.addEventListener("error", () => reject(new Error("Não foi possível carregar o login do Google.")));
    if (!existente) {
      script.src = SCRIPT;
      script.async = true;
      document.head.appendChild(script);
    }
  });
}

interface Props {
  children: ReactNode;
  aoReceberToken: (idToken: string) => void;
  aoFalhar: (mensagem: string) => void;
}

export default function BotaoGoogleLogin({ children, aoReceberToken, aoFalhar }: Props) {
  const area = useRef<HTMLDivElement>(null);
  const callbacks = useRef({ aoReceberToken, aoFalhar });
  callbacks.current = { aoReceberToken, aoFalhar };

  useEffect(() => {
    let ativo = true;
    (async () => {
      try {
        const [{ clientId }] = await Promise.all([autenticacaoService.configGoogle(), carregarScript()]);
        if (!ativo || !area.current || !window.google || !clientId) return;
        window.google.accounts.id.initialize({
          client_id: clientId,
          callback: (r) => callbacks.current.aoReceberToken(r.credential),
        });
        window.google.accounts.id.renderButton(area.current, {
          type: "standard",
          size: "large",
          width: Math.min(area.current.offsetWidth || 400, 400),
          locale: "pt-BR",
        });
      } catch (e) {
        if (ativo) callbacks.current.aoFalhar((e as Error).message);
      }
    })();
    return () => {
      ativo = false;
    };
  }, []);

  return (
    <div style={{ position: "relative", width: "100%" }}>
      {children}
      <div
        ref={area}
        style={{
          position: "absolute",
          inset: 0,
          opacity: 0.01,
          overflow: "hidden",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: "scale(1.2)",
        }}
      />
    </div>
  );
}
