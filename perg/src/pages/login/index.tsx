import { useState } from "react";
import styles from "./login.module.css";
import { FcGoogle } from "react-icons/fc";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import { useRouter } from "next/router";
import Link from "next/link";
import { useAuth } from "@/hooks/useAuth";

const opcoesAcesso = [
  { nome: "Entrar", rota: "/login" },
  { nome: "Criar conta", rota: "/onboarding/cadastroConta" },
];

export default function Login() {
  const router = useRouter();
  const rotaAtual = router.pathname || "/login";
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const { entrar } = useAuth();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);
  const senhaRedefinida = router.query.senhaRedefinida === "1";

  async function enviar(evento: React.FormEvent) {
    evento.preventDefault();
    setErro("");
    setEnviando(true);
    try {
      await entrar(email, senha);
      router.push("/painelEmpresa/visaoGeral");
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setEnviando(false);
    }
  }

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
        <section className={styles.login} aria-labelledby="titulo-login">
          <header className={styles.cabecalho}>
            <img
              src="/assets/logos/logoVerde.png"
              alt="PERG"
              className={styles.logo}
            />
            <h1 id="titulo-login" className={styles.titulo}>
              Bem-vindo de volta
            </h1>
            <p className={styles.subtitulo}>Acesse o painel da sua operação.</p>
          </header>

          <nav
            className={styles.navegacao}
            aria-label="Alternar modo de acesso"
          >
            {opcoesAcesso.map((opcao) => {
              const ativo = rotaAtual === opcao.rota;

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

          <div className={styles.autenticacao}>
            <button type="button" className={styles.botaoGoogle}>
              <FcGoogle className={styles.iconeGoogle} />
              <span>Entrar com Google</span>
            </button>
          </div>

          <div className={styles.divisor} role="separator">
            <span className={styles.divisorTexto}>ou com e-mail</span>
          </div>

          {/* Formulário de Credenciais */}
          <form className={styles.formulario} onSubmit={enviar}>
            <div className={styles.campo}>
              <label htmlFor="email" className={styles.rotulo}>
                E-mail
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu e-mail"
                className={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
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

            <div className={styles.opcoesFormulario}>
              <label htmlFor="lembrar" className={styles.rotuloCheckbox}>
                <input
                  id="lembrar"
                  name="lembrar"
                  type="checkbox"
                  defaultChecked
                  className={styles.checkbox}
                />
                <span>Lembrar de mim</span>
              </label>

              <Link href="/recuperar-senha" className={styles.esqueciSenha}>
                Esqueci minha senha
              </Link>
            </div>

            {senhaRedefinida && !erro && (
              <p role="status" style={{ color: "var(--cor-sucesso)", fontSize: 14, margin: 0 }}>
                Senha redefinida! Entre com a nova senha.
              </p>
            )}

            {erro && (
              <p role="alert" style={{ color: "#d33", fontSize: 14, margin: 0 }}>
                {erro}
              </p>
            )}

            <button type="submit" className={styles.botaoEntrar} disabled={enviando}>
              {enviando ? "Entrando..." : "Entrar"}
            </button>
          </form>
        </section>
      </main>
    </div>
  );
}
