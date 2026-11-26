import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import styles from "./paginacao.module.css";

interface PaginacaoProps {
  pagina: number;
  totalPaginas: number;
  onMudar: (pagina: number) => void;
  desabilitada?: boolean;
}

// Números das páginas com reticências: 1 … 4 5 6 … 12
function paginasVisiveis(atual: number, total: number): (number | "…")[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
  const lista: (number | "…")[] = [1];
  const inicio = Math.max(2, atual - 1);
  const fim = Math.min(total - 1, atual + 1);
  if (inicio > 2) lista.push("…");
  for (let p = inicio; p <= fim; p++) lista.push(p);
  if (fim < total - 1) lista.push("…");
  lista.push(total);
  return lista;
}

export default function Paginacao({ pagina, totalPaginas, onMudar, desabilitada }: PaginacaoProps) {
  if (totalPaginas <= 1) return null;

  return (
    <nav className={styles.paginacao} aria-label="Páginas">
      <button type="button" className={styles.seta} onClick={() => onMudar(pagina - 1)}
        disabled={desabilitada || pagina <= 1} aria-label="Página anterior">
        <TbChevronLeft aria-hidden="true" />
      </button>

      {paginasVisiveis(pagina, totalPaginas).map((p, i) =>
        p === "…" ? (
          <span key={`r${i}`} className={styles.reticencias}>…</span>
        ) : (
          <button key={p} type="button" onClick={() => onMudar(p)} disabled={desabilitada}
            className={`${styles.pagina} ${p === pagina ? styles.paginaAtiva : ""}`}
            aria-current={p === pagina ? "page" : undefined}>
            {p}
          </button>
        ),
      )}

      <button type="button" className={styles.seta} onClick={() => onMudar(pagina + 1)}
        disabled={desabilitada || pagina >= totalPaginas} aria-label="Próxima página">
        <TbChevronRight aria-hidden="true" />
      </button>
    </nav>
  );
}
