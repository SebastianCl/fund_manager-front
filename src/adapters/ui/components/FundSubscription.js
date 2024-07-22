import React, { useState } from 'react';

function FundSubscription() {
    const [fundId, setFundId] = useState('');
    const [amount, setAmount] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Lógica para suscribirse a un fondo
    };

    return (
        <form onSubmit={handleSubmit}>
            <input
                type="text"
                value={fundId}
                onChange={(e) => setFundId(e.target.value)}
                placeholder="Fund ID"
            />
            <input
                type="text"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="Amount"
            />
            <button type="submit">Subscribe</button>
        </form>
    );
}

export default FundSubscription;
