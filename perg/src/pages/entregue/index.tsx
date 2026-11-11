
import HeaderRastreio from "@/components/headerRastreio";
import Footer from "@/components/footer";
import { useRouter } from "next/router";

export default function Entregue() {
  const router = useRouter();

  return (
    <main className="entregue-container">
      <HeaderRastreio />

      <section className="entregue-conteudo">

        {/* Confirmação */}
        <div className="entregue-confirmacao">
          <img
            src="/check-icon.png"
            alt="Pedido entregue"
            className="check-imagem"
          />

          <h1>Pedido Entregue!</h1>

          <p>Seu pedido foi entregue com sucesso!</p>
        </div>

        {/* Card do pedido */}
        <div className="pedido-entregue-card">

          <div className="pedido-card-icone">
            <img
              src="/pedido-icone.png"
              alt="Ícone do pedido"
              className="pedido-imagem"
            />
          </div>

          <div className="pedido-card-informacoes">
            <h2>Pedido #7F6V-283C</h2>

            <p>Entregue em 16:45</p>

            <button
              className="botao-detalhes-pedido"
              onClick={() => router.push("/acompanhamento")}
            >
              Ver detalhes do pedido
              <span className="botao-seta">➜</span>
            </button>
          </div>

        </div>

        {/* Agradecimento */}
        <div className="entregue-agradecimento">

          <div className="agradecimento-icone">
            <img 
            src="/mao-icone.png"
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
  );
}
