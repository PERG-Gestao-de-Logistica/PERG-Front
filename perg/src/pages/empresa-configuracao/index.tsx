



const usuarios = [
  {
    iniciais: "AS",
    nome: "Ana Souza",
    email: "ana@aurorastore.com.br",
    cargo: "Admin",
    tipo: "admin",
  },
  {
    iniciais: "BA",
    nome: "Bruno Alves",
    email: "bruno@aurorastore.com.br",
    cargo: "Funcionário",
    tipo: "funcionario",
  },
  {
    iniciais: "JS",
    nome: "João Silva",
    email: "joao@aurorastore.com.br",
    cargo: "Funcionário",
    tipo: "funcionario",
  },
];

export default function EmpresaConfiguracao() {
  return (
    <div className="empresa-configuracao-layout">

      {/* ESPAÇO RESERVADO PARA SIDEBAR */}
      <div
        className="sidebar-placeholder"
        aria-hidden="true"
      />

      <main className="conteudo-placeholder">

        {/* ESPAÇO RESERVADO PARA CABEÇALHO */}
        <header className="cabecalho-placeholder">

          {/* TÍTULO CONFIGURAÇÕES E DATA */}
          <div
            className="titulo-data-placeholder"
            aria-hidden="true"
          />

          {/* PESQUISA, NOVO PEDIDO E NOTIFICAÇÕES */}
          <div className="acoes-header-placeholder">

            <div
              className="pesquisa-placeholder"
              aria-hidden="true"
            />

            <div
              className="novo-pedido-placeholder"
              aria-hidden="true"
            />

            <div
              className="notificacao-placeholder"
              aria-hidden="true"
            />

          </div>
        </header>

        {/* ESPAÇO RESERVADO PARA ABAS */}
        <div
          className="abas-placeholder"
          aria-hidden="true"
        />

        {/* CONTEÚDO DA TELA */}
        <div className="conteudo-empresa">

          {/* DADOS DA EMPRESA */}
          <section className="empresa-card dados-empresa-card">

            <div className="empresa-card-header">
              <h2>Dados da empresa</h2>
              <p>Informações cadastrais e foto da empresa.</p>
            </div>

            <div className="dados-empresa-content">

              <div className="empresa-logo-area">
                <div className="empresa-logo-preview">
                  AS
                </div>

                <button
                  type="button"
                  className="empresa-btn-alterar-foto"
                >
                  
                  Alterar foto
                </button>
              </div>

              <div className="empresa-form-dados">

                <div className="empresa-form-grid">

                  <div className="empresa-field">
                    <label htmlFor="razao-social">
                      Razão social
                    </label>
                    <input
                      id="razao-social"
                      type="text"
                      defaultValue="Aurora Store Comércio de Varejo Ltda"
                    />
                  </div>

                  <div className="empresa-field">
                    <label htmlFor="nome-fantasia">
                      Nome fantasia
                    </label>
                    <input
                      id="nome-fantasia"
                      type="text"
                      defaultValue="Aurora Store"
                    />
                  </div>

                  <div className="empresa-field">
                    <label htmlFor="cnpj">
                      CNPJ
                    </label>
                    <input
                      id="cnpj"
                      type="text"
                      defaultValue="12.345.678/0001-90"
                      disabled
                    />
                  </div>

                  <div className="empresa-field">
                    <label htmlFor="email-empresa">
                      E-mail corporativo
                    </label>
                    <input
                      id="email-empresa"
                      type="email"
                      defaultValue="suporte@aurorastore.com.br"
                    />
                  </div>

                </div>

                <p className="empresa-helper-text">
                  A foto da empresa é usada em relatórios,
                  credenciais e identificação interna.
                </p>

              </div>
            </div>
          </section>

          {/* CARDS INFERIORES */}
          <div className="empresa-configuracao-bottom">

            {/* CRIAR USUÁRIO */}
            <section className="empresa-card criar-usuario-card">

              <div className="empresa-card-header">
                <h2>Criar usuário</h2>
                <p>
                  Adicione novos acessos com cargo fixo:
                  Admin ou Funcionário.
                </p>
              </div>

              <form
                className="empresa-form-usuario"
                onSubmit={(e) => e.preventDefault()}
              >

                <div className="usuario-form-grid">

                  <div className="empresa-field">
                    <label htmlFor="usuario-nome">
                      Nome completo
                    </label>
                    <input
                      id="usuario-nome"
                      type="text"
                      placeholder="João Silva"
                    />
                  </div>

                  <div className="empresa-field">
                    <label htmlFor="usuario-email">
                      E-mail
                    </label>
                    <input
                      id="usuario-email"
                      type="email"
                      placeholder="joao@aurorastore.com.br"
                    />
                  </div>

                  <div className="empresa-field">
                    <label htmlFor="usuario-telefone">
                      Telefone
                    </label>
                    <input
                      id="usuario-telefone"
                      type="tel"
                      placeholder="(11) 90000-0003"
                    />
                  </div>

                  <div className="empresa-field">
                    <label htmlFor="usuario-cargo">
                      Cargo
                    </label>

                    <div className="empresa-select-wrapper">
                      <select
                        id="usuario-cargo"
                        defaultValue="funcionario"
                      >
                        <option value="funcionario">
                          Funcionário
                        </option>
                        <option value="admin">
                          Admin
                        </option>
                      </select>


                    </div>
                  </div>

                </div>

                <div className="empresa-form-actions">

                  <button
                    type="reset"
                    className="empresa-btn-cancelar"
                  >
                    Cancelar
                  </button>

                  <button
                    type="submit"
                    className="empresa-btn-criar"
                  >
                    Criar usuário
                  </button>

                </div>

              </form>

              <p className="empresa-helper-text">
                Os usuários criados aparecem ao lado,
                com permissões fixas.
              </p>

            </section>

            {/* USUÁRIOS CRIADOS */}
            <section className="empresa-card usuarios-criados-card">

              <div className="empresa-card-header">
                <h2>Usuários criados</h2>
              </div>

              <div className="usuarios-lista">

                {usuarios.map((usuario) => (
                  <div
                    className="usuario-item"
                    key={usuario.email}
                  >

                    <div className="usuario-avatar">
                      {usuario.iniciais}
                    </div>

                    <div className="usuario-info">
                      <strong>{usuario.nome}</strong>
                      <span>{usuario.email}</span>
                    </div>

                    <span
                      className={`usuario-cargo-badge ${usuario.tipo}`}
                    >
                      {usuario.cargo}
                    </span>

                  </div>
                ))}

              </div>

            </section>

          </div>
        </div>

      </main>
    </div>
  );
}
