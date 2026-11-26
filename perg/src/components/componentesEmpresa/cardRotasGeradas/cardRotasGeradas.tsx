import type { ReactNode } from "react";
import type { RotaGerada } from "@/components/componentesEmpresa/mapaRoteirizacao/mapaRoteirizacao";
import { obterCorRota } from "@/constants/coresRotas";
import ItemRotaGerada from "../itemRotasGeradas/itemRotasGeradas";
import styles from "./cardRotasGeradas.module.css";

interface CardRotasGeradasProps {
  rotas: RotaGerada[];
  rotaSelecionadaId: string | null;
  onSelecionarRota: (id: string) => void;
  // Botão no cabeçalho (ex.: Ofertar rotas)
  acao?: ReactNode;
  // Aviso ou erro mostrado abaixo do título
  mensagem?: { texto: string; erro?: boolean } | null;
  carregando?: boolean;
  // Rotas que ainda podem ser canceladas (não ofertadas) e a ação de cancelar
  idsCancelaveis?: string[];
  onCancelarRota?: (id: string) => Promise<void>;
}

export default function CardRotasGeradas({
  rotas,
  rotaSelecionadaId,
  onSelecionarRota,
  acao,
  mensagem,
  carregando,
  idsCancelaveis = [],
  onCancelarRota,
}: CardRotasGeradasProps) {
  return (
    <article className={styles.rotasGeradas}>
      <header className={styles.cabecalhoCard}>
        <h3>{carregando ? "Rotas geradas" : `${rotas.length} ${rotas.length === 1 ? "rota gerada" : "rotas geradas"}`}</h3>
        {acao}
      </header>

      {mensagem && (
        <p
          role={mensagem.erro ? "alert" : "status"}
          style={{
            margin: 0,
            fontFamily: "var(--fonte-texto)",
            fontSize: "var(--tamanho-texto-auxiliar)",
            color: mensagem.erro ? "var(--cor-perigo)" : "var(--cor-primaria-verde-escuro)",
          }}
        >
          {mensagem.texto}
        </p>
      )}

      {!carregando && rotas.length === 0 && (
        <p style={{ margin: 0, fontFamily: "var(--fonte-texto)", color: "var(--cor-texto-secundario)" }}>
          Nenhuma rota planejada para hoje. Escolha a prioridade e clique em Otimizar Rotas.
        </p>
      )}

      <ul className={styles.listaRotas}>
        {rotas.map((rota, index) => (
          <ItemRotaGerada
            key={rota.id}
            rota={rota}
            cor={rota.cor || obterCorRota(index)}
            selecionada={rotaSelecionadaId === rota.id}
            onSelecionar={onSelecionarRota}
            onCancelar={onCancelarRota && idsCancelaveis.includes(rota.id) ? onCancelarRota : undefined}
          />
        ))}
      </ul>
    </article>
  );
}