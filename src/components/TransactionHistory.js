import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, List, ListItem, ListItemText } from '@mui/material';

function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/transactions')
            .then(response => {
                setTransactions(response.data);
            })
            .catch(error => {
                console.error('Error fetching transactions:', error);
            });
    }, []);

    return (
        <Box sx={{ maxWidth: 500, margin: 'auto', padding: 2, border: '1px solid #ccc', borderRadius: 2 }}>
            <h2>Historial de Transacciones</h2>
            <List>
                {transactions.map((transaction, index) => (
                    <ListItem key={index}>
                        <ListItemText
                            primary={`${transaction.type} en fondo ID ${transaction.fund_id}`}
                            secondary={`Fecha: ${transaction.date} - Monto: ${transaction.amount}`}
                        />
                    </ListItem>
                ))}
            </List>
        </Box>
    );
}

export default TransactionHistory;
