import React, { useState, useEffect } from 'react';
import { ProductCard } from './../../components/Card/ProductCard.jsx';
import { ProductModal } from './../../components/Modal/ProductModal.jsx';
import { getProductsRequest } from './../../services/api.js'; 
import { ChevronLeft, ChevronRight, ChevronsLeft, ChevronsRight } from 'lucide-react';

const CatalogProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(12);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsRequest();
        console.log(data);
        setProducts(data.products || []);
      } catch (err) {
        setError('Error cargando productos');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(products.length / productsPerPage);

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
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-green-700 mx-auto mb-4"></div>
        <p className="text-gray-600">Cargando productos...</p>
      </div>
    </div>
  );
  
  if (error) return (
    <div className="min-h-screen p-6 bg-gray-100 flex items-center justify-center">
      <div className="text-center">
        <p className="text-red-600 text-lg">{error}</p>
      </div>
    </div>
  );

  return (
    <section className="min-h-screen p-6 bg-gray-100">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Nuestros Productos</h1>
      
      <div className="mb-6 text-center">
        <p className="text-gray-600">
          Mostrando {indexOfFirstProduct + 1} - {Math.min(indexOfLastProduct, products.length)} de {products.length} productos
        </p>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-600 text-lg">No hay productos disponibles.</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
            {currentProducts.map((product) => (
              <ProductCard key={product._id} product={product} onClick={handleProductClick} />
            ))}
          </div>

          {totalPages > 1 && (
            <div className="flex items-center justify-center space-x-2">
              <button
                onClick={goToFirstPage}
                disabled={currentPage === 1}
                className="p-2 text-gray-500 hover:text-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                title="Primera página"
              >
                <ChevronsLeft className="w-5 h-5" />
              </button>

              <button
                onClick={goToPreviousPage}
                disabled={currentPage === 1}
                className="p-2 text-gray-500 hover:text-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                title="Página anterior"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>

              <div className="flex items-center space-x-1">
                {getPageNumbers().map((pageNumber, index) => (
                  <button
                    key={index}
                    onClick={() => pageNumber !== '...' && goToPage(pageNumber)}
                    disabled={pageNumber === '...'}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors duration-200 ${
                      pageNumber === currentPage
                        ? 'bg-green-700 text-white'
                        : pageNumber === '...'
                        ? 'text-gray-400 cursor-default'
                        : 'text-gray-600 hover:bg-green-100 hover:text-green-700'
                    }`}
                  >
                    {pageNumber}
                  </button>
                ))}
              </div>
                
              <button
                onClick={goToNextPage}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-500 hover:text-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                title="Página siguiente"
              >
                <ChevronRight className="w-5 h-5" />
              </button>

              <button
                onClick={goToLastPage}
                disabled={currentPage === totalPages}
                className="p-2 text-gray-500 hover:text-green-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                title="Última página"
              >
                <ChevronsRight className="w-5 h-5" />
              </button>
            </div>
          )}

          <div className="mt-4 text-center text-sm text-gray-500">
            Página {currentPage} de {totalPages}
          </div>
        </>
      )}

      <ProductModal product={selectedProduct} onClose={closeModal} />
    </section>
  );
};

export default CatalogProducts;
