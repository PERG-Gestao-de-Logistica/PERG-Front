import type { CSSProperties } from "react";
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
}

export default function ItemRotaGerada({
  rota,
  cor,
  selecionada,
  onSelecionar,
}: ItemRotaGeradaProps) {
  const IconeVeiculo = VEICULO_ICONS[rota.veiculo] ?? TbSteeringWheel;

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
    </li>
  );
}