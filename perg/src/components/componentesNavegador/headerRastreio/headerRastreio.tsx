import Button from "@/components/botao";
import styles from "./headerRastreio.module.css";
import Link from "next/link";

export default function HeaderRastreio() {
  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <img
          src="/assets/logos/logoCinza.png"
          alt="Logo PERG Cinza"
          className={styles.logo}
        />

        <div className={styles.actions}>
          <Link href="/navegador/acompanharEntrega">
            <Button variant="texto">Acompanhe sua entrega</Button>
          </Link>
        </div>
      </div>
    </header>
  );
}
