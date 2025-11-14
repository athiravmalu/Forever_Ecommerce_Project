const mongoose = require("mongoose");
const Order = require("../Models/orderModel");
const Product = require("../Models/productModel");

// ✅ PLACE ORDER — User places an order
exports.placeOrder = async (req, res) => {
  try {
    const { items, shippingAddress, totalAmount, paymentMethod } = req.body;
    const userId = req.userId;

    if (!userId || !items || items.length === 0) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid order data" });
    }

    // 🧩 Fetch full product details for each item
    const populatedItems = await Promise.all(
      items.map(async (item) => {
        const product = await Product.findById(item.productId);
        if (!product) throw new Error(`Product not found: ${item.productId}`);

        // ✅ Use product.image array correctly
        const imageArray = Array.isArray(product.image)
          ? product.image
          : [product.image];

        return {
          productId: product._id,
          name: product.name,
          img: imageArray, // ✅ full array of image URLs
          price: product.price,
          quantity: item.quantity,
          size: item.size || "M",
        };
      })
    );

    // ✅ Create and save new order
    const newOrder = new Order({
      userId: new mongoose.Types.ObjectId(userId),
      items: populatedItems,
      shippingAddress,
      totalAmount,
      paymentMethod,
    });

    await newOrder.save();

    res.json({
      success: true,
      message: "Order placed successfully",
      order: newOrder,
    });
  } catch (err) {
    console.error("❌ Order placement error:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ GET USER ORDERS — For user’s frontend “My Orders” page
exports.getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.userId }).sort({
      createdAt: -1,
    });
    res.json({ success: true, orders });
  } catch (err) {
    console.error("❌ Error fetching user orders:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ GET ALL ORDERS — For Admin dashboard
exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find()
      .populate("userId", "email name") // fetch user's name & email
      .sort({ createdAt: -1 });
    res.json({ success: true, orders });
  } catch (err) {
    console.error("❌ Error fetching all orders:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};

// ✅ UPDATE ORDER STATUS — For Admin to change status
exports.updateOrderStatus = async (req, res) => {
  try {
    const { orderId, status } = req.body;
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true }
    );

    if (!order) {
      return res
        .status(404)
        .json({ success: false, message: "Order not found" });
    }

    res.json({ success: true, message: "Order status updated", order });
  } catch (err) {
    console.error("❌ Error updating order status:", err);
    res.status(500).json({ success: false, message: err.message });
  }
};
