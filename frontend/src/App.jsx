import React, { useState } from 'react';
import LoginButton from './LoginButton.jsx';
import Dashboard from './Dashboard.jsx';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    <div>
      {isLoggedIn ? <Dashboard /> : <LoginButton />}
    </div>
  );
};

export default App;
