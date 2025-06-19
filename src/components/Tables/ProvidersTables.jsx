"use client"

import { useEffect, useState } from "react"
import { Delete, Edit } from "lucide-react"
import { getProvidersAll, softDeleteProvider } from "../../services/api" // ajusta la ruta según tu estructura
import Swal from "sweetalert2"
import AddProviderModal from "../Modal/addProviderModal"

const ProviderTables = () => {
  const [providers, setProviders] = useState([])
  const [showModal, setShowModal] = useState(false) // nuevo estado

  const columns = [
    "Nombre",
    "Descripcion",
    "Email",
    "Tipo Producto",
    "Phone",
    "Nombre del Representante",
    "Estado",
    "Acciones",
  ]

  useEffect(() => {
    const fetchProvider = async () => {
      try {
        const data = await getProvidersAll()
        setProviders(data)
      } catch (error) {
        console.error("Error cargando Proveedores:", error)
      }
    }

    fetchProvider()
  }, [])

  const handleSoftDelete = async (providerId) => {
      const confirm = await Swal.fire({
        title: "¿Desactivar Proveedor?",
        text: "Este proveedor se marcará como inactivo, no se eliminará permanentemente.",
        icon: "warning",
        showCancelButton: true,
        confirmButtonText: "Sí, desactivar",
        cancelButtonText: "Cancelar"
      })
  
      if (confirm.isConfirmed) {
        try {
          await softDeleteProvider(providerId, "Desactivado por administrador")
          setProviders((prev) =>
            prev.map((p) => (p._id === providerId ? { ...p, isActive: false } : p))
          )
          Swal.fire("Desactivado", "El Proveedor ha sido desactivado.", "success")
        } catch (error) {
          Swal.fire("Error", "No se pudo desactivar el proveedor.", "error")
          console.log(error);
  
        }
      }
    }

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header de la tabla */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Gestión de Proveedores</h2>
            <p className="text-sm text-gray-600 mt-1">Lista completa de Proveedores registrados.</p>
          </div>
          <button
            onClick={() => setShowModal(true)}

            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Crear Proveedor
          </button>
          <AddProviderModal
            showModal={showModal}
            setShowModal={setShowModal}
            setProviders={setProviders}
          />
        </div>
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
                {providers.map((provider, index) => (
                  <tr
                    key={provider._id}
                    className={`transition-all duration-300 hover:bg-blue-50/50 hover:shadow-sm ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                    }`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 text-sm">{provider.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">{provider.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-blue-600 font-medium hover:text-blue-800 transition-colors">
                        {provider.email}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800 border border-indigo-200">
                        {provider.typeProduct}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">{provider.phone}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {provider.legalRepresentative || (
                          <span className="text-gray-400 italic">Sin Representante</span>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${
                          provider.isActive
                            ? "bg-green-100 text-green-800 border border-green-200"
                            : "bg-red-100 text-red-800 border border-red-200"
                        }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${provider.isActive ? "bg-green-400" : "bg-red-400"}`}
                        ></span>
                        {provider.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 hover:shadow-md group">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleSoftDelete(provider._id)} className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 hover:shadow-md group">
                          <Delete className="w-4 h-4" />
                        </button>
                        <button className="p-2.5 rounded-xl bg-gray-50 text-gray-600 hover:bg-gray-100 hover:text-gray-700 transition-all duration-200 hover:shadow-md group">
                          <svg
                            width="16"
                            height="16"
                            viewBox="0 0 20 20"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              className="stroke-current"
                              d="M10.0161 14.9897V15.0397M10.0161 9.97598V10.026M10.0161 4.96231V5.01231"
                              strokeWidth="2.5"
                              strokeLinecap="round"
                            />
                          </svg>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {providers.length === 0 && (
              <div className="text-center py-12 bg-gray-50/30">
                <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay proveedores disponibles</h3>
                <p className="text-gray-500">
                  Los proveedores aparecerán aquí una vez que sean registrados en el sistema.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer con información adicional */}
      {providers.length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="font-medium">
                Total: {providers.length} proveedor{providers.length !== 1 ? "es" : ""}
              </span>
              <span className="text-gray-400">|</span>
              <span>Activos: {providers.filter((p) => p.isActive).length}</span>
            </div>
            <div className="text-xs text-gray-500">Última actualización: {new Date().toLocaleString("es-ES")}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProviderTables
