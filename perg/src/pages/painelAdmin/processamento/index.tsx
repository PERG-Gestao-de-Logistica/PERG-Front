
import {
  Area,
  AreaChart,
  CartesianGrid,
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import styles from "./processamento.module.css";

const metricas = [
  { titulo: "Mensagens na Fila", valor: "412" },
  { titulo: "Tempo Médio", valor: "1,8s" },
  { titulo: "Mais Antiga", valor: "12 minutos", cor: "laranja" },
  { titulo: "Falhas/Tentativas", valor: "34 falhas", cor: "vermelho" },
];

const dadosGrafico = [
  { horario: "10:00", fila: 32, processamento: 40 },
  { horario: "10:05", fila: 45, processamento: 36 },
  { horario: "10:10", fila: 28, processamento: 48 },
  { horario: "10:15", fila: 55, processamento: 44 },
  { horario: "10:20", fila: 38, processamento: 56 },
  { horario: "10:25", fila: 62, processamento: 46 },
  { horario: "10:30", fila: 42, processamento: 52 },
];

const filas = [
  { nome: "Pedidos", mensagens: 82, tempo: "1,2 s", falhas: 3, status: "Normal" },
  { nome: "Roteirização", mensagens: 64, tempo: "2,4 s", falhas: 7, status: "Atenção" },
  { nome: "Notificações", mensagens: 28, tempo: "0,8 s", falhas: 2, status: "Normal" },
  { nome: "Rastreamento", mensagens: 0, tempo: "0,3 s", falhas: 0, status: "Normal" },
  { nome: "DLQ (com erro)", mensagens: 12, tempo: "—", falhas: 12, status: "Revisão" },
];

export default function Processamento() {
  return (
    <main className={styles.pagina}>
      <section className={styles.metricas} aria-label="Métricas de processamento">
        {metricas.map((metrica) => (
          <article className={styles.cardMetrica} key={metrica.titulo}>
            <span>{metrica.titulo}</span>
            <strong
              className={
                metrica.cor === "laranja"
                  ? styles.valorLaranja
                  : metrica.cor === "vermelho"
                    ? styles.valorVermelho
                    : ""
              }
            >
              {metrica.valor}
            </strong>
          </article>
        ))}
      </section>

      <section className={styles.conteudo}>
        <article className={styles.cardGrafico}>
          <h2>Tamanho das filas</h2>

          <div className={styles.grafico}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={dadosGrafico}>
                <defs>
                  <linearGradient id="preenchimentoFila" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#00c8bd" stopOpacity={0.35} />
                    <stop offset="100%" stopColor="#00c8bd" stopOpacity={0} />
                  </linearGradient>
                </defs>

                <XAxis dataKey="horario" hide />
                <YAxis hide />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#062b2e",
                    border: "1px solid #075b5c",
                    borderRadius: 8,
                  }}
                />

                <Area
                  type="monotone"
                  dataKey="fila"
                  stroke="#00c8bd"
                  strokeWidth={2}
                  fill="url(#preenchimentoFila)"
                />
                <Area
                  type="monotone"
                  dataKey="processamento"
                  stroke="#f4ffff"
                  strokeWidth={1.5}
                  fill="transparent"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className={styles.cardFilas}>
          <h2>Filas de processamento</h2>

          <div className={styles.tabelaContainer}>
            <table className={styles.tabela}>
              <thead>
                <tr>
                  <th>Fila</th>
                  <th>Msgs</th>
                  <th>Tempo</th>
                  <th>Falhas</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {filas.map((fila) => (
                  <tr key={fila.nome}>
                    <th scope="row">{fila.nome}</th>
                    <td>{fila.mensagens}</td>
                    <td>{fila.tempo}</td>
                    <td className={fila.falhas > 5 ? styles.falhaAlta : ""}>
                      {fila.falhas}
                    </td>
                    <td
                      className={
                        fila.status === "Normal"
                          ? styles.statusNormal
                          : fila.status === "Atenção"
                            ? styles.statusAtencao
                            : styles.statusRevisao
                      }
                    >
                      {fila.status}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </article>
      </section>
    </main>
  );
}