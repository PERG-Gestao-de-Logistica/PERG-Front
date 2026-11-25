import Button from "@/components/botao";
import styles from "./header.module.css";
import Link from "next/link";

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
          <Link href="/onboarding/cadastroConta">
            <Button variant="principal">Assine Agora</Button>
          </Link>

          <Link href="/login">
            <Button variant="texto">Entrar</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
