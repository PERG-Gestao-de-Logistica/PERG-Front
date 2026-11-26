import { obterCorRota } from "@/constants/coresRotas";
import ItemMonitoramento, {
  type RotaMonitoramento,
} from "../itemMonitoramento/itemMonitoramento";
import styles from "./cardEntregador.module.css";

interface CardEntregadoresProps {
  rotas: RotaMonitoramento[];
  rotaSelecionadaId: string | null;
  onSelecionarRota: (id: string) => void;
}

export default function CardEntregadores({
  rotas,
  rotaSelecionadaId,
  onSelecionarRota,
}: CardEntregadoresProps) {
  return (
    <article className={styles.cardEntregadores}>
      <header className={styles.cabecalhoCard}>
        <h3>Entregadores</h3>
        <p>{rotas.length} em rota</p>
      </header>

      {rotas.length === 0 ? (
        <p className={styles.vazio}>Nenhum entregador neste filtro.</p>
      ) : (
        <ul className={styles.listaEntregadores}>
          {rotas.map((rota, index) => (
            <ItemMonitoramento
              key={rota.id}
              rota={rota}
              cor={rota.cor || obterCorRota(index)}
              selecionada={rotaSelecionadaId === rota.id}
              onSelecionar={onSelecionarRota}
            />
          ))}
        </ul>
      )}
    </article>
  );
}