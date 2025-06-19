// src/hooks/useUserCart.js
import { useState, useEffect } from 'react';
import { getUserCart } from '../services/api';

const useUserCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await getUserCart();
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

    fetchCart();
  }, []);

  return { cart, loading, error };
};

export default useUserCart;
