import { createContext, useState } from "react";
import type { PaymentsContextType, Payment } from "../types/Payment";
import { mockPayments } from "../utils/mockData";

const PaymentsContext = createContext<PaymentsContextType | null>(null);

const PaymentsProvider = ({ children }: { children: React.ReactNode }) => {
    // Inicializamos el estado de los pagos
    const [payments, setPayments] = useState<Payment[]>(mockPayments);

    const pendingCount = payments.filter(p => p.status === 'pendiente').length
    const overdueCount = payments.filter(p => p.status === 'vencido').length

    // Función para avisar que un pago ha sido realizado
    // (en este caso, simplemente lo eliminamos de la lista)
    const handlePay = (id: string) => {
        setPayments(payments.filter(p => p.id !== id));
    };

    const addPayment = (payment: Omit<Payment, 'id'>) => {
        const newPayment: Payment = {
            ...payment,
            id: self.crypto.randomUUID()
        };
        setPayments([...payments, newPayment]);
    };

    return (
        <PaymentsContext.Provider value={{
            openForm: false,
            payments,
            pendingCount,
            overdueCount,
            handlePay,
            addPayment
        }}>
            {children}
        </PaymentsContext.Provider>
    );
};

export { PaymentsContext, PaymentsProvider };