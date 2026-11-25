import { alertasDetalhes, alertasExemplo, incidentesExemplos } from "@/mocks/alertas";
import { corPorIndicador } from "@/types/alerta";
import type { Alerta } from "@/types/alerta";
import { useState } from "react";

const classePorSeveridade = {
  Crítico: "critico",
  Alto: "alto",
  Médio: "medio",
  Baixo: "baixo",
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
    <main className="alertas-incidentes">
      <div className="alertas-incidentes-slot alertas-incidentes-slot-sidebar" />

      <section className="alertas-incidentes-painel">
        <header className="alertas-incidentes-barra">
          <div className="alertas-incidentes-slot alertas-incidentes-slot-busca" />
          <div className="alertas-incidentes-slot alertas-incidentes-slot-notificacao" />
        </header>

        <div className="alertas-incidentes-slot-titulos">
          <div className="alertas-incidentes-slot alertas-incidentes-slot-titulo" />
          <div className="alertas-incidentes-slot alertas-incidentes-slot-subtitulo" />
        </div>

        <section className="alertas-incidentes-conteudo">
          <div className="alertas-incidentes-indicadores">
            {incidentesExemplos.map((incidente) => (
              <div
                className={`alerta-indicador ${corPorIndicador[incidente.severidade_incidentes]}`}
                key={incidente.id}
              >
                <span>{incidente.severidade_incidentes}</span>
                <strong>{incidente.numero_casos}</strong>
              </div>
            ))}
          </div>

          <div className="alertas-incidentes-grade">
            <div className="alertas-incidentes-slot alertas-incidentes-slot-lista">
              {alertas.map((alerta) => {
                const classe = classePorSeveridade[alerta.severidade];
                const selecionado = alertaSelecionado?.id === alerta.id;

                return (
                  <button
                    type="button"
                    className={`alerta-card ${selecionado ? "selecionado" : ""}`}
                    key={alerta.id}
                    onClick={() => setAlertaSelecionado(alerta)}
                  >
                    <strong className={`alerta-severidade ${classe}`}>
                      {alerta.severidade}
                    </strong>

                    <div className="alerta-informacoes">
                      <span>{alerta.titulo}</span>
                      <span className="texto-cinza-alerta">{alerta.origem}</span>
                    </div>

                    <span className="texto-cinza-alerta">{alerta.horario}</span>

                    <span className={`alerta-status ${classe}`}>
                      {alerta.status}
                    </span>
                  </button>
                );
              })}
            </div>

            <div className="alertas-incidentes-slot alertas-incidentes-slot-detalhe">
              {alertaSelecionado && detalheSelecionado ? (
                <div className="alerta-detalhe">
                  <div className="alerta-detalhe-conteudo">
                    <div className="alerta-detalhe-cabecalho">
                      <strong
                        className={`alerta-severidade ${classePorSeveridade[alertaSelecionado.severidade]}`}
                      >
                        {alertaSelecionado.severidade.toUpperCase()}
                      </strong>
                      <h2>{alertaSelecionado.titulo}</h2>
                    </div>

                    <p className="detalhe-texto">{detalheSelecionado.Descricao}</p>

                    <div className="alerta-detalhe-evento">
                      <span>{detalheSelecionado.horario1}</span>
                      <strong>{detalheSelecionado.acontecimento1}</strong>
                    </div>
                    <div className="alerta-detalhe-evento">
                      <span>{detalheSelecionado.horario2}</span>
                      <strong>{detalheSelecionado.acontecimento2}</strong>
                    </div>
                    <div className="alerta-detalhe-evento">
                      <span>{detalheSelecionado.horario3}</span>
                      <strong>{detalheSelecionado.acontecimento3}</strong>
                    </div>
                    <div className="alerta-detalhe-evento">
                      <span>{detalheSelecionado.horario4}</span>
                      <strong>{detalheSelecionado.acontecimento4}</strong>
                    </div>
                  </div>

                  <div className="alerta-detalhe-acoes">
                    <button
                      type="button"
                      className="alerta-botao-resolver"
                      onClick={marcarComoResolvido}
                      disabled={alertaSelecionado.status === "Resolvido"}
                    >
                      {alertaSelecionado.status === "Resolvido"
                        ? "Resolvido"
                        : "Marcar como resolvido"}
                    </button>
                    <button type="button" className="alerta-botao-atribuir">
                      Atribuir
                    </button>
                  </div>
                </div>
              ) : (
                <p className="texto-espera">Selecione um alerta para ver os detalhes.</p>
              )}
            </div>
          </div>
        </section>
      </section>
    </main>
  );
}