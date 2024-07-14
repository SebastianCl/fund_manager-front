import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, TextField, MenuItem, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel } from '@mui/material';

function FundSubscription() {
    const [funds, setFunds] = useState([]);
    const [selectedFund, setSelectedFund] = useState('');
    const [amount, setAmount] = useState('');
    const [notificationMethod, setNotificationMethod] = useState('email');

    useEffect(() => {
        axios.get('http://localhost:8000/funds')
            .then(response => {
                setFunds(response.data);
            })
            .catch(error => {
                console.error('Error fetching funds:', error);
            });
    }, []);

    const handleSubscription = () => {
        const subscriptionData = {
            user_id: 1, // Se puede obtener dinámicamente
            fund_id: selectedFund,
            amount: parseInt(amount)
        };

        axios.post('http://localhost:8000/join_a_found', subscriptionData)
            .then(response => {
                console.log('Subscribed successfully:', response.data);
                // Enviar notificación...
            })
            .catch(error => {
                console.error('Error subscribing:', error);
            });
    };

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <h2>Suscribirse a un Nuevo Fondo</h2>
            <TextField
                select
                label="Seleccione un fondo"
                value={selectedFund}
                onChange={(e) => setSelectedFund(e.target.value)}
                fullWidth
                margin="normal"
            >
                {funds.map(fund => (
                    <MenuItem key={fund.fund_id} value={fund.fund_id}>
                        {fund.name}
                    </MenuItem>
                ))}
            </TextField>
            <TextField
                type="number"
                label="Cantidad"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                margin="normal"
            />
            <FormControl component="fieldset" margin="normal">
                <FormLabel component="legend">Método de Notificación</FormLabel>
                <RadioGroup
                    value={notificationMethod}
                    onChange={(e) => setNotificationMethod(e.target.value)}
                >
                    <FormControlLabel value="email" control={<Radio />} label="Email" />
                    <FormControlLabel value="sms" control={<Radio />} label="SMS" />
                </RadioGroup>
            </FormControl>
            <Button variant="contained" color="primary" onClick={handleSubscription} fullWidth>
                Suscribirse
            </Button>
        </Box>
    );
}

export default FundSubscription;
