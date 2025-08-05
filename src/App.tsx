import { useContext } from "react";
import { Header } from "./components/layout";
import { CreatePaymentCard, PaymentsList, FormPaymentCard } from "./components/features/payments";
import { PaymentsContext } from "./context/PaymentsContext";
import './styles/components/App.css';
import './styles/globals.css';



function App() {
  const { payments, pendingCount, overdueCount, openForm, handlePay, handleRemind, handleEdit, paymentToEdit } = useContext(PaymentsContext);

  return (
    <main className="app">
      <Header pendingCount={pendingCount} overdueCount={overdueCount} />
      <CreatePaymentCard />
      <PaymentsList
        payments={payments}
        onPay={handlePay}
        onRemind={handleRemind}
        onEdit={handleEdit}
      />
      {
        openForm && <FormPaymentCard payment={paymentToEdit} />
      }
    </main>
  )
}

export default App
