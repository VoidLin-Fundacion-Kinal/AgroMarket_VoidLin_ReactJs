import React, { useState } from 'react'
import Swal from 'sweetalert2'
import { createCategory } from '../../services/api' // Asegúrate de tener este endpoint

const AddCategoryModal = ({ showModal, setShowModal, setCategory }) => {
  const [loading, setLoading] = useState(false)

  const handleCreateCategory = async (e) => {
    e.preventDefault()
    const formData = {
    name: e.target.name.value.trim(),
    description: e.target.description.value.trim()
  }


    try {
      setLoading(true)
      const data = await createCategory(formData)

      if (data.success) {
        Swal.fire("Categoria creada", "La Categoria se ha guardado correctamente", "success")
        setShowModal(false)
        setCategory(prev => [...prev, data.category])
      } else {
        Swal.fire("Error", data.message || "No se pudo crear el proveedor", "error")
      }
    } catch (error) {
      Swal.fire("Error", "Ocurrió un error al crear el proveedor", "error")
    } finally {
      setLoading(false)
    }
  }

  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <h2 className="text-lg font-semibold mb-4">Crear Categorias</h2>

        <form onSubmit={handleCreateCategory}  className="space-y-4">
          <input name="name" type="text" placeholder="Nombre" className="w-full border p-2 rounded" required />
          <textarea name="description" placeholder="Descripción" className="w-full border p-2 rounded" required />
          
          <div className="flex justify-end gap-2 pt-4">
            <button type="button" onClick={() => setShowModal(false)} className="px-4 py-2 text-gray-600 hover:text-gray-900">Cancelar</button>
            <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700" disabled={loading}>
              {loading ? "Guardando..." : "Crear"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddCategoryModal
