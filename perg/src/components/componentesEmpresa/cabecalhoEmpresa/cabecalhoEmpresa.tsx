import { useRouter } from "next/router";
import styles from "./cabecalhoEmpresa.module.css";
import BarraPesquisaEmpresa from "../barraPesquisaEmpresa/barraPesquisaEmpresa";
import BotaoNotificacaoEmpresa from "../../botoes/botaoNotificacaoEmpresa/botaoNotificacaoEmpresa";
import BotaoNovoPedido from "@/components/botoes/botaoNovoPedido/botaoNovoPedido";

// TODO: implementar lógica dinâmica para visualizar nome do usuário, data de acesso e nome empresa.CONFIG_PAGINAS precisa guardar apenas o título padrão de cada rota. Trazer props para info e função formatação de data e saudação dinâmica conforme horário(bom dia, boa tarde e boa noite)
const CONFIG_PAGINAS: Record<string, { titulo: string; subtitulo: string }> = {
  "/painelEmpresa/visaoGeral": {
    titulo: "Bom dia Ana Souza",
    subtitulo: "quinta, 08 de out - Aurora Store",
  },
  "/painelEmpresa/pedidos": {
    titulo: "Pedidos",
    subtitulo: "quinta, 08 de out - Aurora Store",
  },
  "/painelEmpresa/roteirizacao": {
    titulo: "Roteirização",
    subtitulo: "quinta, 08 de out - Aurora Store",
  },
  "/painelEmpresa/monitoramento": {
    titulo: "Monitoramento",
    subtitulo: "quinta, 08 de out - Aurora Store",
  },
  "/painelEmpresa/entregadores": {
    titulo: "Entregadores",
    subtitulo: "quinta, 08 de out - Aurora Store",
  },
  "/painelEmpresa/configuracoes": {
    titulo: "Configurações",
    subtitulo: "quinta, 08 de out - Aurora Store",
  },
};

export default function CabecalhoEmpresa() {
  const router = useRouter();

  //* Adicionado fallback caso a rota ainda não tenha carregado 
  const { titulo, subtitulo } = CONFIG_PAGINAS[router.pathname] || {
    titulo: "",
    subtitulo: "",
  };

  return (
    <header className={styles.cabecalho}>
      <div className={styles.titulosCabecalho}>
        <h1 className={styles.titulo}>{titulo}</h1>
        <p className={styles.subtitulo}>{subtitulo}</p>
      </div>
      <div className={styles.acoes}>
        <div className={styles.pesquisa}>
          <BarraPesquisaEmpresa />
        </div>
        <BotaoNovoPedido />
        <BotaoNotificacaoEmpresa />
      </div>
    </header>
  );
}