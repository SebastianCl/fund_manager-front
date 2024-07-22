import React, { useEffect, useState } from 'react';
import getUserUseCase from '../../../core/use-case/getUserUseCase';

const UserHeader = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const getUserData = async () => {
            const userData = await getUserUseCase(1);
            setUser(userData);
        };
        getUserData();
    }, []);

    if (!user) {
        return <div>Cargando...</div>;
    }

    return (
        <div>
            <p>{user.name}, tu saldo disponible: {user.amount.toLocaleString('es-CO', { style: 'currency', currency: 'COP' })}</p>
        </div>
    );
};

export default UserHeader;
