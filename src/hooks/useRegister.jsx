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

      setIsLoading(false);
      return response;
      
    } catch (err) {
      setError(true);
      setIsLoading(false);

      if (err?.response?.data?.errors && Array.isArray(err.response.data.errors)) {
        const errorsList = err.response.data.errors.map(e => e.msg || JSON.stringify(e)).join('\n');
        await Swal.fire({
          icon: 'error',
          title: 'Errores de validación',
          html: `<div class="text-left">${errorsList.replace(/\n/g, '<br/>')}</div>`,
          confirmButtonText: 'Entendido',
          confirmButtonColor: '#3085d6'
        });
        throw new Error('Errores de validación encontrados');
      }

      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Error general al intentar registrar el usuario. Intente de nuevo.';

      await Swal.fire({
        icon: 'error',
        title: 'Error al registrar',
        text: message,
        confirmButtonText: 'Entendido',
        confirmButtonColor: '#3085d6'
      });
      
      throw new Error(message);
    }
  };

  return {
    register,
    isLoading,
    error,
    setError,
  };
};
