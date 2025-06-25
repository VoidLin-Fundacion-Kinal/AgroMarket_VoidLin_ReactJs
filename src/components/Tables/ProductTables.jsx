"use client"

import { useEffect, useState } from "react"
import { BoxIcon, Delete, Edit, PlusIcon, RotateCcw } from "lucide-react"
import { getProductsAll, softDeleteProduct, revertSoftDeleteProduct } from "../../services/api"
import Swal from "sweetalert2"
import AddProductModal from './../Modal/addProductModal'
import UpdateProductModal from './../Modal/updateProductModal'

const ProductTables = () => {
  const [products, setProducts] = useState([])
  const [showAddModal, setShowAddModal] = useState(false)
  const [showUpdateModal, setShowUpdateModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)

  const columns = ["Nombre", "Descripcion", "Precio", "Peso", "stock", "Proveedor", "Categoria", "Estado", "Acciones"]

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getProductsAll()
        setProducts(data)
      } catch (error) {
        console.error("Error cargando productos:", error)
      }
    }

    fetchProducts()
  }, [])

  const handleSoftDelete = async (productId) => {
    const confirm = await Swal.fire({
      title: "¿Desactivar producto?",
      text: "Este producto se marcará como inactivo, no se eliminará permanentemente.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar",
    })

    if (confirm.isConfirmed) {
      try {
        await softDeleteProduct(productId, "Desactivado por administrador")
        setProducts((prev) => prev.map((p) => (p._id === productId ? { ...p, isActive: false } : p)))
        Swal.fire("Desactivado", "El producto ha sido desactivado.", "success")
      } catch (error) {
        Swal.fire("Error", "No se pudo desactivar el producto.", "error")
        console.log(error)
      }
    }
  }

  const handleRevertSoftDelete = async (productId) => {
    const confirm = await Swal.fire({
      title: "¿Reactivar producto?",
      text: "Este producto volverá a estar activo en el sistema.",
      icon: "question",
      showCancelButton: true,
      confirmButtonText: "Sí, reactivar",
      cancelButtonText: "Cancelar",
    })

    if (confirm.isConfirmed) {
      try {
        await revertSoftDeleteProduct(productId)
        setProducts((prev) => prev.map((p) => (p._id === productId ? { ...p, isActive: true } : p)))
        Swal.fire("Reactivado", "El producto ha sido reactivado exitosamente.", "success")
      } catch (error) {
        Swal.fire("Error", "No se pudo reactivar el producto.", "error")
        console.log(error)
      }
    }
  }

  const handleEdit = (product) => {
    setSelectedProduct(product)
    setShowUpdateModal(true)
  }

  return (
    <div className="flex flex-col bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
      {/* Header de la tabla */}
      <div className="bg-gradient-to-r from-slate-50 to-gray-50 px-6 py-4 border-b border-gray-200">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-800">Gestión de Productos</h2>
            <p className="text-sm text-gray-600 mt-1">Lista completa de productos en inventario</p>
          </div>
          <button
            onClick={() => setShowAddModal(true)}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-md transition-all duration-200 hover:shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            <PlusIcon className="w-5 h-5 mr-2" />
            Crear Producto
          </button>
        </div>
      </div>

      {/* Modales */}
      <AddProductModal
        showModal={showAddModal}
        setShowModal={setShowAddModal}
        setProducts={setProducts}
      />
      
      <UpdateProductModal
        showModal={showUpdateModal}
        setShowModal={setShowUpdateModal}
        setProducts={setProducts}
        productToEdit={selectedProduct}
      />

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
                {products.map((product, index) => (
                  <tr
                    key={product._id}
                    className={`transition-all duration-300 hover:bg-blue-50/50 hover:shadow-sm ${index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                      }`}
                  >
                    <td className="px-6 py-4">
                      <div className="font-semibold text-gray-900 text-sm">{product.name}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm text-gray-600 max-w-xs truncate">{product.description}</div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-bold text-green-600 text-sm">Q{product.price}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800 border border-blue-200">
                        {product.weigth} kg
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${product.stock > 10
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : product.stock > 0
                            ? "bg-yellow-100 text-yellow-800 border border-yellow-200"
                            : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                      >
                        {product.stock} unidades
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900">
                        {product.provider?.name || <span className="text-gray-400 italic">Sin proveedor</span>}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800 border border-purple-200">
                        {product.category?.name || "Sin categoría"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${product.isActive
                          ? "bg-green-100 text-green-800 border border-green-200"
                          : "bg-red-100 text-red-800 border border-red-200"
                          }`}
                      >
                        <span
                          className={`w-2 h-2 rounded-full mr-2 ${product.isActive ? "bg-green-400" : "bg-red-400"}`}
                        ></span>
                        {product.isActive ? "Activo" : "Inactivo"}
                      </span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        {product.isActive ? (
                          <>
                            <button 
                              onClick={() => handleEdit(product)}
                              className="p-2.5 rounded-xl bg-blue-50 text-blue-600 hover:bg-blue-100 hover:text-blue-700 transition-all duration-200 hover:shadow-md group"
                              title="Editar producto"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleSoftDelete(product._id)}
                              className="p-2.5 rounded-xl bg-red-50 text-red-600 hover:bg-red-100 hover:text-red-700 transition-all duration-200 hover:shadow-md group"
                              title="Desactivar producto"
                            >
                              <Delete className="w-4 h-4" />
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={() => handleRevertSoftDelete(product._id)}
                            className="p-2.5 rounded-xl bg-green-50 text-green-600 hover:bg-green-100 hover:text-green-700 transition-all duration-200 hover:shadow-md group"
                            title="Reactivar producto - Volver a estado activo"
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
            {products.length === 0 && (
              <div className="text-center py-12 bg-gray-50/30">
                <div className="mx-auto w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                  <BoxIcon className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">No hay productos disponibles</h3>
                <p className="text-gray-500">Los productos aparecerán aquí una vez que sean agregados al sistema.</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Footer con información adicional */}
      {products.length > 0 && (
        <div className="bg-gradient-to-r from-gray-50 to-slate-50 px-6 py-4 border-t border-gray-200">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <div className="flex items-center space-x-4">
              <span className="font-medium">
                Total: {products.length} producto{products.length !== 1 ? "s" : ""}
              </span>
              <span className="text-gray-400">|</span>
              <span>Activos: {products.filter((p) => p.isActive).length}</span>
            </div>
            <div className="text-xs text-gray-500">Última actualización: {new Date().toLocaleString("es-ES")}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default ProductTables