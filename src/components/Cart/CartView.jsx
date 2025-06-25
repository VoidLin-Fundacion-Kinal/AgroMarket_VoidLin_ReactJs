import React, { useState } from 'react';
import useUserCart from '../../hooks/useUserCart';
import { ShoppingCartIcon, ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight, PackageIcon } from 'lucide-react';

const CartView = () => {
  const { cart, loading, error } = useUserCart();
  const UrlImage = 'http://localhost:2003/images/productsImages/';
  
  const [currentPage, setCurrentPage] = useState(1);
  const [ordersPerPage] = useState(10);

  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = cart ? cart.slice(indexOfFirstOrder, indexOfLastOrder) : [];
  const totalPages = cart ? Math.ceil(cart.length / ordersPerPage) : 0;

  const goToPage = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const goToFirstPage = () => {
    setCurrentPage(1);
  };

  const goToLastPage = () => {
    setCurrentPage(totalPages);
  };

  const goToPreviousPage = () => {
    setCurrentPage(prev => Math.max(prev - 1, 1));
  };

  const goToNextPage = () => {
    setCurrentPage(prev => Math.min(prev + 1, totalPages));
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    
    if (totalPages <= maxVisiblePages) {
      for (let i = 1; i <= totalPages; i++) {
        pageNumbers.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pageNumbers.push(i);
        }
      } else {
        pageNumbers.push(1);
        pageNumbers.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pageNumbers.push(i);
        }
        pageNumbers.push('...');
        pageNumbers.push(totalPages);
      }
    }
    
    return pageNumbers;
  };

  if (loading) return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#244933]"></div>
      <span className="ml-3 text-lg text-stone-600">Cargando carrito...</span>
    </div>
  );
  
  if (error) return (
    <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
      <div className="text-red-600 text-lg font-medium">{error}</div>
    </div>
  );
  
  if (!cart || cart.length === 0) return (
    <div className="bg-white rounded-xl shadow-lg p-8 text-center">
      <div className="text-stone-400 mb-4 flex justify-center items-center">
        <ShoppingCartIcon className="w-24 h-24" />
      </div>
      <h3 className="text-xl font-semibold text-stone-600 mb-2">Tu carrito está vacío</h3>
      <p className="text-stone-500">Agrega algunos productos para comenzar a comprar</p>
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#244933] to-[#2d5a3f] px-6 py-4">
          <h2 className="text-2xl font-bold text-white flex items-center">
            <ShoppingCartIcon className="w-6 h-6 mr-2" />
            Mi Carrito de Compras
          </h2>
          <p className="text-green-100 text-sm mt-1">
            {cart.length} pedido{cart.length !== 1 ? 's' : ''} en tu carrito
          </p>
        </div>

        {/* Información de paginación */}
        {cart.length > ordersPerPage && (
          <div className="bg-gray-50 px-6 py-3 border-b border-gray-200">
            <p className="text-sm text-stone-600 text-center">
              Mostrando {indexOfFirstOrder + 1} - {Math.min(indexOfLastOrder, cart.length)} de {cart.length} pedidos
            </p>
          </div>
        )}

        {/* Cart Items */}
        <div className="p-6">
          {currentOrders.map((order, orderIndex) => (
            <div key={order._id} className="mb-8 last:mb-0">
              {/* Order Header */}
              <div className="bg-gray-50 rounded-lg p-4 mb-4 border-l-4 border-[#244933]">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-semibold text-stone-800 text-lg">
                      Pedido #{order._id.slice(-8).toUpperCase()}
                    </h3>
                    <p className="text-sm text-stone-600">
                      {order.items.length} producto{order.items.length !== 1 ? 's' : ''}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-lg font-bold text-[#244933]">
                      Q{new Number(order.total).toFixed(2)}
                    </p>
                    <p className="text-xs text-stone-500">Total del pedido</p>
                  </div>
                </div>
              </div>

              {/* Items List */}
              <div className="space-y-4">
                {order.items.map((item, index) => (
                  <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow duration-200">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-4">
                          {/* Product Image */}
                          <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                            <img 
                              src={`${UrlImage}${item.product.image}`} 
                              alt={item.product.name}
                              className="w-full h-full object-cover"
                              onError={(e) => {
                                e.target.style.display = 'none';
                                e.target.nextSibling.style.display = 'flex';
                              }}
                            />
                            <div className="hidden w-full h-full items-center justify-center">
                              <PackageIcon className="w-8 h-8 text-stone-400" />
                            </div>
                          </div>
                          
                          <div className="flex-1">
                            <h4 className="font-semibold text-stone-800 text-lg mb-1">
                              {item.product.name}
                            </h4>
                            <p className="text-stone-600 text-sm mb-2 line-clamp-2">
                              {item.product.description}
                            </p>
                            <div className="flex items-center space-x-4 text-sm">
                              <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded-full font-medium">
                                Cantidad: {item.quantity}
                              </span>
                              <span className="bg-green-100 text-green-800 px-2 py-1 rounded-full font-medium">
                                Q{new Number(item.product.price).toFixed(2)} c/u
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="text-right ml-4">
                        <p className="text-xl font-bold text-[#244933]">
                          Q{(new Number(item.product.price) * item.quantity).toFixed(2)}
                        </p>
                        <p className="text-xs text-stone-500">Subtotal</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Order Summary */}
              <div className="mt-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg p-4 border border-gray-200">
                <div className="flex items-center justify-between">
                  <div className="text-stone-600">
                    <p className="text-sm">Total de productos: {order.items.length}</p>
                    <p className="text-sm">Total de items: {order.items.reduce((sum, item) => sum + item.quantity, 0)}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-[#244933]">
                      Q{new Number(order.total).toFixed(2)}
                    </p>
                    <p className="text-sm text-stone-600">Total del pedido</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Controles de paginación */}
        {totalPages > 1 && (
          <div className="bg-gray-50 px-6 py-4 border-t border-gray-200">
            <div className="flex items-center justify-center space-x-2">
              {/* Botón Primera Página */}
              <button
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                className="p-2 text-stone-500 hover:text-[#244933] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                title="Primera página"
              >
                <ChevronsLeft className="w-5 h-5" />
              </button>

              {/* Botón Página Anterior */}
              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="p-2 text-stone-500 hover:text-[#244933] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                title="Página anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              {/* Números de página */}
              <div className="flex items-center space-x-1">
                {getPageNumbers().map((pageNumber, index) => (
                  <button
                    key={index}
                    onClick={() => pageNumber !== '...' && goToPage(pageNumber)}
                    disabled={pageNumber === '...'}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      pageNumber === currentPage
                        ? 'bg-[#244933] text-red-950'
                        : pageNumber === '...'
                        ? 'text-stone-400 cursor-default'
                        : 'text-stone-600 hover:bg-[#244933]/10 hover:text-[#244933]'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>

              {/* Botón Página Siguiente */}
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="p-2 text-stone-500 hover:text-[#244933] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                title="Página siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              {/* Botón Última Página */}
              <button
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
                className="p-2 text-stone-500 hover:text-[#244933] disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                title="Última página"
              >
                <ChevronsRight className="w-5 h-5" />
              </button>
            </div>

            {/* Información adicional */}
            <div className="mt-3 text-center text-sm text-stone-500">
              Página {currentPage} de {totalPages}
            </div>
          </div>
        )}

        
      </div>
    </div>
  );
};

export default CartView;
