// ==========================================
// IMPORTAÇÕES
// ==========================================

import Header from "@/components/header";
import Button from "@/components/botao";

export default function Home() {
  return (
    <main>
      {/* ========================================== */}
      {/* HEADER */}
      {/* ========================================== */}

      <Header />

      {/* ========================================== */}
      {/* PRIMEIRA SEÇÃO - APRESENTAÇÃO */}
      {/* ========================================== */}

      <div className="primeiro-container">
        <section className="conteudo-home">

          {/* Texto principal */}

          <div className="texto-home">
            <h1 className="titulo-principal">
              Todas as entregas na <span>rota certa</span>
            </h1>

            <p className="texto">
              O PERG conecta lojistas, entregadores e clientes em uma
              plataforma de gestão logística que transforma pedidos em
              rotas, rotas em entregas e entregas em visibilidade.
            </p>

            {/* Botões de apresentação */}

            <div className="botoes-home">
              <Button variant="principal">
                Conheça Nossas Soluções
              </Button>

              <Button variant="texto">
                Quero assinar agora
              </Button>
            </div>
          </div>

          {/* Imagem de localização */}

          <div className="imagem-home">
            <img
              src="/pinLocalizacaoHome.png"
              alt="Ilustração de localização"
            />
          </div>

        </section>
      </div>

      {/* ========================================== */}
      {/* SEGUNDA SEÇÃO - O PROBLEMA */}
      {/* ========================================== */}

      <div className="segundo-container">
        <section className="conteudo-home">

          {/* Imagem da seção */}

          <div className="imagem-home">
            <img
              src="/caixaEntrega.png"
              alt="Ilustração de caixa de entrega"
            />
          </div>

          {/* Textos sobre o problema */}

          <div className="texto-home texto-home-problema">
            <h1 className="titulo-principal">
              O Problema
            </h1>

            <h2 className="titulo-principal">
              Mais pedidos. Mais entregas. Mais complexidade.
            </h2>

            <p className="texto">
              À medida que o negócio cresce, a operação logística
              precisa lidar com um volume cada vez maior de pedidos
              e informações.
            </p>

            <p className="texto">
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

      <div className="terceiro-container">
        <section className="conteudo-home">

          {/* Textos sobre a solução */}

          <div className="texto-home">
            <h1 className="titulo-principal">
              A Solução
            </h1>

            <h2 className="titulo-principal">
              Uma plataforma. Toda a operação de entrega.
            </h2>

            <p className="texto">
              O PERG centraliza a gestão logística e conecta cada
              etapa da operação em um único fluxo.
            </p>

            <p className="texto">
              O lojista organiza seus pedidos, transforma pedidos
              em rotas, direciona cada rota para o entregador e
              acompanha o andamento das entregas.
            </p>

            <p className="texto">
              Ao mesmo tempo, o entregador recebe sua operação pelo
              aplicativo e o cliente pode acompanhar seu pedido por
              meio do rastreamento.
            </p>
          </div>

          {/* Imagem da plataforma */}

          <div className="imagem-home">
            <img
              src="/celularePc.png"
              alt="Ilustração da plataforma PERG em celular e computador"
            />
          </div>

        </section>
      </div>

      {/* ========================================== */}
      {/* QUARTA SEÇÃO - COMO FUNCIONA */}
      {/* ========================================== */}

      <div className="quarto-container">
        <section className="conteudo-quarto-container">

          {/* LADO ESQUERDO - APRESENTAÇÃO */}

          <div className="parte-esquerda">

            {/* Imagem do caminhão */}

            <div className="imagem-caminhao">
              <img
                src="/caminhao.png"
                alt="Caminhão representando as entregas do PERG"
              />
            </div>

            {/* Texto principal da seção */}

            <div className="texto-etapas">
              <h1 className="titulo-principal-branco">
                Do pedido à
              </h1>

              <h1 className="titulo-principal-ciano">
                porta do cliente
              </h1>
            </div>

          </div>

          {/* LADO DIREITO - ETAPAS DA ENTREGA */}

          <div className="parte-direita">

            {/* ETAPA 1 - CONECTE */}

            <div className="etapa-item">
              <img
                src="/numero1-icone.png"
                alt="Número 1"
              />

              <h2 className="titulo-principal-branco">
                Conecte
              </h2>

              <p className="texto-branco">
                Cadastre sua loja na nossa plataforma para
                visualizar seus pedidos
              </p>
            </div>

            {/* ETAPA 2 - ROTEIRIZE */}

            <div className="etapa-item">
              <img
                src="/numero2-icone.png"
                alt="Número 2"
              />

              <h2 className="titulo-principal-branco">
                Roteirize
              </h2>

              <p className="texto-branco">
                Rotas otimizadas por custo, tempo ou km,
                respeitando janelas, peso e regras.
              </p>
            </div>

            {/* ETAPA 3 - DESPACHE */}

            <div className="etapa-item">
              <img
                src="/numero3-icone.png"
                alt="Número 3"
              />

              <h2 className="titulo-principal-branco">
                Despache
              </h2>

              <p className="texto-branco">
                Cada rota vai para o motorista certo da sua equipe,
                em um clique ou automático.
              </p>
            </div>

            {/* ETAPA 4 - ACOMPANHE */}

            <div className="etapa-item">
              <img
                src="/numero4-icone.png"
                alt="Número 4"
              />

              <h2 className="titulo-principal-branco">
                Acompanhe
              </h2>

              <p className="texto-branco">
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

      <div className="quinto-container">
        <section className="conteudo-quinto-container">

          {/* TÍTULOS DA SEÇÃO */}

          <div className="texto-inicial">
            <h1 className="subtitulo-verde-escuro">
              Uma plataforma, três frentes
            </h1>

            <h1 className="titulo-principal">
              Cada pessoa da entrega com a
            </h1>

            <h1 className="titulo-principal">
              ferramenta certa.
            </h1>
          </div>

          {/* CARDS DAS TRÊS FRENTES */}

          <div className="cards">

            {/* CARD 1 - OPERAÇÃO */}

            <div className="card">

              <div className="card-topo">
                <img
                  src="/conf-icone.png"
                  alt="Ícone de configuração"
                />
              </div>

              <h2 className="titulo-principal">
                Para a Operação
              </h2>

              <p className="subtitulo-verde-escuro">
                O SaaS onde os pedidos viram rotas.
              </p>

              {/* Funcionalidades da operação */}

              <div className="lista-funcoes">

                <div className="funcao">
                  <img src="/check.png" alt="Verificado" />
                  <p className="texto-card">Roteirização e ajuste</p>
                </div>

                <div className="funcao">
                  <img src="/check.png" alt="Verificado" />
                  <p className="texto-card">Monitoramento ao vivo</p>
                </div>

                <div className="funcao">
                  <img src="/check.png" alt="Verificado" />
                  <p className="texto-card">Motoristas e veículos</p>
                </div>

              </div>

              {/* Botão da operação */}

              <Button variant="principal">
                Ver Portal →
              </Button>

            </div>

            {/* CARD 2 - MOTORISTA */}

            <div className="card">

              <div className="card-topo">
                <img
                  src="/bicicleta-icone.png"
                  alt="Ícone de motocicleta"
                />

                <span>Aplicativo</span>
              </div>

              <h2 className="titulo-principal">
                Para o Motorista
              </h2>

              <p className="subtitulo-verde-escuro">
                A rota do dia na palma da sua mão.
              </p>

              {/* Funcionalidades do motorista */}

              <div className="lista-funcoes">

                <div className="funcao">
                  <img src="/check.png" alt="Verificado" />
                  <p className="texto-card">Sequência de entrega</p>
                </div>

                <div className="funcao">
                  <img src="/check.png" alt="Verificado" />
                  <p className="texto-card">Navegação com GPS</p>
                </div>

                <div className="funcao">
                  <img src="/check.png" alt="Verificado" />
                  <p className="texto-card">Comprovante de entrega</p>
                </div>

              </div>

              {/* Botão do motorista */}

              <Button variant="principal">
                Ver App →
              </Button>

            </div>

            {/* CARD 3 - CLIENTE */}

            <div className="card">

              <div className="card-topo">
                <img
                  src="/localizacao-icone.png"
                  alt="Ícone de localização"
                />

                <span>Link por e-mail</span>
              </div>

              <h2 className="titulo-principal">
                Para o Cliente
              </h2>

              <p className="subtitulo-verde-escuro">
                Sem app, direto pelo navegador do seu dispositivo.
              </p>

              {/* Funcionalidades do cliente */}

              <div className="lista-funcoes">

                <div className="funcao">
                  <img src="/check.png" alt="Verificado" />
                  <p className="texto-card">Monitoramento do trajeto</p>
                </div>

                <div className="funcao">
                  <img src="/check.png" alt="Verificado" />
                  <p className="texto-card">Status da entrega</p>
                </div>

                <div className="funcao">
                  <img src="/check.png" alt="Verificado" />
                  <p className="texto-card">Previsão de chegada</p>
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
      {/* SEXTA SEÇÃO - 5 DIFERENCIAIS  */}
      {/* ========================================== */}

      <div className="sexto-container">
        <section className="conteudo-quinto-container">

          {/* TÍTULOS DA SEÇÃO */}

          <div className="texto-inicial">
            <h1 className="titulo-principal">
              VALOR PARA O LOJISTA
            </h1>

            <h1 className="titulo-principal">
              Mais controle. Mais autonomia.
            </h1>

            <h1 className="titulo-principal">
              Menos Dificuldade
            </h1>
          </div>

          {/* CARDS DAS QUATRO FRENTES */}
            <div className="quatro-cards">
              
            </div>


        </section>
      </div>


    </main>
  );
}