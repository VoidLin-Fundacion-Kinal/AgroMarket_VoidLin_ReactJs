"use client"

import React from "react"

const CartProductCard = ({ item, quantity, onQuantityChange, onRemove, baseURL }) => {
  if (!item?.product) return null

  const product = item.product

  return (
    <div className="flex gap-4 p-4 rounded-lg border border-gray-100 hover:border-gray-200 transition-colors">
      <div className="flex-shrink-0">
        <img
          src={`${baseURL}${product.image}`}
          alt={product.name}
          className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-200"
        />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 mb-1">{product.name}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.description}</p>
            <div className="flex items-center gap-4 text-sm text-gray-500">
              <span className="bg-gray-100 px-2 py-1 rounded">Peso: {product.weigth}</span>
              <span className="font-semibold text-gray-900">
                Q{product.price.toFixed(2)} c/u
              </span>
            </div>
          </div>

          <button
            onClick={() => onRemove(product._id)}
            className="p-2 text-gray-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors"
            aria-label="Eliminar producto"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Cantidad:</span>
            <div className="flex items-center border border-gray-300 rounded-lg">
              <button
                onClick={() => onQuantityChange(product._id, quantity - 1)}
                className="p-2 hover:bg-gray-100 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={quantity <= 1}
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                </svg>
              </button>
              <span className="px-4 py-2 font-semibold min-w-[3rem] text-center">
                {quantity}
              </span>
              <button
                onClick={() => onQuantityChange(product._id, quantity + 1)}
                className="p-2 hover:bg-gray-100 transition-colors"
              >
                <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                  />
                </svg>
              </button>
            </div>
          </div>

          <div className="text-right">
            <p className="text-lg font-bold text-gray-900">
              Q{(quantity * product.price).toFixed(2)}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartProductCard
