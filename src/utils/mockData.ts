import type { Payment } from '../types/Payment'
import { PAYMENT_CATEGORIES, PAYMENT_STATUS } from '../constants/payments'

export const mockPayments: Payment[] = [
  {
    id: self.crypto.randomUUID(),
    title: 'Netflix Premium',
    description: 'Suscripción mensual',
    amount: 15.99,
    dueDate: '14 ene 2024',
    category: PAYMENT_CATEGORIES.ENTERTAINMENT,
    status: PAYMENT_STATUS.PENDING
  },
  {
    id: self.crypto.randomUUID(),
    title: 'Electricidad',
    description: 'Factura de energía eléctrica',
    amount: 89.50,
    dueDate: '09 ene 2024',
    category: PAYMENT_CATEGORIES.BASIC_SERVICES,
    status: PAYMENT_STATUS.OVERDUE,
    isOverdue: true
  },
  {
    id: self.crypto.randomUUID(),
    title: 'Internet Fibra',
    description: 'Plan 100MB',
    amount: 45.00,
    dueDate: '19 ene 2024',
    category: PAYMENT_CATEGORIES.TELECOMMUNICATIONS,
    status: PAYMENT_STATUS.PENDING
  }
]
