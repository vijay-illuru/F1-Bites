import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api";

function ProductCard({ product }) {
  const navigate = useNavigate();
  const [isAdding, setIsAdding] = useState(false);

  const addToCart = async () => {
    try {
      setIsAdding(true);
      await api.post("/cart/add", {
        productId: product._id,
        quantity: 1
      });
      navigate("/cart");
    } catch (err) {
      console.error("Error adding to cart:", err);
      alert(err.response?.data?.error || "Failed to add to cart");
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <div className="relative group rounded-2xl overflow-hidden border border-gray-200 bg-white/90 backdrop-blur-sm shadow-sm hover:shadow-xl transition-all duration-300 will-change-transform">
      {/* Racing stripe top bar */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-red-600 via-white to-black" />

      <div className="relative overflow-hidden">
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-48 object-cover transform group-hover:scale-[1.03] transition-transform duration-300" />
        ) : (
          <div className="w-full h-48 bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
            <div className="text-center text-gray-500">
              <div className="text-2xl mb-2">📦</div>
              <div className="text-sm">No Image</div>
            </div>
          </div>
        )}
        {/* Subtle checkered overlay on hover */}
        <div className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300 bg-[radial-gradient(circle_at_20%_20%,white,transparent_40%),radial-gradient(circle_at_80%_30%,white,transparent_40%)]" />
      </div>

      <div className="p-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-gray-800 tracking-tight">{product.name}</h2>
          <span className="px-2 py-0.5 text-xs rounded-full bg-black text-white">{product.category || 'Snack'}</span>
        </div>
        <p className="text-gray-600 text-sm mt-2 line-clamp-2">{product.description}</p>

        <div className="mt-4 flex items-center justify-between">
          <span className="text-lg font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-red-600 via-rose-500 to-amber-500">₹{product.price}</span>
          <button
            onClick={addToCart}
            disabled={isAdding || product.stock === 0}
            className="relative px-4 py-2 rounded-xl text-white font-semibold bg-red-500 hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed transition shadow-sm hover:shadow-md"
          >
            <span className="relative z-10">
              {isAdding ? "Adding..." : product.stock === 0 ? "Out of Stock" : "Add to Cart"}
            </span>
            {/* speed underline */}
            <span className="absolute inset-x-2 -bottom-1 h-0.5 bg-gradient-to-r from-red-400 to-amber-400 opacity-0 group-hover:opacity-100 transition-opacity" />
          </button>
        </div>
      </div>

      {/* Tilt-on-hover accent */}
      <div className="pointer-events-none absolute -inset-px rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-[conic-gradient(from_180deg_at_50%_50%,transparent_0deg,rgba(255,0,0,0.25)_140deg,transparent_360deg)]" />
    </div>
  );
}

export default ProductCard;
