"use client"

import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import { X, Building2, FileText, Mail, Phone, Package, User } from "lucide-react"
import { updateProvider } from "../../services/api"

const UpdateProviderModal = ({ showModal, setShowModal, setProviders, providerToEdit }) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    email: '',
    typeProduct: '',
    phone: '',
    legalRepresentative: ''
  })

  // Inicializar los valores del formulario
  useEffect(() => {
    if (providerToEdit) {
      setFormData({
        name: providerToEdit.name || '',
        description: providerToEdit.description || '',
        email: providerToEdit.email || '',
        typeProduct: providerToEdit.typeProduct || '',
        phone: providerToEdit.phone || '',
        legalRepresentative: providerToEdit.legalRepresentative || ''
      })
    }
  }, [providerToEdit])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpdateProvider = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const data = await updateProvider(providerToEdit._id, formData)

      if (data.success) {
        Swal.fire("Actualizado", "Proveedor actualizado correctamente", "success")
        setShowModal(false)
        setProviders(prev => prev.map(p => 
          p._id === providerToEdit._id ? { ...p, ...formData } : p
        ))
      } else {
        Swal.fire("Error", data.message || "No se pudo actualizar el proveedor", "error")
      }
    } catch (error) {
      const backendErrors = error.response?.data?.errors
      
      if (backendErrors && backendErrors.length > 0) {
        const errorMessages = backendErrors.map(err => 
          `<b>${err.field || 'Error'}:</b> ${err.message}`
        ).join('<br><br>')
        
        Swal.fire({
          title: 'Errores de validación',
          html: errorMessages,
          icon: 'error'
        })
      } else {
        Swal.fire("Error", error.response?.data?.message || "Error desconocido", "error")
      }
    } finally {
      setLoading(false)
    }
  }

  if (!showModal || !providerToEdit) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform animate-in zoom-in-95 duration-200">
        {/* Header */}
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
              onClick={() => setShowModal(false)}
              className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200 group"
              disabled={loading}
            >
              <X className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-200" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
          <form onSubmit={handleUpdateProvider} className="space-y-6">
            {/* Grid de campos principales */}
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
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Ej: Distribuidora ABC S.A."
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
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="contacto@proveedor.com"
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
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+502 1234-5678"
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
                    value={formData.typeProduct}
                    onChange={handleChange}
                    placeholder="Ej: Electrónicos, Textiles, Alimentos"
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
                  value={formData.legalRepresentative}
                  onChange={handleChange}
                  placeholder="Nombre completo del representante legal"
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
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Describe los servicios y productos que ofrece este proveedor..."
                  rows="4"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                  required
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 pt-6 border-t border-gray-100">
              <button
                type="button"
                onClick={() => setShowModal(false)}
                className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-all duration-200 hover:shadow-md"
                disabled={loading}
              >
                Cancelar
              </button>
              <button
                type="submit"
                className="flex-1 px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Actualizando...</span>
                  </>
                ) : (
                  <>
                    <Building2 className="w-4 h-4" />
                    <span>Actualizar Proveedor</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer decorativo */}
        <div className="h-1 bg-gradient-to-r from-green-600 to-emerald-600"></div>
      </div>
    </div>
  )
}

export default UpdateProviderModal