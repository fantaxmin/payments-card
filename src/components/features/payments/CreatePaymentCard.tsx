import { useContext } from 'react';
import { PaymentsContext } from '../../../context/PaymentsContext';
import '../../../styles/components/CreatePaymentCard.css';

export const CreatePaymentCard = () => {

    const { toggleForm } = useContext(PaymentsContext)!;

    return (
        <section className="action-section">
            <button className="btn-action" onClick={toggleForm}>
                + Añadir Pago
            </button>
        </section>
    );
}