import transactionRepository from '../../ports/transactionRepository';

const getTransactionsHistoryUseCase = async () => {
    return await transactionRepository.getTransactions();
};

export default getTransactionsHistoryUseCase;
