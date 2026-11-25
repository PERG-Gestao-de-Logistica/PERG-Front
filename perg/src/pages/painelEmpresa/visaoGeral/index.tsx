import { useEffect, useState } from "react";
import {
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

const ATUALIZAR_A_CADA_MS = 60_000;

const numero = (valor: number) => valor.toLocaleString("pt-BR");

export default function VisaoGeralEmpresa() {
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
  const valor = (n: number | undefined) => (resumo ? numero(n ?? 0) : "--");

  return (
    <main className={styles.container}>
      {erro && (
        <p role="alert" style={{ color: "var(--cor-perigo)", margin: 0 }}>
          Não foi possível carregar a visão geral: {erro}
        </p>
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
            <p>{resumo ? `${resumo.rotasEmAndamento} em andamento` : ""}</p>
          </div>
        </article>

        <article className={styles.bloco}>
          <header className={styles.cabecalhoKpi}>
            <MdOutlineWatchLater className={styles.icone} aria-hidden="true" />
            <h3>No Prazo</h3>
          </header>

          <div className={styles.informacao}>
            <data value={resumo?.noPrazoPercentual ?? ""}>
              {resumo?.noPrazoPercentual != null ? `${numero(resumo.noPrazoPercentual)}%` : "--"}
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
