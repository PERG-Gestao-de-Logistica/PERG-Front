import { IoEyeOffOutline, IoEyeOutline } from "react-icons/io5";
import styles from "./perfilConfig.module.css";
import { useEffect, useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { autenticacaoService } from "@/services/autenticacaoService";
import { iniciais, nomePapel } from "@/utils/painel";
import AbasConfiguracao from "@/components/componentesEmpresa/abasConfiguracao/abasConfiguracao";

const EM_BREVE = "Em breve";

export default function ConfiguracaoEmpresa() {
  const { usuario, atualizarUsuario } = useAuth();
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [mostrarSenhaAtual, setMostrarSenhaAtual] = useState(false);
  const [senha, setSenha] = useState("");
  const [senhaAtual, setSenhaAtual] = useState("");

  const [nome, setNome] = useState("");
  const [telefone, setTelefone] = useState("");
  const [notifOcorrencias, setNotifOcorrencias] = useState(true);
  const [notifCobranca, setNotifCobranca] = useState(true);
  const [alterandoSenha, setAlterandoSenha] = useState(false);
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [salvando, setSalvando] = useState(false);

  //* Preenche com os dados do usuário logado (e volta a eles no Cancelar)
  function restaurar() {
    if (!usuario) return;
    setNome(usuario.nome);
    setTelefone(usuario.telefone ?? "");
    setNotifOcorrencias(usuario.notifOcorrencias);
    setNotifCobranca(usuario.notifCobranca);
    setAlterandoSenha(false);
    setSenha("");
    setSenhaAtual("");
    setErro("");
  }

  useEffect(restaurar, [usuario]);

  async function salvar() {
    setErro("");
    setSucesso("");
    if (alterandoSenha && (senhaAtual || senha)) {
      if (!senhaAtual || !senha) return setErro("Para trocar a senha, preencha a senha atual e a nova.");
      if (senha.length < 8) return setErro("A nova senha precisa ter pelo menos 8 caracteres.");
    }
    setSalvando(true);
    try {
      await autenticacaoService.atualizarPerfil({
        nome: nome.trim(),
        telefone: telefone.replace(/\D/g, "") || undefined,
        notifOcorrencias,
        notifCobranca,
      });
      const trocouSenha = alterandoSenha && !!senhaAtual && !!senha;
      if (trocouSenha) {
        await autenticacaoService.trocarSenha(senhaAtual, senha);
      }
      await atualizarUsuario();
      setSucesso(trocouSenha ? "Alterações e nova senha salvas." : "Alterações salvas.");
      setAlterandoSenha(false);
      setSenha("");
      setSenhaAtual("");
    } catch (e) {
      setErro((e as Error).message);
    } finally {
      setSalvando(false);
    }
  }


  return (
    <main className={styles.container}>
      <AbasConfiguracao />
      <section className={styles.dadosPessoaisSeguranca}>
        <article className={styles.dadosPessoais}>
          <header className={styles.cabecalhoCard}>
            <h2>Dados Pessoais</h2>
            <p>Como você aparece para sua equipe</p>
          </header>

          <div className={styles.perfil}>
            <h3 className={styles.iniciais}>{iniciais(usuario?.nome ?? "")}</h3>

            <div className={styles.infoUsuario}>
              <h3 className={styles.nomeUsuario}>{usuario?.nome}</h3>
              <p className={styles.nomeCargoEmpresa}>{usuario ? `${nomePapel(usuario.papel)} - ${usuario.nomeEmpresa}` : ""}</p>
            </div>
          </div>

          <form className={styles.formulario} onSubmit={(e) => e.preventDefault()}>
            <div className={styles.campo}>
              <label htmlFor="nomeUsuario" className={styles.rotulo}>
                Nome Completo
              </label>
              <input
                id="nomeUsuario"
                name="nome"
                type="text"
                placeholder="Digite seu nome..."
                className={styles.input}
                value={nome}
                onChange={(e) => setNome(e.target.value)}
              />
            </div>

            <div className={styles.campo}>
              <label htmlFor="telefone" className={styles.rotulo}>
                Telefone
              </label>
              <input
                id="telefone"
                name="telefone"
                type="tel"
                placeholder="Digite seu telefone..."
                className={styles.input}
                value={telefone}
                onChange={(e) => setTelefone(e.target.value)}
              />
            </div>

            <div className={styles.campo}>
              <label htmlFor="email" className={styles.rotulo}>
                Email
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Digite seu email..."
                className={styles.input}
                value={usuario?.email ?? ""}
                readOnly
                title="O e-mail é o seu login e não pode ser alterado aqui"
                style={{ opacity: 0.7, cursor: "not-allowed" }}
              />
            </div>
          </form>
        </article>

        <article className={styles.seguranca}>
          <header className={styles.cabecalhoCard}>
            <h2>Segurança</h2>
            <p>Proteja o acesso à sua conta</p>
          </header>

          <section className={styles.cabecalhoSenha}>
            <h3>Senha</h3>
            <button type="button"
              className={styles.botaoAlterarSenha}
              onClick={() => {
                setAlterandoSenha((v) => !v);
                setSenha("");
                setSenhaAtual("");
              }}
              aria-expanded={alterandoSenha}
            >
              {alterandoSenha ? "Cancelar" : "Alterar"} 
            </button>
          </section>

          {alterandoSenha && (
          <section className={styles.camposSenhaContainer}>
            <div className={styles.campo}>
              <label htmlFor="senhaAtual" className={styles.rotulo}>
                Senha Atual
              </label>
              <div className={styles.campoSenha}>
                <input
                  id="senhaAtual"
                  name="senhaAtual"
                  type={mostrarSenhaAtual ? "text" : "password"}
                  placeholder="Digite sua senha atual..."
                  className={styles.input}
                  value={senhaAtual}
                  onChange={(e) => setSenhaAtual(e.target.value)}
                  autoComplete="current-password"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenhaAtual((prev) => !prev)}
                  aria-label={
                    mostrarSenhaAtual
                      ? "Ocultar senha atual"
                      : "Mostrar senha atual"
                  }
                  className={styles.botaoEsconderSenha}
                >
                  {mostrarSenhaAtual ? (
                    <IoEyeOffOutline size={24} />
                  ) : (
                    <IoEyeOutline size={24} />
                  )}
                </button>
              </div>
            </div>

            <div className={styles.campo}>
              <label htmlFor="senha" className={styles.rotulo}>
                Nova Senha
              </label>
              <div className={styles.campoSenha}>
                <input
                  id="senha"
                  name="senha"
                  type={mostrarSenha ? "text" : "password"}
                  placeholder="Mínimo de 8 caracteres"
                  className={styles.input}
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  autoComplete="new-password"
                />
                <button
                  type="button"
                  onClick={() => setMostrarSenha((prev) => !prev)}
                  aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
                  className={styles.botaoEsconderSenha}
                >
                  {mostrarSenha ? (
                    <IoEyeOffOutline size={24} />
                  ) : (
                    <IoEyeOutline size={24} />
                  )}
                </button>
              </div>
            </div>
          </section>
          )}
          <section
            className={styles.secaoDuasEtapas}
            aria-labelledby="titulo-2fa"
          >
            <section className={styles.verificacaoSwitch}>

              <section className={styles.verificacoDuasEtapas}>
                <h3 id="titulo-2fa">Verificação em duas etapas</h3>
                <p className={styles.textoAuxiliar}>Código extra ao entrar</p>
              </section>

              <label className={styles.switch}>
                <input
                type="checkbox"
                aria-label="Ativar verificação em duas etapas (em breve)"
                disabled
                title={EM_BREVE}
                />
                <span className={styles.slider} />
              </label>
            </section>

            <aside className={styles.bannerSeguranca}>
              <img
                src="/assets/images/entregadorMenu.png"
                alt=""
                className={styles.bannerImagem}
              />
              <hgroup className={styles.bannerTexto}>
                <h4>Proteja sua conta em 1 minuto</h4>
                <p>Ative a verificação em duas etapas</p>
              </hgroup>
              <button type="button" className={styles.botaoBanner}  disabled title={EM_BREVE} style={{ opacity: 0.6, cursor: "not-allowed" }}>
                Em breve
              </button>
            </aside>
          </section>
        </article>
      </section>

      <section className={styles.notificacaoSalvarAlteracao}>
        <article className={styles.notificacao}>
          <header className={styles.cabecalhoCard}>
            <h2>Notificações</h2>
            <p>Escolha os avisos que você deseja receber.</p>
          </header>

          <ul className={styles.listaNotificacoes}>
            <li className={styles.itemNotificacao}>
              <hgroup>
                <h3>Ocorrências nas entregas</h3>
                <p className={styles.textoAuxiliar}>
                  Avisos de recusa, ausência ou mercadoria avariada.
                </p>
              </hgroup>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={notifOcorrencias}
                  onChange={(e) => setNotifOcorrencias(e.target.checked)}
                  aria-label="Ocorrências nas entregas"
                />
                <span className={styles.slider} />
              </label>
            </li>

            <li className={styles.itemNotificacao}>
              <hgroup>
                <h3>Alertas de cobrança</h3>
                <p className={styles.textoAuxiliar}>
                  Lembretes de faturas e renovação do plano.
                </p>
              </hgroup>
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={notifCobranca}
                  onChange={(e) => setNotifCobranca(e.target.checked)}
                  aria-label="Alertas de cobrança"
                />
                <span className={styles.slider} />
              </label>
            </li>
          </ul>
        </article>

        <article className={styles.salvarAlteracao}>
          <p
            role={erro ? "alert" : sucesso ? "status" : undefined}
            style={erro ? { color: "var(--cor-perigo)" } : sucesso ? { color: "var(--cor-sucesso)" } : undefined}
          >
            {erro || sucesso || "As preferências se aplicam apenas ao seu usuário"}
          </p>
          <div className={styles.botoes}>
            <button 
            type="button" 
            className={styles.botaoCancelar}
              onClick={() => {
                restaurar();
                setSucesso("");
              }}
              disabled={salvando}>
              Cancelar
            </button>
            <button type="submit" className={styles.botaoSalvarAlteracao} onClick={salvar} disabled={salvando || !usuario}>
             {salvando ? "Salvando..." : "Salvar Alterações"}
            </button>
          </div>
        </article>
      </section>
    </main>
  );
}
