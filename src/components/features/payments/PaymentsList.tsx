import type { Payment } from '../../../types/Payment'
import { PaymentCard } from './PaymentCard'
import '../../../styles/components/PaymentsList.css'

interface PaymentsListProps {
  payments: Payment[]
  onPay: (id: string) => void
  onRemind: (id: string) => void
  onEdit: (id: string) => void
}

export const PaymentsList = ({ payments, onPay, onRemind, onEdit }: PaymentsListProps) => {
  return (
    <div className="payments-grid">
      {payments.map(payment => (
        <PaymentCard
          key={payment.id}
          payment={payment}
          onPay={onPay}
          onRemind={onRemind}
          onEdit={onEdit}
        />
      ))}
    </div>
  )
}
