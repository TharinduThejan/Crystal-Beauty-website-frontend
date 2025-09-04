import { Link, Routes, Route } from "react-router-dom";
import AdminProductsPage from "./admin/ProductsPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductsPage";

export default function AdminPage() {
  return (
    <div className=" w-full h-screen flex ">
      <div className="h-full w-[300px] bg-white ">
        <Link
          to="/admin/users"
          className="block text-black p-4 hover:bg-blue-700"
        >
          Users
        </Link>
        <Link
          to="/admin/products"
          className="block text-black p-4 hover:bg-blue-700"
        >
          Products
        </Link>
        <Link
          to="/admin/orders"
          className="block text-black p-4 hover:bg-blue-700"
        >
          Orders
        </Link>
      </div>
      <div className="h-full w-[calc(100%-300px)] ">
        <Routes>
          <Route path="/*">
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="users" element={<h1>Users</h1>} />
            <Route path="orders" element={<h1>Orders</h1>} />
            <Route path="add-product" element={<AddProductPage />} />
            <Route path="edit-product" element={<EditProductPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
