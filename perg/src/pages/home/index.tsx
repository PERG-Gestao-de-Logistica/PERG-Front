// ==========================================
// IMPORTAÇÕES
// ==========================================
import Header from "@/components/header";
import Button from "@/components/botao";
import Footer from "@/components/footer";
import styles from "./home.module.css";
export default function Home() {
  return (
    <main className={styles.page}>
      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}
      <Header />
      {/* ========================================== */}
      {/* PRIMEIRA SEÇÃO - APRESENTAÇÃO */}
      {/* ========================================== */}
      <div className={styles.primeiroContainer}>
        <section className={styles.conteudoHome}>
          {/* Texto principal */}
          <div className={styles.textoHome}>
            <h1 className={styles.tituloPrincipal}>
              Todas as entregas na <span>rota certa</span>
            </h1>
            <p className={styles.texto}>
              O PERG conecta lojistas, entregadores e clientes em uma
              plataforma de gestão logística que transforma pedidos em
              rotas, rotas em entregas e entregas em visibilidade.
            </p>
            {/* Botões de apresentação */}
            <div className={styles.botoesHome}>
              <Button variant="principal">
                Conheça Nossas Soluções
              </Button>
              <Button variant="texto">
                Quero assinar agora
              </Button>
            </div>
          </div>
          {/* Imagem de localização */}
          <div className={styles.imagemHome}>
            <img
              src="/assets/images/pinLocalizacaoHome.png"
              alt="Ilustração de localização"
            />
          </div>
        </section>
      </div>
      {/* ========================================== */}
      {/* SEGUNDA SEÇÃO - O PROBLEMA */}
      {/* ========================================== */}
      <div className={styles.segundoContainer}>
        <section className={styles.conteudoHome}>
          {/* Imagem da seção */}
          <div className={styles.imagemHome}>
            <img
              src="/assets/images/caixaEntrega.png"
              alt="Ilustração de caixa de entrega"
            />
          </div>
          {/* Textos sobre o problema */}
          <div className={`${styles.textoHome} ${styles.textoHomeProblema}`}>
            <h1 className={styles.tituloPrincipal}>
              O Problema
            </h1>
            <h2 className={styles.tituloPrincipal}>
              Mais pedidos. Mais entregas. Mais complexidade.
            </h2>
            <p className={styles.texto}>
              À medida que o negócio cresce, a operação logística
              precisa lidar com um volume cada vez maior de pedidos
              e informações.
            </p>
            <p className={styles.texto}>
              Quando essas etapas não estão integradas, o lojista
              perde visibilidade da operação, aumenta a dependência
              de processos manuais e encontra dificuldades para
              alavancar seu negócio.
            </p>
          </div>
        </section>
      </div>
      {/* ========================================== */}
      {/* TERCEIRA SEÇÃO - A SOLUÇÃO */}
      {/* ========================================== */}
      <div className={styles.terceiroContainer}>
        <section className={styles.conteudoHome}>
          {/* Textos sobre a solução */}
          <div className={styles.textoHome}>
            <h1 className={styles.tituloPrincipal}>
              A Solução
            </h1>
            <h2 className={styles.tituloPrincipal}>
              Uma plataforma. Toda a operação de entrega.
            </h2>
            <p className={styles.texto}>
              O PERG centraliza a gestão logística e conecta cada
              etapa da operação em um único fluxo.
            </p>
            <p className={styles.texto}>
              O lojista organiza seus pedidos, transforma pedidos
              em rotas, direciona cada rota para o entregador e
              acompanha o andamento das entregas.
            </p>
            <p className={styles.texto}>
              Ao mesmo tempo, o entregador recebe sua operação pelo
              aplicativo e o cliente pode acompanhar seu pedido por
              meio do rastreamento.
            </p>
          </div>
          {/* Imagem da plataforma */}
          <div className={styles.imagemHome}>
            <img
              src="/assets/images/celularePc.png"
              alt="Ilustração da plataforma PERG em celular e computador"
            />
          </div>
        </section>
      </div>
      {/* ========================================== */}
      {/* QUARTA SEÇÃO - COMO FUNCIONA */}
      {/* ========================================== */}
      <div className={styles.quartoContainer}>
        <section className={styles.conteudoQuartoContainer}>
          {/* LADO ESQUERDO - APRESENTAÇÃO */}
          <div className={styles.parteEsquerda}>
            {/* Imagem do caminhão */}
            <div className={styles.imagemCaminhao}>
              <img
                src="/assets/images/caminhao.png"
                alt="Caminhão representando as entregas do PERG"
              />
            </div>
            {/* Texto principal da seção */}
            <div className={styles.textoEtapas}>
              <h1 className={styles.tituloPrincipalBranco}>
                Do pedido à
              </h1>
              <h1 className={styles.tituloPrincipalCiano}>
                porta do cliente
              </h1>
            </div>
          </div>
          {/* LADO DIREITO - ETAPAS DA ENTREGA */}
          <div className={styles.parteDireita}>
            {/* ETAPA 1 - CONECTE */}
            <div className={styles.etapaItem}>
              <img
                src="/assets/images/numero1-icone.png"
                alt="Número 1"
              />
              <h2 className={styles.tituloPrincipalBranco}>
                Conecte
              </h2>
              <p className={styles.textoBranco}>
                Cadastre sua loja na nossa plataforma para
                visualizar seus pedidos
              </p>
            </div>
            {/* ETAPA 2 - ROTEIRIZE */}
            <div className={styles.etapaItem}>
              <img
                src="/assets/images/numero2-icone.png"
                alt="Número 2"
              />
              <h2 className={styles.tituloPrincipalBranco}>
                Roteirize
              </h2>
              <p className={styles.textoBranco}>
                Rotas otimizadas por custo, tempo ou km,
                respeitando janelas, peso e regras.
              </p>
            </div>
            {/* ETAPA 3 - DESPACHE */}
            <div className={styles.etapaItem}>
              <img
                src="/assets/images/numero3-icone.png"
                alt="Número 3"
              />
              <h2 className={styles.tituloPrincipalBranco}>
                Despache
              </h2>
              <p className={styles.textoBranco}>
                Cada rota vai para o motorista certo da sua equipe,
                em um clique ou automático.
              </p>
            </div>
            {/* ETAPA 4 - ACOMPANHE */}
            <div className={styles.etapaItem}>
              <img
                src="/assets/images/numero4-icone.png"
                alt="Número 4"
              />
              <h2 className={styles.tituloPrincipalBranco}>
                Acompanhe
              </h2>
              <p className={styles.textoBranco}>
                Link de rastreio com previsão de chegada e
                comprovante digital no fim.
              </p>
            </div>
          </div>
        </section>
      </div>
      {/* ========================================== */}
      {/* QUINTA SEÇÃO - TRÊS FRENTES DO PERG */}
      {/* ========================================== */}
      <div className={styles.quintoContainer}>
        <section className={styles.conteudoQuintoContainer}>
          {/* TÍTULOS DA SEÇÃO */}
          <div className={styles.textoInicial}>
            <h1 className={styles.subtituloVerdeEscuro}>
              Uma plataforma, três frentes
            </h1>
            <h1 className={styles.tituloPrincipal}>
              Cada pessoa da entrega com a
            </h1>
            <h1 className={styles.tituloPrincipal}>
              ferramenta certa.
            </h1>
          </div>
          {/* CARDS DAS TRÊS FRENTES */}
          <div className={styles.cards}>
            {/* CARD 1 - OPERAÇÃO */}
            <div className={styles.card}>
              <div className={styles.cardTopo}>
                <img
                  src="/assets/images/conf-icone.png"
                  alt="Ícone de configuração"
                />
              </div>
              <h2 className={styles.tituloPrincipal}>
                Para a Operação
              </h2>
              <p className={styles.subtituloVerdeEscuro}>
                O SaaS onde os pedidos viram rotas.
              </p>
              {/* Funcionalidades da operação */}
              <div className={styles.listaFuncoes}>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Roteirização e ajuste</p>
                </div>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Monitoramento ao vivo</p>
                </div>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Motoristas e veículos</p>
                </div>
              </div>
              {/* Botão da operação */}
              <Button variant="principal">
                Ver Portal →
              </Button>
            </div>
            {/* CARD 2 - MOTORISTA */}
            <div className={styles.card}>
              <div className={styles.cardTopo}>
                <img
                  src="/assets/images/bicicleta-icone.png"
                  alt="Ícone de motocicleta"
                />
                <span>Aplicativo</span>
              </div>
              <h2 className={styles.tituloPrincipal}>
                Para o Motorista
              </h2>
              <p className={styles.subtituloVerdeEscuro}>
                A rota do dia na palma da sua mão.
              </p>
              {/* Funcionalidades do motorista */}
              <div className={styles.listaFuncoes}>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Sequência de entrega</p>
                </div>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Navegação com GPS</p>
                </div>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Comprovante de entrega</p>
                </div>
              </div>
              {/* Botão do motorista */}
              <Button variant="principal">
                Ver App →
              </Button>
            </div>
            {/* CARD 3 - CLIENTE */}
            <div className={styles.card}>
              <div className={styles.cardTopo}>
                <img
                  src="/assets/images/local-icone.png"
                  alt="Ícone de localização"
                />
                <span>Link por e-mail</span>
              </div>
              <h2 className={styles.tituloPrincipal}>
                Para o Cliente
              </h2>
              <p className={styles.subtituloVerdeEscuro}>
                Sem app, direto pelo navegador do seu dispositivo.
              </p>
              {/* Funcionalidades do cliente */}
              <div className={styles.listaFuncoes}>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Monitoramento do trajeto</p>
                </div>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Status da entrega</p>
                </div>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Previsão de chegada</p>
                </div>
              </div>
              {/* Botão do cliente */}
              <Button variant="principal">
                Abrir no Navegador →
              </Button>
            </div>
          </div>
        </section>
      </div>
         {/* ========================================== */}
      {/* SEXTA SEÇÃO - 4 DIFERENCIAIS  */}
      {/* ========================================== */}
      <div className={styles.sextoContainer}>
        <section className={styles.conteudoSextoContainer}>
          {/* TÍTULOS DA SEÇÃO */}
          <div className={styles.textoInicial}>
            <h1 className={styles.tituloPrincipal}>
              VALOR PARA O LOJISTA
            </h1>
            <h1 className={styles.tituloPrincipal}>
              Mais controle. Mais autonomia.
            </h1>
            <h1 className={styles.tituloPrincipal}>
              Menos Dificuldade.
            </h1>
          </div>
          {/* CARDS DAS QUATRO FRENTES */}
            <div className={styles.quatroCards}>
              <div className={styles.cardSexta}>
                <img src="/assets/images/caixa-icone.png" alt="" />
                   <h1 className={styles.tituloCardSexto}>
                      Centralização
                     </h1>
            <p className={styles.textoCardSexto}>
              Todos os pedidos e informações da&#x20;
              operação reunidos em um único ambiente.
            </p>
              </div>
              <div className={styles.cardSexta}>
                <img src="/assets/images/olho-icone.png" alt="" />
                   <h1 className={styles.tituloCardSexto}>
                      Visibilidade
                     </h1>
            <p className={styles.textoCardSexto}>
         Acompanhamento do status das entregas
          e maior controle sobre a operação.
            </p>
              </div>
              <div className={styles.cardSexta}>
                <img src="/assets/images/velocimetro-icone.png" alt="" />
                   <h1 className={styles.tituloCardSexto}>
                      Eficiência
                     </h1>
            <p className={styles.textoCardSexto}>
          Rotas organizadas de acordo com
           as características da operação.
            </p>
              </div>
                      <div className={styles.cardSexta}>
                <img src="/assets/images/pessoa-icone.png" alt="" />
                   <h1 className={styles.tituloCardSexto}>
                      Autonomia
                     </h1>
            <p className={styles.textoCardSexto}>
          Gerenciamento da operação sem&#x20;
          depender de processos manuais.
            </p>
              </div>
            </div>
        </section>
      </div>
       <div className={styles.quintoContainer}>
        <section className={styles.conteudoQuintoContainer}>
          {/* TÍTULOS DA SEÇÃO */}
          <div className={styles.textoInicial}>
            <h1 className={styles.subtituloVerdeEscuro}>
             Planos
            </h1>
            <h1 className={styles.tituloPrincipal}>
              Escolha o plano ideal para sua
            </h1>
            <h1 className={styles.tituloPrincipal}>
              operação
            </h1>
          </div>
          {/* CARDS DAS TRÊS FRENTES */}
          <div className={styles.cards}>
            {/* CARD 1 - STANDARD */}
            <div className={styles.card}>
              <div className={styles.cardTopo}>
                <img
                  src="/assets/images/aviao-papel-icone.png"
                  alt="Ícone de configuração"
                />
                <div className={styles.partePreco}>
                  <p className={styles.subtituloVerdeEscuro}>
                    A partir de
                  </p>
                  <div className={styles.precoArea}>
                  <h2 className={styles.tituloPrincipal}>
                    R$ 299
                   </h2>
                    <p className={styles.subtituloVerdeEscuro}>
                    /mes
                  </p>
                  </div>
                </div>
              </div>
              <h2 className={styles.tituloPrincipal}>
                Standart
              </h2>
             
              <p className={styles.subtituloVerdeEscuro}>
                Ideal para empresas que estão començando e precisam
                 centralizar seus pedidos, rotas e entregas em um só lugar.
              </p>
               <p className={`${styles.subtituloVerdeEscuro} ${styles.setimaSecao}`}>
                  O QUE ESTÁ INCLUSO:
              </p>
          
              {/* Funcionalidades da operação */}
              <div className={styles.listaFuncoes}>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Até 500 pedidos/mês</p>
                </div>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Até 500 roteirizações/mês</p>
                </div>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Até 5 entregadores</p>
                </div>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Rastreamento para clientes</p>
                </div>
              </div>
            </div>
              {/* CARD 2 - PROFESSIONAL */}
                 <div className={styles.card}>
              <div className={styles.cardTopo}>
                <img
                  src="/assets/images/maletas-icone.png"
                  alt="Ícone de configuração"
                />
                <div className={styles.partePreco}>
                  <p className={styles.subtituloVerdeEscuro}>
                    A partir de
                  </p>
                  <div className={styles.precoArea}>
                  <h2 className={styles.tituloPrincipal}>
                    R$ 699
                   </h2>
                    <p className={styles.subtituloVerdeEscuro}>
                    /mes
                  </p>
                  </div>
                </div>
              </div>
              <h2 className={styles.tituloPrincipal}>
                Professional
              </h2>
             
              <p className={styles.subtituloVerdeEscuro}>
              Para empresas em crescimento e que precisam de mais controle, 
              integração e escala na sua operação logística.
              </p>
               <p className={`${styles.subtituloVerdeEscuro} ${styles.setimaSecao}`}>
                  O QUE ESTÁ INCLUSO:
              </p>
          
              {/* Funcionalidades da operação */}
              <div className={styles.listaFuncoes}>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Até 5000 pedidos/mês</p>
                </div>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Até 5000 roteirizações/mês</p>
                </div>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Até 30 entregadores</p>
                </div>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Rastreamento para clientes</p>
                </div>
              </div>
            </div>

                  {/* CARD 3 - ENTERPRISE */}
                 <div className={styles.card}>
              <div className={styles.cardTopo}>
                <img
                  src="/assets/images/estrela-icone.png"
                  alt="Ícone de configuração"
                />
                <div className={styles.partePreco}>
                  <p className={styles.subtituloVerdeEscuro}>
                    Valores
                  </p>
                  <div className={styles.precoArea}>
                  <h2 className={styles.tituloPrincipal}>
                    Sob consulta
                   </h2>
                  </div>
                </div>
              </div>
              <h2 className={styles.tituloPrincipal}>
                Enterprise
              </h2>
             
              <p className={styles.subtituloVerdeEscuro}>
              Para empresas em crescimento de mais controle, 
              integração e escala em todas as etapas na sua operação logística.
              </p>
               <p className={`${styles.subtituloVerdeEscuro} ${styles.setimaSecao}`}>
                  O QUE ESTÁ INCLUSO:
              </p>
          
              {/* Funcionalidades da operação */}
              <div className={styles.listaFuncoes}>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>volume de pedidos ilimitado</p>
                </div>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Roteirizações personalizáveis</p>
                </div>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Entregadores sob medida</p>
                </div>
                <div className={styles.funcao}>
                  <img src="/assets/images/check.png" alt="Verificado" />
                  <p className={styles.textoCard}>Suporte prioritário</p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>

<div className={styles.oitavoContainer}>
  <section className={styles.conteudoOitavoContainer}>

    <img
      src="/assets/logos/c5Branco.png"
      className={styles.logoBanner}
      alt="Logo C5 Solutions"
    />

    <div className={styles.areaTextoOitava}>
      <h2 className={styles.tituloPrincipalBranco}>
        Tecnologia aplicada a
        <br />
         desafios reais.
      </h2>

      <p className={styles.textoBranco}>
        A C5 Solutions desenvolve soluções digitais para otimizar
        processos, conectar operações e gerar valor para seus
        clientes.
      </p>

      <p className={styles.textoBranco}>
        O PERG é a nossa solução para transformar a gestão
        logística em uma operação integrada, estruturada e
        preparada para crescer.
      </p>
    </div>

  </section>
</div>

<div className={styles.nonoContainer}>
  <section className={styles.conteudoNonoContainer}>

    <h2 className={styles.tituloFaq}>
      Perguntas frequentes
    </h2>

    <div className={styles.listaPerguntas}>

      <div className={styles.cardFaq}>

        <div className={styles.botaoMinimizar}>

          <p className={styles.textoFaq}>
            Funciona para qualquer tipo de veículo?
          </p>

          <button className={styles.faqToggle} type="button">
            <img src="/assets/images/botao-menos.png" alt="Minimizar pergunta" />
          </button>

        </div>

        <p className={styles.respostaFaq}>
          Sim. Motos, carros, vans e caminhões, cada um com
          capacidade, volume e jornada próprios. O otimizador
          monta as rotas só com os veículos que você escolher.
        </p>

      </div>
       <div className={styles.cardFaqMinimizado}>

        <div className={styles.botaoMinimizar}>

          <p className={styles.textoFaq}>
            Posso cancelar quando quiser?
          </p>
          <button className={styles.faqToggle} type="button">
            <img src="/assets/images/botao-mais.png" alt=" pergunta" />
          </button>
        </div>
      </div>

        <div className={styles.cardFaqMinimizado}>

        <div className={styles.botaoMinimizar}>

          <p className={styles.textoFaq}>
            O cliente final precisa baixar algum app?
          </p>
          <button className={styles.faqToggle} type="button">
            <img src="/assets/images/botao-mais.png" alt="" />
          </button>
        </div>
      </div>

         <div className={styles.cardFaqMinimizado}>

        <div className={styles.botaoMinimizar}>

          <p className={styles.textoFaq}>
            E se o motorista ficar sem internet?
          </p>
          <button className={styles.faqToggle} type="button">
            <img src="/assets/images/botao-mais.png" alt=" pergunta" />
          </button>
        </div>
      </div>
    </div>

           {/* Mensagem para assinatura */}
        <div className={styles.areaTextoNona}>
        <h2 className={styles.tituloPrincipalBranco}>
          Seu primeiro lote 
             <br />
          roteirizado hoje.
        </h2>
        <p className={styles.textoVerdeEscuro}>
            Crie a conta, conecte sua loja e veja as rotas saindo
            <br />
            em minutos. 
        </p>
           <Button variant="verde-destaque">
                Conheça Nossas Soluções
              </Button>
       </div>
  </section>
</div>

<Footer />
</main>
  );
}