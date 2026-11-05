import { TbClipboardData } from "react-icons/tb";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { MdOutlineRoute } from "react-icons/md";
import { IoMapOutline } from "react-icons/io5";
import { HiOutlineIdentification } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";
import styles from "../menuEmpresa/menuEmpresa.module.css";

export default function MenuEmpresa() {
  return (
    <aside className={styles.menuEmpresa}>
      <img className={styles.logo} src="/assets/logos/logoBranca.png" alt="" />
      <section className={styles.menuNavegacao}>
        <nav className={styles.navegacao}>
          <ul className={styles.lista}>
            <li className={styles.topico}>
              <a href="" className={styles.item}>
                <TbClipboardData />
                Visão Geral
              </a>
            </li>
            <li>
              <a href="" className={styles.item}>
                <HiOutlineArchiveBox />
                Pedidos
              </a>
            </li>
            <li>
              <a href="" className={styles.item}>
                <MdOutlineRoute />
                Roteirização
              </a>
            </li>
            <li>
              <a href="" className={styles.item}>
                <IoMapOutline />
                Monitoramento
              </a>
            </li>
            <li>
              <a href="" className={styles.item}>
                <HiOutlineIdentification />
                Entregadores
              </a>
            </li>
            <li>
              <a href="" className={styles.item}>
                <IoSettingsOutline />
                Configurações
              </a>
            </li>
          </ul>
        </nav>
      </section>
      <img
        className={styles.imgEntregador}
        src="/assets/images/entregadorMenu.png"
        alt=""
      />
      <section className={styles.perfil}>
        <h3 className={styles.iniciais}>AS</h3>
        <div className={styles.infoUsuario}>
          <h3 className={styles.nomeEmpresa}>Aurora Store</h3>
          <h4 className={styles.nomeUsuario}>Ana Sousa - Admin</h4>
        </div>
        <MdLogout size={1} />
      </section>
    </aside>
  );
}
