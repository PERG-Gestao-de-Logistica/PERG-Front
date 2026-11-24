
import HeaderRastreio from "@/components/headerRastreio";
import Footer from "@/components/footer";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { rastreioService } from "@/services/rastreioService";
import type { Rastreio } from "@/@types/rastreio";
import { hora } from "@/utils/rastreio";
import styles from "./entregue.module.css";

export default function Entregue() {
  const router = useRouter();
  const token = typeof router.query.token === "string" ? router.query.token : "";
  const [pedido, setPedido] = useState<Rastreio | null>(null);

  useEffect(() => {
    if (!router.isReady) return;
    if (!token) {
      router.replace("/rastreio");
      return;
    }
    rastreioService
      .obter(token)
      .then((r) => {
        if (r.status !== "Entregue") router.replace(`/acompanhamento?token=${encodeURIComponent(token)}`);
        else setPedido(r);
      })
      .catch(() => router.replace(`/acompanhamento?token=${encodeURIComponent(token)}`));
  }, [router, token]);

  return (
    <div className={styles.page}>
    <main className={styles.entregueContainer}>
      <HeaderRastreio />

      <section className={styles.entregueConteudo}>

        {/* Confirmação */}
        <div className={styles.entregueConfirmacao}>
          <img
            src="/assets/images/check-icon.png"
            alt="Pedido entregue"
            className={styles.checkImagem}
          />

          <h1>Pedido Entregue!</h1>

          <p>Seu pedido foi entregue com sucesso!</p>
        </div>

        {/* Card do pedido */}
        <div className={styles.pedidoEntregueCard}>

          <div className={styles.pedidoCardIcone}>
            <img
              src="/assets/images/pedido-icone.png"
              alt="Ícone do pedido"
              className={styles.pedidoImagem}
            />
          </div>

          <div className={styles.pedidoCardInformacoes}>
            <h2>Pedido #{pedido?.numeroPedido ?? "..."}</h2>

            <p>Entregue às {hora(pedido?.entregueEm)}</p>

            <button
              className={styles.botaoDetalhesPedido}
              onClick={() => router.push(`/acompanhamento?token=${encodeURIComponent(token)}&detalhes=1`)}
            >
              Ver detalhes do pedido
              <span className={styles.botaoSeta}>➜</span>
            </button>
          </div>

        </div>

        {/* Agradecimento */}
        <div className={styles.entregueAgradecimento}>

          <div className={styles.agradecimentoIcone}>
            <img 
            src="/assets/images/mao-icone.png"
             alt=""
              />
          </div>

          <h2>Obrigado por confiar no PERG!</h2>

          <p>
            Se tiver alguma dúvida, entre em contato
            <br />
            com a loja que realizou sua compra.
          </p>

        </div>

      </section>

      <Footer />
    </main>
    </div>
  );
}
