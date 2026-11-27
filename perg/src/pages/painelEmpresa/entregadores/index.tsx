"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import { HiOutlineUsers } from "react-icons/hi2";
import { FaRegHeart, FaMotorcycle, FaCarSide, FaTruck, FaBicycle, FaShuttleVan } from "react-icons/fa";
import { PiClockClockwise } from "react-icons/pi";
import { TbGridDots, TbUserCheck } from "react-icons/tb";
import type {
    Entregador,
    TipoVeiculoEntregador,
} from "@/components/componentesEmpresa/itemEntregador/itemEntregador";
import CardListaEntregadores from "@/components/componentesEmpresa/cardListaEntregadores/cardListaEntregadores";
import CardEntregadorIndidce from "@/components/componentesEmpresa/cardEntregadorIndice/cardEntregadorIndice";
import { empresaService } from "@/services/empresaService";
import { entregadoresService } from "@/services/entregadoresService";
import type { ConfiguracaoEmpresa } from "@/@types/empresa";
import type { TipoVeiculo } from "@/@types/painel";
import type { EntregadorRede, SituacaoEntregadorRede } from "@/@types/rota";
import ValoresEntregador from "@/components/componentesEmpresa/valoresEntregador/valoresEntregador";
import { useAuth } from "@/hooks/useAuth";
import styles from "./entregadores.module.css";


type FiltroCategoria = "todos" | "preferidos" | "disponiveis" | "jaEntregaram";
type FiltroVeiculo = "todos" | TipoVeiculoEntregador;

// Veículo da API -> ícone/nome da tela
const VEICULO: Record<TipoVeiculo, TipoVeiculoEntregador> = {
    Bike: "bicicleta",
    Moto: "moto",
    Carro: "carro",
    Van: "van",
    Caminhao: "caminhao",
};

const STATUS: Record<SituacaoEntregadorRede, Entregador["status"]> = {
    Disponivel: "disponivel",
    EmRota: "emRotaAzul",
    OutraLoja: "outraLoja",
    Offline: "offline",
    Longe: "longe",
};

// Disponíveis primeiro, depois os que estão com a loja, de outra loja e offline
const ORDEM_SITUACAO: Record<SituacaoEntregadorRede, number> = { Disponivel: 0, EmRota: 1, Longe: 2, OutraLoja: 3, Offline: 4 };

const ATUALIZAR_A_CADA_MS = 60_000;

const iniciaisDe = (nome: string) =>
    nome
        .split(/\s+/)
        .filter(Boolean)
        .slice(0, 2)
        .map((parte) => parte[0]?.toUpperCase() ?? "")
        .join("");

function paraTela(e: EntregadorRede): Entregador {
    return {
        id: e.id,
        nome: e.nome,
        iniciais: iniciaisDe(e.nome),
        veiculo: e.veiculoTipo ? VEICULO[e.veiculoTipo] : null,
        placa: e.veiculoPlaca,
        distancia: e.distanciaOrigemKm === null ? null : `${e.distanciaOrigemKm.toFixed(1).replace(".", ",")} km`,
        status: STATUS[e.situacao] ?? "offline",
        entregas: e.entregasComLoja,
        sucesso: e.taxaSucessoComLoja === null ? null : Math.round(e.taxaSucessoComLoja * 100),
        nota: e.notaMedia,
        aceiteMedioMin: e.tempoAceiteMedioS === null ? null : Math.max(1, Math.round(e.tempoAceiteMedioS / 60)),
        preferencial: e.favorito,
        verificado: e.cnhVerificada && e.veiculoVerificado,
    };
}

function ordenar(lista: EntregadorRede[]) {
    return [...lista].sort(
        (a, b) =>
            Number(b.favorito) - Number(a.favorito) ||
            ORDEM_SITUACAO[a.situacao] - ORDEM_SITUACAO[b.situacao] ||
            b.entregasComLoja - a.entregasComLoja ||
            a.nome.localeCompare(b.nome, "pt-BR"),
    );
}

const OPCOES_VEICULO: {
    id: FiltroVeiculo;
    label: string;
    icone: typeof TbGridDots;
}[] = [
        { id: "todos", label: "Todos", icone: TbGridDots },
        { id: "moto", label: "Moto", icone: FaMotorcycle },
        { id: "carro", label: "Carro", icone: FaCarSide },
        { id: "bicicleta", label: "Bicicleta", icone: FaBicycle },
        { id: "van", label: "Van", icone: FaShuttleVan },
        { id: "caminhao", label: "Caminhão", icone: FaTruck },
    ];

export default function Entregadores() {
    const [rede, setRede] = useState<EntregadorRede[] | null>(null);
    const [erro, setErro] = useState("");
    const [aviso, setAviso] = useState<{ texto: string; erro?: boolean } | null>(null);
    const [salvandoId, setSalvandoId] = useState<string | null>(null);
    const [empresa, setEmpresa] = useState<ConfiguracaoEmpresa | null>(null);
    const [salvandoSwitch, setSalvandoSwitch] = useState(false);
    const { usuario } = useAuth();
    const [filtroCategoria, setFiltroCategoria] =
        useState<FiltroCategoria>("todos");
    const [filtroVeiculo, setFiltroVeiculo] = useState<FiltroVeiculo>("todos");
    const [entregadorSelecionadoId, setEntregadorSelecionadoId] =
        useState<string | null>(null);

    const carregar = useCallback(() => {
        return entregadoresService
            .listarRede()
            .then((lista) => {
                setRede(ordenar(lista));
                setErro("");
            })
            .catch((e) => setErro((e as Error).message));
    }, []);

    // Lista + situação de agora (disponível, em rota...) atualizada a cada minuto
    useEffect(() => {
        carregar();
        const intervalo = setInterval(carregar, ATUALIZAR_A_CADA_MS);
        return () => clearInterval(intervalo);
    }, [carregar]);

    useEffect(() => {
        empresaService.obter().then(setEmpresa).catch(() => {});
    }, []);

    const entregadores = useMemo(() => (rede ?? []).map(paraTela), [rede]);
    const soPreferenciais = empresa?.somenteFavoritos ?? false;

    const totalDisponiveis = useMemo(
        () => entregadores.filter((e) => e.status === "disponivel").length,
        [entregadores]
    );

    const totalPreferidos = useMemo(
        () => entregadores.filter((e) => e.preferencial).length,
        [entregadores]
    );

    const entregadoresFiltrados = useMemo(() => {
        return entregadores.filter((entregador) => {
            if (filtroCategoria === "preferidos" && !entregador.preferencial) {
                return false;
            }
            if (filtroCategoria === "disponiveis" && entregador.status !== "disponivel") {
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

    // Marca/desmarca na API; a tela muda na hora e volta se der erro
    async function handleAlternarPreferencial(id: string) {
        const atual = rede?.find((e) => e.id === id);
        if (!atual || salvandoId) return;

        const virarPreferencial = !atual.favorito;
        // Preferencial só para quem já entregou para a loja
        if (virarPreferencial && atual.entregasComLoja === 0) {
            setAviso({ texto: `${atual.nome} ainda não fez entregas para a sua loja. Só dá para marcar como preferencial quem já entregou com você.`, erro: true });
            return;
        }

        const trocar = (favorito: boolean) =>
            setRede((lista) => lista?.map((e) => (e.id === id ? { ...e, favorito } : e)) ?? lista);

        setSalvandoId(id);
        setAviso(null);
        trocar(virarPreferencial);
        try {
            const r = virarPreferencial
                ? await entregadoresService.favoritar(id)
                : await entregadoresService.desfavoritar(id);
            setAviso({ texto: r.mensagem });
        } catch (e) {
            trocar(!virarPreferencial);
            setAviso({ texto: (e as Error).message, erro: true });
        } finally {
            setSalvandoId(null);
        }
    }

    // "Só preferenciais" é uma configuração da empresa (só admin pode mudar)
    async function alternarSoPreferenciais(ligar: boolean) {
        if (!empresa) return;
        if (ligar && totalPreferidos === 0) {
            setAviso({ texto: "Marque pelo menos um entregador como preferencial antes de ligar esta opção.", erro: true });
            return;
        }
        setSalvandoSwitch(true);
        setAviso(null);
        try {
            const r = await empresaService.atualizar({
                razaoSocial: empresa.razaoSocial,
                nomeFantasia: empresa.nomeFantasia,
                email: empresa.email,
                telefone: empresa.telefone ?? undefined,
                segmento: empresa.segmento,
                faixaPedidosDia: empresa.faixaPedidosDia,
                entregaMesmoDia: empresa.entregaMesmoDia,
                entregaAgendada: empresa.entregaAgendada,
                retiradaLoja: empresa.retiradaLoja,
                usaCarro: empresa.usaCarro,
                usaMoto: empresa.usaMoto,
                usaVanCaminhao: empresa.usaVanCaminhao,
                somenteFavoritos: ligar,
                tempoOfertaFavoritosS: empresa.tempoOfertaFavoritosS,
                metaNoPrazoPct: empresa.metaNoPrazoPct,
            });
            setEmpresa(r.empresa);
            setAviso({ texto: ligar ? "Só os preferenciais recebem as novas rotas." : "As rotas voltam a ir para a rede quando os preferenciais não aceitarem." });
        } catch (e) {
            setAviso({ texto: (e as Error).message, erro: true });
        } finally {
            setSalvandoSwitch(false);
        }
    }

    const mensagemLista = rede === null
        ? (erro || "Carregando entregadores...")
        : rede.length === 0
            ? "Ainda não há entregadores ativos na rede."
            : null;

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
                        <p>Todos</p>
                        <span className={styles.contador}>{rede === null ? "–" : entregadores.length}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setFiltroCategoria("preferidos")}
                        className={`${styles.botaoFiltro} ${filtroCategoria === "preferidos" ? styles.botaoFiltroAtivo : ""
                            }`}
                        aria-pressed={filtroCategoria === "preferidos"}
                    >
                        <FaRegHeart aria-hidden="true" className={styles.icone} />
                        <p>Preferenciais</p>
                        <span className={styles.contador}>{rede === null ? "–" : totalPreferidos}</span>
                    </button>

                    <button
                        type="button"
                        onClick={() => setFiltroCategoria("disponiveis")}
                        className={`${styles.botaoFiltro} ${filtroCategoria === "disponiveis" ? styles.botaoFiltroAtivo : ""
                            }`}
                        aria-pressed={filtroCategoria === "disponiveis"}
                        title="Em expediente, livres e perto do seu ponto de coleta: recebem sua próxima oferta"
                    >
                        <TbUserCheck aria-hidden="true" className={styles.icone} />
                        <p>Disponíveis agora</p>
                        <span className={styles.contador}>{rede === null ? "–" : totalDisponiveis}</span>
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

            {aviso && (
                <p role={aviso.erro ? "alert" : "status"} className={aviso.erro ? styles.avisoErro : styles.avisoOk}>
                    {aviso.texto}
                </p>
            )}
            {erro && rede !== null && (
                <p role="alert" className={styles.avisoErro}>Não foi possível atualizar a lista agora: {erro}</p>
            )}

            <section className={styles.gradePrincipal}>
                <section className={styles.listaEntregador}>
                    <CardListaEntregadores
                        entregadores={entregadoresFiltrados}
                        entregadorSelecionadoId={entregadorAtivo?.id ?? null}
                        salvandoId={salvandoId}
                        mensagem={mensagemLista}
                        onSelecionarEntregador={setEntregadorSelecionadoId}
                        onAlternarPreferencial={handleAlternarPreferencial}
                    />
                </section>

                <aside className={styles.indiceEntregadorPreferencia}>
                    {entregadorAtivo && (
                        <CardEntregadorIndidce
                            entregador={entregadorAtivo}
                            ocupado={salvandoId === entregadorAtivo.id}
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
                                    disabled={!empresa || salvandoSwitch}
                                    onChange={(e) => alternarSoPreferenciais(e.target.checked)}
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

            {/* Quanto a loja paga por rota: entra no valor ofertado e na prioridade "Custo" (só admin altera) */}
            {usuario?.papel === "Admin" && (
                <section className={styles.valores} aria-label="Valores pagos aos entregadores">
                    <ValoresEntregador />
                </section>
            )}
        </main>
    );
}