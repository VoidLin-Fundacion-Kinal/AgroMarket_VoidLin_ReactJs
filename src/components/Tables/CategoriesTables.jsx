"use client"

import { useEffect, useState } from "react"
import { Delete, Edit, PlusIcon, TagIcon, RotateCcw } from 'lucide-react'
import { getCategoryAll, softDeleteCategory, updateCategory, revertSoftDeleteCategory } from "../../services/api"
import Swal from "sweetalert2"
import AddCategoryModal from './../Modal/AddCategoryModal'
import { X, Tag, FileText, Check } from "lucide-react"

const CategoriesTables = () => {
  const [category, setCategory] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showEditModal, setShowEditModal] = useState(false)
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [loadingEdit, setLoadingEdit] = useState(false)
  const [editFormData, setEditFormData] = useState({
    name: '',
    description: ''
  })

  const columns = ["Nombre", "Descripcion", "Estado", "Acciones"]

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const data = await getCategoryAll()
        setCategory(data)
      } catch (error) {
        console.error("Error cargando categorias:", error)
      }
    }
    fetchCategory()
  }, [])

  const handleEditClick = (category) => {
    setSelectedCategory(category)
    setEditFormData({
      name: category.name,
      description: category.description
    })
    setShowEditModal(true)
  }

  const handleUpdateCategory = async (e) => {
    e.preventDefault()
    
    try {
      setLoadingEdit(true)
      const data = await updateCategory(selectedCategory._id, editFormData)

      if (data.success) {
        Swal.fire("Actualizado", "La categoría se ha actualizado correctamente", "success")
        setShowEditModal(false)
        setCategory(prev => prev.map(c => 
          c._id === selectedCategory._id ? { ...c, ...editFormData } : c
        ))
      } else {
        Swal.fire("Error", data.message || "No se pudo actualizar la categoría", "error")
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

  const handleSoftDelete = async (categoryId) => {
    const confirm = await Swal.fire({
      title: "¿Desactivar Categoria?",
      text: "Esta categoria se marcará como inactivo, no se eliminará permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar"
    })

    if (confirm.isConfirmed) {
      try {
        await softDeleteCategory(categoryId, "Desactivado por administrador")
        setCategory(prev => prev.map(p => p._id === categoryId ? { ...p, isActive: false } : p))
        Swal.fire("Desactivado", "La categoria ha sido desactivado.", "success")
      } catch (error) {
        Swal.fire("Error", "No se pudo desactivar la Categoria.", "error")
        console.log(error)
      }
    }
  }

  const handleRevertSoftDelete = async (categoryId) => {
    const confirm = await Swal.fire({
      title: "¿Reactivar Categoria?",
      text: "Esta categoria se marcará como activo, no se eliminará permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, reactivar",
      cancelButtonText: "Cancelar"
    })

    if (confirm.isConfirmed) {
      try {
        await revertSoftDeleteCategory(categoryId)
        setCategory(prev => prev.map(p => p._id === categoryId ? { ...p, isActive: true } : p))
        Swal.fire("Reactivado", "La categoria ha sido reactivado.", "success")
      } catch (error) {
        Swal.fire("Error", "No se pudo reactivar la Categoria.", "error")
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
            <h2 className="text-xl font-bold text-gray-800">Gestión de Categorías</h2>
            <p className="text-sm text-gray-600 mt-1">Lista completa de categorías registradas</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Crear Categoria
          </button>
        </div>
      </div>

      {/* Modales */}
      <AddCategoryModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        setCategory={setCategory}
      />

      {/* Modal de Edición */}
      {showEditModal && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden transform animate-in zoom-in-95 duration-200">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 px-6 py-4 relative">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                    <Tag className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-white">Editar Categoría</h2>
                    <p className="text-purple-100 text-sm">Actualizar información</p>
                  </div>
                </div>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="w-8 h-8 bg-white/20 hover:bg-white/30 rounded-lg flex items-center justify-center transition-all duration-200 group"
                >
                  <X className="w-4 h-4 text-white group-hover:rotate-90 transition-transform duration-200" />
                </button>
              </div>
            </div>

            <div className="p-6">
              <form onSubmit={handleUpdateCategory} className="space-y-6">
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Nombre</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Tag className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      value={editFormData.name}
                      onChange={(e) => setEditFormData({...editFormData, name: e.target.value})}
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                </div>

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
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                      required
                    />
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 pt-4">
                  <button
                    type="button"
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 px-6 py-3 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold transition-all duration-200 hover:shadow-md"
                  >
                    Cancelar
                  </button>
                  <button
                    type="submit"
                    className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
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

      {/* Tabla de categorías */}
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
                {category.map((cat, index) => (
                  <tr key={cat._id} className={`transition-all duration-300 hover:bg-blue-50/50 hover:shadow-sm ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"}`}>
                    <td className="px-6 py-4">
                      <div className="flex items-center">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-100 to-purple-200 rounded-lg flex items-center justify-center mr-3">
                          <span className="text-purple-600 font-bold text-sm">
                            {cat.name.charAt(0).toUpperCase()}
                          </span>
                        </div>
                        <div className="font-semibold text-gray-900 text-sm">{cat.name}</div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">{cat.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${cat.isActive ? "bg-green-100 text-green-800 border border-green-200" : "bg-red-100 text-red-800 border border-red-200"}`}>
                        <span className={`w-2 h-2 rounded-full mr-2 ${cat.isActive ? "bg-green-400" : "bg-red-400"}`}></span>
                        {cat.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {cat.isActive ? (
                          <>
                            <button 
                              onClick={() => handleEditClick(cat)}
                              className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 hover:shadow-md group"
                              title="Editar categoría"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button 
                              onClick={() => handleSoftDelete(cat._id)} 
                              className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 hover:shadow-md group"
                              title="Desactivar categoría"
                            >
                              <Delete className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button 
                            onClick={() => handleRevertSoftDelete(cat._id)} 
                            className="p-2.5 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-all duration-200 hover:shadow-md group"
                            title="Reactivar categoría"
                          >
                            <RotateCcw className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            
            {category.length === 0 && (
              <div className="text-center py-12 bg-gray-50/30">
                <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <TagIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay categorías disponibles</h3>
                <p className="text-gray-500">Las categorías aparecerán aquí una vez que sean creadas en el sistema.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      {category.length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="font-medium">
                Total: {category.length} categoría{category.length !== 1 ? "s" : ""}
              </span>
              <span className="text-gray-400">|</span>
              <span>Activas: {category.filter((c) => c.isActive).length}</span>
            </div>
            <div className="text-xs text-gray-500">Última actualización: {new Date().toLocaleString("es-ES")}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default CategoriesTables