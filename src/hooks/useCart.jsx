// hooks/useCart.js
import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserCart } from '../services/api';

const useCart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      setLoading(true);
      const response = await getUserCart();

      if (response.data.success) {
        setCart(response.data.cart);
      } else {
        setCart(null);
        setError('Cart not found');
      }


    } catch (err) {
      console.error(err);
      setError('Error fetching cart');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return { cart, loading, error, refresh: fetchCart };
};

export default useCart;
