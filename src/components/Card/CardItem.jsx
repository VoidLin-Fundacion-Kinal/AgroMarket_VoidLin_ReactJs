// components/CartItem.jsx
import React from 'react';

const CartItem = ({
  imageLight,
  imageDark,
  title,
  price,
  quantity,
  onAddFavorite,
  onRemove,
  onIncrement,
  onDecrement
}) => {
  return (
    <div className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm dark:border-gray-700 dark:bg-gray-800 md:p-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div className="shrink-0 md:order-1">
          <img className="h-20 w-20 dark:hidden" src={imageLight} alt={title} />
          <img className="hidden h-20 w-20 dark:block" src={imageDark} alt={title} />
        </div>

        <div className="flex items-center md:order-3">
          <button
            onClick={onDecrement}
            className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" fill="none" viewBox="0 0 18 2">
              <path d="M1 1h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>

          <input
            readOnly
            type="text"
            value={quantity}
            className="w-10 border-0 bg-transparent text-center text-sm font-medium text-gray-900 dark:text-white"
          />

          <button
            onClick={onIncrement}
            className="inline-flex h-5 w-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:hover:bg-gray-600"
          >
            <svg className="h-2.5 w-2.5 text-gray-900 dark:text-white" fill="none" viewBox="0 0 18 18">
              <path d="M9 1v16M1 9h16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        <div className="md:order-2 flex-1 space-y-2">
          <h3 className="text-base font-medium text-gray-900 dark:text-white">{title}</h3>
          <div className="flex items-center gap-4">
            <button
              onClick={onAddFavorite}
              className="text-sm text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              ❤️ Add to Favorites
            </button>
            <button
              onClick={onRemove}
              className="text-sm text-red-600 hover:underline dark:text-red-500"
            >
              ❌ Remove
            </button>
          </div>
        </div>

        <div className="md:order-4 text-end md:w-32">
          <p className="text-base font-bold text-gray-900 dark:text-white">${price}</p>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
