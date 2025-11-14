const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: [String], required: true },
  category: { type: String, required: true },
  subcategory: { type: String, required: true },
  sizes: { type: [String], required: true },
  bestSeller: { type: Boolean, default: false },
  quantity: { type: Number, required: true, default: 1 },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.models.Product || mongoose.model('Product', productSchema);