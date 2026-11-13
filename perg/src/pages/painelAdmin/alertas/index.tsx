
import {
  alertasDetalhes,
  alertasExemplo,
  incidentesExemplos,
} from "@/mocks/alertas";
import type { Alerta } from "@/types/alerta";
import { corPorIndicador } from "@/types/alerta";
import { useState } from "react";
import styles from "./alertas.module.css";

const classePorSeveridade: Record<Alerta["severidade"], string> = {
  Crítico: styles.critico,
  Alto: styles.alto,
  Médio: styles.medio,
  Baixo: styles.baixo,
};

export default function AlertasIncidentes() {
  const [alertas, setAlertas] = useState(alertasExemplo);
  const [alertaSelecionado, setAlertaSelecionado] = useState<Alerta | null>(null);

  const detalheSelecionado = alertasDetalhes.find(
    (detalhe) => detalhe.id === alertaSelecionado?.id
  );

  function marcarComoResolvido() {
    if (!alertaSelecionado) {
      return;
    }

    const alertaAtualizado = { ...alertaSelecionado, status: "Resolvido" };

    setAlertas((alertasAtuais) =>
      alertasAtuais.map((alerta) =>
        alerta.id === alertaAtualizado.id ? alertaAtualizado : alerta
      )
    );
    setAlertaSelecionado(alertaAtualizado);
  }

  return (
    <section className={styles.paginaAlertas}>
      <div className={styles.indicadores}>
        {incidentesExemplos.map((incidente) => (
          <article
            className={styles.indicador}
            key={incidente.severidade_incidentes}
          >
            <span className={styles.indicadorTitulo}>
              {incidente.severidade_incidentes}
            </span>
            <strong
              className={`${styles.indicadorNumero} ${
                styles[corPorIndicador[incidente.severidade_incidentes]]
              }`}
            >
              {incidente.numero_casos}
            </strong>
          </article>
        ))}
      </div>

      <div className={styles.painelAlertas}>
        <section className={styles.listaAlertas} aria-label="Lista de alertas">
          {alertas.map((alerta) => {
            const classeSeveridade = classePorSeveridade[alerta.severidade];
            const selecionado = alertaSelecionado?.id === alerta.id;

            return (
              <button
                className={`${styles.alertaItem} ${
                  selecionado ? styles.alertaSelecionado : ""
                }`}
                key={alerta.id}
                onClick={() => setAlertaSelecionado(alerta)}
                type="button"
              >
                <strong className={`${styles.severidade} ${classeSeveridade}`}>
                  {alerta.severidade}
                </strong>

                <span className={styles.informacoesAlerta}>
                  <strong className={styles.tituloAlerta}>{alerta.titulo}</strong>
                  <span className={styles.origemAlerta}>{alerta.origem}</span>
                </span>

                <span className={styles.horarioAlerta}>{alerta.horario}</span>
                <span className={`${styles.statusAlerta} ${classeSeveridade}`}>
                  {alerta.status}
                </span>
              </button>
            );
          })}
        </section>

        <section className={styles.detalheAlerta} aria-label="Detalhes do alerta">
          {alertaSelecionado && detalheSelecionado ? (
            <>
              <div className={styles.conteudoDetalhe}>
                <div className={styles.cabecalhoDetalhe}>
                  <strong
                    className={`${styles.severidade} ${
                      classePorSeveridade[alertaSelecionado.severidade]
                    }`}
                  >
                    {alertaSelecionado.severidade.toUpperCase()}
                  </strong>
                  <h2 className={styles.tituloDetalhe}>
                    {alertaSelecionado.titulo}
                  </h2>
                </div>

                <p className={styles.descricaoDetalhe}>
                  {detalheSelecionado.Descricao}
                </p>

                <div className={styles.linhaTempo}>
                  {[
                    {
                      horario: detalheSelecionado.horario1,
                      acontecimento: detalheSelecionado.acontecimento1,
                    },
                    {
                      horario: detalheSelecionado.horario2,
                      acontecimento: detalheSelecionado.acontecimento2,
                    },
                    {
                      horario: detalheSelecionado.horario3,
                      acontecimento: detalheSelecionado.acontecimento3,
                    },
                    {
                      horario: detalheSelecionado.horario4,
                      acontecimento: detalheSelecionado.acontecimento4,
                    },
                  ].map((evento) => (
                    <div className={styles.evento} key={evento.horario}>
                      <span>{evento.horario}</span>
                      <strong>{evento.acontecimento}</strong>
                    </div>
                  ))}
                </div>
              </div>

              <div className={styles.acoesDetalhe}>
                <button
                  className={styles.botaoResolver}
                  disabled={alertaSelecionado.status === "Resolvido"}
                  onClick={marcarComoResolvido}
                  type="button"
                >
                  {alertaSelecionado.status === "Resolvido"
                    ? "Resolvido"
                    : "Marcar como resolvido"}
                </button>
                <button className={styles.botaoAtribuir} type="button">
                  Atribuir
                </button>
              </div>
            </>
          ) : (
            <p className={styles.detalheVazio}>
              Selecione um alerta para ver os detalhes.
            </p>
          )}
        </section>
      </div>
    </section>
  );
}
