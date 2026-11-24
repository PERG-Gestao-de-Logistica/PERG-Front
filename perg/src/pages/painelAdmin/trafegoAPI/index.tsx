import { indicesExemplos } from "@/mocks/trafegoAPI";
import styles from "./trafegoAPI.module.css";
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


export default function TrafegoAPI() {

    const dadosGrafico = [
  { horario: "15:00", requisicoes: 45, latencia: 38 },
  { horario: "15:05", requisicoes: 58, latencia: 42 },
  { horario: "15:10", requisicoes: 51, latencia: 35 },
  { horario: "15:15", requisicoes: 64, latencia: 44 },
  { horario: "15:00", requisicoes: 45, latencia: 38 },
  { horario: "15:05", requisicoes: 58, latencia: 42 },
  { horario: "15:10", requisicoes: 51, latencia: 35 },
  { horario: "15:15", requisicoes: 64, latencia: 44 },
  { horario: "15:00", requisicoes: 45, latencia: 38 },
  { horario: "15:05", requisicoes: 58, latencia: 42 },
  { horario: "15:10", requisicoes: 51, latencia: 35 },
  { horario: "15:15", requisicoes: 64, latencia: 44 },
];

const dadosErros = [
  { nome: "2xx - sucesso", valor: 90, cor: "#03bfb5" },
  { nome: "4xx - cliente", valor: 7, cor: "#ffa43d" },
  { nome: "5xx - servidor", valor: 3, cor: "#fd6554" },
];

  return (
    <main className={styles.paginaTrafego}>
      <section className={styles.indices} aria-label="Indicadores de tráfego">
        {indicesExemplos.map((indice) => (
          <article className={styles.indicador} key={indice.id}>
            <span className={styles.indicadorTitulo}>
              {indice.titulo_indices}
            </span>
            <strong
              className={`${styles.indicadorNumero} ${
            indice.titulo_indices === "Latência P95"
            ? styles.latencia
            : indice.titulo_indices === "Taxa de Erro 5xx"
            ? styles.erro
            : ""
             }`}
            >
            {indice.numero_dados}
            </strong>
          </article>
        ))}
      </section>

      <section className={styles.painelGraficos} aria-label="Dados de tráfego">
        <article className={styles.grafico}>
          <h2>Requisições e Latência</h2>
          <div className={styles.graficoVisual}>
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart
                data={dadosGrafico}
                margin={{ top: 8, right: 8, left: -12, bottom: 8 }}
              >
                <defs>
                  <linearGradient
                    id="requisicoesFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#b9d1d2" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#b9d1d2" stopOpacity={0.02} />
                  </linearGradient>
                  <linearGradient
                    id="latenciaFill"
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <stop offset="0%" stopColor="#078c84" stopOpacity={0.3} />
                    <stop offset="100%" stopColor="#078c84" stopOpacity={0.02} />
                  </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#174548" />
                <XAxis
                  dataKey="horario"
                  angle={-45}
                  textAnchor="end"
                  height={55}
                  tick={{ fill: "#c2d0d0", fontSize: 11 }}
                  axisLine={{ stroke: "#476164" }}
                  tickLine={false}
                />
                <YAxis
                  domain={[0, 100]}
                  ticks={[0, 20, 40, 60, 80, 100]}
                  tick={{ fill: "#c2d0d0", fontSize: 11 }}
                  axisLine={false}
                  tickLine={false}
                />
                <Tooltip />
                <Legend
                  verticalAlign="bottom"
                  align="center"
                  iconType="plainline"
                  wrapperStyle={{
                    color: "#c2d0d0",
                    fontSize: 12,
                    paddingTop: 8,
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="requisicoes"
                  name="Requisições por segundo"
                  stroke="#b9d1d2"
                  strokeWidth={2}
                  fill="url(#requisicoesFill)"
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="latencia"
                  name="Latência P95 (ms)"
                  stroke="#078c84"
                  strokeWidth={2}
                  fill="url(#latenciaFill)"
                  dot={false}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </article>

        <article className={styles.endpoints} aria-label="Requisições por endpoint">
          <table className={styles.tabelaEndpoints}>
            <thead>
              <tr>
                <th scope="col">Endpoint</th>
                <th scope="col">Requisições</th>
                <th scope="col">P95</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>GET /api/pedidos</td>
                <td>842.320</td>
                <td>120 ms</td>
              </tr>
              <tr>
                <td>POST /api/pedidos</td>
                <td>412.860</td>
                <td>184 ms</td>
              </tr>
              <tr>
                <td>GET /api/entregas</td>
                <td>302.190</td>
                <td>96 ms</td>
              </tr>
              <tr>
                <td>GET /api/rotas</td>
                <td>188.360</td>
                <td>210 ms</td>
              </tr>
              <tr>
                <td>PATCH /api/pedidos/:id</td>
                <td>120.540</td>
                <td>275 ms</td>
              </tr>
              <tr>
                <td>GET /api/empresas</td>
                <td>98.110</td>
                <td>88 ms</td>
              </tr>
            </tbody>
          </table>
        </article>
      </section>

<article className={styles.cardCircular}>
  <div className={styles.graficoCircular}>
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={dadosErros}
          dataKey="valor"
          nameKey="nome"
          innerRadius="58%"
          outerRadius="82%"
          paddingAngle={2}
          stroke="none"
        >
          {dadosErros.map((item) => (
            <Cell key={item.nome} fill={item.cor} />
          ))}
        </Pie>
        <text
         x="50%"
         y="50%"
         textAnchor="middle"
         dominantBaseline="middle"
         fill="var(--cor-texto-branco)"
         fontSize="16"
         fontWeight="600"
         >
          <tspan x="50%" dy="-0.35em">2,48 mi</tspan>
          <tspan x="50%" dy="1.2em">Total</tspan>
        </text>
      </PieChart>

    </ResponsiveContainer>
  </div>

  <ul className={styles.legendaCircular}>
    <h2>Código de Resposta</h2>
    {dadosErros.map((item) => (
      <li key={item.nome}>
        <span>
          <i style={{ backgroundColor: item.cor }} />
          {item.nome}
        </span>
        <strong>{item.valor}%</strong>
      </li>
    ))}
  </ul>
</article>

    </main>
  );
}