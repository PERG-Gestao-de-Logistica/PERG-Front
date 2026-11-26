import ItemEntregador, {
  type Entregador,
} from "../itemEntregador/itemEntregador";
import styles from "./cardListaEntregadores.module.css";

interface CardListaEntregadoresProps {
  entregadores: Entregador[];
  entregadorSelecionadoId: string | null;
  onSelecionarEntregador: (id: string) => void;
  onAlternarPreferencial: (id: string) => void;
}

export default function CardListaEntregadores({
  entregadores,
  entregadorSelecionadoId,
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

      {entregadores.length === 0 ? (
        <p className={styles.vazio}>
          Nenhum entregador encontrado para os filtros selecionados.
        </p>
      ) : (
        <ul className={styles.lista}>
          {entregadores.map((entregador) => (
            <ItemEntregador
              key={entregador.id}
              entregador={entregador}
              selecionado={entregadorSelecionadoId === entregador.id}
              onSelecionar={onSelecionarEntregador}
              onAlternarPreferencial={onAlternarPreferencial}
            />
          ))}
        </ul>
      )}
    </article>
  );
}