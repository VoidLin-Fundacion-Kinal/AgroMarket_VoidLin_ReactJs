import { useState } from "react";
import Swal from 'sweetalert2';
import { loginRequest } from './../services/api.js';
import { useNavigate } from "react-router-dom";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const login = async (username, password) => {
    setIsLoading(true);

    try {
      const user = {
        userLogin: username,
        password
      };

      const response = await loginRequest(user);

      const { token, loggedUser } = response;

      if (!loggedUser || !loggedUser.role) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'No se pudo identificar el rol del usuario',
        });
        return;
      }

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(loggedUser));

      switch (loggedUser.role) {
        case 'ADMINPLATAFORM':
          navigate('/home');
          break;
        case 'USUARIO':
          navigate('/home'); // cambia según rutas reales
          break;
        default:
          navigate('/');
      }

    } catch (error) {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Usuario o contraseña incorrectos. Intenta de nuevo.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    login,
    isLoading
  };
};
