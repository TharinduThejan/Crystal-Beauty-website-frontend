import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { BiPlus, BiMinus } from "react-icons/bi";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function CheckoutPage() {
  const location = useLocation();
  const [cart, setCart] = useState(location.state?.cart || []);
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  function getTotal() {
    return cart.reduce((total, item) => total + item.price * item.qty, 0);
  }

  function removeFromCart(index) {
    setCart(cart.filter((_, i) => i !== index));
  }

  function changeQty(index, qty) {
    const newQty = cart[index].qty + qty;
    if (newQty <= 0) removeFromCart(index);
    else {
      const newCart = [...cart];
      newCart[index].qty = newQty;
      setCart(newCart);
    }
  }

  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (!token) return toast.error("Please login to place order");

    const orderInformation = {
      products: cart.map((item) => ({
        productId: item.productId,
        qty: item.qty,
      })),
      phone,
      address,
    };

    try {
      // Save order in backend
      await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/orders`,
        orderInformation,
        { headers: { Authorization: `Bearer ${token}` } }
      );

      // Create Stripe checkout session
      const sessionResponse = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/products/checkout`,
        {
          products: cart.map((item) => ({
            name: item.name,
            price: item.price,
            qty: item.qty,
            images: item.images,
          })),
        },
        { headers: { "Content-Type": "application/json" } }
      );

      // Get session URL from backend
      const sessionUrl = sessionResponse.data.url;
      if (!sessionUrl) throw new Error("Stripe session URL not found");

      // Redirect manually
      window.location.href = sessionUrl;
    } catch (err) {
      console.error(err);
      toast.error("Failed to place order");
    }
  }

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-purple-50 to-pink-50 flex flex-col items-center px-4 sm:px-6 py-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
        Checkout
      </h1>

      {/* Cart Items */}
      <div className="flex flex-col lg:flex-row w-full max-w-6xl gap-6">
        {/* Cart List */}
        <div className="flex-1 space-y-4">
          {cart.length === 0 ? (
            <p className="text-center text-gray-500 text-lg">
              Your cart is empty
            </p>
          ) : (
            cart.map((item, index) => (
              <div
                key={item.productId}
                className="bg-white shadow-lg rounded-xl flex flex-col sm:flex-row items-center sm:items-stretch p-4 sm:p-6 gap-4 transition-transform hover:scale-[1.01]"
              >
                <img
                  src={item.images}
                  alt={item.name}
                  className="w-24 h-24 sm:w-28 sm:h-28 object-cover rounded-lg"
                />
                <div className="flex flex-col justify-between flex-1">
                  <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                      {item.name}
                    </h2>
                    <p className="text-sm text-gray-500">{item.productId}</p>
                    <div className="flex items-center gap-3 mt-2">
                      <span className="text-gray-400 line-through text-sm">
                        Rs {item.labeledPrice.toFixed(2)}
                      </span>
                      <span className="text-pink-600 font-semibold text-lg">
                        Rs {item.price.toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <div className="flex justify-between items-center mt-3">
                    {/* Quantity Controls */}
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => changeQty(index, -1)}
                        className="p-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
                      >
                        <BiMinus />
                      </button>
                      <span className="font-medium">{item.qty}</span>
                      <button
                        onClick={() => changeQty(index, 1)}
                        className="p-2 bg-pink-500 text-white rounded-md hover:bg-pink-600 transition"
                      >
                        <BiPlus />
                      </button>
                    </div>

                    <span className="font-semibold text-gray-700">
                      Rs {(item.price * item.qty).toFixed(2)}
                    </span>

                    <button
                      onClick={() => removeFromCart(index)}
                      className="text-red-500 hover:text-white hover:bg-red-500 p-2 rounded-md transition"
                    >
                      <BsFillTrashFill size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {/* Order Summary */}
        <div className="lg:w-1/3 w-full bg-white shadow-lg rounded-xl p-6 flex flex-col sticky top-4 h-fit">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Order Summary
          </h2>

          <div className="flex justify-between mb-2 text-gray-600">
            <span>Subtotal:</span>
            <span>Rs {getTotal().toFixed(2)}</span>
          </div>

          <hr className="my-2" />

          <input
            type="text"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full mb-3 focus:ring-2 focus:ring-pink-400 outline-none"
          />
          <textarea
            placeholder="Delivery Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="border border-gray-300 rounded-md p-2 w-full h-24 mb-3 resize-none focus:ring-2 focus:ring-pink-400 outline-none"
          ></textarea>

          <button
            onClick={placeOrder}
            className="bg-gradient-to-r from-pink-500 to-purple-500 text-white py-3 rounded-md font-semibold shadow-md hover:opacity-90 transition"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}
