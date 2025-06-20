"use client"

import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import { X, Package, ArrowDownCircle, ArrowUpCircle, ChevronDown, ChevronUp } from "lucide-react"
import { createInventoryMovement } from "../../services/api" // Asegúrate de tener este endpoint
import { getProductsRequest } from "../../services/api" // Servicio para obtener productos

const AddInventoryMovementModal = ({ showModal, setShowModal, setMovements }) => {
  const [loading, setLoading] = useState(false)
  const [products, setProducts] = useState([])
  const [isProductDropdownOpen, setIsProductDropdownOpen] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [searchProductTerm, setSearchProductTerm] = useState("")
  const [inputType, setInputType] = useState("entry")

  // Cargar productos al abrir el modal
  useEffect(() => {
    if (showModal) {
      const fetchProducts = async () => {
        try {
          const response = await getProductsRequest()
          if (response.success) {
            setProducts(response.data)
          }
        } catch (error) {
          console.error("Error fetching products:", error)
        }
      }
      fetchProducts()
    }
  }, [showModal])

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchProductTerm.toLowerCase())
  )

  const handleCreateMovement = async (e) => {
    e.preventDefault()
    
    if (!selectedProduct) {
      Swal.fire("Error", "Debes seleccionar un producto", "error")
      return
    }

    const formData = {
      product: selectedProduct._id,
      amount: e.target.amount.value,
      inputType: inputType
    }

    try {
      setLoading(true)
      const response = await createInventoryMovement(formData)

      if (response.success) {
        Swal.fire("Éxito", "Movimiento registrado correctamente", "success")
        setShowModal(false)
        // Resetear campos
        setSelectedProduct(null)
        setInputType("entry")
        // Actualizar lista de movimientos si es necesario
        if (setMovements) {
          // Aquí deberías tener una función para actualizar la lista de movimientos
        }
      }
    } catch (error) {
      const backendErrors = error.response?.data?.errors
        
      if (backendErrors && backendErrors.length > 0) {
        const errorMessages = backendErrors.map(err => 
          `<b> Message:</b> ${err.message}`
        ).join('<br><br>')
        
        Swal.fire({
          title: 'Errores de validación',
          html: `${errorMessages}</div>`,
          icon: 'error'
        })
      } else {
        Swal.fire("Error", error.response?.data?.message || "Error desconocido", "error")
      }
    } finally {
      setLoading(false)
    }
  }

  if (!showModal) return null

  return (
    <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md max-h-[90vh] overflow-hidden transform animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-6 py-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Nuevo Movimiento</h2>
                <p className="text-blue-100 text-sm">Registrar entrada/salida de inventario</p>
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
          <form onSubmit={handleCreateMovement} className="space-y-6">
            {/* Campo Producto */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Producto</label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Package className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  placeholder="Buscar producto..."
                  className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  value={searchProductTerm}
                  onChange={(e) => setSearchProductTerm(e.target.value)}
                  onClick={() => setIsProductDropdownOpen(true)}
                />
                {isProductDropdownOpen && (
                  <div className="absolute z-10 mt-1 w-full bg-white border border-gray-200 rounded-xl shadow-lg max-h-60 overflow-auto">
                    {filteredProducts.length > 0 ? (
                      filteredProducts.map((product) => (
                        <div
                          key={product._id}
                          className="px-4 py-3 hover:bg-blue-50 cursor-pointer flex items-center"
                          onClick={() => {
                            setSelectedProduct(product)
                            setSearchProductTerm(product.name)
                            setIsProductDropdownOpen(false)
                          }}
                        >
                          <Package className="w-4 h-4 mr-2 text-blue-500" />
                          <span>{product.name}</span>
                          <span className="ml-auto text-sm text-gray-500">Stock: {product.stock}</span>
                        </div>
                      ))
                    ) : (
                      <div className="px-4 py-3 text-gray-500">No se encontraron productos</div>
                    )}
                  </div>
                )}
              </div>
              {selectedProduct && (
                <div className="mt-2 flex items-center space-x-2 text-sm text-blue-700 bg-blue-100 px-3 py-2 rounded-lg">
                  <Package className="w-4 h-4" />
                  <span className="font-medium">{selectedProduct.name}</span>
                  <span className="text-blue-600">(Stock actual: {selectedProduct.stock})</span>
                </div>
              )}
            </div>

            {/* Campo Cantidad */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Cantidad</label>
              <div className="relative">
                <input
                  name="amount"
                  type="number"
                  min="1"
                  placeholder="Ej: 100"
                  className="w-full pl-4 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                  required
                />
              </div>
            </div>

            {/* Campo Tipo de Movimiento */}
            <div className="space-y-2">
              <label className="block text-sm font-semibold text-gray-700">Tipo de Movimiento</label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setInputType("entry")}
                  className={`flex items-center justify-center p-4 rounded-xl border transition-all duration-200 ${inputType === "entry" ? 'bg-green-50 border-green-300 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                >
                  <ArrowDownCircle className="w-5 h-5 mr-2" />
                  <span>Entrada</span>
                </button>
                <button
                  type="button"
                  onClick={() => setInputType("exit")}
                  className={`flex items-center justify-center p-4 rounded-xl border transition-all duration-200 ${inputType === "exit" ? 'bg-red-50 border-red-300 text-red-700' : 'bg-gray-50 border-gray-200 text-gray-700'}`}
                >
                  <ArrowUpCircle className="w-5 h-5 mr-2" />
                  <span>Salida</span>
                </button>
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
                className="flex-1 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
                disabled={loading || !selectedProduct}
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Registrando...</span>
                  </>
                ) : (
                  <>
                    <Package className="w-4 h-4" />
                    <span>Registrar Movimiento</span>
                  </>
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Footer decorativo */}
        <div className="h-1 bg-gradient-to-r from-blue-600 to-indigo-600"></div>
      </div>
    </div>
  )
}

export default AddInventoryMovementModal