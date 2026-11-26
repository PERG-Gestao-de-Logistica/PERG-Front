"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import dynamic from "next/dynamic";
import type { OrigemMapa, RotaGerada } from "@/components/componentesEmpresa/mapaRoteirizacao/mapaRoteirizacao";
import CardParametros, {
  type VeiculoDisponivel,
} from "@/components/componentesEmpresa/cardParametros/cardParametros";
import CardRotasGeradas from "@/components/componentesEmpresa/cardRotasGeradas/cardRotasGeradas";
import { obterCorRota } from "@/constants/coresRotas";
import { entregadoresService } from "@/services/entregadoresService";
import { origensService } from "@/services/origensService";
import { pedidosService } from "@/services/pedidosService";
import { rotasService } from "@/services/rotasService";
import { roteirizacoesService } from "@/services/roteirizacoesService";
import type { TipoVeiculo } from "@/@types/painel";
import type { ObjetivoRoteirizacao, Rota } from "@/@types/rota";
import type { Origem } from "@/@types/origem";
import { hojeIso, paraRotaGerada } from "@/utils/rota";
import styles from "./roteirizacao.module.css";

const MapaRoteirizacao = dynamic(
  () =>
    import("@/components/componentesEmpresa/mapaRoteirizacao/mapaRoteirizacao"),
  {
    ssr: false,
    loading: () => <p className={styles.carregandoMapa}>Carregando mapa...</p>,
  }
);

// Botões da tela -> objetivo da API
const OBJETIVOS: Record<string, ObjetivoRoteirizacao> = {
  Custo: "Custo",
  Tempo: "Tempo",
  Km: "Km",
  Veículos: "Veiculos",
};

// Tipo da API -> como aparece no card de parâmetros
const VEICULOS: { api: TipoVeiculo; tela: VeiculoDisponivel["tipo"]; um: string; varios: string }[] = [
  { api: "Moto", tela: "moto", um: "moto", varios: "motos" },
  { api: "Carro", tela: "carro", um: "carro", varios: "carros" },
  { api: "Van", tela: "van", um: "van", varios: "vans" },
  { api: "Caminhao", tela: "caminhao", um: "caminhão", varios: "caminhões" },
  { api: "Bike", tela: "bicicleta", um: "bike", varios: "bikes" },
];

// Rotas que ainda estão sendo planejadas (as aceitas e em andamento ficam no monitoramento)
const EM_PLANEJAMENTO = ["Proposta", "Ofertada"];

export default function Roteirizacao() {
  const [prioridade, setPrioridade] = useState<string>("Custo");
  const [rotaSelecionadaId, setRotaSelecionadaId] = useState<string | null>(null);

  const [origem, setOrigem] = useState<Origem | null>(null);
  const [totalPedidos, setTotalPedidos] = useState(0);
  const [frota, setFrota] = useState<Record<string, number>>({});
  const [rotas, setRotas] = useState<Rota[] | null>(null);
  const [otimizando, setOtimizando] = useState(false);
  const [ofertando, setOfertando] = useState(false);
  const [mensagem, setMensagem] = useState<{ texto: string; erro?: boolean } | null>(null);

  const carregarRotas = useCallback(
    () =>
      rotasService
        .listarDoDia(hojeIso())
        .then((lista) => setRotas(lista.filter((r) => EM_PLANEJAMENTO.includes(r.status))))
        .catch((e) => {
          setRotas([]);
          setMensagem({ texto: (e as Error).message, erro: true });
        }),
    []
  );

  const carregarPedidos = useCallback(
    () => pedidosService.contar("Novo").then(setTotalPedidos).catch(() => setTotalPedidos(0)),
    []
  );

  useEffect(() => {
    origensService
      .listar()
      .then((lista) => setOrigem(lista.find((o) => o.padrao) ?? lista[0] ?? null))
      .catch(() => setOrigem(null));

    // Veículos disponíveis = entregadores da rede, agrupados pelo tipo do veículo
    entregadoresService
      .listarRede()
      .then((rede) => {
        const contagem: Record<string, number> = {};
        rede.forEach((e) => {
          if (e.veiculoTipo) contagem[e.veiculoTipo] = (contagem[e.veiculoTipo] ?? 0) + 1;
        });
        setFrota(contagem);
      })
      .catch(() => setFrota({}));

    carregarPedidos();
    carregarRotas();
  }, [carregarPedidos, carregarRotas]);

  // Sempre mostra moto, carro, van e caminhão (mesmo com 0, como no layout); bike só se tiver
  const veiculosDisponiveis: VeiculoDisponivel[] = VEICULOS.filter((v) => v.api !== "Bike" || (frota[v.api] ?? 0) > 0).map((v) => {
    const quantidade = frota[v.api] ?? 0;
    return { tipo: v.tela, quantidade, label: quantidade === 1 ? v.um : v.varios };
  });

  const pontoOrigem: [number, number] | null =
    origem?.latitude != null && origem.longitude != null ? [origem.latitude, origem.longitude] : null;

  const origemMapa: OrigemMapa | null = pontoOrigem && origem
    ? { nome: origem.nome, latitude: pontoOrigem[0], longitude: pontoOrigem[1] }
    : null;

  // Cores fixas por posição para a lista e o mapa baterem
  const rotasNaTela: RotaGerada[] = useMemo(
    () => (rotas ?? []).map((rota, index) => paraRotaGerada(rota, rota.cor ?? obterCorRota(index), pontoOrigem)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [rotas, pontoOrigem?.[0], pontoOrigem?.[1]]
  );

  const naoOfertadas = (rotas ?? []).filter((r) => r.status === "Proposta");

  function handleSelecionarRota(id: string) {
    setRotaSelecionadaId((prev) => (prev === id ? null : id));
  }

  async function handleOtimizar() {
    if (totalPedidos === 0) {
      setMensagem({ texto: "Não há pedidos novos para roteirizar.", erro: true });
      return;
    }
    // A API aceita até 50 veículos por roteirização
    let restante = 50;
    const frotaEnvio = VEICULOS.map((v) => {
      const quantidade = Math.min(frota[v.api] ?? 0, restante);
      restante -= quantidade;
      return { tipo: v.api, quantidade };
    }).filter((f) => f.quantidade > 0);
    if (frotaEnvio.length === 0) {
      setMensagem({ texto: "Nenhum entregador com veículo na rede para montar as rotas.", erro: true });
      return;
    }

    setRotaSelecionadaId(null);
    setMensagem(null);
    setOtimizando(true);
    try {
      const { roteirizacao } = await roteirizacoesService.criar({
        origemId: origem?.id,
        dataOperacao: hojeIso(),
        frota: frotaEnvio,
        objetivo: OBJETIVOS[prioridade] ?? "Custo",
      });
      if (roteirizacao.status === "Falhou") {
        setMensagem({ texto: roteirizacao.erro ?? "Não foi possível gerar as rotas.", erro: true });
      } else {
        const fora = roteirizacao.resultado?.pedidosForaDaRota.length ?? 0;
        setMensagem({
          texto:
            `${roteirizacao.rotas.length} rota(s) gerada(s) com ${roteirizacao.resultado?.pedidosRoteirizados ?? 0} pedido(s).` +
            (fora > 0 ? ` ${fora} pedido(s) ficaram de fora.` : ""),
        });
      }
      await Promise.all([carregarRotas(), carregarPedidos()]);
    } catch (e) {
      setMensagem({ texto: (e as Error).message, erro: true });
    } finally {
      setOtimizando(false);
    }
  }

  // Só rota ainda não ofertada pode ser cancelada; os pedidos dela voltam para Novo
  async function handleCancelar(id: string) {
    setMensagem(null);
    try {
      const { rota } = await rotasService.cancelar(id);
      setRotaSelecionadaId(null);
      setMensagem({ texto: `Rota ${rota.codigo} cancelada. Os pedidos voltaram para Novo.` });
      await Promise.all([carregarRotas(), carregarPedidos()]);
    } catch (e) {
      setMensagem({ texto: (e as Error).message, erro: true });
    }
  }

  async function handleOfertar() {
    setOfertando(true);
    setMensagem(null);
    let erros = 0;
    for (const rota of naoOfertadas) {
      try {
        await rotasService.ofertar(rota.id);
      } catch {
        erros++;
      }
    }
    setMensagem(
      erros > 0
        ? { texto: `${naoOfertadas.length - erros} rota(s) ofertada(s); ${erros} não puderam ser ofertadas.`, erro: true }
        : { texto: "Rotas ofertadas aos entregadores. Acompanhe o aceite no monitoramento." }
    );
    await carregarRotas();
    setOfertando(false);
  }

  return (
    <main className={styles.conteudo}>
      <section className={styles.parametrosRotas}>
        <CardParametros
          totalPedidos={totalPedidos}
          centroDistribuicao={origem?.nome ?? "Sem origem cadastrada"}
          prioridade={prioridade}
          onChangePrioridade={setPrioridade}
          veiculosDisponiveis={veiculosDisponiveis}
          onOtimizar={handleOtimizar}
          otimizando={otimizando}
        />

        <CardRotasGeradas
          rotas={rotasNaTela}
          rotaSelecionadaId={rotaSelecionadaId}
          onSelecionarRota={handleSelecionarRota}
          carregando={rotas === null}
          idsCancelaveis={naoOfertadas.map((r) => r.id)}
          onCancelarRota={handleCancelar}
          mensagem={mensagem}
          acao={
            naoOfertadas.length > 0 && (
              <button type="button" className={styles.botaoOfertar} onClick={handleOfertar} disabled={ofertando}>
                {ofertando ? "Ofertando..." : `Ofertar ${naoOfertadas.length === 1 ? "rota" : "rotas"}`}
              </button>
            )
          }
        />
      </section>

      <section className={styles.mapa} aria-label="Mapa de rotas geradas">
        <MapaRoteirizacao rotas={rotasNaTela} rotaSelecionadaId={rotaSelecionadaId} origem={origemMapa} />
      </section>
    </main>
  );
}
