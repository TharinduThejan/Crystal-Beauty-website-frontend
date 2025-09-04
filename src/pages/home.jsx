import { Routes, Route } from "react-router-dom";
import Header from "../components/header";
import Product from "./client/productPage";

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center  bg-gradient-to-r from-white-500 text-black p-8">
      <Header />
      <div className="bg-amber-500 w-full h-[calc(100vh-80px)] flex flex-col items-center">
        <Routes path="/">
          <Route path="/" element={<h1>Home Page</h1>} />
          <Route path="/product" element={<Product />} />
          <Route path="/about" element={<h1>About Page</h1>} />
          <Route path="/contact" element={<h1>Contact Page</h1>} />
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </div>
    </div>
  );
}
