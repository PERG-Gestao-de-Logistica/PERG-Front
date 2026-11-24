//! AVISO: estrutura de teste e validação enquanto não tem a layout
import Link from "next/link";

const paginas = [
  { nome: "Login", rota: "/login" },
  { nome: "Cadastro", rota: "/onboarding/cadastroConta" },
  { nome: "Painel Empresa", rota: "/painelEmpresa/visaoGeral" },
  { nome: "Painel Admin", rota: "/painelAdmin/alertas" },
];

export default function Home() {
  return (
    <div style={{ padding: "40px", fontFamily: "var(--fonte-texto)" }}>
      <h1 style={{ fontFamily: "var(--fonte-titulo)", marginBottom: "20px" }}>
        Testes - Estrutura do Projeto
      </h1>

      <div style={{ display: "flex", gap: "16px" }}>
        {paginas.map((p) => (
          <Link key={p.rota} href={p.rota}>
            {p.nome}
          </Link>
        ))}
      </div>
    </div>
  );
}
