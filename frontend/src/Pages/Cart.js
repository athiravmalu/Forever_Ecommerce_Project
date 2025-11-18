import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import removeIcon from "../Assets/Vector (1).png";

const updateCartCount = (items) => {
  const count = items.reduce((total, item) => total + item.quantity, 0);
  localStorage.setItem("cartCount", count);
};


function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // ✅ Fetch cart from backend
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const res = await axios.post(
          "http://localhost:8000/cart/get",
          { userId },
          { headers: { Authorization: `Bearer ${token}` } }
        );

        if (res.data.success) {
          setCartItems(res.data.cartItems); 
          updateCartCount(res.data.cartItems);// directly use backend array
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [userId, token]);

  // ✅ Update quantity in backend
  const handleQuantityChange = async (index, newQuantity) => {
    const item = cartItems[index];
    try {
      await axios.put(
        "http://localhost:8000/cart/update",
        {
          userId,
          itemid: item.id,
          size: item.size,
          quantity: Number(newQuantity),
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = cartItems.map((i, idx) =>
        idx === index ? { ...i, quantity: Number(newQuantity) } : i
      );
      setCartItems(updated);
      updateCartCount(updated);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Remove item from cart
  const handleRemove = async (index) => {
    const item = cartItems[index];
    try {
      await axios.put(
        "http://localhost:8000/cart/update",
        {
          userId,
          itemid: item.id,
          size: item.size,
          quantity: 0, // backend removes if quantity = 0
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      const updated = cartItems.filter((_, i) => i !== index);
      setCartItems(updated);
       updateCartCount(updated);
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ Calculate totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 40 : 0;
  const total = subtotal + shipping;

  // ✅ Loading state
  if (loading) {
    return (
      <div className="text-center py-32 text-gray-600">Loading cart...</div>
    );
  }

  // ✅ Empty cart state
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-32 text-gray-600">
        Your cart is empty 😔
        <div className="mt-6">
          <Link
            to="/"
            className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800"
          >
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  // ✅ Cart UI
  return (
    <div className="text-gray-700">
      <section className="max-w-6xl mx-auto px-6 py-32">
        <div className="flex flex-col sm:flex-row items-center sm:items-baseline sm:space-x-4 mb-10 text-center sm:text-left">
          <h2 className="text-2xl sm:text-3xl font-semibold tracking-wide">
            YOUR <span className="font-bold ml-2 text-gray-800">CART</span>
          </h2>
        </div>

        <hr className="my-8 border-gray-300 w-full" />

        {cartItems.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-4 mb-6 border border-gray-300 p-4 rounded-lg shadow-sm"
          >
            <img
              src={item.img}
              alt={item.name}
              className="w-20 h-20 object-cover rounded-md"
            />
            <div className="flex-1 flex flex-col">
              <h3 className="font-semibold text-gray-800">{item.name}</h3>
              <p className="text-gray-600">₹{item.price}</p>
              <p className="text-sm text-gray-500 mt-1">Size: {item.size}</p>

              <div className="flex items-center justify-between mt-3">
                <select
                  value={item.quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                  className="border border-gray-400 px-3 py-1 rounded-md text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-500"
                >
                  {[...Array(10)].map((_, i) => (
                    <option key={i + 1} value={i + 1}>
                      {i + 1}
                    </option>
                  ))}
                </select>

                <img
                  src={removeIcon}
                  alt="Remove"
                  onClick={() => handleRemove(index)}
                  className="w-5 h-5 cursor-pointer hover:opacity-70"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex justify-end mt-10">
          <div className="w-full sm:w-80">
            <div className="flex items-center mb-4">
              <h3 className="text-lg font-semibold text-gray-800">CART TOTAL</h3>
              <span className="block w-16 h-[2px] bg-gray-400 ml-2"></span>
            </div>

            <div className="flex justify-between text-sm py-2 border-b border-gray-200">
              <span>Subtotal</span>
              <span>₹{subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm py-2 border-b border-gray-200">
              <span>Shipping</span>
              <span>₹{shipping.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-base font-semibold py-2">
              <span>Total</span>
              <span>₹{total.toFixed(2)}</span>
            </div>

            <div className="flex justify-between mt-6">
              <button
                onClick={async () => {
                  // ✅ Clear entire cart
                  for (let item of cartItems) {
                    await axios.put(
                      "http://localhost:8000/cart/update",
                      {
                        userId,
                        itemid: item.id,
                        size: item.size,
                        quantity: 0,
                      },
                      { headers: { Authorization: `Bearer ${token}` } }
                    );
                  }
                  setCartItems([]);
                }}
                className="text-sm text-gray-600 underline"
              >
                Clear Cart
              </button>

              <Link to="/placeorder">
                <button className="bg-black text-white px-6 py-2 rounded-md text-sm hover:bg-gray-800 transition">
                  PROCEED TO CHECKOUT
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Cart;
