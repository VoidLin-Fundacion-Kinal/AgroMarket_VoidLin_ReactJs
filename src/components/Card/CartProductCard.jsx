"use client"

import React, { useState } from "react"
import { ChevronDown, Trash2 } from 'lucide-react'
import { updateCartProductRequest } from '../../services/api'

const CartProductCard = ({ item, quantity, onQuantityChange, onRemove, baseURL }) => {
  const [updating, setUpdating] = useState(false);

  if (!item?.product) return null

  const product = item.product

  const handleQuantityChange = async (newQuantity) => {
    if (newQuantity < 1) return;
    
    setUpdating(true);
    
    try {
      await updateCartProductRequest(product._id, newQuantity);
      
      if (onQuantityChange) {
        onQuantityChange(product._id, newQuantity);
      }
      
    } catch (error) {
      console.error('Error al actualizar cantidad:', error);
    } finally {
      setUpdating(false);
    }
  };

  const generateOptions = () => {
    const options = [];
    
    for (let i = 1; i <= 10; i++) {
      options.push(i);
    }
    
    if (quantity > 10) {
      options.push(quantity);
    }
    
    return options.sort((a, b) => a - b);
  };

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
              <span className="bg-gray-100 px-2 py-1 rounded">Peso: {product.weigth} Kg</span>
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
            <Trash2 className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-3">
            <span className="text-sm font-medium text-gray-700">Cantidad:</span>
            <div className="relative">
              <select
                value={quantity}
                onChange={(e) => handleQuantityChange(parseInt(e.target.value))}
                disabled={updating}
                className="w-20 px-2 py-1 text-center border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#244933] focus:border-[#244933] transition-colors duration-200 appearance-none bg-white cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {generateOptions().map((num) => (
                  <option key={num} value={num}>
                    {num}
                  </option>
                ))}
              </select>
              <ChevronDown className="absolute right-1 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
              
              {updating && (
                <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-75 rounded-lg">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#244933]"></div>
                </div>
              )}
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