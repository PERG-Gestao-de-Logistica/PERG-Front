"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import type { RotaGerada } from "@/components/componentesEmpresa/mapaRoteirizacao/mapaRoteirizacao";
import CardParametros, {
  type VeiculoDisponivel,
} from "@/components/componentesEmpresa/cardParametros/cardParametros";
import CardRotasGeradas from "@/components/componentesEmpresa/cardRotasGeradas/cardRotasGeradas";
import { obterCorRota } from "@/constants/coresRotas";
import styles from "./roteirizacao.module.css";

const MapaRoteirizacao = dynamic(
  () =>
    import("@/components/componentesEmpresa/mapaRoteirizacao/mapaRoteirizacao"),
  {
    ssr: false,
    loading: () => <p className={styles.carregandoMapa}>Carregando mapa...</p>,
  }
);

const VEICULOS_DISPONIVEIS: VeiculoDisponivel[] = [
  { tipo: "moto", quantidade: 8, label: "motos" },
  { tipo: "carro", quantidade: 4, label: "carros" },
  { tipo: "caminhao", quantidade: 6, label: "caminhões" },
];

const ROTAS_BASE: Omit<RotaGerada, "cor">[] = [
  {
    id: "1",
    codigo: "R01",
    motorista: "João Mendes",
    regiao: "Zona Oeste",
    paradas: 21,
    distancia: "28 km",
    tempo: "2h20",
    veiculo: "moto",
    coordenadas: [
      [-23.5614, -46.6559],
      [-23.568, -46.665],
      [-23.575, -46.678],
      [-23.582, -46.685],
    ],
  },
  {
    id: "2",
    codigo: "R02",
    motorista: "Bianca Alves",
    regiao: "Zona Norte",
    paradas: 18,
    distancia: "24 km",
    tempo: "2h05",
    veiculo: "moto",
    coordenadas: [
      [-23.5614, -46.6559],
      [-23.552, -46.651],
      [-23.541, -46.644],
      [-23.532, -46.638],
    ],
  },
  {
    id: "3",
    codigo: "R03",
    motorista: "Carlos Souza",
    regiao: "Pinheiros",
    paradas: 30,
    distancia: "41 km",
    tempo: "3h40",
    veiculo: "carro",
    coordenadas: [
      [-23.5614, -46.6559],
      [-23.564, -46.672],
      [-23.567, -46.689],
      [-23.561, -46.698],
    ],
  },
  {
    id: "4",
    codigo: "R04",
    motorista: "Rafael Lima",
    regiao: "Vila Mariana",
    paradas: 34,
    distancia: "52 km",
    tempo: "4h15",
    veiculo: "bicicleta",
    coordenadas: [
      [-23.5614, -46.6559],
      [-23.572, -46.648],
      [-23.585, -46.639],
      [-23.594, -46.632],
    ],

  },
  {
    id: "5",
    codigo: "R05",
    motorista: "Mariana Costa",
    regiao: "Zona Leste",
    paradas: 26,
    distancia: "35 km",
    tempo: "3h10",
    veiculo: "caminhao",
    coordenadas: [
      [-23.5614, -46.6559],
      [-23.5585, -46.6422],
      [-23.5542, -46.6315],
      [-23.5498, -46.6188],
      [-23.5455, -46.6052],
    ],
  },
    {
    id: "6",
    codigo: "R06",
    motorista: "Mariana Costa",
    regiao: "Zona Leste",
    paradas: 26,
    distancia: "35 km",
    tempo: "3h10",
    veiculo: "caminhao",
    coordenadas: [
      [-23.5614, -46.6559],
      [-23.5585, -46.6422],
      [-23.5542, -46.6315],
      [-23.5498, -46.6188],
      [-23.5455, -46.6052],
    ],
  }
];

export default function Roteirizacao() {
  const [prioridade, setPrioridade] = useState<string>("Custo");
  const [rotaSelecionadaId, setRotaSelecionadaId] = useState<string | null>(
    null
  );

  // Atribui automaticamente as cores da constante para sincronizar lista e mapa
  const rotasComCores: RotaGerada[] = useMemo(
    () =>
      ROTAS_BASE.map((rota, index) => ({
        ...rota,
        cor: obterCorRota(index),
      })),
    []
  );

  function handleSelecionarRota(id: string) {
    setRotaSelecionadaId((prev) => (prev === id ? null : id));
  }

  function handleOtimizar() {
    setRotaSelecionadaId(null);
  }

  return (
    <main className={styles.conteudo}>
      <section className={styles.parametrosRotas}>
        <CardParametros
          totalPedidos={124}
          centroDistribuicao="CD Aurora"
          prioridade={prioridade}
          onChangePrioridade={setPrioridade}
          veiculosDisponiveis={VEICULOS_DISPONIVEIS}
          onOtimizar={handleOtimizar}
        />

        <CardRotasGeradas
          rotas={rotasComCores}
          rotaSelecionadaId={rotaSelecionadaId}
          onSelecionarRota={handleSelecionarRota}
        />
      </section>

      <section className={styles.mapa} aria-label="Mapa de rotas geradas">
        <MapaRoteirizacao
          rotas={rotasComCores}
          rotaSelecionadaId={rotaSelecionadaId}
        />
      </section>
    </main>
  );
}