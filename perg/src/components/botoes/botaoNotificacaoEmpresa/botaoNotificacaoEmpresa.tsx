import { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import styles from "./botaoNotificacaoEmpresa.module.css";
import { notificacoesService } from "@/services/notificacoesService";

const INTERVALO_MS = 60_000;

// TODO: abrir a lista de notificações (GET /api/Notificacoes) ao clicar
export default function BotaoNotificacaoEmpresa() {
  const [naoLidas, setNaoLidas] = useState(0);

  // Busca ao abrir e a cada minuto
  useEffect(() => {
    let ativo = true;
    const buscar = () =>
      notificacoesService
        .contagem()
        .then((r) => ativo && setNaoLidas(r.naoLidas))
        .catch(() => {});
    buscar();
    const intervalo = setInterval(buscar, INTERVALO_MS);
    return () => {
      ativo = false;
      clearInterval(intervalo);
    };
  }, []);

  const rotulo = naoLidas > 0 ? `Notificações: ${naoLidas} não lidas` : "Notificações";

  return (
    <button type="button" className={styles.botao} aria-label={rotulo} title={rotulo}>
      <IoNotificationsOutline size={28} />
      {naoLidas > 0 && (
        <span className={styles.contador} aria-hidden="true">
          {naoLidas > 99 ? "99+" : naoLidas}
        </span>
      )}
    </button>
  );
}
