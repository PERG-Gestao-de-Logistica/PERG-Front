import { useRouter } from "next/router";
import styles from "./cabecalhoAdmin.module.css";
import BotaoNotificacaoAdmin from "../../botoes/botaoNotificacaoAdmin/botaoNotificacaoAdmin";
import BarraPesquisaAdmin from "../barraPesquisaAdmin/barraPesquisaAdmin";

const CONFIG_PAGINAS: Record<string, { titulo: string; subtitulo: string }> = {
  "/painelAdmin/visaoGeral": {
    titulo: "Visão Geral",
    subtitulo: "Saúde da operação e comportamento do sistema em tempo real",
  },
  "/painelAdmin/trafegoAPI": {
    titulo: "Tráfego e API",
    subtitulo: "Volume de requisições, latência e erros por endpoint",
  },
  "/painelAdmin/processamento": {
    titulo: "Processamento",
    subtitulo: "Processamento assíncrono de pedidos, rotas, notificações e desempenho de workers",
  },
  //! AVISO: Só será utilizado se sobrar tempo para construção da página
//   "/painelAdmin/empresas": {
//     titulo: "Empresas",
//     subtitulo: "Gestão de clientes, planos e saúde das contas",
//   },
//   "/painelAdmin/infraestrutura": {
//     titulo: "Infraestrutura",
//     subtitulo: "Monitoramento de servidores, bancos de dados e serviços",
//   },
  "/painelAdmin/alertas": {
    titulo: "Alertas",
    subtitulo: "Incidentes ativos, histórico de ocorrências e logs críticos",
  },
};

export default function CabecalhopainelAdmin() {
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
          <BarraPesquisaAdmin />
        </div>
        <BotaoNotificacaoAdmin />
      </div>
    </header>
  );
}