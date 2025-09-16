import React, { useState } from "react";

export default function ImageSlider({ images }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <div className="w-[500px] h-[600px] border-2 border-gray-300 rounded-2xl">
      <img
        className="w-full h-[500px] object-cover rounded-t-3xl"
        src={images?.[currentIndex]}
        alt="main"
      />
      <div className="w-full h-[100px] flex justify-center items-center ">
        {images?.map((image, index) => {
          return (
            <img
              key={index}
              className={
                "cursor-pointer object-cover w-[90px] h-[90px] rounded-2xl m-2 overflow hover:border-4 hover:border-accent-500" +
                (index === currentIndex ? " border-4 border-accent-500" : "")
              }
              src={image}
              onClick={() => setCurrentIndex(index)}
            />
          );
        })}
      </div>
    </div>
  );
}
