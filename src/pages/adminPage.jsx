import { Link, Routes, Route } from "react-router-dom";
import AdminProductsPage from "./admin/ProductsPage";
import AddProductPage from "./admin/addProductPage";
import EditProductPage from "./admin/editProductsPage";
import { useLocation } from "react-router-dom";
import AdminOrdersPage from "./admin/adminOrdersPage";

export default function AdminPage() {
  const location = useLocation();
  const path = location.pathname;

  function getClass(name) {
    if (path.includes(name)) {
      return "bg-accent text-white block p-4";
    } else {
      return "text-accent block p-4";
    }
  }

  return (
    <div className=" w-full h-screen flex ">
      <div className="h-full w-[300px] bg-white ">
        <Link className={getClass("users")} to="/admin/users">
          Users
        </Link>
        <Link className={getClass("products")} to="/admin/products">
          Products
        </Link>
        <Link to="/admin/orders" className={getClass("orders")}>
          Orders
        </Link>
        <Link to="/admin/reviews" className={getClass("reviews")}>
          Reviews
        </Link>
      </div>
      <div className="h-full w-[calc(100%-300px)] border-accent  border-l-2 p-4 overflow-y-auto relative">
        <Routes>
          <Route path="/*">
            <Route path="products" element={<AdminProductsPage />} />
            <Route path="users" element={<h1>Users</h1>} />
            <Route path="orders" element={<AdminOrdersPage />} />
            <Route path="reviews" element={<h1>Reviews</h1>} />
            <Route path="add-product" element={<AddProductPage />} />
            <Route path="edit-product" element={<EditProductPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}
