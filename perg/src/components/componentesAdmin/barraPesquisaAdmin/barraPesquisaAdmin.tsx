import { IoSearch } from "react-icons/io5";
import styles from "./barraPesquisaAdmin.module.css"

// TODO: implementar lógica para filtrar o objeto na tela

export default function BarraPesquisaAdmin() {
  return (
    <div className={styles.barraPesquisa}>
      <IoSearch className={styles.icone}/>
      <input
        type="search"
        placeholder="Buscar pedido ou empresa..."
        //* Desativação do autocomplete nativo para o histórico genérico do navegador não atrapalhar a experiência do usuário
        autoComplete="off"
      />
    </div>
  );
}
