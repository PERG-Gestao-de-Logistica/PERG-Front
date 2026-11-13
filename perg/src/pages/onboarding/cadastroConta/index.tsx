import { useState } from "react";
import styles from "./cadastroConta.module.css";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Link from "next/link";

const opcoesAcesso = [
  { nome: "Entrar", rota: "/login" },
  { nome: "Criar conta", rota: "/onboarding/cadastroConta" },
];

const etapasCadastro = ["Conta", "Empresa", "Operação", "Coleta"];

export default function CadastroConta() {
  const router = useRouter();
  const rotaAtual =
    router.pathname || router.asPath || "/onboarding/cadastroConta";
  const [mostrarSenha, setMostrarSenha] = useState(false);

  // Etapa atual (0 = Conta)
  const etapaAtual = 0;

  return (
    <div className={styles.container}>
      <aside
        className={styles.ilustracaoAside}
        aria-label="Ilustração decorativa"
      >
        <figure className={styles.ilustracaoFigura}>
          <img
            src="/assets/images/ilustracaoLogin.png"
            alt="Entregador de moto em meio a prédios e árvores com pontos de rota"
            className={styles.ilustracaoImagem}
          />
        </figure>
      </aside>

      <main className={styles.conteudoPrincipal}>
        <section className={styles.criarConta} aria-labelledby="tituloCadastro">
          <header className={styles.cabecalho}>
            <img
              src="/assets/logos/logoVerde.png"
              alt="PERG"
              className={styles.logo}
            />
            <h1 id="tituloCadastro" className={styles.titulo}>
              Crie sua conta
            </h1>
            <p className={styles.subtitulo}>
              Leva menos de 5 minutos, sem falar com ninguém.
            </p>
          </header>

          <nav
            className={styles.navegacao}
            aria-label="Alternar modo de acesso"
          >
            {opcoesAcesso.map((opcao) => {
              const isAbaCadastro = opcao.rota
                .toLowerCase()
                .startsWith("/onboarding");
              const ativo = isAbaCadastro
                ? rotaAtual.startsWith("/onboarding")
                : rotaAtual === opcao.rota.toLowerCase();

              return (
                <Link
                  key={opcao.rota}
                  href={opcao.rota}
                  className={`${styles.botaoNavegacao} ${
                    ativo ? styles.botaoNavegacaoAtivo : ""
                  }`}
                  aria-current={ativo ? "page" : undefined}
                >
                  {opcao.nome}
                </Link>
              );
            })}
          </nav>

          <div
            className={styles.progressoEtapas}
            aria-label="Etapas do cadastro"
          >
            {etapasCadastro.map((etapa, index) => {
              const concluidaOuAtual = index <= etapaAtual;
              const isAtual = index === etapaAtual;

              return (
                <div
                  key={etapa}
                  className={styles.etapaItem}
                  aria-current={isAtual ? "step" : undefined}
                >
                  <span
                    className={`${styles.etapaBarra} ${
                      concluidaOuAtual ? styles.etapaBarraAtiva : ""
                    }`}
                  />
                  <span
                    className={`${styles.etapaTexto} ${
                      isAtual ? styles.etapaTextoAtivo : ""
                    }`}
                  >
                    {etapa}
                  </span>
                </div>
              );
            })}
          </div>

          <div className={styles.autenticacao}>
            <button type="button" className={styles.botaoGoogle}>
              <FcGoogle className={styles.iconeGoogle} />
              <span>Cadastrar com Google</span>
            </button>
          </div>

          <div className={styles.divisor} role="separator">
            <span className={styles.divisorTexto}>ou com e-mail</span>
          </div>

          <form className={styles.formulario}>
            <div className={styles.campo}>
              <label htmlFor="nome" className={styles.rotulo}>
                Nome completo
              </label>
              <input
                id="nome"
                name="nome"
                type="text"
                placeholder="Digite seu nome completo"
                className={styles.input}
              />
            </div>

            <div className={styles.linhaDupla}>
              <div className={styles.campo}>
                <label htmlFor="email" className={styles.rotulo}>
                  E-mail corporativo
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Digite seu e-mail"
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
                  placeholder="(11) 98234-5294"
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.campo}>
              <label htmlFor="senha" className={styles.rotulo}>
                Senha
              </label>
              <div className={styles.campoSenha}>
                <input
                  id="senha"
                  name="senha"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Digite sua senha"
                  className={styles.input}
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

            <button type="submit" className={styles.botaoEntrar}>
              Continuar
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
