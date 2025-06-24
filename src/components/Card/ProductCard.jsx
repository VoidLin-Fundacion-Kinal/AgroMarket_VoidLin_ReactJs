"\"use client"

import { ArrowRightIcon, DollarSign, PackageIcon, ShoppingCartIcon, StarIcon } from "lucide-react"

export const ProductCard = ({ product, onClick }) => {
  return (
    <div
      onClick={() => onClick(product)}
      className="group relative bg-gradient-to-br from-white via-green-50/20 to-white rounded-2xl shadow-lg hover:shadow-2xl hover:shadow-green-200/25 p-6 cursor-pointer transition-all duration-300 transform hover:scale-[1.02] hover:-translate-y-2 border-2 border-green-100/50 hover:border-green-300/50 backdrop-blur-sm overflow-hidden"
    >
      {/* Barra decorativa superior */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left"></div>

      {/* Contenedor de imagen mejorado */}
      <div className="relative overflow-hidden rounded-xl mb-4 bg-gradient-to-br from-green-100/50 to-emerald-100/50 p-2">
        <img
          src={`http://localhost:2003/images/productsImages/${product.image}`}
          alt={product.name}
          className="w-full h-48 object-cover rounded-lg transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
        />

        {/* Overlay gradiente */}
        <div className="absolute inset-2 rounded-lg bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

        {/* Badge de producto */}
        <div className="absolute top-4 left-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform -translate-y-2 group-hover:translate-y-0">
          Disponible
        </div>

        {/* Icono de vista rápida */}
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/20 backdrop-blur-sm rounded-full p-3 transform scale-75 group-hover:scale-100 transition-transform duration-300">
            <ShoppingCartIcon className="w-4 h-4" />
          </div>
        </div>
      </div>

      {/* Contenido del card */}
      <div className="space-y-3">
        {/* Título mejorado */}
        <div className="relative">
          <h3 className="text-xl font-bold bg-gradient-to-r from-green-800 via-emerald-700 to-green-800 bg-clip-text text-transparent group-hover:from-green-600 group-hover:via-emerald-600 group-hover:to-green-600 transition-all duration-300 line-clamp-2 leading-tight">
            {product.name}
          </h3>
          {/* Línea decorativa bajo el título */}
          <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-green-500 to-emerald-500 group-hover:w-full transition-all duration-300"></div>
        </div>

        {/* Precio mejorado */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-green-100 to-emerald-100 rounded-full flex items-center justify-center group-hover:from-green-200 group-hover:to-emerald-200 transition-colors duration-300">
              <DollarSign className="w-4 h-4 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" />
                
            </div>
            <div>
              <p className="text-2xl font-bold bg-gradient-to-r from-green-700 to-emerald-600 bg-clip-text text-transparent">
                Q{product.price.toFixed(2)}
              </p>
              <p className="text-xs text-green-500 font-medium">Precio por unidad</p>
            </div>
          </div>

          {/* Indicador de acción */}
          <div className="flex items-center space-x-1 text-green-500 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-2 group-hover:translate-x-0">
            <span className="text-sm font-medium">Ver</span>
            <ArrowRightIcon className="w-4 h-4" />
          </div>
        </div>

        {/* Footer con información adicional */}
        <div className="flex items-center justify-between pt-2 border-t border-green-100 group-hover:border-green-200 transition-colors duration-300">
          <div className="flex items-center space-x-3 text-xs text-green-600">
            <div className="flex items-center">
              <PackageIcon className="w-4 h-4" />
              Stock
            </div>
            <div className="flex items-center">
             <StarIcon className="w-4 h-4" />
              Calidad
            </div>
          </div>

          {/* Rating visual */}
          <div className="flex items-center space-x-1">
            {[...Array(5)].map((_, i) => (
              <StarIcon key={i} className={`w-4 h-4 ${i < 4 ? "text-yellow-400" : "text-gray-300"} transition-colors duration-300`} />
            ))}
          </div>
        </div>
      </div>

      {/* Efecto de brillo en hover */}
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out pointer-events-none"></div>

      {/* Sombra interna sutil */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-transparent via-transparent to-green-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
    </div>
  )
}

export default ProductCard
