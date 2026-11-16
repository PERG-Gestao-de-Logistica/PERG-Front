
import styles from "./visaoGeralAdmin.module.css";

export default function VisaoGeralAdmin() {
  const empresas = [
    {
      iniciais: "JJ",
      nome: "Juninho & Juninha",
      plano: "Pro",
      motivo: "Atraso de pagamento",
      indicador: "12 dias - R$ 1.850",
      saude: "Risco",
    },
    {
      iniciais: "VC",
      nome: "Vinho & Cia",
      plano: "Pro",
      motivo: "Uso caiu 80% em 7 dias",
      indicador: "Risco de cancelar",
      saude: "Risco",
    },
  ];

  return (
    <main className={styles.paginaVisaoGeral}>

      {/* GRADE PRINCIPAL */}
      <section className={styles.gradePrincipal} aria-label="Resumo da operação">

        {/* CARD EMPRESAS */}
        <article className={styles.cardEmpresas}>

          <div className={styles.cabecalho_visao}>
            <h1>Empresas que podem ter atenção</h1>
            <a href="#">Ver todos</a>
          </div>

         <div className={styles.colunas}>
            <span>EMPRESAS</span>
            <span>MOTIVO</span>
            <span>INDICADOR</span>
            <span>SAÚDE</span>
          </div>

          {empresas.map((empresa) => (
            <div className={styles.linha} key={empresa.nome}>

              <div className={styles.empresa}>
                <span className={styles.avatar}>
                  {empresa.iniciais}
                </span>

                <div className={styles.area_empresa}>

                <strong>{empresa.nome}</strong>

                <span>{empresa.plano}</span>

              </div>

              </div>

              <span className={styles.motivo}>
                {empresa.motivo}
                </span>

              <span className={styles.indicador}>
                {empresa.indicador}
              </span>

              <span
                className={
                  empresa.saude === "Risco"
                    ? styles.saudeRisco
                    : empresa.saude === "Atenção"
                    ? styles.saudeAtencao
                    : styles.saudeTeste
                }
              >
                {empresa.saude}
              </span>
                  <span className={styles.seta}>›</span>
            </div>
          ))}

        </article>

        {/* CARD STATUS DOS SERVIÇOS */}
        <article className={styles.cardServicos}>
          <h1>Status dos serviços</h1>
          {/* Aqui você colocará os serviços e seus status. */}
        </article>

      </section>

      {/* GRADE INFERIOR */}
      <section className={styles.gradeInferior} aria-label="Atividade recente">

        {/* CARD ALERTAS */}
        <article className={styles.cardAlertas}>
          <h1>Alertas recentes</h1>
          {/* Aqui você colocará os alertas recentes. */}
        </article>

        {/* CARD RESUMO */}
        <article className={styles.cardResumo}>
          <h1>Resumo</h1>
          {/* Aqui você colocará o resumo/indicador de empresas. */}
        </article>

      </section>

    </main>
  );
}
