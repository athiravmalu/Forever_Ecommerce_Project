const express = require("express");
const {
  addProduct,
  deleteProduct,
  getidProduct,
  getAllProducts,
} = require("../Controllers/productController");

const upload = require("../Middleware/Multer");
const productRouter = express.Router();

productRouter.post(
  "/addproduct",
  upload.fields([
    { name: "image1", maxCount: 1 },
    { name: "image2", maxCount: 1 },
    { name: "image3", maxCount: 1 },
    { name: "image4", maxCount: 1 },
  ]),
  addProduct
);


productRouter.delete("/delete/:id", deleteProduct);
productRouter.get("/getidproduct/:id", getidProduct);
productRouter.get("/getallproducts", getAllProducts);

module.exports = productRouter;
