
import styles from "./visaoGeralAdmin.module.css";
import Image from "next/image";

export default function VisaoGeralAdmin() {
  const empresas = [
    {
      iniciais: "JJ",
      nome: "Juninho & Juninha",
      plano: "Pro",
      motivo: "Atraso de pagamento",
      indicador: "12 dias - R$ 1.850",
      saude: "Risco",
    },
    {
      iniciais: "VC",
      nome: "Vinho & Cia",
      plano: "Pro",
      motivo: "Uso caiu 80% em 7 dias",
      indicador: "Risco de cancelar",
      saude: "Risco",
    },
    {
      iniciais: "FL",
      nome: "Farmácia Lapa",
      plano: "Pro",
      motivo: "Pico de Importação",
      indicador: "Risco de cancelar",
      saude: "Teste",
    },
    {
      iniciais: "FL",
      nome: "Farmácia Lapa",
      plano: "Pro",
      motivo: "Pico de Importação",
      indicador: "Risco de cancelar",
      saude: "Atenção",
    },
  ];

  const servicos = [
    { id: 1, servico: "API/Backend", status: "Online" },
    { id: 2, servico: "API/Backend", status: "Degradado" },
    { id: 3, servico: "API/Backend", status: "Degradado" },
    { id: 4, servico: "API/Backend", status: "Degradado" },
    { id: 5, servico: "API/Backend", status: "Online" },
    { id: 6, servico: "API/Backend", status: "Degradado" },
    { id: 7, servico: "API/Backend", status: "Online" },
  ];

    const recentes = [
    { id: 1, estado: "Crítico", horario: "16:32", status:"Investigando", descricao: "Latencia p95 acima de 600 ms", afetadas: "37 empresas afetadas"  },
    { id: 1, estado: "Alto", horario: "16:32", status:"Mitigando", descricao: "Latencia p95 acima de 600 ms", afetadas: "37 empresas afetadas"  },
  ];

  return (
    <main className={styles.paginaVisaoGeral}>

      {/* GRADE PRINCIPAL */}
      <section
        className={styles.gradePrincipal}
        aria-label="Resumo da operação"
      >

        {/* CARD EMPRESAS */}
        <article className={styles.cardEmpresas}>

          <div className={styles.cabecalho_visao}>
            <h1>Empresas que podem ter atenção</h1>
            <a href="#">Ver todos</a>
          </div>

          <div className={styles.colunas}>
            <span>EMPRESAS</span>
            <span>MOTIVO</span>
            <span>INDICADOR</span>
            <span>SAÚDE</span>
          </div>

          {empresas.map((empresa, index) => (
            <div
              className={styles.linha}
              key={`${empresa.nome}-${index}`}
            >

              <div className={styles.empresa}>
                <span className={styles.avatar}>
                  {empresa.iniciais}
                </span>

                <div className={styles.area_empresa}>
                  <strong>{empresa.nome}</strong>
                  <span>{empresa.plano}</span>
                </div>
              </div>

              <span className={styles.motivo}>
                {empresa.motivo}
              </span>

              <span className={styles.indicador}>
                {empresa.indicador}
              </span>

              <span
                className={
                  empresa.saude === "Risco"
                    ? styles.saudeRisco
                    : empresa.saude === "Atenção"
                    ? styles.saudeAtencao
                    : styles.saudeTeste
                }
              >
                {empresa.saude}
              </span>

              <span className={styles.seta}>›</span>

            </div>
          ))}

        </article>

        {/* CARD STATUS DOS SERVIÇOS */}
        <article className={styles.cardServicos}>

          <div className={styles.cabecalho_visao}>
            <h1>Status dos serviços</h1>
            <span className={styles.atualizadoAgora}>
              atualizado agora
            </span>
          </div>

          <div className={styles.listaServicos}>

            {servicos.map((servico) => (
              <div
                className={styles.linhaServico}
                key={servico.id}
              >

                <div className={styles.nomeServico}>

                  <span
                    className={
                      servico.status === "Online"
                        ? styles.pontoOnline
                        : styles.pontoDegradado
                    }
                    aria-hidden="true"
                  />

                  <span>{servico.servico}</span>

                </div>


                <span
                  className={
                    servico.status === "Online"
                      ? styles.statusOnline
                      : styles.statusDegradado
                  }
                >
                  {servico.status}
                </span>
              </div>  
            
            ))}

          </div>

        </article>

      </section>

      {/* GRADE INFERIOR */}
      <section
        className={styles.gradeInferior}
        aria-label="Atividade recente"
      >

        {/* CARD ALERTAS */}
        <article className={styles.cardAlertas}>
        <div className={styles.cabecalho_visao}>
            <h1>Alertas Recentes</h1>
            <span className={styles.atualizadoAgora}>
              Ver todos
            </span>
          </div>

        <div className={styles.areaCard}>

           {recentes.map((alerta) => (
    <div className={styles.mini_card} key={alerta.id}>
      <div className={styles.area_status} data-estado={alerta.estado}>
        <span className={styles.estadoBadge}>{alerta.estado}</span>
        <span>{alerta.horario}</span>
        <span>{alerta.status}</span>
      </div>

      <p className={styles.afetadas_texto}>{alerta.descricao}</p>
      <span className={styles.descricao_texto}>{alerta.afetadas}</span>
     </div>
     
   ))}
   </div>
  </article>

        {/* CARD RESUMO */}
        <article className={styles.cardResumo}>
        <div className={styles.resumoArea}>
          <Image
           src="/assets/images/empresas.png"
           alt="Descrição da imagem"
          width={160}
          height={160}
          />
          <div className={styles.resumoTexto}>
              <h1>
                409 empresas sem problemas
              </h1>
          <span className={styles.descricao_texto}>
                  Pedidos, rotas e notificações funcionando normalmente.
          </span>

          </div>
        </div>
        </article>

      </section>

    </main>
  );
}
