import React, { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";
import { Link } from "react-router-dom";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(sampleProducts);
  /*useEffect(load weddi eka parak run karanna oni function eka , [] empty array eka)*/
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
      .then((response) => {
        setProducts(response.data);
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error fetching products:", error);
      });
  }, []);

  return (
    <div className="w-full h-full max-h-full overflow-y-scroll bg-amber-200 relative">
      <Link
        to="/admin/add-product"
        className="w-15 h-15  absolute bottom-4 text-4xl text-center justify-center items-center right-4 bg-green-500 text-white px-4 py-2 rounded"
      >
        +
      </Link>
      <table className="w-full ">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Labeled Price</th>
            <th>Stock</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => {
            return (
              <tr key={index} className="text-center border-t">
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
                <td></td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
