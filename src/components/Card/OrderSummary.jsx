// components/OrderSummary.jsx
import React from 'react';

const OrderSummary = ({
  originalPrice,
  savings,
  pickupCost,
  tax,
  total,
  onCheckout,
  onContinue
}) => {
  return (
    <div className="space-y-4 rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 sm:p-6">
      <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Order summary</h2>

      <div className="space-y-2">
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Original price</span>
          <span className="text-gray-900 dark:text-white">${originalPrice}</span>
        </div>
        <div className="flex justify-between text-sm text-green-600">
          <span>Savings</span>
          <span>-${savings}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Store Pickup</span>
          <span className="text-gray-900 dark:text-white">${pickupCost}</span>
        </div>
        <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>Tax</span>
          <span className="text-gray-900 dark:text-white">${tax}</span>
        </div>
        <div className="border-t border-gray-200 dark:border-gray-700 pt-2 flex justify-between text-base font-bold text-gray-900 dark:text-white">
          <span>Total</span>
          <span>${total}</span>
        </div>
      </div>

      <button
        onClick={onCheckout}
        className="w-full rounded-lg bg-primary-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-primary-800 focus:outline-none focus:ring-4 focus:ring-primary-300 dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
      >
        Proceed to Checkout
      </button>

      <div className="flex items-center justify-center gap-2">
        <span className="text-sm text-gray-500 dark:text-gray-400">or</span>
        <button
          onClick={onContinue}
          className="text-sm font-medium text-primary-700 underline hover:no-underline dark:text-primary-500"
        >
          Continue Shopping →
        </button>
      </div>
    </div>
  );
};

export default OrderSummary;
