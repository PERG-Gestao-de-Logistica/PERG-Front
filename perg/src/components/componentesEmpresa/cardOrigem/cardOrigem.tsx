import { TbMapPin } from "react-icons/tb";
import styles from "./cardOrigem.module.css";
import type { Origem } from "@/@types/origem";
import { formatarCep, formatarTelefone, hora, textoDias } from "@/utils/origem";

interface CardOrigemProps {
  origem: Origem;
  ocupado?: boolean;
  onEditar: (origem: Origem) => void;
  onDefinirPadrao: (origem: Origem) => void;
}

export default function CardOrigem({ origem, ocupado, onEditar, onDefinirPadrao }: CardOrigemProps) {
  const responsavel = [origem.responsavelNome, formatarTelefone(origem.responsavelTelefone)].filter(Boolean).join(" · ");

  return (
    <article className={`${styles.card} ${origem.padrao ? styles.cardPadrao : ""}`}>
      <header className={styles.cabecalho}>
        <h3 className={styles.nome}>{origem.nome}</h3>
        {origem.padrao && <span className={styles.seloPadrao}>Padrão</span>}
      </header>

      <div className={styles.endereco}>
        <TbMapPin className={styles.iconePin} aria-hidden="true" />
        <div>
          <p className={styles.rua}>
            {origem.logradouro}, {origem.numero} · {origem.bairro}
          </p>
          <p className={styles.cidade}>
            {origem.cidade}/{origem.uf} · CEP {formatarCep(origem.cep)}
          </p>
        </div>
      </div>

      <dl className={styles.detalhes}>
        <div>
          <dt>Responsável</dt>
          <dd>{responsavel || "Não informado"}</dd>
        </div>
        <div>
          <dt>Funcionamento</dt>
          <dd className={styles.funcionamento}>
            {textoDias(origem.dias)}, {hora(origem.abre)}–{hora(origem.fecha)}
          </dd>
        </div>
      </dl>

      <footer className={styles.acoes}>
        <button type="button" className={styles.botao} onClick={() => onEditar(origem)} disabled={ocupado}>
          Editar origem
        </button>
        {!origem.padrao && (
          <button type="button" className={styles.botao} onClick={() => onDefinirPadrao(origem)} disabled={ocupado}>
            Definir como padrão
          </button>
        )}
      </footer>
    </article>
  );
}