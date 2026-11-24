import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoEyeOutline, IoEyeOffOutline } from "react-icons/io5";
import styles from "../login/login.module.css";
import { autenticacaoService } from "@/services/autenticacaoService";

// le****@gmail.com: mostra só o começo do nome e o domínio
function mascararEmail(email: string) {
  const [nome, dominio] = email.split("@");
  if (!dominio) return email;
  return `${nome.slice(0, 2)}${"*".repeat(Math.max(nome.length - 2, 3))}@${dominio}`;
}

// Etapa 1: e-mail → código por e-mail. Etapa 2: código + nova senha.
export default function RecuperarSenha() {
  const router = useRouter();
  const [etapa, setEtapa] = useState<1 | 2>(1);
  const [email, setEmail] = useState("");
  const [codigo, setCodigo] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmacao, setConfirmacao] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");
  const [enviando, setEnviando] = useState(false);

  async function executar(acao: () => Promise<void>) {
    setErro("");
    setEnviando(true);
    try {
      await acao();
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setEnviando(false);
    }
  }

  const enviarCodigo = (evento: React.FormEvent) => {
    evento.preventDefault();
    executar(async () => {
      await autenticacaoService.esqueciSenha(email);
      setEtapa(2);
    });
  };

  const reenviarCodigo = () =>
    executar(async () => {
      await autenticacaoService.esqueciSenha(email);
      setAviso("Novo código enviado.");
    });

  const redefinir = (evento: React.FormEvent) => {
    evento.preventDefault();
    if (novaSenha.length < 8) return setErro("A senha precisa ter pelo menos 8 caracteres.");
    if (novaSenha !== confirmacao) return setErro("As senhas não são iguais.");
    executar(async () => {
      await autenticacaoService.redefinirSenha(email, codigo.trim(), novaSenha);
      router.push("/login?senhaRedefinida=1");
    });
  };

  return (
    <div className={styles.container}>
      <aside className={styles.ilustracaoAside} aria-label="Ilustração decorativa">
        <figure className={styles.ilustracaoFigura}>
          <img
            src="/assets/images/ilustracaoLogin.png"
            alt="Entregador de moto em meio a prédios e árvores com pontos de rota"
            className={styles.ilustracaoImagem}
          />
        </figure>
      </aside>

      <main className={styles.conteudoPrincipal}>
        <section className={styles.login} aria-labelledby="titulo-recuperar">
          <header className={styles.cabecalho}>
            <img src="/assets/logos/logoVerde.png" alt="PERG" className={styles.logo} />
            <h1 id="titulo-recuperar" className={styles.titulo}>
              {etapa === 1 ? "Esqueceu sua senha?" : "Crie uma nova senha"}
            </h1>
            <p className={styles.subtitulo}>
              {etapa === 1
                ? "Enviaremos um código para o seu e-mail."
                : `Se existir uma conta com ${mascararEmail(email)}, enviamos um código de 6 dígitos.`}
            </p>
          </header>

          {etapa === 1 ? (
            <form className={styles.formulario} onSubmit={enviarCodigo}>
              <div className={styles.campo}>
                <label htmlFor="email" className={styles.rotulo}>
                  E-mail
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Digite seu e-mail"
                  className={styles.input}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {erro && <p role="alert" style={{ color: "var(--cor-perigo)", fontSize: 14, margin: 0 }}>{erro}</p>}

              <button type="submit" className={styles.botaoEntrar} disabled={enviando}>
                {enviando ? "Enviando..." : "Enviar código"}
              </button>
            </form>
          ) : (
            <form className={styles.formulario} onSubmit={redefinir}>
              <div className={styles.campo}>
                <label htmlFor="codigo" className={styles.rotulo}>
                  Código recebido
                </label>
                <input
                  id="codigo"
                  type="text"
                  inputMode="numeric"
                  maxLength={6}
                  placeholder="000000"
                  className={styles.input}
                  value={codigo}
                  onChange={(e) => setCodigo(e.target.value.replace(/\D/g, ""))}
                  required
                />
              </div>

              <div className={styles.campo}>
                <label htmlFor="novaSenha" className={styles.rotulo}>
                  Nova senha
                </label>
                <div className={styles.campoSenha}>
                  <input
                    id="novaSenha"
                    type={mostrarSenha ? "text" : "password"}
                    placeholder="Mínimo de 8 caracteres"
                    className={styles.input}
                    value={novaSenha}
                    onChange={(e) => setNovaSenha(e.target.value)}
                    minLength={8}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setMostrarSenha((v) => !v)}
                    aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                    className={styles.botaoEsconderSenha}
                  >
                    {mostrarSenha ? <IoEyeOffOutline size={24} /> : <IoEyeOutline size={24} />}
                  </button>
                </div>
              </div>

              <div className={styles.campo}>
                <label htmlFor="confirmacao" className={styles.rotulo}>
                  Confirme a nova senha
                </label>
                <input
                  id="confirmacao"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Repita a nova senha"
                  className={styles.input}
                  value={confirmacao}
                  onChange={(e) => setConfirmacao(e.target.value)}
                  required
                />
              </div>

              {erro && <p role="alert" style={{ color: "var(--cor-perigo)", fontSize: 14, margin: 0 }}>{erro}</p>}

              <button type="submit" className={styles.botaoEntrar} disabled={enviando}>
                {enviando ? "Salvando..." : "Redefinir senha"}
              </button>

              <p style={{ margin: 0, textAlign: "center", fontSize: 14, color: "var(--cor-texto-secundario)" }}>
                {aviso || "Não recebeu? "}
                {!aviso && (
                  <button
                    type="button"
                    className={styles.esqueciSenha}
                    onClick={reenviarCodigo}
                    disabled={enviando}
                    style={{ background: "none", border: "none", padding: 0, cursor: "pointer" }}
                  >
                    Reenviar código
                  </button>
                )}
              </p>
            </form>
          )}

          <p style={{ marginTop: 24, textAlign: "center" }}>
            <Link href="/login" className={styles.esqueciSenha}>
              Voltar para o login
            </Link>
          </p>
        </section>
      </main>
    </div>
  );
}
