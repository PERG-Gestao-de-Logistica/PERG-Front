import { useCallback, useEffect, useState } from "react";
import { TbCheck, TbCopy, TbKey, TbPencil, TbUserCheck, TbUserOff, TbX } from "react-icons/tb";
import styles from "./equipeEmpresa.module.css";
import Esqueleto from "@/components/esqueleto/esqueleto";
import { equipeService } from "@/services/equipeService";
import { useAuth } from "@/hooks/useAuth";
import type { PapelUsuario } from "@/@types/autenticacao";
import type { MembroEquipe, RespostaMembroComSenha } from "@/@types/equipe";
import { iniciais, nomePapel } from "@/utils/painel";

const somenteDigitos = (t: string) => t.replace(/\D/g, "");

function situacao(m: MembroEquipe) {
  if (!m.ativo) return "Acesso desativado";
  if (m.primeiroAcessoPendente) return "Primeiro acesso pendente";
  return "";
}

// Senha provisória: só aparece quando o e-mail não pôde ser enviado
function SenhaProvisoria({ resposta, aoFechar }: { resposta: RespostaMembroComSenha; aoFechar: () => void }) {
  const [copiada, setCopiada] = useState(false);
  if (!resposta.senhaTemporaria) return null;
  const senha = resposta.senhaTemporaria;

  return (
    <div className={styles.senhaProvisoria} role="alert">
      <div className={styles.senhaTexto}>
        <strong>Passe esta senha para {resposta.membro.nome}</strong>
        <span>O e-mail não saiu. Ela aparece só agora e é trocada no primeiro acesso.</span>
      </div>
      <code className={styles.senha}>{senha}</code>
      <button type="button" className={styles.botaoRedondo} title="Copiar senha" aria-label="Copiar senha"
        onClick={() => navigator.clipboard?.writeText(senha).then(() => setCopiada(true))}>
        {copiada ? <TbCheck aria-hidden="true" /> : <TbCopy aria-hidden="true" />}
      </button>
      <button type="button" className={styles.botaoRedondo} title="Fechar" aria-label="Fechar" onClick={aoFechar}>
        <TbX aria-hidden="true" />
      </button>
    </div>
  );
}

function CriarUsuario({ aoCriar }: { aoCriar: (r: RespostaMembroComSenha) => void }) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [telefone, setTelefone] = useState("");
  const [papel, setPapel] = useState<PapelUsuario>("Funcionario");
  const [erro, setErro] = useState("");
  const [salvando, setSalvando] = useState(false);

  function limpar() {
    setNome("");
    setEmail("");
    setTelefone("");
    setPapel("Funcionario");
    setErro("");
  }

  async function criar() {
    setErro("");
    if (!nome.trim() || !email.trim()) return setErro("Preencha o nome e o e-mail.");
    setSalvando(true);
    try {
      const resposta = await equipeService.criar({
        nome: nome.trim(),
        email: email.trim(),
        telefone: somenteDigitos(telefone) || undefined,
        papel,
      });
      limpar();
      aoCriar(resposta);
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setSalvando(false);
    }
  }

  return (
    <article className={styles.card}>
      <div className={styles.cabecalho}>
        <h2>Criar usuário</h2>
        <p>Adicione novos acessos com cargo fixo: Admin ou Funcionário.</p>
      </div>

      <form className={styles.formulario} onSubmit={(e) => { e.preventDefault(); criar(); }}>
        <div className={styles.campos}>
          <div className={styles.campo}>
            <label htmlFor="novoNome" className={styles.rotulo}>Nome completo</label>
            <input id="novoNome" className={styles.input} maxLength={150} placeholder="João Silva"
              value={nome} onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className={styles.campo}>
            <label htmlFor="novoEmail" className={styles.rotulo}>E-mail</label>
            <input id="novoEmail" type="email" className={styles.input} maxLength={255} placeholder="joao@empresa.com.br"
              value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className={styles.campo}>
            <label htmlFor="novoTelefone" className={styles.rotulo}>Telefone</label>
            <input id="novoTelefone" type="tel" className={styles.input} placeholder="(11) 90000-0003"
              value={telefone} onChange={(e) => setTelefone(e.target.value)} />
          </div>
          <div className={styles.campo}>
            <label htmlFor="novoPapel" className={styles.rotulo}>Cargo</label>
            <select id="novoPapel" className={styles.input} value={papel} onChange={(e) => setPapel(e.target.value as PapelUsuario)}>
              <option value="Funcionario">Funcionário</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
        </div>

        {erro && <p role="alert" className={styles.erro}>{erro}</p>}

        <div className={styles.botoes}>
          <button type="button" className={styles.botaoSecundario} onClick={limpar} disabled={salvando}>
            Cancelar
          </button>
          <button type="submit" className={styles.botaoPrimario} disabled={salvando}>
            {salvando ? "Criando..." : "Criar usuário"}
          </button>
        </div>
      </form>

      <p className={styles.ajuda}>Os usuários criados aparecem ao lado. A senha provisória vai por e-mail.</p>
    </article>
  );
}

function ItemUsuario({
  membro,
  souEu,
  aoAtualizar,
  aoSenha,
}: {
  membro: MembroEquipe;
  souEu: boolean;
  aoAtualizar: (m: MembroEquipe, mensagem: string) => void;
  aoSenha: (r: RespostaMembroComSenha) => void;
}) {
  const [editando, setEditando] = useState(false);
  const [nome, setNome] = useState(membro.nome);
  const [telefone, setTelefone] = useState(membro.telefone ?? "");
  const [papel, setPapel] = useState<PapelUsuario>(membro.papel);
  // Desativar e nova senha pedem um segundo clique
  const [confirmando, setConfirmando] = useState<"desativar" | "senha" | null>(null);
  const [ocupado, setOcupado] = useState(false);
  const [erro, setErro] = useState("");

  async function executar(acao: () => Promise<void>) {
    setErro("");
    setOcupado(true);
    try {
      await acao();
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setOcupado(false);
      setConfirmando(null);
    }
  }

  function cancelarEdicao() {
    setEditando(false);
    setNome(membro.nome);
    setTelefone(membro.telefone ?? "");
    setPapel(membro.papel);
  }

  const texto = situacao(membro);

  return (
    <li className={`${styles.item} ${!membro.ativo ? styles.itemInativo : ""}`}>
      <div className={styles.linha}>
        <span className={`${styles.avatar} ${membro.papel === "Admin" ? styles.avatarAdmin : ""}`}>{iniciais(membro.nome)}</span>

        <div className={styles.dados}>
          <p className={styles.nome}>
            {membro.nome}
            {souEu && <span className={styles.voce}>você</span>}
          </p>
          <p className={styles.email}>{membro.email}</p>
          {texto && <p className={styles.situacao}>{texto}</p>}
        </div>

        <span className={`${styles.selo} ${membro.papel === "Admin" ? styles.seloAdmin : ""}`}>{nomePapel(membro.papel)}</span>
      </div>

      {/* O admin não mexe no próprio acesso por aqui: isso fica no Perfil */}
      {!souEu && !editando && (
        <div className={styles.acoes}>
          {!membro.ativo ? (
            <button type="button" className={styles.botaoAcao} disabled={ocupado}
              onClick={() => executar(async () => {
                const r = await equipeService.reativar(membro.id);
                aoAtualizar(r.membro, r.mensagem);
              })}>
              <TbUserCheck aria-hidden="true" /> Reativar
            </button>
          ) : confirmando ? (
            <>
              <button type="button" className={`${styles.botaoAcao} ${styles.botaoConfirmar}`} disabled={ocupado}
                onClick={() => executar(async () => {
                  if (confirmando === "senha") {
                    aoSenha(await equipeService.redefinirSenha(membro.id));
                  } else {
                    const r = await equipeService.desativar(membro.id);
                    aoAtualizar(r.membro, r.mensagem);
                  }
                })}>
                {confirmando === "senha" ? "Confirmar nova senha" : "Confirmar desativação"}
              </button>
              <button type="button" className={styles.botaoAcao} onClick={() => setConfirmando(null)} disabled={ocupado}>
                Cancelar
              </button>
            </>
          ) : (
            <>
              <button type="button" className={styles.botaoAcao} onClick={() => setEditando(true)}>
                <TbPencil aria-hidden="true" /> Editar
              </button>
              <button type="button" className={styles.botaoAcao} onClick={() => setConfirmando("senha")}>
                <TbKey aria-hidden="true" /> Nova senha
              </button>
              <button type="button" className={styles.botaoAcao} onClick={() => setConfirmando("desativar")}>
                <TbUserOff aria-hidden="true" /> Desativar
              </button>
            </>
          )}
        </div>
      )}

      {editando && (
        <div className={styles.edicao}>
          <div className={styles.campo}>
            <label htmlFor={`nome-${membro.id}`} className={styles.rotulo}>Nome</label>
            <input id={`nome-${membro.id}`} className={styles.input} maxLength={150} value={nome}
              onChange={(e) => setNome(e.target.value)} />
          </div>
          <div className={styles.campo}>
            <label htmlFor={`tel-${membro.id}`} className={styles.rotulo}>Telefone</label>
            <input id={`tel-${membro.id}`} type="tel" className={styles.input} value={telefone}
              onChange={(e) => setTelefone(e.target.value)} />
          </div>
          <div className={styles.campo}>
            <label htmlFor={`papel-${membro.id}`} className={styles.rotulo}>Cargo</label>
            <select id={`papel-${membro.id}`} className={styles.input} value={papel}
              onChange={(e) => setPapel(e.target.value as PapelUsuario)}>
              <option value="Funcionario">Funcionário</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className={styles.botoesEdicao}>
            <button type="button" className={styles.botaoAcao} onClick={cancelarEdicao} disabled={ocupado}>
              Cancelar
            </button>
            <button type="button" className={`${styles.botaoAcao} ${styles.botaoConfirmar}`} disabled={ocupado}
              onClick={() => executar(async () => {
                const r = await equipeService.atualizar(membro.id, {
                  nome: nome.trim(),
                  telefone: somenteDigitos(telefone) || undefined,
                  papel,
                });
                setEditando(false);
                aoAtualizar(r.membro, r.mensagem);
              })}>
              {ocupado ? "Salvando..." : "Salvar"}
            </button>
          </div>
        </div>
      )}

      {erro && <p role="alert" className={styles.erro}>{erro}</p>}
    </li>
  );
}

// Cards "Criar usuário" e "Usuários criados" da aba Empresas
export default function EquipeEmpresa() {
  const { usuario } = useAuth();
  const [membros, setMembros] = useState<MembroEquipe[] | null>(null);
  const [mostrarInativos, setMostrarInativos] = useState(false);
  const [erro, setErro] = useState("");
  const [aviso, setAviso] = useState("");
  const [senha, setSenha] = useState<RespostaMembroComSenha | null>(null);

  const carregar = useCallback(() => {
    equipeService
      .listar(mostrarInativos)
      .then((lista) => {
        setMembros(lista);
        setErro("");
      })
      .catch((e) => setErro((e as Error).message));
  }, [mostrarInativos]);

  useEffect(carregar, [carregar]);

  function aoReceberSenha(r: RespostaMembroComSenha) {
    setAviso(r.mensagem);
    setSenha(r.senhaTemporaria ? r : null);
    carregar();
  }

  function aoAtualizar(m: MembroEquipe, mensagem: string) {
    setAviso(mensagem);
    setMembros((lista) => {
      if (!lista) return lista;
      if (!m.ativo && !mostrarInativos) return lista.filter((x) => x.id !== m.id);
      return lista.map((x) => (x.id === m.id ? m : x));
    });
  }

  return (
    <section className={styles.grade}>
      <CriarUsuario aoCriar={aoReceberSenha} />

      <article className={styles.card}>
        <div className={styles.cabecalhoLista}>
          <h2>Usuários criados</h2>
          <button type="button" className={styles.linkInativos} onClick={() => setMostrarInativos((v) => !v)}>
            {mostrarInativos ? "Esconder inativos" : "Mostrar inativos"}
          </button>
        </div>

        {aviso && <p role="status" className={styles.aviso}>{aviso}</p>}
        {senha && <SenhaProvisoria resposta={senha} aoFechar={() => setSenha(null)} />}
        {erro && <p role="alert" className={styles.erro}>Não foi possível carregar os usuários: {erro}</p>}

        {membros === null ? (
          !erro && (
            <ul className={styles.lista} aria-busy="true" aria-label="Carregando usuários">
              {[1, 2, 3].map((i) => (
                <li key={i} className={styles.item}>
                  <div className={styles.linha}>
                    <Esqueleto largura="2.5rem" altura="2.5rem" raio="50%" />
                    <div className={styles.dados}>
                      <Esqueleto largura="50%" />
                      <Esqueleto largura="70%" altura="0.8rem" />
                    </div>
                    <Esqueleto largura="5rem" altura="1.6rem" raio="999px" />
                  </div>
                </li>
              ))}
            </ul>
          )
        ) : (
          <ul className={styles.lista}>
            {membros.map((m) => (
              <ItemUsuario key={m.id} membro={m} souEu={m.id === usuario?.id} aoAtualizar={aoAtualizar} aoSenha={aoReceberSenha} />
            ))}
          </ul>
        )}
      </article>
    </section>
  );
}
