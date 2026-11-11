
import Footer from "@/components/footer";
import HeaderRastreio from "@/components/headerRastreio";

export default function Rastreio() {
  return (
    <main>
      <div className="rastreio-primeiro-container">
        <HeaderRastreio />

        <div className="parte-toda-rastreio">

          {/* LADO ESQUERDO */}
          <div className="parte-esquerda-rastreio">

            <p className="subtitulo-rastreio">
              RASTREAMENTO DE ENTREGA
            </p>

            <h1 className="titulo-principal">
              Sua entrega,
              <br />
              em{" "}
              <span className="titulo-principal-destaque">
                tempo real.
              </span>
            </h1>

            <p className="descricao-rastreio">
              Digite o código de rastreamento que você
              recebeu para
              <br />
              consultar seu pedido.
            </p>

            <div className="area-codigo-rastreio">

              <img
                src="/local-rastreio-icone.png"
                alt=""
                className="icone-rastreio"
              />

              <input
                type="text"
                placeholder="Ex: 7F6V-283C-2D3F"
                className="input-rastreio"
              />

              <button
                type="button"
                className="botao-rastreio"
                aria-label="Consultar rastreamento"
              >
                <img
                  src="/icone-seta.png"
                  alt=""
                  className="setinha-icone"
                />
              </button>

            </div>

            <p className="descricao-rastreio">
              O código está no e-mail enviado para você.
            </p>

          </div>

          {/* LADO DIREITO */}
          <div className="parte-direita-rastreio">

            <img
              src="/clienteRastreio.png"
              alt="Ilustração de cliente acompanhando uma entrega"
              className="imagem-cliente-rastreio"
            />

          </div>

        </div>
      </div>

      {/* MENSAGEM INFORMATIVA */}
      <div className="rastreio-secundo-container">

        <div className="mensagem-rastreio-conteudo">

          <img
            src="/mensagem-icone.png"
            alt=""
            className="mensagem-imagem-icone"
          />

          <div className="mensagem-rastreio-texto">

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
