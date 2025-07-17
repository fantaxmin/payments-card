import { PAYMENT_CATEGORIES } from "../../../constants/payments";
import "../../../styles/components/FormPaymentCard.css";

export const FormPaymentCard = () => {
    return (
        <section className="form-overlay">
            <form className="form-payment">
                <input 
                    type="text" 
                    placeholder="Título" 
                    required
                />
                <input 
                    type="text" 
                    placeholder="Descripción" 
                    required
                />
                <input 
                    type="number" 
                    placeholder="Monto" 
                    step="0.01" 
                    min="0"
                    required
                />
                <input 
                    type="date" 
                    placeholder="Fecha de Vencimiento" 
                    required
                />
                <select required>
                    <option value="">Seleccionar categoría</option>
                    <option value={PAYMENT_CATEGORIES.ENTERTAINMENT}>{PAYMENT_CATEGORIES.ENTERTAINMENT}</option>
                    <option value={PAYMENT_CATEGORIES.BASIC_SERVICES}>{PAYMENT_CATEGORIES.BASIC_SERVICES}</option>
                    <option value={PAYMENT_CATEGORIES.TELECOMMUNICATIONS}>{PAYMENT_CATEGORIES.TELECOMMUNICATIONS}</option>
                    <option value={PAYMENT_CATEGORIES.UTILITIES}>{PAYMENT_CATEGORIES.UTILITIES}</option>
                    <option value={PAYMENT_CATEGORIES.SUBSCRIPTIONS}>{PAYMENT_CATEGORIES.SUBSCRIPTIONS}</option>
                </select>
                <button type="submit">Crear Pago</button>
            </form>
        </section>
    );
}