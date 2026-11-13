import { IoNotificationsOutline } from "react-icons/io5";
import styles from "./botaoNotificacaoAdmin.module.css";

// TODO: implementar lógica de contagem e redirecionar para visualização das notificações admin para monitoramento de infraestrutura -> verificar uso  React-Toastify 
export default function BotaoNotificacaoAdmin() {
  return (
    <button
      type="button"
      className={styles.botao}
    >
      <IoNotificationsOutline className={styles.icone} />
    </button>
  );
}