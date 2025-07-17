import { createContext, useState } from "react";
import type { PaymentsContextType, Payment } from "../types/Payment";
import { mockPayments } from "../utils/mockData";

// Valores por defecto para el contexto
const defaultContext: PaymentsContextType = {
    openForm: false,
    payments: [],
    pendingCount: 0,
    overdueCount: 0,
    handlePay: () => {},
    handleRemind: () => {},
    addPayment: () => {},
    toggleForm: () => {}
};

const PaymentsContext = createContext<PaymentsContextType>(defaultContext);

const PaymentsProvider = ({ children }: { children: React.ReactNode }) => {
    // Estado para controlar la visibilidad del formulario de creación de pagos
    const [openForm, setOpenForm] = useState(false);

    // Inicializamos el estado de los pagos
    const [payments, setPayments] = useState<Payment[]>(mockPayments);

    const toggleForm = () => {
        setOpenForm(!openForm);
    };

    const pendingCount = payments.filter(p => p.status === 'pendiente').length
    const overdueCount = payments.filter(p => p.status === 'vencido').length

    // Función para avisar que un pago ha sido realizado
    // (en este caso, simplemente lo eliminamos de la lista)
    const handlePay = (id: string) => {
        setPayments(payments.filter(p => p.id !== id));
    };

    const handleRemind = (id: string) => {
        const payment = payments.find(p => p.id === id);
        if (payment) {
            alert(`Recordatorio enviado para el pago: ${payment.title}`);
        }
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
            openForm,
            payments,
            pendingCount,
            overdueCount,
            handlePay,
            handleRemind,
            addPayment,
            toggleForm
        }}>
            {children}
        </PaymentsContext.Provider>
    );
};

export { PaymentsContext, PaymentsProvider };