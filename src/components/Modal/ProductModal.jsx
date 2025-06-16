import React, { useState } from 'react';

export const ProductModal = ({ product, onClose }) => {
  const [selectedQty, setSelectedQty] = useState(1);
  const [showQuantitySelector, setShowQuantitySelector] = useState(false);

  if (!product) return null;

  const handleQtyClick = (qty) => {
    setSelectedQty(qty);
  };

  const toggleAccordion = () => {
    setShowQuantitySelector((prev) => !prev);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4 py-8">
      <div className="bg-white rounded-xl shadow-lg w-full max-w-4xl p-6 relative overflow-hidden">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-2xl text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>

        {/* Imagen y detalles */}
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Imagen */}
          <div className="w-full lg:w-1/2">
            <img
              src={`http://localhost:2003/images/productsImages/${product.image}`}
              alt={product.name}
              className="w-full h-[300px] object-cover rounded-lg"
            />
          </div>

          {/* Información del producto */}
          <div className="w-full lg:w-1/2">
            <h2 className="text-3xl font-bold text-center text-green-700">{product.name}</h2>

            <p className="mt-4 text-gray-700">
              <span className="font-semibold">Descripción:</span>{' '}
              {product.description || 'Este producto es ideal para uso agrícola intensivo.'}
            </p>
            <p className="mt-2 text-gray-700">
              <span className="font-semibold">Precio:</span> Q{product.price.toFixed(2)}
            </p>
            <p className="mt-2 text-gray-700">
              <span className="font-semibold">Peso:</span> {product.weight || '1 kg'}
            </p>
            <p className="mt-2 text-gray-700">
              <span className="font-semibold">Stock:</span> {product.stock || 'Disponible'}
            </p>
            <p className="mt-2 text-gray-700">
              <span className="font-semibold">Proveedor:</span> {product.provider?.name || 'AgroDistribuidor S.A.'}

            </p>

            {/* Acordeón para cantidad */}
            <div className="mt-6 border rounded-md overflow-hidden">
              <button
                onClick={toggleAccordion}
                className="w-full flex justify-between items-center px-4 py-3 bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold"
              >
                Seleccionar cantidad
                <span>{showQuantitySelector ? '▲' : '▼'}</span>
              </button>

              {showQuantitySelector && (
                <div className="p-4 bg-white border-t animate-fadeIn">
                  <div className="grid grid-cols-5 gap-2">
                    {[...Array(10)].map((_, index) => {
                      const qty = index + 1;
                      return (
                        <button
                          key={qty}
                          onClick={() => handleQtyClick(qty)}
                          className={`py-2 rounded-lg border text-sm font-medium ${
                            selectedQty === qty
                              ? 'bg-green-600 text-white border-green-700'
                              : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-100'
                          }`}
                        >
                          {qty}
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>

            {/* Agregar al carrito */}
            <button className="mt-6 w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 rounded-lg transition">
              Agregar {selectedQty} al carrito
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
