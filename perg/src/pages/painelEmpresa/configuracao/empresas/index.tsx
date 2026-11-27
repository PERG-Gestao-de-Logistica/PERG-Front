import { useEffect, useState } from "react";
import { TbLock } from "react-icons/tb";
import base from "../perfil/perfilConfig.module.css";
import styles from "./empresasConfig.module.css";
import AbasConfiguracao, { SomenteAdmin } from "@/components/componentesEmpresa/abasConfiguracao/abasConfiguracao";
import EquipeEmpresa from "@/components/componentesEmpresa/equipeEmpresa/equipeEmpresa";
import Esqueleto from "@/components/esqueleto/esqueleto";
import { empresaService } from "@/services/empresaService";
import { useAuth } from "@/hooks/useAuth";
import type { ConfiguracaoEmpresa } from "@/@types/empresa";
import { iniciais } from "@/utils/painel";

interface Dados {
  razaoSocial: string;
  nomeFantasia: string;
  email: string;
}

// "12345678000190" -> "12.345.678/0001-90"
const formatarCnpj = (c: string) =>
  c.length === 14 ? `${c.slice(0, 2)}.${c.slice(2, 5)}.${c.slice(5, 8)}/${c.slice(8, 12)}-${c.slice(12)}` : c;

const paraDados = (e: ConfiguracaoEmpresa): Dados => ({
  razaoSocial: e.razaoSocial,
  nomeFantasia: e.nomeFantasia,
  email: e.email,
});

function DadosEmpresa() {
  const { atualizarUsuario } = useAuth();
  const [empresa, setEmpresa] = useState<ConfiguracaoEmpresa | null>(null);
  const [dados, setDados] = useState<Dados | null>(null);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    empresaService
      .obter()
      .then((e) => {
        setEmpresa(e);
        setDados(paraDados(e));
      })
      .catch((e) => setErro((e as Error).message));
  }, []);

  const mudar = (campo: keyof Dados, valor: string) => {
    setDados((d) => (d ? { ...d, [campo]: valor } : d));
    setSucesso("");
  };

  const alterado =
    !!empresa && !!dados &&
    (dados.razaoSocial !== empresa.razaoSocial || dados.nomeFantasia !== empresa.nomeFantasia || dados.email !== empresa.email);

  async function salvar() {
    if (!empresa || !dados) return;
    setErro("");
    setSalvando(true);
    try {
      // O PUT pede todos os campos: os que não aparecem aqui vão como já estão
      const { empresa: atualizada } = await empresaService.atualizar({
        ...empresa,
        ...dados,
        telefone: empresa.telefone ?? undefined,
      });
      setEmpresa(atualizada);
      setDados(paraDados(atualizada));
      setSucesso("Dados da empresa salvos.");
      // O nome fantasia aparece no cabeçalho e no menu
      await atualizarUsuario();
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <article className={`${base.dadosPessoais} ${styles.cardEmpresa}`}>
      <div className={styles.cabecalho}>
        <h2>Dados da empresa</h2>
        <p>Informações cadastrais e foto da empresa.</p>
      </div>

      {!dados || !empresa ? (
        erro ? (
          <p role="alert" style={{ color: "var(--cor-perigo)" }}>Não foi possível carregar os dados da empresa: {erro}</p>
        ) : (
          <div className={styles.conteudo} aria-busy="true" aria-label="Carregando dados da empresa">
            <div className={styles.colunaFoto}>
              <Esqueleto largura="8rem" altura="8rem" raio="var(--raio-padrao)" />
            </div>
            <div className={styles.campos}>
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className={base.campo}>
                  <Esqueleto largura="40%" altura="0.9rem" />
                  <Esqueleto altura="2.6rem" />
                </div>
              ))}
            </div>
          </div>
        )
      ) : (
        <>
          <div className={styles.conteudo}>
            <div className={styles.colunaFoto}>
              <span className={styles.foto}>{iniciais(dados.nomeFantasia || empresa.nomeFantasia)}</span>
              <button type="button" className={styles.botaoFoto} disabled title="Em breve">
                Alterar foto
              </button>
            </div>

            <div>
              <form className={styles.campos} onSubmit={(e) => { e.preventDefault(); if (alterado) salvar(); }}>
                <div className={base.campo}>
                  <label htmlFor="razaoSocial" className={base.rotulo}>Razão social</label>
                  <input id="razaoSocial" className={base.input} maxLength={150} value={dados.razaoSocial}
                    onChange={(e) => mudar("razaoSocial", e.target.value)} />
                </div>
                <div className={base.campo}>
                  <label htmlFor="nomeFantasia" className={base.rotulo}>Nome fantasia</label>
                  <input id="nomeFantasia" className={base.input} maxLength={100} value={dados.nomeFantasia}
                    onChange={(e) => mudar("nomeFantasia", e.target.value)} />
                </div>
                <div className={base.campo}>
                  <label htmlFor="cnpj" className={base.rotulo}>CNPJ</label>
                  <div className={styles.campoBloqueado}>
                    <input id="cnpj" className={`${base.input} ${styles.inputBloqueado}`} value={formatarCnpj(empresa.cnpj)}
                      readOnly title="O CNPJ não pode ser alterado" />
                    <TbLock className={styles.cadeado} aria-hidden="true" />
                  </div>
                </div>
                <div className={base.campo}>
                  <label htmlFor="emailEmpresa" className={base.rotulo}>E-mail corporativo</label>
                  <input id="emailEmpresa" type="email" className={base.input} maxLength={255} value={dados.email}
                    onChange={(e) => mudar("email", e.target.value)} />
                </div>
              </form>
              <p className={styles.ajuda}>A foto da empresa é usada em relatórios, credenciais e identificação interna.</p>
            </div>
          </div>

          {(alterado || erro || sucesso) && (
            <footer className={styles.rodape}>
              <p role={erro ? "alert" : "status"} style={{ color: erro ? "var(--cor-perigo)" : "var(--cor-sucesso)" }}>
                {erro || sucesso}
              </p>
              {alterado && (
                <div className={styles.botoesRodape}>
                  <button type="button" className={styles.botaoSecundario} disabled={salvando}
                    onClick={() => { setDados(paraDados(empresa)); setErro(""); }}>
                    Cancelar
                  </button>
                  <button type="button" className={styles.botaoPrimario} onClick={salvar} disabled={salvando}>
                    {salvando ? "Salvando..." : "Salvar alterações"}
                  </button>
                </div>
              )}
            </footer>
          )}
        </>
      )}
    </article>
  );
}

export default function ConfiguracaoEmpresaPagina() {
  return (
    <main className={base.container}>
      <AbasConfiguracao />
      <SomenteAdmin>
        <DadosEmpresa />
        <EquipeEmpresa />
      </SomenteAdmin>
    </main>
  );
}
