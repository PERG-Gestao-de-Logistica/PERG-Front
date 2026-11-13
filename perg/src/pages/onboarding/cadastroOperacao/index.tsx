import { useState } from "react";
import styles from "./cadastroOperacao.module.css";
import { useRouter } from "next/router";
import Link from "next/link";
import {
  IoCheckmarkCircle,
  IoCalendarOutline,
  IoStorefrontOutline,
  IoGlobeOutline,
  IoLogoWhatsapp,
  IoBagHandleOutline,
  IoCarOutline,
  IoBicycleOutline,
  IoBusOutline,
  IoFlashOutline,
} from "react-icons/io5";

const opcoesAcesso = [
  { nome: "Entrar", rota: "/login" },
  { nome: "Criar conta", rota: "/onboarding/cadastroConta" },
];

const etapasCadastro = ["Conta", "Empresa", "Operação", "Coleta"];

const opcoesEntrega = [
  { id: "mesmo-dia", label: "Mesmo dia", icon: IoFlashOutline },
  { id: "agendada", label: "Agendada", icon: IoCalendarOutline },
  { id: "retirada", label: "Retirada na loja", icon: IoStorefrontOutline },
];

const opcoesCanais = [
  { id: "site", label: "Site próprio", icon: IoGlobeOutline },
  { id: "whatsapp", label: "WhatsApp", icon: IoLogoWhatsapp },
  { id: "shopify", label: "Shopify", icon: IoBagHandleOutline },
];

const opcoesVeiculos = [
  { id: "carro", label: "Carro", icon: IoCarOutline },
  { id: "moto", label: "Moto", icon: IoBicycleOutline },
  { id: "van-caminhao", label: "Van/Caminhão", icon: IoBusOutline },
];

export default function CadastroOperacao() {
  const router = useRouter();
  const rotaAtual = (
    router.pathname ||
    router.asPath ||
    "/onboarding/cadastroOperacao"
  );

  const [entregasSelecionadas, setEntregasSelecionadas] = useState<string[]>([]);
  const [canaisSelecionados, setCanaisSelecionados] = useState<string[]>([]);
  const [veiculosSelecionados, setVeiculosSelecionados] = useState<string[]>([]);

  // Etapa atual (2 = Operação)
  const etapaAtual = 2;

  const alternarSelecao = (
    id: string,
    listaAtual: string[],
    setLista: React.Dispatch<React.SetStateAction<string[]>>,
  ) => {
    setLista((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id],
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push("/onboarding/cadastroPontoColeta");
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
        <section className={styles.criarConta} aria-labelledby="tituloOperacao">
          <header className={styles.cabecalho}>
            <img
              src="/assets/logos/logoVerde.png"
              alt="PERG"
              className={styles.logo}
            />
            <h1 id="tituloOperacao" className={styles.titulo}>
              Sua operação
            </h1>
            <p className={styles.subtitulo}>
              Conte como você entrega para sugerirmos as rotas.
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
            <fieldset className={styles.grupoOpcoes}>
              <legend className={styles.rotulo}>Como você entrega?</legend>
              <div className={styles.gradeOpcoes}>
                {opcoesEntrega.map(({ id, label, icon: Icon }) => {
                  const selecionado = entregasSelecionadas.includes(id);

                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={selecionado}
                      onClick={() =>
                        alternarSelecao(
                          id,
                          entregasSelecionadas,
                          setEntregasSelecionadas,
                        )
                      }
                      className={`${styles.cardOpcao} ${
                        selecionado ? styles.cardOpcaoSelecionado : ""
                      }`}
                    >
                      {selecionado ? (
                        <IoCheckmarkCircle className={styles.iconeCheck} />
                      ) : (
                        <Icon className={styles.iconeOpcao} />
                      )}
                      <span className={styles.textoOpcao}>{label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className={styles.grupoOpcoes}>
              <legend className={styles.rotulo}>Canais de venda</legend>
              <div className={styles.gradeOpcoes}>
                {opcoesCanais.map(({ id, label, icon: Icon }) => {
                  const selecionado = canaisSelecionados.includes(id);

                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={selecionado}
                      onClick={() =>
                        alternarSelecao(
                          id,
                          canaisSelecionados,
                          setCanaisSelecionados,
                        )
                      }
                      className={`${styles.cardOpcao} ${
                        selecionado ? styles.cardOpcaoSelecionado : ""
                      }`}
                    >
                      {selecionado ? (
                        <IoCheckmarkCircle className={styles.iconeCheck} />
                      ) : (
                        <Icon className={styles.iconeOpcao} />
                      )}
                      <span className={styles.textoOpcao}>{label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <fieldset className={styles.grupoOpcoes}>
              <legend className={styles.rotulo}>
                Veículos que serão utilizados
              </legend>
              <div className={styles.gradeOpcoes}>
                {opcoesVeiculos.map(({ id, label, icon: Icon }) => {
                  const selecionado = veiculosSelecionados.includes(id);

                  return (
                    <button
                      key={id}
                      type="button"
                      aria-pressed={selecionado}
                      onClick={() =>
                        alternarSelecao(
                          id,
                          veiculosSelecionados,
                          setVeiculosSelecionados,
                        )
                      }
                      className={`${styles.cardOpcao} ${
                        selecionado ? styles.cardOpcaoSelecionado : ""
                      }`}
                    >
                      {selecionado ? (
                        <IoCheckmarkCircle className={styles.iconeCheck} />
                      ) : (
                        <Icon className={styles.iconeOpcao} />
                      )}
                      <span className={styles.textoOpcao}>{label}</span>
                    </button>
                  );
                })}
              </div>
            </fieldset>

            <div className={styles.grupoBotoes}>
              <Link
                href="/onboarding/cadastroEmpresa"
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
