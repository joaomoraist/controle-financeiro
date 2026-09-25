import { useEffect, useState } from 'react'

type MonthlyReport = {
  year: number
  month: number
  total: number
  necessary: number
  unexpected: number
  unnecessary: number
  byCategory: Record<string, number>
}

type Expense = {
  id: number
  date: string
  description: string
  value: number
  category: string
  classification: string
}

function Dashboard() {
  const [report, setReport] = useState<MonthlyReport | null>(null)
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [periodFilter, setPeriodFilter] = useState ("current")

  function getSelectedPeriod() {
    const today = new Date()

    if (periodFilter === 'previous') {
      const date = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      )

      const year = date.getFullYear()
      const month = date.getMonth() + 1

      const startDate = `${year}-${String(month).padStart(2, '0')}-01`

      const lastDay = new Date(year, month, 0).getDate()

      const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`

      return {
        year,
        month,
        startDate,
        endDate,
      }
    }

    const year = today.getFullYear()
    const month = today.getMonth() + 1

    const startDate = `${year}-${String(month).padStart(2, '0')}-01`

    const lastDay = new Date(year, month, 0).getDate()

    const endDate = `${year}-${String(month).padStart(2, '0')}-${String(lastDay).padStart(2, '0')}`

    return {
      year,
      month,
      startDate,
      endDate,
    }
  }

  useEffect(() => {
    async function loadDashboard() {
      const {
        year,
        month,
        startDate,
        endDate,
      } = getSelectedPeriod()

      const reportResponse = await fetch(
        `http://localhost:8080/api/reports/monthly?year=${year}&month=${month}`
      )

      if (!reportResponse.ok) {
        console.error('Erro ao carregar relatório mensal')
        return
      }

      const reportData = await reportResponse.json()

      setReport(reportData)

      const expensesResponse = await fetch(
        `http://localhost:8080/api/expenses?startDate=${startDate}&endDate=${endDate}`
      )

      if (!expensesResponse.ok) {
        console.error('Erro ao carregar despesas')
        return
      }

      const expensesData = await expensesResponse.json()

      setExpenses(expensesData)
    }

    loadDashboard()
  }, [periodFilter])

  function formatCurrency(value: number) {
    return value.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    })
  }

  function formatCategory(category: string) {
    const categories: Record<string, string> = {
      ALIMENTACAO: 'Alimentação',
      TRANSPORTE: 'Transporte',
      MORADIA: 'Moradia',
      LAZER: 'Lazer',
      SAUDE: 'Saúde',
      EDUCACAO: 'Educação',
      OUTROS: 'Outros',
    }

    return categories[category] ?? category
  }

  function formatClassification(classification: string) {
    const classifications: Record<string, string> = {
      NECESSARIO: 'Necessário',
      IMPREVISTO: 'Imprevisto',
      DESNECESSARIO: 'Desnecessário',
    }

    return classifications[classification] ?? classification
  }

  function calculatePercentage(value: number) {
    if (!report || report.total === 0) {
      return 0
    }

    return Math.round((value / report.total) * 100)
  }

  function formatMonth(month: number) {
    const months = [
      'Janeiro',
      'Fevereiro',
      'Março',
      'Abril',
      'Maio',
      'Junho',
      'Julho',
      'Agosto',
      'Setembro',
      'Outubro',
      'Novembro',
      'Dezembro',
    ]

    return months[month - 1]
  }

  if (!report) {
    return <p>Carregando dashboard...</p>
  }

  function getDailyExpenses() {
   const dailyExpenses: Record<number, number> = {}

    expenses.forEach((expense) => {
      const day = Number(expense.date.split('-')[2])

      dailyExpenses[day] =
        (dailyExpenses[day] ?? 0) + expense.value
    })

    return dailyExpenses
  }

  const dailyExpenses = getDailyExpenses()

  const daysInMonth = new Date(
    report.year,
    report.month,
    0
  ).getDate()

  const chartValues = Array.from(
    { length: daysInMonth },
    (_, index) => {
      const day = index + 1

      return {
        day,
        value: dailyExpenses[day] ?? 0,
      }
    }
  )

  const maxChartValue = Math.max(
    ...chartValues.map((item) => item.value),
    1
  )

  const chartStep = Math.ceil(maxChartValue / 3)

  const chartLabels = [
    chartStep * 3,
    chartStep * 2,
    chartStep,
  ]

  const latestExpenses = [...expenses]
    .sort(
      (a, b) =>
        new Date(b.date).getTime() - new Date(a.date).getTime()
    )
    .slice(0, 3)

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
          <strong>{formatCurrency(report.total)}</strong>
          <span className="card-description">
            {formatMonth(report.month)} {report.year}
          </span>
        </div>

        <div className="summary-card">
          <span className="card-label">Necessários</span>
          <strong>{formatCurrency(report.necessary)}</strong>
          <span className="card-description">
            {calculatePercentage(report.necessary)}% dos gastos
          </span>
        </div>

        <div className="summary-card">
          <span className="card-label">Imprevistos</span>
          <strong>{formatCurrency(report.unexpected)}</strong>
          <span className="card-description">
            {calculatePercentage(report.unexpected)}% dos gastos
          </span>
        </div>

        <div className="summary-card">
          <span className="card-label">Desnecessários</span>
          <strong>{formatCurrency(report.unnecessary)}</strong>
          <span className="card-description">
            {calculatePercentage(report.unnecessary)}% dos gastos
          </span>
        </div>
      </section>

      <section className="dashboard-grid">
        <div className="panel spending-panel">
          <div className="panel-header">
            <div>
              <h2>Gastos do mês</h2>
              <p>Veja como suas despesas estão distribuídas.</p>
            </div>

            <select value={periodFilter} onChange={(event) => setPeriodFilter(event.target.value)}>
              <option value="current">Este mês</option>
              <option value="previous">Mês anterior</option>
            </select>
          </div>

          <div className="chart">
            {chartLabels.map((label) => (
              <div className="chart-line" key={label}>
                <span>{formatCurrency(label)}</span>
                <div className="line"></div>
              </div>
            ))}

           <div className="bars">
            {chartValues.map((item) => {
              const height =
                item.value === 0
                  ? 0
                  : (item.value / maxChartValue) * 100

              return (
                <div className="bar-container" key={item.day}>
                  <div
                    className="bar"
                    style={{ height: `${height}%` }}
                    title={formatCurrency(item.value)}
                  ></div>

                  <span>{String(item.day).padStart(2, '0')}</span>
                </div>
              )
            })}
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
            {Object.entries(report.byCategory).map(([category, value]) => (
              <div className="category" key={category}>
                <div className="category-info">
                  <div>
                    <strong>{formatCategory(category)}</strong>
                  </div>
                </div>

                <strong>{formatCurrency(value)}</strong>
              </div>
            ))}
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
          {latestExpenses.map((expense) => (
            <div className="expense" key={expense.id}>
              <div className="expense-info">
                <strong>{expense.description}</strong>
                <span>
                  {formatCategory(expense.category)} ·{' '}
                  {formatClassification(expense.classification)}
                </span>
              </div>

              <strong>{formatCurrency(expense.value)}</strong>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Dashboard