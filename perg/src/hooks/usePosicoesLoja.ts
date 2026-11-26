import { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import { token } from "@/services/api";
import { mapaService } from "@/services/mapaService";
import type { PosicaoEntregador } from "@/@types/rota";

const URL_API = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

// Posição dos entregadores da loja: carga inicial pela API e atualizações ao vivo pelo SignalR.
// A conexão entra sozinha no grupo da empresa (pelo token).
export function usePosicoesLoja(ativo = true) {
  const [posicoes, setPosicoes] = useState<Record<string, PosicaoEntregador>>({});

  useEffect(() => {
    if (!ativo) return;
    let vivo = true;

    mapaService
      .entregadores()
      .then((lista) => {
        if (!vivo) return;
        setPosicoes(Object.fromEntries(lista.map((p) => [p.entregadorId, p])));
      })
      .catch(() => {});

    const conexao = new HubConnectionBuilder()
      .withUrl(`${URL_API}/hubs/rastreamento`, { accessTokenFactory: () => token.obter() ?? "" })
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build();

    conexao.on("PosicaoEntregador", (p: PosicaoEntregador) => {
      setPosicoes((atual) => ({ ...atual, [p.entregadorId]: p }));
    });

    conexao.start().catch(() => {
      // Sem tempo real a tela continua funcionando com a carga inicial
    });

    return () => {
      vivo = false;
      conexao.stop();
    };
  }, [ativo]);

  return posicoes;
}
