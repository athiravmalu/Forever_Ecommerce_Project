import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Admin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Hardcoded admin login (since you are not using backend adminAuth)
    if (formData.email === "admin@123.com" && formData.password === "admin123") {
      console.log("Admin Login Successful");

      // ❗ Store adminToken manually since no backend login is used
      localStorage.setItem("adminToken", "admin_super_secret_token");

      navigate("/adminpage");
    } else {
      alert("Invalid admin credentials!");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white border border-gray-300 shadow-lg rounded-2xl p-8 w-full max-w-sm text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-6">Admin Login</h2>

        <form onSubmit={handleSubmit} className="space-y-5 text-left">
          <div>
            <label className="block text-gray-600 font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="border border-gray-300 rounded-md w-full px-4 py-2 focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <div>
            <label className="block text-gray-600 font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="border border-gray-300 rounded-md w-full px-4 py-2 focus:ring-2 focus:ring-black"
              required
            />
          </div>

          <button
            type="submit"
            className="bg-black text-white w-full py-2.5 rounded-md hover:bg-gray-800 font-semibold text-lg shadow-md mt-4"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Admin;
