import Link from "next/link";
import RotaItem from "../itemRotasHoje/itemRotasHoje";
import styles from "./cardRotasHoje.module.css";
import type { RotaHoje } from "@/@types/painel";

// rotas = null enquanto carrega
export default function CardRotasHoje({ rotas }: { rotas: RotaHoje[] | null }) {
  return (
    <article className={styles.rotasHoje}>
      <header>
        <h2 className={styles.titulo}>Rotas Hoje</h2>
        <Link className={styles.monitoramento} href="/painelEmpresa/monitoramento">
          Ver monitoramento
        </Link>
      </header>
      {rotas && rotas.length > 0 ? (
        <ul className={styles.lista}>
          {rotas.map((rota) => (
            <RotaItem key={rota.id} rota={rota} />
          ))}
        </ul>
      ) : (
        <p style={{ color: "var(--cor-texto-secundario)", padding: "var(--espacamento-md) 0" }}>
          {rotas ? "Nenhuma rota para hoje. Roteirize os pedidos para criar as rotas." : "Carregando..."}
        </p>
      )}
    </article>
  );
}
