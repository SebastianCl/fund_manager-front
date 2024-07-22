import apiConfig from '../../config/apiConfig';
import Transaction from '../../core/entities/Transaction';

const transactionRepositoryAPI = {
    getTransactions: async () => {
        const response = await fetch(`${apiConfig.REACT_APP_API}/transactions`);
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

export default transactionRepositoryAPI;
