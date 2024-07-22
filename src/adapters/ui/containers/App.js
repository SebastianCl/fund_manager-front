import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container } from '@mui/material';
import FundSubscription from '../components/FundSubscription';
import FundCancellation from '../components/FundCancellation';
import TransactionHistory from '../components/TransactionHistory';
import userRepository from '../../../ports/userRepository';
import '../../../App.css';

function App() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await userRepository.getUserById(1);
            setUser(userData);
        };

        fetchUser();
    }, []);

    return (
        <Router>
            <AppBar position="static">
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Gestor de fondos
                    </Typography>
                    {user && (
                        <Typography variant="h6" style={{ marginRight: '1rem' }}>
                            {user.name} - {user.amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}
                        </Typography>
                    )}
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
