import React from 'react';
import useUserBills from '../../hooks/useUserBills';

const BillsView = () => {
  const { bills, loading, error } = useUserBills();

  if (loading) return <p>Cargando facturas...</p>;
  if (error) return <p className="text-red-600">{error}</p>;

  // Protege si bills es null o undefined
  if (!Array.isArray(bills)) {
    return <p className="text-red-600">No se pudieron cargar las facturas.</p>;
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Mis facturas</h2>
      {bills.length === 0 ? (
        <p className="text-gray-500">No tienes facturas registradas.</p>
      ) : (
        bills.map((bill, idx) => (
          <div key={idx} className="border-b border-gray-200 mb-4 pb-2">
            <p className="text-lg font-semibold">Total: Q{bill.total?.toFixed(2)}</p>
            <p className="text-sm text-gray-500">Estado: {bill.status}</p>
            <p className="text-sm text-gray-500">
              Fecha: {bill.createdAt ? new Date(bill.createdAt).toLocaleDateString() : 'Desconocida'}
            </p>
            {bill.cart?.items?.length > 0 ? (
              <ul className="pl-4 list-disc">
                {bill.cart.items.map((item, i) => (
                  <li key={i}>
                    {item.product?.name ?? 'Producto eliminado'} - Q{item.product?.price ?? 0} x {item.quantity}
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-gray-400">Sin productos en esta factura.</p>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default BillsView;
