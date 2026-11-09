import { Mail } from "lucide-react";
import "bootstrap-icons/font/bootstrap-icons.css";

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-logo">
        <img
          src="/c5Verde.png"
          alt="Logo C5 Solutions"
          className="logo"
        />
      </div>

      <div className="footer-informacoes">
        <p className="texto-apagado">
          Tecnologia para conectar toda a
          <br />
          operação de entrega.
        </p>
      </div>

      <nav className="opcoes-footer">
        <a href="#produto">Produto</a>
        <a href="#solucoes">Soluções</a>
        <a href="#empresa">Empresa</a>
      </nav>
    </footer>
  );
}
