import { IoNotificationsOutline } from "react-icons/io5";
import styles from "./botaoNotificacaoEmpresa.module.css";

// TODO: implementar lógica de contagem e redirecionar para visualização das notificações de pedidos, entregas etc -> verificar uso  React-Toastify 
export default function BotaoNotificacaoEmpresa() {
  return (
    <button type="button" className={styles.botao}>
      <IoNotificationsOutline size={28} />
    </button>
  );
}
