import { getCart, addToCart, removeFromCart, getTotal } from "../../utils/cart";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { BiPlus, BiMinus } from "react-icons/bi";
import { Link } from "react-router-dom";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  return (
    <div className="w-full min-h-screen flex flex-col items-center justify-start p-4 md:p-8 gap-4 overflow-y-auto bg-gray-50">
      {/* Total & Checkout Section */}
      <div className="w-full md:w-auto fixed bottom-0 md:static bg-white border-t md:border-none shadow-md flex flex-col md:flex-row justify-between items-center px-4 py-2 md:p-4 rounded-none md:rounded-lg z-10">
        <h2 className="text-lg font-semibold text-accent">
          Total: Rs {getTotal().toFixed(2)}
        </h2>
        <Link to="/checkout" state={{ cart }} className="mt-2 md:mt-0">
          <button className="bg-accent text-white px-4 py-2 rounded-lg hover:bg-accent/80 transition">
            Checkout
          </button>
        </Link>
      </div>
      {/* Cart Items */}
      <div className="w-full flex flex-col items-center gap-4 mt-16 md:mt-4 pb-20 md:pb-0">
        {cart.length === 0 ? (
          <h2 className="text-gray-600 text-lg mt-10">Your cart is empty 🛒</h2>
        ) : (
          cart.map((item) => (
            <div
              key={item.productId}
              className="w-full md:w-[600px] bg-white rounded-lg shadow-md flex flex-col md:flex-row items-center md:items-center justify-between p-4 gap-4"
            >
              {/* Product Image */}
              <img
                src={item.images}
                alt={item.name}
                className="w-[100px] h-[100px] object-cover rounded-md"
              />
              {/* Product Info */}
              <div className="flex flex-col text-center md:text-left">
                <h2 className="text-lg font-semibold text-secondary">
                  {item.name}
                </h2>
                <p className="text-sm text-gray-500">{item.productId}</p>
                <div className="flex flex-row items-center justify-center md:justify-start gap-2">
                  <span className="text-sm font-semibold text-gray-400 line-through">
                    Rs {item.labeledPrice.toFixed(2)}
                  </span>
                  <span className="text-md font-semibold text-accent">
                    Rs {item.price.toFixed(2)}
                  </span>
                </div>
              </div>
              {/* Quantity Controls */}
              <div className="flex flex-row items-center justify-center gap-2">
                <button
                  className="text-white text-xl rounded-md font-bold px-3 py-2 bg-accent hover:bg-accent/80"
                  onClick={() => {
                    addToCart(item, -1);
                    setCart(getCart());
                  }}
                >
                  <BiMinus />
                </button>
                <span className="text-black text-lg font-semibold">
                  {item.qty}
                </span>
                <button
                  className="text-white text-xl rounded-md font-bold px-3 py-2 bg-accent hover:bg-accent/80"
                  onClick={() => {
                    addToCart(item, 1);
                    setCart(getCart());
                  }}
                >
                  <BiPlus />
                </button>
              </div>
              {/* Total per item */}
              <div className="flex items-center justify-center">
                <span className="text-black font-semibold">
                  Rs {(item.price * item.qty).toFixed(2)}
                </span>
              </div>
              {/* Remove button */}
              <button
                className="text-red-600 hover:text-white hover:bg-red-600 p-2 rounded-md transition"
                onClick={() => {
                  removeFromCart(item.productId);
                  setCart(getCart());
                }}
              >
                <BsFillTrashFill />
              </button>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
