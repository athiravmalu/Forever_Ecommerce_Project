import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useSearch } from "../Context/SearchContext";

function Login() {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [errors, setErrors] = useState({});
  const { setToken } = useSearch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleToggle = () => setIsLogin((prev) => !prev);

  const validate = () => {
    const newErrors = {};
    const { name, email, password } = formData;

    if (!isLogin && !name.trim()) newErrors.name = "Name is required";
    if (!email.trim()) newErrors.email = "Email is required";
    else if (!/\S+@\S+\.\S+/.test(email)) newErrors.email = "Invalid email";

    if (!password.trim()) newErrors.password = "Password is required";
    else if (password.length < 6) newErrors.password = "Password must be at least 6 characters";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Handle both Login and Signup redirecting to home
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      let response;

      if (isLogin) {
        // LOGIN
        response = await axios.post("http://localhost:8000/user/login", {
          email: formData.email,
          password: formData.password,
        });
      } else {
        // SIGNUP
        response = await axios.post("http://localhost:8000/user/register", {
          name: formData.name,
          email: formData.email,
          password: formData.password,
        });
      }

      if (response.data.success) {
        const { token, id } = response.data;

        // ✅ Set token for both login and signup
        setToken(token);
        localStorage.setItem("token", token);
        localStorage.setItem("userId", id);

        toast.success(isLogin ? "Login successful!" : "Signup successful!");
        setTimeout(() => navigate("/"), 1000); // ✅ redirect to home in both cases
      } else {
        toast.error(response.data.message || "Something went wrong!");
      }
    } catch (error) {
      console.error(error);
      toast.error(error.response?.data?.message || "Server error");
    }
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) navigate("/");
  }, [navigate]);

  return (
    <section className="flex flex-col items-center justify-center min-h-screen px-4 py-10 bg-gray-50 pt-20">
      <div className="w-full max-w-sm text-center p-6 bg-white shadow-sm rounded-lg mt-20">
        <div className="flex items-center justify-center gap-3 mb-8 mt-4">
          <h2 className="text-2xl text-gray-600 font-semibold">
            {isLogin ? "Login" : "Sign Up"}
          </h2>
          <div className="w-12 h-[1.5px] bg-gray-400"></div>
        </div>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {!isLogin && (
            <InputField
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              error={errors.name}
            />
          )}
          <InputField
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            error={errors.email}
          />
          <InputField
            name="password"
            placeholder="Password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={errors.password}
          />

          <div className="text-sm text-gray-500 mb-6 text-center">
            {isLogin ? (
              <>
                No account?{" "}
                <button
                  type="button"
                  onClick={handleToggle}
                  className="text-blue-500 hover:underline"
                >
                  Sign Up
                </button>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <button
                  type="button"
                  onClick={handleToggle}
                  className="text-blue-500 hover:underline"
                >
                  Login
                </button>
              </>
            )}
          </div>

          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md text-sm font-medium hover:bg-gray-800 transition w-full"
          >
            {isLogin ? "Sign in" : "Create Account"}
          </button>
        </form>
      </div>
    </section>
  );
}

const InputField = ({ name, type = "text", placeholder, value, onChange, error }) => (
  <div className="text-left">
    <div className="w-full border border-gray-300 rounded-md px-3 py-2 focus-within:border-gray-500 transition">
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="w-full outline-none text-gray-700 placeholder-gray-400 bg-transparent text-sm"
      />
    </div>
    {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
  </div>
);

export default Login;
