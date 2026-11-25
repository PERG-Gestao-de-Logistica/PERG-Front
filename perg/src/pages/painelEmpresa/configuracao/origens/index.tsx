import { useEffect, useState } from "react";
import base from "../perfil/perfilConfig.module.css";
import styles from "./origensConfig.module.css";
import AbasConfiguracao, { SomenteAdmin } from "@/components/componentesEmpresa/abasConfiguracao/abasConfiguracao";
import BotaoAdicionar from "@/components/botoes/botaoAdicionar/botaoAdicionar";
import CardOrigem from "@/components/componentesEmpresa/cardOrigem/cardOrigem";
import ModalNovaOrigem from "@/components/componentesEmpresa/modalNovaOrigem/modalNovaOrigem";
import Esqueleto from "@/components/esqueleto/esqueleto";
import { origensService } from "@/services/origensService";
import type { Origem } from "@/@types/origem";

function OrigensConteudo({
  origens,
  erro,
  aviso,
  ocupado,
  onEditar,
  onDefinirPadrao,
}: {
  origens: Origem[] | null;
  erro: string;
  aviso: string;
  ocupado: string | null;
  onEditar: (o: Origem) => void;
  onDefinirPadrao: (o: Origem) => void;
}) {
  return (
    <>
      <section className={styles.introducao}>
        <h2>Origens de coleta</h2>
        <p>Cadastre lojas ou depósitos. A origem padrão será sugerida nos novos pedidos.</p>
        {aviso && <p role="status" className={styles.aviso}>{aviso}</p>}
        {erro && <p role="alert" style={{ color: "var(--cor-perigo)" }}>{erro}</p>}
      </section>

      {origens === null ? (
        !erro && (
          <section className={styles.grade} aria-busy="true" aria-label="Carregando origens">
            {[1, 2, 3, 4].map((i) => (
              <article key={i} className={styles.cardCarregando}>
                <Esqueleto largura="45%" altura="1.4rem" />
                <Esqueleto largura="75%" />
                <Esqueleto largura="50%" altura="0.8rem" />
                <Esqueleto largura="60%" altura="2.2rem" />
              </article>
            ))}
          </section>
        )
      ) : origens.length === 0 ? (
        <p className={styles.vazio}>Nenhuma origem cadastrada. Use “Adicionar origem” para cadastrar a primeira.</p>
      ) : (
        <section className={styles.grade}>
          {origens.map((o) => (
            <CardOrigem key={o.id} origem={o} ocupado={ocupado === o.id} onEditar={onEditar} onDefinirPadrao={onDefinirPadrao} />
          ))}
        </section>
      )}
    </>
  );
}

export default function ConfiguracaoOrigensPagina() {
  const [origens, setOrigens] = useState<Origem[] | null>(null);
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");
  const [ocupado, setOcupado] = useState<string | null>(null);
  const [modalAberto, setModalAberto] = useState(false);
  const [emEdicao, setEmEdicao] = useState<Origem | null>(null);

  const carregar = () =>
    origensService
      .listar()
      .then((lista) => {
        setOrigens(lista);
        setErro("");
      })
      .catch((e) => setErro(`Não foi possível carregar as origens: ${(e as Error).message}`));

  useEffect(() => {
    carregar();
  }, []);

  function abrirNova() {
    setEmEdicao(null);
    setModalAberto(true);
  }

  function abrirEdicao(origem: Origem) {
    setEmEdicao(origem);
    setModalAberto(true);
  }

  async function definirPadrao(origem: Origem) {
    setOcupado(origem.id);
    setAviso("");
    try {
      const r = await origensService.definirPadrao(origem.id);
      setAviso(`${r.origem.nome} agora é a origem padrão.`);
      await carregar();
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setOcupado(null);
    }
  }

  return (
    <main className={base.container}>
      <AbasConfiguracao acao={<BotaoAdicionar texto="Adicionar origem" onClick={abrirNova} />} />
      <SomenteAdmin>
        <OrigensConteudo
          origens={origens}
          erro={erro}
          aviso={aviso}
          ocupado={ocupado}
          onEditar={abrirEdicao}
          onDefinirPadrao={definirPadrao}
        />
        <ModalNovaOrigem
          aberto={modalAberto}
          origem={emEdicao}
          onFechar={() => setModalAberto(false)}
          onSalvo={(_, mensagem) => {
            setAviso(mensagem);
            carregar();
          }}
        />
      </SomenteAdmin>
    </main>
  );
}
