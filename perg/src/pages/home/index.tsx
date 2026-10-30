import Header from "@/components/header";
import Button from "@/components/botao";

export default function Home() {
  return (
    <main>
      <Header />

      <div className="primeiro-container">
        <section className="conteudo-home">
          <div className="texto-home">
          <h1 className="titulo-principal">
         Todas as entregas na <span>rota certa</span>
        </h1>

            <p className="texto">
         O PERG conecta lojistas, entregadores e clientes em uma
         plataforma de gestão logística que transforma pedidos em
         rotas, rotas em entregas e entregas em visibilidade.
        </p>
        
            <div className="botoes-home">
              <Button variant="principal">
                Conheça Nossas Soluções
              </Button>

              <Button variant="texto">
                Quero assinar agora
              </Button>
            </div>
          </div>

          <div className="imagem-home">
            <img
              src="/pinLocalizacaoHome.png"
              alt="Ilustração de localização"
            />
          </div>
        </section>
      </div>

        <div className="segundo-container">
        <section className="conteudo-home">
          <div className="imagem-home">
            <img
              src="/caixaEntrega.png"
              alt="Ilustração de localização"
            />
          </div>
               <div className="texto-home texto-home-problema">
          <h1 className="titulo-principal">
            O Problema
        </h1>

         <div className="texto-home">
          <h1 className="titulo-principal">
            Mais pedidos. Mais entregas. Mais complexidade.
        </h1>
        <p className="texto">
           À medida que o negócio cresce, a operação logística
            precisa lidar com um volume cada vez maior de pedidos e informações. 
        </p>

          <p className="texto">
            Quando essas etapas não estão integradas, o lojista perde visibilidade da operação,
             aumenta a dependência de processos manuais e encontra dificuldades para alavancar seu negócio
        </p>
            </div>
          </div>
        </section>
      </div>

       <div className="terceiro-container">
        <section className="conteudo-home">
               <div className="texto-home">
          <h1 className="titulo-principal">
            A Solução
        </h1>

         <div className="texto-home">
          <h1 className="titulo-principal">
           Uma plataforma. Toda a operação de entrega.
        </h1>
        <p className="texto">
          O PERG centraliza a gestão logística e
           conecta cada etapa da operação em um único fluxo.
        </p>

          <p className="texto">
            O lojista organiza seus pedidos, transforma pedidos em rotas, direciona cada rota para 
            o entregador e acompanha o andamento das entregas.
        </p>

        <p className="texto">
            Ao mesmo tempo, o entregador 
            recebe sua operação pelo aplicativo e o cliente
             pode acompanhar seu pedido por meio do rastreamento.
        </p>
            </div>
          </div>
            <div className="imagem-home">
            <img
              src="/celularePc.png"
              alt="Ilustração de localização"
            />
          </div>
        </section>
      </div>

    </main>
  );
}