import React, { useState, useEffect } from 'react';
import { ProductCard } from './../../components/Card/ProductCard.jsx';
import { ProductModal } from './../../components/Modal/ProductModal.jsx';

const mockProducts = [
  {
  _id: '1',
  name: 'Tractor Agrícola',
  price: 12500,
  weight: '2000 kg',
  stock: 5,
  provider: 'John Deere',
  description: 'Tractor de alta eficiencia para cultivo extensivo.',
  image: 'https://coguma.com.gt/wp-content/uploads/2024/07/Tractor.7230J.John_.Deere_.-.Coguma.jpg'
}

];

const CatalogProducts = () => {
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    setProducts(mockProducts);
  }, []);

  const handleProductClick = (product) => {
    setSelectedProduct(product);
  };

  const closeModal = () => {
    setSelectedProduct(null);
  };

  return (
    <section className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-700">Nuestros Productos</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard key={product._id} product={product} onClick={handleProductClick} />
        ))}
      </div>

      {/* Modal */}
      <ProductModal product={selectedProduct} onClose={closeModal} />
    </section>
  );
};

export default CatalogProducts;
