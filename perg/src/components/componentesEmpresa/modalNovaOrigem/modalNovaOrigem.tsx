import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { IoClose } from "react-icons/io5";
import { TbBuildingStore, TbCheck, TbClock } from "react-icons/tb";
// Mesmo visual do modal de novo pedido; o arquivo próprio só traz o que é desta tela
import base from "../modalNovoPedido/modalNovoPedido.module.css";
import styles from "./modalNovaOrigem.module.css";
import { buscarCep } from "@/services/cepService";
import { origensService } from "@/services/origensService";
import type { Origem, PontoMapa, TipoOrigem } from "@/@types/origem";
import { DIAS_SEMANA, formatarCep, formatarTelefone, hora } from "@/utils/origem";

const MapaOrigem = dynamic(() => import("@/components/componentesEmpresa/mapaOrigem/mapaOrigem"), { ssr: false });

interface ModalNovaOrigemProps {
  aberto: boolean;
  // Com origem: edita; sem: cadastra uma nova
  origem?: Origem | null;
  onFechar: () => void;
  onSalvo: (origem: Origem, mensagem: string) => void;
}

const somenteDigitos = (v: string) => v.replace(/\D/g, "");
const comSegundos = (h: string) => (h.length === 5 ? `${h}:00` : h);

export default function ModalNovaOrigem({ aberto, origem, onFechar, onSalvo }: ModalNovaOrigemProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const editando = !!origem;

  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState<TipoOrigem>("Loja");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [bairro, setBairro] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [responsavelNome, setResponsavelNome] = useState("");
  const [responsavelTelefone, setResponsavelTelefone] = useState("");
  const [dias, setDias] = useState<number[]>([1, 2, 3, 4, 5, 6]);
  const [abre, setAbre] = useState("08:00");
  const [fecha, setFecha] = useState("18:00");
  const [instrucoes, setInstrucoes] = useState("");
  const [padrao, setPadrao] = useState(false);
  const [ponto, setPonto] = useState<PontoMapa | null>(null);
  const [localizando, setLocalizando] = useState(false);
  const [erro, setErro] = useState("");
  const [enviando, setEnviando] = useState(false);

  // Preenche ao abrir: com a origem que vai ser editada, ou em branco
  useEffect(() => {
    if (!aberto) return;
    setNome(origem?.nome ?? "");
    setTipo(origem?.tipo ?? "Loja");
    setCep(origem ? formatarCep(origem.cep) : "");
    setRua(origem?.logradouro ?? "");
    setNumero(origem?.numero ?? "");
    setComplemento(origem?.complemento ?? "");
    setBairro(origem?.bairro ?? "");
    setCidade(origem?.cidade ?? "");
    setUf(origem?.uf ?? "");
    setResponsavelNome(origem?.responsavelNome ?? "");
    setResponsavelTelefone(origem ? formatarTelefone(origem.responsavelTelefone) : "");
    setDias(origem?.dias ?? [1, 2, 3, 4, 5, 6]);
    setAbre(origem ? hora(origem.abre) : "08:00");
    setFecha(origem ? hora(origem.fecha) : "18:00");
    setInstrucoes(origem?.instrucoesColeta ?? "");
    setPadrao(origem?.padrao ?? false);
    setPonto(origem?.latitude != null && origem.longitude != null ? { latitude: origem.latitude, longitude: origem.longitude } : null);
    setErro("");
  }, [aberto, origem]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (aberto) {
      if (!dialog.open) dialog.showModal();
    } else if (dialog.open) {
      dialog.close();
    }
  }, [aberto]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) onFechar();
  }

  // Procura o ponto no mapa quando o endereço fica completo
  async function localizar(dados: { rua: string; numero: string; bairro: string; cidade: string; uf: string }) {
    if (somenteDigitos(cep).length !== 8 || !dados.rua || !dados.numero || !dados.cidade) return;
    setLocalizando(true);
    try {
      const achado = await origensService.localizar({
        cep,
        logradouro: dados.rua,
        numero: dados.numero,
        bairro: dados.bairro,
        cidade: dados.cidade,
        uf: dados.uf,
      });
      if (achado) setPonto(achado);
    } catch {
      // Sem ponto agora: a API calcula de novo ao salvar
    } finally {
      setLocalizando(false);
    }
  }

  // Ao sair do CEP: completa rua, bairro, cidade e UF
  async function completarPeloCep() {
    const achado = await buscarCep(cep);
    if (!achado) {
      setErro("CEP não encontrado. Confira o número.");
      return;
    }
    setErro("");
    const novaRua = rua || achado.logradouro;
    const novoBairro = bairro || achado.bairro;
    setRua(novaRua);
    setBairro(novoBairro);
    setCidade(achado.cidade);
    setUf(achado.uf);
    localizar({ rua: novaRua, numero, bairro: novoBairro, cidade: achado.cidade, uf: achado.uf });
  }

  const alternarDia = (dia: number) =>
    setDias((atual) => (atual.includes(dia) ? atual.filter((d) => d !== dia) : [...atual, dia]));

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!cidade || !uf) return setErro("Digite um CEP válido para completar o endereço.");
    if (dias.length === 0) return setErro("Escolha ao menos um dia de funcionamento.");
    if (fecha <= abre) return setErro("O horário de fechamento precisa ser depois da abertura.");

    setErro("");
    setEnviando(true);
    try {
      const dados = {
        nome: nome.trim(),
        tipo,
        cep: somenteDigitos(cep),
        logradouro: rua.trim(),
        numero: numero.trim(),
        complemento: complemento.trim() || undefined,
        bairro: bairro.trim(),
        cidade,
        uf,
        latitude: ponto?.latitude,
        longitude: ponto?.longitude,
        responsavelNome: responsavelNome.trim() || undefined,
        responsavelTelefone: somenteDigitos(responsavelTelefone) || undefined,
        abre: comSegundos(abre),
        fecha: comSegundos(fecha),
        dias,
        instrucoesColeta: instrucoes.trim() || undefined,
        padrao,
      };
      const resposta = origem ? await origensService.atualizar(origem.id, dados) : await origensService.criar(dados);
      onSalvo(resposta.origem, resposta.mensagem);
      onFechar();
    } catch (erroSalvar) {
      setErro((erroSalvar as Error).message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={`${base.modal} ${styles.modal}`}
      onClose={onFechar}
      onClick={handleBackdropClick}
      aria-labelledby="titulo-modal-origem"
    >
      <article className={base.conteudoModal}>
        <header className={base.cabecalhoModal}>
          <span className={base.iconeTitulo} aria-hidden="true">
            <TbBuildingStore />
          </span>
          <hgroup className={base.titulosModal}>
            <h2 id="titulo-modal-origem">{editando ? "Editar origem" : "Nova origem"}</h2>
            <p>Ponto onde os entregadores coletam os pedidos.</p>
          </hgroup>
          <button type="button" onClick={onFechar} className={base.botaoFechar} aria-label="Fechar modal">
            <IoClose size={22} />
          </button>
        </header>

        <form onSubmit={handleSubmit} className={base.formulario}>
          <div className={`${base.colunasFormulario} ${styles.colunas}`}>
            <section className={base.coluna}>
              <fieldset className={base.grupoCampos}>
                <legend className={styles.legenda}>Identificação</legend>
                <div className={styles.linhaNomeTipo}>
                  <p className={base.campo}>
                    <label htmlFor="origemNome" className={styles.rotulo}>Nome da origem</label>
                    <input id="origemNome" className={base.input} maxLength={100} placeholder="Ex.: Loja Vila Madalena"
                      value={nome} onChange={(e) => setNome(e.target.value)} required />
                  </p>
                  <div className={base.campo}>
                    <span className={styles.rotulo}>Tipo</span>
                    <div className={styles.seletorTipo} role="group" aria-label="Tipo da origem">
                      {(["Loja", "Deposito"] as TipoOrigem[]).map((t) => (
                        <button key={t} type="button" onClick={() => setTipo(t)} aria-pressed={tipo === t}
                          className={`${styles.opcaoTipo} ${tipo === t ? styles.opcaoTipoAtiva : ""}`}>
                          {t === "Loja" ? "Loja" : "Depósito"}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              </fieldset>

              <fieldset className={base.grupoCampos}>
                <legend className={styles.legenda}>Endereço</legend>
                <div className={base.linhaCepRua}>
                  <input aria-label="CEP" placeholder="CEP" inputMode="numeric" className={base.input}
                    value={cep} onChange={(e) => setCep(e.target.value)} onBlur={completarPeloCep} required />
                  <input aria-label="Rua" placeholder="Rua" className={base.input} maxLength={150}
                    value={rua} onChange={(e) => setRua(e.target.value)} required />
                </div>
                <div className={styles.linhaNumero}>
                  <input aria-label="Número" placeholder="Número" className={base.input} maxLength={10}
                    value={numero} onChange={(e) => setNumero(e.target.value)}
                    onBlur={() => localizar({ rua, numero, bairro, cidade, uf })} required />
                  <input aria-label="Complemento" placeholder="Complemento" className={base.input} maxLength={100}
                    value={complemento} onChange={(e) => setComplemento(e.target.value)} />
                  <input aria-label="Bairro" placeholder="Bairro" className={base.input} maxLength={100}
                    value={bairro} onChange={(e) => setBairro(e.target.value)} required />
                </div>
                {cidade && <p className={styles.cidade}>{cidade}/{uf}</p>}
              </fieldset>

              <fieldset className={base.grupoCampos}>
                <legend className={styles.legenda}>Responsável no local</legend>
                <div className={styles.linhaResponsavel}>
                  <input aria-label="Nome do responsável" placeholder="Nome" className={base.input} maxLength={150}
                    value={responsavelNome} onChange={(e) => setResponsavelNome(e.target.value)} />
                  <input aria-label="Telefone do responsável" placeholder="(11) 90000-0000" type="tel" className={base.input}
                    value={responsavelTelefone} onChange={(e) => setResponsavelTelefone(e.target.value)} />
                </div>
              </fieldset>
            </section>

            <section className={base.coluna}>
              <div className={base.grupoCampos}>
                <span className={styles.legenda}>Local no mapa</span>
                <div className={styles.mapa}>
                  {/* Só monta com o modal aberto, para o mapa nascer já com o tamanho certo */}
                  {aberto && <MapaOrigem ponto={ponto} onMover={setPonto} />}
                  <span className={styles.dicaMapa}>
                    {localizando ? "Localizando..." : ponto ? "Arraste para ajustar" : "Preencha o endereço"}
                  </span>
                </div>
              </div>

              <div className={base.campo}>
                <span className={styles.rotulo}>Funcionamento</span>
                <div className={styles.dias} role="group" aria-label="Dias de funcionamento">
                  {DIAS_SEMANA.map(({ dia, letra, nome: nomeDia }) => (
                    <button key={dia} type="button" title={nomeDia} aria-label={nomeDia} aria-pressed={dias.includes(dia)}
                      onClick={() => alternarDia(dia)}
                      className={`${styles.dia} ${dias.includes(dia) ? styles.diaAtivo : ""}`}>
                      {letra}
                    </button>
                  ))}
                </div>
                <div className={styles.horarios}>
                  <label className={styles.campoHora}>
                    <TbClock aria-hidden="true" />
                    <input type="time" aria-label="Abre às" value={abre} onChange={(e) => setAbre(e.target.value)} required />
                  </label>
                  <span className={styles.ate}>até</span>
                  <label className={styles.campoHora}>
                    <TbClock aria-hidden="true" />
                    <input type="time" aria-label="Fecha às" value={fecha} onChange={(e) => setFecha(e.target.value)} required />
                  </label>
                </div>
              </div>

              <p className={base.campo}>
                <label htmlFor="instrucoes" className={styles.rotulo}>Instruções de coleta</label>
                <input id="instrucoes" className={base.input} maxLength={300} placeholder="Ex.: retirar na doca lateral"
                  value={instrucoes} onChange={(e) => setInstrucoes(e.target.value)} />
              </p>
            </section>
          </div>

          {erro && <p role="alert" className={styles.erro}>{erro}</p>}

          <footer className={`${base.rodapeModal} ${styles.rodape}`}>
            {/* A origem padrão só deixa de ser quando outra é marcada no lugar */}
            <label className={styles.checkPadrao}>
              <input type="checkbox" checked={padrao} disabled={editando && origem?.padrao}
                onChange={(e) => setPadrao(e.target.checked)} />
              Definir como origem padrão
            </label>
            <div className={base.botoes}>
              <button type="button" onClick={onFechar} className={base.botaoCancelar}>
                Cancelar
              </button>
              <button type="submit" className={base.botaoSalvarAlteracao} disabled={enviando}>
                <TbCheck aria-hidden="true" />
                {enviando ? "Salvando..." : "Salvar origem"}
              </button>
            </div>
          </footer>
        </form>
      </article>
    </dialog>
  );
}