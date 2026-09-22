function Dashboard() {
  return (
    <div>
      <header className="header">
        <div>
          <p className="greeting">Olá!</p>
          <h1>Visão geral</h1>
          <p className="subtitle">
            Aqui está um resumo das suas despesas.
          </p>
        </div>

        <button className="add-button">
          + Nova despesa
        </button>
      </header>

      <section className="summary-grid">
        <div className="summary-card">
          <span className="card-label">Gastos este mês</span>
          <strong>R$ 1.250,00</strong>
          <span className="card-description">Setembro 2026</span>
        </div>

        <div className="summary-card">
          <span className="card-label">Necessários</span>
          <strong>R$ 800,00</strong>
          <span className="card-description">64% dos gastos</span>
        </div>

        <div className="summary-card">
          <span className="card-label">Imprevistos</span>
          <strong>R$ 200,00</strong>
          <span className="card-description">16% dos gastos</span>
        </div>

        <div className="summary-card">
          <span className="card-label">Desnecessários</span>
          <strong>R$ 250,00</strong>
          <span className="card-description">20% dos gastos</span>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel spending-panel">
          <div className="panel-header">
            <div>
              <h2>Gastos do mês</h2>
              <p>Veja como suas despesas estão distribuídas.</p>
            </div>

            <select defaultValue="month">
              <option value="month">Este mês</option>
              <option value="previous">Mês anterior</option>
            </select>
          </div>

          <div className="chart">
            <div className="chart-line">
              <span>R$ 600</span>
              <div className="line"></div>
            </div>

            <div className="chart-line">
              <span>R$ 400</span>
              <div className="line"></div>
            </div>

            <div className="chart-line">
              <span>R$ 200</span>
              <div className="line"></div>
            </div>

            <div className="bars">
              <div className="bar-container">
                <div className="bar" style={{ height: '45%' }}></div>
                <span>01</span>
              </div>

              <div className="bar-container">
                <div className="bar" style={{ height: '65%' }}></div>
                <span>05</span>
              </div>

              <div className="bar-container">
                <div className="bar" style={{ height: '35%' }}></div>
                <span>10</span>
              </div>

              <div className="bar-container">
                <div className="bar" style={{ height: '80%' }}></div>
                <span>15</span>
              </div>

              <div className="bar-container">
                <div className="bar" style={{ height: '55%' }}></div>
                <span>20</span>
              </div>

              <div className="bar-container">
                <div className="bar" style={{ height: '70%' }}></div>
                <span>25</span>
              </div>

              <div className="bar-container">
                <div className="bar" style={{ height: '90%' }}></div>
                <span>30</span>
              </div>
            </div>
          </div>
        </div>

        <div className="panel categories-panel">
          <div className="panel-header">
            <div>
              <h2>Categorias</h2>
              <p>Onde seu dinheiro está indo.</p>
            </div>
          </div>

          <div className="category-list">
            <div className="category">
              <div className="category-info">
                <div>
                  <strong>Alimentação</strong>
                  <small>8 despesas</small>
                </div>
              </div>

              <strong>R$ 450,00</strong>
            </div>

            <div className="category">
              <div className="category-info">
                <div>
                  <strong>Transporte</strong>
                  <small>5 despesas</small>
                </div>
              </div>

              <strong>R$ 180,00</strong>
            </div>

            <div className="category">
              <div className="category-info">
                <div>
                  <strong>Moradia</strong>
                  <small>2 despesas</small>
                </div>
              </div>

              <strong>R$ 300,00</strong>
            </div>

            <div className="category">
              <div className="category-info">
                <div>
                  <strong>Lazer</strong>
                  <small>4 despesas</small>
                </div>
              </div>

              <strong>R$ 120,00</strong>
            </div>

            <div className="category">
              <div className="category-info">
                <div>
                  <strong>Saúde</strong>
                  <small>2 despesas</small>
                </div>
              </div>

              <strong>R$ 80,00</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="panel expenses-panel">
        <div className="panel-header">
          <div>
            <h2>Últimas despesas</h2>
            <p>Confira seus gastos mais recentes.</p>
          </div>

          <button className="link-button">
            Ver todas
          </button>
        </div>

        <div className="expense-list">
          <div className="expense">

            <div className="expense-info">
              <strong>Almoço</strong>
              <span>Alimentação · Necessário</span>
            </div>

            <strong>R$ 35,90</strong>
          </div>

          <div className="expense">

            <div className="expense-info">
              <strong>Cinema</strong>
              <span>Lazer · Evitável</span>
            </div>

            <strong>R$ 50,00</strong>
          </div>

          <div className="expense">

            <div className="expense-info">
              <strong>Uber</strong>
              <span>Transporte · Necessário</span>
            </div>

            <strong>R$ 18,50</strong>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Dashboard