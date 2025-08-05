import { useContext, useState } from "react";
import { PAYMENT_CATEGORIES } from "../../../constants/payments";
import { PaymentsContext } from "../../../context/PaymentsContext";
import type { Payment } from "../../../types/Payment";
import "../../../styles/components/FormPaymentCard.css";


interface FormError {
    field: string;
    message: string;
}

export const FormPaymentCard = () => {
    const { addPayment, updatePayment, toggleForm, paymentToEdit } = useContext(PaymentsContext);
    const [errors, setErrors] = useState<FormError[]>([]);

    const validateForm = (formData: FormData): FormError[] => {
        const newErrors: FormError[] = [];
        
        // Validar campos vacíos
        for (const [field, value] of formData.entries()) {
            if (value === '') {
                newErrors.push({
                    field,
                    message: `El campo ${field} es requerido`
                });
            }
        }

        // Validar monto
        const amount = Number(formData.get('amount'));
        if (isNaN(amount) || amount <= 0) {
            newErrors.push({
                field: 'amount',
                message: 'El monto debe ser un número válido mayor a 0'
            });
        }

        // Validar fecha
        const dueDate = new Date(String(formData.get('dueDate')));
        if (isNaN(dueDate.getTime())) {
            newErrors.push({
                field: 'dueDate',
                message: 'La fecha debe ser válida'
            });
        }

        return newErrors;
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        
        // Validar el formulario
        const formErrors = validateForm(formData);
        if (formErrors.length > 0) {
            setErrors(formErrors);
            return;
        }

        try {
            const data: Omit<Payment, 'id'> = {
                title: String(formData.get('title')).trim(),
                description: String(formData.get('description')).trim(),
                amount: Number(formData.get('amount')),
                dueDate: String(formData.get('dueDate')),
                category: String(formData.get('category')),
                status: paymentToEdit?.status || 'pendiente'
            };

            if (paymentToEdit) {
                await updatePayment(paymentToEdit.id, data);
            } else {
                await addPayment(data);
            }

            setErrors([]);
            toggleForm();
        } catch (error) {
            console.error('Error al procesar el pago:', error);
            setErrors([{
                field: 'form',
                message: 'Error al procesar el formulario. Por favor, intenta de nuevo.'
            }]);
        }
    };

    return (
        <section className="form-overlay">
            <form className="form-payment" onSubmit={handleSubmit}>
                <h2>{paymentToEdit ? 'Editar pago' : 'Crear pago'}</h2>
                <input
                    name="title" 
                    type="text" 
                    placeholder="Título"
                    defaultValue={paymentToEdit?.title}
                />
                <input 
                    name="description"
                    type="text" 
                    placeholder="Descripción" 
                    defaultValue={paymentToEdit?.description}
                />
                <input 
                    name="amount"
                    type="number" 
                    placeholder="Monto" 
                    step="0.01" 
                    min="0"
                    defaultValue={paymentToEdit?.amount}
                />
                <label htmlFor="fechaVencimiento">
                    Fecha de Vencimiento
                </label>
                <input 
                    name="dueDate"
                    type="date" 
                    placeholder="Fecha de Vencimiento" 
                    defaultValue={paymentToEdit?.dueDate}
                />
                <label htmlFor="category">
                    Categoría
                </label>
                <select 
                    name="category"
                    defaultValue={paymentToEdit?.category}
                >
                    <option value="">Seleccionar categoría</option>
                    <option value={PAYMENT_CATEGORIES.ENTERTAINMENT}>{PAYMENT_CATEGORIES.ENTERTAINMENT}</option>
                    <option value={PAYMENT_CATEGORIES.BASIC_SERVICES}>{PAYMENT_CATEGORIES.BASIC_SERVICES}</option>
                    <option value={PAYMENT_CATEGORIES.TELECOMMUNICATIONS}>{PAYMENT_CATEGORIES.TELECOMMUNICATIONS}</option>
                    <option value={PAYMENT_CATEGORIES.UTILITIES}>{PAYMENT_CATEGORIES.UTILITIES}</option>
                    <option value={PAYMENT_CATEGORIES.SUBSCRIPTIONS}>{PAYMENT_CATEGORIES.SUBSCRIPTIONS}</option>
                </select>
                <button type="submit">
                    {paymentToEdit ? 'Guardar Cambios' : 'Crear Pago'}
                </button>
                {errors.length > 0 && (
                    <div className="error-message">
                        {errors.map((error, index) => (
                            <p key={index} className="error-message-text">
                                {error.message}
                            </p>
                        ))}
                    </div>
                )}
            </form>
        </section>
    );
}