import '../../../styles/components/CreatePaymentCard.css';

export const CreatePaymentCard = () => {

    const handleCreatePayment = () => {
        alert('Crear nuevo pago');
    };
    return (
        <section className="action-section">
            <button className="btn-action" onClick={handleCreatePayment}>
                + Añadir Pago
            </button>
        </section>
    );
}