import { useState, useEffect } from 'react';
import { getListCartIdNew } from '../services/api';

const useUserCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCart = async () => {
    try {
      const response = await getListCartNew();
      console.log('API Response:', response);  // Muestra la respuesta de la API
      if (response.success) {
         setCart(response.cart);
      } else {
        setError(response.message || 'No se pudo obtener el carrito.');
      }
    } catch (err) {
      setError('Error al obtener el carrito.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // Este useEffect se ejecuta cada vez que `cart` cambie
  useEffect(() => {
    console.log('Updated cart:', cart);  // Muestra el carrito después de la actualización
  }, [cart]);  // Solo se ejecuta cuando `cart` cambia

  return { cart, loading, error };
};

export default useUserCart;

