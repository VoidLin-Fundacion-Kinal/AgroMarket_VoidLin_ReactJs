"use client"

import { useState, useEffect } from "react"
import Swal from "sweetalert2"
import { X, Package, Plus, Minus, ChevronDown, ChevronUp, Check } from "lucide-react"
import { createInventoryMovement, getProductsAll, getInventoryAll } from "../../services/api"

const AddInventoryMovementModal = ({ showModal, setShowModal, setInventory }) => {
  const [loading, setLoading] = useState(false)
  const [loadingData, setLoadingData] = useState(false)
  const [products, setProducts] = useState([])
  const [selectedProduct, setSelectedProduct] = useState(null)
  const [openProduct, setOpenProduct] = useState(false)
  const [inputType, setInputType] = useState("entry") 
  const [amount, setAmount] = useState("")

  useEffect(() => {
    if (!showModal) return

    const fetchData = async () => {
      try {
        setLoadingData(true)
        const prods = await getProductsAll()
        setProducts(prods)
      } catch (error) {
        console.error("Error cargando productos", error)
        Swal.fire("Error", "No se pudieron cargar los productos", "error")
      } finally {
        setLoadingData(false)
      }
    }

    fetchData()
  }, [showModal])

  useEffect(() => {
    if (!showModal) {
      setSelectedProduct(null)
      setInputType("entry")
      setAmount("")
    }
  }, [showModal])

  const handleCreateMovement = async (e) => {
    e.preventDefault()
    
    const token = localStorage.getItem("token");
    if (!token) {
      Swal.fire("Error", "Debes iniciar sesión para crear movimientos de inventario", "error");
      return;
    }
    
    if (!selectedProduct) {
      Swal.fire("Error", "Debes seleccionar un producto", "error")
      return
    }

    if (!amount || amount <= 0) {
      Swal.fire("Error", "La cantidad debe ser mayor a 0", "error")
      return
    }

    if (inputType === "exit" && Number(amount) > selectedProduct.stock) {
      Swal.fire("Error", `No hay suficiente stock. Disponible: ${selectedProduct.stock} unidades`, "error")
      return
    }

    const movementData = {
      product: selectedProduct._id,
      amount: Number(amount),
      inputType: inputType
    }

    try {
      setLoading(true)
      const response = await createInventoryMovement(movementData)

      if (response.success) {
        Swal.fire("Éxito", "Movimiento de inventario creado correctamente", "success")
        setShowModal(false)
        
        if (setInventory) {
          try {
            const inventoryData = await getInventoryAll()
            setInventory(inventoryData)
          } catch (error) {
            console.error("Error recargando inventario:", error)
          }
        }
      }
    } catch (error) {
      const backendErrors = error.response?.data?.errors

      if (backendErrors && backendErrors.length > 0) {
        const errorMessages = backendErrors.map(err =>
          `<b>Message:</b> ${err.message}`
        ).join("<br><br>")

        Swal.fire({
          title: "Errores de validación",
          html: `${errorMessages}</div>`,
          icon: "error"
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
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden transform animate-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="bg-gradient-to-r from-orange-600 to-red-600 px-6 py-4 relative">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                <Package className="w-5 h-5 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Nuevo Movimiento de Inventario</h2>
                <p className="text-orange-100 text-sm">Registrar entrada o salida de stock</p>
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
                <div className="w-8 h-8 border-4 border-orange-200 border-t-orange-600 rounded-full animate-spin"></div>
                <p className="text-gray-600">Cargando productos...</p>
              </div>
            </div>
          ) : (
            <form onSubmit={handleCreateMovement} className="space-y-6">
              {/* Selector de Producto */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Producto</label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenProduct(!openProduct)}
                    className="w-full flex items-center justify-between px-4 py-3 border border-gray-200 rounded-xl bg-gray-50 hover:bg-white focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200"
                  >
                    <div className="flex items-center space-x-3">
                      <Package className="h-5 w-5 text-gray-400" />
                      <span className={selectedProduct ? "text-gray-900" : "text-gray-500"}>
                        {selectedProduct ? selectedProduct.name : "Selecciona un producto"}
                      </span>
                    </div>
                    {openProduct ? (
                      <ChevronUp className="h-4 w-4 text-gray-400" />
                    ) : (
                      <ChevronDown className="h-4 w-4 text-gray-400" />
                    )}
                  </button>
                  {openProduct && (
                    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-xl shadow-lg max-h-48 overflow-auto">
                      {products.length === 0 ? (
                        <div className="p-4 text-center text-gray-500">No hay productos disponibles</div>
                      ) : (
                        products.map((prod) => (
                          <button
                            key={prod._id}
                            type="button"
                            className={`w-full text-left px-4 py-3 hover:bg-orange-50 transition-colors duration-150 flex items-center justify-between ${
                              selectedProduct?._id === prod._id ? "bg-orange-100 text-orange-900" : "text-gray-700"
                            }`}
                            onClick={() => {
                              setSelectedProduct(prod)
                              setOpenProduct(false)
                            }}
                          >
                            <div>
                              <span className="font-medium">{prod.name}</span>
                              <div className="text-xs text-gray-500">Stock actual: {prod.stock}</div>
                            </div>
                            {selectedProduct?._id === prod._id && <Check className="h-4 w-4 text-orange-600" />}
                          </button>
                        ))
                      )}
                    </div>
                  )}
                </div>
              </div>

              {/* Tipo de Movimiento */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Tipo de Movimiento</label>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setInputType("entry")}
                    className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      inputType === "entry"
                        ? "border-green-500 bg-green-50 text-green-700"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Plus className="w-4 h-4" />
                    <span className="font-medium">Entrada</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setInputType("exit")}
                    className={`flex items-center justify-center space-x-2 px-4 py-3 rounded-xl border-2 transition-all duration-200 ${
                      inputType === "exit"
                        ? "border-red-500 bg-red-50 text-red-700"
                        : "border-gray-200 bg-gray-50 text-gray-600 hover:border-gray-300"
                    }`}
                  >
                    <Minus className="w-4 h-4" />
                    <span className="font-medium">Salida</span>
                  </button>
                </div>
              </div>

              {/* Cantidad */}
              <div className="space-y-2">
                <label className="block text-sm font-semibold text-gray-700">Cantidad</label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Package className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    placeholder="0"
                    min="1"
                    step="1"
                    className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all duration-200 bg-gray-50 focus:bg-white"
                    required
                  />
                </div>
                {selectedProduct && inputType === "exit" && (
                  <div className="text-sm text-gray-600 mt-1">
                    Stock disponible: <span className="font-semibold">{selectedProduct.stock}</span> unidades
                  </div>
                )}
              </div>

              {/* Información del producto seleccionado */}
              {selectedProduct && (
                <div className="bg-gray-50 rounded-xl p-4 space-y-2">
                  <h4 className="font-semibold text-gray-800">Información del Producto</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-gray-600">Nombre:</span>
                      <div className="font-medium">{selectedProduct.name}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Stock Actual:</span>
                      <div className="font-medium">{selectedProduct.stock} unidades</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Precio:</span>
                      <div className="font-medium">Q {selectedProduct.price}</div>
                    </div>
                    <div>
                      <span className="text-gray-600">Peso:</span>
                      <div className="font-medium">{selectedProduct.weigth} kg</div>
                    </div>
                  </div>
                </div>
              )}

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
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white rounded-xl font-semibold transition-all duration-200 hover:shadow-lg transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center space-x-2"
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
                      <span>Crear Movimiento</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer decorativo */}
        <div className="h-1 bg-gradient-to-r from-orange-600 to-red-600"></div>
      </div>
    </div>
  )
}

export default AddInventoryMovementModal 