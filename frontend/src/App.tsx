import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import './App.css'

function App() {
  const [page, setPage] = useState('dashboard')

  function handleExportExcel() {
    const today = new Date()

    const year = today.getFullYear()
    const month = today.getMonth() + 1

    window.open(
      `http://localhost:8080/api/reports/monthly/export?year=${year}&month=${month}`,
      '_blank'
    )
  }

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="logo">
          <div className="logo-icon">C</div>
          <span>Controle</span>
        </div>

        <nav className="menu">
          <button
            className={`menu-item ${page === 'dashboard' ? 'active' : ''}`}
            onClick={() => setPage('dashboard')}
          >
            <span>⌂</span>
            Início
          </button>

          <button
            className={`menu-item ${page === 'expenses' ? 'active' : ''}`}
            onClick={() => setPage('expenses')}
          >
            <span>▣</span>
            Despesas
          </button>

          <button
            className={`menu-item ${page === 'reports' ? 'active' : ''}`}
            onClick={() => setPage('reports')}
          >
            <span>◫</span>
            Relatórios
          </button>
        </nav>

        <div className="sidebar-bottom">
          <button className="menu-item">
            <span>⚙</span>
            Configurações
          </button>
        </div>
      </aside>

      <main className="main">
        {page === 'dashboard' && <Dashboard />}
        {page === 'expenses' && <Expenses />}

        {page === 'reports' && (
          <div className="reports-page">
            <header className="header">
              <div>
                <p className="greeting">Relatórios</p>
                <h1>Exportar dados</h1>
                <p className="subtitle">
                  Exporte suas despesas do mês para Excel.
                </p>
              </div>
            </header>

            <section className="panel reports-panel">
              <div>
                <h2>Relatório mensal</h2>
                <p>
                  Gere um arquivo Excel com as despesas e o resumo
                  financeiro do mês atual.
                </p>
              </div>

              <button
                className="add-button"
                onClick={handleExportExcel}
              >
                Exportar para Excel
              </button>
            </section>
          </div>
        )}
      </main>
    </div>
  )
}

export default App