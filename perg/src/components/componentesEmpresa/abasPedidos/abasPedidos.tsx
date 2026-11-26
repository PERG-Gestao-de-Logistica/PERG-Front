import { useCallback, useEffect, useRef, useState } from "react";
import { TbChevronLeft, TbChevronRight } from "react-icons/tb";
import styles from "./abasPedidos.module.css";
import type { ContagemPedidos, SituacaoPedido } from "@/@types/pedido";

const ABAS: { chave: SituacaoPedido; nome: string; alerta?: boolean }[] = [
  { chave: "todos", nome: "Todos" },
  { chave: "prontos", nome: "Prontos p/ roteirizar" },
  { chave: "problemas", nome: "Com problema", alerta: true },
  { chave: "emRota", nome: "Em rota" },
  { chave: "entregues", nome: "Entregues" },
  { chave: "ocorrencias", nome: "Ocorrências", alerta: true },
];

interface AbasPedidosProps {
  ativa: SituacaoPedido;
  contagem: ContagemPedidos | null;
  onMudar: (aba: SituacaoPedido) => void;
}

// Filtro por situação, com a quantidade de cada aba (mesmo visual das abas de configurações).
// Se não couber na tela, as abas rolam de lado e aparecem setas indicando que há mais.
export default function AbasPedidos({ ativa, contagem, onMudar }: AbasPedidosProps) {
  const navRef = useRef<HTMLElement>(null);
  const [setas, setSetas] = useState({ esquerda: false, direita: false });

  const atualizarSetas = useCallback(() => {
    const nav = navRef.current;
    if (!nav) return;
    const fim = nav.scrollWidth - nav.clientWidth;
    setSetas({ esquerda: nav.scrollLeft > 2, direita: nav.scrollLeft < fim - 2 });
  }, []);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;
    atualizarSetas();
    nav.addEventListener("scroll", atualizarSetas, { passive: true });
    const observador = new ResizeObserver(atualizarSetas);
    observador.observe(nav);
    return () => {
      nav.removeEventListener("scroll", atualizarSetas);
      observador.disconnect();
    };
  }, [atualizarSetas]);

  // Contagens mudam a largura das abas
  useEffect(atualizarSetas, [contagem, atualizarSetas]);

  // Mantém a aba escolhida visível
  useEffect(() => {
    navRef.current
      ?.querySelector<HTMLElement>(`[data-aba="${ativa}"]`)
      ?.scrollIntoView({ block: "nearest", inline: "nearest", behavior: "smooth" });
  }, [ativa]);

  const rolar = (sentido: 1 | -1) => {
    const nav = navRef.current;
    if (nav) nav.scrollBy({ left: sentido * nav.clientWidth * 0.6, behavior: "smooth" });
  };

  return (
    <div className={styles.envoltorio}>
      {setas.esquerda && (
        <button type="button" className={`${styles.seta} ${styles.setaEsquerda}`} onClick={() => rolar(-1)}
          aria-label="Ver filtros anteriores">
          <TbChevronLeft aria-hidden="true" />
        </button>
      )}

      <nav ref={navRef} className={styles.abas} aria-label="Filtrar pedidos">
        {ABAS.map(({ chave, nome, alerta }) => {
          const total = contagem?.[chave];
          const destacar = alerta && (total ?? 0) > 0;
          return (
            <button
              key={chave}
              type="button"
              data-aba={chave}
              onClick={() => onMudar(chave)}
              className={`${styles.aba} ${ativa === chave ? styles.abaAtiva : ""}`}
              aria-pressed={ativa === chave}
            >
              {nome}
              <span className={`${styles.contador} ${destacar ? styles.contadorAlerta : ""}`}>{total ?? "–"}</span>
            </button>
          );
        })}
      </nav>

      {setas.direita && (
        <button type="button" className={`${styles.seta} ${styles.setaDireita}`} onClick={() => rolar(1)}
          aria-label="Ver mais filtros">
          <TbChevronRight aria-hidden="true" />
        </button>
      )}
    </div>
  );
}
