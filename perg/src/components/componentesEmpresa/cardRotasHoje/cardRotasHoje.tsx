import Link from "next/link";
import RotaItem from "../itemRotasHoje/itemRotasHoje";
import styles from "./cardRotasHoje.module.css";
import type { RotaHoje } from "@/@types/painel";
import Esqueleto from "@/components/esqueleto/esqueleto";

// Linhas fantasmas no formato de um item de rota
function RotasCarregando() {
  return (
    <ul className={styles.lista} aria-busy="true" aria-label="Carregando rotas">
      {[1, 2, 3, 4].map((i) => (
        <li
          key={i}
          style={{
            display: "flex",
            alignItems: "center",
            gap: "var(--espacamento-md)",
            padding: "var(--espacamento-sm) 0",
            borderBottom: "var(--largura-borda) solid var(--cor-borda)",
          }}
        >
          <Esqueleto largura="2.5rem" altura="2.5rem" raio="var(--raio-padrao)" />
          <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: "6px" }}>
            <Esqueleto largura="60%" />
            <Esqueleto largura="40%" altura="0.8rem" />
          </div>
          <Esqueleto largura="25%" altura="0.5rem" raio="999px" />
          <Esqueleto largura="5rem" altura="1.8rem" raio="var(--raio-padrao)" />
        </li>
      ))}
    </ul>
  );
}

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
      {rotas === null ? (
        <RotasCarregando />
      ) : rotas.length > 0 ? (
        <ul className={styles.lista}>
          {rotas.map((rota) => (
            <RotaItem key={rota.id} rota={rota} />
          ))}
        </ul>
      ) : (
        <p style={{ color: "var(--cor-texto-secundario)", padding: "var(--espacamento-md) 0" }}>
          Nenhuma rota para hoje. Roteirize os pedidos para criar as rotas.
        </p>
      )}
    </article>
  );
}
