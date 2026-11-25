
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
      saude: "Teste",
    },

  ];

  const servicos = [
    { id: 1, servico: "API/Backend", status: "Online" },
    { id: 2, servico: "API/Backend", status: "Degradado" },
    { id: 3, servico: "API/Backend", status: "Degradado" },
    { id: 4, servico: "API/Backend", status: "Degradado" },
    { id: 5, servico: "API/Backend", status: "Online" },
    { id: 6, servico: "API/Backend", status: "Degradado" },
   
  ];

    const recentes = [
    { id: 1, estado: "Crítico", horario: "16:32", status:"Investigando", descricao: "Latencia p95 acima de 600 ms", afetadas: "37 empresas afetadas"  },
    { id: 1, estado: "Alto", horario: "16:32", status:"Mitigando", descricao: "Latencia p95 acima de 600 ms", afetadas: "37 empresas afetadas"  },
  ];

  return (
    <main className={styles.paginaVisaoGeral}>

    <section className={styles.gradePrincipal}>
      {/* GRADE PRINCIPAL */}
      <section
        className={styles.gradeSuperior}
        aria-label="Resumo da operação"
      >

        {/* CARD EMPRESAS */}
        <article className={styles.cardEmpresas}>

          <div className={styles.cabecalho_visao}>
            <h1>Empresas que podem ter atenção</h1>
            <a href="#">Ver todos</a>
          </div>

          <div className={styles.colunas}>
            <p>EMPRESAS</p>
            <p>MOTIVO</p>
            <p>INDICADOR</p>
            <p>SAÚDE</p>
          </div>

      <div className={styles.empresasLinhas}>
          {empresas.map((empresa, index) => (
            <div
              className={styles.linha}
              key={`${empresa.nome}-${index}`}
            >

              <div className={styles.empresa}>
                <p className={styles.avatar}>
                  {empresa.iniciais}
                </p>

                <div className={styles.area_empresa}>
                  <strong>{empresa.nome}</strong>
                  <p className={styles.plano}>{empresa.plano}</p>
                </div>
              </div>

              <p className={styles.motivo}>
                {empresa.motivo}
              </p>

              <p className={styles.indicador}>
                {empresa.indicador}
              </p>

              <p
                className={
                  empresa.saude === "Risco"
                    ? styles.saudeRisco
                    : empresa.saude === "Atenção"
                    ? styles.saudeAtencao
                    : styles.saudeTeste
                }
              >
                {empresa.saude}
              </p>

              <p className={styles.seta}>›</p>

            </div>
          ))}

          </div>

        </article>

        {/* CARD STATUS DOS SERVIÇOS */}
        <article className={styles.cardServicos}>

          <div className={styles.cabecalho_visao}>
            <h1>Status dos serviços</h1>
            <p className={styles.atualizadoAgora}>
              atualizado agora
            </p>
          </div>

          <div className={styles.listaServicos}>

            {servicos.map((servico) => (
              <div
                className={styles.linhaServico}
                key={servico.id}
              >

                <div className={styles.nomeServico}>

                  <p
                    className={
                      servico.status === "Online"
                        ? styles.pontoOnline
                        : styles.pontoDegradado
                    }
                    aria-hidden="true"
                  />

                  <p>{servico.servico}</p>

                </div>


                <p
                  className={
                    servico.status === "Online"
                      ? styles.statusOnline
                      : styles.statusDegradado
                  }
                >
                  {servico.status}
                </p>
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
            <p className={styles.atualizadoAgora}>
              Ver todos
            </p>
          </div>

        <div className={styles.areaCard}>

           {recentes.map((alerta) => (
    <div className={styles.mini_card} key={alerta.id}>
      <div className={styles.area_status} data-estado={alerta.estado}>
        <p className={styles.estadoBadge}>{alerta.estado}</p>
        <p>{alerta.horario}</p>
        <p>{alerta.status}</p>
      </div>

      <p className={styles.afetadas_texto}>{alerta.descricao}</p>
      <p className={styles.descricao_texto}>{alerta.afetadas}</p>
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
          <p className={styles.descricao_texto}>
                  Pedidos, rotas e notificações funcionando normalmente.
          </p>

          </div>
        </div>
        </article>

      </section>
  </section>
    </main>
  );
}
