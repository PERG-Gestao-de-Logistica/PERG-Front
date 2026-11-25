
import { useRouter } from "next/router";
import HeaderRastreio from "@/components/headerRastreio";
import Footer from "@/components/footer";
import styles from "./acompanhamento.module.css";

// ======================================
// CAMINHOS DAS IMAGENS
// ALTERE SOMENTE OS CAMINHOS ABAIXO
// ======================================

const ICONES = {
  pedidoRecebido: "/assets/images/sacola-icone.png",
  emRota: "/assets/images/caminhao-icone.png",
  emEntrega: "/assets/images/caminhao-rapido-icone.png",
  entregue: "/assets/images/entregue-icone.png",

  entregador: "/assets/images/entregador.png",
  veiculo: "/assets/images/veiculo-icone.png",
  telefone: "/assets/images/telefone-icone.png",
  endereco: "/assets/images/endereco-icone.png",
  informacao: "/assets/images/Informacao-icone.png",

  pedido: "/assets/images/pedido-icone.png",
  entrega: "/assets/images/entrega-icone.png",
  loja: "/assets/images/pedido-icone.png",
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
    <div className={styles.page}>
    <main className={styles.acompanhamentoContainer}>

      <HeaderRastreio />

      <section className={styles.acompanhamentoConteudo}>

        {/* VOLTAR */}
        <button
          type="button"
          className={styles.botaoVoltar}
          onClick={() => router.push("/rastreio")}
        >
          ← Voltar
        </button>

        {/* INFORMAÇÕES DO PEDIDO */}
        <div className={styles.pedidoInformacoes}>

          <h1>
            Pedido <span>#7F6V-283C</span>
          </h1>

          <p>
            Previsão de chegada hoje, 16:30–17:00
          </p>

        </div>

        {/* LINHA DO TEMPO */}
        <div className={styles.linhaTempoRastreio}>

          <div className={styles.linhaTempoConector}></div>

          {etapas.map((etapa) => (
            <div
              key={etapa.numero}
              className={`etapa-rastreio ${etapa.status}`}
            >

              <div className={styles.etapaIcone}>
                <img
                  src={etapa.icone}
                  alt=""
                />
              </div>

              <div className={styles.etapaInformacoes}>
                <h3>{etapa.titulo}</h3>
                <p>{etapa.horario}</p>
              </div>

            </div>
          ))}

        </div>

        {/* MAPA E DETALHES */}
        <div className={styles.acompanhamentoDetalhes}>

          {/* MAPA */}
          <div className={styles.mapaEntrega}>

            <div className={styles.mapaMarcador}>
              <img
                src={ICONES.endereco}
                alt="Localização da entrega"
              />
            </div>

            <div className={styles.mapaLegenda}>
              Local de entrega
            </div>

          </div>

          {/* DETALHES DA ENTREGA */}
          <div className={styles.detalhesEntrega}>

            <h2>Detalhes da entrega</h2>

            <div className={styles.detalheItem}>

              <div className={styles.detalheIcone}>
                <img src={ICONES.entregador} alt="" />
              </div>

              <div>
                <h3>Entregador</h3>
                <p>Carlos Lima</p>
                <small>★ 4.9 (120 entregas)</small>
              </div>

            </div>

            <div className={styles.detalheItem}>

              <div className={styles.detalheIcone}>
                <img src={ICONES.veiculo} alt="" />
              </div>

              <div>
                <h3>Veículo</h3>
                <p>Honda Biz - Placa FFX-2H34</p>
              </div>

            </div>

            <div className={styles.detalheItem}>

              <div className={styles.detalheIcone}>
                <img src={ICONES.telefone} alt="" />
              </div>

              <div>
                <h3>Telefone do entregador</h3>
                <p>(11) 91111-1111</p>
              </div>

            </div>

            <div className={styles.detalheItem}>

              <div className={styles.detalheIcone}>
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
            <div className={styles.avisoEntrega}>

              <img
                src={ICONES.informacao}
                alt=""
                className={styles.iconeAviso}
              />

              <p>
                Fique tranquilo! O entregador já está em rota e logo chegará.
              </p>

            </div>

          </div>

        </div>

        {/* RESUMO INFERIOR */}
        <div className={styles.resumoEntrega}>

          <div className={styles.resumoItem}>

            <div className={styles.resumoIcone}>
              <img src={ICONES.pedido} alt="" />
            </div>

            <div>
              <h3>Pedido</h3>
              <p>#7F6V-283C</p>
              <small>2 itens - R$ 149,90</small>
            </div>

          </div>

          <div className={styles.resumoItem}>

            <div className={styles.resumoIcone}>
              <img src={ICONES.entrega} alt="" />
            </div>

            <div>
              <h3>Entrega</h3>
              <p>Carlos Lima</p>
              <small>Honda Biz - FFX-2H34</small>
            </div>

          </div>

          <div className={styles.resumoItem}>

            <div className={styles.resumoIcone}>
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
    </div>
  );
}
