import { Link } from "react-router-dom";
import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa6";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="w-full mt-10 border-t bg-white/70 backdrop-blur">
      <div className="mx-auto max-w-7xl w-full px-4 sm:px-6 lg:px-8 py-10 text-sm text-gray-600">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2">
              <img
                src="/logo.png"
                alt="Crystal Beauty"
                className="h-8 w-auto"
              />
              <span className="text-lg font-semibold text-gray-900">
                Crystal Beauty
              </span>
            </div>
            <p className="mt-3 max-w-xs">
              Effortless beauty, everyday. Skin-loving formulas and shades that
              make you glow.
            </p>
            <div className="mt-4 flex items-center gap-3 text-gray-500">
              <a
                href="#"
                aria-label="Instagram"
                className="hover:text-indigo-600"
              >
                <FaInstagram />
              </a>
              <a
                href="#"
                aria-label="Facebook"
                className="hover:text-indigo-600"
              >
                <FaFacebook />
              </a>
              <a href="#" aria-label="TikTok" className="hover:text-indigo-600">
                <FaTiktok />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="hover:text-indigo-600"
              >
                <FaYoutube />
              </a>
            </div>
          </div>

          {/* Shop */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3">Shop</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/product" className="hover:text-indigo-700">
                  All products
                </Link>
              </li>
              <li>
                <Link to="/search" className="hover:text-indigo-700">
                  Search
                </Link>
              </li>
              <li>
                <Link to="/cart" className="hover:text-indigo-700">
                  Cart
                </Link>
              </li>
              <li>
                <Link to="/checkout" className="hover:text-indigo-700">
                  Checkout
                </Link>
              </li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3">Company</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/about" className="hover:text-indigo-700">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-indigo-700">
                  Contact
                </Link>
              </li>
              <li>
                <a className="cursor-default text-gray-400">Careers (soon)</a>
              </li>
            </ul>
          </div>

          {/* Newsletter (static demo) */}
          <div>
            <h3 className="text-gray-900 font-semibold mb-3">
              Stay in the loop
            </h3>
            <p>Get updates on new arrivals and offers.</p>
            <form
              className="mt-3 flex items-center gap-2"
              onSubmit={(e) => {
                e.preventDefault();
                alert("Thanks for subscribing!");
              }}
            >
              <input
                type="email"
                required
                placeholder="you@example.com"
                className="flex-1 rounded-xl border px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-300"
              />
              <button
                type="submit"
                className="rounded-xl bg-indigo-600 text-white px-4 py-2 font-medium hover:bg-indigo-700 transition"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t flex flex-col sm:flex-row items-center justify-between gap-3">
          <p>© {year} Crystal Beauty. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-indigo-700">
              Privacy
            </a>
            <a href="#" className="hover:text-indigo-700">
              Terms
            </a>
            <a href="#" className="hover:text-indigo-700">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
