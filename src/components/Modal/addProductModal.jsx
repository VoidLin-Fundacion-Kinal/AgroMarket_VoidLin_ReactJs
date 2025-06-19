"use client"

import { useEffect, useState } from "react"
import { createProduct, getProvidersAll, getCategoryAll } from "../../services/api"
import Swal from "sweetalert2"
import {
  X,
  Package,
  FileText,
  DollarSign,
  Weight,
  ChevronDown,
  ChevronUp,
  Building2,
  Tag,
  Upload,
  Check,
} from "lucide-react"

const AddProductModal = ({ showModal, setShowModal, setProducts }) => {
  const [categories, setCategories] = useState([])
  const [providers, setProviders] = useState([])
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)

  const [selectedCategory, setSelectedCategory] = useState(null)
  const [selectedProvider, setSelectedProvider] = useState(null)

  const [openCategory, setOpenCategory] = useState(false)
  const [openProvider, setOpenProvider] = useState(false)

  useEffect(() => {
    if (!showModal) return

    const fetchData = async () => {
      try {
        setLoadingData(true)
        const cats = await getCategoryAll()
        setCategories(cats)

        const provs = await getProvidersAll()
        setProviders(provs)
      } catch (error) {
        console.error("Error cargando categorías o proveedores", error)
        Swal.fire("Error", "No se pudieron cargar los datos necesarios", "error")
      } finally {
        setLoadingData(false)
      }
    }

    fetchData()
  }, [showModal])

  const handleCreateProduct = async (e) => {
    e.preventDefault()
    if (!selectedCategory || !selectedProvider) {
      Swal.fire("Error", "Debes seleccionar una categoría y un proveedor", "error")
      return
    }

    const formData = new FormData(e.target)
    formData.set("category", selectedCategory._id)
    formData.set("provider", selectedProvider._id)

    try {
      setLoading(true)
      const data = await createProduct(formData)
      if (data.success) {
        Swal.fire("Producto creado", "El producto se ha guardado correctamente", "success")
        setShowModal(false)
        setProducts((prev) => [...prev, data.product])
        // Reset form
        e.target.reset()
        setSelectedCategory(null)
        setSelectedProvider(null)
      } else {
        Swal.fire("Error", data.message || "No se pudo crear el producto", "error")
      }
    } catch (error) {
      Swal.fire("Error", "Ocurrió un error al crear el producto", "error")
    } finally {
      setLoading(false)
    }
  }

  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 px-6 py-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Nuevo Producto</h2>
                <p className="text-blue-100 text-sm">Agregar producto al inventario</p>
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
          {loadingData ? (
            <div className="flex items-center justify-center py-12">
              <div className="flex flex-col items-center space-y-4">
                <div className="w-8 h-8 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>
                <p className="text-gray-600">Cargando datos...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreateProduct} encType="multipart/form-data" className="space-y-6">
              {/* Grid de campos principales */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Campo Nombre */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Nombre del producto</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <Package className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="text"
                      name="name"
                      placeholder="Ej: Vacuna para Vacas"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
                </div>

                {/* Campo Precio */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Precio (Q)</label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      <DollarSign className="h-5 w-5 text-gray-400" />
                    </div>
                    <input
                      type="number"
                      name="price"
                      placeholder="0.00"
                      step="0.01"
                      min="0"
                      className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                      required
                    />
                  </div>
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
                    placeholder="Describe las características del producto..."
                    rows="3"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white resize-none"
                    required
                  />
                </div>
              </div>

              {/* Campo Peso */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Peso (kg)</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Weight className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    name="weigth"
                    placeholder="0.0"
                    step="0.1"
                    min="0"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
              </div>

              {/* Selectores con acordeón */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Selector de Proveedor */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Proveedor</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenProvider(!openProvider)}
                      className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <Building2 className="h-5 w-5 text-gray-400" />
                        <span className={selectedProvider ? "text-gray-900" : "text-gray-500"}>
                          {selectedProvider ? selectedProvider.name : "Selecciona un proveedor"}
                        </span>
                      </div>
                      {openProvider ? (
                        <ChevronUp className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                    {openProvider && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-auto">
                        {providers.length === 0 ? (
                          <div className="p-4 text-center text-gray-500">No hay proveedores disponibles</div>
                        ) : (
                          providers.map((prov) => (
                            <button
                              key={prov._id}
                              type="button"
                              className={`w-full text-left px-4 py-3 hover:bg-blue-50 transition-colors duration-150 flex items-center justify-between ${
                                selectedProvider?._id === prov._id ? "bg-blue-100 text-blue-900" : "text-gray-700"
                              }`}
                              onClick={() => {
                                setSelectedProvider(prov)
                                setOpenProvider(false)
                              }}
                            >
                              <span className="font-medium">{prov.name}</span>
                              {selectedProvider?._id === prov._id && <Check className="h-4 w-4 text-blue-600" />}
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>

                {/* Selector de Categoría */}
                <div className="space-y-2">
                  <label className="block text-sm font-semibold text-gray-700">Categoría</label>
                  <div className="relative">
                    <button
                      type="button"
                      onClick={() => setOpenCategory(!openCategory)}
                      className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                    >
                      <div className="flex items-center space-x-3">
                        <Tag className="h-5 w-5 text-gray-400" />
                        <span className={selectedCategory ? "text-gray-900" : "text-gray-500"}>
                          {selectedCategory ? selectedCategory.name : "Selecciona una categoría"}
                        </span>
                      </div>
                      {openCategory ? (
                        <ChevronUp className="h-4 w-4 text-gray-400" />
                      ) : (
                        <ChevronDown className="h-4 w-4 text-gray-400" />
                      )}
                    </button>
                    {openCategory && (
                      <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-auto">
                        {categories.length === 0 ? (
                          <div className="p-4 text-center text-gray-500">No hay categorías disponibles</div>
                        ) : (
                          categories.map((cat) => (
                            <button
                              key={cat._id}
                              type="button"
                              className={`w-full text-left px-4 py-3 hover:bg-purple-50 transition-colors duration-150 flex items-center justify-between ${
                                selectedCategory?._id === cat._id ? "bg-purple-100 text-purple-900" : "text-gray-700"
                              }`}
                              onClick={() => {
                                setSelectedCategory(cat)
                                setOpenCategory(false)
                              }}
                            >
                              <span className="font-medium">{cat.name}</span>
                              {selectedCategory?._id === cat._id && <Check className="h-4 w-4 text-purple-600" />}
                            </button>
                          ))
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Campo de imagen */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Imagen del producto</label>
                <div className="relative">
                  <div className="flex items-center justify-center w-full">
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-xl cursor-pointer bg-gray-50 hover:bg-gray-100 transition-colors duration-200">
                      <div className="flex flex-col items-center justify-center pt-5 pb-6">
                        <Upload className="w-8 h-8 mb-2 text-gray-400" />
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Haz clic para subir</span> o arrastra y suelta
                        </p>
                        <p className="text-xs text-gray-500">PNG, JPG o JPEG (MAX. 5MB)</p>
                      </div>
                      <input type="file" name="productImage" className="hidden" accept="image/*" />
                    </label>
                  </div>
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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                      <span>Creando...</span>
                    </>
                  ) : (
                    <>
                      <Package className="w-4 h-4" />
                      <span>Crear Producto</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer decorativo */}
        <div className="h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>
      </div>
    </div>
  )
}

export default AddProductModal
