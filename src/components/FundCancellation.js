import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, TextField, Dialog, DialogTitle, DialogContent, DialogActions, Typography } from '@mui/material';

function FundCancellation() {
    const [transactionId, setTransactionId] = useState('');
    const [dialogOpen, setDialogOpen] = useState(false);
    const [dialogContent, setDialogContent] = useState({});

    const handleCancellation = () => {
        const cancellationData = {
            transaction_id: transactionId
        };

        axios.post('http://localhost:8000/cancel_a_found', cancellationData)
            .then(response => {
                console.log('Cancelled successfully:', response.data);
                setDialogContent({
                    title: 'Cancelación Exitosa',
                    message: '¡Se ha cancelado la suscripción al fondo correctamente!'
                });
                setDialogOpen(true);
            })
            .catch(error => {
                console.error('Error cancelling subscription:', error);
                if (error.response && error.response.data && error.response.data.detail) {
                    setDialogContent({
                        title: 'Error de Cancelación',
                        message: `Error: ${error.response.data.detail}`
                    });
                } else {
                    setDialogContent({
                        title: 'Error de Cancelación',
                        message: 'Hubo un error al intentar cancelar la suscripción.'
                    });
                }
                setDialogOpen(true);
            });
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setDialogContent({});
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

export default FundCancellation;
