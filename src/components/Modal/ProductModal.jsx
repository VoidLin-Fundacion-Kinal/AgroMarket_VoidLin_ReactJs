"use client"

import { useState } from "react"

export const ProductModal = ({ product, onClose }) => {
  const [selectedQty, setSelectedQty] = useState(1)
  const [showQuantitySelector, setShowQuantitySelector] = useState(false)

  if (!product) return null

  const handleQtyClick = (qty) => {
    setSelectedQty(qty)
  }

  const toggleAccordion = () => {
    setShowQuantitySelector((prev) => !prev)
  }

  return (
    <>
      {/* Overlay mejorado */}
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-black/70 via-black/60 to-black/70 backdrop-blur-md px-4 py-8 transition-all duration-300">
        {/* Modal container mejorado */}
        <div className="bg-gradient-to-br from-white via-green-50/30 to-white rounded-3xl shadow-2xl w-full max-w-5xl relative overflow-hidden border-2 border-green-200/50 backdrop-blur-sm transform transition-all duration-300 hover:shadow-green-200/20">
          {/* Header decorativo */}
          <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-green-400 via-emerald-500 to-green-600"></div>

          {/* Botón cerrar mejorado */}
          <button
            onClick={onClose}
            className="absolute top-6 right-6 z-10 w-12 h-12 flex items-center justify-center bg-white/90 text-green-600 hover:text-red-500 rounded-full shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110 backdrop-blur-sm border-2 border-green-200 hover:border-red-300"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>

          {/* Contenido principal */}
          <div className="p-8 pt-12">
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Sección de imagen mejorada */}
              <div className="w-full lg:w-1/2">
                <div className="relative group">
                  {/* Contenedor de imagen con efectos */}
                  <div className="relative overflow-hidden rounded-2xl shadow-xl bg-gradient-to-br from-green-100 to-emerald-100 p-4">
                    <img
                      src={`http://localhost:2003/images/productsImages/${product.image}`}
                      alt={product.name}
                      className="w-full h-[350px] object-cover rounded-xl transition-transform duration-500 group-hover:scale-105"
                    />
                    {/* Overlay sutil */}
                    <div className="absolute inset-4 rounded-xl bg-gradient-to-t from-black/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  </div>

                  {/* Badge de producto */}
                  <div className="absolute top-6 left-6 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-4 py-2 rounded-full text-sm font-bold shadow-lg">
                    Producto Agrícola
                  </div>
                </div>
              </div>

              {/* Información del producto mejorada */}
              <div className="w-full lg:w-1/2 space-y-6">
                {/* Título mejorado */}
                <div className="text-center lg:text-left">
                  <h2 className="text-4xl font-bold bg-gradient-to-r from-green-700 via-emerald-600 to-green-700 bg-clip-text text-transparent leading-tight mb-2">
                    {product.name}
                  </h2>
                  <div className="w-20 h-1 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full mx-auto lg:mx-0"></div>
                </div>

                {/* Información en tarjetas */}
                <div className="space-y-4">
                  {/* Descripción */}
                  <div className="bg-gradient-to-br from-white/80 to-green-50/80 rounded-xl p-5 border border-green-200/50 shadow-sm">
                    <div className="flex items-center mb-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                      <span className="font-bold text-green-700 text-sm uppercase tracking-wide">Descripción</span>
                    </div>
                    <p className="text-green-800 leading-relaxed">
                      {product.description || "Este producto es ideal para uso agrícola intensivo."}
                    </p>
                  </div>

                  {/* Grid de información */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Precio */}
                    <div className="bg-gradient-to-br from-emerald-50 to-green-50 rounded-xl p-4 border border-emerald-200/50">
                      <div className="flex items-center mb-1">
                        <svg
                          className="w-4 h-4 text-green-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1"
                          />
                        </svg>
                        <span className="font-bold text-green-700 text-xs uppercase tracking-wide">Precio</span>
                      </div>
                      <p className="text-2xl font-bold text-green-800">Q{product.price.toFixed(2)}</p>
                    </div>

                    {/* Peso */}
                    <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-4 border border-green-200/50">
                      <div className="flex items-center mb-1">
                        <svg
                          className="w-4 h-4 text-green-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3"
                          />
                        </svg>
                        <span className="font-bold text-green-700 text-xs uppercase tracking-wide">Peso</span>
                      </div>
                      <p className="text-lg font-semibold text-green-800">{product.weight || "1 kg"}</p>
                    </div>

                    {/* Stock */}
                    <div className="bg-gradient-to-br from-blue-50 to-green-50 rounded-xl p-4 border border-blue-200/50">
                      <div className="flex items-center mb-1">
                        <svg
                          className="w-4 h-4 text-green-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                          />
                        </svg>
                        <span className="font-bold text-green-700 text-xs uppercase tracking-wide">Stock</span>
                      </div>
                      <p className="text-lg font-semibold text-green-800">{product.stock || "Disponible"}</p>
                    </div>

                    {/* Proveedor */}
                    <div className="bg-gradient-to-br from-purple-50 to-green-50 rounded-xl p-4 border border-purple-200/50">
                      <div className="flex items-center mb-1">
                        <svg
                          className="w-4 h-4 text-green-600 mr-2"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                          />
                        </svg>
                        <span className="font-bold text-green-700 text-xs uppercase tracking-wide">Proveedor</span>
                      </div>
                      <p className="text-lg font-semibold text-green-800">
                        {product.provider?.name || "AgroDistribuidor S.A."}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Selector de cantidad mejorado */}
                <div className="bg-gradient-to-br from-gray-50 to-green-50/50 rounded-2xl overflow-hidden border-2 border-green-200/50 shadow-inner">
                  <button
                    onClick={toggleAccordion}
                    className="w-full flex justify-between items-center px-6 py-4 bg-gradient-to-r from-green-100 to-emerald-100 hover:from-green-200 hover:to-emerald-200 text-green-800 font-bold transition-all duration-200 group"
                  >
                    <div className="flex items-center">
                      <svg
                        className="w-5 h-5 mr-3 text-green-600"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M7 4V2a1 1 0 011-1h8a1 1 0 011 1v2h4a1 1 0 011 1v1a1 1 0 01-1 1v12a2 2 0 01-2 2H5a2 2 0 01-2-2V7a1 1 0 01-1-1V5a1 1 0 011-1h4zM9 3v1h6V3H9z"
                        />
                      </svg>
                      Seleccionar cantidad
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-green-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                        {selectedQty}
                      </span>
                      <svg
                        className={`w-5 h-5 text-green-600 transition-transform duration-200 ${showQuantitySelector ? "rotate-180" : ""}`}
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </div>
                  </button>

                  {/* Selector de cantidad animado */}
                  <div
                    className={`transition-all duration-300 ease-in-out ${showQuantitySelector ? "max-h-40 opacity-100" : "max-h-0 opacity-0"} overflow-hidden`}
                  >
                    <div className="p-6 bg-white/80">
                      <div className="grid grid-cols-5 gap-3">
                        {[...Array(10)].map((_, index) => {
                          const qty = index + 1
                          return (
                            <button
                              key={qty}
                              onClick={() => handleQtyClick(qty)}
                              className={`relative py-3 rounded-xl border-2 text-sm font-bold transition-all duration-200 transform hover:scale-105 ${
                                selectedQty === qty
                                  ? "bg-gradient-to-br from-green-500 to-emerald-500 text-white border-green-600 shadow-lg scale-105"
                                  : "bg-white text-green-700 border-green-300 hover:bg-green-50 hover:border-green-400 shadow-sm"
                              }`}
                            >
                              {qty}
                              {selectedQty === qty && (
                                <div className="absolute -top-1 -right-1 w-3 h-3 bg-emerald-400 rounded-full"></div>
                              )}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Botón agregar al carrito mejorado */}
                <button className="group relative w-full bg-gradient-to-r from-green-600 via-emerald-600 to-green-600 hover:from-green-700 hover:via-emerald-700 hover:to-green-700 text-white font-bold py-4 rounded-2xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl hover:shadow-green-500/25 focus:outline-none focus:ring-4 focus:ring-green-300 overflow-hidden">
                  {/* Efecto de brillo */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 ease-out"></div>

                  <div className="relative flex items-center justify-center space-x-3">
                    <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m0 0L17 18m0 0v2a2 2 0 01-2 2H9a2 2 0 01-2-2v-2m8 0V9a2 2 0 00-2-2H9a2 2 0 00-2 2v9.1"
                      />
                    </svg>
                    <span className="text-lg">
                      Agregar {selectedQty} {selectedQty === 1 ? "unidad" : "unidades"} al carrito
                    </span>
                  </div>
                </button>

                {/* Información adicional */}
                <div className="flex items-center justify-center space-x-4 text-sm text-green-600 pt-2">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                      />
                    </svg>
                    Envío gratis
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                      />
                    </svg>
                    Compra segura
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
