"use client";

import { useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdOutlineRoute, MdOutlineWatchLater } from "react-icons/md";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { type RotaMonitoramento } from "@/components/componentesEmpresa/itemMonitoramento/itemMonitoramento";
import CardDetalheEntregador from "@/components/componentesEmpresa/cardDetalhesEntregador/cardDetalhesEntregador";
import CardEntregadores from "@/components/componentesEmpresa/cardEntregadores/cardEntregador";
import type { EntregadorMapa, OrigemMapa } from "@/components/componentesEmpresa/mapaRoteirizacao/mapaRoteirizacao";
import { obterCorRota } from "@/constants/coresRotas";
import { usePosicoesLoja } from "@/hooks/usePosicoesLoja";
import { ocorrenciasService } from "@/services/ocorrenciasService";
import { origensService } from "@/services/origensService";
import { rotasService } from "@/services/rotasService";
import type { Rota } from "@/@types/rota";
import type { Origem } from "@/@types/origem";
import { hojeIso, horaCurta, iniciais, paraRotaGerada } from "@/utils/rota";
import styles from "./monitoramento.module.css";

const MapaRoteirizacao = dynamic(
    () =>
        import("@/components/componentesEmpresa/mapaRoteirizacao/mapaRoteirizacao"),
    {
        ssr: false,
        loading: () => <p className={styles.carregandoMapa}>Carregando mapa...</p>,
    }
);

type FiltroStatus = "todos" | "noPrazo" | "atrasada";

const ATUALIZAR_A_CADA_MS = 30_000;
// Mesma tolerância do painel: até 15 min depois do previsto ainda conta como no prazo
const TOLERANCIA_MS = 15 * 60_000;

const ABERTA = (status: string) => status === "Pendente" || status === "ACaminho";

// Rota da API -> item do monitoramento (status, próxima parada, progresso...)
function paraMonitoramento(rota: Rota, cor: string, origem: [number, number] | null, agora: number): RotaMonitoramento {
    const validas = rota.paradas.filter((p) => p.status !== "Cancelada");
    const concluidas = validas.filter((p) => p.status === "Entregue" || p.status === "Falhou").length;
    const proxima = rota.paradas.find((p) => ABERTA(p.status));
    const previstaProxima = proxima?.chegadaPrevista ? new Date(proxima.chegadaPrevista).getTime() : null;
    const fimPrevisto = rota.fimPrevistoEm ? new Date(rota.fimPrevistoEm).getTime() : null;
    const atrasada =
        (previstaProxima != null && previstaProxima + TOLERANCIA_MS < agora) ||
        (fimPrevisto != null && proxima != null && fimPrevisto + TOLERANCIA_MS < agora);

    return {
        ...paraRotaGerada(rota, cor, origem),
        iniciais: iniciais(rota.entregadorNome ?? rota.codigo),
        placa: rota.veiculoPlaca ?? "Sem placa",
        status: atrasada ? "atrasada" : "noPrazo",
        entregasConcluidas: concluidas,
        entregasTotais: Math.max(validas.length, 1),
        proximaParadaMin: previstaProxima != null ? Math.max(0, Math.round((previstaProxima - agora) / 60_000)) : 0,
        previsaoFim: horaCurta(rota.fimPrevistoEm),
        telefone: rota.entregadorTelefone ?? "",
    };
}

export default function Monitoramento() {
    const [filtro, setFiltro] = useState<FiltroStatus>("todos");
    const [rotaSelecionadaId, setRotaSelecionadaId] = useState<string | null>(null);
    const [rotasDoDia, setRotasDoDia] = useState<Rota[] | null>(null);
    const [ocorrencias, setOcorrencias] = useState<number | null>(null);
    const [origem, setOrigem] = useState<Origem | null>(null);
    const [erro, setErro] = useState("");
    const [agora, setAgora] = useState(() => Date.now());
    const posicoes = usePosicoesLoja();

    // Rotas e ocorrências: ao abrir e a cada 30 s (as posições chegam ao vivo pelo SignalR)
    useEffect(() => {
        let ativo = true;
        const buscar = () => {
            rotasService
                .listarDoDia(hojeIso())
                .then((lista) => {
                    if (!ativo) return;
                    setRotasDoDia(lista);
                    setErro("");
                    setAgora(Date.now());
                })
                .catch((e) => ativo && setErro((e as Error).message));
            ocorrenciasService
                .listar(true)
                .then((lista) => ativo && setOcorrencias(lista.length))
                .catch(() => {});
        };
        buscar();
        const intervalo = setInterval(buscar, ATUALIZAR_A_CADA_MS);
        origensService
            .listar()
            .then((lista) => ativo && setOrigem(lista.find((o) => o.padrao) ?? lista[0] ?? null))
            .catch(() => {});
        return () => {
            ativo = false;
            clearInterval(intervalo);
        };
    }, []);

    const pontoOrigem: [number, number] | null =
        origem?.latitude != null && origem.longitude != null ? [origem.latitude, origem.longitude] : null;
    const origemMapa: OrigemMapa | null =
        pontoOrigem && origem ? { nome: origem.nome, latitude: pontoOrigem[0], longitude: pontoOrigem[1] } : null;

    const rotasComCores: RotaMonitoramento[] = useMemo(
        () =>
            (rotasDoDia ?? [])
                .filter((r) => r.status === "EmAndamento")
                .map((rota, index) => paraMonitoramento(rota, rota.cor ?? obterCorRota(index), pontoOrigem, agora)),
        // eslint-disable-next-line react-hooks/exhaustive-deps
        [rotasDoDia, agora, pontoOrigem?.[0], pontoOrigem?.[1]]
    );

    // Abre com a primeira rota selecionada
    useEffect(() => {
        if (rotasComCores.length === 0) return;
        if (!rotaSelecionadaId || !rotasComCores.some((r) => r.id === rotaSelecionadaId)) {
            setRotaSelecionadaId(rotasComCores[0].id);
        }
    }, [rotasComCores, rotaSelecionadaId]);

    const rotasFiltradas = useMemo(() => {
        if (filtro === "todos") return rotasComCores;
        return rotasComCores.filter((rota) => rota.status === filtro);
    }, [filtro, rotasComCores]);

    const totalNoPrazo = rotasComCores.filter((r) => r.status === "noPrazo").length;
    const totalAtrasados = rotasComCores.filter((r) => r.status === "atrasada").length;

    // Entregas do dia (todas as rotas, menos as canceladas)
    const paradasDoDia = (rotasDoDia ?? [])
        .filter((r) => r.status !== "Cancelada")
        .flatMap((r) => r.paradas)
        .filter((p) => p.status !== "Cancelada");
    const entregues = paradasDoDia.filter((p) => p.status === "Entregue").length;

    const rotaAtiva = rotasComCores.find((r) => r.id === rotaSelecionadaId) ?? rotasComCores[0];

    // Entregador ao vivo de cada rota visível, na cor da rota
    const entregadoresNoMapa: EntregadorMapa[] = rotasFiltradas.flatMap((rota) => {
        const posicao = Object.values(posicoes).find((p) => p.rotaId === rota.id);
        return posicao
            ? [{ id: posicao.entregadorId, nome: posicao.entregadorNome, latitude: Number(posicao.latitude), longitude: Number(posicao.longitude), cor: rota.cor }]
            : [];
    });

    const valor = (n: number | null | undefined, texto?: string) =>
        rotasDoDia === null && !erro ? "--" : texto ?? String(n ?? 0);

    return (
        <main className={styles.conteudo}>
            <section className={styles.kpis} aria-label="Indicadores de monitoramento">
                <article className={styles.bloco}>
                    <header className={styles.cabecalhoKpi}>
                        <MdOutlineRoute className={styles.icone} aria-hidden="true" />
                        <h3>Rotas Ativas</h3>
                    </header>
                    <div className={styles.informacao}>
                        <data value={rotasComCores.length}>{valor(rotasComCores.length)}</data>
                        <p>rotas em andamento</p>
                    </div>
                </article>

                <article className={styles.bloco}>
                    <header className={styles.cabecalhoKpi}>
                        <HiOutlineArchiveBox className={styles.icone} aria-hidden="true" />
                        <h3>Concluídas</h3>
                    </header>
                    <div className={styles.informacao}>
                        <data value={`${entregues}/${paradasDoDia.length}`}>
                            {valor(null, `${entregues}/${paradasDoDia.length}`)}
                        </data>
                        <p>entregas concluídas</p>
                    </div>
                </article>

                <article className={styles.bloco}>
                    <header className={styles.cabecalhoKpi}>
                        <MdOutlineWatchLater className={styles.icone} aria-hidden="true" />
                        <h3>Atrasos</h3>
                    </header>
                    <div className={styles.informacao}>
                        <data value={totalAtrasados} className={totalAtrasados > 0 ? styles.valorAlerta : undefined}>
                            {valor(totalAtrasados)}
                        </data>
                        <p>{totalAtrasados === 1 ? "rota atrasada" : "rotas atrasadas"}</p>
                    </div>
                </article>

                <article className={styles.bloco}>
                    <header className={styles.cabecalhoKpi}>
                        <RiErrorWarningLine className={styles.icone} aria-hidden="true" />
                        <h3>Ocorrências</h3>
                    </header>
                    <div className={styles.informacao}>
                        <data value={ocorrencias ?? 0} className={(ocorrencias ?? 0) > 0 ? styles.valorAlerta : undefined}>
                            {ocorrencias == null ? "--" : ocorrencias}
                        </data>
                        <p>{ocorrencias === 1 ? "ocorrência aberta" : "ocorrências abertas"}</p>
                    </div>
                </article>
            </section>

            {erro && (
                <p role="alert" style={{ color: "var(--cor-perigo)", margin: 0 }}>
                    Não foi possível carregar o monitoramento: {erro}
                </p>
            )}

            <section className={styles.entregadorMapa}>
                <section className={styles.filtroItemEntregador}>
                    <section
                        className={styles.filtro}
                        role="group"
                        aria-label="Filtrar rotas por status"
                    >
                        <button
                            type="button"
                            onClick={() => setFiltro("todos")}
                            className={`${styles.filtroBotao} ${filtro === "todos" ? styles.filtroBotaoAtivo : ""
                                }`}
                            aria-pressed={filtro === "todos"}
                        >
                            Todos - {rotasComCores.length}
                        </button>

                        <button
                            type="button"
                            onClick={() => setFiltro("noPrazo")}
                            className={`${styles.filtroBotao} ${filtro === "noPrazo" ? styles.filtroBotaoAtivo : ""
                                }`}
                            aria-pressed={filtro === "noPrazo"}
                        >
                            No Prazo - {totalNoPrazo}
                        </button>

                        <button
                            type="button"
                            onClick={() => setFiltro("atrasada")}
                            className={`${styles.filtroBotao} ${filtro === "atrasada" ? styles.filtroBotaoAtivo : ""
                                }`}
                            aria-pressed={filtro === "atrasada"}
                        >
                            Atrasados - {totalAtrasados}
                        </button>
                    </section>

                    <CardEntregadores
                        rotas={rotasFiltradas}
                        rotaSelecionadaId={rotaSelecionadaId}
                        onSelecionarRota={setRotaSelecionadaId}
                    />
                </section>

                <section className={styles.mapa} aria-label="Mapa de monitoramento">
                    <MapaRoteirizacao
                        rotas={rotasFiltradas}
                        rotaSelecionadaId={rotaSelecionadaId}
                        origem={origemMapa}
                        entregadores={entregadoresNoMapa}
                    />

                    {rotaAtiva && <CardDetalheEntregador rota={rotaAtiva} />}
                </section>
            </section>
        </main>
    );
}
