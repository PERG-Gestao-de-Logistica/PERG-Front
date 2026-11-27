import type { CSSProperties } from "react";
import styles from "./esqueleto.module.css";

interface EsqueletoProps {
  largura?: string;
  altura?: string;
  raio?: string;
  style?: CSSProperties;
}

// Placeholder animado de carregamento
export default function Esqueleto({ largura = "100%", altura = "1rem", raio = "var(--raio-pequeno)", style }: EsqueletoProps) {
  return (
    <span
      className={styles.esqueleto}
      style={{ width: largura, height: altura, borderRadius: raio, ...style }}
      aria-hidden="true"
    />
  );
}