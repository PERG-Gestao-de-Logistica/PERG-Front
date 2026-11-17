import styles from "./roteirizacao.module.css";
import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import { FaCar, FaMotorcycle, FaTruck, FaVanShuttle } from "react-icons/fa6";
import { IoFlash } from "react-icons/io5";

export default function Roteirizacao() {
  return (
    <main className={styles.conteudo}>
      <section className={styles.parametrosRotas}>
        <article className={styles.parametros}>
          <header>
            <h3 className={styles.titulo}>Parâmetros</h3>
            <p>124 pedidos - CD Aurora</p>
          </header>
          <h4 className={styles.subtitulo}>Priorizar</h4>
          <div className={styles.escolhaParametros}>
            <button className={styles.indice}>Custo</button>
            <button className={styles.indice}>Tempo</button>
            <button className={styles.indice}>Km</button>
            <button className={styles.indice}>Veículos</button>
          </div>
          <h4 className={styles.subtitulo}>Veículos Disponíveis</h4>
          <div className={styles.veiculosDisponiveis}>
            <p className={styles.indiceDisponivel}><FaMotorcycle className={styles.icone}/>8 Motos</p>
            <p className={styles.indiceDisponivel}><FaCar className={styles.icone}/> 4 Carros</p>
            <p className={styles.indiceDisponivel}><FaVanShuttle className={styles.icone}/>2 Vans</p>
            <p className={styles.indiceDisponivel}><FaTruck className={styles.icone}/>6 Caminhões</p>
          </div>
          <button className={styles.botaoOtimizarRotas}><IoFlash className={styles.iconeBotao}/>Otimizar Rotas</button>
        </article>
        <article className={styles.rotasGeradas}>
            <h3 className={styles.titulo}>Rotas Geradas</h3>
        </article>
      </section>
      <section className={styles.mapa}>
      </section>
    </main>
  );
}
