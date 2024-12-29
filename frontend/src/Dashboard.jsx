import React, { useEffect, useState } from 'react';
import api from './api';

const Dashboard = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await api.get('/api/current-user');
        setUser(response.data);
      } catch (error) {
        console.error('No autenticado:', error);
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  const handleLogout = async () => {
    try {
      await api.get('/api/logout');
      setUser(null);
    } catch (error) {
      console.error('Error al cerrar sesión:', error);
    }
  };

  if (!user) {
    return <p>No autenticado. Por favor, inicia sesión.</p>;
  }

  return (
    <div>
      <h1>Bienvenido, {user.email}</h1>
      <button onClick={handleLogout}>Cerrar sesión</button>
    </div>
  );
};

export default Dashboard;
