import styles from "./botaoNovoPedido.module.css";
import { FaPlus } from "react-icons/fa6";

// TODO: implementar lógica para abertura do modal de cadastro de pedido
export default function BotaoNovoPedido() {
  return (
    <button type="button" className={styles.botao}>
      <FaPlus className={styles.icone} />
      <span>Novo Pedido</span>
    </button>
  );
}
