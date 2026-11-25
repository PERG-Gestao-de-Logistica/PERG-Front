import RotaItem from "../itemRotasHoje/itemRotasHoje";
import styles from "./cardRotasHoje.module.css";

// * * Teste do item rota e dinamismo dos ícones e status
const rotas = [
  {
    id: 1,
    codigo: "R01",
    motorista: "João Mendes",
    paradas: 6,
    regiao: "Zona Oeste",
    veiculo: "moto",
    status: "emRota",
    progresso: 65,
  },
  {
    id: 2,
    codigo: "R02",
    motorista: "Carlos Souza",
    paradas: 9,
    regiao: "Pinheiros",
    veiculo: "carro",
    status: "emRota",
    progresso: 46,
  },
  {
    id: 3,
    codigo: "R03",
    motorista: "Bianca Alves",
    paradas: 14,
    regiao: "Centro",
    veiculo: "van",
    status: "concluida",
    progresso: 100,
  },
  {
    id: 4,
    codigo: "R04",
    motorista: "Rafael Lima",
    paradas: 5,
    regiao: "Lapa",
    veiculo: "moto",
    status: "aguardando",
    progresso: 0,
  },
];

export default function CardRotasHoje() {
  return (
    <article className={styles.rotasHoje}>
      <header>
        <h2 className={styles.titulo}>Rotas Hoje</h2>
        <a className={styles.monitoramento} href="/painelEmpresa/monitoramento">
          Ver monitoramento
        </a>
      </header>
      <ul className={styles.lista}>
        {rotas.map((rota) => (
          <RotaItem key={rota.id} rota={rota} />
        ))}
      </ul>
    </article>
  );
}
