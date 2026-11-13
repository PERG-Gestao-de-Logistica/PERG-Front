import Link from "next/link";
import { useRouter } from "next/router";
import {TbClipboardData,TbDatabaseCog,TbAlertTriangle,TbApiApp,} from "react-icons/tb";
import { SiDatabricks } from "react-icons/si";
import { MdLogout } from "react-icons/md";
import { RxHamburgerMenu } from "react-icons/rx";
import styles from "./menuAdmin.module.css";
import { useEffect, useState } from "react";

//* // Array de configuração dos links do menu.
const itensMenu = [
  {
    nome: "Visão Geral",
    rota: "/painelAdmin/visaoGeral",
    icone: TbClipboardData,
  },
  {
    nome: "Tráfego e API",
    rota: "/painelAdmin/trafegoAPI",
    icone: TbApiApp,
  },
  {
    nome: "Processamento",
    rota: "/painelAdmin/processamento",
    icone: SiDatabricks,
  },
  //! AVISO: Só será utilizado se sobrar tempo para construção da página
  // {
  //   nome: "Empresas",
  //   rota: "/painelAdmin/empresas",
  //   icone: PiBuildings,
  // },
  //! AVISO: Só será utilizado se sobrar tempo para construção da página
  // {
  //   nome: "Infraestrutura",
  //   rota: "/painelAdmin/infraestrutura",
  //   icone: TbDatabaseCog,
  // },
  {
    nome: "Alertas",
    rota: "/painelAdmin/alertas",
    icone: TbAlertTriangle,
  },
];

export default function MenuAdmin() {
  const router = useRouter();

  const [menuAberto, setMenuAberto] = useState(false);

  //* Fechar menu com o esc
  useEffect(() => {
    function fecharComEsc(event: KeyboardEvent ){
      if (event.key == "Escape"){
        setMenuAberto(false);
      }
    }
    //* Adiciona o ouvinte de teclado na janela
    window.addEventListener('keydown', fecharComEsc);
    //* Função de limpeza (cleanup): executada quando o componente desmonta
    return () => {
      window.removeEventListener('keydown', fecharComEsc);
    };
  }, []);

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
          aria-controls="menuAdmin"><RxHamburgerMenu /></button>
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

    <aside id="menuAdmin" className={`${styles.menuAdmin} ${ menuAberto ? styles.menuAberto : ""}`} aria-label="Menu principal"
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
          <h3 className={styles.nomeUsuario}>Lucas Santos</h3>
          <p className={styles.nomeEmpresa}>Admin Master</p>
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
