import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";
import { BiPlus } from "react-icons/bi";
import { BiMinus } from "react-icons/bi";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import Product from "../../../../Crystal-Beauty-website-Backend/models/product";
import axios from "axios";
import { toast } from "react-hot-toast";
export default function CheckoutPage() {
  const location = useLocation(); // get cart from location state(using state prop of Link component in cart.jsx)
  console.log(location.state.cart);
  //{use useparam to get id from url
  //const { id } = useParams();}
  const [cart, setCart] = useState(location.state?.cart || []); // if cart is not passed in location state, set it to empty array
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");

  function getTotal() {
    let total = 0;
    cart.forEach((item) => {
      total += item.price * item.qty;
    });
    return total;
  }
  function removeFromCart(Index) {
    const newCart = cart.filter((item, i) => {
      return i !== Index;
    });
    setCart(newCart);
  }
  function changeQty(Index, qty) {
    const newQty = cart[Index].qty + qty;
    if (newQty <= 0) {
      removeFromCart(Index);
    } else {
      const newCart = [...cart];
      newCart[Index].qty = newQty;
      setCart(newCart);
      // Update the cart state
    }
  }
  async function placeOrder() {
    const token = localStorage.getItem("token");
    if (!token) {
      alert("Please login to place order");
      return;
    }
    const orderInformation = {
      products: [],
      phone: phone,
      address: address,
    };
    for (let i = 0; i < cart.length; i++) {
      const item = {
        productId: cart[i].productId,
        qty: cart[i].qty,
      };
      orderInformation.products[i] = item;
    }
    try {
      const res = await axios.post(
        import.meta.env.VITE_BACKEND_URL + "/api/orders",
        orderInformation,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      toast.success("Order placed successfully");
      console.log(res.data);

      // You can handle the response here if needed
    } catch (err) {
      console.log(err);
      toast.error("Failed to place order");
      return;
    }
  }

  return (
    <div className="w-full h-full flex relative flex-col items-center justify-start p-8 gap-4 overflow-y-auto ">
      <div className="w-[400px]  absolute top-5 right-2 bg-white flex  justify-center items-center rounded-lg shadow-md  flex-col ">
        <h2 className="text-lg font-semibold text-accent">
          Total Amount: Rs {getTotal().toFixed(2)}
        </h2>
        <input
          type="text"
          placeholder="Phone Number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          className="w-[90%] h-8 border border-gray-300 rounded-md px-2 mt-1"
        />
        <input
          type="text"
          placeholder="Address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="w-[90%] h-8 border border-gray-300 rounded-md px-2 mt-1"
        />
        <button
          onClick={placeOrder}
          className="bg-accent text-white px-4 py-0.5 rounded-lg hover:cursor-pointer hover:text-black"
        >
          Place Order
        </button>
      </div>
      {cart.map((item, Index) => {
        return (
          <div
            key={item.productId}
            className="w-[600px] h-[100px] bg-primary rounded-lg shadow-md flex flex-row items-center p-4 gap-4 justify-center relative"
          >
            <img
              src={item.images}
              alt={item.name}
              className="w-[80px] h-[80px] object-cover rounded-md"
            />
            <div className="w-[250px] h-full flex flex-col justify-center items-start">
              <h2 className="text-lg font-semibold text-secondary">
                {item.name}
              </h2>
              <h3 className="text-md font-semibold text-gray-500">
                {item.productId}
              </h3>
              <div className="flex flex-row items-center gap-4">
                <h3 className="text-md font-semibold text-gray-500 line-through">
                  {item.labeledPrice.toFixed(2)}
                </h3>

                <h3 className="text-md font-semibold text-accent">
                  {item.price.toFixed(2)}
                </h3>
              </div>
            </div>
            <div className=" w-[100px] h-full flex flex-row justify-center items-center">
              <button
                className="text-white text-2xl rounded-xl font-bold px-4 py-2 aspect-square bg-accent hover:text-black cursor-pointer"
                onClick={() => {
                  changeQty(Index, -1);
                }}
              >
                <BiMinus />
              </button>
              <span className="text-black text-1.5xl font-md px-4 py-2">
                {item.qty}
              </span>
              <button
                className="text-white text-2xl rounded-xl font-bold px-4 py-2 aspect-square bg-accent hover:text-black cursor-pointer "
                onClick={() => {
                  changeQty(Index, 1);
                }}
              >
                <BiPlus />
              </button>
            </div>
            {/*calculate total price*/}
            <div className="w-[100px] h-full flex flex-row justify-center items-center">
              <span className="text-black text-1.5xl font-semibold px-4 py-2">
                Rs {(item.price * item.qty).toFixed(2)}
              </span>
            </div>
            {/*remove from cart button*/}
            <button
              className="absolute p-2 font-bold text-xl text-red-700 right-[-40px] rounded-4xl hover:bg-red-700 hover:text-white cursor-pointer"
              onClick={() => {
                removeFromCart(Index);
              }}
            >
              <BsFillTrashFill />
            </button>
          </div>
        );
      })}
    </div>
  );
}
