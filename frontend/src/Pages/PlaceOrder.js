import React, { useEffect, useState } from "react";
import axios from "axios";
import stripe from "../Assets/stripe_logo.png";
import razorpay from "../Assets/razorpay_logo.png";

function PlaceOrder() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedPayment, setSelectedPayment] = useState("");
  const [address, setAddress] = useState({
    firstName: "",
    lastName: "",
    email: "",
    street: "",
    city: "",
    state: "",
    zip: "",
    country: "",
    phone: "",
  });

  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");

  // ✅ Fetch Cart Items
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
        }
      } catch (err) {
        console.error("Error fetching cart:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, [userId, token]);

  // ✅ Totals
  const subtotal = cartItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 0 ? 40 : 0;
  const total = subtotal + shipping;

  const handleAddressChange = (e) => {
    setAddress({ ...address, [e.target.name]: e.target.value });
  };

  // ✅ Place Order Function (with validation)
  const handlePlaceOrder = async () => {
    try {
      // ✅ Check payment
      if (!selectedPayment) {
        alert("⚠️ Please select a payment method!");
        return;
      }

      // ✅ Validate required fields
      const requiredFields = [
        "firstName",
        "lastName",
        "email",
        "street",
        "city",
        "state",
        "zip",
        "country",
        "phone",
      ];

      for (const field of requiredFields) {
        if (!address[field].trim()) {
          alert(`⚠️ Please fill in your ${field} field!`);
          return;
        }
      }

      // ✅ Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(address.email)) {
        alert("⚠️ Please enter a valid email address!");
        return;
      }

      // ✅ ZIP validation (6 digits)
      if (!/^\d{6}$/.test(address.zip)) {
        alert("⚠️ Please enter a valid 6-digit ZIP code!");
        return;
      }

      // ✅ Phone validation (10 digits)
      if (!/^\d{10}$/.test(address.phone)) {
        alert("⚠️ Please enter a valid 10-digit phone number!");
        return;
      }

      const shippingAddress = `${address.firstName} ${address.lastName}, ${address.street}, ${address.city}, ${address.state}, ${address.zip}, ${address.country}. Phone: ${address.phone}`;

      const formattedItems = cartItems.map((item) => ({
        productId: item._id || item.id,
        size: item.size || item.selectedSize || "M",
        quantity: item.quantity,
      }));

      const res = await axios.post(
        "http://localhost:8000/order/placeorder",
        {
          userId,
          items: formattedItems,
          shippingAddress,
          totalAmount: total,
          paymentMethod: selectedPayment,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.data.success) {
        alert("✅ Order placed successfully!");
        localStorage.setItem("cartCount", 0);
        window.location.href = "/order";
      } else {
        alert("❌ Order failed: " + (res.data.message || "Unknown error"));
      }
    } catch (err) {
      console.error("❌ Error placing order:", err.response?.data || err.message);
      alert("Failed to place order");
    }
  };

  // ✅ Loading State
  if (loading) {
    return <div className="text-center py-32 text-gray-600">Loading your order...</div>;
  }

  // ✅ Empty Cart
  if (cartItems.length === 0) {
    return (
      <div className="text-center py-32 text-gray-600">
        Your cart is empty 😔
        <div className="mt-6">
          <a href="/" className="bg-black text-white px-6 py-3 rounded hover:bg-gray-800">
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }

  // ✅ UI
  return (
    <div className="text-gray-600 mt-24">
      <section className="max-w-6xl mx-auto px-4 py-20">
        {/* Heading */}
        <div className="flex items-center space-x-4 mb-10">
          <h2 className="text-xl font-semibold tracking-wide">
            DELIVERY<span className="font-bold ml-2 text-gray-800">INFORMATION</span>
          </h2>
          <span className="block w-12 h-[2px] bg-gray-400"></span>
        </div>

        <div className="flex flex-col lg:flex-row justify-between gap-12">
          {/* Address Form */}
          <form className="space-y-4 w-full lg:w-2/3" onSubmit={(e) => e.preventDefault()}>
            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="firstName"
                placeholder="First Name"
                value={address.firstName}
                onChange={handleAddressChange}
                className="w-full border border-gray-300 p-2 text-sm rounded"
              />
              <input
                type="text"
                name="lastName"
                placeholder="Last Name"
                value={address.lastName}
                onChange={handleAddressChange}
                className="w-full border border-gray-300 p-2 text-sm rounded"
              />
            </div>

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={address.email}
              onChange={handleAddressChange}
              className="w-full border border-gray-300 p-2 text-sm rounded"
            />

            <input
              type="text"
              name="street"
              placeholder="Street"
              value={address.street}
              onChange={handleAddressChange}
              className="w-full border border-gray-300 p-2 text-sm rounded"
            />

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="city"
                placeholder="City"
                value={address.city}
                onChange={handleAddressChange}
                className="w-full border border-gray-300 p-2 text-sm rounded"
              />
              <input
                type="text"
                name="state"
                placeholder="State"
                value={address.state}
                onChange={handleAddressChange}
                className="w-full border border-gray-300 p-2 text-sm rounded"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <input
                type="text"
                name="zip"
                placeholder="Zip Code"
                value={address.zip}
                onChange={(e) => {
                  const value = e.target.value;
                  if (/^\d*$/.test(value)) setAddress({ ...address, zip: value });
                }}
                maxLength={6}
                className="w-full border border-gray-300 p-2 text-sm rounded"
              />
              <input
                type="text"
                name="country"
                placeholder="Country"
                value={address.country}
                onChange={handleAddressChange}
                className="w-full border border-gray-300 p-2 text-sm rounded"
              />
            </div>

            <input
              type="text"
              name="phone"
              placeholder="Phone Number"
              value={address.phone}
              onChange={(e) => {
                const value = e.target.value;
                if (/^\d*$/.test(value)) setAddress({ ...address, phone: value });
              }}
              maxLength={10}
              className="w-full border border-gray-300 p-2 text-sm rounded"
            />
          </form>

          {/* Cart Total + Payment */}
          <div className="w-full lg:w-1/3 p-6 rounded-lg border border-gray-200 shadow-sm">
            <h2 className="text-xl font-semibold tracking-wide text-gray-500 mb-4">
              CART <span className="font-bold ml-2 text-gray-800">TOTAL</span>
            </h2>

            <div className="space-y-2 text-sm mb-8">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span>₹{shipping.toFixed(2)}</span>
              </div>
              <div className="flex justify-between font-semibold text-base pt-2">
                <span>Total</span>
                <span>₹{total.toFixed(2)}</span>
              </div>
            </div>

            {/* Payment Options */}
            <div className="flex justify-between gap-3 text-sm flex-wrap sm:flex-nowrap">
              <label
                className={`flex items-center space-x-2 border rounded-md p-2 px-4 cursor-pointer w-full sm:w-auto justify-center ${
                  selectedPayment === "stripe" ? "border-black" : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  onChange={() => setSelectedPayment("stripe")}
                  className="accent-gray-800"
                />
                <img src={stripe} alt="Stripe" className="h-5" />
              </label>

              <label
                className={`flex items-center space-x-2 border rounded-md p-2 px-4 cursor-pointer w-full sm:w-auto justify-center ${
                  selectedPayment === "razorpay" ? "border-black" : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  onChange={() => setSelectedPayment("razorpay")}
                  className="accent-gray-800"
                />
                <img src={razorpay} alt="Razorpay" className="h-5" />
              </label>

              <label
                className={`flex items-center space-x-2 border rounded-md p-2 px-4 cursor-pointer w-full sm:w-auto justify-center ${
                  selectedPayment === "cod" ? "border-black" : "border-gray-300"
                }`}
              >
                <input
                  type="radio"
                  name="payment"
                  onChange={() => setSelectedPayment("cod")}
                  className="accent-gray-800"
                />
                <span>Cash on Delivery</span>
              </label>
            </div>

            <div className="flex justify-end mt-4">
              <button
                onClick={handlePlaceOrder}
                className="bg-black text-white px-6 py-2 rounded-md hover:bg-gray-800 transition"
              >
                Place Order
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default PlaceOrder;
