
import { IoNotificationsOutline } from "react-icons/io5";
import styles from "./botaoNotificacaoEmpresa.module.css";

interface BotaoNotificacaoEmpresaProps {
  quantidade?: number;
  // onClick: () => void;
}

export default function BotaoNotificacaoEmpresa({
  quantidade = 0,
  // onClick,
}: BotaoNotificacaoEmpresaProps) {
  return (
    <button
      type="button"
      className={styles.botao}
      aria-label={`Notificações, ${quantidade} não lidas `}
    >
      <IoNotificationsOutline size={28} />
      {/* <span className={styles.inidcador}</span> */}
    </button>
  );
}