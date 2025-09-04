import React from "react";
import { ShoppingCart, CheckCircle, XCircle } from "lucide-react";

export default function ProductCard({ product }) {
  return (
    <div className="w-[300px] h-[420px] bg-white shadow-lg rounded-2xl m-3 flex flex-col overflow-hidden hover:shadow-xl transition-shadow duration-300">
      {/* Product Image */}
      <div className="h-48 w-full overflow-hidden flex items-center justify-center bg-gray-100">
        <img
          src={product.images[0]}
          alt={product.name}
          className="h-full w-full object-cover hover:scale-105 transition-transform duration-300"
        />
      </div>

      {/* Product Details */}
      <div className="flex flex-col p-4 flex-grow">
        <h2 className="text-lg font-semibold text-gray-800 truncate">
          {product.name}
        </h2>
        {product.altNames && product.altNames.length > 0 && (
          <p className="text-sm text-gray-500 italic truncate">
            ({product.altNames.join(", ")})
          </p>
        )}
        <p className="text-sm text-gray-600 mt-1 line-clamp-2">
          {product.description}
        </p>

        {/* Price & Stock */}
        <div className="flex items-center justify-between mt-3">
          <div>
            <span className="text-lg font-bold text-green-600">
              ${product.price.toFixed(2)}
            </span>
            <p className="text-s text-gray-500 line-through">
              ${product.labeledPrice}
            </p>
          </div>
          {product.isAvailable && product.stock > 0 ? (
            <span className="flex items-center text-s text-green-600">
              <CheckCircle size={14} className="mr-1" /> In Stock
            </span>
          ) : (
            <span className="flex items-center text-s text-red-600">
              <XCircle size={14} className="mr-1" /> Out of Stock
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        <button
          className={`mt-4 w-full flex items-center justify-center px-4 py-2 rounded-xl text-white font-medium shadow-md transition-colors duration-300 ${
            product.isAvailable && product.stock > 0
              ? "bg-blue-600 hover:bg-blue-700 cursor-pointer"
              : "bg-gray-400 cursor-not-allowed"
          }`}
          disabled={!product.isAvailable || product.stock <= 0}
        >
          <ShoppingCart size={18} className="mr-2" />
          Add to Cart
        </button>
      </div>
    </div>
  );
}
