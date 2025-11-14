
import React, { useState } from "react";
import axios from "axios";
import AdminLayout from "../Component/AdminLayout";

function AddItems() {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    category: "",
    subcategory: "",
    price: "",
    bestSeller: false,
  });

  const [sizes, setSizes] = useState([]);
  const [images, setImages] = useState([null, null, null, null]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // handle text/select/checkbox
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === "checkbox" ? checked : value });
  };

  // handle multiple sizes
  const handleSizeChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setSizes((prev) => [...prev, value]);
    } else {
      setSizes((prev) => prev.filter((size) => size !== value));
    }
  };

  // handle image upload
  const handleImageChange = (e, index) => {
    const newImages = [...images];
    newImages[index] = e.target.files[0];
    setImages(newImages);
  };

  // form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setMessage("");

      const data = new FormData();
      data.append("name", formData.name);
      data.append("description", formData.description);
      data.append("price", formData.price);
      data.append("category", formData.category);
      data.append("subcategory", formData.subcategory);
      data.append("sizes", JSON.stringify(sizes));
      data.append("bestSeller", formData.bestSeller);

      // append images as image1, image2, image3, image4
      images.forEach((img, index) => {
        if (img) data.append(`image${index + 1}`, img);
      });

      const res = await axios.post(
        "http://localhost:8000/product/addproduct", // ✅ match backend route
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (res.data.success) {
        setMessage("✅ Product added successfully!");
        setFormData({
          name: "",
          description: "",
          category: "",
          subcategory: "",
          price: "",
          bestSeller: false,
        });
        setImages([null, null, null, null]);
        setSizes([]);
      } else {
        setMessage("❌ " + res.data.message);
      }
    } catch (err) {
      console.error(err);
      setMessage("❌ Error adding product");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AdminLayout>
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6 border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-center">
          Add New Item
        </h2>

        {message && (
          <div
            className={`text-center mb-4 ${
              message.includes("✅") ? "text-green-600" : "text-red-600"
            }`}
          >
            {message}
          </div>
        )}

        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          {/* Product Name */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Product Name
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              placeholder="Enter product name"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Product Description */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Product Description
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Write description here"
              rows="3"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            ></textarea>
          </div>

          {/* Category */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Product Category
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white"
              required
            >
              <option value="">Select category</option>
              <option value="men">Men</option>
              <option value="women">Women</option>
              <option value="kids">Kids</option>
            </select>
          </div>

          {/* Subcategory */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Sub Category
            </label>
            <select
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black bg-white"
              required
            >
              <option value="">Select sub category</option>
              <option value="topwear">Topwear</option>
              <option value="bottomwear">Bottomwear</option>
              <option value="winterwear">Winterwear</option>
            </select>
          </div>

          {/* Multiple Sizes */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Available Sizes
            </label>
            <div className="flex flex-wrap gap-3">
              {["S", "M", "L", "XL", "XXL"].map((size) => (
                <label key={size} className="flex items-center gap-1">
                  <input
                    type="checkbox"
                    value={size}
                    checked={sizes.includes(size)}
                    onChange={handleSizeChange}
                    className="accent-black w-4 h-4 cursor-pointer"
                  />
                  <span>{size}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <label className="block font-medium mb-1 text-gray-700">
              Price
            </label>
            <input
              name="price"
              value={formData.price}
              onChange={handleChange}
              type="number"
              placeholder="Enter price"
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black"
              required
            />
          </div>

          {/* Best Seller */}
          <div className="flex items-center gap-2">
            <input
              id="bestseller"
              name="bestSeller"
              type="checkbox"
              checked={formData.bestSeller}
              onChange={handleChange}
              className="w-4 h-4 accent-black cursor-pointer"
            />
            <label htmlFor="bestseller" className="text-gray-700 cursor-pointer">
              Add to Best Seller
            </label>
          </div>

          {/* Images */}
          <div>
            <label className="block font-medium mb-2 text-gray-700">
              Upload Images
            </label>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {[0, 1, 2, 3].map((index) => (
                <label
                  key={index}
                  className="w-32 h-32 border border-gray-300 rounded-md flex flex-col items-center justify-center text-gray-500 cursor-pointer hover:border-black transition"
                >
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageChange(e, index)}
                    className="hidden"
                  />
                  {images[index] ? (
                    <img
                      src={URL.createObjectURL(images[index])}
                      alt="preview"
                      className="w-full h-full object-cover rounded-md"
                    />
                  ) : (
                    <span className="text-sm">Upload</span>
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="bg-black text-white py-2 rounded-md hover:bg-gray-800 transition"
          >
            {loading ? "Adding..." : "Add Item"}
          </button>
        </form>
      </div>
    </AdminLayout>
  );
}

export default AddItems;

