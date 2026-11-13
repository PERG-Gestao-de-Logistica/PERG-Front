import Button from "@/components/botao";
import styles from "./header.module.css";

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img
          src="/assets/logos/logoCinza.png"
          alt="Logo PERG Cinza"
          className={styles.logo}
        />

        <div className={styles.actions}>
          <Button variant="principal">
            Assine Agora
          </Button>

          <Button variant="texto">
            Entrar
          </Button>
        </div>
      </div>
    </header>
  );
}