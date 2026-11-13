import styles from "./visaoGeralAdmin.module.css";

export default function VisaoGeralAdmin() {
  return (
    <main className={styles.paginaVisaoGeral}>
      <section className={styles.gradePrincipal} aria-label="Resumo da operação">
        <article className={styles.cardEmpresas}>
          <h1>Empresas que podem ter atenção</h1>
          {/* Aqui você colocará a lista/tabela de empresas. */}
        </article>

        <article className={styles.cardServicos}>
          <h1>Status dos serviços</h1>
          {/* Aqui você colocará os serviços e seus status. */}
        </article>
      </section>

      <section className={styles.gradeInferior} aria-label="Atividade recente">
        <article className={styles.cardAlertas}>
          <h1>Alertas recentes</h1>
          {/* Aqui você colocará os alertas recentes. */}
        </article>

        <article className={styles.cardResumo}>
          <h1>Resumo</h1>
          {/* Aqui você colocará o resumo/indicador de empresas. */}
        </article>
      </section>
    </main>
  );
}