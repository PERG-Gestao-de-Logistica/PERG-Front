"use client";

import { useState } from "react";
import { FiCheck, FiPlus, FiPackage, FiMessageSquare, FiImage, FiDownload, FiFileText } from "react-icons/fi";
import { TbRoute, TbTruckDelivery } from "react-icons/tb";
import { BsCheckCircleFill } from "react-icons/bs";
import Status, { type TipoStatus } from "@/components/status/status";
import styles from "./itemPedido.module.css";

export type TipoEventoHistorico =
  | "criado"
  | "roteirizado"
  | "coletado"
  | "avisado"
  | "saiuEntrega"
  | "entregue";

export interface EventoHistoricoPedido {
  id: string;
  tipo: TipoEventoHistorico;
  titulo: string;
  descricao: string;
  horario: string;
}

export interface Pedido {
  id: string;
  codigo: string;
  cliente: string;
  endereco: string;
  bairro: string;
  peso: string;
  status: Extract<
    TipoStatus,
    "novo" | "roteirizado" | "emRota" | "entregue" | "ocorrencia"
  >;
  historico: EventoHistoricoPedido[];
  entrega?: {
    entregadorNome: string;
    entregadorIniciais: string;
    veiculo: string;
    placa: string;
    codigoRota: string;
    janela: string;
    horarioEntrega: string;
    distancia: string;
    frete: string;
    observacao?: string;
  };
  comprovante?: {
    fotoUrl?: string;
    recebidoPor?: string;
    codigoValidado?: boolean;
  };
}

interface ItemPedidoProps {
  pedido: Pedido;
  selecionado: boolean;
  expandidoInicialmente?: boolean;
  onAlternarSelecao: (id: string) => void;
  onAbrirRastreio?: (pedido: Pedido) => void;
  onBaixarPdf?: (pedido: Pedido) => void;
}

function renderizarIconeEvento(tipo: TipoEventoHistorico) {
  switch (tipo) {
    case "criado":
      return <FiPlus aria-hidden="true" />;
    case "roteirizado":
      return <TbRoute aria-hidden="true" />;
    case "coletado":
      return <FiPackage aria-hidden="true" />;
    case "avisado":
      return <FiMessageSquare aria-hidden="true" />;
    case "saiuEntrega":
      return <TbTruckDelivery aria-hidden="true" />;
    case "entregue":
      return <BsCheckCircleFill aria-hidden="true" />;
  }
}

export default function ItemPedido({
  pedido,
  selecionado,
  expandidoInicialmente = false,
  onAlternarSelecao,
  onAbrirRastreio,
  onBaixarPdf,
}: ItemPedidoProps) {
  const [expandido, setExpandido] = useState<boolean>(expandidoInicialmente);

  const destacado = selecionado || expandido;

  return (
    <li
      className={`${styles.itemLista} ${
        destacado ? styles.itemDestacado : ""
      } ${expandido ? styles.itemExpandido : ""}`}
    >
      <section
        role="button"
        tabIndex={0}
        aria-expanded={expandido}
        onClick={() => setExpandido((prev) => !prev)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setExpandido((prev) => !prev);
          }
        }}
        className={styles.linhaResumo}
      >
        <button
          type="button"
          role="checkbox"
          aria-checked={selecionado}
          aria-label={`Selecionar pedido ${pedido.codigo}`}
          onClick={(e) => {
            e.stopPropagation();
            onAlternarSelecao(pedido.id);
          }}
          className={`${styles.checkbox} ${
            selecionado ? styles.checkboxAtivo : ""
          }`}
        >
          {selecionado && <FiCheck aria-hidden="true" />}
        </button>

        <strong className={styles.codigoPedido}>{pedido.codigo}</strong>

        <div className={styles.colunaCliente}>
          <h4>{pedido.cliente}</h4>
          <p>{pedido.endereco}</p>
        </div>

        <p className={styles.colunaBairro}>{pedido.bairro}</p>

        <p className={styles.colunaPeso}>{pedido.peso}</p>

        <div className={styles.colunaStatus}>
          <Status status={pedido.status} />
        </div>
      </section>

      {expandido && (
        <section
          className={styles.detalhesAccordion}
          aria-label={`Detalhes do pedido ${pedido.codigo}`}
        >
          <section className={styles.colunaDetalhe}>
            <h5 className={styles.tituloDetalhe}>Histórico do pedido</h5>

            <ol className={styles.listaHistorico}>
              {pedido.historico.map((evento) => {
                const isConcluido = evento.tipo === "entregue";
                return (
                  <li key={evento.id} className={styles.itemHistorico}>
                    <p
                      className={`${styles.iconeHistorico} ${
                        isConcluido ? styles.iconeHistoricoConcluido : ""
                      }`}
                    >
                      {renderizarIconeEvento(evento.tipo)}
                    </p>

                    <div className={styles.textoHistorico}>
                      <strong>{evento.titulo}</strong>
                      <p>{evento.descricao}</p>
                    </div>

                    <time className={styles.horarioHistorico}>
                      {evento.horario}
                    </time>
                  </li>
                );
              })}
            </ol>
          </section>

          <section className={styles.colunaDetalhe}>
            <h5 className={styles.tituloDetalhe}>Entrega</h5>

            {pedido.entrega ? (
              <section className={styles.conteudoEntrega}>
                <section className={styles.cardEntregadorMini}>
                  <p className={styles.avatarMini} aria-hidden="true">
                    {pedido.entrega.entregadorIniciais}
                  </p>

                  <div className={styles.dadosEntregadorMini}>
                    <strong>{pedido.entrega.entregadorNome}</strong>
                    <p>
                      {pedido.entrega.veiculo} · {pedido.entrega.placa} ·{" "}
                      {pedido.entrega.codigoRota}
                    </p>
                  </div>
                </section>

                <div className={styles.gradeMetricasEntrega}>
                  <div className={styles.boxMetrica}>
                    <p>Janela</p>
                    <strong>{pedido.entrega.janela}</strong>
                  </div>

                  <div className={styles.boxMetrica}>
                    <p>Entregue às</p>
                    <strong>{pedido.entrega.horarioEntrega}</strong>
                  </div>

                  <div className={styles.boxMetrica}>
                    <p>Distância</p>
                    <strong>{pedido.entrega.distancia}</strong>
                  </div>

                  <div className={styles.boxMetrica}>
                    <p>Frete</p>
                    <strong>{pedido.entrega.frete}</strong>
                  </div>
                </div>
              </section>
            ) : (
              <p className={styles.semDadosDetalhe}>
                Aguardando roteirização para atribuir entregador.
              </p>
            )}
          </section>

          <section className={styles.colunaDetalhe}>
            <h5 className={styles.tituloDetalhe}>Comprovante</h5>

            <div className={styles.conteudoComprovante}>
              <div className={styles.boxFotoEntrega}>
                {pedido.comprovante?.fotoUrl ? (
                  <img
                    src={pedido.comprovante.fotoUrl}
                    alt={`Comprovante do pedido ${pedido.codigo}`}
                    className={styles.imagemComprovante}
                  />
                ) : (
                  <FiImage
                    className={styles.iconePlaceholderFoto}
                    aria-hidden="true"
                  />
                )}
                <p className={styles.etiquetaFoto}>foto da entrega</p>
              </div>

              <p className={styles.textoRecebimento}>
                {pedido.comprovante?.recebidoPor ? (
                  <>
                    Recebido por{" "}
                    <strong>{pedido.comprovante.recebidoPor}</strong>
                    {pedido.comprovante.codigoValidado
                      ? " · código validado"
                      : ""}
                  </>
                ) : (
                  "Comprovante disponível após a conclusão da entrega."
                )}
              </p>

              <div className={styles.acoesComprovante}>
                <button
                  type="button"
                  onClick={() => onAbrirRastreio?.(pedido)}
                  className={styles.botaoRastreio}
                >
                  <TbRoute aria-hidden="true" />
                  <p>Rastreio</p>
                </button>

                <button
                  type="button"
                  onClick={() => onBaixarPdf?.(pedido)}
                  className={styles.botaoPdf}
                >
                  <FiDownload aria-hidden="true" />
                  <p>PDF</p>
                </button>
              </div>
            </div>
          </section>
        </section>
      )}
    </li>
  );
}
