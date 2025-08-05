import type { Payment } from '../../../types/Payment'
import '../../../styles/components/PaymentCard.css'
import '../../../styles/components/Button.css'

interface PaymentCardProps {
  payment: Payment
  onPay: (id: string) => void
  onRemind: (id: string) => void
  onEdit: (id: string) => void
}

export const PaymentCard = ({ payment, onPay, onRemind, onEdit }: PaymentCardProps) => {
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
          <p>Este pago está pronto a vencer. Procesa el pago lo antes posible.</p>
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
        <button 
          className="btn btn-edit"
          onClick={() => onEdit(payment.id)}
        >
          <span className="btn-edit-content">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#007aff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4 12.5-12.5z"/></svg>
            Editar
          </span>
        </button>
      </div>
    </div>
  )
}
