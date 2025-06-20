"use client"

import { useEffect, useState } from "react"
import { Delete, Edit } from "lucide-react"
import { getProvidersAll, softDeleteProvider, updateProvider } from "../../services/api"
import Swal from "sweetalert2"
import AddProviderModal from "../Modal/addProviderModal"
import { X, Building2, FileText, Mail, Phone, Package, User, Check } from "lucide-react"

const ProviderTables = () => {
  const [providers, setProviders] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedProvider, setSelectedProvider] = useState(null)
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: '',
    email: '',
    typeProduct: '',
    phone: '',
    legalRepresentative: ''
  })

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

  const handleEditClick = (provider) => {
    setSelectedProvider(provider)
    setEditFormData({
      name: provider.name,
      description: provider.description,
      email: provider.email,
      typeProduct: provider.typeProduct,
      phone: provider.phone,
      legalRepresentative: provider.legalRepresentative
    })
    setShowEditModal(true)
  }

  const handleUpdateProvider = async (e) => {
    e.preventDefault()
    
    try {
      setLoadingEdit(true)
      const data = await updateProvider(selectedProvider._id, editFormData)

      if (data.success) {
        Swal.fire("Actualizado", "Proveedor actualizado correctamente", "success")
        setShowEditModal(false)
        setProviders(prev => prev.map(p => 
          p._id === selectedProvider._id ? { ...p, ...editFormData } : p
        ))
      } else {
        Swal.fire("Error", data.message || "No se pudo actualizar el proveedor", "error")
      }
    } catch (error) {
      const backendErrors = error.response?.data?.errors
      
      if (backendErrors?.length > 0) {
        const errorMessages = backendErrors.map(err => 
          `<b>${err.field || 'Error'}:</b> ${err.message}`
        ).join('<br><br>')
        
        Swal.fire({
          title: 'Errores de validación',
          html: errorMessages,
          icon: 'error'
        })
      } else {
        Swal.fire("Error", error.response?.data?.message || "Error al actualizar", "error")
      }
    } finally {
      setLoadingEdit(false)
    }
  }

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
        setProviders(prev => prev.map(p => 
          p._id === providerId ? { ...p, isActive: false } : p
        ))
        Swal.fire("Desactivado", "El Proveedor ha sido desactivado.", "success")
      } catch (error) {
        Swal.fire("Error", "No se pudo desactivar el proveedor.", "error")
        console.log(error)
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
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
            Crear Proveedor
          </button>
        </div>
      </div>

      {/* Modales */}
      <AddProviderModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        setProviders={setProviders}
      />

      {/* Modal de Edición */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 px-6 py-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Editar Proveedor</h2>
                    <p className="text-green-100 text-sm">Actualizar información del proveedor</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200 group"
                  disabled={loadingEdit}
                >
                  <X className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-200" />
                </button>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
              <form onSubmit={handleUpdateProvider} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Campo Nombre */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Nombre del proveedor</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Building2 className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        name="name"
                        type="text"
                        value={editFormData.name}
                        onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Campo Email */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Correo electrónico</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        name="email"
                        type="email"
                        value={editFormData.email}
                        onChange={(e) => setEditFormData({...editFormData, email: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Campo Teléfono */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Teléfono</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        name="phone"
                        type="tel"
                        value={editFormData.phone}
                        onChange={(e) => setEditFormData({...editFormData, phone: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        required
                      />
                    </div>
                  </div>

                  {/* Campo Tipo de Producto */}
                  <div className="space-y-2">
                    <label className="block text-sm font-semibold text-gray-700">Tipo de producto</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Package className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        name="typeProduct"
                        type="text"
                        value={editFormData.typeProduct}
                        onChange={(e) => setEditFormData({...editFormData, typeProduct: e.target.value})}
                        className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Campo Representante Legal */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Representante legal</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <User className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      name="legalRepresentative"
                      type="text"
                      value={editFormData.legalRepresentative}
                      onChange={(e) => setEditFormData({...editFormData, legalRepresentative: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Campo Descripción */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Descripción</label>
                  <div className="relative">
                    <div className="absolute top-3 left-3 pointer-events-none">
                      <FileText className="h-5 w-5 text-gray-400" />
                    </div>
                    <textarea
                      name="description"
                      value={editFormData.description}
                      onChange={(e) => setEditFormData({...editFormData, description: e.target.value})}
                      rows="4"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-all duration-200 hover:shadow-md"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                    disabled={loadingEdit}
                  >
                    {loadingEdit ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                        <span>Actualizando...</span>
                      </>
                    ) : (
                      <>
                        <Check className="w-4 h-4" />
                        <span>Guardar Cambios</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}

      {/* Tabla de proveedores */}
      <div className="overflow-x-auto">
        <div className="min-w-full inline-block align-middle">
          <div className="overflow-hidden">
            <table className="min-w-full">
              <thead>
                <tr className="bg-gradient-to-r from-gray-50 to-slate-50 border-b border-gray-200">
                  {columns.map((col, index) => (
                    <th key={index} className="px-6 py-4 text-left text-xs font-bold text-gray-700 uppercase tracking-wider">
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {providers.map((provider, index) => (
                  <tr key={provider._id} className={`transition-all duration-300 hover:bg-blue-50/50 hover:shadow-sm ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
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
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${provider.isActive ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"}`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${provider.isActive ? "bg-green-400" : "bg-red-400"}`}></span>
                        {provider.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button 
                          onClick={() => handleEditClick(provider)}
                          className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 hover:shadow-md group"
                        >
                          <Edit className="w-4 h-4" />
                        </button>
                        <button 
                          onClick={() => handleSoftDelete(provider._id)} 
                          className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 hover:shadow-md group"
                        >
                          <Delete className="w-4 h-4" />
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
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
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

      {/* Footer */}
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