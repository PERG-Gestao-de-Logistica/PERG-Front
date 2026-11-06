import Link from "next/link";
import { useRouter } from "next/router";
import { TbClipboardData, TbDatabaseCog, TbAlertTriangle, TbApiApp} from "react-icons/tb";
import { SiDatabricks } from "react-icons/si";
import { MdLogout } from "react-icons/md";
import { PiBuildings } from "react-icons/pi";
import styles from "./menuAdmin.module.css";

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

  return (
    <aside className={styles.menuEmpresa} aria-label="Menu principal">
      <div className={styles.logoAdmin}>
        <img
          className={styles.logo}
          src="/assets/logos/logoBranca.png"
          alt="Logo do Perg"
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
  );
}
