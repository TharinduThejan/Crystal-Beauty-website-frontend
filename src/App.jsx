import React from "react";
import "./App.css";
import Header from "./components/header";
import ProductCard from "./components/productCard";
import Login from "./pages/login.jsx";
import SignUp from "./pages/signUp.jsx";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/home.jsx";
import AdminPage from "./pages/adminPage.jsx";
import TestPage from "./pages/testPage.jsx";
import { Toaster } from "react-hot-toast";
import Register from "./pages/register.jsx";

function App() {
  return (
    <BrowserRouter>
      <>
        <Toaster position="top-right" />
        {/* <Header /> */}
        <Routes path="/*">
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/admin/*" element={<AdminPage />} />
          <Route path="/testing" element={<TestPage />} />
          {/* //for all other wrong paths */}
          <Route path="/*" element={<h1>404 Not Found</h1>} />
        </Routes>
      </>
    </BrowserRouter>
  );
}

export default App;
/*https://wygdrdwatnbwuuuwglbc.supabase.co*/
