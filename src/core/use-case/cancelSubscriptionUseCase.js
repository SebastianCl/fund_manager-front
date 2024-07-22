import transactionRepository from '../../ports/transactionRepository';

const cancelSubscriptionUseCase = async (cancellationData) => {
    return await transactionRepository.postTransactionCancel(cancellationData);
};

export default cancelSubscriptionUseCase;
