import ItemEntregador, {
  type Entregador,
} from "../itemEntregador/itemEntregador";
import styles from "./cardListaEntregadores.module.css";

interface CardListaEntregadoresProps {
  entregadores: Entregador[];
  entregadorSelecionadoId: string | null;
  // Id do entregador cujo preferencial está sendo salvo
  salvandoId?: string | null;
  // Texto no lugar da lista (carregando, erro, sem entregadores...)
  mensagem?: string | null;
  onSelecionarEntregador: (id: string) => void;
  onAlternarPreferencial: (id: string) => void;
}

export default function CardListaEntregadores({
  entregadores,
  entregadorSelecionadoId,
  salvandoId = null,
  mensagem = null,
  onSelecionarEntregador,
  onAlternarPreferencial,
}: CardListaEntregadoresProps) {
  return (
    <article className={styles.cardLista}>
      <header className={styles.cabecalhoColunas} aria-hidden="true">
        <h4>ENTREGADOR</h4>
        <p className={styles.colunaCentral}>STATUS</p>
        <p className={styles.colunaCentral}>ENTREGAS</p>
        <p className={styles.colunaCentral}>SUCESSO</p>
        <p className={styles.colunaCentral}>NOTA</p>
        <h5 />
      </header>

      {mensagem || entregadores.length === 0 ? (
        <p className={styles.vazio} role="status">
          {mensagem ?? "Nenhum entregador encontrado para os filtros selecionados."}
        </p>
      ) : (
        <ul className={styles.lista}>
          {entregadores.map((entregador) => (
            <ItemEntregador
              key={entregador.id}
              entregador={entregador}
              selecionado={entregadorSelecionadoId === entregador.id}
              ocupado={salvandoId === entregador.id}
              onSelecionar={onSelecionarEntregador}
              onAlternarPreferencial={onAlternarPreferencial}
            />
          ))}
        </ul>
      )}
    </article>
  );
}