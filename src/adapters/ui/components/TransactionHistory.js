import React, { useState, useEffect } from 'react';
import transactionRepository from '../../../ports/transactionRepository';

function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        const fetchTransactions = async () => {
            const data = await transactionRepository.getTransactions();
            setTransactions(data);
        };

        fetchTransactions();
    }, []);

    return (
        <div>
            <h2>Transaction History</h2>
            <ul>
                {transactions.map((transaction) => (
                    <li key={transaction.transaction_id}>
                        {transaction.transaction_id} - {transaction.amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })} - {new Date(transaction.date).toLocaleString()}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default TransactionHistory;
