import type { CSSProperties } from "react";
import { FaMotorcycle, FaCarSide, FaTruck, FaBicycle } from "react-icons/fa";
import { TbSteeringWheel } from "react-icons/tb";
import type { RotaGerada } from "@/components/componentesEmpresa/mapaRoteirizacao/mapaRoteirizacao";
import Status from "@/components/status/status"; // Ajuste o caminho conforme sua pasta
import styles from "./itemMonitoramento.module.css";

const VEICULO_ICONS = {
  moto: FaMotorcycle,
  carro: FaCarSide,
  van: FaTruck,
  bicicleta: FaBicycle,
  caminhao: FaTruck,
} as const;

export interface RotaMonitoramento extends RotaGerada {
  iniciais: string;
  placa: string;
  status: "noPrazo" | "atrasada";
  entregasConcluidas: number;
  entregasTotais: number;
  proximaParadaMin: number;
  previsaoFim: string;
  telefone: string;
}

interface ItemMonitoramentoProps {
  rota: RotaMonitoramento;
  cor: string;
  selecionada: boolean;
  onSelecionar: (id: string) => void;
}

export default function ItemMonitoramento({
  rota,
  cor,
  selecionada,
  onSelecionar,
}: ItemMonitoramentoProps) {
  const IconeVeiculo = VEICULO_ICONS[rota.veiculo] ?? TbSteeringWheel;
  const percentual = Math.min(
    100,
    Math.round((rota.entregasConcluidas / rota.entregasTotais) * 100)
  );

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
        <div className={styles.topoItem}>
          <span className={styles.iconeVeiculo}>
            <IconeVeiculo aria-hidden="true" />
          </span>

          <div className={styles.informacoes}>
            <h4>{rota.motorista}</h4>
            <p>
              {rota.codigo} · {rota.regiao}
            </p>
          </div>

          <Status status={rota.status} />
        </div>

        <div className={styles.rodapeProgresso}>
          <div
            className={styles.barraFundo}
            role="progressbar"
            aria-valuenow={rota.entregasConcluidas}
            aria-valuemin={0}
            aria-valuemax={rota.entregasTotais}
            aria-label={`${rota.entregasConcluidas} de ${rota.entregasTotais} entregas concluídas`}
          >
            <div
              className={styles.barraPreenchimento}
              style={{ width: `${percentual}%` }}
            />
          </div>

          <span className={styles.contagemEntregas}>
            {rota.entregasConcluidas}/{rota.entregasTotais} entregas
          </span>
        </div>
      </button>
    </li>
  );
}