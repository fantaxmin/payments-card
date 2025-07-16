import { usePayments } from './hooks/usePayments'
import { Header } from './components/layout'
import { PaymentsList } from './components/features/payments'
import { CreatePaymentCard } from './components/features/payments/CreatePaymentCard'
import './styles/globals.css'
import './styles/components/App.css'

function App() {
  const { payments, pendingCount, overdueCount, handlePay, handleRemind } = usePayments()

  return (
    <main className="app">
      <Header pendingCount={pendingCount} overdueCount={overdueCount} />
      <CreatePaymentCard />
      <PaymentsList 
        payments={payments} 
        onPay={handlePay} 
        onRemind={handleRemind} 
      />
    </main>
  )
}

export default App
