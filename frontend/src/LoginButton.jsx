import React from 'react';

const LoginButton = () => {
  const handleLogin = () => {
    window.location.href = 'http://localhost:3001/auth/google'; // URL de tu backend
  };

  return <button onClick={handleLogin}>Login with Google</button>;
};

export default LoginButton;
