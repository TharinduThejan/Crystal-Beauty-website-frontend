import { Routes, Route, Link, useLocation } from "react-router-dom";
import Header from "../components/header";
import Product from "./client/productPage.jsx";
import ProductOverview from "./client/productOverview.jsx";
import CartPage from "./client/cart.jsx";
import CheckoutPage from "./client/checkout.jsx";
import SearchProductPage from "./client/searchProducts.jsx";
import ProductCard from "../components/productCard.jsx";
import About from "./about.jsx";
import Contact from "./contact.jsx";
import Footer from "../components/footer.jsx";
import Success from "./success.jsx";
import Cancel from "./cancel.jsx";
import { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import HomePageHero from "../components/HomePageHero.jsx";

export default function Home() {
  const [product, setProduct] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const location = useLocation();
  const isRoot = location.pathname === "/";
  useEffect(() => {
    if (isLoading) {
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/products")
        .then((response) => {
          setProduct(response.data);
          setIsLoading(false);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [isLoading]);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-purple-50 via-white to-white text-gray-900 overflow-x-hidden">
      <Header />
      <main className="w-full flex-1">
        <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-6">
          {isRoot && (
            <>
              {isRoot && <HomePageHero />}

              {/* Hero
              <section className="rounded-3xl bg-gradient-to-r from-fuchsia-100 via-purple-100 to-blue-100 p-8 sm:p-12 mb-8 shadow-sm">
                <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6">
                  <div className="flex-1">
                    <h1 className="text-3xl sm:text-4xl font-bold leading-tight">
                      Discover your everyday glow
                    </h1>
                    <p className="mt-3 text-sm sm:text-base text-gray-600 max-w-2xl">
                      Premium skincare and makeup essentials curated for
                      comfort, color, and confidence.
                    </p>
                    <div className="mt-6 flex flex-wrap gap-3">
                      <Link
                        to="/product"
                        className="inline-flex items-center rounded-xl bg-indigo-600 text-white px-5 py-2.5 text-sm font-medium shadow hover:bg-indigo-700 transition"
                      >
                        Shop Products
                      </Link>
                      <Link
                        to="/search"
                        className="inline-flex items-center rounded-xl bg-white text-indigo-700 ring-1 ring-indigo-200 px-5 py-2.5 text-sm font-medium hover:bg-indigo-50 transition"
                      >
                        Browse by Category
                      </Link>
                    </div>
                  </div>
                  <div className="w-full sm:w-72 h-40 sm:h-48 rounded-2xl bg-white/70 backdrop-blur flex items-center justify-center shadow">
                    <img
                      src="/logo.png"
                      alt="Crystal Beauty"
                      className="h-20 sm:h-24 object-contain"
                    />
                  </div>
                </div>
              </section> */}

              {/* Featured Products */}
              <section className="mb-10">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-xl sm:text-2xl font-semibold">
                    Featured picks
                  </h2>
                  <Link
                    to="/product"
                    className="text-sm text-indigo-700 hover:text-indigo-800"
                  >
                    View all
                  </Link>
                </div>
                <div className="grid gap-4 grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
                  {product.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>
              </section>
            </>
          )}
          <Routes>
            <Route path="/" element={<></>} />
            <Route path="/product" element={<Product />} />
            <Route path="/search" element={<SearchProductPage />} />
            <Route path="/about" element={<About />} />
            <Route path="/overview/:id" element={<ProductOverview />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/cart" element={<CartPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/success" element={<Success />} />
            <Route path="/cancel" element={<Cancel />} />
            <Route
              path="/*"
              element={<h1 className="text-xl font-semibold">404 Not Found</h1>}
            />
          </Routes>
        </div>
      </main>
      <Footer />
    </div>
  );
}
