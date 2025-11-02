import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

import Login from "./pages/Auth/Login";
import Signup from "./pages/Auth/Signup";
import AdminLogin from "./pages/Auth/AdminLogin";
import AdminSignup from "./pages/Auth/AdminSignup";
import Home from "./pages/Home/Home";
import Checkout from "./pages/Cart/Checkout";
import Cart from "./pages/Cart/Cart";
import About from "./pages/Home/About";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Profile from "./pages/Profile/Profile";
import Admin from "./pages/Admin/Admin";

function AppContent() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setIsAuthenticated(true);
  }, []);

  

  return (
    <>
    
     <Navbar />
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <Login setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/signup"
          element={
            !isAuthenticated ? (
              <Signup setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/" />
            )
          }
        />
        <Route
          path="/admin/login"
          element={
            !isAuthenticated ? (
              <AdminLogin setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/admin" />
            )
          }
        />
        <Route
          path="/admin/signup"
          element={
            !isAuthenticated ? (
              <AdminSignup setIsAuthenticated={setIsAuthenticated} />
            ) : (
              <Navigate to="/admin" />
            )
          }
        />
        <Route
          path="/"
          element={
            isAuthenticated ? <Home /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/cart"
          element={
            isAuthenticated ? <Cart /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/profile"
          element={
            isAuthenticated ? <Profile /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/checkout"
          element={
            isAuthenticated ? <Checkout /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/about"
          element={
            isAuthenticated ? <About /> : <Navigate to="/login" />
          }
        />
        <Route
          path="/admin"
          element={
            isAuthenticated ? <Admin /> : <Navigate to="/login" />
          }
        />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
      <Footer />
    </>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;
