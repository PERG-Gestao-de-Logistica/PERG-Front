import { IoSearch } from "react-icons/io5";
import styles from "./barraPesquisaEmpresa.module.css"

// TODO: implementar lógica para filtrar o objeto na tela

export default function BarraPesquisaEmpresa() {
  return (
    <div className={styles.barraPesquisa}>
      <IoSearch className={styles.icone} size={28} />
      <input
        type="search"
        placeholder="Buscar pedido ou entregador..."
        //* Desativação do autocomplete nativo para o histórico genérico do navegador não atrapalhar a experiência do usuário
        autoComplete="off"
      />
    </div>
  );
}
