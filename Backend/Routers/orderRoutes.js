const express = require("express");
const {
  placeOrder,
  getUserOrders,
  updateOrderStatus,
  getAllOrders,
} = require("../Controllers/OrderController");
const authUser = require("../Config/Auth");


const orderRouter = express.Router();

orderRouter.post("/placeorder", authUser, placeOrder);
orderRouter.get("/userorders", authUser, getUserOrders);
orderRouter.get("/allorders",getAllOrders);
orderRouter.put("/updateorderstatus", updateOrderStatus);

module.exports = orderRouter;
