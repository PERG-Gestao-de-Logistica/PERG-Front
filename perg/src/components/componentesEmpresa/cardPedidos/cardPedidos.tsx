import { FiCheck, FiMinus } from "react-icons/fi";
import ItemPedido, { type Pedido } from "../itemPedido/itemPedido";
import styles from "./cardPedidos.module.css";

interface CardListaPedidosProps {
  pedidos: Pedido[];
  pedidosSelecionadosIds: string[];
  pedidoExpandidoInicialId?: string;
  onAlternarSelecao: (id: string) => void;
  onAlternarSelecaoTodos: () => void;
  onAbrirRastreio?: (pedido: Pedido) => void;
  onBaixarPdf?: (pedido: Pedido) => void;
}

export default function CardPedidos({
  pedidos,
  pedidosSelecionadosIds,
  pedidoExpandidoInicialId,
  onAlternarSelecao,
  onAlternarSelecaoTodos,
  onAbrirRastreio,
  onBaixarPdf,
}: CardListaPedidosProps) {
  const todosSelecionados =
    pedidos.length > 0 &&
    pedidos.every((pedido) => pedidosSelecionadosIds.includes(pedido.id));

  const algunsSelecionados =
    !todosSelecionados &&
    pedidos.some((pedido) => pedidosSelecionadosIds.includes(pedido.id));

  return (
    <article className={styles.cardLista}>
      <header className={styles.cabecalhoMobile}>
        <div className={styles.tituloMobile}>
          <h3>Pedidos</h3>
          <p>
            {pedidosSelecionadosIds.length > 0
              ? `${pedidosSelecionadosIds.length} selecionado(s)`
              : `${pedidos.length} listado(s)`}
          </p>
        </div>

        {pedidos.length > 0 && (
          <button
            type="button"
            onClick={onAlternarSelecaoTodos}
            className={styles.botaoSelecionarTodosMobile}
          >
            {todosSelecionados ? "Desmarcar todos" : "Selecionar todos"}
          </button>
        )}
      </header>

      <header className={styles.cabecalhoColunas}>
        <button
          type="button"
          role="checkbox"
          aria-checked={
            todosSelecionados ? true : algunsSelecionados ? "mixed" : false
          }
          aria-label={
            todosSelecionados
              ? "Desmarcar todos os pedidos"
              : "Selecionar todos os pedidos"
          }
          onClick={onAlternarSelecaoTodos}
          className={`${styles.checkboxMestre} ${
            todosSelecionados || algunsSelecionados
              ? styles.checkboxMestreAtivo
              : ""
          }`}
        >
          {todosSelecionados && <FiCheck aria-hidden="true" />}
          {algunsSelecionados && <FiMinus aria-hidden="true" />}
        </button>

        <p>PEDIDO</p>
        <p>CLIENTE</p>
        <p>BAIRRO</p>
        <p>PESO</p>
        <p className={styles.colunaCentral}>STATUS</p>
      </header>

      {pedidos.length === 0 ? (
        <p className={styles.vazio}>
          Nenhum pedido encontrado para o filtro selecionado.
        </p>
      ) : (
        <ul className={styles.lista}>
          {pedidos.map((pedido) => (
            <ItemPedido
              key={pedido.id}
              pedido={pedido}
              selecionado={pedidosSelecionadosIds.includes(pedido.id)}
              expandidoInicialmente={pedido.id === pedidoExpandidoInicialId}
              onAlternarSelecao={onAlternarSelecao}
              onAbrirRastreio={onAbrirRastreio}
              onBaixarPdf={onBaixarPdf}
            />
          ))}
        </ul>
      )}
    </article>
  );
}