import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { BsCart3 } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

export default function Header() {
  const navigate = useNavigate();
  const [SideDrawerOpen, setSideDrawerOpen] = useState(false);

  return (
    <header className="w-full shadow-lg flex items-center justify-center relative">
      {/* Hamburger Icon */}
      <GiHamburgerMenu
        className="md:hidden text-2xl cursor-pointer absolute left-4"
        onClick={() => setSideDrawerOpen(true)}
      />

      {/* Logo */}
      <img
        onClick={() => navigate("/")}
        src="/logo.png"
        alt="Logo"
        className="h-20 object-cover cursor-pointer mb-2"
      />

      {/* Desktop Navigation */}
      <div className="hidden md:flex h-full justify-between items-center">
        <nav className="w-[calc(100%-160px)] h-full">
          <Link
            to="/"
            className="text-black font-medium px-4 py-2 hover:bg-white hover:text-emerald-600 transition duration-200"
          >
            Home
          </Link>
          <Link
            to="/product"
            className="text-black font-medium px-4 py-2 hover:bg-white hover:text-emerald-600 transition duration-200"
          >
            Product
          </Link>
          <Link
            to="/about"
            className="text-black font-medium px-4 py-2 hover:bg-white hover:text-emerald-600 transition duration-200"
          >
            About
          </Link>
          <Link
            to="/contact"
            className="text-black font-medium px-4 py-2 hover:bg-white hover:text-emerald-600 transition duration-200"
          >
            Contact
          </Link>
        </nav>
      </div>

      {/* Desktop Cart Icon */}
      <div className="hidden md:flex w-[80px] items-center justify-center">
        <Link to="/cart" className="mr-4">
          <BsCart3 className="text-xl" />
        </Link>
      </div>

      {/* Mobile Drawer */}
      {SideDrawerOpen && (
        <div
          className="fixed inset-0 bg-[#00000060] flex md:hidden transition-opacity duration-300"
          onClick={() => setSideDrawerOpen(false)} // close when clicking outside
        >
          <div
            className="w-[280px] bg-white h-full shadow-2xl transform translate-x-0 transition-transform duration-300"
            onClick={(e) => e.stopPropagation()} // prevent close on drawer click
          >
            {/* Drawer Header */}
            <div className="w-full h-[120px] shadow flex justify-center items-center relative">
              <GiHamburgerMenu
                className="text-2xl ml-8 mt-4 cursor-pointer absolute left-4"
                onClick={() => setSideDrawerOpen(false)}
              />
              <img
                onClick={() => {
                  navigate("/");
                  setSideDrawerOpen(false);
                }}
                src="/logo.png"
                alt="Logo"
                className="h-16 ml-3 mt-2 object-cover cursor-pointer"
              />
            </div>

            {/* Drawer Links */}
            <nav className="h-[calc(100%-120px)] flex flex-col gap-2 mt-6 text-center">
              <a
                href="/"
                onClick={() => setSideDrawerOpen(false)}
                className="py-3 text-black font-bold hover:text-emerald-600 transition"
              >
                Home
              </a>
              <a
                href="/product"
                onClick={() => setSideDrawerOpen(false)}
                className="py-3 text-black font-bold hover:text-emerald-600 transition"
              >
                Product
              </a>
              <a
                href="/about"
                onClick={() => setSideDrawerOpen(false)}
                className="py-3 text-black font-bold hover:text-emerald-600 transition"
              >
                About
              </a>
              <a
                href="/contact"
                onClick={() => setSideDrawerOpen(false)}
                className="py-3 text-black font-bold hover:text-emerald-600 transition"
              >
                Contact
              </a>
              <a
                href="/cart"
                onClick={() => setSideDrawerOpen(false)}
                className="py-3 text-black font-bold hover:text-emerald-600 transition"
              >
                <BsCart3 className="inline mr-2" />
                Cart
              </a>
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
