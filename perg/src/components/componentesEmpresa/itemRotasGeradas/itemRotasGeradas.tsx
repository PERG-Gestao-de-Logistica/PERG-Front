import { useEffect, useState, type CSSProperties } from "react";
import { FaMotorcycle, FaCarSide, FaTruck, FaBicycle } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";
import type { RotaGerada } from "@/components/componentesEmpresa/mapaRoteirizacao/mapaRoteirizacao";
import styles from "./itemRotasGeradas.module.css";

const VEICULO_ICONS = {
  moto: FaMotorcycle,
  carro: FaCarSide,
  van: FaTruck,
  bicicleta: FaBicycle,
  caminhao: FaTruck,
} as const;

interface ItemRotaGeradaProps {
  rota: RotaGerada;
  cor: string;
  selecionada: boolean;
  onSelecionar: (id: string) => void;
  // Só vem para rota ainda não ofertada: mostra "Cancelar rota" quando ela está selecionada
  onCancelar?: (id: string) => Promise<void>;
}

export default function ItemRotaGerada({
  rota,
  cor,
  selecionada,
  onSelecionar,
  onCancelar,
}: ItemRotaGeradaProps) {
  const IconeVeiculo = VEICULO_ICONS[rota.veiculo] ?? TbSteeringWheel;
  const [confirmando, setConfirmando] = useState(false);
  const [cancelando, setCancelando] = useState(false);

  // Fecha a confirmação ao trocar de rota
  useEffect(() => {
    if (!selecionada) setConfirmando(false);
  }, [selecionada]);

  async function cancelar() {
    if (!onCancelar) return;
    setCancelando(true);
    try {
      await onCancelar(rota.id);
    } finally {
      setCancelando(false);
      setConfirmando(false);
    }
  }

  return (
    <li className={styles.itemLista}>
      <button
        type="button"
        onClick={() => onSelecionar(rota.id)}
        style={{ "--cor-rota": cor } as CSSProperties}
        className={`${styles.item} ${
          selecionada ? styles.itemSelecionado : ""
        }`}
        aria-pressed={selecionada}
      >
        <span className={styles.iconeVeiculo}>
          <IconeVeiculo aria-hidden="true" />
        </span>

        <div className={styles.informacoes}>
          <h4>{rota.motorista}</h4>
          <p>
            {rota.codigo} · {rota.regiao}
          </p>
        </div>

        <div className={styles.metricas}>
          <strong>{rota.paradas} paradas</strong>
          <span>
            {rota.distancia} · {rota.tempo}
          </span>
        </div>
      </button>

      {selecionada && onCancelar && (
        <div className={styles.acoesRota} style={{ "--cor-rota": cor } as CSSProperties}>
          {confirmando ? (
            <>
              <span className={styles.textoConfirmacao}>Os pedidos voltam para Novo. Cancelar a rota?</span>
              <button type="button" className={styles.botaoNao} onClick={() => setConfirmando(false)} disabled={cancelando}>
                Não
              </button>
              <button type="button" className={styles.botaoCancelarRota} onClick={cancelar} disabled={cancelando}>
                {cancelando ? "Cancelando..." : "Sim, cancelar"}
              </button>
            </>
          ) : (
            <button type="button" className={styles.linkCancelar} onClick={() => setConfirmando(true)}>
              Cancelar rota
            </button>
          )}
        </div>
      )}
    </li>
  );
}