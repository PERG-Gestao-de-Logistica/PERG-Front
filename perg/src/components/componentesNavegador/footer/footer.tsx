import styles from "./footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.logoContainer}>
        <img
          src="/assets/logos/c5Verde.png"
          alt="Logo C5 Solutions"
          className={styles.logo}
        />
      </div>

      <div className={styles.information}>
        <p className={styles.mutedText}>
          Tecnologia para conectar toda a
          <br />
          operação de entrega.
        </p>
      </div>

      <nav className={styles.links}>
        <a href="#produto">Produto</a>
        <a href="#solucoes">Soluções</a>
        <a href="#empresa">Empresa</a>
      </nav>
    </footer>
  );
}