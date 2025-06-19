"use client"

import { useEffect, useState } from "react"
import { Delete, Edit, FileText, Download, Printer } from "lucide-react"
import { getInvoicesAll } from "../../services/api" // ajusta la ruta según tu estructura

const InvoicesTables = () => {
  const [invoice, setInvoice] = useState([])
  const columns = ["Cliente", "Detalles", "SubTotal", "Total", "Estado"]

  useEffect(() => {
    const fetchInvoice = async () => {
      try {
        const data = await getInvoicesAll()
        setInvoice(data)
      } catch (error) {
        console.error("Error cargando Facturas:", error)
      }
    }

    fetchInvoice()
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
      pagado: "bg-green-100 text-green-800 border-green-200",
      pendiente: "bg-yellow-100 text-yellow-800 border-yellow-200",
      cancelado: "bg-red-100 text-red-800 border-red-200",
      procesando: "bg-blue-100 text-blue-800 border-blue-200",
      enviado: "bg-purple-100 text-purple-800 border-purple-200",
    }

    const colorClass = statusColors[status?.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200"

    return (
      <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium border ${colorClass}`}>
        {status}
      </span>
    )
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header de la tabla */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-gray-200">
        <h2 className="text-xl font-bold text-gray-800">Gestión de Facturas</h2>
        <p className="text-sm text-gray-600 mt-1">Control y seguimiento de facturas emitidas</p>
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
                {invoice.map((inv, index) => (
                  <tr
                    key={inv._id}
                    className={`transition-all duration-300 hover:bg-blue-50/50 hover:shadow-sm ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-teal-100 to-teal-200 rounded-full flex items-center justify-center mr-3">
                          <span className="text-teal-600 font-bold text-sm">
                            {inv.user?.name?.charAt(0).toUpperCase() || "C"}
                            {inv.user?.surname?.charAt(0).toUpperCase() || ""}
                          </span>
                        </div>
                        <div>
                          <div className="font-semibold text-gray-900 text-sm">
                            {inv.user?.name} {inv.user?.surname}
                          </div>
                          <div className="text-xs text-gray-500">Factura #{inv._id.substring(0, 8)}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-xs text-gray-500">
                        {new Date().toLocaleDateString("es-ES", {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        })}
                      </div>
                      <div className="text-xs text-gray-500 mt-1">
                        {inv.cart?.items?.length || 0} producto{inv.cart?.items?.length !== 1 ? "s" : ""}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-700 font-medium">{formatCurrency(inv.cart?.total || 0)}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-bold text-gray-900">{formatCurrency(inv.total || 0)}</div>
                      {inv.total !== inv.cart?.total && (
                        <div className="text-xs text-green-600 mt-1">
                          {((inv.total / inv.cart?.total - 1) * 100).toFixed(0)}% impuestos
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4">{getStatusBadge(inv.status)}</td>
                    <td className="px-6 py-4">
                      
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {invoice.length === 0 && (
              <div className="text-center py-12 bg-gray-50/30">
                <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay facturas disponibles</h3>
                <p className="text-gray-500">Las facturas aparecerán aquí una vez que sean emitidas.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer con información adicional */}
      {invoice.length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="font-medium">
                Total: {invoice.length} factura{invoice.length !== 1 ? "s" : ""}
              </span>
              <span className="text-gray-400">|</span>
              <span>Pagadas: {invoice.filter((i) => i.status?.toLowerCase() === "pagado").length}</span>
              <span className="text-gray-400">|</span>
              <span>Pendientes: {invoice.filter((i) => i.status?.toLowerCase() === "pendiente").length}</span>
              <span className="text-gray-400">|</span>
              <span className="font-medium text-green-600">
                {formatCurrency(invoice.reduce((sum, inv) => sum + (inv.total || 0), 0))}
              </span>
            </div>
            <div className="text-xs text-gray-500">Última actualización: {new Date().toLocaleString("es-ES")}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default InvoicesTables
