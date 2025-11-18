import React from "react";
import { useProducts } from "../Context/ProductContext";

function Collection({ title1, title2, limit }) {
  const { products } = useProducts();

  // Filter products that are marked as best sellers
  const bestSellers = products.filter((p) => p.bestSeller);

  // Apply limit if provided
  const DisplayCollection = limit ? bestSellers.slice(0, limit) : bestSellers;

  return (
    <section className="py-16 flex">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-2xl font-bold mb-2">
          {title1}
          <span className="text-gray-500 ml-2">{title2}</span>
        </h2>
        <p className="text-gray-500 mb-10">
          Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        </p>

        {products.length === 0 ? (
          <p className="text-gray-500">Loading products...</p>
        ) : DisplayCollection.length === 0 ? (
          <p className="text-gray-500">No best seller products available.</p>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
            {DisplayCollection.map((item, index) => (
              <div
                key={index}
                className="hover:scale-105 transition-transform duration-300"
              >
                <img
                  src={item.image?.[0] || "/placeholder.jpg"}
                  alt={item.name}
                  className="w-full h-60 object-cover rounded-md"
                />
                <p className="mt-2 text-sm">{item.name}</p>
                <p className="font-semibold">₹{item.price}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Collection;
