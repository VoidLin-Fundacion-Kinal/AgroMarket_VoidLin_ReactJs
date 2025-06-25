import { useState } from 'react'
import Swal from 'sweetalert2'
import { registerRequest } from './../services/api.js'

export const useRegister = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const register = async (userData) => {
    setIsLoading(true);
    setError(false);

    try {
      const response = await registerRequest(userData);

      
      if (response.error) {
        throw response.error;
      }

      Swal.fire({
        icon: 'success',
        title: '¡Registrado!',
        text: 'Usuario creado satisfactoriamente, Inicie Sesión. 🙌',
      });

      setIsLoading(false);
      return response;
      
    } catch (err) {
      setError(true);
      setIsLoading(false);

      if (err?.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        const errorsList = err.response.data.errors.map(e => e.msg || JSON.stringify(e)).join('\n');
        return Swal.fire({
          icon: 'error',
          title: 'Errores de validación',
          html: errorsList.replace(/\n/g, '<br/>'),
        });
      }

      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Error general al intentar registrar el usuario. Intente de nuevo.';

      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
      });
    }
  };

  return {
    register,
    isLoading,
    error,
    setError,
  };
};
