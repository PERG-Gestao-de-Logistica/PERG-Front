import { FaCar, FaMotorcycle, FaTruck, FaBicycle } from "react-icons/fa";
import { IoFlash } from "react-icons/io5";
import { TbSteeringWheel } from "react-icons/tb";
import styles from "./cardParametros.module.css";

const OPCOES_PRIORIDADE = ["Custo", "Tempo", "Km", "Veículos"] as const;

const VEICULO_ICONS = {
  moto: FaMotorcycle,
  carro: FaCar,
  van: FaTruck,
  bicicleta: FaBicycle,
  caminhao: FaTruck,
} as const;

export interface VeiculoDisponivel {
  tipo: keyof typeof VEICULO_ICONS;
  quantidade: number;
  label: string;
}

interface CardParametrosProps {
  totalPedidos: number;
  centroDistribuicao: string;
  prioridade: string;
  onChangePrioridade: (novaPrioridade: string) => void;
  veiculosDisponiveis: VeiculoDisponivel[];
  onOtimizar: () => void;
  // Enquanto a API calcula as rotas (pode levar alguns segundos)
  otimizando?: boolean;
}

export default function CardParametros({
  totalPedidos,
  centroDistribuicao,
  prioridade,
  onChangePrioridade,
  veiculosDisponiveis,
  onOtimizar,
  otimizando = false,
}: CardParametrosProps) {
  return (
    <article className={styles.parametros}>
      <header className={styles.cabecalhoCard}>
        <h3>Parâmetros</h3>
        <p>
          {totalPedidos} pedidos · {centroDistribuicao}
        </p>
      </header>

      <section className={styles.blocoParametro}>
        <h4 className={styles.subtitulo}>Priorizar</h4>
        <div
          className={styles.escolhaParametros}
          role="group"
          aria-label="Critério de priorização"
        >
          {OPCOES_PRIORIDADE.map((opcao) => (
            <button
              key={opcao}
              type="button"
              onClick={() => onChangePrioridade(opcao)}
              className={`${styles.indice} ${prioridade === opcao ? styles.indiceAtivo : ""
                }`}
              aria-pressed={prioridade === opcao}
            >
              {opcao}
            </button>
          ))}
        </div>
      </section>

      <section className={styles.blocoParametro}>
        <h4 className={styles.subtitulo}>Veículos disponíveis</h4>
        <ul className={styles.veiculosDisponiveis}>
          {veiculosDisponiveis.map((item) => {
            const IconeVeiculo = VEICULO_ICONS[item.tipo] ?? TbSteeringWheel;

            return (
              <li
                key={item.tipo}
                className={`${styles.indiceDisponivel} ${item.quantidade === 0 ? styles.indiceZerado : ""}`}
                aria-label={`${item.quantidade} ${item.label}`}
              >
                <IconeVeiculo className={styles.icone} aria-hidden="true" />
                <span className={styles.quantidadeVeiculo}>
                  {item.quantidade}
                </span>
                <span className={styles.labelVeiculo}>{item.label}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <button
        type="button"
        onClick={onOtimizar}
        className={styles.botaoOtimizarRotas}
        disabled={otimizando}
        aria-busy={otimizando}
      >
        <IoFlash className={`${styles.iconeBotao} ${otimizando ? styles.iconeGirando : ""}`} aria-hidden="true" />
        <span>{otimizando ? "Otimizando..." : "Otimizar Rotas"}</span>
      </button>
    </article>
  );
}