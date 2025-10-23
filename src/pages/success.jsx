import { useEffect, useMemo, useState } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { CheckCircle } from "lucide-react";
import { getCart } from "../utils/cart.js";

export default function Success() {
  const [params] = useSearchParams();
  const sessionId = params.get("session_id");
  const [items, setItems] = useState([]);

  useEffect(() => {
    const cart = getCart();
    setItems(cart || []);
    // Clear cart after capturing items
    try {
      localStorage.setItem("cart", JSON.stringify([]));
    } catch {
      // ignore storage errors
    }
  }, []);

  const totals = useMemo(() => {
    const subtotal = items.reduce(
      (sum, it) => sum + Number(it.price || 0) * Number(it.qty || 0),
      0
    );
    const shipping = 0;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }, [items]);

  return (
    <div className="mx-auto max-w-4xl w-full py-10">
      <div className="rounded-3xl border bg-white shadow-sm p-6 sm:p-8">
        <div className="flex items-start gap-3">
          <CheckCircle className="text-green-600" size={28} />
          <div>
            <h1 className="text-2xl font-semibold">Payment successful</h1>
            <p className="text-gray-600 text-sm mt-1">
              Thank you for your purchase. Your order is being processed.{" "}
              {sessionId && (
                <>
                  <br />
                  <span className="text-gray-500">Stripe Session:</span>{" "}
                  <span className="font-mono">{sessionId}</span>
                </>
              )}
            </p>
          </div>
        </div>

        {items.length > 0 ? (
          <div className="mt-6 grid grid-cols-1 gap-4">
            {items.map((it, idx) => (
              <div
                key={idx}
                className="flex items-center gap-4 border rounded-2xl p-3"
              >
                <img
                  src={Array.isArray(it.images) ? it.images[0] : it.images}
                  alt={it.name}
                  className="w-16 h-16 object-cover rounded-lg"
                />
                <div className="flex-1">
                  <div className="font-medium">{it.name}</div>
                  <div className="text-gray-500 text-sm">Qty: {it.qty}</div>
                </div>
                <div className="font-semibold">
                  ${Number(it.price || 0).toFixed(2)}
                </div>
              </div>
            ))}
            <div className="mt-4 rounded-2xl bg-gray-50 border p-4">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${totals.subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>${totals.shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold mt-2">
                <span>Total</span>
                <span>${totals.total.toFixed(2)}</span>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 text-gray-600">
            No items to show. If you already completed payment, you will receive
            a confirmation email shortly.
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            to="/product"
            className="inline-flex items-center rounded-xl bg-indigo-600 text-white px-5 py-2.5 text-sm font-medium shadow hover:bg-indigo-700 transition"
          >
            Continue shopping
          </Link>
          <Link
            to="/"
            className="inline-flex items-center rounded-xl bg-white text-indigo-700 ring-1 ring-indigo-200 px-5 py-2.5 text-sm font-medium hover:bg-indigo-50 transition"
          >
            Go to homepage
          </Link>
        </div>
      </div>
    </div>
  );
}
