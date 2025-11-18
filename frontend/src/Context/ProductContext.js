import { createContext, useContext, useState, useEffect } from "react";

export const productContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        
        const res = await fetch("http://localhost:8000/product/getallproducts");
        const data = await res.json();

        // ✅ Access correct property
        if (data.success) {
          setProducts(data.products);
        } else {
          console.error("Error loading products:", data.message);
        }
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
  }, []);

  return (
    <productContext.Provider value={{ products, setProducts }}>
      {children}
    </productContext.Provider>
  );
};

export const useProducts = () => useContext(productContext);
