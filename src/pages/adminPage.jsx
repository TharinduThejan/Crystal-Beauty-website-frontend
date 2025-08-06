import { Link, Routes, Route } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="bg-red-900 w-full h-screen flex ">
      <div className="h-full w-[300px] bg-blue-900 ">
        <Link
          to="/admin/users"
          className="block text-white p-4 hover:bg-blue-700"
        >
          Users
        </Link>
        <Link
          to="/admin/products"
          className="block text-white p-4 hover:bg-blue-700"
        >
          Products
        </Link>
        <Link
          to="/admin/orders"
          className="block text-white p-4 hover:bg-blue-700"
        >
          Orders
        </Link>
      </div>
      <div className="h-full w-[calc(100%-300px)] bg-amber-500 p-6">
        <Routes>
          <Route path="/*">
            <Route path="products" element={<h1>Products</h1>} />
            <Route path="users" element={<h1>Users</h1>} />
            <Route path="orders" element={<h1>Orders</h1>} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
