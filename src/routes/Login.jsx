import jwt from 'jsonwebtoken';
import React from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
  const history = useHistory();
  const login = () => {
    const token = jwt.sign({ user: 'testx' }, 'nfjienwfijnw8u8939rhuf3buf9', {
      expiresIn: '10s',
    });
    localStorage.setItem('token', token);
    history.push('/home');
  };
  return (
    <div>
      <button onClick={login}>Login</button>
    </div>
  );
};

export default Login;
