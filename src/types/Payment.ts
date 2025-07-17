export interface Payment {
  id: string
  title: string
  description: string
  amount: number
  dueDate: string
  category: string
  status: 'pendiente' | 'vencido'
  isOverdue?: boolean
};

export type PaymentStatus = 'pendiente' | 'vencido';

export interface PaymentsContextType {
  openForm: boolean;
  payments: Payment[];
  pendingCount: number;
  overdueCount: number;
  handlePay: (id: string) => void;
  handleRemind: (id: string) => void;
  addPayment: (payment: Omit<Payment, 'id'>) => void;
  toggleForm: () => void;
};
