import React from "react";
import "./App.css";
import Header from "./components/header";
import ProductCard from "./components/productCard";
import Login from "./pages/login.jsx";
import SignUp from "./pages/signUp.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import AdminPage from "./pages/adminPage.jsx";

function App() {
  return (
    <BrowserRouter>
      <>
        <Header />
        <Routes path="/*">
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/admin/*" element={<AdminPage />} />
          {/* //for all other wrong paths */}
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
