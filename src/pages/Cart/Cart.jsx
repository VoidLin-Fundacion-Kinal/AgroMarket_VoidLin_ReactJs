"use client"

import { useEffect, useState } from "react"
import { useCart } from "./../../hooks/useCart"
import { Link, useNavigate } from "react-router-dom"
import Swal from "sweetalert2"
import { getBill } from "../../services/api"
import CartProductCard from "../../components/Card/CardProductCard"

const Cart = () => {
    const { cart, loading, error, removeProduct } = useCart()
    const [quantities, setQuantities] = useState({})
    const baseURL = "http://localhost:2003/images/productsImages/"

    const navigate = useNavigate()



    useEffect(() => {
        if (cart?.items) {
            const validProductIds = new Set(cart.items.map(item => item.product?._id))

            setQuantities(prev => {
                const newQuantities = {}
                for (const id of Object.keys(prev)) {
                    if (validProductIds.has(id)) {
                        newQuantities[id] = prev[id]
                    }
                }
                return newQuantities
            })
        }
    }, [cart])

    const handleCheckout = async () => {
        try {
            const bill = await getBill()

            Swal.fire({
                title: "¡Compra finalizada!",
                html: `
        <p class="text-lg mb-2">Tu factura ha sido generada con éxito.</p>
        <p><strong>ID de Factura:</strong> ${bill._id}</p>
        <p><strong>Total:</strong> Q${bill.total.toFixed(2)}</p>
      `,
                icon: "success",
                confirmButtonText: "Ok",
            }).then(() => {
                navigate(`/home`)
            })

        } catch (error) {
            const message = error.response?.data?.message || error.message || "No se pudo finalizar la compra"

            Swal.fire({
                title: "Error al finalizar",
                text: message,
                icon: "error",
                confirmButtonText: "Aceptar",
            })
        }
    }


    const updateQuantity = (productId, newQuantity) => {
        if (newQuantity < 1) return
        setQuantities((prev) => ({
            ...prev,
            [productId]: newQuantity,
        }))
    }

    const handleRemoveItem = async (productId) => {
        const result = await removeProduct(productId)
        if (!result.success) {
            console.error("Error al eliminar:", result.message)
        }
    }

    const getItemQuantity = (productId) => {
        const item = cart?.items.find((item) => item.product?._id === productId)
        return quantities[productId] ?? item?.quantity ?? 1
    }

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                <p className="ml-4 text-lg text-gray-600">Cargando carrito...</p>
            </div>
        )
    }

    

    if (!cart || !Array.isArray(cart.items) || cart.items.length === 0) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <div className="mx-auto h-24 w-24 text-gray-400 mb-4">
                        <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                                strokeLinecap="round"
                                strokeWidth={2}
                                d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5m6-5v6a2 2 0 01-4 0v-6m4 0V9a2 2 0 10-4 0v4.01"
                            />
                        </svg>
                    </div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">Tu carrito está vacío</h2>
                    <p className="text-gray-600 mb-6">¡Agrega algunos productos para comenzar!</p>
                    <Link
                        to='/catalog'
                        className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors">
                        Continuar Comprando
                    </Link>
                </div>
            </div>
        )
    }

    const total = cart.items.reduce((acc, item) => acc + getItemQuantity(item.product._id) * item.product.price, 0)
    const totalItems = cart.items.reduce((acc, item) => acc + getItemQuantity(item.product._id), 0)

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 flex items-center gap-3">
                        🛒 Mi Carrito
                    </h1>
                    <p className="text-gray-600 mt-2">
                        {totalItems} {totalItems === 1 ? "producto" : "productos"} en tu carrito
                    </p>
                </div>

                <div className="lg:grid lg:grid-cols-12 lg:gap-8">
                    {/* Lista de productos */}
                    <div className="lg:col-span-8">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
                            <div className="p-6">
                                <h2 className="text-xl font-semibold text-gray-900 mb-6">Productos</h2>

                                <div className="space-y-6">
                                    {cart.items.map((item) => {
                                        if (!item.product) return null
                                        const currentQuantity = getItemQuantity(item.product._id)
                                        return (
                                            <CartProductCard
                                                key={item.product._id}
                                                item={item}
                                                quantity={currentQuantity}
                                                onQuantityChange={updateQuantity}
                                                onRemove={handleRemoveItem}
                                                baseURL={baseURL}
                                            />
                                        )
                                    })}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Resumen del pedido */}
                    <div className="lg:col-span-4 mt-8 lg:mt-0">
                        <div className="bg-white rounded-xl shadow-sm border border-gray-200 sticky top-8">
                            <div className="p-6">
                                <h3 className="text-xl font-semibold text-gray-900 mb-6">Resumen del Pedido</h3>

                                <div className="space-y-3 mb-6">
                                    {cart.items.map((item) => {
                                        if (!item.product) return null
                                        const currentQuantity = getItemQuantity(item.product._id)
                                        return (
                                            <div key={item.product._id} className="flex justify-between items-center text-sm">
                                                <span className="text-gray-600 flex-1 truncate">
                                                    {item.product.name} × {currentQuantity}
                                                </span>
                                                <span className="font-semibold text-gray-900 ml-2">
                                                    Q{(currentQuantity * item.product.price).toFixed(2)}
                                                </span>
                                            </div>
                                        )
                                    })}
                                </div>

                                <hr className="border-gray-200 mb-6" />

                                <div className="space-y-3 mb-6">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Subtotal</span>
                                        <span className="font-semibold">Q{total.toFixed(2)}</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Envío</span>
                                        <span className="font-semibold text-green-600">Gratis</span>
                                    </div>
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-600">Impuestos</span>
                                        <span className="font-semibold">Q{(total * 0.1).toFixed(2)}</span>
                                    </div>
                                </div>

                                <hr className="border-gray-200 mb-6" />

                                <div className="flex justify-between items-center mb-6">
                                    <span className="text-lg font-semibold text-gray-900">Total</span>
                                    <span className="text-2xl font-bold text-gray-900">Q{(total + total * 0.1).toFixed(2)}</span>
                                </div>

                                <div className="space-y-3">
                                    <button onClick={handleCheckout} className="w-full bg-green-600 text-white py-3 px-4 rounded-xl hover:bg-green-700 transition-colors flex items-center justify-center gap-2 font-semibold">
                                        <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                            />
                                        </svg>
                                        Finalizar Compra
                                    </button>

                                    <Link
                                        to="/catalog"
                                        className="w-full block border border-gray-300 text-gray-700 py-3 px-4 rounded-xl hover:bg-gray-50 transition-colors font-semibold text-center"
                                    >
                                        Continuar Comprando
                                    </Link>
                                </div>

                                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                                    <p className="text-sm text-green-800">
                                        <span className="font-semibold">🚚 Envío gratis</span> en pedidos superiores a Q50
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
