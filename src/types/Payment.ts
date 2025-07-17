export interface Payment {
  id: string
  title: string
  description: string
  amount: number
  dueDate: string
  category: string
  status: 'pendiente' | 'vencido'
  isOverdue?: boolean
}

export type PaymentStatus = 'pendiente' | 'vencido'

export interface PaymentsContextType {
  openForm: boolean
}
