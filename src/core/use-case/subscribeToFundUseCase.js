import transactionRepository from '../../ports/transactionRepository';

const subscribeToFundUseCase = async (subscriptionData) => {
    return await transactionRepository.postTransactionJoin(subscriptionData);
};

export default subscribeToFundUseCase;
