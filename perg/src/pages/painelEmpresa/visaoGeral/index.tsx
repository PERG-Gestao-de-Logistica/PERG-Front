import {
  TbCircleNumber1,
  TbCircleNumber2,
  TbCircleNumber3,
  TbCircleNumber4,
} from "react-icons/tb";
import styles from "./visaoGeral.module.css";
import { HiOutlineArchiveBox } from "react-icons/hi2";
import { MdOutlineRoute } from "react-icons/md";

export default function VisaoGeralEmpresa() {
  return (
    <main className={styles.container}>
      <article className={styles.primeirosPassos}>
        <div className={styles.conteudo}>
          <h3 className={styles.titulo}>Primeiros Passos 2 - 4</h3>
          <h2 className={styles.subtitulo}>
            Falta pouco para a sua primeira rota
          </h2>
          <ul className={styles.lista}>
            <li>
              <TbCircleNumber1 className={styles.icone} /> Criar conta
            </li>
            <li>
              <TbCircleNumber2 className={styles.icone} />
              Cadastrar ponto de coleta
            </li>
            <li>
              <TbCircleNumber3 className={styles.icone} />
              Convitar o primeiro motorista
            </li>
            <li>
              <TbCircleNumber4 className={styles.icone} />
              Importar pedidos
            </li>
          </ul>
        </div>
        <img
          src="/assets/images/entregadorMoto.png"
          alt=""
          className={styles.imagem}
        />
      </article>
      <article className={styles.kpis}>
        <div className={styles.bloco}>
          <header> <HiOutlineArchiveBox/> Pedidos Hoje</header>
          <p>
            <data value="3.45">3,45%</data>
          </p>
        </div>
        <div className={styles.bloco}>
          <header><MdOutlineRoute/> Rotas Ativas</header>
          <p>
            <data value="3.45">3,45%</data>
          </p>
        </div>
        <div className={styles.bloco}>
          <header>Pedidos Hoje</header>
          <p>
            <data value="3.45">3,45%</data>
          </p>
        </div>
        <div className={styles.bloco}>
          <header>Pedidos Hoje</header>
          <p>
            <data value="3.45">3,45%</data>
          </p>
        </div>
      </article>
      <article className={styles.rotasHoje}>
        <h2 className={styles.subtitulo}>Rotas Hoje</h2>
      </article>
      <article className={styles.ocorrencias}>
        <h2 className={styles.subtitulo}>Ocorrências</h2>
        <img src="/assets/images/entregadorCaixas.png" alt="" />
        <div className={styles.tituloTexto}>
          <h3>Nenhuma ocorrência hoje</h3>
          <p>Quando um motorista um problema ele aparece aqui</p>
        </div>
      </article>
    </main>
  );
}
