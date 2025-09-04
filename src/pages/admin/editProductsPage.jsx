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
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
  const navigate = useNavigate();

  async function updateProduct() {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to add a product");
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
      console.log(imageUrls);
      // altNames is already an array from state
      const product = {
        productId: productId,
        name: name,
        altNames: altNames,
        description: description,
        images: imageUrls,
        labeledPrice: labeledPrice,
        price: price,
        stock: stock,
        isAvailable: true,
      };
      axios
        .put(
          import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId,
          product,
          {
            headers: {
              Authorization: "Bearer " + token,
            },
          }
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
    <div className="w-full h-full flex flex-col justify-center items-center bg-white">
      <input
        type="text"
        disabled
        placeholder="Product ID"
        value={productId}
        onChange={(e) => setProductId(e.target.value)}
        className="input input-bordered w-full max-w-xs"
      />

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="input input-bordered w-full max-w-xs"
      />

      <input
        type="text"
        placeholder="Alternative Names (comma separated)"
        value={altNames.join(",")}
        onChange={(e) => setAltNames(e.target.value.split(","))}
        className="input input-bordered w-full max-w-xs"
      />

      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        className="textarea textarea-bordered w-full max-w-xs"
      />

      <input
        type="file"
        placeholder="Image URLs (comma separated)"
        onChange={(e) => {
          setImages(e.target.files);
        }}
        multiple
        className="input input-bordered w-full max-w-xs"
      />
      {images && images.length > 0 && (
        <div className="mt-2 text-sm text-gray-700">
          Selected files:{" "}
          {Array.from(images)
            .map((file) => file.name)
            .join(", ")}
        </div>
      )}

      <input
        type="text"
        placeholder="Labeled Price"
        value={labeledPrice}
        onChange={(e) => setLabeledPrice(Number(e.target.value))}
        className="input input-bordered w-full max-w-xs"
      />

      <input
        type="text"
        placeholder="Price"
        value={price}
        onChange={(e) => setPrice(Number(e.target.value))}
        className="input input-bordered w-full max-w-xs"
      />

      <input
        type="text"
        placeholder="Stock"
        value={stock}
        onChange={(e) => setStock(Number(e.target.value))}
        className="input input-bordered w-full max-w-xs"
      />
      <div className="flex flex-row w-full justify-center items-center mt-4">
        <button
          onClick={updateProduct}
          className="btn btn-primary bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Update Product
        </button>
        <Link
          to="/admin/products"
          className="btn btn-secondary bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded ml-2"
        >
          Cancel
        </Link>
      </div>
    </div>
  );
}
