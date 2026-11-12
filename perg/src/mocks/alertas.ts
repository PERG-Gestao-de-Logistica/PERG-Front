import type { Alerta, Incidentes, Detalhes } from "@/types/alerta";

export const alertasExemplo: Alerta[] = [
  {
    id: "1",
    severidade: "Crítico",
    titulo: "Latência acima do limite",
    origem: "API / Buscar",
    horario: "19:45",
    status: "Investigando",
  },

    {
    id: "2",
    severidade: "Alto",
    titulo: "Backlog na fila de roteirização",
    origem: "Fila",
    horario: "18:45",
    status: "Mitigando",
  },

    {
    id: "3",
    severidade: "Médio",
    titulo: "Conexões de banco no limite",
    origem: "Banco de dados",
    horario: "17:45",
    status: "Aberto",
  },
    {
    id: "4",
    severidade: "Baixo",
    titulo: "Latência p95 acima de 600 ms",
    origem: "Notificações",
    horario: "12:45",
    status: "Aberto",
  },
    {
    id: "5",
    severidade: "Alto",
    titulo: "Latência p95 acima de 600 ms",
    origem: "Integrações",
    horario: "19:45",
    status: "Aberto",
  },
];

export const incidentesExemplos: Incidentes[] = [
     {
    id: "1",
    severidade_incidentes: "Abertos",
    numero_casos: "5"
  },

    {
    id: "2",
    severidade_incidentes: "Criticos",
    numero_casos: "1"
  },

    {
    id: "1",
    severidade_incidentes: "Altos",
    numero_casos: "2"
  },

    {
    id: "1",
    severidade_incidentes: "Médios",
    numero_casos: "7"
  },

    {
    id: "1",
    severidade_incidentes: "Baixos",
    numero_casos: "3"
  },
]

export const alertasDetalhes: Detalhes[] = [
{
  id: "1",
  severidade: "CRÍTICO",
  Descricao: "A fila de roteirização apresenta acúmulo de pedidos devido à lentidão no processamento, impactando o tempo de distribuição das entregas.",

  horario1: "14:30",
  acontecimento1: "Alerta de backlog disparado",

  horario2: "14:35",
  acontecimento2: "Limite de pedidos pendentes ultrapassado",

  horario3: "14:42",
  acontecimento3: "Equipe de infraestrutura notificada",

  horario4: "14:50",
  acontecimento4: "Investigação técnica iniciada",
},
{
  id: "2",
  severidade: "Alto",
  Descricao: "Falha na comunicação com os entregadores impede a atualização de status das entregas, comprometendo o acompanhamento dos pedidos em andamento.",

  horario1: "13:10",
  acontecimento1: "Falha de comunicação identificada",

  horario2: "13:18",
  acontecimento2: "Aumento de entregadores sem conexão",

  horario3: "13:25",
  acontecimento3: "Equipe de suporte acionada",

  horario4: "13:40",
  acontecimento4: "Processo de reconexão iniciado",
},
{
  id: "3",
  severidade: "Médio",
  Descricao: "O tempo de coleta dos pedidos está acima do esperado devido à concentração de solicitações em determinados pontos de distribuição.",

  horario1: "12:00",
  acontecimento1: "Atraso na coleta identificado",

  horario2: "12:12",
  acontecimento2: "Tempo médio de coleta ultrapassou o limite",

  horario3: "12:25",
  acontecimento3: "Unidades de distribuição notificadas",

  horario4: "12:35",
  acontecimento4: "Redistribuição de pedidos iniciada",
},
{
  id: "4",
  severidade: "CRÍTICO",
  Descricao: "O serviço de rastreamento apresenta indisponibilidade, impedindo a visualização da localização dos entregadores e o acompanhamento em tempo real das entregas.",

  horario1: "11:15",
  acontecimento1: "Indisponibilidade do rastreamento detectada",

  horario2: "11:22",
  acontecimento2: "Falha nas consultas de localização confirmada",

  horario3: "11:30",
  acontecimento3: "Equipe de desenvolvimento acionada",

  horario4: "11:45",
  acontecimento4: "Análise dos serviços de rastreamento iniciada",
},
{
  id: "5",
  severidade: "Baixo",
  Descricao: "O armazenamento do sistema está próximo da capacidade máxima, podendo comprometer o desempenho e a disponibilidade dos serviços caso o consumo continue aumentando.",

  horario1: "10:00",
  acontecimento1: "Alerta de armazenamento disparado",

  horario2: "10:15",
  acontecimento2: "Uso do armazenamento atingiu 85%",

  horario3: "10:30",
  acontecimento3: "Equipe responsável notificada",

  horario4: "10:45",
  acontecimento4: "Monitoramento da capacidade intensificado",
},
];