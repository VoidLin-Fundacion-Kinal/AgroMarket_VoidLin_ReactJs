import React, { useState } from 'react';
import styled from 'styled-components';
import { Login } from '../../components/Auth/Login';
import { Register } from '../../components/Auth/Register';

const AuthContainer = styled.div`
  
`;

export const AuthPages = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);

  const switchAuthHandler = () => {
    setIsLoginActive(prevState => !prevState);
  };

  return (
    <AuthContainer>
      {isLoginActive ? (
        <Login onSwitch={switchAuthHandler} />
      ) : (
        <Register onSwitch={switchAuthHandler} />
      )}
    </AuthContainer>
  );
};

export const AuthPagesRegister = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);

  const switchAuthHandler = () => {
    setIsLoginActive(prevState => !prevState);
  };

  return (
    <AuthContainer>
      {isLoginActive ? (
        <Register onSwitch={switchAuthHandler} />
      ) : (
        <Login onSwitch={switchAuthHandler} />
      )}
    </AuthContainer>
  );
};

export default AuthPages;
