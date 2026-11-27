"use client";

import { useState, useMemo } from "react";
import { FiFilePlus } from "react-icons/fi";
import { TbRoute } from "react-icons/tb";
import type { Pedido } from "@/components/componentesEmpresa/itemPedido/itemPedido";
import CardPedidos from "@/components/componentesEmpresa/cardPedidos/cardPedidos";
import styles from "./pedidos.module.css";

type FiltroPedido =
  | "todos"
  | "novo"
  | "emRota"
  | "entregue"
  | "ocorrencia";

const PEDIDOS_INICIAIS: Pedido[] = [
  {
    id: "1",
    codigo: "#48213",
    cliente: "Ana Ribeiro",
    endereco: "R. Tuiuti, 1880",
    bairro: "Tatuapé",
    peso: "1.2 kg",
    status: "novo",
    historico: [
      {
        id: "h1",
        tipo: "criado",
        titulo: "Pedido criado",
        descricao: "Via Shopify #1047",
        horario: "09:14",
      },
    ],
  },
  {
    id: "2",
    codigo: "#48212",
    cliente: "Pedro Almeida",
    endereco: "R. Augusta, 2203",
    bairro: "Jardins",
    peso: "0.8 kg",
    status: "novo",
    historico: [
      {
        id: "h2",
        tipo: "criado",
        titulo: "Pedido criado",
        descricao: "Via Shopify #1046",
        horario: "09:05",
      },
    ],
  },
  {
    id: "3",
    codigo: "#48211",
    cliente: "Farmácia Lapa",
    endereco: "R. Doze de Outubro, 210",
    bairro: "Lapa",
    peso: "14 kg",
    status: "novo",
    historico: [
      {
        id: "h3",
        tipo: "criado",
        titulo: "Pedido criado",
        descricao: "Via ERP #309",
        horario: "08:52",
      },
    ],
  },
  {
    id: "4",
    codigo: "#48210",
    cliente: "Juliana Reis",
    endereco: "R. Vergueiro, 3185",
    bairro: "Vila Mariana",
    peso: "2.4 kg",
    status: "roteirizado",
    historico: [
      {
        id: "h4-1",
        tipo: "criado",
        titulo: "Pedido criado",
        descricao: "Via Shopify #1045",
        horario: "08:10",
      },
      {
        id: "h4-2",
        tipo: "roteirizado",
        titulo: "Roteirizado",
        descricao: "Rota R02 · parada 4 de 10",
        horario: "08:30",
      },
    ],
    entrega: {
      entregadorNome: "Carlos Souza",
      entregadorIniciais: "CS",
      veiculo: "Carro",
      placa: "GWE-4R55",
      codigoRota: "Rota R02",
      janela: "10–12h",
      horarioEntrega: "Previsto 10:45",
      distancia: "8,2 km",
      frete: "R$ 12,50",
    },
  },
  {
    id: "5",
    codigo: "#48209",
    cliente: "Marcos Oliveira",
    endereco: "R. Girassol, 85",
    bairro: "Vila Madalena",
    peso: "0.5 kg",
    status: "emRota",
    historico: [
      {
        id: "h5-1",
        tipo: "criado",
        titulo: "Pedido criado",
        descricao: "Via Shopify #1044",
        horario: "07:35",
      },
      {
        id: "h5-2",
        tipo: "roteirizado",
        titulo: "Roteirizado",
        descricao: "Rota R01 · parada 6 de 8",
        horario: "07:50",
      },
      {
        id: "h5-3",
        tipo: "saiuEntrega",
        titulo: "Saiu para entrega",
        descricao: "Previsão 09:40",
        horario: "08:25",
      },
    ],
    entrega: {
      entregadorNome: "João Mendes",
      entregadorIniciais: "JM",
      veiculo: "Moto",
      placa: "FJK-2A19",
      codigoRota: "Rota R01",
      janela: "09–11h",
      horarioEntrega: "Em trânsito",
      distancia: "5,1 km",
      frete: "R$ 8,90",
    },
  },
  {
    id: "6",
    codigo: "#48208",
    cliente: "Marina Costa",
    endereco: "R. Harmonia, 412",
    bairro: "Lapa",
    peso: "3.1 kg",
    status: "entregue",
    historico: [
      {
        id: "h6-1",
        tipo: "criado",
        titulo: "Pedido criado",
        descricao: "Via Shopify #1042",
        horario: "07:12",
      },
      {
        id: "h6-2",
        tipo: "roteirizado",
        titulo: "Roteirizado",
        descricao: "Rota R01 · parada 3 de 14",
        horario: "07:40",
      },
      {
        id: "h6-3",
        tipo: "coletado",
        titulo: "Coletado no CD",
        descricao: "João Mendes retirou 1 volume",
        horario: "08:05",
      },
      {
        id: "h6-4",
        tipo: "avisado",
        titulo: "Cliente avisado",
        descricao: "SMS com link de rastreio",
        horario: "08:06",
      },
      {
        id: "h6-5",
        tipo: "saiuEntrega",
        titulo: "Saiu para entrega",
        descricao: "Previsão 08:50",
        horario: "08:22",
      },
      {
        id: "h6-6",
        tipo: "entregue",
        titulo: "Entregue",
        descricao: "Foto + código de entrega",
        horario: "08:47",
      },
    ],
    entrega: {
      entregadorNome: "João Mendes",
      entregadorIniciais: "JM",
      veiculo: "Moto",
      placa: "FJK-2A19",
      codigoRota: "Rota R01",
      janela: "08–10h",
      horarioEntrega: "08:47 · no prazo",
      distancia: "6,4 km",
      frete: "R$ 9,80",
      observacao: "Entregar na portaria se o cliente não estiver.",
    },
    comprovante: {
      recebidoPor: "Marina Costa",
      codigoValidado: true,
    },
  },
  {
    id: "7",
    codigo: "#48207",
    cliente: "Lucas Ferreira",
    endereco: "Av. Paulista, 900",
    bairro: "Bela Vista",
    peso: "1.9 kg",
    status: "entregue",
    historico: [
      {
        id: "h7-1",
        tipo: "criado",
        titulo: "Pedido criado",
        descricao: "Via Shopify #1040",
        horario: "06:55",
      },
      {
        id: "h7-2",
        tipo: "entregue",
        titulo: "Entregue",
        descricao: "Foto + código de entrega",
        horario: "08:15",
      },
    ],
    entrega: {
      entregadorNome: "Bianca Alves",
      entregadorIniciais: "BA",
      veiculo: "Moto",
      placa: "GHT-8A12",
      codigoRota: "Rota R05",
      janela: "08–10h",
      horarioEntrega: "08:15 · no prazo",
      distancia: "4,3 km",
      frete: "R$ 8,40",
    },
    comprovante: {
      recebidoPor: "Lucas Ferreira",
      codigoValidado: true,
    },
  },
  {
    id: "8",
    codigo: "#48206",
    cliente: "Camila Nogueira",
    endereco: "R. Augusta, 1510",
    bairro: "Consolação",
    peso: "2.0 kg",
    status: "ocorrencia",
    historico: [
      {
        id: "h8-1",
        tipo: "criado",
        titulo: "Pedido criado",
        descricao: "Via Shopify #1039",
        horario: "06:40",
      },
      {
        id: "h8-2",
        tipo: "saiuEntrega",
        titulo: "Saiu para entrega",
        descricao: "Tentativa de entrega às 08:12",
        horario: "07:50",
      },
    ],
    entrega: {
      entregadorNome: "Rafael Lima",
      entregadorIniciais: "RL",
      veiculo: "Caminhão",
      placa: "LKJ-9H07",
      codigoRota: "Rota R03",
      janela: "08–10h",
      horarioEntrega: "Destinatário ausente",
      distancia: "7,8 km",
      frete: "R$ 14,20",
      observacao: "Tentativa 1 falhou — aguardando reagendamento.",
    },
  },
];

export default function Pedidos() {
  const [pedidos, setPedidos] = useState<Pedido[]>(PEDIDOS_INICIAIS);
  const [filtroAtivo, setFiltroAtivo] = useState<FiltroPedido>("todos");
  const [selecionadosIds, setSelecionadosIds] = useState<string[]>([
    "1",
    "2",
    "3",
  ]);

  const contadores = useMemo(() => {
    return {
      todos: pedidos.length,
      novo: pedidos.filter((p) => p.status === "novo").length,
      emRota: pedidos.filter(
        (p) => p.status === "emRota" || p.status === "roteirizado"
      ).length,
      entregue: pedidos.filter((p) => p.status === "entregue").length,
      ocorrencia: pedidos.filter((p) => p.status === "ocorrencia").length,
    };
  }, [pedidos]);

  const pedidosFiltrados = useMemo(() => {
    return pedidos.filter((pedido) => {
      if (filtroAtivo === "todos") return true;
      if (filtroAtivo === "emRota") {
        return pedido.status === "emRota" || pedido.status === "roteirizado";
      }
      return pedido.status === filtroAtivo;
    });
  }, [pedidos, filtroAtivo]);

  function handleAlternarSelecao(id: string) {
    setSelecionadosIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  }

  function handleAlternarSelecaoTodos() {
    const idsVisiveis = pedidosFiltrados.map((p) => p.id);
    const todosVisiveisSelecionados =
      idsVisiveis.length > 0 &&
      idsVisiveis.every((id) => selecionadosIds.includes(id));

    if (todosVisiveisSelecionados) {
      setSelecionadosIds((prev) =>
        prev.filter((id) => !idsVisiveis.includes(id))
      );
    } else {
      setSelecionadosIds((prev) =>
        Array.from(new Set([...prev, ...idsVisiveis]))
      );
    }
  }

  function handleRoteirizarSelecionados() {
    if (selecionadosIds.length === 0) return;

    setPedidos((prev) =>
      prev.map((pedido) =>
        selecionadosIds.includes(pedido.id) && pedido.status === "novo"
          ? {
              ...pedido,
              status: "roteirizado",
              historico: [
                ...pedido.historico,
                {
                  id: `${pedido.id}-rot-${Date.now()}`,
                  tipo: "roteirizado",
                  titulo: "Roteirizado",
                  descricao: "Enviado para roteirização",
                  horario: new Date().toLocaleTimeString("pt-BR", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                },
              ],
            }
          : pedido
      )
    );
    setSelecionadosIds([]);
  }

  const abasFiltro: { id: FiltroPedido; label: string; total: number }[] = [
    { id: "todos", label: "Todos", total: contadores.todos },
    { id: "novo", label: "Novos", total: contadores.novo },
    { id: "emRota", label: "Em Rota", total: contadores.emRota },
    { id: "entregue", label: "Entregues", total: contadores.entregue },
    { id: "ocorrencia", label: "Ocorrências", total: contadores.ocorrencia },
  ];

  return (
    <main className={styles.conteudo}>
      <section className={styles.botoesFiltro} aria-label="Filtros e ações de pedidos">
        <div className={styles.filtro} role="group" aria-label="Filtrar pedidos por status">
          {abasFiltro.map((aba) => (
            <button
              key={aba.id}
              type="button"
              onClick={() => setFiltroAtivo(aba.id)}
              className={`${styles.botaoFiltro} ${
                filtroAtivo === aba.id ? styles.botaoFiltroAtivo : ""
              }`}
              aria-pressed={filtroAtivo === aba.id}
            >
              <p>{aba.label}</p>
              <p className={styles.contadorFiltro}>{aba.total}</p>
            </button>
          ))}
        </div>

        <div className={styles.acoesTopo}>
          <button
            type="button"
            className={styles.botaoImportar}
            onClick={() => {}}
          >
            <FiFilePlus aria-hidden="true" className={styles.icone} />
            <p>Importar planilha</p>
          </button>

          <button
            type="button"
            className={styles.botaoRoteirizar}
            disabled={selecionadosIds.length === 0}
            onClick={handleRoteirizarSelecionados}
          >
            <TbRoute aria-hidden="true" className={styles.icone} />
            <p>
              {selecionadosIds.length > 0
                ? `Roteirizar ${selecionadosIds.length} selecionado${
                    selecionadosIds.length > 1 ? "s" : ""
                  }`
                : "Roteirizar selecionados"}
            </p>
          </button>
        </div>
      </section>

      <section className={styles.secaoLista}>
        <CardPedidos
          pedidos={pedidosFiltrados}
          pedidosSelecionadosIds={selecionadosIds}
          pedidoExpandidoInicialId="6"
          onAlternarSelecao={handleAlternarSelecao}
          onAlternarSelecaoTodos={handleAlternarSelecaoTodos}
        />
      </section>
    </main>
  );
}