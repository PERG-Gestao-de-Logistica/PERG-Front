import { ReactNode } from "react";
import MenuEmpresa from "../../componentesEmpresa/menuEmpresa/menuEmpresa";
import CabecalhoEmpresa from "../../componentesEmpresa/cabecalhoEmpresa/cabecalhoEmpresa";
import styles from "./LayoutEmpresa.module.css"

interface LayoutEmpresaProps {
  children: ReactNode;
}

export default function LayoutEmpresa({
  children,
}: LayoutEmpresaProps) {
  return (
    <div className={styles.layout}>
      <MenuEmpresa />

      <div className={styles.conteudo}>
        <CabecalhoEmpresa />

        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}

