"use client";

import { useState, useMemo } from "react";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaRegHeart, FaMotorcycle, FaCarSide, FaTruck, FaBicycle } from "react-icons/fa";
import { PiClockClockwise } from "react-icons/pi";
import { TbGridDots } from "react-icons/tb";
import type {
    Entregador,
    TipoVeiculoEntregador,
} from "@/components/componentesEmpresa/itemEntregador/itemEntregador";
import CardListaEntregadores from "@/components/componentesEmpresa/cardListaEntregadores/cardListaEntregadores";
import CardEntregadorIndidce from "@/components/componentesEmpresa/cardEntregadorIndice/cardEntregadorIndice";
import styles from "./entregadores.module.css";

// TODO: implementar lógica para que o entregador só pode ser macarcado como preferencials se já tiver realizado entregas na loja

type FiltroCategoria = "todos" | "preferidos" | "jaEntregaram";
type FiltroVeiculo = "todos" | TipoVeiculoEntregador;

const ENTREGADORES: Entregador[] = [
    {
        id: "1",
        nome: "João Mendes",
        iniciais: "JM",
        veiculo: "moto",
        placa: "FJK-2A19",
        distancia: "1,2 km",
        status: "emRotaAzul",
        entregas: 86,
        sucesso: 99,
        nota: 4.9,
        aceiteMedioMin: 12,
        preferencial: true,
        verificado: true,
    },
    {
        id: "2",
        nome: "Bianca Alves",
        iniciais: "BA",
        veiculo: "moto",
        placa: "GHT-8A12",
        distancia: "2,0 km",
        status: "disponivel",
        entregas: 64,
        sucesso: 98,
        nota: 4.8,
        aceiteMedioMin: 9,
        preferencial: true,
        verificado: true,
    },
    {
        id: "3",
        nome: "Carlos Souza",
        iniciais: "CS",
        veiculo: "carro",
        placa: "GWE-4R55",
        distancia: "3,4 km",
        status: "emRotaAzul",
        entregas: 41,
        sucesso: 97,
        nota: 4.7,
        aceiteMedioMin: 15,
        preferencial: true,
        verificado: true,
    },
    {
        id: "4",
        nome: "Rafael Lima",
        iniciais: "RL",
        veiculo: "caminhao",
        placa: "LKJ-9H07",
        distancia: "4,1 km",
        status: "disponivel",
        entregas: 22,
        sucesso: 99,
        nota: 4.9,
        aceiteMedioMin: 18,
        preferencial: false,
        verificado: true,
    },
    {
        id: "5",
        nome: "Paula Reis",
        iniciais: "PR",
        veiculo: "carro",
        placa: "MNB-3T21",
        distancia: "2,8 km",
        status: "outraLoja",
        entregas: 18,
        sucesso: 96,
        nota: 4.6,
        aceiteMedioMin: 14,
        preferencial: false,
        verificado: true,
    },
    {
        id: "6",
        nome: "Diego Martins",
        iniciais: "DM",
        veiculo: "moto",
        placa: "PLO-7K30",
        distancia: "0,9 km",
        status: "disponivel",
        entregas: 9,
        sucesso: 95,
        nota: 4.5,
        aceiteMedioMin: 11,
        preferencial: false,
        verificado: true,
    },
    {
        id: "7",
        nome: "Larissa Costa",
        iniciais: "LC",
        veiculo: "bicicleta",
        placa: "TYU-1B88",
        distancia: "5,2 km",
        status: "offline",
        entregas: 31,
        sucesso: 98,
        nota: 4.8,
        aceiteMedioMin: 10,
        preferencial: true,
        verificado: true,
    },
    {
        id: "8",
        nome: "Marcos Vieira",
        iniciais: "MV",
        veiculo: "caminhao",
        placa: "ZXC-5N64",
        distancia: "6,0 km",
        status: "outraLoja",
        entregas: 6,
        sucesso: 94,
        nota: 4.4,
        aceiteMedioMin: 20,
        preferencial: false,
        verificado: false,
    },
    {
        id: "9",
        nome: "Fernanda Rocha",
        iniciais: "FR",
        veiculo: "carro",
        placa: "RTY-2M09",
        distancia: "3,9 km",
        status: "disponivel",
        entregas: null,
        sucesso: null,
        nota: 4.7,
        aceiteMedioMin: 13,
        preferencial: false,
        verificado: true,
    },
];

const OPCOES_VEICULO: {
    id: FiltroVeiculo;
    label: string;
    icone: typeof TbGridDots;
}[] = [
        { id: "todos", label: "Todos", icone: TbGridDots },
        { id: "moto", label: "Moto", icone: FaMotorcycle },
        { id: "carro", label: "Carro", icone: FaCarSide },
        { id: "bicicleta", label: "Bicicleta", icone: FaBicycle },
        { id: "caminhao", label: "Caminhão", icone: FaTruck },
    ];

export default function Entregadores() {
    const [entregadores, setEntregadores] = useState<Entregador[]>(
        ENTREGADORES
    );
    const [filtroCategoria, setFiltroCategoria] =
        useState<FiltroCategoria>("todos");
    const [filtroVeiculo, setFiltroVeiculo] = useState<FiltroVeiculo>("todos");
    const [entregadorSelecionadoId, setEntregadorSelecionadoId] =
        useState<string>("1");
    const [soPreferenciais, setSoPreferenciais] = useState<boolean>(false);

    const totalPreferidos = useMemo(
        () => entregadores.filter((e) => e.preferencial).length,
        [entregadores]
    );

    const entregadoresFiltrados = useMemo(() => {
        return entregadores.filter((entregador) => {
            if (filtroCategoria === "preferidos" && !entregador.preferencial) {
                return false;
            }
            if (
                filtroCategoria === "jaEntregaram" &&
                (entregador.entregas === null || entregador.entregas === 0)
            ) {
                return false;
            }
            if (filtroVeiculo !== "todos" && entregador.veiculo !== filtroVeiculo) {
                return false;
            }
            return true;
        });
    }, [entregadores, filtroCategoria, filtroVeiculo]);

    const entregadorAtivo =
        entregadores.find((e) => e.id === entregadorSelecionadoId) ??
        entregadoresFiltrados[0] ??
        entregadores[0];

    function handleAlternarPreferencial(id: string) {
        setEntregadores((listaAtual) =>
            listaAtual.map((item) =>
                item.id === id ? { ...item, preferencial: !item.preferencial } : item
            )
        );
    }

    return (
        <main className={styles.conteudo}>
            <section
                className={styles.botoesFiltro}
                aria-label="Filtros de entregadores"
            >
                <div
                    className={styles.filtro}
                    role="group"
                    aria-label="Filtrar entregadores"
                >
                    <button
                        type="button"
                        onClick={() => setFiltroCategoria("todos")}
                        className={`${styles.botaoFiltro} ${filtroCategoria === "todos" ? styles.botaoFiltroAtivo : ""
                            }`}
                        aria-pressed={filtroCategoria === "todos"}
                    >
                        <HiOutlineUsers aria-hidden="true" className={styles.icone} />
                        <p>Todos - {entregadores.length}</p>
                    </button>

                    <button
                        type="button"
                        onClick={() => setFiltroCategoria("preferidos")}
                        className={`${styles.botaoFiltro} ${filtroCategoria === "preferidos" ? styles.botaoFiltroAtivo : ""
                            }`}
                        aria-pressed={filtroCategoria === "preferidos"}
                    >
                        <FaRegHeart aria-hidden="true" className={styles.icone} />
                        <p>Preferenciais - {totalPreferidos}</p>
                    </button>
                </div>

                <section
                    className={styles.filtroVeiculos}
                    role="group"
                    aria-label="Filtrar entregadores por veículos"
                >
                    {OPCOES_VEICULO.map(({ id, label, icone: Icone }) => (
                        <button
                            key={id}
                            type="button"
                            onClick={() => setFiltroVeiculo(id)}
                            className={`${styles.botaoVeiculo} ${filtroVeiculo === id ? styles.botaoVeiculoAtivo : ""
                                }`}
                            aria-pressed={filtroVeiculo === id}
                            aria-label={label}
                            title={label}
                        >
                            <Icone aria-hidden="true" className={styles.icone} />
                            <p>{label}</p>
                        </button>
                    ))}
                </section>
            </section>

            <section className={styles.gradePrincipal}>
                <section className={styles.listaEntregador}>
                    <CardListaEntregadores
                        entregadores={entregadoresFiltrados}
                        entregadorSelecionadoId={entregadorAtivo?.id ?? null}
                        onSelecionarEntregador={setEntregadorSelecionadoId}
                        onAlternarPreferencial={handleAlternarPreferencial}
                    />
                </section>

                <aside className={styles.indiceEntregadorPreferencia}>
                    {entregadorAtivo && (
                        <CardEntregadorIndidce
                            entregador={entregadorAtivo}
                            onAlternarPreferencial={handleAlternarPreferencial}
                        />
                    )}

                    <article className={styles.selecionarPreferenciais}>
                        <div className={styles.cabecalhoPreferenciais}>
                            <h4>Só preferenciais</h4>
                            <label className={styles.switch}>
                                <input
                                    type="checkbox"
                                    checked={soPreferenciais}
                                    onChange={(e) => setSoPreferenciais(e.target.checked)}
                                    aria-label="Ativar entregadores que deseja dar prioridade de entrega"
                                />
                                <p className={styles.slider} />
                            </label>
                        </div>
                        <p>
                            {soPreferenciais
                                ? "Ativado: apenas entregadores preferenciais recebem as novas rotas da loja."
                                : "Desligado: preferenciais recebem a rota primeiro; se não aceitarem, ela vai para a rede PERG."}
                        </p>
                    </article>
                </aside>
            </section>
        </main>
    );
}