import { useState } from 'react'
import Dashboard from './pages/Dashboard'
import Expenses from './pages/Expenses'
import './App.css'

function App() {
  const [page, setPage] = useState('dashboard')

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
          <div>
            <h1>Relatórios</h1>
            <p>Em breve...</p>
          </div>
        )}
      </main>
    </div>
  )
}

export default App