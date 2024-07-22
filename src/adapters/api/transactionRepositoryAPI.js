import apiConfig from '../../config/apiConfig';
import Transaction from '../../core/entities/Transaction';

const transactionRepositoryAPI = {
    getTransactions: async () => {
        const response = await fetch(`${apiConfig.baseUrl}/transactions`);
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

    postTransactions: async (subscriptionData) => {
        const response = await fetch(`${apiConfig.baseUrl}/join_a_found`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(subscriptionData)
        })
        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.detail || 'Error al unirse al fondo');
        }
    },
};

export default transactionRepositoryAPI;
