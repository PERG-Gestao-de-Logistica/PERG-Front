import { useEffect, useState } from "react";
import type { IconType } from "react-icons";
import { FaBicycle, FaCarSide, FaMotorcycle, FaTruck, FaShuttleVan } from "react-icons/fa";
import styles from "./valoresEntregador.module.css";
import Esqueleto from "@/components/esqueleto/esqueleto";
import { empresaService } from "@/services/empresaService";
import type { ValorVeiculo } from "@/@types/empresa";
import type { TipoVeiculo } from "@/@types/painel";

const VEICULOS: Record<TipoVeiculo, { nome: string; Icone: IconType }> = {
  Moto: { nome: "Moto", Icone: FaMotorcycle },
  Carro: { nome: "Carro", Icone: FaCarSide },
  Van: { nome: "Van", Icone: FaShuttleVan },
  Caminhao: { nome: "Caminhão", Icone: FaTruck },
  Bike: { nome: "Bike", Icone: FaBicycle },
};
const ORDEM: TipoVeiculo[] = ["Moto", "Carro", "Van", "Caminhao", "Bike"];

// Rota de exemplo para mostrar quanto o entregador receberia
const EXEMPLO_KM = 10;
const EXEMPLO_ENTREGAS = 5;

type Campo = "baseRota" | "porKm" | "porEntrega";
type Linha = Record<Campo, string>;

const reais = (v: number) => v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
const paraTexto = (v: number) => v.toFixed(2);
const paraNumero = (t: string) => Number(t.replace(",", "."));

const paraLinhas = (lista: ValorVeiculo[]): Record<string, Linha> =>
  Object.fromEntries(
    lista.map((v) => [v.tipo, { baseRota: paraTexto(v.baseRota), porKm: paraTexto(v.porKm), porEntrega: paraTexto(v.porEntrega) }]),
  );

// Card da aba Empresas: quanto a loja paga aos entregadores por tipo de veículo.
// Esses valores entram no valor de cada rota e na prioridade "Custo" da roteirização.
export default function ValoresEntregador() {
  const [valores, setValores] = useState<ValorVeiculo[] | null>(null);
  const [linhas, setLinhas] = useState<Record<string, Linha>>({});
  const [mensagem, setMensagem] = useState<{ texto: string; erro?: boolean } | null>(null);
  const [salvando, setSalvando] = useState(false);

  useEffect(() => {
    empresaService
      .valoresEntregador()
      .then((lista) => {
        setValores(lista);
        setLinhas(paraLinhas(lista));
      })
      .catch((e) => setMensagem({ texto: (e as Error).message, erro: true }));
  }, []);

  const ordenados = (valores ?? []).slice().sort((a, b) => ORDEM.indexOf(a.tipo) - ORDEM.indexOf(b.tipo));

  const alterado = ordenados.some((v) => {
    const l = linhas[v.tipo];
    return l && (paraNumero(l.baseRota) !== v.baseRota || paraNumero(l.porKm) !== v.porKm || paraNumero(l.porEntrega) !== v.porEntrega);
  });

  const algumPersonalizado = ordenados.some((v) => v.personalizado);

  function mudar(tipo: string, campo: Campo, texto: string) {
    setLinhas((atual) => ({ ...atual, [tipo]: { ...atual[tipo], [campo]: texto } }));
    setMensagem(null);
  }

  async function salvar() {
    const corpo = ordenados.map((v) => ({
      tipo: v.tipo,
      baseRota: paraNumero(linhas[v.tipo].baseRota),
      porKm: paraNumero(linhas[v.tipo].porKm),
      porEntrega: paraNumero(linhas[v.tipo].porEntrega),
    }));
    if (corpo.some((c) => [c.baseRota, c.porKm, c.porEntrega].some((n) => Number.isNaN(n) || n < 0))) {
      setMensagem({ texto: "Preencha todos os valores com números a partir de zero.", erro: true });
      return;
    }
    setSalvando(true);
    try {
      const r = await empresaService.salvarValoresEntregador(corpo);
      setValores(r.valores);
      setLinhas(paraLinhas(r.valores));
      setMensagem({ texto: "Valores salvos. As próximas roteirizações já usam esta tabela." });
    } catch (e) {
      setMensagem({ texto: (e as Error).message, erro: true });
    } finally {
      setSalvando(false);
    }
  }

  async function restaurar() {
    setSalvando(true);
    try {
      const r = await empresaService.restaurarValoresEntregador();
      setValores(r.valores);
      setLinhas(paraLinhas(r.valores));
      setMensagem({ texto: "Valores voltaram para a tabela padrão do Perg." });
    } catch (e) {
      setMensagem({ texto: (e as Error).message, erro: true });
    } finally {
      setSalvando(false);
    }
  }

  return (
    <article className={styles.card}>
      <div className={styles.cabecalho}>
        <h2>Valores pagos aos entregadores</h2>
        <p>
          Quanto cada entregador recebe por rota, conforme o veículo. Esses valores formam o valor das rotas e
          a prioridade &quot;Custo&quot; da roteirização.
        </p>
      </div>

      {valores === null ? (
        mensagem?.erro ? null : (
          <div className={styles.lista} aria-busy="true" aria-label="Carregando valores">
            {[1, 2, 3, 4].map((i) => (
              <Esqueleto key={i} altura="2.75rem" />
            ))}
          </div>
        )
      ) : (
        <div className={styles.lista} role="table" aria-label="Valores por tipo de veículo">
          <div className={styles.titulos} role="row">
            <span role="columnheader">Veículo</span>
            <span role="columnheader">Fixo por rota</span>
            <span role="columnheader">Por km</span>
            <span role="columnheader">Por entrega</span>
            <span role="columnheader">
              Exemplo ({EXEMPLO_KM} km, {EXEMPLO_ENTREGAS} entregas)
            </span>
          </div>

          {ordenados.map((v) => {
            const { nome, Icone } = VEICULOS[v.tipo];
            const l = linhas[v.tipo];
            const exemplo =
              paraNumero(l.baseRota) + paraNumero(l.porKm) * EXEMPLO_KM + paraNumero(l.porEntrega) * EXEMPLO_ENTREGAS;
            const campos: { campo: Campo; rotulo: string; padrao: number }[] = [
              { campo: "baseRota", rotulo: "Fixo por rota", padrao: v.padraoBaseRota },
              { campo: "porKm", rotulo: "Por km", padrao: v.padraoPorKm },
              { campo: "porEntrega", rotulo: "Por entrega", padrao: v.padraoPorEntrega },
            ];

            return (
              <div key={v.tipo} className={styles.linha} role="row">
                <span className={styles.veiculo} role="cell">
                  <span className={styles.iconeVeiculo}>
                    <Icone aria-hidden="true" />
                  </span>
                  {nome}
                  {v.personalizado && <span className={styles.selo}>personalizado</span>}
                </span>

                {campos.map(({ campo, rotulo, padrao }) => (
                  <label key={campo} className={styles.campo} role="cell">
                    <span className={styles.rotuloCelular}>{rotulo}</span>
                    <span className={styles.entrada}>
                      <span className={styles.prefixo}>R$</span>
                      <input
                        type="number"
                        inputMode="decimal"
                        min={0}
                        step={0.1}
                        value={l[campo]}
                        onChange={(e) => mudar(v.tipo, campo, e.target.value)}
                        aria-label={`${rotulo} para ${nome}`}
                        title={`Padrão do Perg: ${reais(padrao)}`}
                      />
                    </span>
                  </label>
                ))}

                <span className={styles.exemplo} role="cell">
                  <span className={styles.rotuloCelular}>
                    Exemplo ({EXEMPLO_KM} km, {EXEMPLO_ENTREGAS} entregas)
                  </span>
                  {Number.isNaN(exemplo) ? "--" : reais(exemplo)}
                </span>
              </div>
            );
          })}
        </div>
      )}

      <footer className={styles.rodape}>
        <p
          role={mensagem?.erro ? "alert" : "status"}
          className={styles.mensagem}
          style={mensagem ? { color: mensagem.erro ? "var(--cor-perigo)" : "var(--cor-sucesso)" } : undefined}
        >
          {mensagem?.texto ?? "Passe o mouse num campo para ver o valor padrão do Perg."}
        </p>
        <div className={styles.botoes}>
          <button type="button" className={styles.botaoSecundario} onClick={restaurar}
            disabled={salvando || !valores || !algumPersonalizado}>
            Restaurar padrão
          </button>
          <button type="button" className={styles.botaoPrimario} onClick={salvar} disabled={salvando || !alterado}>
            {salvando ? "Salvando..." : "Salvar valores"}
          </button>
        </div>
      </footer>
    </article>
  );
}