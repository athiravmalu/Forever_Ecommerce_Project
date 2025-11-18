import React, { useState } from "react";
import { useSearch } from "../Context/SearchContext";
import { useProducts } from "../Context/ProductContext";
import { NavLink } from "react-router-dom";

function AllCollection() {
  const { showSearch, setShowSearch } = useSearch();
  const [searchQuery, setSearchQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [sortOption, setSortOption] = useState("relevant");

  const { products } = useProducts();

  // --- FILTER HANDLERS ---
  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  };

  const handleTypeChange = (type) => {
    setSelectedTypes((prev) =>
      prev.includes(type)
        ? prev.filter((t) => t !== type)
        : [...prev, type]
    );
  };

  // --- FILTERING (Case-insensitive fix) ---
const filteredProducts = products.filter((item) => {
  const categoryMatch =
    selectedCategories.length === 0 ||
    selectedCategories.some(
      (cat) => cat.toLowerCase() === item.category?.toLowerCase()
    );

  const typeMatch =
    selectedTypes.length === 0 ||
    selectedTypes.some(
      (type) => type.toLowerCase() === item.subcategory?.toLowerCase()
    );

  const searchMatch =
    searchQuery.trim() === "" ||
    item.name.toLowerCase().includes(searchQuery.toLowerCase());

  return categoryMatch && typeMatch && searchMatch;
});


  // --- SORTING ---
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sortOption === "lowToHigh") return a.price - b.price;
    if (sortOption === "highToLow") return b.price - a.price;
    return 0; // relevant
  });

  return (
    <section className="py-32 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 flex flex-col lg:flex-row gap-10 items-start">

        {/* Sidebar Filters */}
        <div
          className={`flex flex-col gap-6 w-full lg:w-72 ${
            showFilters ? "block" : "hidden lg:flex"
          }`}
        >
          <h2 className="text-2xl font-semibold text-gray-800 mb-4 mt-2">
            Filters
          </h2>

          {/* Category Filter */}
          <div className="border border-gray-300 rounded-lg bg-white">
            <h3 className="text-lg font-bold mb-4 text-gray-800 px-5 mt-3">
              Categories
            </h3>
            <div className="space-y-2 px-5 pb-4 text-gray-600">
              {["Men", "Women", "Kids"].map((cat) => (
                <label key={cat} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedCategories.includes(cat)}
                    onChange={() => handleCategoryChange(cat)}
                    className="w-4 h-4 accent-gray-700"
                  />
                  <span>{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Type Filter */}
          <div className="border border-gray-300 rounded-lg bg-white">
            <h3 className="text-lg font-bold mb-4 text-gray-800 px-5 mt-3">
              Type
            </h3>
            <div className="space-y-2 px-5 pb-4 text-gray-600">
              {["Topwear", "Bottomwear", "Winterwear"].map((type) => (
                <label key={type} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={selectedTypes.includes(type)}
                    onChange={() => handleTypeChange(type)}
                    className="w-4 h-4 accent-gray-700"
                  />
                  <span>{type}</span>
                </label>
              ))}
            </div>
          </div>
        </div>

        {/* Product Display Section */}
        <div className="flex-1 flex flex-col w-full">
          {/* Header & Sort */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            <h2 className="text-2xl font-semibold tracking-wide text-gray-500 flex items-center">
              ALL
              <span className="font-bold ml-2 text-gray-800">COLLECTION</span>
              <span className="block w-12 h-[2px] bg-gray-400 ml-2"></span>
            </h2>

            <div className="flex items-center gap-3">
              {/* Show Filter Button (for mobile) */}
              <button
                className="border border-gray-300 rounded-md px-4 py-2 text-sm text-gray-700 bg-white lg:hidden"
                onClick={() => setShowFilters(!showFilters)}
              >
                {showFilters ? "Hide Filters" : "Show Filters"}
              </button>

              {/* Sort Dropdown */}
              <select
                value={sortOption}
                onChange={(e) => setSortOption(e.target.value)}
                className="border px-3 py-2 text-sm rounded-md text-gray-600 focus:outline-none focus:ring-1 focus:ring-gray-300"
              >
                <option value="relevant">Sort by: Relevant</option>
                <option value="highToLow">Sort by: Price: High To Low</option>
                <option value="lowToHigh">Sort by: Price: Low To High</option>
              </select>
            </div>
          </div>

          {/* Search Bar */}
          {showSearch && (
            <div className="mb-6 relative">
              <input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full border border-gray-300 rounded-md p-3 pr-10 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              {/* Cross Button */}
              <button
                onClick={() => {
                  setShowSearch(false);
                  setSearchQuery("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-800 text-xl"
              >
                ×
              </button>
            </div>
          )}

          {/* Product Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
            {sortedProducts.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg shadow hover:shadow-lg transition-transform hover:-translate-y-1 p-3"
              >
                <NavLink to={`/singleproduct/${item._id}`}>
                  <img
                    src={
                      item.image && item.image.length > 0
                        ? item.image[0]
                        : "https://via.placeholder.com/300"
                    }
                    alt={item.name}
                    className="w-full h-auto object-cover rounded-md cursor-pointer"
                  />
                </NavLink>
                <p className="mt-3 text-sm text-gray-700">{item.name}</p>
                <p className="font-semibold text-gray-900">₹{item.price}</p>
              </div>
            ))}
          </div>

          {/* No Results */}
          {sortedProducts.length === 0 && (
            <p className="text-center text-gray-500 mt-10">
              No products match your filters.
            </p>
          )}
        </div>
      </div>
    </section>
  );
}

export default AllCollection;
