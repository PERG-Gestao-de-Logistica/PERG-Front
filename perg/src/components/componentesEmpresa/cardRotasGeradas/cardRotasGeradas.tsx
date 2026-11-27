import type { RotaGerada } from "@/components/componentesEmpresa/mapaRoteirizacao/mapaRoteirizacao";
import { obterCorRota } from "@/constants/coresRotas";
import ItemRotaGerada from "../itemRotasGeradas/itemRotasGeradas";
import styles from "./cardRotasGeradas.module.css";

interface CardRotasGeradasProps {
  rotas: RotaGerada[];
  rotaSelecionadaId: string | null;
  onSelecionarRota: (id: string) => void;
}

export default function CardRotasGeradas({
  rotas,
  rotaSelecionadaId,
  onSelecionarRota,
}: CardRotasGeradasProps) {
  return (
    <article className={styles.rotasGeradas}>
      <header className={styles.cabecalhoCard}>
        <h3>{rotas.length} rotas geradas</h3>
      </header>

      <ul className={styles.listaRotas}>
        {rotas.map((rota, index) => (
          <ItemRotaGerada
            key={rota.id}
            rota={rota}
            cor={rota.cor || obterCorRota(index)}
            selecionada={rotaSelecionadaId === rota.id}
            onSelecionar={onSelecionarRota}
          />
        ))}
      </ul>
    </article>
  );
}