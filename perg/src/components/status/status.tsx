import styles from "./status.module.css";
import { STATUS_CONFIG, STATUS_DESCONHECIDO } from "../../constants/status";

export type TipoStatus = keyof typeof STATUS_CONFIG;

interface StatusProps {
  status: TipoStatus | string;
}

export default function Status({ status }: StatusProps) {
  const configuracao =
    STATUS_CONFIG[status as TipoStatus] ?? STATUS_DESCONHECIDO;

  return (
    <span className={`${styles.status} ${styles[configuracao.variant]}`}>
      {configuracao.label}
    </span>
  );
}