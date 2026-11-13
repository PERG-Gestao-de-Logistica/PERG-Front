//! AVISO: estrutura de teste e validação enquanto não tem a layout
import Link from "next/link";

export default function Home() {
  return (
    <div style={{ padding: "40px", fontFamily: "var(--fonte-texto)" }}>
      <h1 style={{ fontFamily: "var(--fonte-titulo)", marginBottom: "20px" }}>
        Testes - Estrutura do Projeto
      </h1>

      <div style={{ display: "flex", gap: "16px"}}>
        <Link 
          href="/painelAdmin/visaoGeral"
        >
          Testar Painel Admin
        </Link>

        <Link 
          href="/painelEmpresa/visaoGeral"
        >
          Testar Painel Empresa
        </Link>
      </div>
    </div>
  );
}