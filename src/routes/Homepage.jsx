import React from 'react';
import { useHistory } from 'react-router-dom';
const Homepage = () => {
  const history = useHistory();
  const logout = () => {
    localStorage.clear();
    history.push('/login');
  };
  return (
    <div>
      <h1>Homepage</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

export default Homepage;
