import React, { useState, useEffect } from 'react';
import { ProductCard } from './../../components/Card/ProductCard.jsx';
import { ProductModal } from './../../components/Modal/ProductModal.jsx';
import { getProductsRequest } from './../../services/api.js'; // Ajusta la ruta si es necesario

const CatalogProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsRequest();
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

  if (loading) return <p className="text-center mt-10">Cargando productos...</p>;
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>;

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Nuestros Productos</h1>
      {products.length === 0 ? (
        <p className="text-center text-gray-600">No hay productos disponibles.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} onClick={handleProductClick} />
          ))}
        </div>
      )}

      <ProductModal product={selectedProduct} onClose={closeModal} />
    </section>
  );
};

export default CatalogProducts;
