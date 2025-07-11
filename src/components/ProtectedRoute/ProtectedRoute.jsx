import { useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import AccessDenied from '../AccessDenied/AccessDenied.jsx';

const ProtectedRoute = ({ children, requiredRole = 'ADMINPLATAFORM' }) => {
  const [isAuthorized, setIsAuthorized] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAuthorization = () => {
      try {
        const user = localStorage.getItem('user');
        const token = localStorage.getItem('token');

        if (!user || !token) {
          setIsAuthorized(false);
          setIsLoading(false);
          Swal.fire({
            icon: 'warning',
            title: 'Sesión requerida',
            text: 'Debes iniciar sesión para acceder a esta página.',
            confirmButtonText: 'Entendido'
          });
          return;
        }

        const userData = JSON.parse(user);
        
        if (userData.role === requiredRole) {
          setIsAuthorized(true);
        } else {
          setIsAuthorized(false);
          Swal.fire({
            icon: 'error',
            title: 'Acceso Denegado',
            text: 'No tienes permisos de administrador para acceder a esta página.',
            confirmButtonText: 'Entendido'
          });
        }
      } catch (error) {
        console.error('Error al verificar autorización:', error);
        setIsAuthorized(false);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Error al verificar permisos de usuario.',
          confirmButtonText: 'Entendido'
        });
      } finally {
        setIsLoading(false);
      }
    };

    checkAuthorization();
  }, [requiredRole]);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-green-600"></div>
      </div>
    );
  }

  if (!isAuthorized) {
    return <AccessDenied />;
  }

  return children;
};

export default ProtectedRoute; 