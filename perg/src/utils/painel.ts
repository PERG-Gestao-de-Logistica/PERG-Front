// Textos do cabeçalho e do menu do painel

export function saudacao(data = new Date()) {
  const hora = data.getHours();
  if (hora < 12) return "Bom dia";
  if (hora < 18) return "Boa tarde";
  return "Boa noite";
}

// "quinta, 08 de out"
export function dataPorExtenso(data = new Date()) {
  const diaSemana = data.toLocaleDateString("pt-BR", { weekday: "long" }).split("-")[0];
  const dia = String(data.getDate()).padStart(2, "0");
  const mes = data.toLocaleDateString("pt-BR", { month: "short" }).replace(".", "");
  return `${diaSemana}, ${dia} de ${mes}`;
}

// "Ana Souza" -> "AS"
export function iniciais(nome: string) {
  const partes = nome.trim().split(/\s+/).filter(Boolean);
  if (partes.length === 0) return "";
  const primeira = partes[0][0];
  const ultima = partes.length > 1 ? partes[partes.length - 1][0] : "";
  return (primeira + ultima).toUpperCase();
}

export const primeiroNome = (nome: string) => nome.trim().split(/\s+/)[0] ?? "";

export const nomePapel = (papel: string) => (papel === "Admin" ? "Admin" : "Funcionário");
