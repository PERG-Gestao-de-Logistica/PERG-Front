
import { useRouter } from "next/router";
import HeaderRastreio from "@/components/headerRastreio";
import Footer from "@/components/footer";

// ======================================
// CAMINHOS DAS IMAGENS
// ALTERE SOMENTE OS CAMINHOS ABAIXO
// ======================================

const ICONES = {
  pedidoRecebido: "/sacola-icone.png",
  emRota: "/caminhao-icone.png",
  emEntrega: "/caminhao-rapido-icone.png",
  entregue: "/entregue-icone.png",

  entregador: "/entregador.png",
  veiculo: "/veiculo-icone.png",
  telefone: "/telefone-icone.png",
  endereco: "/endereco-icone.png",
  informacao: "/informacao-icone.png",

  pedido: "/pedido-icone.png",
  entrega: "/entrega-icone.png",
  loja: "/pedido-icone.png",
};

// ======================================
// ETAPAS DO RASTREAMENTO
// ======================================

const etapas = [
  {
    numero: "01",
    titulo: "Pedido recebido",
    horario: "10:33",
    icone: ICONES.pedidoRecebido,
    status: "concluido",
  },
  {
    numero: "02",
    titulo: "Em rota",
    horario: "11:24",
    icone: ICONES.emRota,
    status: "concluido",
  },
  {
    numero: "03",
    titulo: "Em entrega",
    horario: "15:57",
    icone: ICONES.emEntrega,
    status: "atual",
  },
  {
    numero: "04",
    titulo: "Entregue",
    horario: "--:--",
    icone: ICONES.entregue,
    status: "pendente",
  },
];

export default function Acompanhamento() {
  const router = useRouter();

  return (
    <main className="acompanhamento-container">

      <HeaderRastreio />

      <section className="acompanhamento-conteudo">

        {/* VOLTAR */}
        <button
          type="button"
          className="botao-voltar"
          onClick={() => router.push("/rastreio")}
        >
          ← Voltar
        </button>

        {/* INFORMAÇÕES DO PEDIDO */}
        <div className="pedido-informacoes">

          <h1>
            Pedido <span>#7F6V-283C</span>
          </h1>

          <p>
            Previsão de chegada hoje, 16:30–17:00
          </p>

        </div>

        {/* LINHA DO TEMPO */}
        <div className="linha-tempo-rastreio">

          <div className="linha-tempo-conector"></div>

          {etapas.map((etapa) => (
            <div
              key={etapa.numero}
              className={`etapa-rastreio ${etapa.status}`}
            >

              <div className="etapa-icone">
                <img
                  src={etapa.icone}
                  alt=""
                />
              </div>

              <div className="etapa-informacoes">
                <h3>{etapa.titulo}</h3>
                <p>{etapa.horario}</p>
              </div>

            </div>
          ))}

        </div>

        {/* MAPA E DETALHES */}
        <div className="acompanhamento-detalhes">

          {/* MAPA */}
          <div className="mapa-entrega">

            <div className="mapa-marcador">
              <img
                src={ICONES.endereco}
                alt="Localização da entrega"
              />
            </div>

            <div className="mapa-legenda">
              Local de entrega
            </div>

          </div>

          {/* DETALHES DA ENTREGA */}
          <div className="detalhes-entrega">

            <h2>Detalhes da entrega</h2>

            <div className="detalhe-item">

              <div className="detalhe-icone">
                <img src={ICONES.entregador} alt="" />
              </div>

              <div>
                <h3>Entregador</h3>
                <p>Carlos Lima</p>
                <small>★ 4.9 (120 entregas)</small>
              </div>

            </div>

            <div className="detalhe-item">

              <div className="detalhe-icone">
                <img src={ICONES.veiculo} alt="" />
              </div>

              <div>
                <h3>Veículo</h3>
                <p>Honda Biz - Placa FFX-2H34</p>
              </div>

            </div>

            <div className="detalhe-item">

              <div className="detalhe-icone">
                <img src={ICONES.telefone} alt="" />
              </div>

              <div>
                <h3>Telefone do entregador</h3>
                <p>(11) 91111-1111</p>
              </div>

            </div>

            <div className="detalhe-item">

              <div className="detalhe-icone">
                <img src={ICONES.endereco} alt="" />
              </div>

              <div>
                <h3>Endereço de entrega</h3>
                <p>
                  Rua Augusta, 1234
                  <br />
                  Bela Vista - São Paulo/SP
                </p>
              </div>

            </div>

            {/* AVISO */}
            <div className="aviso-entrega">

              <img
                src={ICONES.informacao}
                alt=""
                className="icone-aviso"
              />

              <p>
                Fique tranquilo! O entregador já está em rota e logo chegará.
              </p>

            </div>

          </div>

        </div>

        {/* RESUMO INFERIOR */}
        <div className="resumo-entrega">

          <div className="resumo-item">

            <div className="resumo-icone">
              <img src={ICONES.pedido} alt="" />
            </div>

            <div>
              <h3>Pedido</h3>
              <p>#7F6V-283C</p>
              <small>2 itens - R$ 149,90</small>
            </div>

          </div>

          <div className="resumo-item">

            <div className="resumo-icone">
              <img src={ICONES.entrega} alt="" />
            </div>

            <div>
              <h3>Entrega</h3>
              <p>Carlos Lima</p>
              <small>Honda Biz - FFX-2H34</small>
            </div>

          </div>

          <div className="resumo-item">

            <div className="resumo-icone">
              <img src={ICONES.loja} alt="" />
            </div>

            <div>
              <h3>Loja</h3>
              <p>Tech Store</p>
              <small>São Paulo/SP</small>
            </div>

          </div>

        </div>

      </section>

      <Footer />

    </main>
  );
}
