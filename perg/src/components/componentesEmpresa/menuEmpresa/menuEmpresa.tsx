import Link from "next/link";
import { useRouter } from "next/router";
import { TbClipboardData } from "react-icons/tb";
import { HiOutlineArchiveBox, HiOutlineIdentification } from "react-icons/hi2";
import { MdOutlineRoute, MdLogout } from "react-icons/md";
import { IoMapOutline, IoSettingsOutline } from "react-icons/io5";
import styles from "./menuEmpresa.module.css";
import { useEffect, useState } from "react";
import { RxHamburgerMenu } from "react-icons/rx";

const itensMenu = [
  {
    nome: "Visão Geral",
    rota: "/painelEmpresa/visaoGeral",
    icone: TbClipboardData,
  },
  {
    nome: "Pedidos",
    rota: "/painelEmpresa/pedidos",
    icone: HiOutlineArchiveBox,
  },
  {
    nome: "Roteirização",
    rota: "/painelEmpresa/roteirizacao",
    icone: MdOutlineRoute,
  },
  {
    nome: "Monitoramento",
    rota: "/painelEmpresa/monitoramento",
    icone: IoMapOutline,
  },
  {
    nome: "Entregadores",
    rota: "/painelEmpresa/entregadores",
    icone: HiOutlineIdentification,
  },
  {
    nome: "Configurações",
    rota: "painelEmpresa/configuracoes",
    icone: IoSettingsOutline,
  },
];



export default function MenuEmpresa() {
  const router = useRouter();

  const [menuAberto, setMenuAberto] = useState(false);
  
    //* Fechar menu com o esc
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


  return (
    <>
      <header className={styles.cabecalhoMobile}>
        <img
          className={styles.logoMobile}
          src="/assets/logos/logoBranca.png"
          alt=""
          aria-hidden="true"
        />

        <button
          type="button"
          className={styles.botaoMenu}
          onClick={() => setMenuAberto((estado) => !estado)}
          aria-label={menuAberto ? "Fechar menu" : "Abrir menu"}
          aria-expanded={menuAberto}
          aria-controls="menu-admin"
        >
          <RxHamburgerMenu />
        </button>
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
      <aside className={`${styles.menuEmpresa} ${ menuAberto ? styles.menuAberto : ""}`} aria-label="Menu principal"
    aria-hidden={
          typeof window !== "undefined" &&
          window.matchMedia("(max-width: 640px)").matches
            ? !menuAberto
            : undefined
        }>
        
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

        <img
          className={styles.imgEntregador}
          src="/assets/images/entregadorMenu.png"
          alt=""
          aria-hidden="true"
        />

        <footer className={styles.perfil}>
          <h3 className={styles.iniciais}>AS</h3>

          <div className={styles.infoUsuario}>
            <h3 className={styles.nomeEmpresa}>Aurora Store</h3>
            <p className={styles.nomeUsuario}>Ana Sousa - Admin</p>
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
