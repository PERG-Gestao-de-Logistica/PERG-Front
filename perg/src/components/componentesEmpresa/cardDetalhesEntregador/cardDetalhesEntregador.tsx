import { FiPhone, FiMessageSquare, FiCheck, FiCopy } from "react-icons/fi";
import type { RotaMonitoramento } from "../itemMonitoramento/itemMonitoramento";
import styles from "./cardDetalhesEntregador.module.css";
import { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";

interface CardDetalheEntregadorProps {
    rota: RotaMonitoramento;
}

function formatarTelefone(telefone: string) {
    const numeros = telefone.replace(/\D/g, "").replace(/^55/, "");
    if (numeros.length === 11) {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    }
    if (numeros.length === 10) {
        return `(${numeros.slice(0, 2)}) ${numeros.slice(2, 6)}-${numeros.slice(6)}`;
    }
    return telefone;
}

export default function CardDetalheEntregador({
    rota,
}: CardDetalheEntregadorProps) {
    const nomeVeiculo = {
        moto: "Moto",
        carro: "Carro",
        caminhao: "Caminhão",
        bicicleta: "Bicicleta",
    }[rota.veiculo];

    const [popupTelefoneAberto, setPopupTelefoneAberto] = useState(false);
    const [copiado, setCopiado] = useState(false);
    useEffect(() => {
        setPopupTelefoneAberto(false);
        setCopiado(false);
    }, [rota.id]);

    async function handleCopiarTelefone() {
        try {
            await navigator.clipboard.writeText(formatarTelefone(rota.telefone));
            setCopiado(true);
            setTimeout(() => setCopiado(false), 2000);
        } catch {
        }
    }

    return (
        <aside className={styles.cardFlutuante} aria-label={`Detalhes do entregador ${rota.motorista}`}>
            <section className={styles.perfil}>
                <span className={styles.avatar} aria-hidden="true">
                    {rota.iniciais}
                </span>

                <div className={styles.identificacao}>
                    <strong>{rota.motorista}</strong>
                    <span>
                        {nomeVeiculo} · {rota.placa}
                    </span>
                </div>
            </section>

            <div className={styles.divisor} aria-hidden="true" />

            <section className={styles.metricaTempo}>
                <strong>{rota.proximaParadaMin} min</strong>
                <span>próxima parada</span>
            </section>

            <div className={styles.divisor} aria-hidden="true" />

            <section className={styles.metricaTempo}>
                <strong>{rota.previsaoFim}</strong>
                <span>previsão de fim</span>
            </section>

            <div className={styles.acoes}>
                {popupTelefoneAberto && (
                    <div
                        className={styles.popupTelefone}
                        role="dialog"
                        aria-label={`Telefone de ${rota.motorista}`}
                    >
                        <div className={styles.popupCabecalho}>
                            <span className={styles.popupTitulo}>{rota.motorista}</span>
                            <button
                                type="button"
                                onClick={() => setPopupTelefoneAberto(false)}
                                className={styles.popupFechar}
                                aria-label="Fechar telefone"
                            >
                                <IoClose aria-hidden="true" />
                            </button>
                        </div>

                        <div className={styles.popupCorpo}>
                            <a
                                href={`tel:${rota.telefone}`}
                                className={styles.popupNumero}
                                title="Clique para ligar"
                            >
                                {formatarTelefone(rota.telefone)}
                            </a>

                            <button
                                type="button"
                                onClick={handleCopiarTelefone}
                                className={styles.popupCopiar}
                                title={copiado ? "Copiado!" : "Copiar número"}
                                aria-label={copiado ? "Número copiado" : "Copiar número"}
                            >
                                {copiado ? (
                                    <FiCheck aria-hidden="true" />
                                ) : (
                                    <FiCopy aria-hidden="true" />
                                )}
                            </button>
                        </div>
                    </div>
                )}

                <button
                    type="button"
                    onClick={() => setPopupTelefoneAberto((prev) => !prev)}
                    className={`${styles.botaoAcao} ${popupTelefoneAberto ? styles.botaoAcaoAtivo : ""
                        }`}
                    aria-expanded={popupTelefoneAberto}
                    aria-label={`Ver telefone de ${rota.motorista}`}
                    title={`Ver telefone de ${rota.motorista}`}
                >
                    <FiPhone aria-hidden="true" />
                </button>
            </div>
        </aside>
    );
}