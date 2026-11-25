import styles from "./cardOcorrencia.module.css";
import type { OcorrenciaAberta, TipoOcorrencia } from "@/@types/painel";

const TEXTOS: Record<TipoOcorrencia, string> = {
  ClienteAusente: "Cliente ausente",
  EnderecoNaoEncontrado: "Endereço não encontrado",
  Recusado: "Entrega recusada",
  Avaria: "Produto avariado",
  Outro: "Outro motivo",
};

const hora = (data: string) =>
  new Date(data).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });

export default function CardOcorrencia({ ocorrencias }: { ocorrencias: OcorrenciaAberta[] | null }) {
  return (
    <article className={styles.ocorrencias}>
      <header>
        <h2 className={styles.titulo}>Ocorrências</h2>
      </header>
      {ocorrencias && ocorrencias.length > 0 ? (
        <ul className={styles.lista}>
          {ocorrencias.map((o) => (
            <li
              key={o.id}
              style={{
                padding: "var(--espacamento-sm) 0",
                borderBottom: "var(--largura-borda) solid var(--cor-borda)",
                fontFamily: "var(--fonte-texto)",
              }}
            >
              <strong style={{ color: "var(--cor-perigo)", fontFamily: "var(--fonte-titulo)" }}>
                {TEXTOS[o.tipo] ?? o.tipo}
              </strong>
              <p style={{ margin: "2px 0 0", color: "var(--cor-primaria-verde-escuro)" }}>
                Pedido #{o.numeroPedido} · {o.clienteNome}
              </p>
              <small style={{ color: "var(--cor-texto-secundario)" }}>
                {o.entregadorNome ? `${o.entregadorNome} · ` : ""}
                {hora(o.registradaEm)}
              </small>
            </li>
          ))}
        </ul>
      ) : (
        <div className={styles.imagemTitulo}>
          <img
            src="/assets/images/entregadorCaixas.png"
            className={styles.imagemEntregador}
            alt=""
          />
          <div className={styles.tituloTexto}>
            <h3>Nenhuma ocorrência em aberto</h3>
            <p>Quando um motorista registrar um problema, ele aparecerá aqui</p>
          </div>
        </div>
      )}
    </article>
  );
}
