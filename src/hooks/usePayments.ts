import { useState } from 'react'
import type { Payment } from '../types/Payment'
import { mockPayments } from '../utils/mockData'

export const usePayments = () => {
  const [payments, setPayments] = useState<Payment[]>(mockPayments)

  const pendingCount = payments.filter(p => p.status === 'pendiente').length
  const overdueCount = payments.filter(p => p.status === 'vencido').length

  const handlePay = (id: string) => {
    setPayments(payments.filter(p => p.id !== id))
  }

  const handleRemind = (_id: string) => {
    // Aquí puedes implementar la lógica de recordatorio
    alert('Recordatorio configurado')
  }

  const addPayment = (payment: Omit<Payment, 'id'>) => {
    const newPayment: Payment = {
      ...payment,
      id: self.crypto.randomUUID()
    }
    setPayments([...payments, newPayment])
  }

  return {
    payments,
    pendingCount,
    overdueCount,
    handlePay,
    handleRemind,
    addPayment
  }
}
