import { ReactNode } from "react";
import MenuAdmin from "@/components/componentesAdmin/menuAdmin/menuAdmin";
import CabecalhoAdmin from "@/components/componentesAdmin/cabecalhoAdmin/cabecalhoAdmin";
import styles from "./LayoutAdmin.module.css"

interface LayoutEmpresaProps {
  children: ReactNode;
}

export default function LayoutEmpresa({
  children,
}: LayoutEmpresaProps) {
  return (
    <div className={styles.layout}>
      <MenuAdmin />

      <div className={styles.conteudo}>
        <CabecalhoAdmin />

        <main className={styles.main}>
          {children}
        </main>
      </div>
    </div>
  );
}