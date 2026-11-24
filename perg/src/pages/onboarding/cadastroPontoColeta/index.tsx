import { useState } from "react";
import styles from "./cadastroPontoColeta.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { IoTimeOutline } from "react-icons/io5";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { useAuth } from "@/hooks/useAuth";
import { autenticacaoService } from "@/services/autenticacaoService";
import { buscarCep } from "@/services/cepService";

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
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [abreSabado, setAbreSabado] = useState(false);
  const [abreDomingo, setAbreDomingo] = useState(false);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  const { montarCadastro, limpar } = useOnboarding();
  const { entrar } = useAuth();

  // Ao sair do campo CEP, completa o endereço pelo ViaCEP
  const completarPeloCep = async () => {
    const achado = await buscarCep(cep);
    if (!achado) {
      setErro("CEP não encontrado. Confira o número.");
      return;
    }
    setErro("");
    setEndereco((atual) => atual || achado.logradouro);
    setBairro(achado.bairro);
    setCidade(achado.cidade);
    setUf(achado.uf);
  };

  // Etapa atual (3 = Coleta - todas as 4 barras)
  const etapaAtual = 3;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!uf) return setErro("Digite um CEP válido para completar cidade e UF.");
    setErro("");
    setEnviando(true);
    try {
      const cadastro = montarCadastro({
        cep, logradouro: endereco, numero, complemento, bairro, cidade, uf,
        abre: abreAs, fecha: fechaAs, abreSabado, abreDomingo,
      });
      await autenticacaoService.cadastrarEmpresa(cadastro);
      await entrar(cadastro.responsavel.email, cadastro.responsavel.senha);
      limpar();
      router.push("/painelEmpresa/visaoGeral");
    } catch (erroCadastro) {
      setErro((erroCadastro as Error).message);
    } finally {
      setEnviando(false);
    }
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
                  onBlur={completarPeloCep}
                  className={styles.input}
                  required
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
                  required
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
                  required
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
                <label htmlFor="bairro" className={styles.rotulo}>
                  Bairro
                </label>
                <input
                  id="bairro"
                  name="bairro"
                  type="text"
                  placeholder="Preenchido pelo CEP"
                  value={bairro}
                  onChange={(e) => setBairro(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.campo}>
                <label htmlFor="cidade" className={styles.rotulo}>
                  Cidade{uf ? ` (${uf})` : ""}
                </label>
                <input
                  id="cidade"
                  name="cidade"
                  type="text"
                  placeholder="Preenchido pelo CEP"
                  value={cidade}
                  readOnly
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

            <div style={{ display: "flex", gap: 24, fontSize: 14 }}>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input type="checkbox" checked={abreSabado} onChange={(e) => setAbreSabado(e.target.checked)} />
                Abre aos sábados
              </label>
              <label style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                <input type="checkbox" checked={abreDomingo} onChange={(e) => setAbreDomingo(e.target.checked)} />
                Abre aos domingos
              </label>
            </div>

            {erro && (
              <p role="alert" style={{ color: "#d33", fontSize: 14, margin: 0 }}>
                {erro}
              </p>
            )}

            <div className={styles.grupoBotoes}>
              <Link
                href="/onboarding/cadastroOperacao"
                className={styles.botaoVoltar}
              >
                Voltar
              </Link>

              <button type="submit" className={styles.botaoEntrar} disabled={enviando}>
                {enviando ? "Criando conta..." : "Criar conta e entrar"}
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}