import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Snackbar } from '@mui/material';
import MuiAlert from '@mui/material/Alert';
import FundSubscription from './components/FundSubscription';
import FundCancellation from './components/FundCancellation';
import TransactionHistory from './components/TransactionHistory';
import './App.css';

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function App() {
  const [userData, setUserData] = useState(null);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [snackbarMessage, setSnackbarMessage] = useState('');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_API}/users/1`);
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

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  const handleSnackbar = (severity, message) => {
    setSnackbarSeverity(severity);
    setSnackbarMessage(message);
    setSnackbarOpen(true);
  };

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
          <Route path="/subscribe" element={<FundSubscription handleSnackbar={handleSnackbar} />} />
          <Route path="/cancel" element={<FundCancellation handleSnackbar={handleSnackbar} />} />
          <Route path="/history" element={<TransactionHistory />} />
          <Route path="/" element={
            <Typography variant="h4" align="center" gutterBottom>
              Hola {userData ? userData.name : ''}, saldo disponible: {userData ? formatCurrency(userData.amount) : ''}
            </Typography>
          } />
        </Routes>
      </Container>

      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Router>
  );
}

export default App;
