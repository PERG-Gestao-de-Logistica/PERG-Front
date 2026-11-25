import styles from "./status.module.css";

import { STATUS_CONFIG, STATUS_DESCONHECIDO } from "../../constants/status";

type ChaveStatus = keyof typeof STATUS_CONFIG;

export default function Status({ status }: { status: ChaveStatus | string }) {
  const configuracao = STATUS_CONFIG[status as ChaveStatus] ?? STATUS_DESCONHECIDO;

  return (
    <span className={`${styles.status} ${styles[configuracao.variant]}`}>
      {configuracao.label}
    </span>
  );
}
