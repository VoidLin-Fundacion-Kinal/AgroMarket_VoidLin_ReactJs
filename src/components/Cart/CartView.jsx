// src/components/CartView.jsx
import React from 'react';
import useUserCart from '../../hooks/useUserCart';

const CartView = () => {
  const { cart, loading, error } = useUserCart();

  if (loading) return <p>Cargando carrito...</p>;
  if (error) return <p className="text-red-600">{error}</p>;
  if (!cart) return <p>No hay elementos en el carrito.</p>;

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold mb-4 text-[#244933]">Carrito</h2>
      <ul>
        {cart.items.map((item, index) => (
          <li key={index} className="mb-4 border-b pb-2">
            <p><strong>Producto:</strong> {item.product.name}</p>
            <p><strong>Cantidad:</strong> {item.quantity}</p>
          </li>
        ))}
      </ul>
      <p className="mt-4 font-semibold">Total: Q{cart.total.toFixed(2)}</p>
    </div>
  );
};

export default CartView;
