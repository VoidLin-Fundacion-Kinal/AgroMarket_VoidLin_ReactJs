"use client"

import { useEffect, useState } from "react"
import { Delete, Edit, ShoppingCart, Eye, CreditCard, ShoppingCartIcon } from "lucide-react"
import { getCartAll } from "../../services/api" // ajusta la ruta según tu estructura

const CartsTables = () => {
  const [cart, setCart] = useState([])
  const columns = ["Cliente", "Productos", "Total", "Estado"]

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const data = await getCartAll()
        setCart(data)
      } catch (error) {
        console.error("Error cargando Carritos:", error)
      }
    }

    fetchCart()
  }, [])

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat("es-ES", {
      style: "currency",
      currency: "GTQ",
      minimumFractionDigits: 2,
    }).format(amount)
  }

  const getStatusBadge = (status) => {
    const statusColors = {
      activo: "bg-green-100 text-green-800 border-green-200",
      pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
      abandonado: "bg-red-100 text-red-800 border-red-200",
      completado: "bg-blue-100 text-blue-800 border-blue-200",
      procesando: "bg-purple-100 text-purple-800 border-purple-200",
    }

    const colorClass = statusColors[status?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200"

    const icons = {
      activo: "🛒",
      pendiente: "⏳",
      abandonado: "❌",
      completado: "✅",
      procesando: "⚡",
    }

    const icon = icons[status?.toLowerCase()] || "•"

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
        <span className="mr-1">{icon}</span>
        {status}
      </span>
    )
  }

  const getInitials = (name, surname) => {
    const firstInitial = name ? name.charAt(0).toUpperCase() : ""
    const lastInitial = surname ? surname.charAt(0).toUpperCase() : ""
    return firstInitial + lastInitial
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header de la tabla */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Gestión de Carritos</h2>
        <p className="text-sm text-gray-600 mt-1">Control y seguimiento de carritos de compra</p>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-200">
                  {columns.map((col, index) => (
                    <th
                      key={index}
                      className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {cart.map((cartItem, index) => (
                  <tr
                    key={cartItem._id}
                    className={`transition-all duration-300 hover:bg-blue-50/50 hover:shadow-sm ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-emerald-200 rounded-full flex items-center justify-center mr-3">
                          <span className="text-emerald-600 font-bold text-sm">
                            {getInitials(cartItem.user?.name, cartItem.user?.surname)}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            {cartItem.user?.name} {cartItem.user?.surname}
                          </div>
                          <div className="text-xs text-gray-500">ID: {cartItem._id.substring(0, 8)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <ShoppingCart className="w-4 h-4 text-gray-400 mr-2" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">
                            {cartItem.items?.length || 0} producto{cartItem.items?.length !== 1 ? "s" : ""}
                          </div>
                          <div className="text-xs text-gray-500">
                            {new Date().toLocaleDateString("es-ES", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                            })}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900">{formatCurrency(cartItem.total || 0)}</div>
                      {cartItem.items?.length > 0 && (
                        <div className="text-xs text-gray-500 mt-1">
                          Promedio: {formatCurrency((cartItem.total || 0) / (cartItem.items?.length || 1))}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(cartItem.status)}</td>
                    <td className="px-6 py-4">
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {cart.length === 0 && (
              <div className="text-center py-12 bg-gray-50/30">
                <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <ShoppingCartIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay carritos disponibles</h3>
                <p className="text-gray-500">
                  Los carritos de compra aparecerán aquí una vez que los usuarios los creen.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer con información adicional */}
      {cart.length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="font-medium">
                Total: {cart.length} carrito{cart.length !== 1 ? "s" : ""}
              </span>
              <span className="text-gray-400">|</span>
              <span>Activos: {cart.filter((c) => c.status?.toLowerCase() === "activo").length}</span>
              <span className="text-gray-400">|</span>
              <span>Abandonados: {cart.filter((c) => c.status?.toLowerCase() === "abandonado").length}</span>
              <span className="text-gray-400">|</span>
              <span className="font-medium text-green-600">
                {formatCurrency(cart.reduce((sum, cartItem) => sum + (cartItem.total || 0), 0))}
              </span>
            </div>
            <div className="text-xs text-gray-500">Última actualización: {new Date().toLocaleString("es-ES")}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CartsTables
