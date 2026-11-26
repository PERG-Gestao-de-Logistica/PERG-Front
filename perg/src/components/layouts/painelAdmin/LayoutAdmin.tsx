import { ReactNode } from "react";
import { useRouter } from "next/router";
import MenuAdmin from "@/components/componentesAdmin/menuAdmin/menuAdmin";
import CabecalhoAdmin from "@/components/componentesAdmin/cabecalhoAdmin/cabecalhoAdmin";
import styles from "./LayoutAdmin.module.css"

interface LayoutEmpresaProps {
  children: ReactNode;
}

export default function LayoutEmpresa({
  children,
}: LayoutEmpresaProps) {
  const { pathname } = useRouter();
  const paginaFixa = [
    "/painelAdmin/visaoGeral",
    "/painelAdmin/trafegoAPI",
    "/painelAdmin/processamento",
    "/painelAdmin/alertas",
  ].includes(pathname);

  return (
    <div className={`${styles.layout} ${paginaFixa ? styles.layoutFixa : ""}`}>
      <MenuAdmin />

      <div className={`${styles.conteudo} ${paginaFixa ? styles.conteudoFixo : ""}`}>
        <CabecalhoAdmin />

        <main className={`${styles.main} ${paginaFixa ? styles.mainFixo : ""}`}>
          {children}
        </main>
      </div>
    </div>
  );
}