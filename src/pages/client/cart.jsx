import { getCart } from "../../utils/cart";
import { useState } from "react";
import { BsFillTrashFill } from "react-icons/bs";

export default function CartPage() {
  const [cart, setCart] = useState(getCart());

  return (
    <div className="w-full h-full flex flex-col items-center justify-start p-8 gap-4 overflow-y-auto ">
      {cart.map((item) => {
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
              <button className="text-white text-2xl rounded-xl font-bold px-4 py-2 aspect-square bg-accent hover:text-black cursor-pointer">
                -
              </button>
              <span className="text-black text-1.5xl font-md px-4 py-2">
                {item.qty}
              </span>
              <button className="text-white text-2xl rounded-xl font-bold px-4 py-2 aspect-square bg-accent hover:text-black cursor-pointer ">
                +
              </button>
            </div>
            {/*calculate total price*/}
            <div className="w-[100px] h-full flex flex-row justify-center items-center">
              <span className="text-black text-1.5xl font-semibold px-4 py-2">
                Rs {(item.price * item.qty).toFixed(2)}
              </span>
            </div>
            {/*remove from cart button*/}
            <button className="absolute p-2 font-bold text-xl text-red-700 right-[-40px] rounded-4xl hover:bg-red-700 hover:text-white cursor-pointer">
              <BsFillTrashFill />
            </button>
          </div>
        );
      })}
    </div>
  );
}
