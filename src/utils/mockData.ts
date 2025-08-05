import type { Payment } from '../types/Payment'
import { PAYMENT_CATEGORIES, PAYMENT_STATUS } from '../constants/payments'

export const mockPayments: Payment[] = [
  {
    id: self.crypto.randomUUID(),
    title: 'Pago ejemplo 1',
    description: 'Descripción del pago 1',
    amount: 65000, // Monto en pesos
    dueDate: '14 ene 2024',
    category: PAYMENT_CATEGORIES.ENTERTAINMENT,
    status: PAYMENT_STATUS.PENDING
  }
]
