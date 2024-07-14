import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import FundSubscription from './components/FundSubscription';
import FundCancellation from './components/FundCancellation';
import TransactionHistory from './components/TransactionHistory';
import './App.css';

function App() {
  const [userData, setUserData] = useState(null);

  useEffect(() => {

    const fetchUserData = async () => {
      try {
        const response = await fetch('http://localhost:8000/users/1'); // Ajustar URL según tu configuración de API
        if (!response.ok) {
          throw new Error('Error al cargar los datos del usuario');
        }
        const userData = await response.json();
        setUserData(userData);
      } catch (error) {
        console.error('Error al obtener datos del usuario:', error.message);
      }
    };

    fetchUserData();
  }, []);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('es-CO', {
      style: 'currency',
      currency: 'COP'
    }).format(amount);
  };

  return (
    <Router>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            Gestor de fondos
          </Typography>

          <Button color="inherit" component={Link} to="/">
            Home
          </Button>

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
              Hola
              {/* Hola {userData.name}, disponible: {formatCurrency(userData.amount)} { } */}
            </Typography>
          } />
        </Routes>
      </Container>
    </Router>
  );
}

export default App;
