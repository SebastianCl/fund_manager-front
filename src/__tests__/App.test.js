import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';

global.fetch = jest.fn(() =>
    Promise.resolve({
        json: () => Promise.resolve({ user_id: 1, name: 'Usuario de Prueba', amount: 500000 }),
        ok: true,
    })
);

beforeEach(() => {
    fetch.mockClear();
});

describe('App Component', () => {
    it('renderiza sin fallar', async () => {
        render(<App />);
        // Verificar que el componente App se renderiza correctamente
        expect(screen.getByText('Gestor de fondos')).toBeInTheDocument();
    });

    it('recupera datos del usuario y muestra el nombre del usuario y la cantidad', async () => {
        render(<App />);
        await screen.findByText('Hola Usuario de Prueba,');
        await screen.findByText('saldo disponible: $ 50.000,00');
    });

    it('navega correctamente a las páginas Suscribirse, Cancelar e Historial', async () => {
        render(<App />);
        userEvent.click(screen.getByText('Suscribirse'));
        expect(screen.getByText('Suscribirse a un Nuevo Fondo')).toBeInTheDocument();

        userEvent.click(screen.getByText('Cancelar'));
        expect(screen.getByText('Cancelar Suscripción a un Fondo')).toBeInTheDocument();

        userEvent.click(screen.getByText('Historial'));
        expect(screen.getByText('Historial de Transacciones')).toBeInTheDocument();
    });
});
