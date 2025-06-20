"use client"

import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import { X, Tag, FileText, Check } from "lucide-react"
import { updateCategory } from "../../services/api" // Asegúrate de tener este endpoint

const UpdateCategoryModal = ({ showModal, setShowModal, setCategories, categoryToEdit }) => {
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState({
    name: '',
    description: ''
  })

  // Inicializar los valores del formulario cuando cambia la categoría a editar
  useEffect(() => {
    if (categoryToEdit) {
      setFormData({
        name: categoryToEdit.name || '',
        description: categoryToEdit.description || ''
      })
    }
  }, [categoryToEdit])

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleUpdateCategory = async (e) => {
    e.preventDefault()
    
    try {
      setLoading(true)
      const data = await updateCategory(categoryToEdit._id, formData)

      if (data.success) {
        Swal.fire("Categoría actualizada", "La categoría se ha actualizado correctamente", "success")
        setShowModal(false)
        setCategories(prev => prev.map(c => c._id === categoryToEdit._id ? { ...c, ...formData } : c))
      } else {
        Swal.fire("Error", data.message || "No se pudo actualizar la categoría", "error")
      }
    } catch (error) {
      const backendErrors = error.response?.data?.errors;
      
      if (backendErrors && backendErrors.length > 0) {
        const errorMessages = backendErrors.map(err => 
          `<b>${err.field || 'Error'}:</b> ${err.message}`
        ).join('<br><br>');
        
        Swal.fire({
          title: 'Errores de validación',
          html: `${errorMessages}`,
          icon: 'error'
        });
      } else {
        Swal.fire("Error", error.response?.data?.message || "Error desconocido", "error")
      }
    } finally {
      setLoading(false)
    }
  }

  if (!showModal || !categoryToEdit) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden transform animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Tag className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Editar Categoría</h2>
                <p className="text-purple-100 text-sm">Actualizar información de la categoría</p>
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
        <div className="p-6">
          <form onSubmit={handleUpdateCategory} className="space-y-6">
            {/* Campo Nombre */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Nombre de la categoría</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Tag className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  name="name"
                  type="text"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Ej: Electrónicos, Ropa, Hogar..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
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
                  placeholder="Describe brevemente esta categoría..."
                  rows="4"
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                  required
                />
              </div>
            </div>

            {/* Botones */}
            <div className="flex flex-col sm:flex-row gap-3 pt-4">
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
                className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                disabled={loading}
              >
                {loading ? (
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

        {/* Footer decorativo */}
        <div className="h-1 bg-gradient-to-r from-purple-600 to-blue-600"></div>
      </div>
    </div>
  )
}

export default UpdateCategoryModal