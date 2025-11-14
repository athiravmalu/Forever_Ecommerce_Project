const Product = require("../Models/productModel");
const cloudinary = require("cloudinary").v2;

exports.addProduct = async (req, res) => {
  try {
    const { name, description, price, category, subcategory, sizes, bestSeller } = req.body;

    const image1 = req.files.image1?.[0];
    const image2 = req.files.image2?.[0];
    const image3 = req.files.image3?.[0];
    const image4 = req.files.image4?.[0];

    const images = [image1, image2, image3, image4].filter(Boolean);

    const imageUrl = await Promise.all(
      images.map(async (img) => {
        const result = await cloudinary.uploader.upload(img.path);
        return result.secure_url;
      })
    );

    const productData = {
      name,
      description,
      price: Number(price),
      category,
      subcategory,
      sizes: JSON.parse(sizes || '["M"]'),
      bestSeller: bestSeller === "true",
      image: imageUrl,
      quantity: 1,
      date: new Date(),
    };

    const product = new Product(productData);
    await product.save();

    res.json({ success: true, message: "Product added successfully", product });
  } catch (error) {
    console.error("❌ Error adding product:", error);
    res.json({ success: false, message: error.message });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.json({ success: true, message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getidProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product)
      return res.status(404).json({ success: false, message: "Product not found" });

    res.json({ success: true, product });
  } catch (error) {
    res.status(400).json({ success: false, message: error.message });
  }
};

exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 }); // latest first
    res.status(200).json({ success: true, products });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({ success: false, message: "Failed to fetch products" });
  }
};