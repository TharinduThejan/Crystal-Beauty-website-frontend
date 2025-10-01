import { useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate, useLocation } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";

export default function EditProductPage() {
  const location = useLocation();
  const [productId, setProductId] = useState(location.state.product.productId);
  const [name, setName] = useState(location.state.product.name);
  const [altNames, setAltNames] = useState(location.state.product.altNames);
  const [description, setDescription] = useState(
    location.state.product.description
  );
  const [images, setImages] = useState([]);
  const [labeledPrice, setLabeledPrice] = useState(
    location.state.product.labeledPrice
  );
  const [price, setPrice] = useState(location.state.product.price);
  const [stock, setStock] = useState(location.state.product.stock);
  const navigate = useNavigate();

  async function updateProduct() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to update a product");
      return;
    }
    let imageUrls = location.state.product.images;

    const promisesArray = [];
    for (let i = 0; i < images.length; i++) {
      promisesArray[i] = mediaUpload(images[i]);
    }
    try {
      if (images.length > 0) {
        imageUrls = await Promise.all(promisesArray);
      }

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
        .put(
          import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId,
          product,
          { headers: { Authorization: "Bearer " + token } }
        )
        .then(() => {
          toast.success("Product updated successfully");
          navigate("/admin/products");
        })
        .catch((err) => {
          toast.error("Failed to update product");
          console.error(err);
        });
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <div className="w-full h-full max-full flex items-center justify-center bg-gray-100 font-[Poppins] px-4 ">
      <div className="bg-white shadow-lg rounded-xl w-full max-w-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Edit Product
        </h1>

        {/* Product ID (Disabled) */}
        <input
          type="text"
          disabled
          value={productId}
          onChange={(e) => setProductId(e.target.value)}
          className="w-full border border-gray-300 bg-gray-100 text-gray-500 rounded-lg px-4 py-2 mb-4 cursor-not-allowed"
        />

        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Alternative Names */}
        <input
          type="text"
          placeholder="Alternative Names (comma separated)"
          value={altNames.join(",")}
          onChange={(e) => setAltNames(e.target.value.split(","))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Description */}
        <textarea
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 h-28 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* File Upload */}
        <input
          type="file"
          onChange={(e) => setImages(e.target.files)}
          multiple
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-2 cursor-pointer file:mr-3 file:py-1 file:px-3 file:border-0 file:bg-blue-500 file:text-white file:rounded-lg hover:file:bg-blue-600"
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
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-4 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Price */}
        <input
          type="number"
          placeholder="Price"
          value={price}
          onChange={(e) => setPrice(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Stock */}
        <input
          type="number"
          placeholder="Stock"
          value={stock}
          onChange={(e) => setStock(Number(e.target.value))}
          className="w-full border border-gray-300 rounded-lg px-4 py-2 mb-6 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {/* Buttons */}
        <div className="flex justify-between items-center">
          <button
            onClick={updateProduct}
            className="w-1/2 bg-blue-600 hover:bg-blue-700 transition-all duration-200 text-white py-2 px-4 rounded-lg font-medium mr-2"
          >
            Update Product
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
