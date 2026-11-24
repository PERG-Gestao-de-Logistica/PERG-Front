
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { usePosicaoTempoReal } from "@/hooks/usePosicaoTempoReal";
import { rastreioService } from "@/services/rastreioService";
import type { Rastreio } from "@/@types/rastreio";
import { avaliacaoEntregador, aviso, descricaoVeiculo, enderecoRua, hora, horaDoStatus, nomeModalidade, previsao } from "@/utils/rastreio";
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
// ETAPAS DO RASTREAMENTO (a partir do status e dos horários da API)
// ======================================
type SituacaoEtapa = "concluido" | "atual" | "pendente";

function montarEtapas(r: Rastreio) {
  const entregue = r.status === "Entregue";
  const emRota = r.status === "EmRota" || entregue;
  const proxima = r.status === "EmRota" && r.entregasAntes === 0;
  const situacao = (concluida: boolean, atual: boolean): SituacaoEtapa =>
    concluida ? "concluido" : atual ? "atual" : "pendente";

  return [
    { numero: "01", titulo: "Pedido recebido", horario: hora(r.eventos[0]?.ocorridoEm), icone: ICONES.pedidoRecebido, status: situacao(true, false) },
    { numero: "02", titulo: "Em rota", horario: emRota ? horaDoStatus(r, "EmRota") ?? "--:--" : "--:--", icone: ICONES.emRota, status: situacao(emRota && (proxima || entregue), emRota) },
    { numero: "03", titulo: "Em entrega", horario: proxima ? "agora" : "--:--", icone: ICONES.emEntrega, status: situacao(entregue, proxima) },
    { numero: "04", titulo: "Entregue", horario: hora(r.entregueEm), icone: ICONES.entregue, status: situacao(entregue, false) },
  ];
}

const ATUALIZAR_A_CADA_MS = 30_000;

const MapaRastreio = dynamic(() => import("@/components/mapaRastreio"), { ssr: false });

export default function Acompanhamento() {
  const router = useRouter();
  const token = typeof router.query.token === "string" ? router.query.token : "";
  const [pedido, setPedido] = useState<Rastreio | null>(null);
  const [erro, setErro] = useState("");

  // Busca ao abrir e atualiza a cada 30 s enquanto o pedido não termina
  useEffect(() => {
    if (!router.isReady) return;
    if (!token) {
      router.replace("/rastreio");
      return;
    }
    let ativo = true;
    let intervalo: ReturnType<typeof setInterval> | undefined;
    const buscar = () =>
      rastreioService
        .obter(token)
        .then((r) => {
          if (!ativo) return;
          if (r.status === "Entregue" && !router.query.detalhes) {
            router.replace(`/entregue?token=${encodeURIComponent(token)}`);
            return;
          }
          setPedido(r);
          if (r.status === "Entregue" || r.status === "Cancelado") clearInterval(intervalo);
        })
        .catch((e) => {
          if (!ativo) return;
          setErro(
            (e as { status?: number }).status === 404
              ? "Não encontramos esse pedido. Confira o código ou o link do e-mail."
              : (e as Error).message,
          );
          clearInterval(intervalo);
        });
    buscar();
    intervalo = setInterval(buscar, ATUALIZAR_A_CADA_MS);
    return () => {
      ativo = false;
      clearInterval(intervalo);
    };
  }, [router, token]);

  // Tempo real só com o pedido em rota; a posição inicial vem da própria consulta
  const posicaoAoVivo = usePosicaoTempoReal(token, pedido?.status === "EmRota");
  const posicaoEntregador = posicaoAoVivo ?? pedido?.posicaoEntregador ?? null;
  const destino =
    pedido?.latitude != null && pedido?.longitude != null
      ? { latitude: pedido.latitude, longitude: pedido.longitude }
      : null;

  const etapas = pedido ? montarEtapas(pedido) : [];
  const local = [pedido?.bairro, pedido?.cidade].filter(Boolean).join(" - ");

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
            Pedido <span>{pedido ? `#${pedido.numeroPedido}` : ""}</span>
          </h1>

          <p role={erro ? "alert" : undefined}>
            {erro || (pedido ? previsao(pedido) : "Carregando...")}
          </p>

          {pedido?.pinEntrega && pedido.status === "EmRota" && (
            <div className={styles.pinEntrega}>
              <div className={styles.pinRotulo}>
                <strong>Código de entrega</strong>
                <span>Informe ao entregador na hora de receber</span>
              </div>
              <span className={styles.pinCodigo} aria-label={`Código de entrega ${pedido.pinEntrega.split("").join(" ")}`}>
                {pedido.pinEntrega}
              </span>
            </div>
          )}

        </div>

        {/* LINHA DO TEMPO */}
        <div className={styles.linhaTempoRastreio}>

          <div className={styles.linhaTempoConector}></div>

          {etapas.map((etapa) => (
            <div
              key={etapa.numero}
              className={`${styles.etapaRastreio} ${styles[etapa.status] ?? ""}`}
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

            {destino ? (
              <MapaRastreio destino={destino} entregador={posicaoEntregador} />
            ) : (
              <div className={styles.mapaMarcador}>
                <img
                  src={ICONES.endereco}
                  alt="Localização da entrega"
                />
              </div>
            )}

            <div className={styles.mapaLegenda}>
              {posicaoEntregador ? "Entregador a caminho" : "Local de entrega"}
            </div>

          </div>

          {/* DETALHES DA ENTREGA */}
          <div className={styles.detalhesEntrega}>

            <h2>Detalhes da entrega</h2>

            {/* Telefone do entregador não aparece: o link pode ser aberto por qualquer pessoa */}
            {pedido?.entregador && (
              <div className={styles.detalheItem}>

                <div className={styles.detalheIcone}>
                  <img src={ICONES.entregador} alt="" />
                </div>

                <div>
                  <h3>Entregador</h3>
                  <p>{pedido.entregador.nome}</p>
                  <small>{avaliacaoEntregador(pedido.entregador)}</small>
                </div>

              </div>
            )}

            {pedido?.entregador && descricaoVeiculo(pedido.entregador) && (
              <div className={styles.detalheItem}>

                <div className={styles.detalheIcone}>
                  <img src={ICONES.veiculo} alt="" />
                </div>

                <div>
                  <h3>Veículo</h3>
                  <p>{descricaoVeiculo(pedido.entregador)}</p>
                </div>

              </div>
            )}

            <div className={styles.detalheItem}>

              <div className={styles.detalheIcone}>
                <img src={ICONES.endereco} alt="" />
              </div>

              <div>
                <h3>Endereço de entrega</h3>
                <p>
                  {pedido && enderecoRua(pedido) && (
                    <>
                      {enderecoRua(pedido)}
                      <br />
                    </>
                  )}
                  {local || "--"}
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
                {pedido ? aviso(pedido) : ""}
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
              <p>{pedido ? `#${pedido.numeroPedido}` : ""}</p>
              <small>{pedido ? nomeModalidade[pedido.modalidade] : ""}</small>
            </div>

          </div>

          {pedido?.entregador && (
            <div className={styles.resumoItem}>

              <div className={styles.resumoIcone}>
                <img src={ICONES.entrega} alt="" />
              </div>

              <div>
                <h3>Entrega</h3>
                <p>{pedido.entregador.nome}</p>
                <small>{descricaoVeiculo(pedido.entregador)}</small>
              </div>

            </div>
          )}

          <div className={styles.resumoItem}>

            <div className={styles.resumoIcone}>
              <img src={ICONES.loja} alt="" />
            </div>

            <div>
              <h3>Loja</h3>
              <p>{pedido?.nomeLoja ?? ""}</p>
              <small>{pedido?.cidade ?? ""}</small>
            </div>

          </div>

        </div>

      </section>

      <Footer />

    </main>
    </div>
  );
}
