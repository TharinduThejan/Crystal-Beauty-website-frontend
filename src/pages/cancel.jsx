import { Link } from "react-router-dom";
import { XCircle } from "lucide-react";

export default function Cancel() {
  return (
    <div className="mx-auto max-w-2xl w-full py-10">
      <div className="rounded-3xl border bg-white shadow-sm p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <XCircle className="text-red-600" size={28} />
          <div>
            <h1 className="text-2xl font-semibold">Payment canceled</h1>
            <p className="text-gray-600 text-sm mt-1">
              Your payment was canceled. You can review your cart and try again.
            </p>
          </div>
        </div>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/cart"
            className="inline-flex items-center rounded-xl bg-indigo-600 text-white px-5 py-2.5 text-sm font-medium shadow hover:bg-indigo-700 transition"
          >
            Back to cart
          </Link>
          <Link
            to="/product"
            className="inline-flex items-center rounded-xl bg-white text-indigo-700 ring-1 ring-indigo-200 px-5 py-2.5 text-sm font-medium hover:bg-indigo-50 transition"
          >
            Continue shopping
          </Link>
        </div>
      </div>
    </div>
  );
}
