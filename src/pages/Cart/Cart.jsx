import React from 'react'
import CartItem from '../../components/Card/ItemCard'
import OrderSummary from '../../components/Card/OrderSummary'


const Cart = () => {
    return (
        <section className="bg-white py-10 antialiased dark:bg-gray-900">
            <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Shopping Cart</h2>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Lista de productos */}
                    <div className="lg:col-span-2 space-y-6">
                        {CartItems.map(item => (
                            <CartItem
                                key={item.id}
                                imageLight={item.imageLight}
                                imageDark={item.imageDark}
                                title={item.title}
                                price={item.price}
                                quantity={item.quantity}
                                onAddFavorite={() => handleAddFavorite(item.id)}
                                onRemove={() => handleRemove(item.id)}
                                onIncrement={() => handleIncrement(item.id)}
                                onDecrement={() => handleDecrement(item.id)}
                            />
                        ))}
                    </div>

                    {/* Resumen de pedido */}
                    <div>
                        <OrderSummary
                            originalPrice={summary.originalPrice}
                            savings={summary.savings}
                            pickupCost={summary.pickupCost}
                            tax={summary.tax}
                            total={summary.total}
                            onCheckout={handleCheckout}
                            onContinue={handleContinue}
                        />
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Cart
