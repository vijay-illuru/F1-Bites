import { Link, useLocation, useNavigate } from "react-router-dom";
import { useEffect, useMemo, useState } from "react";
import api from "../utils/api";
import f1 from "../assets/f1.png";

function Navbar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState(() => new URLSearchParams(location.search).get('q') || "");
  const [isAdmin, setIsAdmin] = useState(false);
  const isActive = (path) => location.pathname === path;
  const handleSearch = (e) => {
    e.preventDefault();
    const query = searchTerm.trim();
    if (!query) return;
    navigate(`/?q=${encodeURIComponent(query)}`);
  };

  
  const debouncedTerm = useMemo(() => searchTerm, [searchTerm]);
  useEffect(() => {
    const id = setTimeout(() => {
      const q = debouncedTerm.trim();
      if (q) {
       
        navigate(`/?q=${encodeURIComponent(q)}`);
      } else {
       
        if (location.pathname === '/' && location.search) {
          navigate(`/`);
        }
      }
    }, 300);
    return () => clearTimeout(id);
  }, [debouncedTerm, navigate, location.pathname, location.search]);

 
  useEffect(() => {
    const currentQ = new URLSearchParams(location.search).get('q') || "";
    setSearchTerm(currentQ);
  }, [location.search]);

  
  useEffect(() => {
    const checkAdminStatus = async () => {
      try {
        await api.get("/admin/products");
        setIsAdmin(true);
      } catch (err) {
        setIsAdmin(false);
      }
    };

    const token = localStorage.getItem('token');
    if (token) {
      checkAdminStatus();
    }
  }, [location.pathname]);

 
  if (location.pathname === "/login" || location.pathname === "/signup") return null;

  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-white/80 border-b border-gray-200">
      {/* racing stripe */}
      <div className="h-1 bg-gradient-to-r from-red-600 via-white to-black" />
      <div className="container mx-auto px-4 sm:px-6 py-3 flex justify-between items-center text-gray-700">
        <Link to="/" className="flex items-center">
          <img
            src={f1}
            className="w-32 sm:w-36 h-auto hover:scale-105 transition-transform duration-300"
            alt="logo"
          />
        </Link>
        <div className="flex items-center gap-6 font-semibold text-base sm:text-lg">
          <form onSubmit={handleSearch} className="hidden sm:flex items-center gap-2">
            <input
              name="q"
              type="text"
              placeholder="Search..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="px-3 py-1 rounded-md text-sm text-black border border-gray-300 focus:outline-none focus:ring-2 focus:ring-red-500"
            />
            <button type="submit" className="px-3 py-1 bg-red-500 text-white rounded-md text-sm hover:bg-red-600">Search</button>
          </form>
          <Link to="/" className={`relative hover:text-red-500 transition ${isActive('/') ? 'text-red-600' : ''}`}>
            Home
            <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 to-amber-400 transition-opacity ${isActive('/') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
          </Link>
          <Link to="/about" className={`relative hover:text-red-500 transition ${isActive('/about') ? 'text-red-600' : ''}`}>
            About
            <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 to-amber-400 transition-opacity ${isActive('/about') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
          </Link>
          <Link to="/cart" className={`relative hover:text-red-500 transition ${isActive('/cart') ? 'text-red-600' : ''}`}>
            Cart
            <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 to-amber-400 transition-opacity ${isActive('/cart') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
          </Link>
          <Link to="/profile" className={`relative hover:text-red-500 transition ${isActive('/profile') ? 'text-red-600' : ''}`}>
            Profile
            <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 to-amber-400 transition-opacity ${isActive('/profile') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
          </Link>
          {isAdmin && (
            <Link to="/admin" className={`relative hover:text-red-500 transition ${isActive('/admin') ? 'text-red-600' : ''}`}>
              Admin
              <span className={`absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-red-400 to-amber-400 transition-opacity ${isActive('/admin') ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`} />
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
