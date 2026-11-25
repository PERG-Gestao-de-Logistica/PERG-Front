import { FaMotorcycle, FaCarSide, FaTruck, FaBicycle } from "react-icons/fa";

import { TbSteeringWheel } from "react-icons/tb";

import Status from "../../status/status";
import styles from "./itemRotasHoje.module.css";
import type { RotaHoje, StatusRota, TipoVeiculo } from "@/@types/painel";

const VEICULO_ICONS: Record<TipoVeiculo, typeof FaMotorcycle> = {
  Moto: FaMotorcycle,
  Carro: FaCarSide,
  Van: FaTruck,
  Bike: FaBicycle,
  Caminhao: FaTruck,
};

// Status da API -> chaves do componente Status
function statusVisual(status: StatusRota) {
  if (status === "EmAndamento") return "emRota";
  if (status === "Concluida") return "concluida";
  return "aguardando";
}

export default function RotaItem({ rota }: { rota: RotaHoje }) {
  const IconeVeiculo = VEICULO_ICONS[rota.tipoVeiculo] ?? TbSteeringWheel;
  const paradas = `${rota.paradas} ${rota.paradas === 1 ? "parada" : "paradas"}`;

  return (
    <li className={styles.item}>
      <span className={styles.iconeVeiculo}>
        <IconeVeiculo aria-hidden="true" />
      </span>

      <div className={styles.informacoes}>
        <h3>
          {rota.codigo} - {rota.entregadorNome ?? "Sem entregador"}
        </h3>

        <p>
          {rota.regiao ? `${paradas} · ${rota.regiao}` : paradas}
        </p>
      </div>

      <progress
        className={styles.progresso}
        value={rota.progresso}
        max="100"
        aria-label={`Progresso da rota ${rota.codigo}: ${rota.progresso}%`}
      />

      <Status status={statusVisual(rota.status)} />
    </li>
  );
}
