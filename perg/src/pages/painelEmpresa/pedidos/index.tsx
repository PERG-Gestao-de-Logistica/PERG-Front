import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { TbRoute, TbSearch } from "react-icons/tb";
import AbasPedidos from "@/components/componentesEmpresa/abasPedidos/abasPedidos";
import TabelaPedidos from "@/components/componentesEmpresa/tabelaPedidos/tabelaPedidos";
import ModalDetalhePedido from "@/components/componentesEmpresa/modalDetalhePedido/modalDetalhePedido";
import { entregadoresService } from "@/services/entregadoresService";
import { EVENTO_PEDIDO_CRIADO, pedidosService } from "@/services/pedidosService";
import { roteirizacoesService } from "@/services/roteirizacoesService";
import type { TipoVeiculo } from "@/@types/painel";
import type { ContagemPedidos, PedidoResumo, SituacaoPedido } from "@/@types/pedido";
import { hojeIso } from "@/utils/rota";
import styles from "./pedidos.module.css";

const TAMANHO_PAGINA = 20;

const VAZIO: Partial<Record<SituacaoPedido, string>> = {
  todos: "Nenhum pedido ainda. Use o botão Novo Pedido para cadastrar o primeiro.",
  novos: "Nenhum pedido novo.",
  prontos: "Nenhum pedido pronto para roteirizar agora.",
  problemas: "Nenhum pedido com problema.",
  emRota: "Nenhum pedido em rota.",
  entregues: "Nenhum pedido entregue.",
  ocorrencias: "Nenhuma ocorrência.",
  cancelados: "Nenhum pedido cancelado.",
};

export default function Pedidos() {
  const router = useRouter();
  const [aba, setAba] = useState<SituacaoPedido>("todos");
  const [busca, setBusca] = useState("");
  const [buscaAplicada, setBuscaAplicada] = useState("");
  const [pedidos, setPedidos] = useState<PedidoResumo[] | null>(null);
  const [total, setTotal] = useState(0);
  const [pagina, setPagina] = useState(1);
  const [carregandoPagina, setCarregandoPagina] = useState(false);
  const [contagem, setContagem] = useState<ContagemPedidos | null>(null);
  const [selecionados, setSelecionados] = useState<Set<string>>(new Set());
  const [abertoId, setAbertoId] = useState<string | null>(null);
  const [roteirizando, setRoteirizando] = useState(false);
  const [selecionandoTodos, setSelecionandoTodos] = useState(false);
  const [mensagem, setMensagem] = useState<{ texto: string; erro?: boolean } | null>(null);

  // Busca a página atual da aba/busca (troca de aba ou busca volta para a página 1)
  const carregar = useCallback(() => {
    setCarregandoPagina(true);
    pedidosService
      .listar(aba, buscaAplicada, pagina, TAMANHO_PAGINA)
      .then((r) => {
        // Se a página ficou vazia (ex.: pedidos roteirizados), volta uma
        if (r.itens.length === 0 && pagina > 1) {
          setPagina(pagina - 1);
          return;
        }
        setPedidos(r.itens);
        setTotal(r.total);
      })
      .catch((e) => {
        setPedidos([]);
        setMensagem({ texto: (e as Error).message, erro: true });
      })
      .finally(() => setCarregandoPagina(false));
    pedidosService.contagem().then(setContagem).catch(() => {});
  }, [aba, buscaAplicada, pagina]);

  useEffect(carregar, [carregar]);

  // Pedido criado pelo modal do cabeçalho: atualiza a lista
  useEffect(() => {
    window.addEventListener(EVENTO_PEDIDO_CRIADO, carregar);
    return () => window.removeEventListener(EVENTO_PEDIDO_CRIADO, carregar);
  }, [carregar]);

  // Link de outras telas (ex.: card de ocorrências): /painelEmpresa/pedidos?numero=32 busca e abre o pedido
  useEffect(() => {
    const numero = router.query.numero;
    if (typeof numero !== "string" || !numero) return;
    setBusca(numero);
    setBuscaAplicada(numero);
    pedidosService
      .listar("todos", numero, 1, 5)
      .then((r) => {
        const achado = r.itens.find((p) => String(p.numeroPedido) === numero);
        if (achado) setAbertoId(achado.id);
      })
      .catch(() => {});
  }, [router.query.numero]);

  // Busca enquanto digita, com uma pequena espera
  useEffect(() => {
    const espera = setTimeout(() => {
      setBuscaAplicada(busca);
      setPagina(1);
    }, 400);
    return () => clearTimeout(espera);
  }, [busca]);

  function mudarAba(nova: SituacaoPedido) {
    // A seleção continua ao trocar de aba ou de página (vai somando)
    setAba(nova);
    setPedidos(null);
    setPagina(1);
    setMensagem(null);
  }

  function alternar(pedido: PedidoResumo) {
    setSelecionados((atual) => {
      const novo = new Set(atual);
      if (novo.has(pedido.id)) novo.delete(pedido.id);
      else novo.add(pedido.id);
      return novo;
    });
  }

  // Caixa do cabeçalho: marca/desmarca os prontos desta página, sem mexer nos das outras páginas
  function alternarTodos() {
    const prontos = (pedidos ?? []).filter((p) => p.pronto);
    const todosMarcados = prontos.every((p) => selecionados.has(p.id));
    setSelecionados((atual) => {
      const novo = new Set(atual);
      prontos.forEach((p) => (todosMarcados ? novo.delete(p.id) : novo.add(p.id)));
      return novo;
    });
  }

  // Busca os ids de todos os prontos (de 100 em 100) e junta na seleção
  async function selecionarTodosProntos() {
    setSelecionandoTodos(true);
    try {
      const ids: string[] = [];
      let paginaBusca = 1;
      let totalProntos = 0;
      do {
        const r = await pedidosService.listar("prontos", "", paginaBusca, 100);
        r.itens.forEach((p) => ids.push(p.id));
        totalProntos = r.total;
        paginaBusca++;
      } while (ids.length < totalProntos && paginaBusca <= 20);
      setSelecionados((atual) => new Set([...atual, ...ids]));
    } catch (e) {
      setMensagem({ texto: (e as Error).message, erro: true });
    } finally {
      setSelecionandoTodos(false);
    }
  }

  // Roteiriza só os selecionados, com a frota da rede e a prioridade Custo; depois abre a roteirização
  async function roteirizarSelecionados() {
    setRoteirizando(true);
    setMensagem(null);
    try {
      const rede = await entregadoresService.listarRede();
      const contagemFrota: Partial<Record<TipoVeiculo, number>> = {};
      rede.forEach((e) => {
        if (e.veiculoTipo) contagemFrota[e.veiculoTipo] = (contagemFrota[e.veiculoTipo] ?? 0) + 1;
      });
      let restante = 50;
      const frota = (Object.entries(contagemFrota) as [TipoVeiculo, number][])
        .map(([tipo, quantidade]) => {
          const usar = Math.min(quantidade, restante);
          restante -= usar;
          return { tipo, quantidade: usar };
        })
        .filter((f) => f.quantidade > 0);
      if (frota.length === 0) {
        setMensagem({ texto: "Nenhum entregador com veículo na rede para montar as rotas.", erro: true });
        return;
      }

      const { roteirizacao } = await roteirizacoesService.criar({
        dataOperacao: hojeIso(),
        frota,
        objetivo: "Custo",
        pedidoIds: Array.from(selecionados),
      });
      if (roteirizacao.status === "Falhou") {
        setMensagem({ texto: roteirizacao.erro ?? "Não foi possível gerar as rotas.", erro: true });
        return;
      }
      router.push("/painelEmpresa/roteirizacao");
    } catch (e) {
      setMensagem({ texto: (e as Error).message, erro: true });
    } finally {
      setRoteirizando(false);
    }
  }

  return (
    <main className={styles.conteudo}>
      <section className={styles.barra}>
        <AbasPedidos ativa={aba} contagem={contagem} onMudar={mudarAba} />

        <div className={styles.acoes}>
          <label className={styles.busca}>
            <TbSearch aria-hidden="true" />
            <input
              type="search"
              placeholder="Número ou cliente"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              aria-label="Buscar pedido por número ou cliente"
            />
          </label>
          <button
            type="button"
            className={styles.botaoRoteirizar}
            onClick={roteirizarSelecionados}
            disabled={selecionados.size === 0 || roteirizando}
            title={selecionados.size === 0 ? "Marque pedidos prontos para roteirizar" : undefined}
          >
            <TbRoute aria-hidden="true" />
            {roteirizando
              ? "Roteirizando..."
              : selecionados.size > 0
                ? `Roteirizar ${selecionados.size} ${selecionados.size === 1 ? "selecionado" : "selecionados"}`
                : "Roteirizar selecionados"}
          </button>
        </div>
      </section>

      {mensagem && (
        <p role={mensagem.erro ? "alert" : "status"} className={mensagem.erro ? styles.erro : styles.sucesso}>
          {mensagem.texto}
        </p>
      )}

      <TabelaPedidos
        pedidos={pedidos}
        total={total}
        selecionados={selecionados}
        onAlternar={alternar}
        onAlternarTodos={alternarTodos}
        onAbrir={(p) => setAbertoId(p.id)}
        pagina={pagina}
        tamanhoPagina={TAMANHO_PAGINA}
        onMudarPagina={(p) => {
          setPagina(p);
          window.scrollTo({ top: 0, behavior: "smooth" });
        }}
        carregandoPagina={carregandoPagina}
        totalProntos={contagem?.prontos ?? null}
        onSelecionarTodosProntos={selecionarTodosProntos}
        onLimparSelecao={() => setSelecionados(new Set())}
        selecionandoTodos={selecionandoTodos}
        textoVazio={buscaAplicada ? "Nenhum pedido encontrado para essa busca." : VAZIO[aba] ?? "Nenhum pedido."}
      />

      <ModalDetalhePedido
        pedidoId={abertoId}
        onFechar={() => setAbertoId(null)}
        onAlterado={() => {
          carregar();
          setSelecionados(new Set());
        }}
      />
    </main>
  );
}
