
import HeaderRastreio from "@/components/headerRastreio";
import Footer from "@/components/footer";
import { useRouter } from "next/router";
import styles from "./entregue.module.css";

export default function Entregue() {
  const router = useRouter();

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
            <h2>Pedido #7F6V-283C</h2>

            <p>Entregue em 16:45</p>

            <button
              className={styles.botaoDetalhesPedido}
              onClick={() => router.push("/acompanhamento")}
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
