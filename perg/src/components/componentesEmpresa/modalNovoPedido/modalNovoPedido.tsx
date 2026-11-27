"use client";

import { useEffect, useRef, useState } from "react";
import { FaCheck, FaMinus, FaPlus } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { LuPackage } from "react-icons/lu";
import { MdTwoWheeler } from "react-icons/md";
import styles from "./modalNovoPedido.module.css";

interface ModalNovoPedidoProps {
  aberto: boolean;
  onFechar: () => void;
}

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
  const [janelaSelecionada, setJanelaSelecionada] = useState("08–12h");
  const [volumes, setVolumes] = useState(1);
  const [horaInicio, setHoraInicio] = useState("");
  const [horaFim, setHoraFim] = useState("");

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

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    onFechar();
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

          <button
            type="button"
            onClick={() => setTipoPedido("coleta")}
            className={`${styles.botaoTipo} ${
              tipoPedido === "coleta" ? styles.botaoTipoAtivo : ""
            }`}
            aria-pressed={tipoPedido === "coleta"}
          >
            <LuPackage size={24} />
            <span>Coleta</span>
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
                    required
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
                      className={styles.input}
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
                    />
                  </p>
                </div>
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
                    />
                  </p>
                </div>

                <p className={styles.campo}>
                  <label htmlFor="valorDeclarado" className={styles.rotulo}>
                    Valor declarado
                  </label>
                  <input
                    id="valorDeclarado"
                    name="valorDeclarado"
                    type="text"
                    placeholder="R$ 0,00 · para o seguro da carga"
                    className={styles.input}
                  />
                </p>

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
                  />
                </p>
              </fieldset>
            </section>
          </div>

          <footer className={styles.rodapeModal}>
            <div className={styles.botoes}>
              <button
                type="button"
                onClick={onFechar}
                className={styles.botaoCancelar}
              >
                Cancelar
              </button>
              <button type="submit" className={styles.botaoSalvarAlteracao}>
                <FaCheck size={14} />
                <span>Criar pedido</span>
              </button>
            </div>
          </footer>
        </form>
      </article>
    </dialog>
  );
}