import apiConfig from '../../config/apiConfig';
import Transaction from '../../core/entities/Transaction';

const fundCancelationRepositoryAPI = {
    getTransactions: async (cancellationData) => {
        const response = await fetch(`${apiConfig.baseUrl}/cancel_a_found`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(cancellationData)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al cancelar la suscripción');
        }
        const transactionsData = await response.json();
        return transactionsData.map((transaction) =>
            new Transaction(
                transaction.transaction_id,
                transaction.user_id,
                transaction.fund_id,
                transaction.amount,
                transaction.type,
                transaction.date
            )
        );
    },
};

export default fundCancelationRepositoryAPI;
