"use client"

import { useEffect, useState } from "react"
import { Delete, Edit } from 'lucide-react'
import { getCategoryAll, softDeleteCategory } from "../../services/api" // ajusta la ruta según tu estructura
import Swal from "sweetalert2"
import AddCategoryModal from './../Modal/addCategoryModal'

const CategoriesTables = () => {
  const [category, setCategory] = useState([])
  const [showModal, setShowModal] = useState(false)

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
        setCategory((prev) =>
          prev.map((p) => (p._id === categoryId ? { ...p, isActive: false } : p))
        )
        Swal.fire("Desactivado", "La categoria ha sido desactivado.", "success")
      } catch (error) {
        Swal.fire("Error", "No se pudo desactivar la Categoria.", "error")
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
            Crear Categoria
          </button>
          <AddCategoryModal
            showModal={showModal}
            setShowModal={setShowModal}
            setCategory={setCategory}
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
                {category.map((cat, index) => (
                  <tr
                    key={cat._id}
                    className={`transition-all duration-300 hover:bg-blue-50/50 hover:shadow-sm ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      }`}
                  >
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
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${cat.isActive
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${cat.isActive ? "bg-green-400" : "bg-red-400"}`}
                        ></span>
                        {cat.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <button className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 hover:shadow-md group">
                          <Edit className="w-4 h-4" />
                        </button>
                        <button onClick={() => handleSoftDelete(cat._id)} className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 hover:shadow-md group">
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
            {category.length === 0 && (
              <div className="text-center py-12 bg-gray-50/30">
                <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-8 h-8 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z"
                    ></path>
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay categorías disponibles</h3>
                <p className="text-gray-500">
                  Las categorías aparecerán aquí una vez que sean creadas en el sistema.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer con información adicional */}
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
