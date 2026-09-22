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

  const total = expenses.reduce((sum, expense) => sum + expense.value, 0)

  useEffect(() => {
  fetch('http://localhost:8080/api/expenses')
    .then((response) => response.json())
    .then((data) => {
      console.log('Despesas recebidas:', data)
      setExpenses(data)
    })
}, [])

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
            <select defaultValue="month">
              <option value="month">Este mês</option>
              <option value="previous">Mês anterior</option>
              <option value="all">Todo o período</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Categoria</label>
            <select defaultValue="all">
              <option value="all">Todas</option>
              <option value="food">Alimentação</option>
              <option value="transport">Transporte</option>
              <option value="housing">Moradia</option>
              <option value="leisure">Lazer</option>
              <option value="health">Saúde</option>
              <option value="education">Educação</option>
              <option value="other">Outros</option>
            </select>
          </div>

          <div className="filter-group">
            <label>Tipo de gasto</label>
            <select defaultValue="all">
              <option value="all">Todos</option>
              <option value="necessary">Necessários</option>
              <option value="unexpected">Imprevistos</option>
              <option value="avoidable">Desnecessários</option>
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
            {total.toLocaleString('pt-BR', {style: 'currency', currency: 'BRL'})}
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
                  {expense.date} · {expense.category}
                </span>
              </div>

              <span className="expense-type">
                {expense.classification}
              </span>

              <strong>
                R$ {expense.value.toFixed(2)}
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