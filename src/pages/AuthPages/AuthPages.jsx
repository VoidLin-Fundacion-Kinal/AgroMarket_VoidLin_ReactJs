import React, { useState } from 'react';
import styled from 'styled-components';
import { Login } from '../../components/Auth/Login';
import { Register } from '../../components/Auth/Register';
import Navbar from '../../components/Navbar/Navbar';
import Footer from '../../components/Footer/Footer';
import Home from '../Home/Home';

const AuthContainer = styled.div`
 
  
`;



export const AuthPages = () => {
  const [isLoginActive, setIsLoginActive] = useState(true);

 

  const switchAuthHandler = () => {
    setIsLoginActive(prevState => !prevState);
  };

  return (
    <AuthContainer>
      <Login />
    </AuthContainer>
  );
};

export default AuthPages;