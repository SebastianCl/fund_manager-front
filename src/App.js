import React from 'react';
import FundSubscription from './components/FundSubscription';
import FundCancellation from './components/FundCancellation';
import TransactionHistory from './components/TransactionHistory';
import { Container, Typography } from '@mui/material';
import './App.css';

function App() {
  return (
    <Container>
      <Typography variant="h1" align="center" gutterBottom>
        FPV - Fondo Voluntario de Pensión
      </Typography>
      <FundSubscription />
      <FundCancellation />
      <TransactionHistory />
    </Container>
  );
}

export default App;
