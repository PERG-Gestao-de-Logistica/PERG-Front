import { useEffect, useState } from "react";
import { HubConnectionBuilder, LogLevel } from "@microsoft/signalr";
import type { Ponto } from "@/components/mapaRastreio";

const URL_API = (process.env.NEXT_PUBLIC_API_URL ?? "").replace(/\/$/, "");

// Posição do entregador ao vivo pelo SignalR (/hubs/rastreamento).
// A API só manda a posição quando o pedido é a próxima entrega da rota.
export function usePosicaoTempoReal(token: string, ativo: boolean) {
  const [posicao, setPosicao] = useState<Ponto | null>(null);

  useEffect(() => {
    if (!token || !ativo) return;

    const conexao = new HubConnectionBuilder()
      .withUrl(`${URL_API}/hubs/rastreamento`)
      .withAutomaticReconnect()
      .configureLogging(LogLevel.Warning)
      .build();

    conexao.on("PosicaoEntregador", (p: Ponto) => setPosicao({ latitude: p.latitude, longitude: p.longitude }));
    // Ao reconectar, precisa entrar de novo no grupo do pedido
    conexao.onreconnected(() => conexao.invoke("AcompanharPedido", token).catch(() => {}));

    conexao
      .start()
      .then(() => conexao.invoke("AcompanharPedido", token))
      .catch(() => {
        // Sem tempo real a página continua funcionando: a posição chega na atualização a cada 30 s
      });

    return () => {
      conexao.stop();
    };
  }, [token, ativo]);

  return posicao;
}
