import ItemPedido from "../itemPedido/itemPedido";
import Paginacao from "../paginacao/paginacao";
import Esqueleto from "@/components/esqueleto/esqueleto";
import styles from "./tabelaPedidos.module.css";
import type { PedidoResumo } from "@/@types/pedido";

interface TabelaPedidosProps {
  pedidos: PedidoResumo[] | null;
  total: number;
  selecionados: Set<string>;
  onAlternar: (pedido: PedidoResumo) => void;
  onAlternarTodos: () => void;
  onAbrir: (pedido: PedidoResumo) => void;
  pagina: number;
  tamanhoPagina: number;
  onMudarPagina: (pagina: number) => void;
  carregandoPagina: boolean;
  textoVazio: string;
  // Barra de seleção (soma as páginas): total de prontos e ações de selecionar todos / limpar
  totalProntos: number | null;
  onSelecionarTodosProntos: () => void;
  onLimparSelecao: () => void;
  selecionandoTodos: boolean;
}

export default function TabelaPedidos({
  pedidos,
  total,
  selecionados,
  onAlternar,
  onAlternarTodos,
  onAbrir,
  pagina,
  tamanhoPagina,
  onMudarPagina,
  carregandoPagina,
  textoVazio,
  totalProntos,
  onSelecionarTodosProntos,
  onLimparSelecao,
  selecionandoTodos,
}: TabelaPedidosProps) {
  const prontos = (pedidos ?? []).filter((p) => p.pronto);
  const todosMarcados = prontos.length > 0 && prontos.every((p) => selecionados.has(p.id));
  const faltamProntos = totalProntos != null && totalProntos > selecionados.size;

  return (
    <article className={styles.card}>
      {selecionados.size > 0 && (
        <div className={styles.barraSelecao} role="status">
          <span>
            <strong>{selecionados.size}</strong> {selecionados.size === 1 ? "pedido selecionado" : "pedidos selecionados"}
            {totalProntos != null && ` de ${totalProntos} prontos`}
          </span>
          {faltamProntos && (
            <button type="button" className={styles.linkSelecao} onClick={onSelecionarTodosProntos} disabled={selecionandoTodos}>
              {selecionandoTodos ? "Selecionando..." : `Selecionar todos os ${totalProntos} prontos`}
            </button>
          )}
          <button type="button" className={styles.linkSelecao} onClick={onLimparSelecao}>
            Limpar seleção
          </button>
        </div>
      )}

      <div className={styles.cabecalho} role="row">
        <label className={styles.caixa} title="Selecionar os prontos desta página">
          <input
            type="checkbox"
            checked={todosMarcados}
            disabled={prontos.length === 0}
            onChange={onAlternarTodos}
            aria-label="Selecionar todos os pedidos prontos"
          />
        </label>
        <div className={styles.colunas}>
          <span>Pedido</span>
          <span>Cliente</span>
          <span className={styles.colunaEndereco}>Endereço</span>
          <span className={styles.colunaBairro}>Bairro</span>
          <span className={styles.colunaPeso}>Peso</span>
          <span className={styles.colunaStatus}><span>Status</span></span>
        </div>
        <span className={styles.colunaDetalhes}>Detalhes</span>
      </div>

      {pedidos === null ? (
        <div className={styles.carregando} aria-busy="true" aria-label="Carregando pedidos">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <Esqueleto key={i} altura="3rem" />
          ))}
        </div>
      ) : pedidos.length === 0 ? (
        <p className={styles.vazio}>{textoVazio}</p>
      ) : (
        <>
          <ul className={`${styles.lista} ${carregandoPagina ? styles.listaCarregando : ""}`}>
            {pedidos.map((p) => (
              <ItemPedido key={p.id} pedido={p} selecionado={selecionados.has(p.id)} onAlternar={onAlternar} onAbrir={onAbrir} />
            ))}
          </ul>
          <footer className={styles.rodape}>
            <span>
              {(pagina - 1) * tamanhoPagina + 1}–{(pagina - 1) * tamanhoPagina + pedidos.length} de {total}{" "}
              {total === 1 ? "pedido" : "pedidos"}
            </span>
            <Paginacao
              pagina={pagina}
              totalPaginas={Math.ceil(total / tamanhoPagina)}
              onMudar={onMudarPagina}
              desabilitada={carregandoPagina}
            />
          </footer>
        </>
      )}
    </article>
  );
}
