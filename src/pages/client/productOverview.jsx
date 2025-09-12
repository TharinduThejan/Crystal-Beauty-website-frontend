import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

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
    <div>
      <h1>Product Overview for {productId}</h1>
      {/* Product details and information will be displayed here */}
    </div>
  );
}
