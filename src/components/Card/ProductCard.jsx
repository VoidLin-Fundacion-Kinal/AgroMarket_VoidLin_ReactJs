export const ProductCard = ({ product, onClick }) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="bg-white rounded-xl shadow hover:shadow-lg p-4 cursor-pointer transition-all"
    >
      <img
        src={`http://localhost:2003/images/productsImages/${product.image}`}
        alt={product.name}
        className="w-full h-48 object-cover rounded-md"
      />
      <h3 className="text-lg font-semibold mt-2">{product.name}</h3>
      <p className="text-green-700 font-bold text-md">Q{product.price.toFixed(2)}</p>
    </div>
  );
};
