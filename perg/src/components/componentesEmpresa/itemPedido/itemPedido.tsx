import { TbAlertTriangle, TbChevronRight, TbInfoCircle } from "react-icons/tb";
import Status from "@/components/status/status";
import styles from "./itemPedido.module.css";
import type { PedidoResumo } from "@/@types/pedido";
import { STATUS_TELA, enderecoCurto, formatarPeso } from "@/utils/pedido";

interface ItemPedidoProps {
  pedido: PedidoResumo;
  selecionado: boolean;
  onAlternar: (pedido: PedidoResumo) => void;
  onAbrir: (pedido: PedidoResumo) => void;
}

// Linha da tabela de pedidos. Clicar na linha marca o pedido para roteirizar (só os prontos);
// pedido que não pode ser marcado abre o detalhe, para ver o que falta. A seta da última coluna
// sempre abre o detalhe.
export default function ItemPedido({ pedido, selecionado, onAlternar, onAbrir }: ItemPedidoProps) {
  const temProblema = pedido.problemas.length > 0;
  const motivoBloqueio = pedido.pronto
    ? undefined
    : temProblema
      ? pedido.problemas[0]
      : pedido.avisos[0] ?? "Só pedidos prontos podem ser roteirizados";

  return (
    <li className={`${styles.item} ${selecionado ? styles.itemSelecionado : ""}`}>
      <label className={styles.caixa} title={motivoBloqueio}>
        <input
          type="checkbox"
          checked={selecionado}
          disabled={!pedido.pronto}
          onChange={() => onAlternar(pedido)}
          aria-label={`Selecionar pedido ${pedido.numeroPedido}`}
        />
      </label>

      <button
        type="button"
        className={styles.conteudo}
        onClick={() => (pedido.pronto ? onAlternar(pedido) : onAbrir(pedido))}
        aria-pressed={pedido.pronto ? selecionado : undefined}
        title={pedido.pronto ? undefined : motivoBloqueio}
      >
        <span className={styles.numero}>#{pedido.numeroPedido}</span>

        <span className={styles.cliente}>{pedido.clienteNome}</span>
        <span className={styles.endereco}>{enderecoCurto(pedido.logradouro, pedido.numero)}</span>

        <span className={styles.bairro}>{pedido.bairro ?? "--"}</span>
        <span className={styles.peso}>{formatarPeso(pedido.pesoKg)}</span>

        <span className={styles.status}>
          {temProblema && (
            <span className={styles.alerta} title={pedido.problemas.join("\n")} aria-label="Pedido com problema">
              <TbAlertTriangle aria-hidden="true" />
            </span>
          )}
          {!temProblema && pedido.avisos.length > 0 && (
            <span className={styles.aviso} title={pedido.avisos.join("\n")} aria-label="Pedido com aviso">
              <TbInfoCircle aria-hidden="true" />
            </span>
          )}
          <span className={styles.balaoStatus}>
            <Status status={STATUS_TELA[pedido.status]} />
          </span>
        </span>
      </button>

      <button type="button" className={styles.detalhes} onClick={() => onAbrir(pedido)}
        aria-label={`Ver detalhes do pedido ${pedido.numeroPedido}`} title="Ver detalhes">
        <TbChevronRight aria-hidden="true" />
      </button>
    </li>
  );
}
