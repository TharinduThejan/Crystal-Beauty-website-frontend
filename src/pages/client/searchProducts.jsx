import { useState } from "react";
import ProductCard from "../../components/productCard";
import Loading from "../../components/loading";
import axios from "axios";
import { toast } from "react-hot-toast";

export default function SearchProductPage() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [Query, setQuery] = useState("");

  return (
    <div className="w-full h-full max-h-full overflow-y-scroll  flex flex-wrap justify-center items-center bg-gray-100 p-4">
      <input
        type="text"
        placeholder="Search products..."
        value={Query}
        onChange={async (e) => {
          setQuery(e.target.value);
          setIsLoading(true);
          if (e.target.value.length === 0) {
            setProduct([]);
            setIsLoading(false);
            return;
          }
          try {
            const response = await axios.get(
              import.meta.env.VITE_BACKEND_URL +
                "/api/products/search/" +
                e.target.value
            );
            setProduct(response.data);
          } catch (error) {
            console.error(error);
            toast.error("Error fetching products");
          } finally {
            setIsLoading(false);
          }
        }}
        className="w-full max-w-md p-2 mb-4 border border-gray-300 rounded"
      />
      {Query.length === 0 ? (
        <div className="w-full max-w-md p-2 mb-4 border border-gray-300 rounded">
          <p>No search query entered</p>
        </div>
      ) : (
        <>
          {isLoading ? (
            <Loading />
          ) : (
            <>
              {product.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </>
          )}
        </>
      )}
    </div>
  );
}
