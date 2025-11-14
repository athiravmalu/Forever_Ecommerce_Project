import React, { useEffect, useState } from "react";
import axios from "axios";

function Orderitem() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const token = localStorage.getItem("adminToken");

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get("http://localhost:8000/order/allorders", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (res.data.success) {
          setOrders(res.data.orders);
        } else {
          setOrders([]);
        }
      } catch (err) {
        console.error("❌ Error fetching orders:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [token]);

  const handleStatusChange = async (orderId, status) => {
    try {
      const res = await axios.put(
        "http://localhost:8000/order/updateorderstatus",
        { orderId, status },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        setOrders((prev) =>
          prev.map((o) => (o._id === orderId ? { ...o, status } : o))
        );
      }
    } catch (err) {
      console.error("❌ Failed to update status");
    }
  };

  if (loading)
    return <div className="text-center py-20 text-gray-600">Loading orders…</div>;
  if (orders.length === 0)
    return <div className="text-center py-20 text-gray-600">No orders found</div>;

  return (
    <div className="text-gray-700 mt-10">
      <section className="max-w-5xl mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-8">Orders</h2>

        <div className="space-y-8">
          {orders.map((order) => (
            <div
              key={order._id}
              className="bg-white border border-gray-200 shadow-sm rounded-lg p-5"
            >
              {/* TOP SECTION — SHIPPING, PAYMENT, DATE */}
              <div className="mb-4">
                <p><b>Shipping Address:</b> {order.shippingAddress}</p>
                <p><b>Payment:</b> {order.paymentMethod}</p>
                <p><b>Date:</b> {new Date(order.createdAt).toLocaleString()}</p>
              </div>

              {/* ITEMS */}
              <div className="space-y-3 border-t pt-3">
                {order.items.map((item, i) => (
                  <div key={i} className="flex gap-4 items-center">
                    <img
                      src={item.img}
                      alt={item.name}
                      className="w-20 h-20 rounded object-cover"
                    />

                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-600 text-sm">
                        Size: {item.size} | Qty: {item.quantity}
                      </p>
                      <p className="font-medium">₹{item.price}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* STATUS + TOTAL */}
              <div className="pt-4 mt-4 border-t flex justify-between items-center">
                <select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order._id, e.target.value)}
                  className="border border-gray-300 rounded-md p-1"
                >
                  <option value="Order Placed">Order Placed</option>
                  <option value="Packing">Packing</option>
                  <option value="Shipped">Shipped</option>
                  <option value="Out for Delivery">Out for Delivery</option>
                  <option value="Delivered">Delivered</option>
                </select>

                <p className="font-semibold text-lg">Total: ₹{order.totalAmount}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Orderitem;
