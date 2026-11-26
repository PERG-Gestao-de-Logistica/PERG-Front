
interface ModalNovaOrigemProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ModalNovaOrigem({
  isOpen,
  onClose,
}: ModalNovaOrigemProps) {
  if (!isOpen) return null;

  return (
    <div
      className="modal-nova-origem-overlay"
      onClick={onClose}
    >
      <div
        className="modal-nova-origem"
        onClick={(e) => e.stopPropagation()}
      >
        {/* CABEÇALHO */}
        <div className="area-inicial-modal">
          <img
            src="/loja-icone.png"
            alt="Ícone de loja"
            className="lojinha-icone"
          />

          <div className="texto-inicial-modal">
            <h2>Nova origem</h2>

            <p>
              Ponto onde os entregadores coletam os pedidos
            </p>
          </div>
        </div>

        {/* IDENTIFICAÇÃO */}
        <div className="identificacao">
          <p>IDENTIFICAÇÃO</p>
        </div>

        {/* FORMULÁRIO */}
        <div className="primeiro-forms">
         <label
         htmlFor="nome-origem"
        className="texto-verde-escuro"
        >
        Nome da origem
        </label>
          <input
            type="text"
            id="nome-origem"
            placeholder="Ex: Loja Vila Madalena"
          />
        </div>

        {/* FECHAR */}
        <button
          type="button"
          className="botao-fechar-modal"
          onClick={onClose}
          aria-label="Fechar modal"
        >
          ×
        </button>
      </div>
    </div>
  );
}
