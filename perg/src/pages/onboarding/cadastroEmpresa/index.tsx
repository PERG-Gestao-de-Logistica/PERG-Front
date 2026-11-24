import { useState } from "react";
import styles from "./cadastroEmpresa.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import { useOnboarding } from "@/contexts/OnboardingContext";
import { SEGMENTOS, type SegmentoEmpresa } from "@/@types/autenticacao";

const opcoesAcesso = [
  { nome: "Entrar", rota: "/login" },
  { nome: "Criar conta", rota: "/onboarding/cadastroConta" },
];

const etapasCadastro = ["Conta", "Empresa", "Operação", "Coleta"];

export default function CadastroEmpresa() {
  const router = useRouter();
  const rotaAtual = (
    router.pathname ||
    router.asPath ||
    "/onboarding/cadastroEmpresa"
  );

  const { dados, salvar } = useOnboarding();
  const [cnpj, setCnpj] = useState(dados.empresa?.cnpj ?? "");
  const [razaoSocial, setRazaoSocial] = useState(dados.empresa?.razaoSocial ?? "");
  const [nomeFantasia, setNomeFantasia] = useState(dados.empresa?.nomeFantasia ?? "");
  const [segmento, setSegmento] = useState<SegmentoEmpresa>(dados.empresa?.segmento ?? "Alimentacao");
  const [pedidosPorDia, setPedidosPorDia] = useState(dados.empresa?.faixaPedidosDia ?? "100 a 500");
  const [erro, setErro] = useState("");

  // Etapa atual (1 = Empresa)
  const etapaAtual = 1;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (cnpj.replace(/\D/g, "").length !== 14) return setErro("Digite os 14 números do CNPJ.");
    salvar({ empresa: { cnpj, razaoSocial, nomeFantasia, segmento, faixaPedidosDia: pedidosPorDia } });
    router.push("/onboarding/cadastroOperacao");
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
        <section className={styles.criarConta} aria-labelledby="tituloEmpresa">
          <header className={styles.cabecalho}>
            <img
              src="/assets/logos/logoVerde.png"
              alt="PERG"
              className={styles.logo}
            />
            <h1 id="tituloEmpresa" className={styles.titulo}>
              Sua empresa
            </h1>
            <p className={styles.subtitulo}>
              Digite o CNPJ e preenchemos o resto.
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

          <form className={styles.formulario} onSubmit={handleSubmit}>
            <div className={styles.campo}>
              <label htmlFor="cnpj" className={styles.rotulo}>
                CNPJ
              </label>
              <input
                id="cnpj"
                name="cnpj"
                type="text"
                inputMode="numeric"
                placeholder="11.222.333/4441-55"
                value={cnpj}
                onChange={(e) => setCnpj(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.linhaDupla}>
              <div className={styles.campo}>
                <label htmlFor="razaoSocial" className={styles.rotulo}>
                  Razão social
                </label>
                <input
                  id="razaoSocial"
                  name="razaoSocial"
                  type="text"
                  placeholder="Digite a razão social"
                  value={razaoSocial}
                  onChange={(e) => setRazaoSocial(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>

              <div className={styles.campo}>
                <label htmlFor="nomeFantasia" className={styles.rotulo}>
                  Nome fantasia
                </label>
                <input
                  id="nomeFantasia"
                  name="nomeFantasia"
                  type="text"
                  placeholder="Digite o nome"
                  value={nomeFantasia}
                  onChange={(e) => setNomeFantasia(e.target.value)}
                  className={styles.input}
                  required
                />
              </div>
            </div>

            <div className={styles.linhaDupla}>
              <div className={styles.campo}>
                <label htmlFor="segmento" className={styles.rotulo}>
                  Segmento
                </label>
                <select
                  id="segmento"
                  name="segmento"
                  value={segmento}
                  onChange={(e) => setSegmento(e.target.value as SegmentoEmpresa)}
                  className={`${styles.input} ${styles.select}`}
                >
                  {SEGMENTOS.map((s) => (
                    <option key={s.valor} value={s.valor}>
                      {s.rotulo}
                    </option>
                  ))}
                </select>
              </div>

              <div className={styles.campo}>
                <label htmlFor="pedidosPorDia" className={styles.rotulo}>
                  Pedidos por dia
                </label>
                <select
                  id="pedidosPorDia"
                  name="pedidosPorDia"
                  value={pedidosPorDia}
                  onChange={(e) => setPedidosPorDia(e.target.value)}
                  className={`${styles.input} ${styles.select}`}
                >
                  <option value="50 a 100">50 a 100</option>
                  <option value="100 a 500">100 a 500</option>
                  <option value="500 a 1.000">500 a 1.000</option>
                  <option value="Acima de 1.000">Acima de 1.000</option>
                </select>
              </div>
            </div>

            {erro && (
              <p role="alert" style={{ color: "#d33", fontSize: 14, margin: 0 }}>
                {erro}
              </p>
            )}

            <div className={styles.grupoBotoes}>
              <Link
                href="/onboarding/cadastroConta"
                className={styles.botaoVoltar}
              >
                Voltar
              </Link>

              <button type="submit" className={styles.botaoEntrar}>
                Continuar
              </button>
            </div>
          </form>
        </section>
      </main>
    </div>
  );
}
