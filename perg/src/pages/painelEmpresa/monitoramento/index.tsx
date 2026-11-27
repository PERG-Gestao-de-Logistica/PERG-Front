"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { RiErrorWarningLine } from "react-icons/ri";
import { MdOutlineRoute, MdOutlineWatchLater } from "react-icons/md";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import ItemMonitoramento, {
    type RotaMonitoramento,
} from "@/components/componentesEmpresa/itemMonitoramento/itemMonitoramento";
import CardDetalheEntregador from "@/components/componentesEmpresa/cardDetalhesEntregador/cardDetalhesEntregador";
import CardEntregadores from "@/components/componentesEmpresa/cardEntregadores/cardEntregador";
import { obterCorRota } from "@/constants/coresRotas";
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

const ROTAS_MONITORAMENTO_BASE: Omit<RotaMonitoramento, "cor">[] = [
    {
        id: "1",
        codigo: "R01",
        motorista: "João Mendes",
        iniciais: "JM",
        placa: "FXR-2E41",
        regiao: "Zona Oeste",
        paradas: 8,
        entregasConcluidas: 5,
        entregasTotais: 8,
        distancia: "28 km",
        tempo: "2h20",
        veiculo: "moto",
        status: "noPrazo",
        proximaParadaMin: 12,
        previsaoFim: "14:40",
        telefone: "+5511999990001",
        coordenadas: [
            [-23.5614, -46.6559],
            [-23.5562, -46.6623],
            [-23.5578, -46.6675],
            [-23.5625, -46.6732],
            [-23.5668, -46.6788],
        ],
    },
    {
        id: "2",
        codigo: "R05",
        motorista: "Bianca Alves",
        iniciais: "BA",
        placa: "GHK-8A19",
        regiao: "Zona Leste",
        paradas: 9,
        entregasConcluidas: 3,
        entregasTotais: 9,
        distancia: "24 km",
        tempo: "2h05",
        veiculo: "moto",
        status: "atrasada",
        proximaParadaMin: 18,
        previsaoFim: "15:25",
        telefone: "+5511999990002",
        coordenadas: [
            [-23.5614, -46.6559],
            [-23.5585, -46.6422],
            [-23.5542, -46.6315],
            [-23.5498, -46.6188],
        ],
    },
    {
        id: "3",
        codigo: "R02",
        motorista: "Carlos Souza",
        iniciais: "CS",
        placa: "ABC-4D22",
        regiao: "Pinheiros",
        paradas: 10,
        entregasConcluidas: 6,
        entregasTotais: 10,
        distancia: "41 km",
        tempo: "3h40",
        veiculo: "carro",
        status: "noPrazo",
        proximaParadaMin: 9,
        previsaoFim: "14:15",
        telefone: "+5511999990003",
        coordenadas: [
            [-23.5614, -46.6559],
            [-23.5648, -46.6598],
            [-23.5682, -46.6645],
            [-23.5735, -46.6712],
        ],
    },
    {
        id: "4",
        codigo: "R03",
        motorista: "Rafael Lima",
        iniciais: "RL",
        placa: "JKL-9F10",
        regiao: "Vila Mariana",
        paradas: 12,
        entregasConcluidas: 2,
        entregasTotais: 12,
        distancia: "52 km",
        tempo: "4h15",
        veiculo: "caminhao",
        status: "atrasada",
        proximaParadaMin: 24,
        previsaoFim: "16:10",
        telefone: "+5511999990004",
        coordenadas: [
            [-23.5614, -46.6559],
            [-23.5688, -46.6472],
            [-23.5745, -46.6435],
            [-23.5818, -46.6402],
        ],
    },
];

export default function Monitoramento() {
    const [filtro, setFiltro] = useState<FiltroStatus>("todos");
    const [rotaSelecionadaId, setRotaSelecionadaId] = useState<string>("1");

    const rotasComCores: RotaMonitoramento[] = useMemo(
        () =>
            ROTAS_MONITORAMENTO_BASE.map((rota, index) => ({
                ...rota,
                cor: obterCorRota(index),
            })),
        []
    );

    const rotasFiltradas = useMemo(() => {
        if (filtro === "todos") return rotasComCores;
        return rotasComCores.filter((rota) => rota.status === filtro);
    }, [filtro, rotasComCores]);

    const totalNoPrazo = rotasComCores.filter(
        (r) => r.status === "noPrazo"
    ).length;
    const totalAtrasados = rotasComCores.filter(
        (r) => r.status === "atrasada"
    ).length;

    const rotaAtiva =
        rotasComCores.find((r) => r.id === rotaSelecionadaId) ?? rotasComCores[0];

    function handleSelecionarRota(id: string) {
        setRotaSelecionadaId(id);
    }

    return (
        <main className={styles.conteudo}>
            <section className={styles.kpis} aria-label="Indicadores de monitoramento">
                <article className={styles.bloco}>
                    <header className={styles.cabecalhoKpi}>
                        <MdOutlineRoute className={styles.icone} aria-hidden="true" />
                        <h3>Rotas Ativas</h3>
                    </header>
                    <div className={styles.informacao}>
                        <data value="5">5</data>
                        <p>rotas em andamento</p>
                    </div>
                </article>

                <article className={styles.bloco}>
                    <header className={styles.cabecalhoKpi}>
                        <HiOutlineArchiveBox className={styles.icone} aria-hidden="true" />
                        <h3>Concluídas</h3>
                    </header>
                    <div className={styles.informacao}>
                        <data value="23/48">23/48</data>
                        <p>entregas concluídas</p>
                    </div>
                </article>

                <article className={styles.bloco}>
                    <header className={styles.cabecalhoKpi}>
                        <MdOutlineWatchLater className={styles.icone} aria-hidden="true" />
                        <h3>Atrasos</h3>
                    </header>
                    <div className={styles.informacao}>
                        <data value={totalAtrasados} className={styles.valorAlerta}>
                            {totalAtrasados}
                        </data>
                        <p>rotas atrasadas</p>
                    </div>
                </article>

                <article className={styles.bloco}>
                    <header className={styles.cabecalhoKpi}>
                        <RiErrorWarningLine className={styles.icone} aria-hidden="true" />
                        <h3>Ocorrências</h3>
                    </header>
                    <div className={styles.informacao}>
                        <data value="2" className={styles.valorAlerta}>
                            2
                        </data>
                        <p>ocorrências aberta</p>
                    </div>
                </article>
            </section>

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
                        onSelecionarRota={handleSelecionarRota}
                    />
                </section>

                <section className={styles.mapa} aria-label="Mapa de monitoramento">
                    <MapaRoteirizacao
                        rotas={rotasFiltradas}
                        rotaSelecionadaId={rotaSelecionadaId}
                    />

                    {rotaAtiva && <CardDetalheEntregador rota={rotaAtiva} />}
                </section>
            </section>
        </main>
    );
}