import Link from "next/link";
import type { IconType } from "react-icons";
import { TbAlertCircle, TbChevronRight, TbHandStop, TbMapPinOff, TbPackageOff, TbUserX } from "react-icons/tb";
import styles from "./cardOcorrencia.module.css";
import type { OcorrenciaAberta, TipoOcorrencia } from "@/@types/painel";
import Esqueleto from "@/components/esqueleto/esqueleto";

const TIPOS: Record<TipoOcorrencia, { texto: string; Icone: IconType }> = {
  ClienteAusente: { texto: "Cliente ausente", Icone: TbUserX },
  EnderecoNaoEncontrado: { texto: "Endereço não encontrado", Icone: TbMapPinOff },
  Recusado: { texto: "Entrega recusada", Icone: TbHandStop },
  Avaria: { texto: "Produto avariado", Icone: TbPackageOff },
  Outro: { texto: "Outro motivo", Icone: TbAlertCircle },
};

// "agora", "há 12 min", "há 2 h" ou o horário, se for mais antiga
function quando(data: string) {
  const minutos = Math.floor((Date.now() - new Date(data).getTime()) / 60_000);
  if (minutos < 1) return "agora";
  if (minutos < 60) return `há ${minutos} min`;
  if (minutos < 6 * 60) return `há ${Math.floor(minutos / 60)} h`;
  return new Date(data).toLocaleTimeString("pt-BR", { hour: "2-digit", minute: "2-digit" });
}

// Abre a tela de pedidos já filtrada pelo número do pedido
const linkPedido = (numero: number) => `/painelEmpresa/pedidos?numero=${numero}`;

export default function CardOcorrencia({ ocorrencias }: { ocorrencias: OcorrenciaAberta[] | null }) {
  const total = ocorrencias?.length ?? 0;

  return (
    <article className={styles.ocorrencias}>
      <header className={styles.cabecalho}>
        <div className={styles.tituloGrupo}>
          <h2 className={styles.titulo}>Ocorrências</h2>
          {total > 0 && <span className={styles.contador}>{total} em aberto</span>}
        </div>
        {total > 0 && (
          <Link href="/painelEmpresa/pedidos" className={styles.verTodas}>
            Ver pedidos
          </Link>
        )}
      </header>

      {ocorrencias === null ? (
        <ul className={styles.lista} aria-busy="true" aria-label="Carregando ocorrências">
          {[1, 2, 3].map((i) => (
            <li key={i} className={styles.itemCarregando}>
              <Esqueleto largura="2.5rem" altura="2.5rem" raio="50%" />
              <div className={styles.textos}>
                <Esqueleto largura="50%" />
                <Esqueleto largura="75%" altura="0.85rem" />
              </div>
            </li>
          ))}
        </ul>
      ) : total > 0 ? (
        <ul className={styles.lista}>
          {ocorrencias.map((o) => {
            const { texto, Icone } = TIPOS[o.tipo] ?? TIPOS.Outro;
            return (
              <li key={o.id}>
                <Link
                  href={linkPedido(o.numeroPedido)}
                  className={styles.item}
                  aria-label={`${texto} no pedido ${o.numeroPedido}. Ver pedido`}
                >
                  <span className={styles.iconeTipo}>
                    <Icone aria-hidden="true" />
                  </span>
                  <div className={styles.textos}>
                    <strong className={styles.tipo}>{texto}</strong>
                    <span className={styles.detalhe}>
                      Pedido #{o.numeroPedido} · {o.clienteNome}
                    </span>
                    <span className={styles.meta}>
                      {o.entregadorNome ? `${o.entregadorNome} · ` : ""}
                      {quando(o.registradaEm)}
                    </span>
                  </div>
                  <span className={styles.seta}>
                    <TbChevronRight aria-hidden="true" />
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      ) : (
        <div className={styles.imagemTitulo}>
          <img src="/assets/images/entregadorCaixas.png" className={styles.imagemEntregador} alt="" />
          <div className={styles.tituloTexto}>
            <h3>Nenhuma ocorrência em aberto</h3>
            <p>Quando um motorista registrar um problema, ele aparecerá aqui</p>
          </div>
        </div>
      )}
    </article>
  );
}
