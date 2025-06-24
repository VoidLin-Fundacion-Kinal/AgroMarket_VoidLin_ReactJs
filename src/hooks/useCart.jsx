import { useEffect, useState } from "react"
import { getListCart, deleteProductFromCart, postCartProductRequest, updateCartProductRequest } from "./../services/api"
import Swal from "sweetalert2"

export const useCart = () => {
  const [cart, setCart] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCart = async () => {
    try {
      setLoading(true)
      const res = await getListCart()

      if (!res || !Array.isArray(res.items) || res.items.length === 0) {
        setCart({ items: [] })
      } else {
        setCart(res)
      }

      setError(null)
    } catch (err) {
      if (err.response?.status === 404) {
        setCart({ items: [] })
        setError(null)
      } else {
        setCart(null)
        const message = err.response?.data?.message || err.message || "Error al cargar el carrito"
        setError(message)
      }
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchCart()
  }, [])

  const removeProduct = async (productId) => {
    const confirm = await Swal.fire({
      title: "¿Estás seguro?",
      text: "Esta acción eliminará el producto del carrito.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Sí, eliminar",
      cancelButtonText: "Cancelar"
    })

    if (!confirm.isConfirmed) return { success: false, message: "Cancelado por usuario" }

    try {
      const res = await deleteProductFromCart(productId)
      Swal.fire("Eliminado", res.message || "Producto eliminado del carrito", "success")
      await fetchCart()
      return { success: true, message: res.message || "Producto eliminado correctamente" }
    } catch (err) {
      const message = err.response?.data?.message || err.message || "No se pudo eliminar el producto"
      Swal.fire("Error", message, "error")
      return { success: false, message }
    }
  }

  const addProduct = async (productId) => {
    try {
      const res = await postCartProductRequest(productId)
      Swal.fire("Agregado", res.message || "Producto agregado al carrito", "success")
      await fetchCart()
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || err.message || "No se pudo agregar el producto"
      Swal.fire("Error", message, "error")
      return { success: false, message }
    }
  }

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await updateCartProductRequest(productId, quantity)
      Swal.fire("Actualizado", res.message || "Cantidad actualizada en el carrito", "success")
      await fetchCart()
      return { success: true }
    } catch (err) {
      const message = err.response?.data?.message || err.message || "No se pudo actualizar la cantidad"
      Swal.fire("Error", message, "error")
      return { success: false, message }
    }
  }



  return { cart, loading, error, removeProduct, addProduct, updateQuantity }
}
