"use client"

import { useState } from "react"
import Swal from "sweetalert2"
import { postCartProductRequest } from "../../services/api"
import { BoxIcon, Building2Icon, ChevronDownIcon, DollarSignIcon, ShieldCheckIcon, ShoppingCartIcon, WeightIcon, XIcon, StarIcon, HeartIcon, Share2Icon } from "lucide-react"


export const ProductModal = ({ product, onClose }) => {
  const [selectedQty, setSelectedQty] = useState(1)
  const [showQuantitySelector, setShowQuantitySelector] = useState(false)
  const [isLiked, setIsLiked] = useState(false)

  if (!product) return null

  const handleQtyClick = (qty) => {
    setSelectedQty(qty)
  }

  const toggleAccordion = () => {
    setShowQuantitySelector((prev) => !prev)
  }

  const handleAddToCart = async () => {
    try {
      const res = await postCartProductRequest(product._id, selectedQty);

      if (res.success) {
        Swal.fire({
          title: '¡Producto agregado!',
          text: `Agregaste ${selectedQty} ${selectedQty === 1 ? 'unidad' : 'unidades'} al carrito`,
          icon: 'success',
          confirmButtonText: 'Aceptar',
        });

        onClose(); 
      }
    } catch (error) {
      const message =
        error.response?.data?.message || error.message || 'No se pudo agregar el producto';

      Swal.fire({
        title: 'Error',
        text: message,
        icon: 'error',
        confirmButtonText: 'Aceptar',
      });
    }
  };


  return (
    <>
      {/* Overlay mejorado con efectos de partículas */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/80 via-black/70 to-black/80 backdrop-blur-xl p-2 sm:p-4 lg:p-8 transition-all duration-500">
        {/* Efectos de partículas decorativas */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-2 h-2 bg-green-400 rounded-full animate-pulse opacity-60"></div>
          <div className="absolute top-3/4 right-1/4 w-1 h-1 bg-emerald-400 rounded-full animate-ping opacity-40"></div>
          <div className="absolute bottom-1/4 left-1/3 w-1.5 h-1.5 bg-green-300 rounded-full animate-bounce opacity-50"></div>
        </div>

        {/* Modal container con diseño premium */}
        <div className="bg-gradient-to-br from-white via-green-50/40 to-white dark:from-gray-900 dark:via-green-900/20 dark:to-gray-900 rounded-3xl sm:rounded-4xl shadow-2xl w-full max-w-sm sm:max-w-2xl lg:max-w-6xl max-h-[95vh] sm:max-h-[90vh] relative overflow-hidden border border-green-200/30 dark:border-green-700/30 backdrop-blur-sm transform transition-all duration-500 hover:shadow-green-200/30 dark:hover:shadow-green-800/30">
          {/* Header decorativo mejorado */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400   via-emerald-500 to-green-400 animate-pulse"></div>

          {/* Botón cerrar premium */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 w-12 h-12 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:text-red-500 dark:hover:text-red-400 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-110 backdrop-blur-sm border border-gray-200/50 dark:border-gray-700/50 group"
          >
            <XIcon className="w-6 h-6 group-hover:rotate-90 transition-transform duration-300" />
          </button>

          {/* Contenido principal premium */}
          <div className="p-6 sm:p-8 lg:p-10 pt-10 sm:pt-12 lg:pt-14 overflow-y-auto max-h-[95vh] sm:max-h-[90vh]">
            <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10">
              {/* Sección de imagen premium */}
              <div className="w-full lg:w-1/2">
                <div className="relative group">
                  {/* Contenedor de imagen con efectos premium */}
                  <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl shadow-2xl bg-gradient-to-br from-green-100 via-emerald-100 to-green-50 dark:from-green-900/30 dark:via-emerald-900/20 dark:to-green-800/30 p-4 sm:p-6 border border-green-200/50 dark:border-green-700/50">
                    <img
                      src={`http://localhost:2003/images/productsImages/${product.image}`}
                      alt={product.name}
                      className="w-full h-56 sm:h-72 lg:h-[400px] object-cover rounded-xl sm:rounded-2xl transition-all duration-700 group-hover:scale-110 group-hover:rotate-1"
                    />
                    {/* Overlay premium con gradiente */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                    
                    {/* Efecto de brillo en hover */}
                    <div className="absolute inset-0 rounded-xl sm:rounded-2xl bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  </div>

                  {/* Badge premium */}
                  <div className="absolute top-4 left-4 sm:top-6 sm:left-6 bg-gradient-to-r from-green-500 via-emerald-500 to-green-600 text-white px-4 py-2 rounded-full text-sm font-bold shadow-2xl backdrop-blur-sm border border-white/20">
                    <div className="flex items-center space-x-1">
                      <StarIcon className="w-4 h-4" />
                      <span>Producto Premium</span>
                    </div>
                  </div>

                  {/* Botones de acción flotantes */}
                  <div className="absolute top-4 right-4 sm:top-6 sm:right-6 flex flex-col space-y-2">
                    <button
                      onClick={() => setIsLiked(!isLiked)}
                      className={`w-10 h-10 flex items-center justify-center rounded-full shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110 ${
                        isLiked 
                          ? "bg-red-500 text-white" 
                          : "bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:bg-red-50 dark:hover:bg-red-900/20"
                      }`}
                    >
                      <HeartIcon className={`w-5 h-5 ${isLiked ? "fill-current" : ""}`} />
                    </button>
                    <button className="w-10 h-10 flex items-center justify-center bg-white/90 dark:bg-gray-800/90 text-gray-600 dark:text-gray-300 hover:text-green-600 dark:hover:text-green-400 rounded-full shadow-lg backdrop-blur-sm border border-white/20 transition-all duration-300 hover:scale-110">
                      <Share2Icon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Información del producto premium */}
              <div className="w-full lg:w-1/2 space-y-6 sm:space-y-8">
                {/* Título premium */}
                <div className="text-center lg:text-left">
                  <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 dark:from-green-300 dark:via-emerald-300 dark:to-green-300 bg-clip-text text-transparent leading-tight mb-4">
                    {product.name}
                  </h2>
                  <div className="w-24 sm:w-32 h-1.5 bg-gradient-to-r from-green-500 via-emerald-500 to-green-500 rounded-full mx-auto lg:mx-0 shadow-lg"></div>
                </div>

                {/* Información en tarjetas premium */}
                <div className="space-y-4 sm:space-y-6">
                  {/* Descripción premium */}
                  <div className="bg-gradient-to-br from-white/90 to-green-50/90 dark:from-gray-800/90 dark:to-green-900/20 rounded-2xl p-6 border border-green-200/50 dark:border-green-700/50 shadow-xl backdrop-blur-sm">
                    <div className="flex items-center mb-4">
                      <div className="w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mr-3 shadow-lg"></div>
                      <span className="font-bold text-green-700 dark:text-green-300 text-sm uppercase tracking-wider">
                        Descripción
                      </span>
                    </div>
                    <p className="text-base sm:text-lg text-green-800 dark:text-green-200 leading-relaxed">
                      {product.description || "Este producto premium es ideal para uso agrícola intensivo, garantizando la mejor calidad y rendimiento en tus cultivos."}
                    </p>
                  </div>

                  {/* Grid de información premium */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                    {/* Precio premium */}
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 dark:from-emerald-900/30 dark:to-green-900/20 rounded-2xl p-5 border border-emerald-200/50 dark:border-emerald-700/50 shadow-xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                          <DollarSignIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-emerald-700 dark:text-emerald-300 text-sm uppercase tracking-wider">Precio</span>
                      </div>
                      <p className="text-2xl sm:text-3xl font-black text-emerald-800 dark:text-emerald-200">Q{product.price.toFixed(2)}</p>
                    </div>

                    {/* Peso premium */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/20 rounded-2xl p-5 border border-green-200/50 dark:border-green-700/50 shadow-xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                          <WeightIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-green-700 dark:text-green-300 text-sm uppercase tracking-wider">Peso</span>
                      </div>
                      <p className="text-xl sm:text-2xl font-bold text-green-800 dark:text-green-200">{product.weight || "1 kg"}</p>
                    </div>

                    {/* Stock premium */}
                    <div className={`rounded-2xl p-5 border shadow-xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300 ${
                      !product.stock || product.stock === 0 
                        ? "bg-gradient-to-br from-red-50 to-pink-50 dark:from-red-900/30 dark:to-pink-900/20 border-red-200/50 dark:border-red-700/50" 
                        : "bg-gradient-to-br from-blue-50 to-green-50 dark:from-blue-900/30 dark:to-green-900/20 border-blue-200/50 dark:border-blue-700/50"
                    }`}>
                      <div className="flex items-center mb-3">
                        <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 shadow-lg ${
                          !product.stock || product.stock === 0 
                            ? "bg-gradient-to-br from-red-500 to-pink-600" 
                            : "bg-gradient-to-br from-blue-500 to-green-600"
                        }`}>
                          <BoxIcon className="w-5 h-5 text-white" />
                        </div>
                        <span className={`font-bold text-sm uppercase tracking-wider ${
                          !product.stock || product.stock === 0 
                            ? "text-red-700 dark:text-red-300" 
                            : "text-blue-700 dark:text-blue-300"
                        }`}>Stock</span>
                      </div>
                      <p className={`text-xl sm:text-2xl font-bold ${
                        !product.stock || product.stock === 0 
                          ? "text-red-800 dark:text-red-200" 
                          : "text-blue-800 dark:text-blue-200"
                      }`}>
                        {product.stock === 0 ? "Sin Stock" : product.stock}
                      </p>
                    </div>

                    {/* Proveedor premium */}
                    <div className="bg-gradient-to-br from-purple-50 to-green-50 dark:from-purple-900/30 dark:to-green-900/20 rounded-2xl p-5 border border-purple-200/50 dark:border-purple-700/50 shadow-xl backdrop-blur-sm transform hover:scale-105 transition-all duration-300">
                      <div className="flex items-center mb-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-green-600 rounded-xl flex items-center justify-center mr-3 shadow-lg">
                          <Building2Icon className="w-5 h-5 text-white" />
                        </div>
                        <span className="font-bold text-purple-700 dark:text-purple-300 text-sm uppercase tracking-wider">Proveedor</span>
                      </div>
                      <p className="text-lg sm:text-xl font-bold text-purple-800 dark:text-purple-200">
                        {product.provider?.name || "AgroDistribuidor S.A."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Selector de cantidad premium */}
                <div className={`bg-gradient-to-br from-gray-50 to-green-50/50 dark:from-gray-800/50 dark:to-green-900/20 rounded-2xl overflow-hidden border-2 border-green-200/50 dark:border-green-700/50 shadow-xl backdrop-blur-sm ${
                  !product.stock || product.stock === 0 ? "opacity-50" : ""
                }`}>
                  <button
                    onClick={toggleAccordion}
                    disabled={!product.stock || product.stock === 0}
                    className={`w-full flex justify-between items-center px-6 py-4 font-bold transition-all duration-300 group ${
                      !product.stock || product.stock === 0
                        ? "bg-gradient-to-r from-gray-100 to-gray-200 text-gray-500 cursor-not-allowed"
                        : "bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 text-green-800"
                    }`}
                  >
                    <div className="flex items-center">
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center mr-3 shadow-lg ${
                        !product.stock || product.stock === 0 
                          ? "bg-gray-400" 
                          : "bg-gradient-to-br from-green-500 to-emerald-600"
                      }`}>
                        <ShoppingCartIcon className={`w-5 h-5 ${
                          !product.stock || product.stock === 0 ? "text-gray-600" : "text-white"
                        }`} />
                      </div>
                      <span className="text-base sm:text-lg font-semibold">
                        {!product.stock || product.stock === 0 ? "Sin stock disponible" : "Seleccionar cantidad"}
                      </span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className={`px-4 py-2 rounded-full text-sm font-bold shadow-lg ${
                        !product.stock || product.stock === 0
                          ? "bg-gray-400 text-white"
                          : "bg-gradient-to-r from-green-500 to-emerald-600 text-white"
                      }`}>
                        {selectedQty}
                      </span>
                      <ChevronDownIcon className={`w-5 h-5 transition-transform duration-300 ${
                        !product.stock || product.stock === 0 
                          ? "text-gray-400" 
                          : "text-green-600"
                      } ${showQuantitySelector ? "rotate-180" : ""}`} />
                    </div>
                  </button>

                  {/* Selector de cantidad animado premium */}
                  <div
                    className={`transition-all duration-500 ease-in-out ${showQuantitySelector ? "max-h-56 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
                  >
                    <div className="p-6 bg-white/90 dark:bg-gray-800/90 backdrop-blur-sm">
                      <div className="grid grid-cols-5 gap-3">
                        {[...Array(10)].map((_, index) => {
                          const qty = index + 1
                          return (
                            <button
                              key={qty}
                              onClick={() => handleQtyClick(qty)}
                              disabled={!product.stock || product.stock === 0}
                              className={`relative py-3 px-2 rounded-xl border-2 text-sm font-bold transition-all duration-300 transform hover:scale-110 shadow-lg ${
                                !product.stock || product.stock === 0
                                  ? "bg-gray-100 text-gray-400 border-gray-200 cursor-not-allowed"
                                  : selectedQty === qty
                                    ? "bg-gradient-to-br from-green-500 to-emerald-600 text-white border-green-600 shadow-xl scale-105"
                                    : "bg-white dark:bg-gray-700 text-green-700 dark:text-green-300 border-green-300 hover:bg-green-50 dark:hover:bg-green-900/20 hover:border-green-400"
                              }`}
                            >
                              {qty}
                              {selectedQty === qty && !(!product.stock || product.stock === 0) && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full shadow-lg"></div>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón agregar al carrito premium */}
                <button
                  onClick={handleAddToCart}
                  disabled={!product.stock || product.stock === 0}
                  className={`group relative w-full font-bold py-4 sm:py-5 px-6 rounded-2xl text-lg sm:text-xl transition-all duration-500 transform focus:outline-none focus:ring-4 overflow-hidden shadow-2xl ${
                    !product.stock || product.stock === 0
                      ? "bg-gradient-to-r from-gray-400 to-gray-500 text-white cursor-not-allowed opacity-60"
                      : "bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-700 hover:via-emerald-700 hover:to-green-700 text-white hover:scale-[1.02] hover:shadow-green-500/30 focus:ring-green-300"
                  }`}
                >
                  {/* Efecto de brillo premium */}
                  {(!product.stock || product.stock === 0) ? null : (
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>
                  )}

                  <div className="relative flex items-center justify-center space-x-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shadow-lg ${
                      !product.stock || product.stock === 0
                        ? "bg-gray-500"
                        : "bg-white/20"
                    }`}>
                      <ShoppingCartIcon className="w-6 h-6" />
                    </div>
                    <span className="text-lg sm:text-xl font-semibold">
                      {!product.stock || product.stock === 0 
                        ? "Producto sin stock" 
                        : `Agregar ${selectedQty} ${selectedQty === 1 ? "unidad" : "unidades"} al carrito`
                      }
                    </span>
                  </div>
                </button>

                {/* Información adicional premium */}
                <div className="flex flex-col sm:flex-row items-center justify-center space-y-3 sm:space-y-0 sm:space-x-6 text-sm text-green-600 dark:text-green-400 pt-4">
                  <div className="flex items-center bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border border-green-200/50 dark:border-green-700/50">
                    <ShieldCheckIcon className="w-4 h-4 mr-2" />
                    Compra 100% segura
                  </div>
                  <div className="flex items-center bg-white/80 dark:bg-gray-800/80 px-4 py-2 rounded-full shadow-lg backdrop-blur-sm border border-green-200/50 dark:border-green-700/50">
                    <StarIcon className="w-4 h-4 mr-2" />
                    Garantía de calidad
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
