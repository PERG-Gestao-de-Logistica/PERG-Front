import styles from "../botaoNovoPedido/botaoNovoPedido.module.css";
import { FaPlus } from "react-icons/fa6";

// Mesmo visual do botão "Novo Pedido", com o texto que a tela precisar
interface BotaoAdicionarProps {
  texto: string;
  onClick?: () => void;
}

export default function BotaoAdicionar({ texto, onClick }: BotaoAdicionarProps) {
  return (
    <button type="button" onClick={onClick} className={styles.botao}>
      <FaPlus className={styles.icone} aria-hidden="true" />
      <span>{texto}</span>
    </button>
  );
}