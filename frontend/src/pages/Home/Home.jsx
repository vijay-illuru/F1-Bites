import React, { useEffect, useState, useMemo } from "react";
import { useLocation } from "react-router-dom";
import ProductCard from "../../components/ProductCard";
import api from "../../utils/api";

function Home() {
  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const productsPerPage = 12;
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const q = (params.get("q") || "").trim();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        const response = await api.get(`/products${q ? `?q=${encodeURIComponent(q)}` : ''}`);
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to load products. Please try again.");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [q]);

  // Reset to first page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [q]);

  const filteredProducts = useMemo(() => {
    return products.filter(p => p.isAvailable !== false);
  }, [products]);

  // Calculate products for current page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage) || 1;

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-6 py-10">
        <div className="flex items-end justify-between">
          <h1 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
            Our Snacks {q && <span className="text-lg text-gray-500">(search: {q})</span>}
          </h1>
        </div>

        {loading ? (
          <div className="text-center py-8">
            <p className="text-gray-600">Loading products...</p>
          </div>
        ) : error ? (
          <div className="text-center py-8">
            <p className="text-red-600">{error}</p>
          </div>
        ) : filteredProducts.length === 0 ? (
          <p className="text-gray-600">No products available</p>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {currentProducts.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`px-4 py-2 rounded ${
                    currentPage === i + 1 ? "bg-blue-500 text-white" : "bg-gray-200"
                  }`}
                  onClick={() => handlePageChange(i + 1)}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Home;
