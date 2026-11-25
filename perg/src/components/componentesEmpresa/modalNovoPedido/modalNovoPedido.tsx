"use client";

import { useEffect, useRef, useState } from "react";
import { FaCheck, FaMinus, FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuPackage } from "react-icons/lu";
import { MdTwoWheeler } from "react-icons/md";
import styles from "./modalNovoPedido.module.css";
import { buscarCep } from "@/services/cepService";
import { EVENTO_PEDIDO_CRIADO, pedidosService } from "@/services/pedidosService";

interface ModalNovoPedidoProps {
  aberto: boolean;
  onFechar: () => void;
}

// Janela fixa -> horário de início e fim
const HORARIOS: Record<string, [string, string]> = {
  "08–12h": ["08:00", "12:00"],
  "12–18h": ["12:00", "18:00"],
  "18–21h": ["18:00", "21:00"],
};

// Monta a janela para hoje; se o fim já passou, agenda para amanhã
function montarJanela(inicio: string, fim: string) {
  const data = (hora: string, diasAMais: number) => {
    const [h, m] = hora.split(":").map(Number);
    const d = new Date();
    d.setDate(d.getDate() + diasAMais);
    d.setHours(h, m, 0, 0);
    return d;
  };
  const diasAMais = data(fim, 0) <= new Date() ? 1 : 0;
  return { janelaInicio: data(inicio, diasAMais).toISOString(), janelaFim: data(fim, diasAMais).toISOString() };
}

const somenteDigitos = (v: string) => v.replace(/\D/g, "");

const JANELAS_HORARIO = [
  "Qualquer",
  "08–12h",
  "12–18h",
  "18–21h",
  "Personalizar",
];

export default function ModalNovoPedido({
  aberto,
  onFechar,
}: ModalNovoPedidoProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  const [tipoPedido, setTipoPedido] = useState<"entrega" | "coleta">("entrega");
  const [janelaSelecionada, setJanelaSelecionada] = useState("Qualquer");
  const [volumes, setVolumes] = useState(1);
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");

  const [nome, setNome] = useState("");
  const [celular, setCelular] = useState("");
  const [email, setEmail] = useState("");
  const [cep, setCep] = useState("");
  const [rua, setRua] = useState("");
  const [numero, setNumero] = useState("");
  const [complemento, setComplemento] = useState("");
  const [local, setLocal] = useState<{ bairro: string; cidade: string; uf: string } | null>(null);
  const [peso, setPeso] = useState("");
  const [observacoes, setObservacoes] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");
  const [enviando, setEnviando] = useState(false);

  function limpar() {
    setJanelaSelecionada("Qualquer");
    setVolumes(1);
    setHoraInicio("");
    setHoraFim("");
    setNome("");
    setCelular("");
    setEmail("");
    setCep("");
    setRua("");
    setNumero("");
    setComplemento("");
    setLocal(null);
    setPeso("");
    setObservacoes("");
    setErro("");
    setSucesso("");
  }

  // Ao sair do CEP: completa rua, bairro, cidade e UF
  async function completarPeloCep() {
    const achado = await buscarCep(cep);
    if (!achado) {
      setLocal(null);
      setErro("CEP não encontrado. Confira o número.");
      return;
    }
    setErro("");
    setRua((atual) => atual || achado.logradouro);
    setLocal({ bairro: achado.bairro, cidade: achado.cidade, uf: achado.uf });
  }

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
    if (e.target === dialogRef.current) {
      onFechar();
    }
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!local) return setErro("Digite um CEP válido para completar o endereço.");

    const janela =
      janelaSelecionada === "Qualquer"
        ? null
        : janelaSelecionada === "Personalizar"
          ? montarJanela(horaInicio, horaFim)
          : montarJanela(...HORARIOS[janelaSelecionada]);

    setErro("");
    setEnviando(true);
    try {
      const resposta = await pedidosService.criar({
        modalidade: janela ? "Agendada" : "MesmoDia",
        clienteNome: nome.trim(),
        clienteTelefone: somenteDigitos(celular) || undefined,
        clienteEmail: email.trim() || undefined,
        cep: somenteDigitos(cep),
        logradouro: rua.trim(),
        numero: numero.trim(),
        complemento: complemento.trim() || undefined,
        ...local,
        ...(janela ?? {}),
        pesoKg: Number(peso.replace(",", ".")) || 0,
        volumes,
        observacoes: observacoes.trim() || undefined,
      });
      setSucesso(`Pedido #${resposta.pedido.numeroPedido} criado!`);
      window.dispatchEvent(new Event(EVENTO_PEDIDO_CRIADO));
      setTimeout(() => {
        limpar();
        onFechar();
      }, 1500);
    } catch (erroCriar) {
      setErro((erroCriar as Error).message);
    } finally {
      setEnviando(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      className={styles.modal}
      onClose={onFechar}
      onClick={handleBackdropClick}
      aria-labelledby="titulo-modal-pedido"
    >
      <article className={styles.conteudoModal}>
        <header className={styles.cabecalhoModal}>
          <span className={styles.iconeTitulo} aria-hidden="true">
            <FaPlus />
          </span>

          <hgroup className={styles.titulosModal}>
            <h2 id="titulo-modal-pedido">Novo pedido</h2>
            <p>O pedido entra como Novo e pode ser roteirizado em seguida.</p>
          </hgroup>

          <button
            type="button"
            onClick={onFechar}
            className={styles.botaoFechar}
            aria-label="Fechar modal"
          >
            <IoClose size={22} />
          </button>
        </header>

        <nav className={styles.seletorTipo} aria-label="Tipo de operação">
          <button
            type="button"
            onClick={() => setTipoPedido("entrega")}
            className={`${styles.botaoTipo} ${
              tipoPedido === "entrega" ? styles.botaoTipoAtivo : ""
            }`}
            aria-pressed={tipoPedido === "entrega"}
          >
            <MdTwoWheeler size={24} />
            <span>Entrega</span>
          </button>

          {/* Coleta no endereço do cliente ainda não existe na API */}
          <button
            type="button"
            disabled
            title="Em breve"
            className={styles.botaoTipo}
            aria-pressed={false}
            style={{ opacity: 0.5, cursor: "not-allowed" }}
          >
            <LuPackage size={24} />
            <span>Coleta (em breve)</span>
          </button>
        </nav>

        <form onSubmit={handleSubmit} className={styles.formulario}>
          <div className={styles.colunasFormulario}>
            <section className={styles.coluna}>
              <fieldset className={styles.grupoCampos}>
                <legend className={styles.legendaSecao}>Cliente</legend>

                <p className={styles.campo}>
                  <label htmlFor="clienteNome" className={styles.rotulo}>
                    Nome
                  </label>
                  <input
                    id="clienteNome"
                    name="clienteNome"
                    type="text"
                    placeholder="Nome do destinatário"
                    className={styles.input}
                    value={nome}
                    onChange={(e) => setNome(e.target.value)}
                    required
                  />
                </p>

                <p className={styles.campo}>
                  <label htmlFor="clienteCelular" className={styles.rotulo}>
                    Celular
                  </label>
                  <input
                    id="clienteCelular"
                    name="clienteCelular"
                    type="tel"
                    placeholder="(11) 90000-0000"
                    className={styles.input}
                    value={celular}
                    onChange={(e) => setCelular(e.target.value)}
                    required
                  />
                </p>

                <p className={styles.campo}>
                  <label htmlFor="clienteEmail" className={styles.rotulo}>
                    E-mail (opcional)
                  </label>
                  <input
                    id="clienteEmail"
                    name="clienteEmail"
                    type="email"
                    placeholder="Recebe o link de rastreio"
                    className={styles.input}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </p>
              </fieldset>

              <fieldset className={styles.grupoCampos}>
                <legend className={styles.legendaSecao}>Endereço</legend>

                <div className={styles.linhaCepRua}>
                  <p className={styles.campo}>
                    <label htmlFor="cep" className="sr-only" hidden>
                      CEP
                    </label>
                    <input
                      id="cep"
                      name="cep"
                      type="text"
                      placeholder="CEP"
                      aria-label="CEP"
                      inputMode="numeric"
                      className={styles.input}
                      value={cep}
                      onChange={(e) => setCep(e.target.value)}
                      onBlur={completarPeloCep}
                      required
                    />
                  </p>

                  <p className={styles.campo}>
                    <label htmlFor="rua" hidden>
                      Rua
                    </label>
                    <input
                      id="rua"
                      name="rua"
                      type="text"
                      placeholder="Rua"
                      aria-label="Rua"
                      className={styles.input}
                      value={rua}
                      onChange={(e) => setRua(e.target.value)}
                      required
                    />
                  </p>
                </div>

                <div className={styles.linhaNumeroComplemento}>
                  <p className={styles.campo}>
                    <label htmlFor="numero" hidden>
                      Número
                    </label>
                    <input
                      id="numero"
                      name="numero"
                      type="text"
                      placeholder="Número"
                      aria-label="Número"
                      className={styles.input}
                      value={numero}
                      onChange={(e) => setNumero(e.target.value)}
                      required
                    />
                  </p>

                  <p className={styles.campo}>
                    <label htmlFor="complemento" hidden>
                      Complemento
                    </label>
                    <input
                      id="complemento"
                      name="complemento"
                      type="text"
                      placeholder="Complemento"
                      aria-label="Complemento"
                      className={styles.input}
                      value={complemento}
                      onChange={(e) => setComplemento(e.target.value)}
                    />
                  </p>
                </div>

                {local && (
                  <p style={{ margin: 0, fontSize: 14, color: "var(--cor-texto-secundario)" }}>
                    {local.bairro} - {local.cidade}/{local.uf}
                  </p>
                )}
              </fieldset>
            </section>

            <section className={styles.coluna}>
              <fieldset className={styles.grupoCampos}>
                <legend className={styles.legendaSecao}>
                  {tipoPedido === "entrega" ? "Entrega" : "Coleta"}
                </legend>

                <div className={styles.campo}>
                  <span className={styles.rotulo}>Janela</span>
                  <div
                    className={styles.gradeJanelas}
                    role="group"
                    aria-label="Janela de horário"
                  >
                    {JANELAS_HORARIO.map((janela) => (
                      <button
                        key={janela}
                        type="button"
                        onClick={() => setJanelaSelecionada(janela)}
                        className={`${styles.botaoJanela} ${
                          janelaSelecionada === janela
                            ? styles.botaoJanelaAtivo
                            : ""
                        }`}
                        aria-pressed={janelaSelecionada === janela}
                      >
                        {janela}
                      </button>
                    ))}
                  </div>

                  {janelaSelecionada === "Personalizar" && (
                    <div className={styles.janelaPersonalizada}>
                      <p className={styles.campo}>
                        <label
                          htmlFor="horaInicio"
                          className={styles.rotuloAuxiliar}
                        >
                          Das
                        </label>
                        <input
                          id="horaInicio"
                          name="horaInicio"
                          type="time"
                          value={horaInicio}
                          onChange={(e) => setHoraInicio(e.target.value)}
                          className={styles.input}
                          required
                        />
                      </p>

                      <p className={styles.campo}>
                        <label
                          htmlFor="horaFim"
                          className={styles.rotuloAuxiliar}
                        >
                          Até
                        </label>
                        <input
                          id="horaFim"
                          name="horaFim"
                          type="time"
                          value={horaFim}
                          min={horaInicio || undefined}
                          onChange={(e) => setHoraFim(e.target.value)}
                          className={styles.input}
                          required
                        />
                      </p>
                    </div>
                  )}
                </div>

                <div className={styles.linhaVolumesPeso}>
                  <div className={styles.campo}>
                    <span className={styles.rotulo}>Volumes</span>
                    <div className={styles.contadorVolumes}>
                      <button
                        type="button"
                        onClick={() => setVolumes((v) => Math.max(1, v - 1))}
                        aria-label="Diminuir volumes"
                        className={styles.botaoContador}
                      >
                        <FaMinus size={12} />
                      </button>
                      <output className={styles.valorVolumes}>{volumes}</output>
                      <button
                        type="button"
                        onClick={() => setVolumes((v) => v + 1)}
                        aria-label="Aumentar volumes"
                        className={styles.botaoContador}
                      >
                        <FaPlus size={12} />
                      </button>
                    </div>
                  </div>

                  <p className={styles.campo}>
                    <label htmlFor="peso" className={styles.rotulo}>
                      Peso (kg)
                    </label>
                    <input
                      id="peso"
                      name="peso"
                      type="number"
                      step="0.1"
                      min="0"
                      placeholder="0.0"
                      className={styles.input}
                      value={peso}
                      onChange={(e) => setPeso(e.target.value)}
                    />
                  </p>
                </div>

                {/* Valor declarado (seguro da carga): a API ainda não guarda esse dado */}

                <p className={styles.campo}>
                  <label htmlFor="observacoes" className={styles.rotulo}>
                    Observações para o entregador
                  </label>
                  <textarea
                    id="observacoes"
                    name="observacoes"
                    rows={3}
                    placeholder="Ex: entregar na portaria"
                    className={`${styles.input} ${styles.textarea}`}
                    value={observacoes}
                    onChange={(e) => setObservacoes(e.target.value)}
                  />
                </p>
              </fieldset>
            </section>
          </div>

          {(erro || sucesso) && (
            <p
              role={erro ? "alert" : "status"}
              style={{ margin: "0 0 8px", fontSize: 14, color: erro ? "var(--cor-perigo)" : "var(--cor-sucesso)" }}
            >
              {erro || sucesso}
            </p>
          )}

          <footer className={styles.rodapeModal}>
            <div className={styles.botoes}>
              <button
                type="button"
                onClick={onFechar}
                className={styles.botaoCancelar}
              >
                Cancelar
              </button>
              <button type="submit" className={styles.botaoSalvarAlteracao} disabled={enviando || !!sucesso}>
                <FaCheck size={14} />
                <span>{enviando ? "Criando..." : "Criar pedido"}</span>
              </button>
            </div>
          </footer>
        </form>
      </article>
    </dialog>
  );
}