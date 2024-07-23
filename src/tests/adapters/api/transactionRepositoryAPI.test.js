import transactionRepositoryAPI from '../../../adapters/api/transactionRepositoryAPI';

global.fetch = jest.fn(() =>
    Promise.resolve({
        ok: true,
        json: () => Promise.resolve([{
            transaction_id: '1',
            user_id: 1,
            fund_id: 1,
            amount: 500000,
            type: 'subscription',
            date: '2024-07-14T04:08:53.876795'
        }])
    })
);

test('fetch transactions', async () => {
    const transactions = await transactionRepositoryAPI.getTransactions();

    expect(transactions).toEqual([{
        transaction_id: '1',
        user_id: 1,
        fund_id: 1,
        amount: 500000,
        type: 'subscription',
        date: '2024-07-14T04:08:53.876795'
    }]);
    expect(fetch).toHaveBeenCalledWith('http://localhost:8000/transactions');
});
