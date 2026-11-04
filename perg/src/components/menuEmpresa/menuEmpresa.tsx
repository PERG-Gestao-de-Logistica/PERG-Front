import { TbClipboardData } from "react-icons/tb";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { MdOutlineRoute } from "react-icons/md";
import { IoMapOutline } from "react-icons/io5";
import { HiOutlineIdentification } from "react-icons/hi2";
import { IoSettingsOutline } from "react-icons/io5";
import { MdLogout } from "react-icons/md";  
import styles from "../menuEmpresa/menuEmpresa.module.css"

export default function MenuEmpresa() {
    return(
        <aside className={styles.menuEmpresa}>
            <img className="logo" src="/assets/logos/logoBranca.png" alt="" />
            <nav className={styles.navegacao}>
                <ul className="lista">
                    <li className={styles.item}><a href=""><TbClipboardData />Visão Geral</a></li>
                    <li className={styles.item}><a href=""><HiOutlineArchiveBox />Pedidos</a></li>
                    <li className={styles.item}><a href=""><MdOutlineRoute />Roteirização</a></li>
                    <li className={styles.item}><a href=""><IoMapOutline />Monitoramento</a></li>
                    <li className={styles.item}><a href=""><HiOutlineIdentification />Entregadores</a></li>
                    <li className={styles.item}><a href=""><IoSettingsOutline />Configurações</a></li>
                </ul>
            </nav>
            <img src="/assets/images/entregadorMenu.png" alt="" />
            <section className="perfil">
                <h2>AS</h2>
                <div>
                <h2>Aurora Store</h2>
                <h3>Ana Sousa - Admin</h3>
                </div>
                <MdLogout />    
            </section>
        </aside>
    );
};