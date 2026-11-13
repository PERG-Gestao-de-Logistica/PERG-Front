
import { useRouter } from "next/router";
import Footer from "@/components/footer";
import HeaderRastreio from "@/components/headerRastreio";
import styles from "./rastreio.module.css";

export default function Rastreio() {
  const router = useRouter();

  return (
    <main className={styles.page}>
      <div className={styles.rastreioPrimeiroContainer}>
        <HeaderRastreio />

        <div className={styles.parteTodaRastreio}>

          {/* LADO ESQUERDO */}
          <div className={styles.parteEsquerdaRastreio}>

            <p className={styles.subtituloRastreio}>
              RASTREAMENTO DE ENTREGA
            </p>

            <h1 className={styles.tituloPrincipal}>
              Sua entrega,
              <br />
              em{" "}
              <span className={styles.tituloPrincipalDestaque}>
                tempo real.
              </span>
            </h1>

            <p className={styles.descricaoRastreio}>
              Digite o código de rastreamento que você
              recebeu para
              <br />
              consultar seu pedido.
            </p>

            <div className={styles.areaCodigoRastreio}>

              <img
                src="/assets/images/local-rastreio-icone.png"
                alt=""
                className={styles.iconeRastreio}
              />

              <input
                type="text"
                placeholder="Ex: 7F6V-283C-2D3F"
                className={styles.inputRastreio}
              />

              <button
                type="button"
                className={styles.botaoRastreio}
                aria-label="Consultar rastreamento"
                onClick={() => router.push("/acompanhamento")}
              >
                <img
                  src="/assets/images/icone-seta.png"
                  alt=""
                  className={styles.setinhaIcone}
                />
              </button>

            </div>

            <p className={styles.descricaoRastreio}>
              O código está no e-mail enviado para você.
            </p>

          </div>

          {/* LADO DIREITO */}
          <div className={styles.parteDireitaRastreio}>

            <img
              src="/assets/images/clienteRastreio.png"
              alt="Ilustração de cliente acompanhando uma entrega"
              className={styles.imagemClienteRastreio}
            />

          </div>

        </div>
      </div>

      {/* MENSAGEM INFORMATIVA */}
      <div className={styles.rastreioSecundoContainer}>

        <div className={styles.mensagemRastreioConteudo}>

          <img
            src="/assets/images/mensagem-icone.png"
            alt=""
            className={styles.mensagemImagemIcone}
          />

          <div className={styles.mensagemRastreioTexto}>

            <h2>
              Ainda não recebeu o código?
            </h2>

            <p>
              Consulte a mensagem de confirmação do pedido ou entre
              <br />
              em contato com a loja onde realizou a compra.
            </p>

          </div>

        </div>

      </div>

      <Footer />
    </main>
  );
}
