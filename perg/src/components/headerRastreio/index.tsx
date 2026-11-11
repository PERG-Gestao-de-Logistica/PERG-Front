import Button from "@/components/botao";

export default function HeaderRastreio() {
  return (
    <header className="header-rastreio">
      <div className="header-rastreio-container">
        <img
          src="/logoCinza.png"
          alt="Logo PERG Cinza"
          className="logo-header-rastreio"
        />

        <p className="texto-header-rastreio">
          Acompanhe sua entrega
        </p>


      </div>
    </header>
  );
}