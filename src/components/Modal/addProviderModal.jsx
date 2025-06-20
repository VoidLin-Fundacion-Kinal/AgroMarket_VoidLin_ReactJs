"use client"

import { useState } from "react"
import Swal from "sweetalert2"
import { X, Building2, FileText, Mail, Phone, Package, User, Upload, Trash2, ImageIcon } from "lucide-react"
import { createProvider } from "../../services/api" // Asegúrate de tener este endpoint

const AddProviderModal = ({ showModal, setShowModal, setProviders }) => {
  const [loading, setLoading] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)

  const handleImageChange = (e) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        Swal.fire("Error", "El archivo es demasiado grande. Máximo 5MB.", "error")
        return
      }

      // Validar tipo de archivo
      if (!file.type.startsWith("image/")) {
        Swal.fire("Error", "Por favor selecciona un archivo de imagen válido.", "error")
        return
      }

      setSelectedImage(file)

      // Crear vista previa
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target.result)
      }
      reader.readAsDataURL(file)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    
    const fileInput = document.querySelector('input[name="providerLogo"]')
    if (fileInput) {
      fileInput.value = ""
    }
  }

  const handleCreateProvider = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);

    try {
        setLoading(true);
        const response = await createProvider(formData);

        if (response.success) {
            Swal.fire("Éxito", "Proveedor creado correctamente", "success");
        }

    } catch (error) {
        const backendErrors = error.response?.data?.errors;
        
        if (backendErrors && backendErrors.length > 0) {
            const errorMessages = backendErrors.map(err => 
                `<b> Message:</b> ${err.message}`
            ).join('<br><br>');
            
            Swal.fire({
                title: 'Errores de validación',
                html: `${errorMessages}</div>`,
                icon: 'error'
            });
        } else {
            Swal.fire("Error", error.response?.data?.message || "Error desconocido", "error");
        }
    } finally {
        setLoading(false);
    }
};

  if (!showModal) return null

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
                <h2 className="text-xl font-bold text-white">Nuevo Proveedor</h2>
                <p className="text-green-100 text-sm">Agregar proveedor al sistema</p>
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
          <form onSubmit={handleCreateProvider} encType="multipart/form-data" className="space-y-6">
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
                  placeholder="Describe los servicios y productos que ofrece este proveedor..."
                  rows="4"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                  required
                />
              </div>
            </div>

            {/* Campo de logo */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Logo del proveedor</label>
              <div className="relative">
                {!imagePreview ? (
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG o JPEG (MAX. 5MB)</p>
                      </div>
                      <input
                        name="providerLogo"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </label>
                  </div>
                ) : (
                  <div className="relative">
                    <div className="flex items-center justify-center w-full h-48 border-2 border-green-300 border-dashed rounded-xl bg-green-50">
                      <img
                        src={imagePreview || "/placeholder.svg"}
                        alt="Vista previa del logo"
                        className="max-h-44 max-w-full object-contain rounded-lg"
                      />
                    </div>
                    <div className="absolute top-2 right-2 flex space-x-2">
                      <button
                        type="button"
                        onClick={removeImage}
                        className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-lg transition-colors duration-200"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                    <div className="mt-2 flex items-center space-x-2 text-sm text-green-700 bg-green-100 px-3 py-2 rounded-lg">
                      <ImageIcon className="w-4 h-4" />
                      <span className="font-medium">{selectedImage?.name}</span>
                      <span className="text-green-600">({(selectedImage?.size / 1024 / 1024).toFixed(2)} MB)</span>
                    </div>
                  </div>
                )}
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
                    <span>Guardando...</span>
                  </>
                ) : (
                  <>
                    <Building2 className="w-4 h-4" />
                    <span>Crear Proveedor</span>
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

export default AddProviderModal
