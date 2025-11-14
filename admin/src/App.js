// admin/src/App.js
import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Admin from "./Component/Admin";
import Adminpage from "./Component/Adminpage";
import AddItems from "./Pages/AddItems";
import List from "./Pages/List";
import Orderitem from "./Pages/Orderitem";
import "./App.css";

// ✅ Protected Route Wrapper
const ProtectedRoute = ({ children }) => {
  const isLoggedIn = localStorage.getItem("adminLoggedIn");
  return isLoggedIn ? children : <Navigate to="/admin" replace />;
};

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* ✅ Default route → Admin login */}
        <Route path="/" element={<Navigate to="/admin" replace />} />
        <Route path="/admin" element={<Admin />} />

        {/* ✅ Protected routes */}
        <Route
          path="/adminpage"
          element={
            <ProtectedRoute>
              <Adminpage />
            </ProtectedRoute>
          }
        />
        <Route
          path="/additems"
          element={
            <ProtectedRoute>
              <AddItems />
            </ProtectedRoute>
          }
        />
        <Route
          path="/list"
          element={
            <ProtectedRoute>
              <List />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orderitem"
          element={
            <ProtectedRoute>
              <Orderitem />
            </ProtectedRoute>
          }
        />

        {/* ✅ Catch-all redirect */}
        <Route path="*" element={<Navigate to="/admin" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
