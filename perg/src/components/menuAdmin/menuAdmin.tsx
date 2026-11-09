import Link from "next/link";
import { useRouter } from "next/router";
import {TbClipboardData,TbDatabaseCog,TbAlertTriangle,TbApiApp,} from "react-icons/tb";
import { SiDatabricks } from "react-icons/si";
import { MdLogout } from "react-icons/md";
import { PiBuildings } from "react-icons/pi";
import { RxHamburgerMenu } from "react-icons/rx";
import styles from "./menuAdmin.module.css";
import { useEffect, useState } from "react";

const itensMenu = [
  {
    nome: "Visão Geral",
    rota: "/visao-geral",
    icone: TbClipboardData,
  },
  {
    nome: "Tráfego e API",
    rota: "/trafegoAPI",
    icone: TbApiApp,
  },
  {
    nome: "Processamento",
    rota: "/processamento",
    icone: SiDatabricks,
  },
  {
    nome: "Empresas",
    rota: "/empresas",
    icone: PiBuildings,
  },
  {
    nome: "Infraestrutura",
    rota: "/infraestrutura",
    icone: TbDatabaseCog,
  },
  {
    nome: "Alertas",
    rota: "/Alertas",
    icone: TbAlertTriangle,
  },
];

export default function MenuAdmin() {
  const router = useRouter();

  const [menuAberto, setMenuAberto] = useState(false);

  //Fechar menu com o esc
  useEffect(() => {
    function fecharComEsc(event: KeyboardEvent ){
      if (event.key == "Escape"){
        setMenuAberto(false);
      }
    }
    window.addEventListener('keydown', fecharComEsc);
    return () => {
      window.addEventListener('keydown', fecharComEsc);
    }
  })

  //Fechar menu ao mudar de página

  return (
    <>
    <header className={styles.cabecalhoMobile}>
      <img
          className={styles.logoMobile}
          src="/assets/logos/logoBranca.png"
          alt=""
          aria-hidden="true"
        />

        <button type="button"
          className={styles.botaoMenu}
          onClick={() => setMenuAberto((estado) => !estado)}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          aria-controls="menu-admin"><RxHamburgerMenu /></button>
    </header>
     {menuAberto && (
        <button
          type="button"
          className={styles.overlay}
          onClick={() => setMenuAberto(false)}
          aria-label="Fechar menu"
          tabIndex={-1}
        />
      )}

    <aside id="menuAdmin" className={`${styles.menuEmpresa} ${ menuAberto ? styles.menuAberto : ""}`} aria-label="Menu principal"
    aria-hidden={
          typeof window !== "undefined" &&
          window.matchMedia("(max-width: 640px)").matches
            ? !menuAberto
            : undefined
        }>
      <div className={styles.logoAdmin}>
        <img
          className={styles.logo}
          src="/assets/logos/logoBranca.png"
          alt="Logo do Perg"
        />
        <img
          className={styles.logoSimbolo}
          src="/assets/logos/simboloBranco.png"
          alt=""
          aria-hidden="true"
        />
        <div className={styles.admin}>
          <p>ADMIN</p>
        </div>
      </div>

      <nav className={styles.navegacao} aria-label="Navegação principal">
        <ul className={styles.lista}>
          {itensMenu.map((item) => {
            const ativo = router.pathname === item.rota;
            const Icone = item.icone;

            return (
              <li key={item.rota}>
                <Link
                  href={item.rota}
                  className={`${styles.item} ${ativo ? styles.itemAtivo : ""}`}
                  aria-current={ativo ? "page" : undefined}
                >
                  <Icone aria-hidden="true" size={32} />
                  <span>{item.nome}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <footer className={styles.perfil}>
        <h3 className={styles.iniciais}>LS</h3>

        <div className={styles.infoUsuario}>
          <h3 className={styles.nomeEmpresa}>Lucas Santos</h3>
          <p className={styles.nomeUsuario}>Admin Master</p>
        </div>

        <button
          type="button"
          className={styles.botaoLogout}
          aria-label="Sair da conta"
        >
          <MdLogout size={32} />
        </button>
      </footer>
    </aside>
    </>
  );
}
