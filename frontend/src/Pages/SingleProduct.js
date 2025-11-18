import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

function SingleProduct() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [selectedSize, setSelectedSize] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`http://localhost:8000/product/getidproduct/${id}`);
        if (res.data.success) {
          setProduct(res.data.product);
        }
      } catch (err) {
        console.error("Error fetching product:", err);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
  if (!selectedSize) {
    setError("Please select a size before adding to cart.");
    return;
  }

  setError("");

  try {
    const token = localStorage.getItem("token"); // user must be logged in
    const res = await axios.post(
      "http://localhost:8000/cart/add",
      {
        userId: localStorage.getItem("userId"),
        itemid: product._id,
        size: selectedSize,
      },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    if (res.data.success) {
      alert("Item added to cart!");
      navigate("/cart"); // go to cart page
    } else {
      setError(res.data.message);
    }
  } catch (err) {
    console.error(err);
    setError("Failed to add item to cart.");
  }
};


  if (!product) {
    return <div className="text-center py-32 text-gray-600">Loading...</div>;
  }

  return (
    <section className="max-w-7xl mx-auto pt-32 pb-16 px-6 grid md:grid-cols-2 gap-10">
      {/* Left Side: Images */}
      <div className="flex gap-4 md:gap-6">
        <div className="flex flex-col space-y-2">
          {product.image.map((img, index) => (
            <img
              key={index}
              src={img}
              alt={product.name}
              className="w-20 h-24 object-cover rounded-md cursor-pointer border border-gray-200 hover:border-black"
            />
          ))}
        </div>
        <div className="flex-1 flex items-center justify-center">
          <img
            src={product.image[0]}
            alt={product.name}
            className="w-full max-w-[500px] h-[520px] object-cover rounded-lg shadow-md"
          />
        </div>
      </div>

      {/* Right Side: Product Info */}
      <div className="flex flex-col space-y-4 md:space-y-6 pt-6 md:pt-16">
        <h2 className="text-2xl font-semibold text-gray-800">{product.name}</h2>
        <p className="text-lg font-bold text-gray-900">₹{product.price}</p>
        <p className="text-gray-600">{product.description}</p>

        <div>
          <h3 className="font-semibold text-gray-800 mb-2">Select Size</h3>
          <div className="flex gap-2 flex-wrap">
            {product.sizes.map((size, i) => (
              <button
                key={i}
                onClick={() => setSelectedSize(size)}
                className={`border px-4 py-2 rounded transition ${
                  selectedSize === size
                    ? "bg-black text-white"
                    : "border-gray-400 hover:bg-gray-200"
                }`}
              >
                {size}
              </button>
            ))}
          </div>
          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
        </div>

        <button
          onClick={handleAddToCart}
          className="bg-black text-white px-6 py-3 rounded-md hover:bg-gray-800 transition w-fit"
        >
          Add to Cart
        </button>
      </div>
    </section>
  );
}

export default SingleProduct;
