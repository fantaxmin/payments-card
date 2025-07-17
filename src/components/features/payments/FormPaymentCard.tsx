import { useContext, useState } from "react";
import { PAYMENT_CATEGORIES } from "../../../constants/payments";
import { PaymentsContext } from "../../../context/PaymentsContext";
import type { Payment } from "../../../types/Payment";
import "../../../styles/components/FormPaymentCard.css";


export const FormPaymentCard = () => {

    const { addPayment, toggleForm } = useContext(PaymentsContext);
    const [haveError, setHaveError] = useState<boolean>(false);

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const formData = new FormData(event.currentTarget);
        for( const property of formData.entries() ){
            if ( property[1] === '' ) {
                setHaveError(true);
                return;
            }
        }
        const data : Omit<Payment, 'id'> = {
            title : String(formData.get('title')),
            description : String(formData.get('description')),
            amount : Number(formData.get('amount')),
            dueDate : String(formData.get('dueDate')),
            category : String(formData.get('category')),
            status : 'pendiente'
        };
        console.log('Nuevo pago creado:', data);
        addPayment(data);
        if( haveError ){
            setHaveError(false);
        }
        toggleForm();
    };

    return (
        <section className="form-overlay">
            <form className="form-payment" onSubmit={handleSubmit}>
                <h2>Crear pago</h2>
                <input
                    name="title" 
                    type="text" 
                    placeholder="Título"
                />
                <input 
                    name="description"
                    type="text" 
                    placeholder="Descripción" 
                />
                <input 
                    name="amount"
                    type="number" 
                    placeholder="Monto" 
                    step="0.01" 
                    min="0"
                />
                <label htmlFor="fechaVencimiento">
                    Fecha de Vencimiento
                </label>
                <input 
                    name="dueDate"
                    type="date" 
                    placeholder="Fecha de Vencimiento" 
                />
                <label htmlFor="category">
                    Categoría
                </label>
                <select name="category">
                    <option value="">Seleccionar categoría</option>
                    <option value={PAYMENT_CATEGORIES.ENTERTAINMENT}>{PAYMENT_CATEGORIES.ENTERTAINMENT}</option>
                    <option value={PAYMENT_CATEGORIES.BASIC_SERVICES}>{PAYMENT_CATEGORIES.BASIC_SERVICES}</option>
                    <option value={PAYMENT_CATEGORIES.TELECOMMUNICATIONS}>{PAYMENT_CATEGORIES.TELECOMMUNICATIONS}</option>
                    <option value={PAYMENT_CATEGORIES.UTILITIES}>{PAYMENT_CATEGORIES.UTILITIES}</option>
                    <option value={PAYMENT_CATEGORIES.SUBSCRIPTIONS}>{PAYMENT_CATEGORIES.SUBSCRIPTIONS}</option>
                </select>
                <button type="submit">Crear Pago</button>
                {
                    haveError && (
                        <div className="error-message">
                            <p className="error-message-text">Por favor valida la información proporcionada.</p>
                        </div>
                    )
                }
            </form>
        </section>
    );
}