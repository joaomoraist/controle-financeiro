import { useState, useEffect } from 'react'

type Expense = {
  id: number
  date: string
  description: string
  value: number
  category: string
  classification: string
}

function Expenses() {
  const [expenses, setExpenses] = useState<Expense[]>([])
  const [showForm, setShowForm] = useState(false)

  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [value, setValue] = useState('')
  const [category, setCategory] = useState('')
  const [classification, setClassification] = useState('')
  const [categoryFilter, setCategoryFilter] = useState('all')
  const [classificationFilter, setClassificationFilter] = useState('all')
  const [periodFilter, setPeriodFilter] = useState('month')

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

  function formatDate(date: string) {
    return new Date(`${date}T00:00:00`).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: 'long',
    })
  }

  const total = expenses.reduce((sum, expense) => sum + expense.value, 0)

  function getPeriodDates() {
    const today = new Date()

    if (periodFilter === 'all') {
      return {
        startDate: null,
        endDate: null,
      }
    }

    if (periodFilter === 'previous') {
      const previousMonth = new Date(
        today.getFullYear(),
        today.getMonth() - 1,
        1
      )

      const lastDayPreviousMonth = new Date(
        today.getFullYear(),
        today.getMonth(),
        0
      )

      return {
        startDate: previousMonth.toISOString().split('T')[0],
        endDate: lastDayPreviousMonth.toISOString().split('T')[0],
      }
    }

    const firstDayCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth(),
      1
    )

    const lastDayCurrentMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    )

    return {
      startDate: firstDayCurrentMonth.toISOString().split('T')[0],
      endDate: lastDayCurrentMonth.toISOString().split('T')[0],
    }
  }

  async function loadExpenses() {
    const params = new URLSearchParams()

    const { startDate, endDate } = getPeriodDates()

    if (startDate) {
      params.append('startDate', startDate)
    }

    if (endDate) {
      params.append('endDate', endDate)
    }

    if (categoryFilter !== 'all') {
      params.append('category', categoryFilter)
    }

    if (classificationFilter !== 'all') {
      params.append('classification', classificationFilter)
    }

    const response = await fetch(
      `http://localhost:8080/api/expenses?${params.toString()}`
    )

    const data = await response.json()

    console.log('Despesas recebidas:', data)

    setExpenses(data)
  }

  useEffect(() => {
    loadExpenses()
  }, [periodFilter, categoryFilter, classificationFilter])

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault()

    const expense = {
      date,
      description,
      value: Number(value),
      category,
      classification,
    }

    const response = await fetch('http://localhost:8080/api/expenses', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(expense),
    })

    if (!response.ok) {
      console.error('Erro ao cadastrar despesa')
      return
    }

    const savedExpense = await response.json()

    console.log('Despesa salva:', savedExpense)

    setExpenses((currentExpenses) => [
      ...currentExpenses,
      savedExpense,
    ])

    setShowForm(false)
  }

  return (
    <div>
      <header className="header">
        <div>
          <p className="greeting">Controle financeiro</p>
          <h1>Minhas despesas</h1>
          <p className="subtitle">
            Acompanhe e organize seus gastos.
          </p>
        </div>

        <button
          className="add-button"
          onClick={() => setShowForm(true)}
        >
          + Nova despesa
        </button>
      </header>

      {showForm && (
        <section className="panel expense-form-panel">
          <div className="panel-header">
            <div>
              <h2>Nova despesa</h2>
              <p>Informe os dados do seu gasto.</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className="expense-form">
            <div className="form-group">
              <label>Data</label>
              <input
                type="date"
                value={date}
                onChange={(event) => setDate(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Descrição</label>
              <input
                type="text"
                placeholder="Ex.: Almoço"
                value={description}
                onChange={(event) => setDescription(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Valor</label>
              <input
                type="number"
                step="0.01"
                min="0.01"
                placeholder="0,00"
                value={value}
                onChange={(event) => setValue(event.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Categoria</label>
              <select
                value={category}
                onChange={(event) => setCategory(event.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="ALIMENTACAO">Alimentação</option>
                <option value="TRANSPORTE">Transporte</option>
                <option value="MORADIA">Moradia</option>
                <option value="LAZER">Lazer</option>
                <option value="SAUDE">Saúde</option>
                <option value="EDUCACAO">Educação</option>
                <option value="OUTROS">Outros</option>
              </select>
            </div>

            <div className="form-group">
              <label>Tipo de gasto</label>
              <select
                value={classification}
                onChange={(event) => setClassification(event.target.value)}
                required
              >
                <option value="">Selecione</option>
                <option value="NECESSARIO">Necessário</option>
                <option value="IMPREVISTO">Imprevisto</option>
                <option value="DESNECESSARIO">Desnecessário</option>
              </select>
            </div>

            <div className="form-actions">
              <button
                type="button"
                className="cancel-button"
                onClick={() => setShowForm(false)}
              >
                Cancelar
              </button>

              <button type="submit" className="add-button">
                Salvar despesa
              </button>
            </div>
          </form>
        </section>
      )}

      <section className="panel">
        <div className="expense-filters">
          <div className="filter-group">
            <label>Período</label>
            <select  value={periodFilter} onChange={(event) => setPeriodFilter(event.target.value)}>
              <option value="month">Este mês</option>
              <option value="previous">Mês anterior</option>
              <option value="all">Todo o período</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Categoria</label>
            <select value={categoryFilter} onChange={(event) => setCategoryFilter(event.target.value)}>
              <option value="all">Todas</option>
              <option value="ALIMENTACAO">Alimentação</option>
              <option value="TRANSPORTE">Transporte</option>
              <option value="MORADIA">Moradia</option>
              <option value="LAZER">Lazer</option>
              <option value="SAUDE">Saúde</option>
              <option value="EDUCACAO">Educação</option>
              <option value="OUTROS">Outros</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Tipo de gasto</label>
            <select  value={classificationFilter} onChange={(event) => setClassificationFilter(event.target.value)}>
              <option value="all">Todos</option>
              <option value="NECESSARIO">Necessários</option>
              <option value="IMPREVISTO">Imprevistos</option>
              <option value="DESNECESSARIO">Desnecessários</option>
            </select>
          </div>
        </div>
      </section>

      <section className="panel expenses-table-panel">
        <div className="panel-header">
          <div>
            <h2>Setembro 2026</h2>
            <p>{expenses.length} despesas encontradas</p>
          </div>

          <strong className="month-total">
            {total.toLocaleString('pt-BR', {
              style: 'currency',
              currency: 'BRL',
            })}
          </strong>
        </div>

        <div className="expense-list">
          {expenses.map((expense) => (
            <div className="expense" key={expense.id}>
              <div className="expense-icon">
                💰
              </div>

              <div className="expense-info">
                <strong>{expense.description}</strong>

                <span>
                  {formatDate(expense.date)} · {formatCategory(expense.category)}
                </span>
              </div>

              <span className="expense-type">
                {formatClassification(expense.classification)}
              </span>

              <strong>
                {expense.value.toLocaleString('pt-BR', {
                  style: 'currency',
                  currency: 'BRL',
                })}
              </strong>

              <button className="expense-action">
                ⋮
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}

export default Expenses