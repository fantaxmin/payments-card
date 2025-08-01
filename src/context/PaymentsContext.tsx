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

    // Función para enviar un recordatorio de pago
    const handleRemind = (id: string) => {
        const payment = payments.find(p => p.id === id);
        if (payment) {
            checkPermissionNotification();
            checkServiceWorker();
            
            console.warn(`Recordatorio enviado para el pago: ${payment.title}`);
        }
    };

    const addPayment = (payment: Omit<Payment, 'id' | 'isOverdue'>) => {
        const newPayment: Payment = {
            ...payment,
            id: self.crypto.randomUUID(),
            status: 'pendiente',
            isOverdue: new Date(payment.dueDate) < new Date() // Determina
        };
        setPayments([...payments, newPayment]);
    };

    const checkPermissionNotification = () => {
        console.log("Comprobando permisos para enviar notificación...");
        const permissionThatHave = Notification.permission 
        
        if( permissionThatHave === 'denied'|| permissionThatHave === 'default' ){
            Notification.requestPermission()
            .then((result) => console.log('permission that I have = ', result));
        }
    };

    const checkServiceWorker = () => {
        if ('serviceWorker' in navigator) {
            navigator.serviceWorker.register('/public/sw.js')
                                .then((registration) => console.log('Service Worker registrado con éxito:', registration))
                                .catch((error) => console.error('Error al registrar el Service Worker:', error));
        }
    }

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