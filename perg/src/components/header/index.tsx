import Button from "@/components/botao";

export default function Header() {
  return (
    <header className="header">
      <div className="header-container">
        <img
          src="/logoCinza.png"
          alt="Logo PERG Cinza"
          className="logo"
        />

        <div className="botoes">
          <Button variant="principal">
            Assine Agora
          </Button>

          <Button variant="texto">
            Entrar
          </Button>
        </div>
      </div>
    </header>
  );
}