import { useRouter } from "next/router";
import styles from "./cabecalhoEmpresa.module.css";
import BarraPesquisaEmpresa from "../barraPesquisaEmpresa/barraPesquisaEmpresa";
import BotaoNotificacaoEmpresa from "../../botoes/botaoNotificacaoEmpresa/botaoNotificacaoEmpresa";
import BotaoNovoPedido from "@/components/botoes/botaoNovoPedido/botaoNovoPedido";
import { useAuth } from "@/hooks/useAuth";
import { dataPorExtenso, primeiroNome, saudacao } from "@/utils/painel";

// Título fixo de cada página; na visão geral vira a saudação com o nome do usuário
const TITULOS: Record<string, string> = {
  "/painelEmpresa/visaoGeral": "",
  "/painelEmpresa/pedidos": "Pedidos",
  "/painelEmpresa/roteirizacao": "Roteirização",
  "/painelEmpresa/monitoramento": "Monitoramento",
  "/painelEmpresa/entregadores": "Entregadores",
  "/painelEmpresa/configuracao/perfil": "Configurações",
};

export default function CabecalhoEmpresa() {
  const router = useRouter();

  const { usuario } = useAuth();

  const titulo =
    router.pathname === "/painelEmpresa/visaoGeral"
      ? `${saudacao()}, ${primeiroNome(usuario?.nome ?? "")}`
      : TITULOS[router.pathname] ?? "";
  const subtitulo = usuario ? `${dataPorExtenso()} - ${usuario.nomeEmpresa}` : dataPorExtenso();

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