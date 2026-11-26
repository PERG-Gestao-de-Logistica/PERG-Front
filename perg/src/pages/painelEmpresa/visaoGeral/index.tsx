import { useEffect, useState } from "react";
import Link from "next/link";
import {
  TbRoute,
  TbArrowRight,
  TbMapPin,
  TbUsers,
  TbCircleCheck,
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
  TbCircleNumber4,
} from "react-icons/tb";
import styles from "./visaoGeral.module.css";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { MdOutlineRoute, MdOutlineWatchLater } from "react-icons/md";
import { LuMapPin } from "react-icons/lu";
import CardRotasHoje from "@/components/componentesEmpresa/cardRotasHoje/cardRotasHoje";
import CardOcorrencia from "@/components/componentesEmpresa/cardOcorrencia/cardOcorrência";
import { painelService } from "@/services/painelService";
import { EVENTO_PEDIDO_CRIADO } from "@/services/pedidosService";
import type { ResumoPainel } from "@/@types/painel";
import { useAuth } from "@/hooks/useAuth";
import Esqueleto from "@/components/esqueleto/esqueleto";
import { primeiroNome, saudacao } from "@/utils/painel";

const ATALHOS = [
  { href: "/painelEmpresa/roteirizacao", texto: "Roteirizar os pedidos do dia", Icone: TbRoute },
  { href: "/painelEmpresa/monitoramento", texto: "Acompanhar as entregas em tempo real", Icone: TbMapPin },
  { href: "/painelEmpresa/entregadores", texto: "Ver a rede de entregadores", Icone: TbUsers },
];

const plural = (n: number, um: string, varios: string) => `${n} ${n === 1 ? um : varios}`;

// Frase do card que substitui os Primeiros Passos: o que pede atenção agora
function statusOperacao(r: ResumoPainel) {
  if (r.ocorrenciasAbertas.length > 0)
    return `${plural(r.ocorrenciasAbertas.length, "ocorrência aguardando", "ocorrências aguardando")} a sua atenção.`;
  if (r.rotasEmAndamento > 0)
    return `${plural(r.rotasEmAndamento, "rota na rua", "rotas na rua")} agora. Tudo correndo bem.`;
  return "Tudo em dia por aqui.";
}

const ATUALIZAR_A_CADA_MS = 60_000;

const numero = (valor: number) => valor.toLocaleString("pt-BR");

export default function VisaoGeralEmpresa() {
  const { usuario } = useAuth();
  const [resumo, setResumo] = useState<ResumoPainel | null>(null);
  const [erro, setErro] = useState("");

  // Busca ao abrir e atualiza a cada minuto
  useEffect(() => {
    let ativo = true;
    const buscar = () =>
      painelService
        .resumo()
        .then((r) => {
          if (!ativo) return;
          setResumo(r);
          setErro("");
        })
        .catch((e) => ativo && setErro((e as Error).message));
    buscar();
    const intervalo = setInterval(buscar, ATUALIZAR_A_CADA_MS);
    // Pedido criado pelo modal do cabeçalho: atualiza na hora
    window.addEventListener(EVENTO_PEDIDO_CRIADO, buscar);
    return () => {
      ativo = false;
      clearInterval(intervalo);
      window.removeEventListener(EVENTO_PEDIDO_CRIADO, buscar);
    };
  }, []);

  const passos = resumo
    ? [
        { feito: resumo.primeirosPassos.contaCriada, texto: "Criar conta", Icone: TbCircleNumber1 },
        { feito: resumo.primeirosPassos.pontoColetaCadastrado, texto: "Cadastrar ponto de coleta", Icone: TbCircleNumber2 },
        { feito: resumo.primeirosPassos.entregadorFavorito, texto: "Convidar o primeiro motorista", Icone: TbCircleNumber3 },
        { feito: resumo.primeirosPassos.pedidoCriado, texto: "Importar pedidos", Icone: TbCircleNumber4 },
      ]
    : [];
  const feitos = passos.filter((p) => p.feito).length;
  const mostrarPrimeirosPassos = resumo !== null && feitos < passos.length;
  const carregando = resumo === null && !erro;
  // Enquanto carrega: bloco animado no lugar do número
  const valor = (n: number | undefined) =>
    resumo ? numero(n ?? 0) : carregando ? <Esqueleto largura="5rem" altura="2rem" /> : "--";

  return (
    <main className={styles.container}>
      {erro && (
        <p role="alert" style={{ color: "var(--cor-perigo)", margin: 0 }}>
          Não foi possível carregar a visão geral: {erro}
        </p>
      )}
      {/* O primeiro card sempre ocupa o mesmo espaço, para o grid não se mexer */}
      {resumo === null && (
        <article className={styles.primeirosPassos} aria-busy={carregando} aria-label="Carregando visão geral">
          {carregando && (
            <>
              <div className={styles.conteudo}>
                <Esqueleto largura="9rem" altura="2rem" />
                <Esqueleto largura="80%" altura="1.8rem" />
                <Esqueleto largura="55%" altura="1rem" />
                <div className={styles.lista} style={{ width: "100%", marginTop: "var(--espacamento-lg)", gap: "var(--espacamento-md)" }}>
                  <Esqueleto largura="70%" />
                  <Esqueleto largura="65%" />
                  <Esqueleto largura="60%" />
                </div>
              </div>
              <Esqueleto largura="40%" altura="100%" raio="var(--raio-padrao)" />
            </>
          )}
        </article>
      )}
      {resumo !== null && !mostrarPrimeirosPassos && (
        <article className={`${styles.primeirosPassos} ${styles.cardPronto}`}>
          <div className={styles.conteudo}>
            <h3 className={styles.titulo}>Visão geral</h3>
            <h2 className={styles.subtitulo}>
              {saudacao()}
              {usuario ? `, ${primeiroNome(usuario.nome)}` : ""}!
            </h2>
            <p className={styles.status}>{statusOperacao(resumo)}</p>
            <ul className={styles.lista}>
              {ATALHOS.map(({ href, texto, Icone }) => (
                <li key={href}>
                  <Link href={href} className={styles.atalho}>
                    <Icone className={styles.icone} aria-hidden="true" />
                    {texto}
                    <TbArrowRight className={styles.setaAtalho} aria-hidden="true" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <img src="/assets/images/funcionarioHome.png" alt="" className={styles.imagemPronto} />
        </article>
      )}
      {mostrarPrimeirosPassos && (
      <article className={styles.primeirosPassos}>
        <div className={styles.conteudo}>
          <h3 className={styles.titulo}>Primeiros Passos {feitos} - {passos.length}</h3>
          <h2 className={styles.subtitulo}>
            Falta pouco para a sua primeira rota
          </h2>
          <ul className={styles.lista}>
            {passos.map(({ feito, texto, Icone }) => (
              <li key={texto} style={feito ? { opacity: 0.6, textDecoration: "line-through" } : undefined}>
                {feito ? <TbCircleCheck className={styles.icone} /> : <Icone className={styles.icone} />}
                {texto}
              </li>
            ))}
          </ul>
        </div>
        <img
          src="/assets/images/entregadorMoto.png"
          alt=""
          className={styles.imagem}
        />
      </article>
      )}
      <section className={styles.kpis} aria-label="Indicadores de desempenho">
        <article className={styles.bloco}>
          <header className={styles.cabecalhoKpi}>
            <HiOutlineArchiveBox className={styles.icone} aria-hidden="true" />
            <h3>Pedidos Hoje</h3>
          </header>

          <div className={styles.informacao}>
            <data value={resumo?.pedidosHoje ?? ""}>{valor(resumo?.pedidosHoje)}</data>
          </div>
        </article>

        <article className={styles.bloco}>
          <header className={styles.cabecalhoKpi}>
            <MdOutlineRoute className={styles.icone} aria-hidden="true" />
            <h3>Rotas Ativas</h3>
          </header>

          <div className={`${styles.informacao} ${styles.informacaoRotas}`}>
            <data value={resumo?.rotasAtivas ?? ""}>{valor(resumo?.rotasAtivas)}</data>
            <p>
              {resumo ? `${resumo.rotasEmAndamento} em andamento` : carregando ? <Esqueleto largura="7rem" /> : ""}
            </p>
          </div>
        </article>

        <article className={styles.bloco}>
          <header className={styles.cabecalhoKpi}>
            <MdOutlineWatchLater className={styles.icone} aria-hidden="true" />
            <h3>No Prazo</h3>
          </header>

          <div className={styles.informacao}>
            <data value={resumo?.noPrazoPercentual ?? ""}>
              {resumo?.noPrazoPercentual != null
                ? `${numero(resumo.noPrazoPercentual)}%`
                : carregando
                  ? <Esqueleto largura="5rem" altura="2rem" />
                  : "--"}
            </data>
          </div>
        </article>

        <article className={styles.bloco}>
          <header className={styles.cabecalhoKpi}>
            <LuMapPin className={styles.icone} aria-hidden="true" />
            <h3>KM Rodados</h3>
          </header>

          <div className={styles.informacao}>
            <data value={resumo?.kmRodados ?? ""}>{valor(resumo?.kmRodados)}</data>
          </div>
        </article>
      </section>
      <CardRotasHoje rotas={resumo?.rotasHoje ?? null} />
      <CardOcorrencia ocorrencias={resumo?.ocorrenciasAbertas ?? null} />
    </main>
  );
}
