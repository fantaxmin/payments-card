import { createContext, useState, useEffect } from "react";
import type { PaymentsContextType, Payment } from "../types/Payment";
import { mockPayments } from "../utils/mockData";
import { getPayments, savePayments } from '../services/paymentsStorage';

// Valores por defecto para el contexto
const defaultContext: PaymentsContextType = {
    openForm: false,
    payments: [],
    pendingCount: 0,
    overdueCount: 0,
    paymentToEdit: null,
    handlePay: () => {},
    handleRemind: () => {},
    handleEdit: () => {},
    addPayment: () => {},
    updatePayment: () => {},
    toggleForm: () => {}
};

const PaymentsContext = createContext<PaymentsContextType>(defaultContext);

const PaymentsProvider = ({ children }: { children: React.ReactNode }) => {
    // Estado para controlar la visibilidad del formulario de creación de pagos
    const [openForm, setOpenForm] = useState(false);

    // Estado para el pago que se está editando
    const [paymentToEdit, setPaymentToEdit] = useState<Payment | null>(null);

    // Estado de los pagos
    const [payments, setPayments] = useState<Payment[]>([]);
    // Cargar pagos desde localStorage al montar
    useEffect(() => {
        (async () => {
            const stored = await getPayments();
            if (stored.length > 0) {
                setPayments(stored);
            } else {
                setPayments(mockPayments);
                await savePayments(mockPayments);
            }
        })();
    }, []);

    // Guardar pagos en localStorage cada vez que cambian
    useEffect(() => {
        savePayments(payments);
    }, [payments]);

    const toggleForm = () => {
        setOpenForm(!openForm);
    };

    const pendingCount = payments.filter(p => p.status === 'pendiente').length
    const overdueCount = payments.filter(p => p.status === 'vencido').length

    // Función para avisar que un pago ha sido realizado
    // (en este caso, simplemente lo eliminamos de la lista)
    const handlePay = (id: string) => {
        setPayments(prev => prev.filter(p => p.id !== id));
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
            isOverdue: new Date(payment.dueDate) < new Date()
        };
        setPayments(prev => [...prev, newPayment]);
        setOpenForm(false);
        setPaymentToEdit(null);
    };

    const updatePayment = (id: string, payment: Omit<Payment, 'id'>) => {
        setPayments(prev => prev.map(p => 
            p.id === id 
                ? { ...payment, id, isOverdue: new Date(payment.dueDate) < new Date() }
                : p
        ));
        setOpenForm(false);
        setPaymentToEdit(null);
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

    const handleEdit = (id: string) => {
        try {
            const payment = payments.find(p => p.id === id);
            if (payment) {
                setPaymentToEdit(payment);
                setOpenForm(true);
            }
        } catch (error) {
            console.error('Error al editar el pago:', error);
        }
    }

    return (
        <PaymentsContext.Provider value={{
            openForm,
            payments,
            pendingCount,
            overdueCount,
            paymentToEdit,
            handlePay,
            handleRemind,
            handleEdit,
            addPayment,
            updatePayment,
            toggleForm
        }}>
            {children}
        </PaymentsContext.Provider>
    );
};

export { PaymentsContext, PaymentsProvider };