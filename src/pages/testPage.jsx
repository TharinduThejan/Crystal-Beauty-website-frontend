import { useState } from "react";
export default function TestPage() {
  const [count, setCount] = useState(0);
  // const [a, b] = useState(0);
  // a =  relevant variable
  // b =  function that change value in a

  return (
    <>
      <div className="w-full h-screen  flex justify-center items-center">
        <div className="w-[450px] h-[450px] shadow flex justify-center items-center">
          <button
            onClick={() => {
              setCount(count - 1);
            }}
            className="bg-blue-600 text-amber-100 font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer"
          >
            -
          </button>
          <span className="text-[30px] font-bold text-center w-[100px] h-[40px] mx-[20px] flex justify-center items-center">
            {count}
          </span>
          <button
            onClick={() => {
              setCount(count + 1);
            }}
            className="bg-blue-600 text-amber-100 font-bold text-center w-[100px] h-[40px] text-[20px] cursor-pointer"
          >
            +
          </button>
        </div>
        {/* <h1>Test Page</h1> */}
      </div>
    </>
  );
}
