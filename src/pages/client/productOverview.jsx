import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";
import Loading from "../../components/loading";
import ImageSlider from "../../components/imageSlider.jsx";
import { addToCart } from "../../utils/cart.js";
import { getCart } from "../../utils/cart.js";

export default function ProductOverview() {
  const params = useParams();
  const productId = params.id; // Access the dynamic segment from the URL
  const [status, setStatus] = useState("loading"); // "loading", "error", "success"
  const [product, setProduct] = useState(null);
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId)
      .then((response) => {
        console.log(response.data);
        setProduct(response.data);
        setStatus("success");
      })
      .catch((error) => {
        console.error("Error fetching product details:", error);
        setStatus("error");
        toast.error("Failed to load product details");
      });
    // Fetch product details using the productId
    // Example: axios.get(`/api/products/${productId}`).then(...);
  }, [productId]);
  return (
    <>
      {status == "success" && (
        <div className=" flex w-full h-full">
          <div className="w-[50%]  h-full flex justify-center items-center">
            <ImageSlider images={product.images} />
          </div>
          <div className="flex justify-center items-center w-[50%]  h-full">
            <div className="w-[500px] h-[600px] flex flex-col items-center bg-white p-8 rounded-3xl shadow-lg">
              <h1 className="w-full text-center text-4xl text-secondary font-semibold ">
                {product.name}
                {product.altNames.map((altName, index) => (
                  <span key={index} className="text-4xl text-gray-500">
                    {" "}
                    {" | " + altName}{" "}
                  </span>
                ))}
              </h1>
              {/*product Id*/}
              <h1 className="w-full text-center text-sm text-gray-400 font-semibold my-2">
                {product.productId}
              </h1>
              <hr className="w-full my-4 border-gray-300" />
              {/*description*/}
              <p className="mt-2 font-semibold text-gray-900 text-center my-2 text-md">
                {product.description}
              </p>
              {product.labeledPrice > product.price ? (
                <div>
                  <span className="text-3xl  text-gray-400 my-4 mx-4 line line-through">
                    {product.labeledPrice.toFixed(2)}
                  </span>

                  <span className="text-3xl font-semibold text-accent my-4">
                    {product.price.toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="text-3xl  text-accent my-4">
                  {product.price.toFixed(2)}
                </span>
              )}
              <div className="w-full flex justify-center items-center mt-4">
                <button
                  onClick={() => {
                    // localStorage.removeItem("cart");
                    console.log("old cart");
                    console.log(getCart());
                    addToCart(product, 1);
                    console.log("new cart");
                    console.log(getCart());
                  }}
                  className="bg-accent text-white px-4 py-3 rounded-full text-lg font-semibold hover:bg-purple-700 transition duration-300 cursor-pointer"
                >
                  Add to Cart
                </button>
                <button className="bg-accent text-white px-6 py-3 rounded-full text-lg font-semibold hover:bg-gray-700 transition duration-300 ml-4 cursor-pointer">
                  Buy Now
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {status == "loading" && <Loading />}
    </>
  );
}
