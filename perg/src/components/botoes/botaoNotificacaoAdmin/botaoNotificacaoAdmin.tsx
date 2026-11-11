import { IoNotificationsOutline } from "react-icons/io5";
import styles from "./botaoNotificacaoAdmin.module.css";

export default function BotaoNotificacaoAdmin() {
  return (
    <button
      type="button"
      className={styles.botao}
      aria-label="Notificações"
    >
      <IoNotificationsOutline size={28} />
    </button>
  );
}