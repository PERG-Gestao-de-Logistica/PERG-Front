import styles from "./headerRastreio.module.css";

export default function HeaderRastreio() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img
          src="/assets/logos/logoCinza.png"
          alt="Logo PERG Cinza"
          className={styles.logo}
        />

        <p className={styles.title}>
          Acompanhe sua entrega
        </p>


      </div>
    </header>
  );
}