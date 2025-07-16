import '../../styles/components/CreatePaymentCard.css';

export const CreatePaymentCard = () => {
    return (
        <section className="action-section">
            <button className="btn-action" onClick={() => alert('Crear nuevo pago')}>
                + Añadir Pago
            </button>
        </section>
    );
}