import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState([]);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [labeledPrice, setLabeledPrice] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const navigate = useNavigate();

  async function AddProduct() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add a product");
      return;
    }
    if (images.length <= 0) {
      toast.error("Please select at least one image");
      return;
    }
    const promisesArray = [];
    for (let i = 0; i < images.length; i++) {
      promisesArray[i] = mediaUpload(images[i]);
    }
    try {
      const imageUrls = await Promise.all(promisesArray);
      const product = {
        productId,
        name,
        altNames,
        description,
        images: imageUrls,
        labeledPrice,
        price,
        stock,
        isAvailable: true,
      };
      axios
        .post(import.meta.env.VITE_BACKEND_URL + "/api/products", product, {
          headers: { Authorization: "Bearer " + token },
        })
        .then(() => {
          toast.success("Product added successfully");
          navigate("/admin/products");
        })
        .catch((err) => {
          toast.error("Failed to add product");
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full h-full max-full flex items-center justify-center bg-gray-100 font-[Poppins] px-4">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-3 gap-2">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 mt-1 text-center">
          Add New Product
        </h1>

        {/* Product ID */}
        <input
          type="text"
          placeholder="Product ID"
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Alternative Names */}
        <input
          type="text"
          placeholder="Alternative Names (comma separated)"
          value={altNames.join(",")}
          onChange={(e) => setAltNames(e.target.value.split(","))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 h-28 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Image Upload */}
        <input
          type="file"
          onChange={(e) => setImages(e.target.files)}
          multiple
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 cursor-pointer file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-green-500 file:text-white file:rounded-lg hover:file:bg-green-600"
        />
        {images && images.length > 0 && (
          <div className="mt-2 text-sm text-gray-600">
            Selected files:{" "}
            {Array.from(images)
              .map((file) => file.name)
              .join(", ")}
          </div>
        )}

        {/* Labeled Price */}
        <input
          type="number"
          placeholder="Labeled Price"
          value={labeledPrice}
          onChange={(e) => setLabeledPrice(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-4 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Stock */}
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-green-500"
        />

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={AddProduct}
            className="w-1/2 bg-green-600 hover:bg-green-700 transition-all duration-200 text-white py-2 px-4 rounded-lg font-medium mr-2"
          >
            Add Product
          </button>
          <Link
            to="/admin/products"
            className="w-1/2 text-center bg-red-500 hover:bg-red-600 transition-all duration-200 text-white py-2 px-4 rounded-lg font-medium ml-2"
          >
            Cancel
          </Link>
        </div>
      </div>
    </div>
  );
}
