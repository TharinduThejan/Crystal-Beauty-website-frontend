import { Link, Navigate } from "react-router-dom";
import UserData from "./userData";
import { useNavigate } from "react-router-dom";

export default function Header() {
  const navigate = useNavigate();
  return (
    <header className="w-full shadow-lg  flex items-center justify-between">
      <img
        onClick={() => navigate("/")}
        src="/logo.png"
        alt="Logo"
        className="h-20 object-cover cursor-pointer"
      />
      <nav className="w-[calac(100%-160px)]h-full">
        <Link
          to="/"
          className="text-black font-medium px-4 py-2  hover:bg-white hover:text-emerald-600 transition duration-200 "
        >
          Home
        </Link>
        <Link
          to="/product"
          className="text-black font-medium px-4 py-2  hover:bg-white hover:text-emerald-600 transition duration-200 "
        >
          Product
        </Link>
        <Link
          to="/about"
          className="text-black font-medium px-4 py-2  hover:bg-white hover:text-emerald-600 transition duration-200 "
        >
          About
        </Link>
        <Link
          to="/contact"
          className="text-black font-medium px-4 py-2  hover:bg-white hover:text-emerald-600 transition duration-200 "
        >
          Contact
        </Link>
      </nav>
      <div className="w-[80px] bg-blue-500">
        <UserData />
      </div>
    </header>
  );
}
