import BotaoNovoPedido from "@/components/botoes/botaoNovoPedido/botaoNovoPedido";
import MenuAdmin from "../components/menuAdmin/menuAdmin";
import MenuEmpresa from "../components/menuEmpresa/menuEmpresa";
import BotaoNotificacao from "../components/botoes/botaoNotificacaoEmpresa/botaoNotificacaoEmpresa";
import BotaoNotificacaoAdmin from "../components/botoes/botaoNotificacaoAdmin/botaoNotificacaoAdmin";

export default function Home() {
  return (
    <>
    <BotaoNotificacaoAdmin/>
    <BotaoNovoPedido/>
    </>
  );
}