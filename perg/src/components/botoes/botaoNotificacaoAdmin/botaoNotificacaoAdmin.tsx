import { IoNotificationsOutline } from "react-icons/io5";
import styles from "./botaoNotificacaoAdmin.module.css";

interface BotaoNotificacaoAdminProps {
  quantidade?: number;
  onClick: () => void;
}

export default function BotaoNotificacaoAdmin({
  quantidade = 0,
  onClick,
}: BotaoNotificacaoAdminProps) {
  return (
    <button
      type="button"
      className={styles.botao}
      aria-label={`Notificações, ${quantidade} não lidas `}
    >
      <IoNotificationsOutline size={28} />
      <span> className={styles.inidcador}</span>
    </button>
  );
}