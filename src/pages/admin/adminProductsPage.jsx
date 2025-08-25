import React, { useEffect, useState } from "react";
import { sampleProducts } from "../../assets/sampleData";
import axios from "axios";

export default function AdminProductsPage() {
  const [products, setProducts] = useState(sampleProducts);
  /*useEffect(load weddi eka parak run karanna oni function eka , [] empty array eka)*/
  useEffect(() => {
    axios
      .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
      .then((response) => {
        console.log(response.data);
      });
  }, []);

  return (
    <div className="w-full h-full max-h-full overflow--y-scroll">
      <table className="w-full ">
        <thead>
          <tr>
            <th>Product ID</th>
            <th>Name</th>
            <th>Image</th>
            <th>Lablled Price</th>
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
