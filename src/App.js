import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import FundSubscription from './components/FundSubscription';
import FundCancellation from './components/FundCancellation';
import TransactionHistory from './components/TransactionHistory';
import './App.css';

function App() {
  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Gestor de fondos
          </Typography>
          <Button color="inherit" component={Link} to="/subscribe">
            Suscribirse
          </Button>
          <Button color="inherit" component={Link} to="/cancel">
            Cancelar
          </Button>
          <Button color="inherit" component={Link} to="/history">
            Historial
          </Button>
        </Toolbar>
      </AppBar>
      <Container>
        <Routes>
          <Route path="/subscribe" element={<FundSubscription />} />
          <Route path="/cancel" element={<FundCancellation />} />
          <Route path="/history" element={<TransactionHistory />} />
          <Route path="/" element={
            <Typography variant="h4" align="center" gutterBottom>
              Bienvenido al Fondo Voluntario de Pensión
            </Typography>
          } />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
