import { BsShieldCheck } from "react-icons/bs";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import type {
  Entregador,
  TipoVeiculoEntregador,
} from "../itemEntregador/itemEntregador";
import styles from "./cardEntregadorIndice.module.css";

interface CardDetalhesEntregadorPerfilProps {
  entregador: Entregador;
  onAlternarPreferencial: (id: string) => void;
}

const NOME_VEICULO: Record<TipoVeiculoEntregador, string> = {
  moto: "Moto",
  carro: "Carro",
  bicicleta: "Bicicleta",
  caminhao: "Caminhão",
};

export default function CardDetalhesEntregadorIndice({
  entregador,
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
          <p>
            {NOME_VEICULO[entregador.veiculo]} · {entregador.placa}
          </p>
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
          <h3>{entregador.nota.toFixed(1).replace(".", ",")}</h3>
          <p>nota média</p>
        </article>

        <article className={styles.blocoMetrica}>
          <h3>{entregador.aceiteMedioMin} min</h3>
          <p>aceite médio</p>
        </article>
      </section>

      <button
        type="button"
        onClick={() => onAlternarPreferencial(entregador.id)}
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