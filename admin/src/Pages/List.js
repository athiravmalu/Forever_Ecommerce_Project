import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminLayout from "../Component/AdminLayout";

function List() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get("http://localhost:8000/product/getallproducts");
      if (res.data.success) {
        setProducts(res.data.products);
      }
    } catch (err) {
      console.error("Error fetching products:", err);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Delete product
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this product?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8000/product/delete/${id}`);
      alert("Product deleted successfully!");
      fetchProducts(); // refresh list
    } catch (error) {
      console.error("Error deleting product:", error);
      alert("Failed to delete product.");
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <AdminLayout>
      <div className="max-w-6xl mx-auto bg-white p-6 shadow-md rounded-lg border border-gray-200">
        <h2 className="text-2xl font-semibold mb-6 text-center">Item List</h2>

        {loading ? (
          <p className="text-center text-gray-500">Loading...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-gray-500">No products found.</p>
        ) : (
          <table className="w-full border border-gray-200">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-3 text-left">Image</th>
                <th className="border p-3 text-left">Name</th>
                <th className="border p-3 text-left">Category</th>
                <th className="border p-3 text-left">Price</th>
                <th className="border p-3 text-left">Sizes</th>
                <th className="border p-3 text-left">Best Seller</th>
                <th className="border p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((p) => (
                <tr key={p._id} className="border-t hover:bg-gray-50">
                  <td className="p-3">
                    <img
                      src={p.image[0]}
                      alt={p.name}
                      className="w-16 h-16 object-cover rounded-md"
                    />
                  </td>
                  <td className="p-3">{p.name}</td>
                  <td className="p-3 capitalize">{p.category}</td>
                  <td className="p-3">₹{p.price}</td>
                  <td className="p-3">{p.sizes?.join(", ")}</td>
                  <td className="p-3">{p.bestSeller ? "✅" : "❌"}</td>
                  <td className="p-3 text-center">
                    <button
                      onClick={() => handleDelete(p._id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </AdminLayout>
  );
}

export default List;
