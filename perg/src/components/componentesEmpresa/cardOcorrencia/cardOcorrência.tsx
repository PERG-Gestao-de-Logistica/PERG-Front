import styles from "./cardOcorrencia.module.css";

// TODO: Ajustar card para implementar lista de ocorrencias - lista já está no css

export default function CardOcorrencia() {
  return (
    <article className={styles.ocorrencias}>
      <header>
        <h2 className={styles.titulo}>Ocorrências</h2>
      </header>
      <div   className={styles.imagemTitulo}>
        <img
          src="/assets/images/entregadorCaixas.png"
          className={styles.imagemEntregador}
          alt=""
        />
        <div className={styles.tituloTexto}>
          <h3>Nenhuma ocorrência hoje</h3>
          <p>Quando um motorista registrar um problema, ele aparecerá aqui</p>
        </div>
      </div>
    </article>
  );
}
