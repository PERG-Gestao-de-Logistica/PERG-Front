import styles from "./perfilConfig.module.css";

export default function ConfiguracaoEmpresa() {
  return (
    <main className={styles.container}>
      <section className={styles.dadosPessoaisSeguranca}>
        <article className={styles.dadosPessoais}>
          <h2>Dados Pessoais</h2>
          <p>Como você aparece para sua equipe</p>
          <div className={styles.perfil}>
            <h3 className={styles.iniciais}>AS</h3>

            <div className={styles.infoUsuario}>
              <h3 className={styles.nomeUsuario}>Ana Souza</h3>
              <p className={styles.nomeCargoEmpresa}>Admin - Aurora Store</p>
            </div>
          </div>
           <form className={styles.formulario}>
              <div className={styles.campo}>
                <label htmlFor="nome" className={styles.rotulo}>
                  Nome Completo
                </label>
                <input
                  id="nomeUsuario"
                  name="nome"
                  type="name"
                  placeholder="Digite seu nome..."
                  className={styles.input}
                />
              </div>
              <div className={styles.campo}>
                <label htmlFor="nome" className={styles.rotulo}>
                  Telefone
                </label>
                <input
                  id="telefone"
                  name="telefone"
                  type="tel"
                  placeholder="Digite seu telefone..."
                  className={styles.input}
                />
              </div>
              <div className={styles.campo}>
                <label htmlFor="nome" className={styles.rotulo}>
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Digite seu email..."
                  className={styles.input}
                />
              </div>
            </form>
        </article>
        <article className={styles.seguranca}>
          <h2>Segurança</h2>
        </article>
      </section>
      <article className={styles.notificacao}>
        <h2>Notificações</h2>
      </article>
        <article className={styles.salvarAlteracao}>
        <p>As preferências se aplicam </p>
        <div className={styles.botoes}>
        <button>Cancelar</button>
        <button>Salvar Alterações</button>

        </div>
      </article>
    </main>
  );
}
