import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Register from "./pages/Register";
import Login from "./pages/Login";

export function ProtectedRoutes({ children }) {
  if (localStorage.getItem("user")) {
    return children;
  } else {
    return <Navigate to="/login" />;
  }
}

function App() {
  return (
    <Routes>
      <Route 
        path="/" 
        element={
          <ProtectedRoutes>
            <HomePage />
          </ProtectedRoutes>
        } 
      />
      <Route path="/register" element={<Register />} />
      <Route path="/login" element={<Login />} />
    </Routes>
  );
}
export default App;
