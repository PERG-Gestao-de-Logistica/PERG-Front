
import styles from "./botaoNovoPedido.module.css";
import { FaPlus } from "react-icons/fa6";

// interface BotaoNovoPedidoProps {
//   onClick: () => void;
// }

// export default function BotaoNovoPedido({
//   onClick,
// }: BotaoNovoPedidoProps) {

    export default function BotaoNovoPedidos() {
  return (
    <button
      type="button"
      className={styles.botao}
    >
      <FaPlus className={styles.icone} />
      <span>Novo Pedido</span>
    </button>
  );
}
