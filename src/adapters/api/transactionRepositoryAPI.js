import apiConfig from '../../config/apiConfig';

const transactionRepositoryAPI = {
    getTransactions: async () => {
        const response = await fetch(`${apiConfig.baseUrl}/transactions`);
        if (!response.ok) {
            throw new Error('Error al cargar los datos de las transacciones');
        }
        const transactionsData = await response.json();
        transactionsData.sort((a, b) => new Date(b.date) - new Date(a.date))

        return transactionsData
    },

    postTransactionJoin: async (subscriptionData) => {
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
