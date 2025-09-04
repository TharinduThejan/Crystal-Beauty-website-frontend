import React, { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { FaEdit, FaTrash } from "react-icons/fa";
import toast from "react-hot-toast";

export default function AdminProductsPage() {
  // {
  const [products, setProducts] = useState(sampleProducts);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  /*useEffect(load weddi eka parak run karanna oni function eka , [] empty array eka)*/
  useEffect(() => {
    if (isLoading == true) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((response) => {
          setProducts(response.data);
          console.log(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching products:", error);
        });
    }
  }, [isLoading]);

  //  } this  structure is common for all pages that have data tables

  function deleteProduct(productId) {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("You must be logged in to delete a product");
      return;
    }
    axios
      .delete(import.meta.env.VITE_BACKEND_URL + "/api/products/" + productId, {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then(() => {
        toast.success("Product deleted successfully");
        setProducts(products.filter((item) => item.productId !== productId));
      })
      .catch((error) => {
        toast.error("Failed to delete product");
        console.error(error);
      });
  }

  return (
    <div className="w-full h-full max-h-full overflow-y-scroll  relative">
      <Link
        to="/admin/add-product"
        className="w-15 h-15  absolute bottom-4 text-4xl text-center justify-center items-center right-4 bg-green-500 text-white px-4 py-2 rounded"
      ></Link>
      {isLoading ? ( // use if else condition in html
        <div className="flex justify-center items-center h-full">
          {/* <div className="w-[70px] h-[70px] border-t-[5px] rounded-full animate-spin border-green-500"></div>   :  loading ciycle in css style 1 */}
          <div className="w-[70px] h-[70px] border-[5px] border-gray-100 border-t-blue-900  rounded-full animate-spin "></div>
          {/*loading ciycle in css style 2 */}
        </div>
      ) : (
        <table className="w-full ">
          <thead className="bg-gray-200 mb-5">
            <tr>
              <th>Product ID</th>
              <th>Name</th>
              <th>Image</th>
              <th>Labeled Price</th>
              <th>Stock</th>
              <th>Actions</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {products.map((item, index) => {
              return (
                <tr key={index} className="text-center m-1">
                  <td>{item.productId}</td>
                  <td>{item.name}</td>
                  <td>
                    <img
                      src={item.images[0]}
                      className="w-[50px] h-[50px] "
                      alt={item.name}
                    />
                  </td>
                  <td>${item.labeledPrice}</td>
                  <td>{item.stock}</td>
                  <td>
                    <div className="flex justify-center items-center space-x-2">
                      <FaTrash
                        onClick={() => {
                          deleteProduct(item.productId);
                          setIsLoading(true);
                        }}
                        className="text-red-500 cursor-pointer mx-2"
                      />
                      <FaEdit
                        onClick={() =>
                          navigate("/admin/edit-product", {
                            state: { product: item },
                          })
                        }
                        className="text-blue-500 cursor-pointer mx-2"
                      />
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
