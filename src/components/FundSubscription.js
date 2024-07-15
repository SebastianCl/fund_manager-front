import React, { useState, useEffect } from 'react';
import { Box, Button, TextField, MenuItem, FormControl, FormLabel, RadioGroup, Radio, FormControlLabel, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';

function FundSubscription() {
    const [funds, setFunds] = useState([]);
    const [selectedFund, setSelectedFund] = useState('');
    const [amount, setAmount] = useState('');
    const [notificationMethod, setNotificationMethod] = useState('email');
    const [minimumAmount, setMinimumAmount] = useState(0);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState({});

    useEffect(() => {
        const fetchFundsData = async () => {
            try {
                const response = await fetch(`${process.env.REACT_APP_API}/funds`);
                if (!response.ok) {
                    throw new Error('Error al cargar los fondos');
                }
                const fundsData = await response.json();
                fundsData.sort((a, b) => b.amount - a.amount);
                setFunds(fundsData)
            } catch (error) {
                console.error('Error al obtener datos de los fondos:', error.message);
            }
        }
        fetchFundsData();
    }, []);

    const handleFundChange = (fundId) => {
        setSelectedFund(fundId);
        const selectedFundObj = funds.find(fund => fund.fund_id === fundId);
        if (selectedFundObj) {
            setMinimumAmount(selectedFundObj.minimum_amount);
        }
    };

    const handleSubscription = async () => {
        if (parseInt(amount) < minimumAmount) {
            setDialogContent({
                title: 'Error de Suscripción',
                message: `El monto ingresado (${amount}) debe ser mayor o igual al mínimo permitido (${minimumAmount})`
            });
            setDialogOpen(true);
            return;
        }

        const subscriptionData = {
            user_id: 1,
            fund_id: selectedFund,
            amount: parseInt(amount),
            notification: notificationMethod
        };

        try {
            const response = await fetch(`${process.env.REACT_APP_API}/join_a_found`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(subscriptionData)
            })

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Error al cancelar la suscripción');
            }
            setDialogContent({
                title: 'Suscripción Exitosa',
                message: `¡Te has suscrito al fondo correctamente!`
            });
            setDialogOpen(true);
        } catch (error) {
            console.error('Error cancelling subscription:', error);
            setDialogContent({
                title: 'Error de Suscripción',
                message: `Hubo un error al intentar suscribirse: ${error.message}`
            });
            setDialogOpen(true);

        }

    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setDialogContent({});
    };

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <h2>Suscribirse a un Nuevo Fondo</h2>
            <TextField
                select
                label="Seleccione un fondo"
                value={selectedFund}
                onChange={(e) => handleFundChange(e.target.value)}
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
                label={`Cantidad (mínimo: ${minimumAmount})`}
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                fullWidth
                margin="normal"
                inputProps={{ min: minimumAmount }}
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

            <Dialog open={dialogOpen} onClose={handleCloseDialog}>
                <DialogTitle>{dialogContent.title}</DialogTitle>
                <DialogContent>
                    <Typography>{dialogContent.message}</Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseDialog} color="primary">
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}

export default FundSubscription;
