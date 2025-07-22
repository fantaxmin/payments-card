import type { Payment } from '../../../types/Payment'
import '../../../styles/components/PaymentCard.css'
import '../../../styles/components/Button.css'

interface PaymentCardProps {
  payment: Payment
  onPay: (id: string) => void
  onRemind: (id: string) => void
}

export const PaymentCard = ({ payment, onPay, onRemind }: PaymentCardProps) => {
  return (
    <div className={`payment-card ${payment.status}`}>
      <div className="payment-header">
        <h3>{payment.title}</h3>
        <span className={`status-indicator ${payment.status}`}>
          {payment.status === 'pendiente' ? 'Pendiente' : 'Vencido'}
        </span>
      </div>
      
      <p className="payment-description">{payment.description}</p>
      
      <div className="payment-amount">{
        new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(payment.amount)
      }</div>
      
      <div className="payment-category">{payment.category}</div>
      
      <div className="payment-date">
        📅 Vence: {payment.dueDate}
      </div>

      {payment.isOverdue && (
        <div className="overdue-notice">
          ⚠️ Pago Vencido
          <p>Este pago está atrasado. Procesa el pago lo antes posible.</p>
        </div>
      )}

      <div className="payment-actions">
        <button 
          className="btn btn-primary"
          onClick={() => onPay(payment.id)}
        >
          💳 Pagar
        </button>
        <button 
          className="btn btn-secondary"
          onClick={() => onRemind(payment.id)}
        >
          Recordar
        </button>
      </div>
    </div>
  )
}
