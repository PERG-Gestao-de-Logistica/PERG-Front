import { BsShieldCheck } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { linhaVeiculo, textoNota, type Entregador } from "../itemEntregador/itemEntregador";
import styles from "./cardEntregadorIndice.module.css";

interface CardDetalhesEntregadorPerfilProps {
  entregador: Entregador;
  ocupado?: boolean;
  onAlternarPreferencial: (id: string) => void;
}

export default function CardDetalhesEntregadorIndice({
  entregador,
  ocupado = false,
  onAlternarPreferencial,
}: CardDetalhesEntregadorPerfilProps) {
  const temHistorico =
    entregador.entregas !== null && entregador.entregas > 0;

  return (
    <article
      className={styles.cardPerfil}
      aria-label={`Detalhes de ${entregador.nome}`}
    >
      <header className={styles.cabecalhoPerfil}>
        <span className={styles.avatarGrande} aria-hidden="true">
          {entregador.iniciais}
        </span>

        <div className={styles.identificacao}>
          <h3>{entregador.nome}</h3>
          <p>{linhaVeiculo(entregador, false)}</p>
        </div>
      </header>

      {entregador.verificado && (
        <div className={styles.seloVerificado}>
          <BsShieldCheck className={styles.iconeSelo} aria-hidden="true" />
          <p>CNH e veículo verificados pela PERG</p>
        </div>
      )}

      <section className={styles.gradeMetricas}>
        <article className={styles.blocoMetrica}>
          <h3>{temHistorico ? entregador.entregas : "—"}</h3>
          <p>entregas com você</p>
        </article>

        <article className={styles.blocoMetrica}>
          <h3>
            {temHistorico && entregador.sucesso !== null
              ? `${entregador.sucesso}%`
              : "—"}
          </h3>
          <p>sucesso</p>
        </article>

        <article className={styles.blocoMetrica}>
          <h3>{textoNota(entregador.nota)}</h3>
          <p>nota média</p>
        </article>

        <article className={styles.blocoMetrica}>
          <h3>{entregador.aceiteMedioMin === null ? "—" : `${entregador.aceiteMedioMin} min`}</h3>
          <p>aceite médio</p>
        </article>
      </section>

      <button
        type="button"
        onClick={() => onAlternarPreferencial(entregador.id)}
        disabled={ocupado}
        className={`${styles.botaoPreferencial} ${
          entregador.preferencial ? styles.botaoRemover : styles.botaoAdicionar
        }`}
      >
        <span>
          {entregador.preferencial
            ? "Remover dos preferenciais"
            : "Adicionar aos preferenciais"}
        </span>
        {entregador.preferencial ? (
          <FaRegHeart aria-hidden="true" />
        ) : (
          <FaHeart aria-hidden="true" />
        )}
      </button>
    </article>
  );
}