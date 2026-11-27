import { FaHeart, FaRegHeart, FaStar } from "react-icons/fa";
import Status, { type TipoStatus } from "@/components/status/status";
import styles from "./itemEntregador.module.css";

export type TipoVeiculoEntregador = "moto" | "carro" | "bicicleta" | "van" | "caminhao";

export interface Entregador {
    id: string;
    nome: string;
    iniciais: string;
    veiculo: TipoVeiculoEntregador | null;
    placa: string | null;
    distancia: string | null;
    status: Extract<
        TipoStatus,
        "emRotaAzul" | "disponivel" | "outraLoja" | "offline" | "longe"
    >;
    // Entregas e sucesso com esta loja
    entregas: number | null;
    sucesso: number | null;
    nota: number | null;
    aceiteMedioMin: number | null;
    preferencial: boolean;
    verificado: boolean;
}

interface ItemEntregadorProps {
    entregador: Entregador;
    selecionado: boolean;
    // Desabilita o coração enquanto salva
    ocupado?: boolean;
    onSelecionar: (id: string) => void;
    onAlternarPreferencial: (id: string) => void;
}

const NOME_VEICULO: Record<TipoVeiculoEntregador, string> = {
    moto: "Moto",
    carro: "Carro",
    bicicleta: "Bicicleta",
    van: "Van",
    caminhao: "Caminhão",
};

// "Moto · FJK-2A19 · 1,2 km do CD" (pula o que não tiver)
export function linhaVeiculo(entregador: Entregador, comDistancia = true) {
    return [
        entregador.veiculo ? NOME_VEICULO[entregador.veiculo] : "Sem veículo",
        entregador.placa,
        comDistancia && entregador.distancia ? `${entregador.distancia} do CD` : null,
    ]
        .filter(Boolean)
        .join(" · ");
}

export const textoNota = (nota: number | null) => (nota === null ? "—" : nota.toFixed(1).replace(".", ","));

export default function ItemEntregador({
    entregador,
    selecionado,
    ocupado = false,
    onSelecionar,
    onAlternarPreferencial,
}: ItemEntregadorProps) {
    const temHistorico =
        entregador.entregas !== null && entregador.entregas > 0;

    return (
        <li className={styles.itemLista}>
            <section
                role="button"
                tabIndex={0}
                onClick={() => onSelecionar(entregador.id)}
                onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                        e.preventDefault();
                        onSelecionar(entregador.id);
                    }
                }}
                className={`${styles.linha} ${selecionado ? styles.linhaSelecionada : ""
                    }`}
                aria-pressed={selecionado}
            >
                <section className={styles.colunaEntregador}>
                    <span
                        className={`${styles.avatar} ${entregador.preferencial ? styles.avatarDestaque : ""
                            }`}
                        aria-hidden="true"
                    >
                        {entregador.iniciais}
                    </span>

                    <div className={styles.dadosPrincipais}>
                        <h4>{entregador.nome}</h4>
                        <p>{linhaVeiculo(entregador)}</p>
                    </div>
                </section>

                <section className={styles.colunaStatus}>
                    <Status status={entregador.status} />
                </section>

                <span className={styles.colunaMetrica}>
                    {temHistorico ? entregador.entregas : "—"}
                </span>

                <span className={styles.colunaMetrica}>
                    {temHistorico && entregador.sucesso !== null
                        ? `${entregador.sucesso}%`
                        : "—"}
                </span>

                <span className={styles.colunaNota}>
                    <FaStar className={styles.iconeEstrela} aria-hidden="true" />
                    {textoNota(entregador.nota)}
                </span>

                <button
                    type="button"
                    onClick={(e) => {
                        e.stopPropagation();
                        onAlternarPreferencial(entregador.id);
                    }}
                    disabled={ocupado}
                    className={`${styles.botaoPreferencial} ${entregador.preferencial ? styles.preferencialAtivo : ""
                        }`}
                    aria-pressed={entregador.preferencial}
                    aria-label={
                        entregador.preferencial
                            ? `Remover ${entregador.nome} dos preferenciais`
                            : `Adicionar ${entregador.nome} aos preferenciais`
                    }
                    title={
                        entregador.preferencial
                            ? "Remover dos preferenciais"
                            : "Adicionar aos preferenciais"
                    }
                >
                    {entregador.preferencial ? (
                        <FaHeart aria-hidden="true" />
                    ) : (
                        <FaRegHeart aria-hidden="true" />
                    )}
                </button>
            </section>
        </li>
    );
}