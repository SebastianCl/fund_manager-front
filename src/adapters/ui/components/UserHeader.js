import React, { useEffect, useState } from 'react';
import getUser from '../../../core/use-case/getUser';

const UserHeader = () => {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUser = async () => {
            const userData = await getUser(1);
            setUser(userData);
        };
        fetchUser();
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
