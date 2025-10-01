import axios from "axios";
import { useEffect, useState } from "react";
import Loading from "../../components/loading";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeOrder, setActiveOrder] = useState(null);

  useEffect(() => {
    if (isLoading) {
      const token = localStorage.getItem("token");
      if (!token) {
        alert("Please login to view orders");
        return;
      }
      axios
        .get(import.meta.env.VITE_BACKEND_URL + "/api/orders", {
          headers: { Authorization: "Bearer " + token },
        })
        .then((response) => {
          setOrders(
            Array.isArray(response.data.orders) ? response.data.orders : []
          );
          setIsLoading(false);
        })
        .catch((error) => {
          console.error("Error fetching orders:", error);
          setOrders([]);
          setIsLoading(false);
        });
    }
  }, [isLoading]);

  const renderOrderDetails = (order) => {
    if (!order) return null;

    return (
      <div id="print-section" className="text-xs font-[Poppins]">
        {/* Header */}
        <div className="flex justify-between items-center border-b pb-2 mb-2">
          <h2 className="text-lg font-bold">Order #{order.orderId}</h2>
          <button
            onClick={() => window.print()}
            className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 text-xs"
          >
            Print
          </button>
        </div>

        {/* Customer & Order Info */}
        <div className="grid grid-cols-2 gap-4 mb-3">
          <div>
            <p>
              <span className="font-semibold">Name:</span> {order.name}
            </p>
            <p>
              <span className="font-semibold">Email:</span> {order.email}
            </p>
            <p>
              <span className="font-semibold">Phone:</span> {order.phone}
            </p>
            <p>
              <span className="font-semibold">Address:</span> {order.address}
            </p>
          </div>
          <div>
            <p>
              <span className="font-semibold">Date:</span>{" "}
              {new Date(order.date).toLocaleString()}
            </p>
            <p>
              <span className="font-semibold">Status:</span>{" "}
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold ${
                  order.status === "pending"
                    ? "bg-yellow-100 text-yellow-700"
                    : order.status === "completed"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-700"
                }`}
              >
                {order.status}
              </span>
            </p>
            <p>
              <span className="font-semibold">Total:</span>{" "}
              <span className="text-green-600 font-bold">
                ${order.total.toFixed(2)}
              </span>
            </p>
          </div>
        </div>

        {/* Product Table */}
        <table className="w-full border border-gray-300 text-xs">
          <thead className="bg-gray-100">
            <tr>
              <th className="border px-2 py-1 text-left">Image</th>
              <th className="border px-2 py-1 text-left">Product</th>
              <th className="border px-2 py-1 text-left">Description</th>
              <th className="border px-2 py-1 text-center">Price</th>
              <th className="border px-2 py-1 text-center">Qty</th>
              <th className="border px-2 py-1 text-center">Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((item, idx) => (
              <tr key={idx} className="hover:bg-gray-50">
                <td className="border px-2 py-1">
                  <img
                    src={item.productInfo.images[0]}
                    alt={item.productInfo.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                </td>
                <td className="border px-2 py-1">
                  <div className="font-semibold">{item.productInfo.name}</div>
                  <div className="text-gray-500 italic text-[10px]">
                    {item.productInfo.altNames?.join(", ")}
                  </div>
                </td>
                <td className="border px-2 py-1 text-gray-600 text-[11px]">
                  {item.productInfo.description}
                </td>
                <td className="border px-2 py-1 text-center">
                  ${item.productInfo.price.toFixed(2)}
                </td>
                <td className="border px-2 py-1 text-center">{item.qty}</td>
                <td className="border px-2 py-1 text-center font-bold">
                  ${(item.productInfo.price * item.qty).toFixed(2)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div className="w-full h-full max-h-full overflow-y-scroll p-6 font-[Poppins] bg-gray-100">
      <Modal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
        contentLabel="Order Details"
        className="bg-white p-6 rounded-lg shadow-lg mx-auto mt-6 max-w-6xl text-xs"
        overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-start z-50"
      >
        <button
          onClick={() => setIsModalOpen(false)}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-800 text-sm"
        >
          ✕
        </button>
        {renderOrderDetails(activeOrder)}
      </Modal>

      {isLoading ? (
        <Loading />
      ) : (
        <div className="bg-white shadow-md rounded-lg overflow-hidden">
          <table className="w-full border-collapse text-sm">
            <thead className="bg-accent text-white">
              <tr>
                <th className="px-4 py-2 text-left">Order ID</th>
                <th className="px-4 py-2 text-left">Name</th>
                <th className="px-4 py-2 text-left">Email</th>
                <th className="px-4 py-2 text-left">Total</th>
                <th className="px-4 py-2 text-left">Date</th>
                <th className="px-4 py-2 text-left">Status</th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order, index) => (
                <tr
                  onClick={() => {
                    setActiveOrder(order);
                    setIsModalOpen(true);
                  }}
                  key={index}
                  className="border-b hover:bg-gray-50 transition duration-200 hover:cursor-pointer"
                >
                  <td className="px-4 py-2 font-medium text-gray-700">
                    {order.orderId}
                  </td>
                  <td className="px-4 py-2">{order.name}</td>
                  <td className="px-4 py-2">{order.email}</td>
                  <td className="px-4 py-2 font-semibold text-green-600">
                    ${order.total.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 text-xs text-gray-500">
                    {new Date(order.date).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">
                    <span
                      className={`px-2 py-1 text-[10px] font-semibold rounded-full ${
                        order.status === "pending"
                          ? "bg-yellow-100 text-yellow-700"
                          : order.status === "completed"
                          ? "bg-green-100 text-green-700"
                          : "bg-gray-100 text-gray-700"
                      }`}
                    >
                      {order.status}
                    </span>
                  </td>
                </tr>
              ))}
              {orders.length === 0 && (
                <tr>
                  <td
                    colSpan="6"
                    className="text-center py-6 text-gray-500 italic"
                  >
                    No orders found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
