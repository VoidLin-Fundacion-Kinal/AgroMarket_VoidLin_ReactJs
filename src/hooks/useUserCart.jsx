import { useState, useEffect } from 'react';
import { getListCartByUser, updateCartProductRequest } from '../services/api';

const useUserCart = () => {
  const [cart, setCart] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchCart = async () => {
    try {
      const response = await getListCartByUser();
      console.log('API Response:', response);  
      if (response) {
         setCart(response.data.cart);
      } else {
        setError(response.message || 'No se pudo obtener el carrito.');
      }
    } catch (err) {
      console.log(err);
      setError('Error al obtener el carrito.');
    } finally {
      setLoading(false);
    }
  };

  const updateCartItem = async (productId, newQuantity) => {
    try {
      setLoading(true);
      
      const response = await updateCartProductRequest(productId, newQuantity);
      
      if (response.success) {
        await fetchCart();
        return { success: true, message: 'Cantidad actualizada correctamente' };
      } else {
        throw new Error(response.message || 'Error al actualizar la cantidad');
      }
    } catch (err) {
      console.error('Error al actualizar cantidad:', err);
      setError(err.message || 'Error al actualizar la cantidad');
      return { success: false, message: err.message || 'Error al actualizar la cantidad' };
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return { 
    cart, 
    loading, 
    error, 
    updateCartItem,
    refreshCart: fetchCart 
  };
};

export default useUserCart;

