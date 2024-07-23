import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import UserHeader from '../../../../adapters/ui/components/UserHeader';
import getUserUseCase from '../../../../core/use-case/getUserUseCase';

jest.mock('../../../../core/use-case/getUserUseCase');

const mockUser = {
    name: 'John Doe',
    amount: 1000000
};

test('renders user information', async () => {
    getUserUseCase.mockResolvedValue(mockUser);

    render(<UserHeader />);

    await waitFor(() => {
        expect(screen.getByText('John Doe')).toBeInTheDocument();
        expect(screen.getByText('tu saldo disponible: $1,000,000.00')).toBeInTheDocument();
    });
});
