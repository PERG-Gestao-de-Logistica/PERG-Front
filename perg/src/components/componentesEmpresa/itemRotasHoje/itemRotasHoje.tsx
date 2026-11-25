import { FaMotorcycle, FaCarSide, FaTruck, FaBicycle } from "react-icons/fa";

import { TbSteeringWheel } from "react-icons/tb";

import Status from "../../status/status";
import styles from "./itemRotasHoje.module.css";

const VEICULO_ICONS = {
  moto: FaMotorcycle,
  carro: FaCarSide,
  van: FaTruck,
  bicicleta: FaBicycle,
  caminhao: FaTruck,
};

export default function RotaItem({ rota }) {
  const IconeVeiculo = VEICULO_ICONS[rota.veiculo] ?? TbSteeringWheel;

  return (
    <li className={styles.item}>
      <span className={styles.iconeVeiculo}>
        <IconeVeiculo aria-hidden="true" />
      </span>

      <div className={styles.informacoes}>
        <h3>
          {rota.codigo} - {rota.motorista}
        </h3>

        <p>
          {rota.paradas} paradas · {rota.regiao}
        </p>
      </div>

      <progress
        className={styles.progresso}
        value={rota.progresso ?? 0}
        max="100"
        aria-label={`Progresso da rota ${rota.codigo}`}
      />

      <Status status={rota.status} />
    </li>
  );
}
