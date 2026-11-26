import { useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { IoClose } from "react-icons/io5";
import { TbAlertTriangle, TbInfoCircle, TbMapPin, TbPackage, TbPencil, TbRefresh } from "react-icons/tb";
// Mesmo visual do modal de novo pedido; o arquivo próprio só traz o que é desta tela
import base from "../modalNovoPedido/modalNovoPedido.module.css";
import styles from "./modalDetalhePedido.module.css";
import Status from "@/components/status/status";
import Esqueleto from "@/components/esqueleto/esqueleto";
import { buscarCep } from "@/services/cepService";
import { pedidosService } from "@/services/pedidosService";
import { ocorrenciasService, type OcorrenciaLoja } from "@/services/ocorrenciasService";
import type { PedidoDetalhe } from "@/@types/pedido";
import type { PontoMapa } from "@/@types/origem";
import { NOME_GEOCODIFICACAO, NOME_MODALIDADE, NOME_OCORRENCIA, STATUS_TELA, dataHora, formatarPeso, textoJanela } from "@/utils/pedido";

// Reaproveita o mapa do modal de origem (pino arrastável)
const MapaPonto = dynamic(() => import("@/components/mapaOrigem"), { ssr: false });

interface ModalDetalhePedidoProps {
  pedidoId: string | null;
  onFechar: () => void;
  // Avisa a tela para recarregar a lista e as contagens
  onAlterado: () => void;
}

type Formulario = {
  clienteNome: string;
  clienteTelefone: string;
  clienteEmail: string;
  cep: string;
  logradouro: string;
  numero: string;
  complemento: string;
  bairro: string;
  cidade: string;
  uf: string;
  referencia: string;
  observacoes: string;
  // Entrega
  comJanela: boolean;
  dataJanela: string; // AAAA-MM-DD
  horaInicio: string; // HH:mm
  horaFim: string;
  pesoKg: string;
  volumes: string;
};

// Campos de texto do formulário (comJanela é o único booleano)
type CampoTexto = Exclude<keyof Formulario, "comJanela">;

const doisDigitos = (n: number) => String(n).padStart(2, "0");
const dataLocal = (d: Date) => `${d.getFullYear()}-${doisDigitos(d.getMonth() + 1)}-${doisDigitos(d.getDate())}`;
const horaLocal = (d: Date) => `${doisDigitos(d.getHours())}:${doisDigitos(d.getMinutes())}`;

// Janela já vencida: sugere a data de hoje, mantendo os horários, para o lojista só ajustar
function janelaParaFormulario(inicio: string | null, fim: string | null) {
  if (!inicio || !fim) return { comJanela: false, dataJanela: dataLocal(new Date()), horaInicio: "08:00", horaFim: "18:00" };
  const i = new Date(inicio);
  const f = new Date(fim);
  const vencida = f.getTime() <= Date.now();
  return { comJanela: true, dataJanela: vencida ? dataLocal(new Date()) : dataLocal(i), horaInicio: horaLocal(i), horaFim: horaLocal(f) };
}

const paraFormulario = (p: PedidoDetalhe): Formulario => ({
  clienteNome: p.clienteNome,
  clienteTelefone: p.clienteTelefone ?? "",
  clienteEmail: p.clienteEmail ?? "",
  cep: p.cep ?? "",
  logradouro: p.logradouro ?? "",
  numero: p.numero ?? "",
  complemento: p.complemento ?? "",
  bairro: p.bairro ?? "",
  cidade: p.cidade ?? "",
  uf: p.uf ?? "",
  referencia: p.referencia ?? "",
  observacoes: p.observacoes ?? "",
  ...janelaParaFormulario(p.janelaInicio, p.janelaFim),
  pesoKg: String(p.pesoKg ?? 0),
  volumes: String(p.volumes ?? 1),
});

const vazioParaUndefined = (t: string) => t.trim() || undefined;

export default function ModalDetalhePedido({ pedidoId, onFechar, onAlterado }: ModalDetalhePedidoProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [pedido, setPedido] = useState<PedidoDetalhe | null>(null);
  const [editando, setEditando] = useState(false);
  const [form, setForm] = useState<Formulario | null>(null);
  const [ponto, setPonto] = useState<PontoMapa | null>(null);
  const [pontoMudou, setPontoMudou] = useState(false);
  const [confirmandoCancelamento, setConfirmandoCancelamento] = useState(false);
  const [motivo, setMotivo] = useState("");
  const [ocupado, setOcupado] = useState(false);
  const [mensagem, setMensagem] = useState<{ texto: string; erro?: boolean } | null>(null);
  // Ocorrência aberta do pedido (quando o status é Ocorrência)
  const [ocorrencia, setOcorrencia] = useState<OcorrenciaLoja | null>(null);
  const [confirmandoOcorrencia, setConfirmandoOcorrencia] = useState<"Reentregar" | "Cancelar" | null>(null);

  function aplicar(p: PedidoDetalhe) {
    setPedido(p);
    setOcorrencia(null);
    setConfirmandoOcorrencia(null);
    if (p.status === "Ocorrencia") {
      ocorrenciasService
        .listar(true)
        .then((lista) => setOcorrencia(lista.find((o) => o.pedidoId === p.id) ?? null))
        .catch(() => {});
    }
    setForm(paraFormulario(p));
    setPonto(p.latitude != null && p.longitude != null ? { latitude: Number(p.latitude), longitude: Number(p.longitude) } : null);
    setPontoMudou(false);
  }

  // Abre e busca o pedido
  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (!pedidoId) {
      if (dialog.open) dialog.close();
      return;
    }
    if (!dialog.open) dialog.showModal();
    setPedido(null);
    setEditando(false);
    setConfirmandoCancelamento(false);
    setMotivo("");
    setMensagem(null);
    pedidosService
      .obter(pedidoId)
      .then(aplicar)
      .catch((e) => setMensagem({ texto: (e as Error).message, erro: true }));
  }, [pedidoId]);

  function handleBackdropClick(e: React.MouseEvent<HTMLDialogElement>) {
    if (e.target === dialogRef.current) onFechar();
  }

  async function executar(acao: () => Promise<{ mensagem: string; pedido: PedidoDetalhe }>) {
    setOcupado(true);
    setMensagem(null);
    try {
      const r = await acao();
      aplicar(r.pedido);
      setMensagem({ texto: r.mensagem });
      onAlterado();
      return true;
    } catch (e) {
      setMensagem({ texto: (e as Error).message, erro: true });
      return false;
    } finally {
      setOcupado(false);
    }
  }

  // Tentar de novo (pedido volta para Novo) ou desistir (cancela o pedido)
  async function resolverOcorrencia(acao: "Reentregar" | "Cancelar") {
    if (!ocorrencia || !pedido) return;
    setOcupado(true);
    setMensagem(null);
    try {
      const r = await ocorrenciasService.resolver(ocorrencia.id, acao);
      aplicar(await pedidosService.obter(pedido.id));
      setMensagem({
        texto: acao === "Reentregar" ? "Pedido voltou para Novo: ele entra na próxima roteirização." : r.mensagem,
      });
      onAlterado();
    } catch (e) {
      setMensagem({ texto: (e as Error).message, erro: true });
    } finally {
      setOcupado(false);
    }
  }

  async function salvarEdicao() {
    if (!pedido || !form) return;

    let janela: { janelaInicio?: string; janelaFim?: string } = {};
    if (form.comJanela) {
      if (!form.dataJanela || !form.horaInicio || !form.horaFim) {
        return setMensagem({ texto: "Preencha a data e os horários da janela.", erro: true });
      }
      const inicio = new Date(`${form.dataJanela}T${form.horaInicio}:00`);
      const fim = new Date(`${form.dataJanela}T${form.horaFim}:00`);
      if (fim <= inicio) return setMensagem({ texto: "O fim da janela precisa ser depois do início.", erro: true });
      if (fim.getTime() <= Date.now()) {
        return setMensagem({ texto: "Essa janela já passou: escolha um horário futuro ou outra data.", erro: true });
      }
      janela = { janelaInicio: inicio.toISOString(), janelaFim: fim.toISOString() };
    }

    const peso = Number(form.pesoKg.replace(",", "."));
    const volumes = Number(form.volumes);
    if (!Number.isFinite(peso) || peso < 0) return setMensagem({ texto: "Peso inválido.", erro: true });
    if (!Number.isInteger(volumes) || volumes < 1) return setMensagem({ texto: "Informe pelo menos 1 volume.", erro: true });

    // Mesma regra do cadastro: com janela vira agendada, sem janela é no mesmo dia (retirada continua retirada)
    const modalidade = pedido.modalidade === "Retirada" ? "Retirada" : form.comJanela ? "Agendada" : "MesmoDia";

    const ok = await executar(() =>
      pedidosService.atualizar(pedido.id, {
        modalidade,
        clienteNome: form.clienteNome.trim(),
        clienteTelefone: vazioParaUndefined(form.clienteTelefone.replace(/\D/g, "")),
        clienteEmail: vazioParaUndefined(form.clienteEmail),
        cep: form.cep.replace(/\D/g, ""),
        logradouro: form.logradouro.trim(),
        numero: form.numero.trim(),
        complemento: vazioParaUndefined(form.complemento),
        bairro: form.bairro.trim(),
        cidade: form.cidade.trim(),
        uf: form.uf.trim(),
        referencia: vazioParaUndefined(form.referencia),
        ...janela,
        pesoKg: peso,
        volumes,
        observacoes: vazioParaUndefined(form.observacoes),
      }),
    );
    if (ok) setEditando(false);
  }

  async function completarPeloCep() {
    if (!form) return;
    const achado = await buscarCep(form.cep);
    if (!achado) return setMensagem({ texto: "CEP não encontrado. Confira o número.", erro: true });
    setForm({
      ...form,
      logradouro: form.logradouro || achado.logradouro,
      bairro: achado.bairro || form.bairro,
      cidade: achado.cidade,
      uf: achado.uf,
    });
  }

  const mudar = (campo: CampoTexto, valor: string) => setForm((f) => (f ? { ...f, [campo]: valor } : f));
  const podeEditar = pedido?.status === "Novo";
  const podeCancelar = pedido?.status === "Novo" || pedido?.status === "Roteirizado";

  const campo = (rotulo: string, chave: CampoTexto, extra?: Partial<React.InputHTMLAttributes<HTMLInputElement>>) => (
    <p className={base.campo}>
      <label htmlFor={`pedido-${chave}`} className={styles.rotulo}>{rotulo}</label>
      <input id={`pedido-${chave}`} className={base.input} value={form?.[chave] ?? ""}
        onChange={(e) => mudar(chave, e.target.value)} {...extra} />
    </p>
  );

  return (
    <dialog
      ref={dialogRef}
      className={`${base.modal} ${styles.modal}`}
      onClose={onFechar}
      onClick={handleBackdropClick}
      aria-labelledby="titulo-detalhe-pedido"
    >
      <article className={`${base.conteudoModal} ${styles.conteudo}`}>
        <header className={`${base.cabecalhoModal} ${styles.cabecalho}`}>
          <span className={base.iconeTitulo} aria-hidden="true">
            <TbPackage />
          </span>
          <hgroup className={base.titulosModal}>
            <h2 id="titulo-detalhe-pedido">{pedido ? `Pedido #${pedido.numeroPedido}` : "Pedido"}</h2>
            <p>{pedido ? `${NOME_MODALIDADE[pedido.modalidade]} · criado em ${dataHora(pedido.criadoEm)}` : "Carregando..."}</p>
          </hgroup>
          {pedido && <Status status={STATUS_TELA[pedido.status]} />}
          <button type="button" onClick={onFechar} className={base.botaoFechar} aria-label="Fechar">
            <IoClose size={22} />
          </button>
        </header>

        {!pedido || !form ? (
          mensagem?.erro ? (
            <p role="alert" className={styles.erro}>{mensagem.texto}</p>
          ) : (
            <div className={styles.carregando} aria-busy="true">
              <Esqueleto altura="4rem" />
              <Esqueleto altura="10rem" />
            </div>
          )
        ) : (
          <>
            {(pedido.problemas.length > 0 || pedido.avisos.length > 0) && (
              <section className={styles.diagnostico} aria-label="Situação do pedido">
                {pedido.problemas.map((t) => (
                  <p key={t} className={styles.problema}>
                    <TbAlertTriangle aria-hidden="true" /> {t}
                  </p>
                ))}
                {pedido.avisos.map((t) => (
                  <p key={t} className={styles.aviso}>
                    <TbInfoCircle aria-hidden="true" /> {t}
                  </p>
                ))}
              </section>
            )}
            {pedido.pronto && (
              <p className={styles.pronto}>Pronto para a roteirização de hoje.</p>
            )}

            <div className={`${base.colunasFormulario} ${styles.colunas}`}>
              <section className={base.coluna}>
                {editando ? (
                  <>
                    <fieldset className={base.grupoCampos}>
                      <legend className={styles.legenda}>Cliente</legend>
                      {campo("Nome", "clienteNome", { maxLength: 150 })}
                      <div className={styles.duas}>
                        {campo("Telefone", "clienteTelefone", { type: "tel" })}
                        {campo("E-mail", "clienteEmail", { type: "email" })}
                      </div>
                    </fieldset>
                    <fieldset className={base.grupoCampos}>
                      <legend className={styles.legenda}>Endereço</legend>
                      <div className={styles.duas}>
                        {campo("CEP", "cep", { inputMode: "numeric", onBlur: completarPeloCep })}
                        {campo("Número", "numero", { maxLength: 10 })}
                      </div>
                      {campo("Rua", "logradouro")}
                      <div className={styles.duas}>
                        {campo("Complemento", "complemento")}
                        {campo("Bairro", "bairro")}
                      </div>
                      <div className={styles.duas}>
                        {campo("Cidade", "cidade")}
                        {campo("UF", "uf", { maxLength: 2 })}
                      </div>
                      {campo("Referência", "referencia")}
                    </fieldset>
                    <fieldset className={base.grupoCampos}>
                      <legend className={styles.legenda}>Entrega</legend>
                      {pedido.modalidade !== "Retirada" && (
                        <div className={base.campo}>
                          <span className={styles.rotulo}>Janela</span>
                          <div className={base.gradeJanelas} role="group" aria-label="Janela de entrega">
                            <button type="button" aria-pressed={!form?.comJanela}
                              className={`${base.botaoJanela} ${!form?.comJanela ? base.botaoJanelaAtivo : ""}`}
                              onClick={() => setForm((f) => (f ? { ...f, comJanela: false } : f))}>
                              Qualquer horário
                            </button>
                            <button type="button" aria-pressed={!!form?.comJanela}
                              className={`${base.botaoJanela} ${form?.comJanela ? base.botaoJanelaAtivo : ""}`}
                              onClick={() => setForm((f) => (f ? { ...f, comJanela: true } : f))}>
                              Com horário
                            </button>
                          </div>
                          {form?.comJanela && (
                            <div className={`${base.janelaPersonalizada} ${styles.janelaEdicao}`}>
                              <label className={styles.campoJanela}>
                                <span className={base.rotuloAuxiliar}>Data</span>
                                <input type="date" className={base.input} value={form.dataJanela}
                                  min={dataLocal(new Date())} onChange={(e) => mudar("dataJanela", e.target.value)} />
                              </label>
                              <label className={styles.campoJanela}>
                                <span className={base.rotuloAuxiliar}>Início</span>
                                <input type="time" className={base.input} value={form.horaInicio}
                                  onChange={(e) => mudar("horaInicio", e.target.value)} />
                              </label>
                              <label className={styles.campoJanela}>
                                <span className={base.rotuloAuxiliar}>Fim</span>
                                <input type="time" className={base.input} value={form.horaFim}
                                  onChange={(e) => mudar("horaFim", e.target.value)} />
                              </label>
                            </div>
                          )}
                        </div>
                      )}
                      <div className={styles.duas}>
                        {campo("Peso (kg)", "pesoKg", { inputMode: "decimal" })}
                        {campo("Volumes", "volumes", { type: "number", min: 1, step: 1 })}
                      </div>
                      {campo("Observações", "observacoes")}
                    </fieldset>
                  </>
                ) : (
                  <>
                    <section className={styles.bloco}>
                      <h3 className={styles.legenda}>Cliente</h3>
                      <dl className={styles.dados}>
                        <dt>Nome</dt>
                        <dd>{pedido.clienteNome}</dd>
                        <dt>Telefone</dt>
                        <dd className={!pedido.clienteTelefone ? styles.faltando : undefined}>{pedido.clienteTelefone ?? "Não informado"}</dd>
                        <dt>E-mail</dt>
                        <dd className={!pedido.clienteEmail ? styles.faltando : undefined}>{pedido.clienteEmail ?? "Não informado"}</dd>
                      </dl>
                    </section>
                    <section className={styles.bloco}>
                      <h3 className={styles.legenda}>Endereço</h3>
                      <dl className={styles.dados}>
                        <dt>Rua</dt>
                        <dd>{pedido.logradouro ? `${pedido.logradouro}, ${pedido.numero ?? "s/n"}` : "Não informado"}{pedido.complemento ? ` · ${pedido.complemento}` : ""}</dd>
                        <dt>Bairro</dt>
                        <dd>{pedido.bairro ?? "--"}</dd>
                        <dt>Cidade</dt>
                        <dd>{pedido.cidade ? `${pedido.cidade}/${pedido.uf ?? ""}` : "--"} {pedido.cep ? `· CEP ${pedido.cep}` : ""}</dd>
                        {pedido.referencia && (
                          <>
                            <dt>Referência</dt>
                            <dd>{pedido.referencia}</dd>
                          </>
                        )}
                      </dl>
                    </section>
                    <section className={styles.bloco}>
                      <h3 className={styles.legenda}>Entrega</h3>
                      <dl className={styles.dados}>
                        <dt>Janela</dt>
                        <dd>{textoJanela(pedido.janelaInicio, pedido.janelaFim)}</dd>
                        <dt>Carga</dt>
                        <dd>{pedido.volumes} {pedido.volumes === 1 ? "volume" : "volumes"} · {formatarPeso(pedido.pesoKg)}</dd>
                        <dt>Origem</dt>
                        <dd>{pedido.origemNome}</dd>
                        {pedido.observacoes && (
                          <>
                            <dt>Observações</dt>
                            <dd>{pedido.observacoes}</dd>
                          </>
                        )}
                      </dl>
                    </section>

                    {pedido.status === "Ocorrencia" && (
                      <section className={styles.blocoOcorrencia} aria-label="Ocorrência na entrega">
                        <h3 className={styles.legenda}>Ocorrência na entrega</h3>
                        {ocorrencia ? (
                          <>
                            <p className={styles.motivoOcorrencia}>
                              <TbAlertTriangle aria-hidden="true" />
                              {NOME_OCORRENCIA[ocorrencia.tipo] ?? ocorrencia.tipo}
                            </p>
                            {ocorrencia.descricao && <p className={styles.descricaoOcorrencia}>“{ocorrencia.descricao}”</p>}
                            <p className={styles.metaOcorrencia}>
                              {ocorrencia.entregadorNome ? `${ocorrencia.entregadorNome} · ` : ""}
                              {dataHora(ocorrencia.registradaEm)}
                            </p>

                            {confirmandoOcorrencia ? (
                              <div className={styles.acoesOcorrencia}>
                                <span className={styles.textoConfirmacao}>
                                  {confirmandoOcorrencia === "Reentregar"
                                    ? "O pedido volta para Novo e entra na próxima roteirização. Confirmar?"
                                    : "O pedido será cancelado. Confirmar?"}
                                </span>
                                <button type="button" className={styles.botaoAcao} onClick={() => setConfirmandoOcorrencia(null)} disabled={ocupado}>
                                  Não
                                </button>
                                <button type="button" className={`${styles.botaoAcao} ${styles.botaoAcaoPrincipal}`} disabled={ocupado}
                                  onClick={() => resolverOcorrencia(confirmandoOcorrencia)}>
                                  Sim
                                </button>
                              </div>
                            ) : (
                              <div className={styles.acoesOcorrencia}>
                                <button type="button" className={`${styles.botaoAcao} ${styles.botaoAcaoPrincipal}`}
                                  onClick={() => setConfirmandoOcorrencia("Reentregar")} disabled={ocupado}>
                                  <TbRefresh aria-hidden="true" /> Tentar entregar de novo
                                </button>
                                <button type="button" className={styles.botaoAcao}
                                  onClick={() => setConfirmandoOcorrencia("Cancelar")} disabled={ocupado}>
                                  Cancelar pedido
                                </button>
                              </div>
                            )}
                            {ocorrencia.tipo === "EnderecoNaoEncontrado" && (
                              <p className={styles.dicaOcorrencia}>
                                Dica: depois de tentar de novo, confira o endereço e o ponto no mapa antes da próxima roteirização.
                              </p>
                            )}
                          </>
                        ) : (
                          <p className={styles.metaOcorrencia}>Carregando a ocorrência...</p>
                        )}
                      </section>
                    )}
                  </>
                )}
              </section>

              <section className={base.coluna}>
                <div className={styles.bloco}>
                  <div className={styles.tituloMapa}>
                    <h3 className={styles.legenda}>Local no mapa</h3>
                    <span className={`${styles.seloGeo} ${pedido.geocodificacaoStatus === "Ok" ? styles.seloGeoOk : styles.seloGeoAtencao}`}>
                      <TbMapPin aria-hidden="true" /> {NOME_GEOCODIFICACAO[pedido.geocodificacaoStatus]}
                    </span>
                  </div>
                  <div className={styles.mapa}>
                    <MapaPonto
                      ponto={ponto}
                      onMover={(p) => {
                        if (!podeEditar) return;
                        setPonto(p);
                        setPontoMudou(true);
                      }}
                    />
                    <span className={styles.dicaMapa}>
                      {!ponto ? "Sem ponto no mapa" : podeEditar ? "Arraste o pino para corrigir" : "Ponto da entrega"}
                    </span>
                  </div>
                  {podeEditar && (
                    <div className={styles.acoesMapa}>
                      <button type="button" className={styles.botaoAcao} disabled={ocupado}
                        onClick={() => executar(() => pedidosService.geocodificar(pedido.id))}>
                        <TbRefresh aria-hidden="true" /> Buscar endereço de novo
                      </button>
                      {pontoMudou && ponto && (
                        <button type="button" className={`${styles.botaoAcao} ${styles.botaoAcaoPrincipal}`} disabled={ocupado}
                          onClick={() => executar(() => pedidosService.ajustarPonto(pedido.id, ponto.latitude, ponto.longitude))}>
                          Salvar ponto
                        </button>
                      )}
                    </div>
                  )}
                </div>

                <section className={styles.bloco}>
                  <h3 className={styles.legenda}>Linha do tempo</h3>
                  <ol className={styles.linhaTempo}>
                    {pedido.eventos.length === 0 && <li className={styles.faltando}>Sem eventos.</li>}
                    {pedido.eventos.slice().reverse().map((e, i) => (
                      <li key={`${e.ocorridoEm}-${i}`}>
                        <strong>{e.descricao}</strong>
                        <span>{dataHora(e.ocorridoEm)}</span>
                      </li>
                    ))}
                  </ol>
                </section>
              </section>
            </div>

            {mensagem && (
              <p role={mensagem.erro ? "alert" : "status"} className={mensagem.erro ? styles.erro : styles.sucesso}>
                {mensagem.texto}
              </p>
            )}

            <footer className={`${base.rodapeModal} ${styles.rodape}`}>
              {confirmandoCancelamento ? (
                <div className={styles.cancelamento}>
                  <input className={base.input} placeholder="Motivo (opcional)" value={motivo} maxLength={300}
                    onChange={(e) => setMotivo(e.target.value)} />
                  <button type="button" className={base.botaoCancelar} onClick={() => setConfirmandoCancelamento(false)} disabled={ocupado}>
                    Voltar
                  </button>
                  <button type="button" className={base.botaoSalvarAlteracao} disabled={ocupado}
                    onClick={async () => {
                      if (await executar(() => pedidosService.cancelar(pedido.id, vazioParaUndefined(motivo)))) setConfirmandoCancelamento(false);
                    }}>
                    Confirmar cancelamento
                  </button>
                </div>
              ) : (
                <>
                  {podeCancelar && !editando && (
                    <button type="button" className={styles.linkCancelar} onClick={() => setConfirmandoCancelamento(true)}>
                      Cancelar pedido
                    </button>
                  )}
                  <div className={base.botoes}>
                    {editando ? (
                      <>
                        <button type="button" className={base.botaoCancelar} disabled={ocupado}
                          onClick={() => { setEditando(false); setForm(paraFormulario(pedido)); }}>
                          Descartar
                        </button>
                        <button type="button" className={base.botaoSalvarAlteracao} onClick={salvarEdicao} disabled={ocupado}>
                          {ocupado ? "Salvando..." : "Salvar alterações"}
                        </button>
                      </>
                    ) : (
                      <>
                        <button type="button" className={base.botaoCancelar} onClick={onFechar}>
                          Fechar
                        </button>
                        {podeEditar && (
                          <button type="button" className={base.botaoSalvarAlteracao} onClick={() => setEditando(true)}>
                            <TbPencil aria-hidden="true" /> Editar dados
                          </button>
                        )}
                      </>
                    )}
                  </div>
                </>
              )}
            </footer>
          </>
        )}
      </article>
    </dialog>
  );
}
