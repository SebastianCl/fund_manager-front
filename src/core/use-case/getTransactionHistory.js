import transactionRepository from '../../ports/transactionRepository';

const getTransactions = async () => {
    return await transactionRepository.getTransactions();
};

export default getTransactions;
