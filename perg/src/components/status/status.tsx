import styles from "./status.module.css";

import { STATUS_CONFIG, STATUS_DESCONHECIDO } from "../../constants/status";

export default function Status({ status }) {
  const configuracao = STATUS_CONFIG[status] ?? STATUS_DESCONHECIDO;

  return (
    <span className={`${styles.status} ${styles[configuracao.variant]}`}>
      {configuracao.label}
    </span>
  );
}
