import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import styles from "./perfilConfig.module.css";
import { useState } from "react";

export default function ConfiguracaoEmpresa() {
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
  const [senha, setSenha] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");

  return (
    <main className={styles.container}>
      <section className={styles.dadosPessoaisSeguranca}>
        <article className={styles.dadosPessoais}>
          <header className={styles.cabecalhoCard}>
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
              <label htmlFor="nomeUsuario" className={styles.rotulo}>
                Nome Completo
              </label>
              <input
                id="nomeUsuario"
                name="nome"
                type="text"
                placeholder="Digite seu nome..."
                className={styles.input}
              />
            </div>

            <div className={styles.campo}>
              <label htmlFor="telefone" className={styles.rotulo}>
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
              <label htmlFor="email" className={styles.rotulo}>
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
          <header className={styles.cabecalhoCard}>
            <h2>Segurança</h2>
            <p>Proteja o acesso à sua conta</p>
          </header>

          <section className={styles.cabecalhoSenha}>
            <h3>Senha</h3>
            <button type="button" className={styles.botaoAlterarSenha}>
              Alterar
            </button>
          </section>

          <section className={styles.camposSenhaContainer}>
            <div className={styles.campo}>
              <label htmlFor="senhaAtual" className={styles.rotulo}>
                Senha Atual
              </label>
              <div className={styles.campoSenha}>
                <input
                  id="senhaAtual"
                  name="senhaAtual"
                  type={mostrarSenhaAtual ? "text" : "password"}
                  placeholder="Digite sua senha atual..."
                  className={styles.input}
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenhaAtual((prev) => !prev)}
                  aria-label={
                    mostrarSenhaAtual
                      ? "Ocultar senha atual"
                      : "Mostrar senha atual"
                  }
                  className={styles.botaoEsconderSenha}
                >
                  {mostrarSenhaAtual ? (
                    <IoEyeOffOutline size={24} />
                  ) : (
                    <IoEyeOutline size={24} />
                  )}
                </button>
              </div>
            </div>

            <div className={styles.campo}>
              <label htmlFor="senha" className={styles.rotulo}>
                Nova Senha
              </label>
              <div className={styles.campoSenha}>
                <input
                  id="senha"
                  name="senha"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className={styles.input}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  required
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha((prev) => !prev)}
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  className={styles.botaoEsconderSenha}
                >
                  {mostrarSenha ? (
                    <IoEyeOffOutline size={24} />
                  ) : (
                    <IoEyeOutline size={24} />
                  )}
                </button>
              </div>
            </div>
          </section>
          <section
            className={styles.secaoDuasEtapas}
            aria-labelledby="titulo-2fa"
          >
            <section className={styles.verificacaoSwitch}>

            <section className={styles.verificacoDuasEtapas}>
              <h3 id="titulo-2fa">Verificação em duas etapas</h3>
              <p className={styles.textoAuxiliar}>Código extra ao entrar</p>
            </section>

            <label className={styles.switch}>
              <input
                type="checkbox"
                aria-label="Ativar verificação em duas etapas"
              />
              <span className={styles.slider} />
            </label>
            </section>

            <aside className={styles.bannerSeguranca}>
              <img
                src="/assets/images/entregadorMenu.png"
                alt=""
                className={styles.bannerImagem}
              />
              <hgroup className={styles.bannerTexto}>
                <h4>Proteja sua conta em 1 minuto</h4>
                <p>Ative a verificação em duas etapas</p>
              </hgroup>
              <button type="button" className={styles.botaoBanner}>
                Ativar
              </button>
            </aside>
          </section>
        </article>
      </section>

      <section className={styles.notificacaoSalvarAlteracao}>
        <article className={styles.notificacao}>
          <header className={styles.cabecalhoCard}>
            <h2>Notificações</h2>
            <p>Escolha os avisos que você deseja receber.</p>
          </header>

          <ul className={styles.listaNotificacoes}>
            <li className={styles.itemNotificacao}>
              <hgroup>
                <h3>Ocorrências nas entregas</h3>
                <p className={styles.textoAuxiliar}>
                  Avisos de recusa, ausência ou mercadoria avariada.
                </p>
              </hgroup>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  defaultChecked
                  aria-label="Ocorrências nas entregas"
                />
                <span className={styles.slider} />
              </label>
            </li>

            <li className={styles.itemNotificacao}>
              <hgroup>
                <h3>Alertas de cobrança</h3>
                <p className={styles.textoAuxiliar}>
                  Lembretes de faturas e renovação do plano.
                </p>
              </hgroup>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  defaultChecked
                  aria-label="Alertas de cobrança"
                />
                <span className={styles.slider} />
              </label>
            </li>
          </ul>
        </article>

        <article className={styles.salvarAlteracao}>
          <p>As preferências se aplicam apenas ao seu usuário</p>
          <div className={styles.botoes}>
            <button type="button" className={styles.botaoCancelar}>
              Cancelar
            </button>
            <button type="submit" className={styles.botaoSalvarAlteracao}>
              Salvar Alterações
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}
