const transactionRepository = {
    getTransactions: async () => {
        throw new Error('No implementado');
    },
    postTransactionJoin: async (subscriptionData) => {
        throw new Error('No implementado');
    },
    postTransactionCancel: async (cancellationData) => {
        throw new Error('No implementado');
    },
};

export default transactionRepository;
