import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import ProductCard from "../../components/productCard";

export default function ProductPage() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((response) => {
          setProduct(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isLoading]);
  return (
    <div className="w-full h-full max-h-full overflow-y-scroll  flex flex-wrap justify-center items-center bg-gray-100 p-4">
      {product.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
