import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField } from '@mui/material';

function FundCancellation() {
    const [transactionId, setTransactionId] = useState('');

    const handleCancellation = () => {
        const cancellationData = {
            transaction_id: transactionId
        };

        axios.post('http://localhost:8000/cancel_a_found', cancellationData)
            .then(response => {
                console.log('Cancelled successfully:', response.data);
            })
            .catch(error => {
                console.error('Error cancelling subscription:', error);
            });
    };

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <h2>Cancelar Suscripción a un Fondo</h2>
            <TextField
                type="text"
                label="ID de Transacción"
                value={transactionId}
                onChange={(e) => setTransactionId(e.target.value)}
                fullWidth
                margin="normal"
            />
            <Button variant="contained" color="primary" onClick={handleCancellation} fullWidth>
                Cancelar Suscripción
            </Button>
        </Box>
    );
}

export default FundCancellation;
