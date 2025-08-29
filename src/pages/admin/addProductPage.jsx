import { useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import mediaUpload from "../../utils/mediaUpload";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function AddProductPage() {
  //  productId: {
  //
  //     },
  //     name: {
  //
  //     },
  //     altNames: {
  //         type: [String],
  //         required: false
  //     },
  //     description: {
  //         type: String,
  //         required: true
  //     },
  //     images: {
  //         type: [String],
  //         required: true
  //     },
  //     labeledPrice: {
  //         type: String,
  //         required: true
  //     },
  //     price: {
  //         type: Number,
  //         required: true
  //     },
  //     stock: {
  //         type: Number,
  //         required: true
  //     }, isAvailable: {
  //         type: Boolean,
  //         required: true,
  //         default: true
  //     },

  const [productId, setProductId] = useState("");
  const [name, setName] = useState("");
  const [altNames, setAltNames] = useState([]);
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [labeledPrice, setLabeledPrice] = useState(0);
  const [price, setPrice] = useState(0);
  const [stock, setStock] = useState(0);
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
        .post(import.meta.env.VITE_BACKEND_URL + "/api/products", product, {
          headers: {
            Authorization: "Bearer " + token,
          },
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
    <div className="w-full h-full flex flex-col justify-center items-center bg-white">
      <input
        type="text"
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
          onClick={AddProduct}
          className="btn btn-primary bg-green-500 hover:bg-green-700 text-white px-4 py-2 rounded"
        >
          Add Product
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
