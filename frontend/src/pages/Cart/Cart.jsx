import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import api from "../../utils/api";

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await api.get("/cart");
      setCartItems(response.data.items);
      calculateTotal(response.data.items);
    } catch (err) {
      console.error("Error fetching cart:", err);
      setError("Failed to load cart");
      // Fallback to localStorage for backward compatibility
      const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
      const updatedCart = savedCart.map(item => ({
        ...item,
        quantity: item.quantity ? item.quantity : 1,
      }));
      setCartItems(updatedCart);
      calculateTotal(updatedCart);
    } finally {
      setLoading(false);
    }
  };

  const calculateTotal = (items) => {
    const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    setTotalAmount(total);
  };

  const updateQuantity = async (id, action) => {
    try {
      const item = cartItems.find(item => item._id === id);
      const newQuantity = action === "increase" ? item.quantity + 1 : Math.max(item.quantity - 1, 1);
      
      await api.patch("/cart/update", {
        productId: id,
        quantity: newQuantity
      });
      
      const updatedCart = cartItems.map((item) =>
        item._id === id ? { ...item, quantity: newQuantity } : item
      );
      setCartItems(updatedCart);
      calculateTotal(updatedCart);
    } catch (err) {
      console.error("Error updating quantity:", err);
      alert(err.response?.data?.error || "Failed to update quantity");
    }
  };

  const removeItem = async (id) => {
    try {
      await api.delete(`/cart/remove/${id}`);
      const updatedCart = cartItems.filter((item) => item._id !== id);
      setCartItems(updatedCart);
      calculateTotal(updatedCart);
    } catch (err) {
      console.error("Error removing item:", err);
      alert(err.response?.data?.error || "Failed to remove item");
    }
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <p className="text-gray-600">Loading cart...</p>
        </div>
      </div>
    );
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-[70vh] bg-gradient-to-b from-white via-gray-50 to-white">
        <div className="container mx-auto px-6 py-16 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight mb-3 bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
            Your Cart
          </h1>
          <p className="text-gray-600 mb-8">Looks like it’s a bit empty in here.</p>
          <Link to="/" className="inline-block">
            <button className="px-6 py-3 rounded-xl bg-red-500 text-white font-semibold shadow-sm hover:shadow-md hover:bg-red-600 transition">
              Continue Shopping
            </button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[70vh] bg-gradient-to-b from-white via-gray-50 to-white">
      <div className="container mx-auto px-6 py-12">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-red-500 via-rose-400 to-amber-400">
              Your Cart
            </h1>
            <p className="text-gray-600 mt-1">Review your picks and get ready to checkout.</p>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Items list */}
          <div className="lg:col-span-2 space-y-4">
            {cartItems.map((item) => (
              <div key={item._id} className="flex justify-between items-center rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm p-4 shadow-sm hover:shadow-md transition">
                <div className="flex items-center space-x-4">
                  {item.image ? (
                    <img src={item.image} alt={item.name} className="w-20 h-20 object-cover rounded-xl" />
                  ) : (
                    <div className="w-20 h-20 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center">
                      <span className="text-gray-500 text-sm">📦</span>
                    </div>
                  )}
                  <div>
                    <h2 className="text-base md:text-lg font-semibold">{item.name}</h2>
                    <p className="text-gray-500">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => updateQuantity(item._id, "decrease")}
                    className="px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    -
                  </button>
                  <span className="min-w-[2ch] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item._id, "increase")}
                    className="px-3 py-1.5 bg-gray-200 rounded-lg hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center space-x-4">
                  <p className="font-semibold">₹{item.price * item.quantity}</p>
                  <button
                    onClick={() => removeItem(item._id)}
                    className="text-red-500 hover:text-red-600 hover:underline"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* Summary card */}
          <div className="lg:col-span-1">
            <div className="sticky top-6 rounded-2xl border border-gray-200 bg-white/90 backdrop-blur-sm p-6 shadow-sm">
              <h2 className="text-xl font-bold mb-4">Order Summary</h2>
              <div className="flex items-center justify-between text-gray-700">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex items-center justify-between text-gray-700 mt-2">
                <span>Delivery</span>
                <span>Free</span>
              </div>
              <div className="h-px bg-gray-200 my-4"></div>
              <div className="flex items-center justify-between text-lg font-semibold">
                <span>Total</span>
                <span>₹{totalAmount}</span>
              </div>
              <Link to="/checkout" className="block mt-6">
                <button className="w-full px-6 py-3 rounded-xl bg-red-500 text-white font-semibold shadow-sm hover:shadow-md hover:bg-red-600 transition">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
