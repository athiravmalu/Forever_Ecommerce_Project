// CartController.js
const userModel = require("../Models/userModel");
const productModel = require("../Models/productModel");

// ✅ Get user cart
exports.getUsercart = async (req, res) => {
  try {
    const { userId } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData) return res.json({ success: false, message: "User not found" });

    const cartData = userData.cartData || {};
    const cartArray = [];

    // Build product list with size & quantity
    for (let itemId in cartData) {
      const product = await productModel.findById(itemId);
      if (!product) continue;
      for (let size in cartData[itemId]) {
        cartArray.push({
          id: itemId,
          name: product.name,
          price: product.price,
          img: product.image[0],
          size,
          quantity: cartData[itemId][size],
        });
      }
    }

    res.json({ success: true, cartItems: cartArray });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Add item to cart
exports.addToCart = async (req, res) => {
  try {
    const { userId, itemid, size } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData) return res.json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {};

    // Add or increment item
    if (cartData[itemid]) {
      cartData[itemid][size] = (cartData[itemid][size] || 0) + 1;
    } else {
      cartData[itemid] = { [size]: 1 };
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Item added to cart", cartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};

// ✅ Update or remove item in cart
exports.updateCart = async (req, res) => {
  try {
    const { userId, itemid, size, quantity } = req.body;
    const userData = await userModel.findById(userId);
    if (!userData) return res.json({ success: false, message: "User not found" });

    let cartData = userData.cartData || {};

    if (quantity === 0) {
      // 🗑️ Remove item
      if (cartData[itemid] && cartData[itemid][size] !== undefined) {
        delete cartData[itemid][size];
        if (Object.keys(cartData[itemid]).length === 0) {
          delete cartData[itemid];
        }
      }
    } else {
      // ✏️ Update quantity
      if (!cartData[itemid]) cartData[itemid] = {};
      cartData[itemid][size] = quantity;
    }

    await userModel.findByIdAndUpdate(userId, { cartData });
    res.json({ success: true, message: "Cart updated successfully", cartData });
  } catch (error) {
    console.error(error);
    res.json({ success: false, message: error.message });
  }
};
