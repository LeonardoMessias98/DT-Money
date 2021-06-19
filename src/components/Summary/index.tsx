import incomeImg from 'assets/income.svg'
import outcomeImg from 'assets/outcome.svg'
import totalImg from 'assets/total.svg'

import { Container } from './styles'
import { useTransactions } from 'hooks/useTransactions'

const Summary = () => {
  const { transactions } = useTransactions()

  const summary = transactions?.reduce((acc, transaction) => {
    const { type, amount } = transaction;

    if (type === 'deposit') {
      acc.deposit += amount;
      acc.total += amount;
    } else {
      acc.withdraw += amount;
      acc.total -= amount;
    }

    return acc;
  }, {
    deposit: 0,
    withdraw: 0,
    total: 0,
  })

  console.log(summary)

  return (
    <Container>
      <div>
        <header>
          <p>Entradas</p>
          <img src={incomeImg} alt="Entradas" />
        </header>
        <strong>
          {Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency:'BRL' }
            ).format(summary?.deposit || 0)
          }
        </strong>
      </div>
      
      <div>
        <header>
          <p>Saídas</p>
          <img src={outcomeImg} alt="Saídas" />
        </header>
        <strong>
          {Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency:'BRL' }
            ).format(summary?.withdraw || 0)
          }
        </strong>
      </div>

      <div className="highlight-background">
        <header>
          <p>Total</p>
          <img src={totalImg} alt="Total" />
        </header>
        <strong>
          {Intl.NumberFormat('pt-BR', { 
            style: 'currency', 
            currency:'BRL' }
            ).format(summary?.total || 0)
          }
        </strong>
      </div>
    </Container>
  )
}

export default Summary
