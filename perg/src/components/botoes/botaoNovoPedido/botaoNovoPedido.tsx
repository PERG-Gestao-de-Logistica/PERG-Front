import styles from "./botaoNovoPedido.module.css";
import { FaPlus } from "react-icons/fa6";

interface BotaoNovoPedidoProps {
  onClick?: () => void;
}

export default function BotaoNovoPedido({ onClick }: BotaoNovoPedidoProps) {
  return (
    <button type="button" onClick={onClick} className={styles.botao}>
      <FaPlus className={styles.icone} />
      <span>Novo Pedido</span>
    </button>
  );
}
