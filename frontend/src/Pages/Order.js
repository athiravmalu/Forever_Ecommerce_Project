import React, { useEffect, useState } from "react";
import axios from "axios";

function MyOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8000/order/userorders", {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (res.data.success) setOrders(res.data.orders);
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchOrders();
  }, [token]);

  if (loading)
    return <div className="text-center py-20 text-gray-500">Loading orders...</div>;

  if (orders.length === 0)
    return <div className="text-center py-20 text-gray-600">No orders yet</div>;

  return (
    <div className="max-w-6xl mx-auto px-6 py-32">
      {/* Header same style as Cart */}
      <div className="flex flex-col items-center mb-10">
        <h2 className="text-3xl font-semibold tracking-wide">
          YOUR <span className="font-bold text-gray-800">ORDERS</span>
        </h2>
      </div>

      <hr className="my-8 border-gray-300" />

      {orders.map((order) => (
        <div
          key={order._id}
          className="border border-gray-300 rounded-lg shadow-sm p-6 mb-6 bg-white"
        >
          {/* Header block aligned like cart */}
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-sm text-gray-600">
                <b>Order ID:</b> {order._id}
              </p>
              <p className="text-sm text-gray-600">
                <b>Date:</b> {new Date(order.createdAt).toLocaleString()}
              </p>
              <p className="text-sm text-gray-600">
                <b>Payment:</b> {order.paymentMethod}
              </p>
            </div>

            {/* Status (NO rounded-full, clean rectangle) */}
            <span
              className={`px-3 py-1 text-sm font-semibold border ${
                order.status === "Delivered"
                  ? "bg-green-100 text-green-700 border-green-300"
                  : order.status === "Pending"
                  ? "bg-yellow-100 text-yellow-700 border-yellow-300"
                  : "bg-blue-100 text-blue-700 border-blue-300"
              }`}
            >
              {order.status}
            </span>
          </div>

          {/* Items - Styled like Cart Items */}
          {order.items.map((item, i) => (
            <div
              key={i}
              className="flex items-center gap-4 mb-4 border border-gray-200 p-3 rounded-md"
            >
              <img
                src={item.img[0]}
                alt={item.name}
                className="w-20 h-20 object-cover rounded-md"
              />

              <div className="flex-1">
                <h4 className="font-semibold text-gray-800">{item.name}</h4>
                <p className="text-sm text-gray-500">Size: {item.size}</p>
                <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                <p className="font-semibold text-blue-600">₹{item.price}</p>
              </div>
            </div>
          ))}

          {/* Footer - clean like cart */}
          <div className="border-t pt-3 mt-3 flex justify-between text-sm text-gray-700">
            <p>
              <b>Shipping Address:</b> {order.shippingAddress}
            </p>
            <p className="font-semibold text-lg">Total: ₹{order.totalAmount}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
