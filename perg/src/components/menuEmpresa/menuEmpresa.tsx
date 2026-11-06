import Link from "next/link";
import { useRouter } from "next/router";
import { TbClipboardData } from "react-icons/tb";
import { HiOutlineArchiveBox, HiOutlineIdentification } from "react-icons/hi2";
import { MdOutlineRoute, MdLogout } from "react-icons/md";
import { IoMapOutline, IoSettingsOutline } from "react-icons/io5";
import styles from "./menuEmpresa.module.css";

const itensMenu = [
  {
    nome: "Visão Geral",
    rota: "/visao-geral",
    icone: TbClipboardData,
  },
  {
    nome: "Pedidos",
    rota: "/pedidos",
    icone: HiOutlineArchiveBox,
  },
  {
    nome: "Roteirização",
    rota: "/roteirizacao",
    icone: MdOutlineRoute,
  },
  {
    nome: "Monitoramento",
    rota: "/monitoramento",
    icone: IoMapOutline,
  },
  {
    nome: "Entregadores",
    rota: "/entregadores",
    icone: HiOutlineIdentification,
  },
  {
    nome: "Configurações",
    rota: "/configuracoes",
    icone: IoSettingsOutline,
  },
];

export default function MenuEmpresa() {
  const router = useRouter();

  return (
    <aside className={styles.menuEmpresa} aria-label="Menu principal">
      <img
        className={styles.logo}
        src="/assets/logos/logoBranca.png"
        alt="Logo do Perg"
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
          <MdLogout size={32}/>
        </button>
      </footer>
    </aside>
  );
}
