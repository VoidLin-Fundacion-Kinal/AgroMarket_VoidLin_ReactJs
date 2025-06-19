"use client"

import { useEffect, useState } from "react"
import { Delete, Edit } from "lucide-react"
import { getInventoryAll } from "../../services/api" // ajusta la ruta según tu estructura

const InventoryTables = () => {
  const [inventory, setInventory] = useState([])
  const columns = ["Producto", "Cantidad", "Tipo de Movimiento", "Estado"]

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const data = await getInventoryAll()
        setInventory(data)
      } catch (error) {
        console.error("Error cargando Inventario:", error)
      }
    }

    fetchInventory()
  }, [])

  const getMovementBadge = (inputType) => {
    const movementColors = {
      entrada: "bg-green-100 text-green-800 border-green-200",
      salida: "bg-red-100 text-red-800 border-red-200",
      ajuste: "bg-yellow-100 text-yellow-800 border-yellow-200",
      transferencia: "bg-blue-100 text-blue-800 border-blue-200",
      devolucion: "bg-purple-100 text-purple-800 border-purple-200",
    }

    const colorClass = movementColors[inputType?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200"

    const icons = {
      entrada: "↗",
      salida: "↙",
      ajuste: "⚖",
      transferencia: "⇄",
      devolucion: "↩",
    }

    const icon = icons[inputType?.toLowerCase()] || "•"

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
        <span className="mr-1">{icon}</span>
        {inputType}
      </span>
    )
  }

  const getQuantityDisplay = (amount, inputType) => {
    const isPositive = inputType?.toLowerCase() === "entrada"
    return (
      <div className="flex items-center">
        <span
          className={`text-sm font-bold ${
            isPositive ? "text-green-600" : inputType?.toLowerCase() === "salida" ? "text-red-600" : "text-gray-900"
          }`}
        >
          {isPositive ? "+" : inputType?.toLowerCase() === "salida" ? "-" : ""}
          {amount}
        </span>
        <span className="text-xs text-gray-500 ml-1">unidades</span>
      </div>
    )
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header de la tabla */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Gestión de Inventario</h2>
        <p className="text-sm text-gray-600 mt-1">Registro de movimientos y control de stock</p>
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
                {inventory.map((item, index) => (
                  <tr
                    key={item._id}
                    className={`transition-all duration-300 hover:bg-blue-50/50 hover:shadow-sm ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-100 to-orange-200 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-orange-600 font-bold text-sm">
                            {item.product?.name?.charAt(0).toUpperCase() || "P"}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">{item.product?.name || "Producto"}</div>
                          <div className="text-xs text-gray-500">ID: {item.product?._id || "N/A"}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">{getQuantityDisplay(item.amount, item.inputType)}</td>
                    <td className="px-6 py-4">{getMovementBadge(item.inputType)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          item.isActive
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${item.isActive ? "bg-green-400" : "bg-red-400"}`}
                        ></span>
                        {item.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {inventory.length === 0 && (
              <div className="text-center py-12 bg-gray-50/30">
                <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay movimientos de inventario</h3>
                <p className="text-gray-500">
                  Los movimientos de inventario aparecerán aquí una vez que se registren en el sistema.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer con información adicional */}
      {inventory.length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="font-medium">
                Total: {inventory.length} movimiento{inventory.length !== 1 ? "s" : ""}
              </span>
              <span className="text-gray-400">|</span>
              <span>Activos: {inventory.filter((i) => i.isActive).length}</span>
              <span className="text-gray-400">|</span>
              <span>Entradas: {inventory.filter((i) => i.inputType?.toLowerCase() === "entrada").length}</span>
              <span>Salidas: {inventory.filter((i) => i.inputType?.toLowerCase() === "salida").length}</span>
            </div>
            <div className="text-xs text-gray-500">Última actualización: {new Date().toLocaleString("es-ES")}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InventoryTables
