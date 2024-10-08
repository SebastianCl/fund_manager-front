import { Box, List, Card, CardContent, Typography, Divider, CircularProgress } from '@mui/material';
import React, { useState, useEffect } from 'react';
import getTransactionsHistoryUseCase from '../../../core/use-case/getTransactionsHistoryUseCase';
import getAllFundsUseCase from '../../../core/use-case/getAllFundsUseCase'

function TransactionHistory() {
    const [transactions, setTransactions] = useState([]);
    const [funds, setFunds] = useState([]);
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const getTransactions = async () => {
            try {
                const transactionsData = await getTransactionsHistoryUseCase()
                setTransactions(transactionsData);
            } catch (error) {
                console.error('Error al obtener las transacciones:', error);
            }
        };

        const fetchFunds = async () => {
            try {
                const fundsData = await getAllFundsUseCase()
                setFunds(fundsData);
                setLoading(false);
            } catch (error) {
                console.error('Error al obtener los fondos funds:', error);
                setLoading(false);
            }
        };

        getTransactions();
        fetchFunds();
    }, []);

    const getFundName = (fundId) => {
        const fund = funds.find(f => f.fund_id === fundId);
        return fund ? fund.name : 'Unknown Fund';
    };

    const formatCurrency = (amount) => {
        return new Intl.NumberFormat('es-CO', { style: 'currency', currency: 'COP' }).format(amount);
    };

    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('es-CO', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        }).format(date);
    };

    if (loading) {
        return (
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ maxWidth: 800, margin: 'auto', padding: 2 }}>
            <Typography variant="h4" gutterBottom align="center">
                Historial de Transacciones
            </Typography>
            <List>
                {transactions.map((transaction, index) => (
                    <Card key={index} sx={{ marginBottom: 2 }}>
                        <CardContent>
                            <Typography variant="h6">
                                {transaction.type === 'apertura' ? 'Apertura' : 'Cancelación'} en {getFundName(transaction.fund_id)}
                            </Typography>
                            <Divider sx={{ marginY: 1 }} />
                            <Typography variant="body2" color="textSecondary">
                                ID de Transacción: {transaction.transaction_id}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Fecha: {formatDate(transaction.date)}
                            </Typography>
                            <Typography variant="body2" color="textSecondary">
                                Monto: {formatCurrency(transaction.amount)}
                            </Typography>
                        </CardContent>
                    </Card>
                ))}
            </List>
        </Box>
    );
}

export default TransactionHistory;
