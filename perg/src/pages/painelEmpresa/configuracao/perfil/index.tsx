import styles from "./perfilConfig.module.css";

export default function ConfiguracaoEmpresa() {
  return (
    <main className={styles.container}>
      <section className={styles.dadosPessoaisSeguranca}>
        <article className={styles.dadosPessoais}>
          <header>
            <h2>Dados Pessoais</h2>
            <p>Como você aparece para sua equipe</p>
          </header>
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
          <header>
            <h2>Segurança</h2>
            <p>Proteja o acesso à sua conta</p>
          </header>
          <section>
          <h3>Senha</h3>
          <button>Alterar</button>
          </section>
          <section>
            <div className={styles.campo}>
              <label htmlFor="nome" className={styles.rotulo}>
                Senha Antiga
              </label>
              <input
                id="senha"
                name="senha"
                type="password"
                placeholder="****" // TODO: colocar a senha antiga oara visualização no padrão oculto
                className={styles.input}
              />
            </div>
              <div className={styles.campo}>
              <label htmlFor="nome" className={styles.rotulo}>
                Nova Senha
              </label>
              <input
                id="senha"
                name="senha"
                type="password"
                placeholder="Digite sua nova senha..." 
                className={styles.input}
              />
            </div>

          </section>

        </article>
      </section>
      <section className={styles.notificacaoSalvarAlteracao}>
        <article className={styles.notificacao}>
          <h2>Notificações</h2>
        </article>
        <article className={styles.salvarAlteracao}>
          <p>As preferências se aplicam apenas ao seu usuário</p>
          <div className={styles.botoes}>
            <button className={styles.botaoCancelar}>Cancelar</button>
            <button className={styles.botaoSalvarAlteracao}>
              Salvar Alterações
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}
