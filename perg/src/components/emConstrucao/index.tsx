// Página que ainda não tem tela: evita o erro de build de página sem componente.
// Quem fizer a tela substitui o arquivo da página inteiro.
export default function EmConstrucao({ titulo }: { titulo: string }) {
  return (
    <div style={{ padding: "48px 24px", textAlign: "center", fontFamily: "var(--fonte-texto)" }}>
      <h2 style={{ fontFamily: "var(--fonte-titulo)", color: "var(--cor-primaria-verde-escuro)", marginBottom: 8 }}>
        {titulo}
      </h2>
      <p style={{ color: "var(--cor-texto-secundario)" }}>Esta tela ainda está em construção.</p>
    </div>
  );
}
