import { useState } from "react";
import styles from "./cadastroPontoColeta.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoTimeOutline } from "react-icons/io5";

const opcoesAcesso = [
  { nome: "Entrar", rota: "/login" },
  { nome: "Criar conta", rota: "/onboarding/cadastroConta" },
];

const etapasCadastro = ["Conta", "Empresa", "Operação", "Coleta"];

export default function CadastroPontoColeta() {
  const router = useRouter();
  const rotaAtual = (
    router.pathname ||
    router.asPath ||
    "/onboarding/cadastroPontoColeta"
  ).toLowerCase();

  const [cep, setCep] = useState("");
  const [numero, setNumero] = useState("");
  const [endereco, setEndereco] = useState("");
  const [complemento, setComplemento] = useState("");
  const [abreAs, setAbreAs] = useState("09:00");
  const [fechaAs, setFechaAs] = useState("18:00");

  // Etapa atual (3 = Coleta - todas as 4 barras)
  const etapaAtual = 3;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/painelEmpresa/visaoGeral");
  };

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
        <section className={styles.criarConta} aria-labelledby="tituloColeta">
          <header className={styles.cabecalho}>
            <img
              src="/assets/logos/logoVerde.png"
              alt="PERG"
              className={styles.logo}
            />
            <h1 id="tituloColeta" className={styles.titulo}>
              Ponto de coleta
            </h1>
            <p className={styles.subtitulo}>De onde saem as suas entregas.</p>
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

          <form className={styles.formulario} onSubmit={handleSubmit}>
            <div className={styles.linhaDupla}>
              <div className={styles.campo}>
                <label htmlFor="cep" className={styles.rotulo}>
                  CEP
                </label>
                <input
                  id="cep"
                  name="cep"
                  type="text"
                  inputMode="numeric"
                  placeholder="05415-100"
                  value={cep}
                  onChange={(e) => setCep(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.campo}>
                <label htmlFor="numero" className={styles.rotulo}>
                  Número
                </label>
                <input
                  id="numero"
                  name="numero"
                  type="text"
                  placeholder="315"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>
            <div className={styles.linhaDupla}>
              <div className={styles.campo}>
                <label htmlFor="endereco" className={styles.rotulo}>
                  Endereço
                </label>
                <input
                  id="endereco"
                  name="endereco"
                  type="text"
                  placeholder="Av. Paulista"
                  value={endereco}
                  onChange={(e) => setEndereco(e.target.value)}
                  className={styles.input}
                />
              </div>

              <div className={styles.campo}>
                <label htmlFor="complemento" className={styles.rotulo}>
                  Complemento
                </label>
                <input
                  id="complemento"
                  name="complemento"
                  type="text"
                  placeholder="Sala 1005"
                  value={complemento}
                  onChange={(e) => setComplemento(e.target.value)}
                  className={styles.input}
                />
              </div>
            </div>

            <div className={styles.linhaDupla}>
              <div className={styles.campo}>
                <label htmlFor="abreAs" className={styles.rotulo}>
                  Abre às
                </label>
                <div className={styles.campoHorario}>
                  <input
                    id="abreAs"
                    name="abreAs"
                    type="time"
                    value={abreAs}
                    onChange={(e) => setAbreAs(e.target.value)}
                    className={`${styles.input} ${styles.inputHorario}`}
                  />
                  <IoTimeOutline
                    className={styles.iconeRelogio}
                    aria-hidden="true"
                  />
                </div>
              </div>

              <div className={styles.campo}>
                <label htmlFor="fechaAs" className={styles.rotulo}>
                  Fecha às
                </label>
                <div className={styles.campoHorario}>
                  <input
                    id="fechaAs"
                    name="fechaAs"
                    type="time"
                    value={fechaAs}
                    onChange={(e) => setFechaAs(e.target.value)}
                    className={`${styles.input} ${styles.inputHorario}`}
                  />
                  <IoTimeOutline
                    className={styles.iconeRelogio}
                    aria-hidden="true"
                  />
                </div>
              </div>
            </div>

            <div className={styles.grupoBotoes}>
              <Link
                href="/onboarding/cadastroOperacao"
                className={styles.botaoVoltar}
              >
                Voltar
              </Link>

              <button type="submit" className={styles.botaoEntrar}>
                Criar conta e entrar
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}