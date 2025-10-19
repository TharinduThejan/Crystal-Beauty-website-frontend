import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import Product from "./client/productPage.jsx";
import ProductOverview from "./client/productOverview.jsx";
import CartPage from "./client/cart.jsx";
import CheckoutPage from "./client/checkout.jsx";
import SearchProductPage from "./client/searchProducts.jsx";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center  bg-gradient-to-r from-white-500 text-black p-8">
      <Header />
      <div className="bg-aqua-500  w-full h-[calc(100vh-80px)] flex flex-col  items-center">
        <Routes path="/">
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/product" element={<Product />} />
          <Route path="/search" element={<SearchProductPage />} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/overview/:id" element={<ProductOverview />} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}
