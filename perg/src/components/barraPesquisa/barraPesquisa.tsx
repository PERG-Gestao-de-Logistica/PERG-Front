import { useState } from "react";
import { IoSearch } from "react-icons/io5";
import styles from "./barraPesquisa.module.css"

interface BarraPesquisaProps {
  valor?: string;
//   onChange: (valor: string) => void;
  placeholder?: string;
}

export default function BarraPesquisa({
  valor,
//   onChange,
  placeholder = "Buscar...",
}: BarraPesquisaProps) {
  return (
    <div className={styles.barraPesquisa}>
      <IoSearch className={styles.icone} size={28} />
      <input
        type="search"
        placeholder="Buscar pedido ou entregador..."
        // onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
