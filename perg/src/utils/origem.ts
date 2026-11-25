// Textos dos cards e do modal de origens

// Ordem da semana na tela (seg a dom) com o número da API (0 domingo ... 6 sábado)
export const DIAS_SEMANA = [
  { dia: 1, letra: "S", nome: "Seg" },
  { dia: 2, letra: "T", nome: "Ter" },
  { dia: 3, letra: "Q", nome: "Qua" },
  { dia: 4, letra: "Q", nome: "Qui" },
  { dia: 5, letra: "S", nome: "Sex" },
  { dia: 6, letra: "S", nome: "Sáb" },
  { dia: 0, letra: "D", nome: "Dom" },
];

// "08:00:00" -> "08:00"
export const hora = (h: string) => h.slice(0, 5);

// [1,2,3,4,5] -> "Seg-Sex"; [1,3,5] -> "Seg, Qua, Sex"
export function textoDias(dias: number[]) {
  const marcados = DIAS_SEMANA.map((d) => dias.includes(d.dia));
  const grupos: string[] = [];
  let i = 0;
  while (i < DIAS_SEMANA.length) {
    if (!marcados[i]) {
      i++;
      continue;
    }
    let fim = i;
    while (fim + 1 < DIAS_SEMANA.length && marcados[fim + 1]) fim++;
    grupos.push(
      fim - i >= 2
        ? `${DIAS_SEMANA[i].nome}-${DIAS_SEMANA[fim].nome}`
        : DIAS_SEMANA.slice(i, fim + 1).map((d) => d.nome).join(", "),
    );
    i = fim + 1;
  }
  return grupos.join(", ");
}

// "11900000001" -> "(11) 90000-0001"
export function formatarTelefone(t: string | null) {
  const d = (t ?? "").replace(/\D/g, "");
  if (d.length === 11) return `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}`;
  if (d.length === 10) return `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}`;
  return t ?? "";
}

// "01101000" -> "01101-000"
export const formatarCep = (c: string) => (c.length === 8 ? `${c.slice(0, 5)}-${c.slice(5)}` : c);
